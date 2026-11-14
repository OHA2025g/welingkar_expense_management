import assert from 'node:assert/strict';
import {handle}from'../lib/api';
import{minor,converted,rateMicros,validDate,csvParse,csvCell,outstanding}from'../lib/domain';
import{extractReceiptFields,applyExtractionToDraft}from'../lib/receipt-extract';
import{extractPdfPlainText}from'../lib/server-ocr';
import{raw}from'./runtime';
let passed=0;const check=(label:string,fn:()=>any)=>{fn();passed++;console.log('PASS',label);};
type User={id:string;email:string;org?:string};const A:User={id:'synthetic-admin',email:'admin@example.test'},B:User={id:'synthetic-employee',email:'employee@example.test'},C:User={id:'synthetic-outsider',email:'outsider@example.test'};
async function call(user:User|null,path:string,method='GET',body?:any,version?:number,key?:string){const h:any={};if(user){h['oai-authenticated-user-id']=user.id;h['oai-authenticated-user-email']=user.email;h['oai-authenticated-user-full-name']=user===A?'Test Admin':user===B?'Test Employee':'Other Tenant';if(user.org)h['x-workspace-id']=user.org;}if(method!=='GET')h['idempotency-key']=key||crypto.randomUUID();if(version!==undefined)h['if-match']=String(version);let payload:any;if(body instanceof FormData)payload=body;else if(body){h['content-type']='application/json';payload=JSON.stringify(body);}const response=await handle(new Request('https://expenseflow-workspace.singh-aghoreshwar.chatgpt.site/api'+path,{method,headers:h,body:payload}));const type=response.headers.get('content-type')||'';const result=type.includes('json')?await response.json()as any:{bytes:new Uint8Array(await response.arrayBuffer())};return{status:response.status,data:result.data,error:result.error,raw:result};}
async function ok(user:User,path:string,method='GET',body?:any,version?:number,key?:string){const r=await call(user,path,method,body,version,key);assert.equal(r.status,200,`${method} ${path}: ${JSON.stringify(r.error)}`);return r.data;}
check('Exact decimal and currency rounding',()=>{assert.equal(minor('0.29'),29);assert.equal(converted(minor('10.01','USD'),'USD',rateMicros('83.125')),83208);assert.equal(minor('100','JPY'),100);assert.throws(()=>minor('1.001','INR'));assert.throws(()=>minor('-2'));});
check('Invalid calendar dates are rejected',()=>{assert.throws(()=>validDate('2026-02-30'));assert.throws(()=>validDate('2026-13-01'));assert.equal(validDate('2026-10-25'),'2026-10-25');});
check('CSV quoting and formula neutralization',()=>{assert.deepEqual(csvParse('a,b\n"x,y","z""q"'),[['a','b'],['x,y','z"q']]);assert.equal(csvCell('=1+2'),'"\'=1+2"');});
check('Settlement arithmetic',()=>assert.equal(outstanding(100000,30000,40000),30000));
check('Receipt structured extraction and draft apply',()=>{
 const sample='Cafe Bengaluru\nGSTIN 29AAAAA0000A1Z5\nDate 25/10/2026\nGrand Total INR 42.50\nGST 5.00 @ 18%\nThank you';
 const extraction=extractReceiptFields(sample,90,{engine:'test',source:'fixture'});
 assert.equal(extraction.fields.merchant,'Cafe Bengaluru');
 assert.equal(extraction.fields.amount,'42.50');
 assert.equal(extraction.fields.currency,'INR');
 assert.equal(extraction.fields.expenseDate,'2026-10-25');
 assert.equal(extraction.fields.taxAmount,'5.00');
 assert.equal(extraction.fields.taxRatePercent,'18');
 assert.ok((extraction.fieldConfidence.amount||0)>70);
 const draft=applyExtractionToDraft({merchant:'',amount:'1.00',currency:'USD'},extraction,{overwrite:true,keys:['merchant','amount']});
 assert.equal(draft.merchant,'Cafe Bengaluru');assert.equal(draft.amount,'42.50');assert.equal(draft.currency,'USD');
 const gst='TAX INVOICE\nHomestoLife Software Pvt Ltd\nGSTIN 29AAAAA0000A1Z5\n12 MG Road, Bengaluru\nInvoice No: INV-204\nInvoice Date: 25-Oct-2026\nSub Total 1,000.00\nCGST @ 9% 90.00\nSGST @ 9% 90.00\nTotal Amount\nINR 1,180.00';
 const bill=extractReceiptFields(gst,93,{engine:'test',source:'fixture'});
 assert.equal(bill.fields.merchant,'HomestoLife Software Pvt Ltd');
 assert.equal(bill.fields.expenseDate,'2026-10-25');
 assert.equal(bill.fields.amount,'1180.00');
 assert.equal(bill.fields.currency,'INR');
 assert.equal(bill.fields.taxAmount,'180.00');
 assert.equal(bill.fields.taxRatePercent,'18');
 assert.equal(bill.fields.reference,'INV-204');
 const filled=applyExtractionToDraft({merchant:'',expenseDate:'2026-11-03',amount:'',currency:'INR',taxRatePercent:'0',reference:''},bill,{overwrite:true});
 assert.equal(filled.merchant,'HomestoLife Software Pvt Ltd');assert.equal(filled.expenseDate,'2026-10-25');assert.equal(filled.amount,'1180.00');assert.equal(filled.taxRatePercent,'18');assert.equal(filled.reference,'INV-204');
});
assert.equal((await call(null,'/session','POST',{})).status,401);passed++;console.log('PASS Unauthenticated requests denied');
const session=await ok(A,'/session','POST',{});A.org=session.workspaces[0].id;const meta=await ok(A,'/metadata');const cat=meta.lookups.categories[0].id,account=meta.lookups.accounts[0].id,policy=meta.lookups.policies[0].id;const submitter=meta.lookups.roles.find((r:any)=>r.name==='Submitter').id;
const employee=await ok(A,'/employees','POST',{name:'Test Employee',email:B.email,roleId:submitter,managerId:meta.employee.id,policyId:policy,active:true});await ok(B,'/session','POST',{});B.org=A.org;const bmeta=await ok(B,'/metadata');assert.equal(bmeta.role,'Submitter');passed++;console.log('PASS Employee membership and role resolution');
assert.equal((await call(B,'/employees')).status,403);assert.equal((await call(B,'/preferences/organization')).status,403);passed++;console.log('PASS Submitter denied administration');
const cs=await ok(C,'/session','POST',{});C.org=A.org;assert.equal((await call(C,'/expenses')).status,403);C.org=cs.workspaces[0].id;passed++;console.log('PASS Cross-tenant workspace denial');
const body={expenseDate:'2026-10-25',merchant:'Synthetic merchant',categoryId:cat,currency:'INR',amount:'1000.00',fxRate:'1',reimbursable:true,description:'Synthetic test expense'};const key=crypto.randomUUID();const expense=await ok(B,'/expenses','POST',body,undefined,key);const repeated=await ok(B,'/expenses','POST',body,undefined,key);assert.equal(expense.record.id,repeated.record.id);assert.equal((await call(B,'/expenses','POST',{...body,amount:'2000.00'},undefined,key)).status,409);passed++;console.log('PASS Idempotency replay and conflicting payload rejection');
const edit=await ok(B,'/expenses/'+expense.record.id,'PATCH',{...body,description:'Updated business purpose'},1);assert.equal(edit.record.version,2);assert.equal((await call(B,'/expenses/'+expense.record.id,'PATCH',body,1)).status,412);passed++;console.log('PASS Stale record edits denied');
const otherExpense=await ok(C,'/expenses','POST',{...body,categoryId:(await ok(C,'/metadata')).lookups.categories[0].id});assert.equal((await call(A,'/expenses/'+otherExpense.record.id)).status,404);passed++;console.log('PASS Cross-tenant record ID denial');
const report=await ok(B,'/reports','POST',{name:'Synthetic claim',purpose:'Test workflow'});const rid=report.record.id;await ok(B,'/reports/'+rid+'/expenses','POST',{expenseIds:[expense.record.id]},1);let r=(await ok(B,'/reports/'+rid)).record;assert.equal(r.totalMinor,100000);await ok(B,'/reports/'+rid+'/submit','POST',{},r.version);r=(await ok(B,'/reports/'+rid)).record;assert.equal(r.status,'submitted');assert.equal((await call(B,'/reports/'+rid+'/approve','POST',{},r.version)).status,403);passed++;console.log('PASS Report submission and non-approver denial');
await ok(A,'/reports/'+rid+'/approve','POST',{},r.version);r=(await ok(B,'/reports/'+rid)).record;assert.equal(r.status,'approved');assert.equal((await call(B,'/expenses/'+expense.record.id,'PATCH',body,3)).status,409);passed++;console.log('PASS Approval and locked financial content');
assert.equal((await call(B,'/reports/'+rid,'PATCH',{status:'approved'},r.version)).status,422);passed++;console.log('PASS Direct state mass assignment blocked');
const advance=await ok(A,'/advances','POST',{ownerId:employee.record.id,currency:'INR',amount:'500.00',fxRate:'1',paidOn:'2026-10-25',accountId:account});await ok(A,'/reports/'+rid+'/advances','POST',{advanceId:advance.record.id,amount:'300.00'},r.version);r=(await ok(A,'/reports/'+rid)).record;assert.equal(r.outstandingMinor,70000);passed++;console.log('PASS Advance application and report balance');
await ok(A,'/advances/'+advance.record.id+'/refunds','POST',{amount:'200.00',refundedOn:'2026-10-25',reference:'SYNTH-REFUND'},1);const adv=(await ok(A,'/advances/'+advance.record.id)).record;assert.equal(adv.availableMinor,0);assert.equal((await call(A,'/advances/'+adv.id+'/refunds','POST',{amount:'0.01',refundedOn:'2026-10-25',reference:'OVER'},adv.version)).status,422);passed++;console.log('PASS Refund conservation and over-refund rejection');
const pkey=crypto.randomUUID();await ok(A,'/reports/'+rid+'/reimbursements','POST',{amount:'400.00',paidOn:'2026-10-25',accountId:account,reference:'SYNTH-PAY-1'},r.version,pkey);await ok(A,'/reports/'+rid+'/reimbursements','POST',{amount:'400.00',paidOn:'2026-10-25',accountId:account,reference:'SYNTH-PAY-1'},r.version,pkey);r=(await ok(A,'/reports/'+rid)).record;assert.equal(r.paidMinor,40000);assert.equal(r.outstandingMinor,30000);passed++;console.log('PASS Partial reimbursement and payment retry safety');
const concurrent=await Promise.all([call(A,'/reports/'+rid+'/reimbursements','POST',{amount:'300.00',paidOn:'2026-10-25',accountId:account,reference:'CONCURRENT-1'},r.version),call(A,'/reports/'+rid+'/reimbursements','POST',{amount:'300.00',paidOn:'2026-10-25',accountId:account,reference:'CONCURRENT-2'},r.version)]);assert.equal(concurrent.filter(x=>x.status===200).length,1);r=(await ok(A,'/reports/'+rid)).record;assert.equal(r.paidMinor,70000);assert.equal(r.outstandingMinor,0);passed++;console.log('PASS Concurrent reimbursement has one committed effect');
const bulk=await ok(B,'/expenses/bulk','POST',{rows:[{...body,amount:'10.00',merchant:'Bulk A'},{...body,amount:'20.00',merchant:'Bulk B'}]});assert.equal(bulk.created,2);const before=raw.prepare('SELECT COUNT(*) AS n FROM expenses').get()as any;const failed=await call(B,'/expenses/bulk','POST',{rows:[{...body,amount:'30.00',merchant:'Should rollback'},{...body,amount:'-1',merchant:'Invalid'}]});assert.equal(failed.status,422);assert.equal((raw.prepare('SELECT COUNT(*) AS n FROM expenses').get()as any).n,before.n);passed++;console.log('PASS Bulk expense write is atomic');
const demo=await ok(A,'/workspaces/demo','POST',{});const saved=A.org;A.org=demo.organization.id;const dash=await ok(A,'/dashboard');assert(dash.totalSpendMinor>0);assert.equal(dash.pendingReports,3);const dmeta=await ok(A,'/metadata');assert.equal(dmeta.reports.length,31);for(const rep of dmeta.reports){const result=await call(A,'/analytics/'+rep.key);assert.equal(result.status,200,rep.report_name+': '+JSON.stringify(result.error));}passed++;console.log('PASS Synthetic workspace and all 31 report engines');A.org=saved;
const trip=await ok(B,'/trips','POST',{name:'Synthetic trip',travelType:'Domestic',destination:'Bengaluru'});await ok(B,'/trips/'+trip.record.id+'/itinerary','POST',{kind:'flight',startsAt:'2026-10-26T10:00',endsAt:'2026-10-26T12:00',fromPlace:'Mumbai',toPlace:'Bengaluru'},1);let tr=(await ok(B,'/trips/'+trip.record.id)).record;await ok(B,'/trips/'+tr.id+'/submit','POST',{},tr.version);tr=(await ok(A,'/trips/'+tr.id)).record;await ok(A,'/trips/'+tr.id+'/approve','POST',{},tr.version);tr=(await ok(A,'/trips/'+tr.id)).record;assert.equal(tr.status,'approved');passed++;console.log('PASS Trip itinerary and approval lifecycle');
const pdf=await call(A,'/reports/'+rid+'/pdf');assert.equal(pdf.status,200);assert.equal(new TextDecoder().decode(pdf.raw.bytes.slice(0,4)),'%PDF');passed++;console.log('PASS Actual PDF generation');
const backup=await ok(A,'/backups/data','POST',{});const zipped=await call(A,'/documents/'+backup.documentId+'/download');assert.equal(zipped.status,200);assert.equal(zipped.raw.bytes[0],0x50);assert.equal(zipped.raw.bytes[1],0x4b);passed++;console.log('PASS Actual ZIP backup and authorized download');
await ok(B,'/personal/bank','POST',{holderName:'Synthetic Employee',bankName:'Test Bank',accountNumber:'000123456789',confirmAccountNumber:'000123456789',accountType:'Savings',ifsc:'TEST0000001'});const bank=raw.prepare('SELECT * FROM bank_accounts WHERE orgId=?').get(A.org!)as any;assert(!bank.encrypted.includes('000123456789'));const personal=await ok(B,'/personal');assert.equal(personal.banks[0].lastFour,'6789');assert(!JSON.stringify(personal).includes('000123456789'));passed++;console.log('PASS Protected bank identifiers encrypted and masked');
assert.throws(()=>raw.exec("UPDATE audit_events SET action='tampered'"));assert.throws(()=>raw.exec('DELETE FROM reimbursements'));passed++;console.log('PASS Immutable financial and audit history');
// Additional cross-module financial and privacy checks.
const frozen=(await ok(A,'/reports/'+rid)).findings;
await ok(A,'/category_limits','POST',{name:'Tight synthetic category',policyId:policy,categoryId:cat,limit:'50.00',receiptThreshold:'0',requireReceipt:false,requireDescription:false,action:'warn'});
assert.deepEqual((await ok(A,'/reports/'+rid)).findings,frozen);passed++;console.log('PASS Submitted policy snapshots remain stable after configuration changes');
const limiting=await ok(B,'/expenses','POST',{...body,amount:'51.00',merchant:'Policy check'});const findings=(await ok(B,'/expenses/'+limiting.record.id)).findings;assert(findings.some((f:any)=>f.message==='Tight synthetic category limit exceeded.'));passed++;console.log('PASS Category policy limits evaluated on editable expenses');
await ok(A,'/custom_fields','POST',{name:'Cost center',fieldKey:'costCenter',module:'trips',fieldType:'text',mandatory:true,showInPdf:true,options:'',defaultValue:'',maxLength:'30'});
assert.equal((await call(B,'/trips','POST',{name:'Missing custom value',travelType:'Domestic'})).status,422);
const customTrip=await ok(B,'/trips','POST',{name:'Configured form',travelType:'Domestic',customValues:{costCenter:'TEST-01'}});assert.equal((await ok(B,'/trips/'+customTrip.record.id)).record.customValues.costCenter,'TEST-01');passed++;console.log('PASS Typed custom field requiredness enforced by server');
const budget=await ok(A,'/budgets','POST',{name:'Synthetic enforced budget',kind:'user',ownerId:employee.record.id,fiscalStart:'2027-04-01',fiscalEnd:'2028-03-31',period:'yearly',warningPercent:'80',blockAtLimit:true,lines:[{startDate:'2027-04-01',endDate:'2028-03-31',amount:'100.00'}]});
const within=await ok(B,'/expenses','POST',{...body,expenseDate:'2027-06-01',amount:'50.00',merchant:'Budget within'});assert.equal((await call(B,'/expenses','POST',{...body,expenseDate:'2027-06-01',amount:'60.00',merchant:'Over budget'})).status,422);assert.equal((await call(B,'/expenses/'+within.record.id,'PATCH',{amount:'150.00'},1)).status,422);assert.equal((await ok(A,'/budgets/'+budget.record.id)).record.actualMinor,5000);passed++;console.log('PASS Budget enforcement on both create and edit');
const pol=(await ok(A,'/policies/'+policy)).record;await ok(A,'/policies/'+policy,'PATCH',{...pol,mileageRate:'8.00',perDiemRate:'1000.00'},pol.version);
const mileage=await ok(B,'/expenses','POST',{...body,kind:'mileage',amount:'0',distance:'12.5',merchant:'Mileage test'});assert.equal(mileage.record.amountMinor,10000);
const diem=await ok(B,'/expenses','POST',{...body,kind:'per_diem',amount:'0',allowanceStart:'2026-10-25',allowanceEnd:'2026-10-27',location:'Bengaluru',merchant:'Allowance test'});assert.equal(diem.record.amountMinor,300000);passed++;console.log('PASS Mileage and per diem calculate from configured policy rates');
const card=await ok(A,'/cards','POST',{name:'Synthetic corporate card',ownerId:employee.record.id,kind:'corporate',bank:'Test Bank',lastFour:'1234',currency:'INR'});
const csvForm=new FormData();csvForm.append('file',new File(['date,description,amount,currency\n2026-10-25,Synthetic card merchant,25.00,INR'], 'synthetic-statement.csv',{type:'text/csv'}));const csvDoc=await ok(A,'/documents','POST',csvForm);const stage=await ok(A,'/imports/preview','POST',{kind:'cards',documentId:csvDoc.record.id,cardId:card.record.id});assert.equal(stage.accepted,1);await ok(A,'/imports/'+stage.stageId+'/commit','POST',{},stage.version);const cardDetail=await ok(A,'/cards/'+card.record.id);assert.equal(cardDetail.transactions.length,1);const txn=cardDetail.transactions[0];const convertedCard=await ok(A,'/cards/'+card.record.id+'/transactions/'+txn.id+'/convert','POST',{categoryId:cat,fxRate:'1',description:'Synthetic corporate purchase'},txn.version);assert.equal(convertedCard.record.amountMinor,2500);assert.equal(convertedCard.record.reimbursable,0);assert.equal((await ok(A,'/cards/'+card.record.id)).transactions[0].status,'matched');assert.equal((await call(A,'/imports/'+stage.stageId+'/commit','POST',{},stage.version)).status,409);passed++;console.log('PASS CSV staging, one-time commit, corporate conversion and reconciliation');
const requested=await ok(A,'/preferences/advance_preferences');await ok(A,'/preferences/advance_preferences','PUT',{...requested.values,approvalMode:'simple'},requested.version);const pendingAdvance=await ok(A,'/advances','POST',{ownerId:employee.record.id,currency:'INR',amount:'50.00',fxRate:'1',paidOn:'2026-10-25',accountId:account});assert.equal(pendingAdvance.record.status,'requested');assert.equal((await ok(A,'/advances/'+pendingAdvance.record.id)).approvals.length,1);await ok(A,'/advances/'+pendingAdvance.record.id+'/approve','POST',{},1);assert.equal((await ok(B,'/advances/'+pendingAdvance.record.id)).record.status,'approved');passed++;console.log('PASS Configured advance approval creates and resolves a real task');
const settledIds=[];for(let i=0;i<2;i++){const e=await ok(B,'/expenses','POST',{...body,amount:'20.00',merchant:'Batch expense '+i});const claim=await ok(B,'/reports','POST',{name:'Batch synthetic '+i});await ok(B,'/reports/'+claim.record.id+'/expenses','POST',{expenseIds:[e.record.id]},1);await ok(B,'/reports/'+claim.record.id+'/submit','POST',{},2);await ok(A,'/reports/'+claim.record.id+'/approve','POST',{},3);settledIds.push(claim.record.id);}
const batch=await ok(A,'/batches','POST',{name:'Synthetic batch',currency:'INR',accountId:account,paymentDate:'2026-10-25'});await ok(A,'/batches/'+batch.record.id+'/reserve-reports','POST',{reportIds:settledIds},1);const secondBatch=await ok(A,'/batches','POST',{name:'Competing batch',currency:'INR',accountId:account,paymentDate:'2026-10-25'});assert.equal((await call(A,'/batches/'+secondBatch.record.id+'/reserve-reports','POST',{reportIds:settledIds},1)).status,422);await ok(A,'/batches/'+batch.record.id+'/authorize','POST',{},2);await ok(A,'/batches/'+batch.record.id+'/pay','POST',{reference:'SYNTH-BATCH-PAID'},3);for(const id of settledIds)assert.equal((await ok(A,'/reports/'+id)).record.outstandingMinor,0);passed++;console.log('PASS Batch exclusivity, authorization and offline settlement');
const png=new Uint8Array(Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6ZEAAAAAASUVORK5CYII=','base64'));const receiptForm=new FormData();receiptForm.append('file',new File([png],'synthetic-receipt.png',{type:'image/png'}));const receipt=await ok(B,'/documents','POST',receiptForm);assert.equal(receipt.record.status,'clean');assert.equal(receipt.record.ocrStatus,'awaiting_assist');assert.ok(receipt.record.version>1);const afterScan=(await ok(B,'/documents/'+receipt.record.id)).record;assert.equal(afterScan.status,'clean');assert.equal(afterScan.data?.securityScan,'content_clean');assert.equal(afterScan.ocrStatus,'awaiting_assist');const withReceipt=await ok(B,'/expenses','POST',{...body,amount:'1.00',documentIds:[receipt.record.id]});const secureReport=await ok(B,'/reports','POST',{name:'Receipt processing gate'});await ok(B,'/reports/'+secureReport.record.id+'/expenses','POST',{expenseIds:[withReceipt.record.id]},1);raw.prepare("UPDATE documents SET status='quarantined' WHERE id=?").run(receipt.record.id);const gated=await call(B,'/reports/'+secureReport.record.id+'/submit','POST',{},2);assert.equal(gated.error.code,'document_processing_pending');raw.prepare("UPDATE documents SET status='clean' WHERE id=?").run(receipt.record.id);await ok(B,'/reports/'+secureReport.record.id+'/submit','POST',{},2);assert.equal((await ok(B,'/reports/'+secureReport.record.id)).record.status,'submitted');passed++;console.log('PASS Receipt upload finishes the security scan, and a quarantined receipt still blocks submit');
const importForm=new FormData();importForm.append('file',new File(['merchant,date,amount,currency,category\nCafe,2026-10-25,10.00,INR,Accommodation'],'import-rows.csv',{type:'text/csv'}));const importDoc=await ok(B,'/documents','POST',importForm);assert.equal(importDoc.record.status,'validated');passed++;console.log('PASS Import CSV uploads are type-validated without quarantine');
const badPdf=new TextEncoder().encode('%PDF-1.4\n<html><body>malicious</body></html>\n');const badForm=new FormData();badForm.append('file',new File([badPdf],'hostile.pdf',{type:'application/pdf'}));const hostile=await ok(B,'/documents','POST',badForm);assert.equal(hostile.record.status,'rejected');await ok(A,'/automation/run','POST',{});const rejectedDoc=(await ok(B,'/documents/'+hostile.record.id)).record;assert.equal(rejectedDoc.status,'rejected');assert.equal((await call(B,'/documents/'+hostile.record.id+'/download')).status,403);const rejectedExpense=await ok(B,'/expenses','POST',{...body,amount:'2.00',merchant:'Rejected receipt expense',documentIds:[hostile.record.id]});const rejectedReport=await ok(B,'/reports','POST',{name:'Rejected receipt gate'});await ok(B,'/reports/'+rejectedReport.record.id+'/expenses','POST',{expenseIds:[rejectedExpense.record.id]},1);assert.equal((await call(B,'/reports/'+rejectedReport.record.id+'/submit','POST',{},2)).error.code,'document_processing_pending');passed++;console.log('PASS Rejected receipts stay blocked for download and report submission');
const demoSeed=await ok(A,'/workspaces/demo','POST',{});const priorOrg=A.org!;A.org=demoSeed.organization.id;await ok(A,'/metadata');const sampleDocs=(await ok(A,'/documents?limit=50')).items.filter((d:any)=>String(d.id).includes('_sample_doc_'));assert.ok(sampleDocs.some((d:any)=>d.status==='clean'));A.org=priorOrg;passed++;console.log('PASS Demo sample receipts remain pre-cleared as clean');
await ok(B,'/personal/travel','POST',{firstName:'Synthetic',lastName:'Employee',nationality:'India',version:0});const travelDoc=await ok(B,'/travel_documents','POST',{name:'Synthetic identity',documentType:'Passport',documentNumber:'SYNTH123456',issuedOn:'2020-01-01',expiresOn:'2030-01-01',country:'India',consent:true});const visibleDoc=(await ok(B,'/travel_documents')).items[0];assert(!JSON.stringify(visibleDoc).includes('Encrypted'));const aDocs=(await ok(A,'/travel_documents')).items;assert.equal(aDocs[0].documentNumber,'••••3456');assert(!JSON.stringify(aDocs).includes('Encrypted'));await ok(B,'/travel_documents/'+travelDoc.record.id,'PATCH',{...visibleDoc,name:'Renamed synthetic identity'},visibleDoc.version);const encryptedDoc=raw.prepare("SELECT data FROM configurations WHERE id=?").get(travelDoc.record.id)as any;assert(!encryptedDoc.data.includes('SYNTH123456'));passed++;console.log('PASS Travel identifiers stay encrypted and display only masked values');

const itemized=await ok(B,'/expenses','POST',{...body,kind:'itemized',categoryId:'',amount:'0',currency:'JPY',fxRate:'0.55',items:[{categoryId:cat,description:'First',amount:'100'},{categoryId:cat,description:'Second',amount:'200'}]});assert.equal(itemized.record.amountMinor,300);assert.equal(itemized.record.baseAmountMinor,16500);await ok(B,'/expenses/'+itemized.record.id,'PATCH',{description:'Keep line items'},1);const preserved=await ok(B,'/expenses/'+itemized.record.id);assert.equal(preserved.items.length,2);assert.equal(preserved.record.amountMinor,300);passed++;console.log('PASS Itemized currencies and partial edits preserve line totals');

const receiptTextPdf=Buffer.from(`%PDF-1.1\n1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj\n2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj\n3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj\n4 0 obj<< /Length 110 >>stream\nBT /F1 12 Tf 40 100 Td (Cafe Bengaluru Grand Total INR 42.50 GST Amount 5.00 Date 2026-10-25) Tj ET\nendstream\nendobj\n5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj\ntrailer<< /Root 1 0 R >>\n%%EOF\n`);
const ocrPdfForm=new FormData();ocrPdfForm.append('file',new File([receiptTextPdf],'text-receipt.pdf',{type:'application/pdf'}));
const ocrPdf=await ok(B,'/documents','POST',ocrPdfForm);
const ocrDoc=(await ok(B,'/documents/'+ocrPdf.record.id)).record;
assert.ok(['completed','needs_review'].includes(ocrDoc.ocrStatus),ocrDoc.ocrStatus);
assert.ok(ocrDoc.extraction?.fields?.amount,'missing extraction amount');
assert.equal(ocrDoc.extraction.fields.amount,'42.50');
assert.equal(ocrDoc.extraction.fields.currency,'INR');
passed++;console.log('PASS Text PDF receipt_ocr job writes structured extraction');

const {PDFDocument,StandardFonts}=await import('pdf-lib');
const pdfDoc=await PDFDocument.create();
const page=pdfDoc.addPage([400,640]);
const font=await pdfDoc.embedFont(StandardFonts.Helvetica);
['Blue Tokai Coffee','Tax Invoice','GSTIN 29AAAAA0000A1Z5','12 MG Road, Bengaluru','Date 25/10/2026','CGST 98.00','SGST 98.00','GST @ 18%','Grand Total INR 1,284.50','Amount paid INR 1,284.50'].forEach((line,i)=>page.drawText(line,{x:40,y:600-i*22,size:12,font}));
const compressed=await pdfDoc.save();
assert.ok((await extractPdfPlainText(compressed)).includes('Blue Tokai Coffee'));
const libForm=new FormData();libForm.append('file',new File([compressed],'invoice-pdflib.pdf',{type:'application/pdf'}));
const libUpload=await ok(B,'/documents','POST',libForm);
const libDoc=(await ok(B,'/documents/'+libUpload.record.id)).record;
assert.equal(libDoc.status,'clean',libDoc.status);
assert.equal(libDoc.ocrStatus,'completed',JSON.stringify(libDoc.extraction?.fields||libDoc.ocrStatus));
assert.equal(libDoc.extraction.fields.merchant,'Blue Tokai Coffee');
assert.equal(libDoc.extraction.fields.amount,'1284.50');
assert.equal(libDoc.extraction.fields.expenseDate,'2026-10-25');
assert.equal(libDoc.extraction.fields.currency,'INR');
assert.equal(libDoc.extraction.fields.taxAmount,'196.00');
assert.equal(libDoc.extraction.fields.taxRatePercent,'18');
passed++;console.log('PASS Compressed PDF extracts merchant, amount, date, currency and tax');

const assistText='Tax Invoice\nCorner Cafe\nDate 26/10/2026\nAmount paid INR 99.00\nCGST 8.91\nSGST 8.91\nGST @ 18%\n';
const assistForm=new FormData();assistForm.append('file',new File([png],'assist-receipt.png',{type:'image/png'}));
const assistDoc=await ok(B,'/documents','POST',assistForm);
const assistAfter=(await ok(B,'/documents/'+assistDoc.record.id)).record;
assert.equal(assistDoc.record.ocrStatus,'awaiting_assist');
assert.equal(assistDoc.record.version,assistAfter.version);
const assist=await ok(B,'/documents/'+assistDoc.record.id+'/ocr','POST',{text:assistText,confidence:88,source:'browser_tesseract'},assistDoc.record.version);
assert.ok(assist.extraction?.fields?.amount);
assert.equal(assist.extraction.fields.amount,'99.00');
assert.equal(assist.extraction.fields.taxAmount,'17.82');
assert.equal(assist.extraction.fields.taxRatePercent,'18');
assert.ok(['completed','needs_review'].includes(assist.ocrStatus));
const reviewed=await ok(B,'/documents/'+assistDoc.record.id+'/extract/apply-review','POST',{},assist.version);
assert.equal(reviewed.reviewed,true);
passed++;console.log('PASS Browser-assist OCR extracts tax server-side and supports review flag');

const lowPref=await ok(A,'/preferences/audit_preferences');
await ok(A,'/preferences/audit_preferences','PUT',{...lowPref.values,threshold:'95',amountMismatch:true},lowPref.version);
const low=await ok(B,'/documents/'+assistDoc.record.id+'/ocr','POST',{text:assistText,confidence:40,source:'browser_tesseract'},reviewed.version);
assert.equal(low.ocrStatus,'needs_review');
const mismatchExpense=await ok(B,'/expenses','POST',{...body,amount:'10.00',merchant:'OCR mismatch cafe',documentIds:[assistDoc.record.id]});
const mismatchFindings=(await ok(B,'/expenses/'+mismatchExpense.record.id)).findings;
assert.ok(mismatchFindings.some((f:any)=>f.rule==='amount_mismatch'));
assert.ok(mismatchFindings.some((f:any)=>f.rule==='ocr_confidence'));
const jobsBefore=Number((raw.prepare("SELECT COUNT(*) AS n FROM jobs WHERE orgId=? AND kind='receipt_ocr' AND dedupeKey=?").get(A.org!,'ocr:'+ocrPdf.record.id)as any).n);
await ok(A,'/automation/run','POST',{});
const jobsAfter=Number((raw.prepare("SELECT COUNT(*) AS n FROM jobs WHERE orgId=? AND kind='receipt_ocr' AND dedupeKey=?").get(A.org!,'ocr:'+ocrPdf.record.id)as any).n);
assert.equal(jobsBefore,1);assert.equal(jobsAfter,1);
const aiPref=await ok(A,'/preferences/ai_preferences');
await ok(A,'/preferences/ai_preferences','PUT',{...aiPref.values,receiptOcr:false},aiPref.version);
const gatedForm=new FormData();gatedForm.append('file',new File([receiptTextPdf],'gated-receipt.pdf',{type:'application/pdf'}));
const gatedDoc=await ok(B,'/documents','POST',gatedForm);
await ok(A,'/automation/run','POST',{});
const gatedJobs=Number((raw.prepare("SELECT COUNT(*) AS n FROM jobs WHERE orgId=? AND kind='receipt_ocr' AND dedupeKey=?").get(A.org!,'ocr:'+gatedDoc.record.id)as any).n);
assert.equal(gatedJobs,0);
assert.equal((await ok(B,'/documents/'+gatedDoc.record.id)).record.ocrStatus,'not_started');
assert.equal((await call(B,'/documents/'+gatedDoc.record.id+'/ocr','POST',{text:assistText,confidence:90},1)).status,403);
await ok(A,'/preferences/ai_preferences','PUT',{...aiPref.values,receiptOcr:true},(await ok(A,'/preferences/ai_preferences')).version);
await ok(A,'/preferences/audit_preferences','PUT',{...lowPref.values,threshold:'75',amountMismatch:true},(await ok(A,'/preferences/audit_preferences')).version);
passed++;console.log('PASS OCR threshold, amount mismatch, job dedupe and receiptOcr preference gate');

const localAccounts=[
 {id:'local_seedy',email:'seedy@sites.test',role:'Admin'},
 {id:'local_priya',email:'priya.kapoor@example.test',role:'Admin'},
 {id:'local_maya',email:'maya.shah@example.test',role:'Approver'},
 {id:'local_rohan',email:'rohan.mehta@example.test',role:'Submitter'},
 {id:'local_ananya',email:'ananya.rao@example.test',role:'Submitter'},
 {id:'local_arjun',email:'arjun.nair@example.test',role:'Submitter'},
];
const localSession=await ok(localAccounts[0],'/session','POST',{});
const localCompany=localSession.workspaces.find((w:any)=>!w.isDemo);
const localDemo=localSession.workspaces.find((w:any)=>w.isDemo);
assert.ok(localCompany&&localDemo);
for(const account of localAccounts){
 const user={...account,org:localCompany.id};
 const meta=await ok(user,'/metadata');
 assert.equal(meta.role,account.role,account.email);
 const expenses=await ok(user,'/expenses?limit=100');
 const reports=await ok(user,'/reports?limit=50');
 const trips=await ok(user,'/trips?limit=20');
 const advances=await ok(user,'/advances?limit=20');
 const cards=await ok(user,'/cards?limit=20');
 if(account.role==='Admin')assert.equal(expenses.items.length,30);
 else assert.equal(expenses.items.length,5);
 assert.ok(['draft','submitted','approved','rejected'].every(status=>reports.items.some((r:any)=>r.status===status)));
 assert.equal(trips.items.filter((t:any)=>t.ownerId===meta.employee.id||account.role==='Admin').length>=1,true);
 assert.ok(advances.items.length>=1);
 assert.ok(cards.items.length>=1);
}
const maya={...localAccounts[2],org:localCompany.id};
const mayaQueue=await ok(maya,'/approvals');
assert.ok(mayaQueue.items.some((item:any)=>item.module==='reports'&&item.employee!=='Maya Shah'));
assert.ok(mayaQueue.items.some((item:any)=>item.module==='trips'));
const rohanRow=raw.prepare('SELECT id,managerId FROM employees WHERE orgId=? AND authId=?').get(localCompany.id,'local_rohan') as {id:string;managerId:string};
const mayaRow=raw.prepare('SELECT id FROM employees WHERE orgId=? AND authId=?').get(localCompany.id,'local_maya') as {id:string};
assert.equal(rohanRow.managerId,mayaRow.id);
assert.equal((await call({...localAccounts[3],org:localCompany.id},'/budgets')).status,403);
assert.ok((await ok({...localAccounts[0],org:localCompany.id},'/budgets')).items.length>=1);
await ok(localAccounts[0],'/session','POST',{});
const again=await ok({...localAccounts[0],org:localCompany.id},'/expenses?limit=100');
assert.equal(again.items.length,30);
const demoSubmitter={...localAccounts[3],org:localDemo.id};
assert.ok((await ok(demoSubmitter,'/expenses?limit=100')).items.length>=5);
assert.ok((await ok({...localAccounts[2],org:localDemo.id},'/approvals')).items.length>=1);
passed++;console.log('PASS Local role packs for Admin, Approver and Submitter');

console.log(JSON.stringify({passed,status:'passed',scope:'Isolated in-memory SQLite and R2 fixture; no live financial system accessed.'}));
