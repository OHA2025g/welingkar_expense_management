export type ExtractionFieldKey='merchant'|'expenseDate'|'amount'|'currency'|'taxAmount'|'taxRatePercent'|'reference';

export type ExtractionFields=Partial<Record<ExtractionFieldKey,string>>;

export type ExtractionResult={
 fields:ExtractionFields;
 fieldConfidence:Partial<Record<ExtractionFieldKey,number>>;
 overallConfidence:number;
 engine:string;
 source:string;
};

export const OCR_STATUS={
 not_started:'not_started',
 queued:'queued',
 processing:'processing',
 awaiting_assist:'awaiting_assist',
 completed:'completed',
 needs_review:'needs_review',
 failed:'failed',
 not_applicable:'not_applicable',
} as const;

const SKIP_LINE=/^(tax invoice|tax inv|invoice|receipt|bill|cash memo|cash|credit|debit|original|duplicate|copy|original for recipient)$/i;
const ADDRESS_LIKE=/\b(gstin|cin|pan|phone|mobile|tel|email|e-mail|www\.|http|pin\s*code|pincode|road|street|nagar|floor|suite|plot|sector|india)\b/i;
const META_LINE=/\b(invoice\s*(?:no\.?|number|#)|bill\s*(?:no\.?|number)|receipt\s*no|dated|date)\b/i;
const COMPANY=/\b(pvt\.?|private|ltd\.?|limited|llp|inc\.?|corp|company|enterprises|stores|hotel|restaurant)\b/i;
const MONTHS:Record<string,string>={jan:'01',feb:'02',mar:'03',apr:'04',may:'05',jun:'06',jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'};
const PREFERRED_TOTAL=/(?:grand\s*total|invoice\s*total|total\s*amount|amount\s*payable|net\s*payable|balance\s*due|amount\s*due|amount\s*paid|net\s*amount|total\s*payable)/i;
const GENERIC_TOTAL=/(?:^|[^a-z])total(?:[^a-z]|$)/i;
const SKIP_TOTAL=/sub\s*total|taxable/i;

function clamp(n:number){return Math.max(0,Math.min(100,Math.round(n)));}

function score(base:number,overall:number){return clamp(base*0.7+overall*0.3);}

function moneyToken(raw:string){
 const cleaned=raw.replace(/,/g,'');
 return /^\d+\.\d{2}$/.test(cleaned)?cleaned:'';
}

function firstMoney(line:string){
 const money=line.match(/(?:INR|Rs\.?|USD|EUR|GBP|₹|\$)?\s*([\d,]+\.\d{2})/i);
 return money?moneyToken(money[1]):'';
}

function moneyAfter(line:string,label:RegExp){
 const found=label.exec(line);
 if(!found)return '';
 return firstMoney(line.slice(found.index+found[0].length))||'';
}

function isoDate(year:string,month:string,day:string){
 const y=Number(year),m=Number(month),d=Number(day);
 if(y<1990||y>2100||m<1||m>12||d<1||d>31)return '';
 const date=new Date(Date.UTC(y,m-1,d));
 if(date.getUTCFullYear()!==y||date.getUTCMonth()!==m-1||date.getUTCDate()!==d)return '';
 return `${String(y).padStart(4,'0')}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

function parseDateToken(token:string){
 const text=token.trim().replace(/,/g,'');
 let match=text.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
 if(match)return isoDate(match[1],match[2],match[3]);
 match=text.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
 if(match)return isoDate(match[3],match[2],match[1]);
 match=text.match(/^(\d{1,2})[-/. ]([A-Za-z]{3,9})[-/. ](\d{4})$/);
 if(match){const month=MONTHS[match[2].slice(0,3).toLowerCase()];if(month)return isoDate(match[3],month,match[1]);}
 match=text.match(/^([A-Za-z]{3,9})[-/. ](\d{1,2})[-/. ](\d{4})$/);
 if(match){const month=MONTHS[match[1].slice(0,3).toLowerCase()];if(month)return isoDate(match[3],month,match[2]);}
 return '';
}

function extractDate(raw:string){
 const labeled=raw.match(/(?:invoice\s*date|bill\s*date|receipt\s*date|dated|date)\s*[:\-]?\s*(\d{1,2}[-/.][A-Za-z0-9]{1,9}[-/.]\d{2,4}|[A-Za-z]{3,9}[-/. ]\d{1,2}[-/. ]\d{4}|\d{4}[-/.]\d{1,2}[-/.]\d{1,2})/i);
 if(labeled){const parsed=parseDateToken(labeled[1]);if(parsed)return parsed;}
 const named=raw.match(/\b(\d{1,2})[-/. ]([A-Za-z]{3,9})[-/. ](\d{4})\b/);
 if(named){const month=MONTHS[named[2].slice(0,3).toLowerCase()];const parsed=month?isoDate(named[3],month,named[1]):'';if(parsed)return parsed;}
 const dmy=raw.match(/\b(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})\b/);
 if(dmy){const parsed=isoDate(dmy[3],dmy[2],dmy[1]);if(parsed)return parsed;}
 const iso=raw.match(/\b(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})\b/);
 return iso?isoDate(iso[1],iso[2],iso[3]):'';
}

function extractAmount(lines:string[],raw:string){
 let preferred='';let generic='';
 for(let i=0;i<lines.length;i++){
  const line=lines[i];
  if(SKIP_TOTAL.test(line))continue;
  const label=PREFERRED_TOTAL.test(line)?PREFERRED_TOTAL:GENERIC_TOTAL.test(line)?GENERIC_TOTAL:null;
  if(!label)continue;
  const next=lines[i+1]||'';
  const value=moneyAfter(line,label)||(!/\b(cgst|sgst|igst|utgst|gst|vat|tax)\b/i.test(next)?firstMoney(next):'');
  if(!value)continue;
  if(label===PREFERRED_TOTAL)preferred=value;else generic=value;
 }
 if(preferred||generic)return preferred||generic;
 const loose=[...raw.matchAll(/(?:INR|Rs\.?|₹|\$)\s*([\d,]+\.\d{2})/gi)];
 return loose.length?moneyToken(loose.at(-1)![1]):'';
}

function extractTax(raw:string){
 const components=[...raw.matchAll(/\b(cgst|sgst|igst|utgst)\b[^\n]{0,40}?([\d,]+\.\d{2})/gi)];
 const componentRates=[...raw.matchAll(/\b(cgst|sgst|igst|utgst)\b[^\n]{0,24}?(\d{1,2}(?:\.\d{1,2})?)\s*%/gi)];
 let amount='';let rate='';
 if(components.length){
  let sum=0;const seenAmount=new Set<string>();
  for(const match of components){
   const name=match[1].toLowerCase()+':'+match.index;
   if(seenAmount.has(name))continue;seenAmount.add(name);
   const value=moneyToken(match[2]);if(!value)continue;
   sum+=Number(value);
  }
  if(sum>0)amount=sum.toFixed(2);
  let rates=0;const seenRate=new Set<string>();
  for(const match of componentRates){
   const name=match[1].toLowerCase();if(seenRate.has(name))continue;seenRate.add(name);
   rates+=Number(match[2]);
  }
  if(rates>0&&rates<=100)rate=String(rates);
 }
 if(!amount){
  const generic=[...raw.matchAll(/\b(?:gst|vat|tax)\s*(?:amount)?\s*[:\-]?\s*(?:INR|Rs\.?|₹|\$)?\s*([\d,]+\.\d{2})/gi)];
  let sum=0;for(const match of generic){const value=moneyToken(match[1]);if(value)sum+=Number(value);}
  if(sum>0)amount=sum.toFixed(2);
 }
 if(!rate){
  const labeled=raw.match(/\b(?:gst|vat|igst|tax)(?:\s+(?:amount\s*)?[\d,.]+)?\s*(?:@|at)\s*(\d{1,2}(?:\.\d{1,2})?)\s*%/i)||raw.match(/\b(?:gst|vat|igst)\s*(\d{1,2}(?:\.\d{1,2})?)\s*%/i);
  if(labeled)rate=labeled[1];
 }
 return{amount,rate};
}

function extractMerchant(lines:string[]){
 const candidates=lines.slice(0,10).filter(line=>{
  if(line.length<2||line.length>80)return false;
  if(SKIP_LINE.test(line)||ADDRESS_LIKE.test(line)||META_LINE.test(line)||/\b(cgst|sgst|igst|utgst|gst|vat|total|amount)\b/i.test(line))return false;
  if(/^[\d\s./:%-]+$/.test(line)||/^₹|^rs\.?\s*\d/i.test(line))return false;
  return /[A-Za-z]{3,}/.test(line);
 });
 return (candidates.find(line=>COMPANY.test(line))||candidates[0]||'').slice(0,100);
}

export function extractReceiptFields(rawText:string,overallConfidence=80,meta:{engine?:string;source?:string}={}):ExtractionResult{
 const raw=String(rawText||'');
 const lines=raw.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
 const fieldConfidence:Partial<Record<ExtractionFieldKey,number>>={};
 const fields:ExtractionFields={};

 const merchant=extractMerchant(lines);
 if(merchant){fields.merchant=merchant;fieldConfidence.merchant=score(merchant.length>=3?88:60,overallConfidence);}

 const amountRaw=extractAmount(lines,raw);
 if(amountRaw){fields.amount=amountRaw;fieldConfidence.amount=score(PREFERRED_TOTAL.test(raw)?92:70,overallConfidence);}

 const expenseDate=extractDate(raw);
 if(expenseDate){fields.expenseDate=expenseDate;fieldConfidence.expenseDate=score(/\b(?:invoice\s*date|bill\s*date|dated)\b/i.test(raw)?90:85,overallConfidence);}

 if(/\bUSD\b|\$/.test(raw)){fields.currency='USD';fieldConfidence.currency=score(88,overallConfidence);}
 else if(/\bEUR\b|€/.test(raw)){fields.currency='EUR';fieldConfidence.currency=score(88,overallConfidence);}
 else if(/\bGBP\b|£/.test(raw)){fields.currency='GBP';fieldConfidence.currency=score(88,overallConfidence);}
 else if(/\bINR\b|₹|\bRs\.?\b/i.test(raw)||fields.amount){fields.currency='INR';fieldConfidence.currency=score(/\bINR\b|₹|\bRs\.?\b/i.test(raw)?90:65,overallConfidence);}

 const tax=extractTax(raw);
 if(tax.amount){fields.taxAmount=tax.amount;fieldConfidence.taxAmount=score(82,overallConfidence);}
 if(tax.rate){fields.taxRatePercent=tax.rate;fieldConfidence.taxRatePercent=score(84,overallConfidence);}

 const invoiceNo=raw.match(/\b(?:invoice|bill|receipt)\s*(?:no\.?|number|#)\s*[:\-]?\s*([A-Za-z0-9][A-Za-z0-9/-]{1,30})/i);
 if(invoiceNo){fields.reference=invoiceNo[1].slice(0,40);fieldConfidence.reference=score(80,overallConfidence);}

 const keys=Object.keys(fieldConfidence) as ExtractionFieldKey[];
 const avg=keys.length?keys.reduce((n,k)=>n+(fieldConfidence[k]||0),0)/keys.length:overallConfidence;
 return{
  fields,
  fieldConfidence,
  overallConfidence:clamp(avg*0.6+overallConfidence*0.4),
  engine:meta.engine||'receipt_extract_v1',
  source:meta.source||'text',
 };
}

/** Merge extraction into expense form draft values. */
export function applyExtractionToDraft(values:any,extraction:ExtractionResult|null|undefined,opts:{overwrite?:boolean;keys?:ExtractionFieldKey[]}={}){
 if(!extraction?.fields)return{...values};
 const overwrite=!!opts.overwrite;
 const keys=opts.keys||(Object.keys(extraction.fields) as ExtractionFieldKey[]);
 const next={...values};
 for(const key of keys){
  const value=extraction.fields[key];
  if(value==null||value==='')continue;
  if(key==='taxRatePercent'||key==='taxAmount'){
   const current=next[key]??next.data?.[key];
   if(overwrite||current==null||current==='')next[key]=value;
   continue;
  }
  if(overwrite||!next[key])next[key]=value;
 }
 return next;
}

export function extractionFromDocumentData(data:any):ExtractionResult|null{
 const e=data?.extraction;
 if(!e?.fields)return null;
 return{
  fields:e.fields||{},
  fieldConfidence:e.fieldConfidence||{},
  overallConfidence:Number(e.overallConfidence||data?.ocrConfidence||0),
  engine:e.engine||'receipt_extract_v1',
  source:e.source||'unknown',
 };
}
