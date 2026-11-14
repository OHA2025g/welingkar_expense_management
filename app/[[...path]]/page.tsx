import ExpenseApp from '@/components/expense-app';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{path?:string[]}>}){const p=await params;return<ExpenseApp initialPath={'/'+(p.path||[]).join('/')}/>;}
