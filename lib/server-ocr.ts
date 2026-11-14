import {env} from 'cloudflare:workers';
import {parseJSON,requireValue,AppError} from './domain';
import {all,one,base,now,uid,unpack,stmt,Plan,preference,getRecord,owned,type Context} from './server-db';
import {extractReceiptFields,OCR_STATUS,type ExtractionResult} from './receipt-extract';
import {isReceiptMime} from './document-security';

const asSystem=(ctx:Context):Context=>({...ctx,role:{name:'Admin',permissions:{}},actor:{...ctx.actor,id:'system'},actingAs:false});
const MAX_OCR_ATTEMPTS=3;

export type AcquiredText={text:string;confidence:number;engine:string;source:string};

function pushText(out:string[],value:string){
 const text=value.replace(/\s+/g,' ').trim();
 if(text.length>=2&&text.length<=200&&/[\p{L}\p{N}]/u.test(text))out.push(text);
}

function decodeHexString(hex:string){
 const clean=hex.replace(/\s/g,'');
 if(clean.length<4||clean.length%2||!/^[0-9A-Fa-f]+$/.test(clean))return '';
 const bytes=new Uint8Array(clean.length/2);
 for(let i=0;i<bytes.length;i++)bytes[i]=parseInt(clean.slice(i*2,i*2+2),16);
 if(bytes[0]===0xfe&&bytes[1]===0xff){
  let text='';
  for(let i=2;i+1<bytes.length;i+=2){const code=(bytes[i]<<8)|bytes[i+1];if(code)text+=String.fromCharCode(code);}
  return text;
 }
 if(bytes.some(b=>b===0))return '';
 return String.fromCharCode(...bytes);
}

/** Linear scan. A backtracking PDF string regex can stall the worker on compressed bytes. */
function collectPdfText(raw:string){
 const out:string[]=[];
 for(let i=0;i<raw.length;i++){
  const ch=raw[i];
  if(ch==='('){
   let text='';let esc=false;
   for(let j=i+1;j<raw.length&&text.length<200;j++){
    const c=raw[j];
    if(esc){
     if(c==='n')text+='\n';
     else if(c==='t')text+=' ';
     else if(c>='0'&&c<='7'){let oct=c;if(raw[j+1]>='0'&&raw[j+1]<='7')oct+=raw[++j];if(raw[j+1]>='0'&&raw[j+1]<='7')oct+=raw[++j];text+=String.fromCharCode(parseInt(oct,8));}
     else text+=c;
     esc=false;continue;
    }
    if(c==='\\'){esc=true;continue;}
    if(c===')'){pushText(out,text);i=j;break;}
    text+=c;
   }
   continue;
  }
  if(ch==='<'){
   let hex='';
   for(let j=i+1;j<raw.length&&hex.length<800;j++){
    const c=raw[j];
    if(c==='>'){const decoded=decodeHexString(hex);if(decoded)pushText(out,decoded);i=j;break;}
    if(/[0-9A-Fa-f\s]/.test(c))hex+=c;else break;
   }
  }
 }
 return out;
}

