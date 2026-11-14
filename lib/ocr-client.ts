import {extractReceiptFields,type ExtractionResult} from './receipt-extract';

export async function recognizeReceipt(file:File,onProgress:(p:number,message:string)=>void){
 let image:File|Blob=file;let raw='';let source='image';
 if(file.type==='application/pdf'){
  onProgress(5,'Reading PDF');const pdfjs=await import('pdfjs-dist');pdfjs.GlobalWorkerOptions.workerSrc='/pdf/pdf.worker.min.mjs';const pdf=await pdfjs.getDocument({data:new Uint8Array(await file.arrayBuffer()),useSystemFonts:true}).promise;const page=await pdf.getPage(1);const content=await page.getTextContent();raw=content.items.map((x:any)=>x.str||'').join('\n');source='pdf_text';
  if(raw.trim().length<35){source='scanned_pdf';const canvas=document.createElement('canvas');const viewport=page.getViewport({scale:1.8});canvas.width=viewport.width;canvas.height=viewport.height;await page.render({canvas,canvasContext:canvas.getContext('2d')!,viewport}as any).promise;image=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Could not read the PDF image.')),'image/png'));}
 }
 let confidence=100;if(source!=='pdf_text'){
  const{createWorker}=await import('tesseract.js');onProgress(10,'Preparing text recognition');const worker=await createWorker('eng',1,{workerPath:'/ocr/worker.min.js',corePath:'/ocr/core',langPath:'/ocr/lang',logger:m=>{if(m.status==='recognizing text')onProgress(15+Math.round((m.progress||0)*80),'Reading receipt');}});try{const r=await worker.recognize(image);raw=r.data.text;confidence=r.data.confidence;}finally{await worker.terminate();}
 }
 const extraction:ExtractionResult=extractReceiptFields(raw,confidence,{engine:'browser_assist',source:source==='pdf_text'?'pdf_text':'browser_tesseract'});
 onProgress(100,'Review the extracted details');
 return{text:raw,confidence,source,fields:extraction.fields,extraction};
}
