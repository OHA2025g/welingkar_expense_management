import {env} from 'cloudflare:workers';
import {parseJSON,requireValue,AppError} from './domain';
import {all,one,base,now,uid,unpack,stmt,Plan,type Context} from './server-db';
import {scanContent,type ScanVerdict} from './content-scanner';

export const DOC_STATUS={quarantined:'quarantined',scanning:'scanning',clean:'clean',rejected:'rejected',validated:'validated'} as const;
export type DocSecurityStatus=typeof DOC_STATUS[keyof typeof DOC_STATUS];

const asSystem=(ctx:Context):Context=>({...ctx,role:{name:'Admin',permissions:{}},actor:{...ctx.actor,id:'system'},actingAs:false});

export function isReceiptMime(mime:string){
 return mime.startsWith('image/')||mime==='application/pdf';
}

export function isImportMime(mime:string){
 return mime.startsWith('text/')||mime==='application/vnd.ms-excel';
}

/** When requireScanner is true only clean may submit; otherwise clean or validated. */
export function canSubmitDocumentStatus(status:string,requireScanner:boolean){
 if(requireScanner)return status===DOC_STATUS.clean;
 return status===DOC_STATUS.clean||status===DOC_STATUS.validated;
}

export function initialUploadSecurity(mime:string){
 if(isReceiptMime(mime)){
  return{status:DOC_STATUS.quarantined,securityScan:'pending' as const,data:{securityScan:'pending'}};
 }
 if(isImportMime(mime)){
  return{status:DOC_STATUS.validated,securityScan:'type_validated' as const,data:{securityScan:'type_validated',scannedAt:now()}};
 }
 return{status:DOC_STATUS.quarantined,securityScan:'pending' as const,data:{securityScan:'pending'}};
}

export async function enqueueSecurityScan(ctx:Context,documentId:string){
 const doc=unpack(await one(ctx.db,'SELECT * FROM documents WHERE orgId=? AND id=?',ctx.org.id,documentId));
 if(!doc)return null;
 if(!isReceiptMime(doc.mime))return null;
 if(doc.status===DOC_STATUS.clean||doc.status===DOC_STATUS.rejected)return null;
 const dedupe='scan:'+documentId;
 const exists=await one(ctx.db,'SELECT id,state FROM jobs WHERE orgId=? AND dedupeKey=?',ctx.org.id,dedupe);
 if(exists)return exists;
 const jobId=uid();
 const job={...base(ctx,jobId),kind:'security_scan',name:'Receipt security scan',state:'queued',total:1,completed:0,attempts:0,dedupeKey:dedupe,error:null,availableAt:now(),finishedAt:null,data:JSON.stringify({documentId,sha256:doc.sha256})};
 const plan=new Plan(ctx);
 plan.insert('jobs',job);
 plan.update('documents',documentId,{data:JSON.stringify({...doc.data,scanJobId:jobId,securityScan:doc.data?.securityScan||'pending'})});
 try{await plan.commit();}catch{return await one(ctx.db,'SELECT * FROM jobs WHERE orgId=? AND dedupeKey=?',ctx.org.id,dedupe);}
 return job;
}

async function findSecurityConnection(ctx:Context){
 const rows=await all(ctx.db,"SELECT * FROM configurations WHERE orgId=? AND kind='connections' AND enabled=1",ctx.org.id);
 for(const raw of rows){
  const c=unpack(raw);
  const provider=String(c.provider||c.name||'').toLowerCase();
  const purpose=String(c.purpose||c.data?.purpose||'').toLowerCase();
  if(provider.includes('scansnap')||provider.includes('security')||provider.includes('malware')||purpose==='security_scan'||purpose==='malware_scan')return c;
 }
 return null;
}

function publicScannerUrl(url:string,connection:any){
 const u=new URL(url);
 requireValue(u.protocol==='https:'&&!u.username&&!u.password,'Use a credential-free HTTPS URL.');
 requireValue(!/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|0\.|\[|::)/i.test(u.hostname)&&!u.hostname.endsWith('.local'),'Private network destinations are not allowed.');
 requireValue(connection&&new URL(connection.baseUrl).origin===u.origin,'Select a connection with this exact service origin.','connection_required',409);
 return u;
}

export async function applyScanResult(ctx:Context,doc:any,verdict:ScanVerdict,meta:{engine:string;reason?:string;jobId?:string}){
 const stamp=now();
 const securityScan=verdict==='clean'?'content_clean':'rejected';
 const status=verdict==='clean'?DOC_STATUS.clean:DOC_STATUS.rejected;
 const data={...doc.data,securityScan,scannedAt:stamp,engine:meta.engine,reason:meta.reason||null,scanJobId:meta.jobId||doc.data?.scanJobId||null};
 const plan=new Plan(ctx);
 plan.guard('documents',doc.id,doc.version).update('documents',doc.id,{status,data:JSON.stringify(data)});
 plan.event(verdict==='clean'?'scan_completed':'scan_failed','documents',doc.id,{verdict,engine:meta.engine,reason:meta.reason||null});
 await plan.commit();
 return{status,securityScan};
}

