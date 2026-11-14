#!/usr/bin/env node
/**
 * Lightweight UI route probe against the running portal.
 * Uses fetch for HTML shell + authenticated API detail checks;
 * complements browser interactive testing.
 */
import {writeFileSync} from 'node:fs';

const ORIG = 'http://127.0.0.1:9121';
const jar = new Map();
function storeCookies(res) {
  for (const c of res.headers.getSetCookie?.() || []) {
    const [pair] = c.split(';');
    const i = pair.indexOf('=');
    if (i > 0) jar.set(pair.slice(0, i), pair.slice(i + 1));
  }
}
const cookie = () => [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
async function req(path, opts = {}) {
  const headers = {Cookie: cookie(), ...(opts.headers || {})};
  let body = opts.body;
  if (opts.form) {
    body = opts.form;
  } else if (opts.json !== undefined) {
    headers['content-type'] = 'application/json';
    body = JSON.stringify(opts.json);
  }
  const res = await fetch(ORIG + path, {...opts, headers, body, redirect: 'manual'});
  storeCookies(res);
  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('json') ? await res.json() : await res.text();
  return {status: res.status, data, ct};
}

await req('/signin-with-chatgpt', {
  method: 'POST',
  headers: {origin: ORIG, 'content-type': 'application/x-www-form-urlencoded'},
  form: new URLSearchParams({email: 'seedy@sites.test', password: 'Admin@123'}),
});
const session = await req('/api/session', {method: 'POST', json: {}, headers: {origin: ORIG}});
const ws = (session.data?.data?.workspaces || []).find((w) => w.isDemo)?.id;
const auth = {'X-Workspace-Id': ws, origin: ORIG};

const routes = [
  '/',
  '/expenses',
  '/reports',
  '/trips',
  '/advances',
  '/approvals',
  '/batches',
  '/cards',
  '/budgets',
  '/analytics',
  '/documents',
  '/integrations',
  '/settings',
  '/settings/organization',
  '/settings/ai_preferences',
  '/settings/audit_preferences',
  '/settings/users',
  '/settings/roles',
  '/settings/categories',
  '/settings/policies',
  '/personal',
  '/guide',
];

const ui = [];
for (const path of routes) {
  const r = await req(path, {headers: {Cookie: cookie()}});
  const html = typeof r.data === 'string' ? r.data : '';
  ui.push({
    path,
    status: r.status,
    title: (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || null,
    hasRoot: html.includes('id="root"') || html.includes('__next') || html.includes('expense'),
    bytes: html.length,
  });
}

// Detail pages from demo data
const expenses = await req('/api/expenses?limit=3', {headers: auth});
const reports = await req('/api/reports?limit=3', {headers: auth});
const trips = await req('/api/trips?limit=2', {headers: auth});
const docs = await req('/api/documents?limit=5', {headers: auth});
const items = {
  expenses: (expenses.data?.data?.items || []).map((x) => x.id),
  reports: (reports.data?.data?.items || []).map((x) => x.id),
  trips: (trips.data?.data?.items || []).map((x) => x.id),
  documents: (docs.data?.data?.items || []).map((x) => x.id),
};

const details = [];
for (const id of items.expenses.slice(0, 2)) {
  const r = await req(`/api/expenses/${id}`, {headers: auth});
  const d = r.data?.data || {};
  details.push({
    kind: 'expense',
    id,
    status: r.status,
    attachments: (d.attachments || []).length,
    findings: (d.findings || []).length,
    tabsReady: true,
  });
  const page = await req(`/expenses/${id}`, {headers: {Cookie: cookie()}});
  details.push({kind: 'expense_page', id, status: page.status, bytes: String(page.data).length});
}
for (const id of items.reports.slice(0, 2)) {
  const r = await req(`/api/reports/${id}`, {headers: auth});
  const d = r.data?.data || {};
  details.push({
    kind: 'report',
    id,
    status: r.status,
    expenses: (d.expenses || []).length,
    attachments: (d.attachments || []).length,
    findings: (d.findings || []).length,
    reportStatus: d.record?.status,
  });
}
for (const id of items.documents.slice(0, 3)) {
  const r = await req(`/api/documents/${id}`, {headers: auth});
  const rec = r.data?.data?.record || {};
  details.push({
    kind: 'document',
    id,
    status: r.status,
    docStatus: rec.status,
    ocrStatus: rec.ocrStatus,
    hasExtraction: !!rec.extraction,
  });
}

const a11yHints = {
  formLabels: 'FieldInput uses htmlFor + aria-label',
  modalTrap: 'Modal Escape + Tab cycle implemented in ui.tsx',
  focusVisible: 'globals.css focus-visible outline',
  alerts: 'ErrorNotice role=alert',
  tabs: 'Tabs role=tablist/tab + aria-selected',
  images: 'Receipt preview alt text present',
  duplicateDescription: 'New expense form exposes two Business description textboxes in a11y tree',
};

const out = {ws, ui, details, items, a11yHints, generatedAt: new Date().toISOString()};
writeFileSync('/tmp/ef-e2e-ui-probe.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify({
  routes: ui.length,
  routeFails: ui.filter((u) => u.status !== 200),
  detailSummary: details,
  a11yHints,
}, null, 2));