async function inflateZlib(bytes:Uint8Array){
 const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
 return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** PDF text-layer scrape for Workers. Reads literal and hex strings, including FlateDecode streams. */
export async function extractPdfPlainText(bytes:Uint8Array){
 const raw=new TextDecoder('latin1').decode(bytes);
 const chunks:string[]=[];
 let cursor=0;
 while(cursor<raw.length){
  const start=raw.indexOf('stream',cursor);
  if(start<0)break;
  let dataStart=start+6;
  if(raw[dataStart]==='\r')dataStart++;
  if(raw[dataStart]==='\n')dataStart++;
  const end=raw.indexOf('endstream',dataStart);
  if(end<0)break;
  const dictStart=raw.lastIndexOf('<<',start);
  const dict=dictStart>=0?raw.slice(dictStart,start):'';
  let dataEnd=end;
  if(raw[dataEnd-1]==='\n')dataEnd--;
  if(raw[dataEnd-1]==='\r')dataEnd--;
  cursor=end+9;
  let text='';
  if(dict.includes('/FlateDecode')){
   try{text=new TextDecoder('latin1').decode(await inflateZlib(bytes.slice(dataStart,dataEnd)));}catch{continue;}
  }else if(!dict.includes('/Filter'))text=raw.slice(dataStart,dataEnd);
  else continue;
  if(!/Tj|TJ|\(/.test(text))continue;
  chunks.push(...collectPdfText(text));
 }
 if(!chunks.length)chunks.push(...collectPdfText(raw));
 return [...new Set(chunks)].join('\n');
}

async function findOcrConnection(ctx:Context){
 const rows=await all(ctx.db,"SELECT * FROM configurations WHERE orgId=? AND kind='connections' AND enabled=1",ctx.org.id);
 for(const raw of rows){
  const c=unpack(raw);
  const provider=String(c.provider||c.name||'').toLowerCase();
  const purpose=String(c.purpose||c.data?.purpose||'').toLowerCase();
  if(purpose==='receipt_ocr'||purpose==='ocr'||provider.includes('ocr')||provider.includes('textract')||provider.includes('vision'))return c;
 }
 return null;
}

function publicOcrUrl(url:string,connection:any){
 const u=new URL(url);
 requireValue(u.protocol==='https:'&&!u.username&&!u.password,'Use a credential-free HTTPS URL.');
 requireValue(!/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|0\.|\[|::)/i.test(u.hostname)&&!u.hostname.endsWith('.local'),'Private network destinations are not allowed.');
 requireValue(connection&&new URL(connection.baseUrl).origin===u.origin,'Select a connection with this exact service origin.','connection_required',409);
 return u;
}

async function callExternalOcr(connection:any,doc:any,bytes:Uint8Array):Promise<AcquiredText|null>{
 const url=connection.ocrUrl||connection.baseUrl;
 if(!url)return null;
 try{publicOcrUrl(url,connection);}catch{return null;}
 const chunk=bytes.byteLength<=350000?btoa(Array.from(bytes,(b)=>String.fromCharCode(b)).join('')):undefined;
 let response:Response;
 try{
  response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':'ocr-'+doc.id},body:JSON.stringify({documentId:doc.id,sha256:doc.sha256,mime:doc.mime,name:doc.name,size:bytes.byteLength,contentBase64:chunk}),redirect:'error',signal:AbortSignal.timeout(15000)});
 }catch{throw new AppError('unknown_external_effect','The OCR service did not confirm completion.',409);}
 if(!response.ok)throw new AppError('provider_rejected',`The OCR service returned HTTP ${response.status}.`,409);
 let payload:any={};
 try{payload=await response.json();}catch{payload={};}
 const textOut=String(payload.text||payload.ocrText||'').trim();
 if(!textOut)throw new AppError('provider_rejected','The OCR service returned empty text.',409);
 const confidence=Number(payload.confidence);
 return{text:textOut,confidence:Number.isFinite(confidence)?Math.max(0,Math.min(100,confidence)):80,engine:String(payload.engine||connection.provider||'external_ocr'),source:'external_ocr'};
}

export async function acquireReceiptText(ctx:Context,doc:any):Promise<AcquiredText|{awaitingAssist:true}>{
 requireValue(env.BUCKET,'File storage unavailable.','storage_unavailable',503);
 const object=await env.BUCKET!.get(doc.objectKey);
 requireValue(object,'The file is unavailable for OCR.','not_found',404);
 const bytes=new Uint8Array(await object!.arrayBuffer());
 if(doc.mime==='application/pdf'){
  const plain=await extractPdfPlainText(bytes);
  if(plain.trim().length>=35)return{text:plain,confidence:96,engine:'pdf_text_v1',source:'pdf_text'};
 }
 const connection=await findOcrConnection(ctx);
 if(connection){
  const external=await callExternalOcr(connection,doc,bytes);
  if(external)return external;
 }
 return{awaitingAssist:true};
}

export async function receiptOcrEnabled(ctx:Context){
 const prefs=await preference(ctx,'ai_preferences',{receiptOcr:true});
 return prefs.receiptOcr!==false;
}

export async function enqueueReceiptOcr(ctx:Context,documentId:string){
 if(!(await receiptOcrEnabled(ctx)))return null;
 const doc=unpack(await one(ctx.db,'SELECT * FROM documents WHERE orgId=? AND id=?',ctx.org.id,documentId));
 if(!doc||!isReceiptMime(doc.mime)||doc.status==='rejected')return null;
 if(['completed','needs_review'].includes(doc.ocrStatus)&&doc.data?.extraction)return null;
 const dedupe='ocr:'+documentId;
 const exists=await one(ctx.db,'SELECT id,state FROM jobs WHERE orgId=? AND dedupeKey=?',ctx.org.id,dedupe);
 if(exists)return exists;
 const jobId=uid();
 const job={...base(ctx,jobId),kind:'receipt_ocr',name:'Receipt OCR extract',state:'queued',total:1,completed:0,attempts:0,dedupeKey:dedupe,error:null,availableAt:now(),finishedAt:null,data:JSON.stringify({documentId,sha256:doc.sha256})};
 const plan=new Plan(ctx);
 plan.insert('jobs',job);
 plan.update('documents',documentId,{ocrStatus:OCR_STATUS.queued,data:JSON.stringify({...doc.data,ocrJobId:jobId})});
 try{await plan.commit();}catch{return await one(ctx.db,'SELECT * FROM jobs WHERE orgId=? AND dedupeKey=?',ctx.org.id,dedupe);}
 return job;
}

export function persistExtractionPatch(doc:any,acquired:{text:string;confidence:number;engine:string;source:string},extraction:ExtractionResult,threshold:number,recognition:string){
 const ocrStatus=extraction.overallConfidence<threshold||!acquired.text.trim()?OCR_STATUS.needs_review:OCR_STATUS.completed;
 const data={
  ...doc.data,
  recognition,
  reviewed:false,
  recognizedAt:now(),
  ocrJobId:doc.data?.ocrJobId||null,
  extraction:{
   fields:extraction.fields,
   fieldConfidence:extraction.fieldConfidence,
   overallConfidence:extraction.overallConfidence,
   engine:extraction.engine,
   source:extraction.source,
  },
 };
 return{
  ocrText:acquired.text,
  ocrConfidence:Math.round(acquired.confidence),
  ocrStatus,
  data:JSON.stringify(data),
  extraction,
 };
}

export async function processReceiptOcr(original:Context,limit=10){
 const ctx=asSystem(original);
 if(!env.BUCKET)return{processed:0,items:[] as any[]};
 if(!(await receiptOcrEnabled(ctx)))return{processed:0,items:[],skipped:'receiptOcr_disabled'};
 const audit=await preference(ctx,'audit_preferences',{threshold:75});
 const threshold=Number(audit.threshold);const minConf=Number.isFinite(threshold)?threshold:75;
 const jobs=await all(ctx.db,"SELECT * FROM jobs WHERE orgId=? AND kind='receipt_ocr' AND state IN ('queued','waiting_configuration') AND availableAt<=? ORDER BY createdAt LIMIT ?",ctx.org.id,now(),limit);
 const items:any[]=[];
 let processed=0;
 for(const job of jobs){
  const claim=new Plan(ctx);
  claim.guard('jobs',job.id,job.version).update('jobs',job.id,{state:'running',attempts:(job.attempts||0)+1});
  try{await claim.commit();}catch{continue;}
  const data=parseJSON(job.data,{}) as {documentId?:string;sha256?:string};
  const documentId=data.documentId;
  try{
   const doc=unpack(await one(ctx.db,'SELECT * FROM documents WHERE orgId=? AND id=?',ctx.org.id,documentId));
   requireValue(doc,'Document not found for OCR.','not_found',404);
   if(doc.status==='rejected'){
    await stmt(ctx.db,"UPDATE jobs SET state='failed',error=?,finishedAt=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",'Document rejected by security scan',now(),now(),ctx.org.id,job.id).run();
    items.push({jobId:job.id,documentId,state:'failed'});continue;
   }
   if(data.sha256&&doc.sha256!==data.sha256)throw new AppError('hash_mismatch','The stored file changed before OCR finished.',409);
   await stmt(ctx.db,"UPDATE documents SET ocrStatus=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",OCR_STATUS.processing,now(),ctx.org.id,documentId).run();
   const refreshed=unpack(await one(ctx.db,'SELECT * FROM documents WHERE orgId=? AND id=?',ctx.org.id,documentId));
   const acquired=await acquireReceiptText(ctx,refreshed);
   if('awaitingAssist' in acquired){
    await stmt(ctx.db,"UPDATE documents SET ocrStatus=?,data=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",OCR_STATUS.awaiting_assist,JSON.stringify({...refreshed.data,ocrJobId:job.id}),now(),ctx.org.id,documentId).run();
    await stmt(ctx.db,"UPDATE jobs SET state='completed',completed=1,error=?,finishedAt=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",'Awaiting browser OCR assist',now(),now(),ctx.org.id,job.id).run();
    items.push({jobId:job.id,documentId,state:'awaiting_assist'});processed++;continue;
   }
   const extraction=extractReceiptFields(acquired.text,acquired.confidence,{engine:acquired.engine,source:acquired.source});
   const patch=persistExtractionPatch(refreshed,acquired,extraction,minConf,acquired.source);
   const plan=new Plan(ctx);
   plan.guard('documents',refreshed.id,refreshed.version).update('documents',refreshed.id,{ocrText:patch.ocrText,ocrConfidence:patch.ocrConfidence,ocrStatus:patch.ocrStatus,data:patch.data});
   plan.event('ocr_completed','documents',refreshed.id,{ocrStatus:patch.ocrStatus,overallConfidence:extraction.overallConfidence,engine:acquired.engine});
   await plan.commit();
   await stmt(ctx.db,"UPDATE jobs SET state='completed',completed=1,finishedAt=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",now(),now(),ctx.org.id,job.id).run();
   items.push({jobId:job.id,documentId,state:'completed',ocrStatus:patch.ocrStatus});processed++;
  }catch(e:any){
   const attempts=(job.attempts||0)+1;
   const soft=attempts<MAX_OCR_ATTEMPTS&&e?.code!=='hash_mismatch';
   const state=soft?'queued':(e?.code==='connection_required'?'waiting_configuration':'failed');
   await stmt(ctx.db,"UPDATE jobs SET state=?,error=?,availableAt=?,finishedAt=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",state,String(e.message||e).slice(0,500),soft?new Date(Date.now()+attempts*2000).toISOString():now(),soft?null:now(),now(),ctx.org.id,job.id).run();
   if(documentId&&!soft){
    await stmt(ctx.db,"UPDATE documents SET ocrStatus=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",OCR_STATUS.failed,now(),ctx.org.id,documentId).run();
   }
   items.push({jobId:job.id,documentId,state,error:String(e.message||e).slice(0,200)});
  }
 }
 return{processed,items};
}

export async function markExtractionReviewed(ctx:Context,id:string,version:number,plan:Plan){
 const doc=await getRecord(ctx,'documents',id,'documents');
 owned(ctx,doc);
 plan.guard('documents',id,version).update('documents',id,{data:JSON.stringify({...doc.data,reviewed:true,reviewedAt:now()})});
 plan.event('ocr_reviewed','documents',id,{});
 return{reviewed:true,version:version+1,extraction:doc.data?.extraction||null,ocrStatus:doc.ocrStatus};
}