async function runExternalScan(ctx:Context,connection:any,doc:any,bytes:Uint8Array):Promise<{verdict:ScanVerdict;engine:string;reason?:string}|null>{
 const url=connection.scanUrl||connection.baseUrl;
 if(!url)return null;
 try{publicScannerUrl(url,connection);}catch{return null;}
 const chunk=bytes.byteLength<=250000?btoa(Array.from(bytes,(b)=>String.fromCharCode(b)).join('')):undefined;
 const body={documentId:doc.id,sha256:doc.sha256,mime:doc.mime,name:doc.name,size:bytes.byteLength,contentBase64:chunk};
 let response:Response;
 try{
  response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':doc.id},body:JSON.stringify(body),redirect:'error',signal:AbortSignal.timeout(12000)});
 }catch{
  throw new AppError('unknown_external_effect','The security scanner did not confirm completion.',409);
 }
 if(!response.ok)throw new AppError('provider_rejected',`The security scanner returned HTTP ${response.status}.`,409);
 let payload:any={};
 try{payload=await response.json();}catch{payload={};}
 const verdict=payload.verdict==='rejected'||payload.verdict==='clean'?payload.verdict:null;
 if(!verdict)throw new AppError('provider_rejected','The security scanner response was incomplete.',409);
 return{verdict,engine:String(payload.engine||connection.provider||'external'),reason:payload.reason?String(payload.reason).slice(0,500):undefined};
}

const MAX_SCAN_ATTEMPTS=3;

export async function processSecurityScans(original:Context,limit=10){
 const ctx=asSystem(original);
 if(!env.BUCKET)return{processed:0,items:[] as any[]};
 const jobs=await all(ctx.db,"SELECT * FROM jobs WHERE orgId=? AND kind='security_scan' AND state IN ('queued','waiting_configuration') AND availableAt<=? ORDER BY createdAt LIMIT ?",ctx.org.id,now(),limit);
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
   requireValue(doc,'Document not found for security scan.','not_found',404);
   if(data.sha256&&doc.sha256!==data.sha256)throw new AppError('hash_mismatch','The stored file changed before scanning finished.',409);
   if(doc.status===DOC_STATUS.clean||doc.status===DOC_STATUS.rejected){
    await stmt(ctx.db,"UPDATE jobs SET state='completed',completed=1,finishedAt=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",now(),now(),ctx.org.id,job.id).run();
    items.push({jobId:job.id,documentId,state:'completed',skipped:true});processed++;continue;
   }
   const markScanning=new Plan(ctx);
   markScanning.guard('documents',doc.id,doc.version).update('documents',doc.id,{status:DOC_STATUS.scanning,data:JSON.stringify({...doc.data,securityScan:'scanning',scanJobId:job.id})});
   await markScanning.commit();
   const refreshed=unpack(await one(ctx.db,'SELECT * FROM documents WHERE orgId=? AND id=?',ctx.org.id,documentId));
   const object=await env.BUCKET!.get(refreshed.objectKey);
   requireValue(object,'The file is unavailable for scanning.','not_found',404);
   const bytes=new Uint8Array(await object!.arrayBuffer());
   let result:{verdict:ScanVerdict;engine:string;reason?:string}|null=null;
   const connection=await findSecurityConnection(ctx);
   if(connection){
    try{result=await runExternalScan(ctx,connection,refreshed,bytes);}catch(e:any){
     if(e?.code==='connection_required'){
      await stmt(ctx.db,"UPDATE jobs SET state='waiting_configuration',error=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",e.message,now(),ctx.org.id,job.id).run();
      await stmt(ctx.db,"UPDATE documents SET status=?,data=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",DOC_STATUS.quarantined,JSON.stringify({...refreshed.data,securityScan:'pending',scanJobId:job.id}),now(),ctx.org.id,documentId).run();
      items.push({jobId:job.id,documentId,state:'waiting_configuration'});continue;
     }
     throw e;
    }
   }
   if(!result)result=scanContent({bytes,mime:refreshed.mime,sha256:refreshed.sha256,name:refreshed.name,expectedSize:refreshed.size});
   await applyScanResult(ctx,refreshed,result.verdict,{engine:result.engine,reason:result.reason,jobId:job.id});
   await stmt(ctx.db,"UPDATE jobs SET state=?,completed=?,error=?,finishedAt=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",result.verdict==='clean'?'completed':'failed',result.verdict==='clean'?1:0,result.verdict==='rejected'?(result.reason||'Rejected by content scanner'):null,now(),now(),ctx.org.id,job.id).run();
   items.push({jobId:job.id,documentId,state:result.verdict==='clean'?'completed':'failed',verdict:result.verdict});processed++;
  }catch(e:any){
   const attempts=(job.attempts||0)+1;
   const soft=attempts<MAX_SCAN_ATTEMPTS&&e?.code!=='hash_mismatch';
   const state=soft?'queued':'failed';
   await stmt(ctx.db,"UPDATE jobs SET state=?,error=?,availableAt=?,finishedAt=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",state,String(e.message||e).slice(0,500),soft?new Date(Date.now()+attempts*2000).toISOString():now(),soft?null:now(),now(),ctx.org.id,job.id).run();
   if(documentId){
    const doc=unpack(await one(ctx.db,'SELECT * FROM documents WHERE orgId=? AND id=?',ctx.org.id,documentId));
    if(doc&&(doc.status===DOC_STATUS.scanning||doc.status===DOC_STATUS.quarantined)){
     await stmt(ctx.db,"UPDATE documents SET status=?,data=?,updatedAt=?,version=version+1 WHERE orgId=? AND id=?",DOC_STATUS.quarantined,JSON.stringify({...doc.data,securityScan:'pending',scanJobId:job.id,lastScanError:String(e.message||e).slice(0,300)}),now(),ctx.org.id,documentId).run();
    }
   }
   items.push({jobId:job.id,documentId,state,error:String(e.message||e).slice(0,200)});
  }
 }
 return{processed,items};
}
