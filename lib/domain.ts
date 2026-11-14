export class AppError extends Error {
  constructor(public code: string, message: string, public status = 422, public fields?: Record<string,string>) { super(message); }
}
export const requireValue = (test: unknown, message: string, code='validation_error', status=422) => { if (!test) throw new AppError(code,message,status); };
export const parseJSON = <T=any>(value: any, fallback: T = {} as T): T => { try { return typeof value === 'string' ? JSON.parse(value) : value ?? fallback; } catch { return fallback; } };
export const currencyDecimals: Record<string,number> = { INR:2,USD:2,EUR:2,GBP:2,AED:2,SGD:2,AUD:2,CAD:2,JPY:0,CHF:2,CNY:2,SAR:2 };
export function minor(value: unknown, currency='INR'): number {
  const places=currencyDecimals[currency]; requireValue(places!==undefined,'Choose a supported currency.');
  const s=String(value??'').trim(); const m=s.match(/^(\d{1,12})(?:\.(\d+))?$/);
  requireValue(m,'Enter a nonnegative decimal amount.'); requireValue((m![2]||'').length<=places,`${currency} supports ${places} decimal places.`);
  const n=BigInt(m![1])*10n**BigInt(places)+BigInt((m![2]||'').padEnd(places,'0')||'0');
  requireValue(n<=9000000000000n,'The amount exceeds the supported limit.'); return Number(n);
}
export function decimal(value: number, currency='INR'): string { const dp=currencyDecimals[currency]??2;const n=Math.round(value);return dp ? `${Math.floor(n/10**dp)}.${String(n%10**dp).padStart(dp,'0')}` : String(n); }
export function rateMicros(value: unknown): number { const s=String(value??''); requireValue(/^\d{1,7}(\.\d{1,6})?$/.test(s),'Enter a positive exchange rate with up to six decimal places.'); const [a,b='']=s.split('.'); const n=Number(a)*1e6+Number(b.padEnd(6,'0')); requireValue(n>0,'The exchange rate must be greater than zero.'); return n; }
export function converted(amount: number, source: string, rate: number, target='INR'): number {
  const numerator=BigInt(amount)*BigInt(rate)*10n**BigInt(currencyDecimals[target]??2); const denominator=1000000n*10n**BigInt(currencyDecimals[source]??2);
  const n=(numerator+denominator/2n)/denominator; requireValue(n<=9000000000000n,'The converted amount exceeds the supported limit.'); return Number(n);
}
export function validDate(value: unknown, label='Date'): string { const s=String(value??'');const d=new Date(s+'T00:00:00Z'); requireValue(/^\d{4}-\d{2}-\d{2}$/.test(s)&&!Number.isNaN(d.getTime())&&d.toISOString().startsWith(s),`${label} must be a valid date.`); return s; }
export function text(value: unknown, max=500, required=false, label='Value'): string { const s=String(value??'').trim(); requireValue(!required||s.length,`${label} is required.`);requireValue(s.length<=max,`${label} must be ${max} characters or fewer.`);return s; }
export function outstanding(gross: number, advances: number, payments: number): number { return Math.max(0,gross-advances-payments); }
export type PermissionRole = {name:string;permissions: Record<string,any>};
export const isAdmin=(role:PermissionRole)=>role.name==='Admin';
export const granted=(role:PermissionRole,key:string)=>isAdmin(role)||role.permissions[key]===true||['all','company','direct','self'].includes(role.permissions[key]);
export function assertPermission(role:PermissionRole,key:string) { requireValue(granted(role,key),'Your role does not permit this action.','permission_denied',403); }
export function visibleTo(role:PermissionRole,actorId:string,ownerId:string,directIds:string[],module:string) { const scope=role.permissions[`${module}.view`]??'self';return isAdmin(role)||scope==='all'||scope==='company'||ownerId===actorId||(scope==='direct'&&directIds.includes(ownerId)); }
export const builtinPermissions: Record<string,Record<string,any>> = {
  Admin:{},
  Approver:{'expenses.view':'self','reports.view':'direct','trips.view':'direct','advances.view':'self','cards.view':'self','expenses.create':true,'reports.create':true,'reports.submit':true,'reports.approve':true,'reports.reject':true,'reports.recall':true,'trips.create':true,'trips.submit':true,'trips.approve':true,'trips.reject':true,'trips.cancel':true,'trips.close':true,'trips.reopen':true,'trips.archive':true,'advances.create':true,'cards.create':true,'analytics.view':true,'profile.edit':true,'delegation.submit':true},
  Submitter:{'expenses.view':'self','reports.view':'self','trips.view':'self','advances.view':'self','cards.view':'self','expenses.create':true,'reports.create':true,'reports.submit':true,'reports.recall':true,'trips.create':true,'trips.submit':true,'trips.cancel':true,'trips.close':true,'trips.reopen':true,'trips.archive':true,'advances.create':true,'cards.create':true,'analytics.view':true,'profile.edit':true,'delegation.submit':true}
};
export function csvParse(input: string): string[][] {
  const separator=input.split('\n')[0].includes('\t')?'\t':',';const rows:string[][]=[];let row:string[]=[];let cell='';let quote=false;
  for(let i=0;i<input.length;i++){const ch=input[i];if(ch==='"'){if(quote&&input[i+1]==='"'){cell+='"';i++;}else quote=!quote;}else if(ch===separator&&!quote){row.push(cell);cell='';}else if((ch==='\n'||ch==='\r')&&!quote){if(ch==='\r'&&input[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x.trim()))rows.push(row);row=[];cell='';}else cell+=ch;}
  requireValue(!quote,'The import contains an unclosed quoted field.');row.push(cell);if(row.some(x=>x.trim()))rows.push(row);requireValue(rows.length<=5001,'Import at most 5,000 rows at a time.');return rows;
}
export function csvCell(value: unknown): string { let s=String(value??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'; }
export type PolicyFinding = {rule:string;severity:'warning'|'block';message:string;expenseId?:string};
export function policyFindings(expense:any,policy:any,hasReceipt:boolean):PolicyFinding[]{
  const p=policy||{};const findings:PolicyFinding[]=[];
  const add=(rule:string,severity:'warning'|'block',message:string)=>findings.push({rule,severity,message,expenseId:expense.id});
  if(!expense.categoryId) add('category',p.allowUncategorized===false?'block':'warning','Choose an expense category.');
  if(p.receiptThresholdMinor>0&&expense.baseAmountMinor>=p.receiptThresholdMinor&&!hasReceipt)add('receipt',p.receiptAction==='warn'?'warning':'block','Attach a receipt for this amount.');
  if(p.expenseLimitMinor>0&&expense.baseAmountMinor>p.expenseLimitMinor)add('expense_limit',p.limitAction==='block'?'block':'warning','The expense exceeds your policy limit.');
  if(p.requireDescription&&!expense.description)add('description','block','Add a business description.');
  if(p.maxAgeDays>0&&Date.parse(expense.expenseDate)<Date.now()-p.maxAgeDays*86400000)add('expense_age','warning','This expense is older than the policy submission window.');
  return findings;
}
export const stateTransitions:Record<string,Record<string,string[]>>={reports:{submit:['draft','rejected','recalled'],approve:['submitted'],reject:['submitted'],recall:['submitted'],archive:['approved','reimbursed','rejected'],reopen:['archived']},trips:{submit:['draft','rejected','recalled'],approve:['submitted'],reject:['submitted'],recall:['submitted'],cancel:['draft','submitted','approved'],close:['approved'],reopen:['closed'],archive:['closed','cancelled','rejected']},advances:{submit:['draft'],approve:['requested'],reject:['requested'],archive:['recorded','approved','rejected']},batches:{authorize:['draft','prepared'],pay:['authorized'],cancel:['draft','prepared','authorized']}};
export function assertTransition(kind:string,status:string,command:string){requireValue(stateTransitions[kind]?.[command]?.includes(status),`Cannot ${command} a ${status} record.`,'invalid_state',409);}
