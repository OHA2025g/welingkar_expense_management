#!/usr/bin/env node
import {writeFileSync, readFileSync} from 'node:fs';

const ORIG = 'http://127.0.0.1:9121';
const jar = new Map();

function storeCookies(res) {
  const raw = res.headers.getSetCookie?.() || [];
  for (const c of raw) {
    const [pair] = c.split(';');
    const i = pair.indexOf('=');
    if (i > 0) jar.set(pair.slice(0, i), pair.slice(i + 1));
  }
}
function cookieHeader() {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
}

async function req(path, {method = 'GET', body, headers = {}, form} = {}) {
  const h = {...headers, Cookie: cookieHeader()};
  let payload;
  if (form) {
    payload = form;
  } else if (body !== undefined) {
    h['content-type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  const res = await fetch(ORIG + path, {method, headers: h, body: payload, redirect: 'manual'});
  storeCookies(res);
  const type = res.headers.get('content-type') || '';
  const data = type.includes('json') ? await res.json() : await res.text();
  return {status: res.status, data};
}

const results = {routes: [], counts: {}, defects: [], flows: []};

const signin = new URLSearchParams({email: 'seedy@sites.test', password: 'Admin@123'});
await req('/signin-with-chatgpt', {
  method: 'POST',
  headers: {origin: ORIG, 'content-type': 'application/x-www-form-urlencoded'},
  form: signin,
});
const session = await req('/api/session', {method: 'POST', body: {}, headers: {origin: ORIG}});
const demo = (session.data?.data?.workspaces || session.data?.workspaces || []).find((w) => w.isDemo)
  || (session.data?.data?.workspaces || [])[0];
const ws = demo?.id;
if (!ws) {
  console.error(JSON.stringify({error: 'no workspace', session}, null, 2));
  process.exit(1);
}

const auth = {'X-Workspace-Id': ws, origin: ORIG};

const paths = [
  '/api/metadata',
  '/api/dashboard',
  '/api/expenses?limit=5',
  '/api/reports?limit=5',
  '/api/trips?limit=5',
  '/api/advances?limit=5',
  '/api/approvals',
  '/api/batches?limit=5',
  '/api/cards?limit=5',
  '/api/budgets?limit=5',
  '/api/documents?limit=5',
  '/api/personal',
  '/api/preferences/ai_preferences',
  '/api/preferences/audit_preferences',
  '/api/integrations',
  '/api/notifications?limit=20',
  '/api/search?q=travel',
];

for (const path of paths) {
  const r = await req(path, {headers: auth});
  const err = r.data?.error?.code || '';
  results.routes.push({path, status: r.status, error: err || null});
  if (r.status !== 200) results.defects.push({severity: 'high', area: path, detail: err || `HTTP ${r.status}`});
}

for (const kind of ['expenses', 'reports', 'trips', 'advances', 'cards', 'budgets', 'documents', 'batches']) {
  const r = await req(`/api/${kind}?limit=250`, {headers: auth});
  results.counts[kind] = (r.data?.data?.items || []).length;
}

const meta = await req('/api/metadata', {headers: auth});
const m = meta.data?.data || meta.data || {};
results.meta = {
  role: m.role,
  capabilities: m.capabilities,
  reportEngines: (m.reports || []).length,
  org: m.organization?.name,
};

// Deep flow: create expense → report → attach → automation → OCR assist
const cats = m.lookups?.categories || [];
const cat = cats[0]?.id;
const key = crypto.randomUUID();
const expenseBody = {
  expenseDate: '2026-10-26',
  merchant: 'E2E Portal Cafe',
  categoryId: cat,
  currency: 'INR',
  amount: '123.45',
  fxRate: '1',
  reimbursable: true,
  description: 'Deep E2E portal probe expense',
};
const expense = await req('/api/expenses', {
  method: 'POST',
  body: expenseBody,
  headers: {...auth, 'Idempotency-Key': key},
});
results.flows.push({
  name: 'create_expense',
  status: expense.status,
  id: expense.data?.data?.record?.id || expense.data?.record?.id,
  error: expense.data?.error?.code,
});

// Upload receipt PNG
const png = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6ZEAAAAAASUVORK5CYII='), (c) => c.charCodeAt(0));
const form = new FormData();
form.append('file', new Blob([png], {type: 'image/png'}), 'e2e-receipt.png');
const upload = await req('/api/documents', {
  method: 'POST',
  headers: {...auth, 'Idempotency-Key': crypto.randomUUID()},
  form,
});
const doc = upload.data?.data?.record || upload.data?.record;
results.flows.push({
  name: 'upload_receipt',
  status: upload.status,
  docId: doc?.id,
  docStatus: doc?.status,
  ocrStatus: doc?.ocrStatus,
  error: upload.data?.error?.code,
});

const automation = await req('/api/automation/run', {
  method: 'POST',
  body: {},
  headers: {...auth, 'Idempotency-Key': crypto.randomUUID()},
});
results.flows.push({
  name: 'automation_run',
  status: automation.status,
  security: automation.data?.data?.securityScans || automation.data?.securityScans,
  ocr: automation.data?.data?.receiptOcr || automation.data?.receiptOcr,
  error: automation.data?.error?.code,
});

if (doc?.id) {
  const after = await req(`/api/documents/${doc.id}`, {headers: auth});
  const record = after.data?.data?.record || after.data?.record;
  results.flows.push({
    name: 'document_after_scan',
    status: after.status,
    docStatus: record?.status,
    ocrStatus: record?.ocrStatus,
    extraction: !!record?.extraction,
  });

  const assistText = 'E2E Cafe\nDate 26/10/2026\nGrand Total INR 123.45\nGST 18.52 @ 18%\n';
  const ocr = await req(`/api/documents/${doc.id}/ocr`, {
    method: 'POST',
    body: {text: assistText, confidence: 90, source: 'browser_tesseract'},
    headers: {...auth, 'Idempotency-Key': crypto.randomUUID(), 'If-Match': String(record?.version || 1)},
  });
  const ocrData = ocr.data?.data || ocr.data;
  results.flows.push({
    name: 'browser_assist_ocr',
    status: ocr.status,
    ocrStatus: ocrData?.ocrStatus,
    amount: ocrData?.extraction?.fields?.amount,
    tax: ocrData?.extraction?.fields?.taxAmount,
    error: ocr.data?.error?.code,
  });
}

// Expense detail with findings
const expId = expense.data?.data?.record?.id || expense.data?.record?.id;
if (expId && doc?.id) {
  await req(`/api/expenses/${expId}/attachments`, {
    method: 'POST',
    body: {documentId: doc.id},
    headers: {...auth, 'Idempotency-Key': crypto.randomUUID(), 'If-Match': '1'},
  });
  const detail = await req(`/api/expenses/${expId}`, {headers: auth});
  const d = detail.data?.data || detail.data;
  results.flows.push({
    name: 'expense_detail_attachments',
    status: detail.status,
    attachments: (d?.attachments || []).length,
    findings: (d?.findings || []).map((f) => f.rule || f.message),
  });
}

// Report create + attach expense + submit gate
const report = await req('/api/reports', {
  method: 'POST',
  body: {name: 'E2E Deep Dive Report', purpose: 'Portal E2E'},
  headers: {...auth, 'Idempotency-Key': crypto.randomUUID()},
});
const rid = report.data?.data?.record?.id || report.data?.record?.id;
results.flows.push({name: 'create_report', status: report.status, id: rid, error: report.data?.error?.code});
if (rid && expId) {
  const membership = await req(`/api/reports/${rid}/expenses`, {
    method: 'POST',
    body: {expenseIds: [expId]},
    headers: {...auth, 'Idempotency-Key': crypto.randomUUID(), 'If-Match': '1'},
  });
  results.flows.push({name: 'report_add_expense', status: membership.status, error: membership.data?.error?.code});
  const submit = await req(`/api/reports/${rid}/submit`, {
    method: 'POST',
    body: {},
    headers: {...auth, 'Idempotency-Key': crypto.randomUUID(), 'If-Match': '2'},
  });
  results.flows.push({
    name: 'report_submit',
    status: submit.status,
    error: submit.data?.error?.code,
    message: submit.data?.error?.message,
  });
}

// Analytics engines smoke
let analyticsOk = 0;
let analyticsFail = 0;
for (const rep of (m.reports || []).slice(0, 31)) {
  const r = await req(`/api/analytics/${rep.key}`, {headers: auth});
  if (r.status === 200) analyticsOk++;
  else analyticsFail++;
}
results.flows.push({name: 'analytics_engines', ok: analyticsOk, fail: analyticsFail});

// Role denial as submitter
const jar2 = jar;
// switch user via signin
await req('/signout-with-chatgpt', {
  method: 'POST',
  headers: {origin: ORIG, 'content-type': 'application/x-www-form-urlencoded'},
  form: new URLSearchParams({}),
});
await req('/signin-with-chatgpt', {
  method: 'POST',
  headers: {origin: ORIG, 'content-type': 'application/x-www-form-urlencoded'},
  form: new URLSearchParams({email: 'rohan.mehta@example.test', password: 'Submitter@123'}),
});
const deny = await req('/api/employees', {headers: auth});
results.flows.push({
  name: 'submitter_admin_denied',
  status: deny.status,
  error: deny.data?.error?.code,
});

writeFileSync('/tmp/ef-e2e-probe.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
void jar2;
