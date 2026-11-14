export type ScanVerdict='clean'|'rejected';

export type ScanInput={
 bytes:Uint8Array;
 mime:string;
 sha256:string;
 name:string;
 expectedSize?:number;
};

export type ScanResult={
 verdict:ScanVerdict;
 engine:string;
 reason?:string;
};

const ENGINE='builtin_v1';

function asciiHead(bytes:Uint8Array,n=64){
 return new TextDecoder('utf-8',{fatal:false}).decode(bytes.slice(0,n));
}

function looksLikeHtml(bytes:Uint8Array){
 const sample=new TextDecoder('utf-8',{fatal:false}).decode(bytes.slice(0,Math.min(bytes.length,2048))).trim().toLowerCase();
 return sample.startsWith('<!doctype html')||sample.startsWith('<html')||sample.includes('<html')||sample.includes('<script');
}

function hasZipLocalHeader(bytes:Uint8Array){
 return bytes.length>=4&&bytes[0]===0x50&&bytes[1]===0x4b&&bytes[2]===0x03&&bytes[3]===0x04;
}

function verifyMagic(mime:string,bytes:Uint8Array):string|null{
 const head=asciiHead(bytes,16);
 if(mime==='image/png'){
  if(!(bytes[0]===137&&head.slice(1,4)==='PNG'))return 'PNG magic bytes are invalid.';
  return null;
 }
 if(mime==='image/jpeg'){
  if(!(bytes[0]===255&&bytes[1]===216))return 'JPEG magic bytes are invalid.';
  return null;
 }
 if(mime==='image/webp'){
  if(!(head.startsWith('RIFF')&&head.slice(8,12)==='WEBP'))return 'WebP magic bytes are invalid.';
  return null;
 }
 if(mime==='application/pdf'){
  if(!head.startsWith('%PDF-'))return 'PDF magic bytes are invalid.';
  return null;
 }
 return null;
}

/** Built-in content scanner for Docker/tests and as fallback when no external AV is configured. */
export function scanContent(input:ScanInput):ScanResult{
 const{bytes,mime,expectedSize}=input;
 if(!bytes.byteLength)return{verdict:'rejected',engine:ENGINE,reason:'Empty file.'};
 if(expectedSize!=null&&expectedSize!==bytes.byteLength){
  return{verdict:'rejected',engine:ENGINE,reason:'Stored size does not match file bytes.'};
 }
 const magic=verifyMagic(mime,bytes);
 if(magic)return{verdict:'rejected',engine:ENGINE,reason:magic};

 if(mime.startsWith('image/')||mime==='application/pdf'){
  if(looksLikeHtml(bytes))return{verdict:'rejected',engine:ENGINE,reason:'File content resembles HTML rather than the declared type.'};
 }

 if(mime==='application/pdf'){
  // PDF polyglot: ZIP local header after PDF header is suspicious.
  if(hasZipLocalHeader(bytes.subarray(0,Math.min(bytes.length,1024)))||hasZipLocalHeader(bytes.subarray(Math.max(0,bytes.length-128)))){
   return{verdict:'rejected',engine:ENGINE,reason:'PDF appears to contain ZIP polyglot content.'};
  }
  const tail=new TextDecoder('utf-8',{fatal:false}).decode(bytes.slice(Math.max(0,bytes.length-2048)));
  if(!tail.includes('%%EOF')&&!tail.includes('%EOF')){
   return{verdict:'rejected',engine:ENGINE,reason:'PDF is missing a trailing EOF marker.'};
  }
  const body=new TextDecoder('utf-8',{fatal:false}).decode(bytes.slice(0,Math.min(bytes.length,8192))).toLowerCase();
  if(body.includes('/js')&&body.includes('/javascript')||body.includes('/launch')&&body.includes('/action')){
   return{verdict:'rejected',engine:ENGINE,reason:'PDF contains high-risk interactive content.'};
  }
 }

 if(mime.startsWith('text/')||mime==='application/vnd.ms-excel'){
  if(bytes.includes(0)||looksLikeHtml(bytes)){
   return{verdict:'rejected',engine:ENGINE,reason:'Import file must be plain UTF-8 without HTML.'};
  }
 }

 return{verdict:'clean',engine:ENGINE};
}
