# ExpenseFlow

A private, persistent travel and expense application reconstructed from the two supplied Zoho Expense specification documents. ExpenseFlow has its own identity, database, storage and synthetic exploration workspace. It does not connect to or change the original Zoho tenant.

## Use

Open the private deployed Site and sign in with ChatGPT. The first sign-in provisions an empty company workspace with categories, paid-through accounts and a standard policy. **Explore sample data** opens a separate synthetic company. All records in that company are fictional. Sample data is never mixed into the company workspace.

Main navigation: Overview, Expenses, Expense reports, Trips, Advances, Approvals, Batch payments, Corporate cards, Budgets, Analytics and Documents. Settings groups expose users, the 48 permission controls, master data, policies/rates, module preferences, custom fields/layouts, validation/approval rules, templates, automation, developer definitions, audit and backups. My settings includes bank metadata, travel profiles/documents, loyalty programmes, delegation and out of office.

## Working behavior

- Persistent CRUD, search, filters, sortable displayed rows, cursor pagination and filtered CSV exports.
- Manual, itemized, mileage and per diem expense calculation; 12 currencies; exact integer/BigInt financial calculations and six-decimal FX.
- Receipt uploads in private object storage and browser-local Tesseract recognition. PDF text extraction/recognition covers the first page. All extracted values require review.
- Reports with expense selection, policy findings, frozen submission snapshots, sequential approvals, rejections, recall, comments and history.
- Advances with available-balance conservation, approvals when configured, application to claims and immutable refunds.
- Partial offline reimbursements and controlled batch reservation/authorization/settlement. These **record an already completed payment**; they do not transfer money.
- Trips with flight/hotel/car/bus/train/ferry itinerary records, booking options, traveler selection and recorded confirmation references. They do not purchase travel.
- Card statement CSV/TSV staging, mapping, preview and commit; transaction conversion/matching/exclusion; corporate-card expenses are non-reimbursable.
- User/general budgets with category periods, actuals and optional database-enforced limits.
- All 31 standard report engines, scoped to permitted records, with CSV and table/chart display. Online analysis is bounded to 5,000 source rows.
- Actual multi-page report PDFs and actual ZIP exports, not placeholder downloads.
- Server-enforced workspace membership, role/owner/assigned-approval access, CSRF origin checks, optimistic versions, idempotent mutations and immutable audit/payment records.
- Custom fields, requiredness, page layouts, category/spending rules, approval flows, templates, saved views and custom-module records.
- Event outbox, durable execution records, internal notification/text-field actions, external service adapters and on-demand due automations. External actions require explicit service configuration.

## Configuration boundaries

The 26 integration tiles reproduce the source service catalogue and configuration surfaces. Provider-specific OAuth, bank/card feeds, accounting synchronization, travel booking and online payout adapters are **not connected**. Saving a connection definition does not make a provider operational. No external financial account is connected in this build.

Company receipt uploads (PNG/JPEG/WebP/PDF) enter **quarantined**, then async `security_scan` jobs move them through **scanning** to **clean** or **rejected**. A built-in content scanner (`builtin_v1`) runs by default for local/Docker and API tests; an optional HTTPS connection (for example ScanSnap / security purpose) can replace it. Import CSV/TSV files are **validated** (type-only). Demo sample receipts are pre-marked **clean** with `data.sample: true` so the sample workspace stays usable. With the default audit preference, only **clean** attachments may be submitted on a report; turning the preference off also allows **validated** files, but quarantined/scanning/rejected receipts still block submission. Rejected files cannot be downloaded.

Receipt OCR runs as a separate async `receipt_ocr` job (independent of malware scanning). Digital PDFs use a built-in text-layer scrape; images/scanned PDFs use an optional HTTPS OCR connection (`purpose: receipt_ocr`) or fall back to **awaiting_assist**, where browser Tesseract posts text and the server re-extracts structured fields (merchant, date, amount, currency, tax) with per-field confidence into `documents.data.extraction`. Audit preferences control the OCR confidence threshold and amount-mismatch findings. AI preferences `receiptOcr` gates enqueue and the assist UI. Drain scan and OCR jobs via Settings → API usage / Background jobs → **Run due automations** (`POST /api/automation/run`), which also processes the outbox. Until a dedicated cron binding exists, schedule that endpoint operationally.

Recurring definitions can be run from the same **Run due automations** action. An unattended scheduler is not provisioned. Arbitrary custom functions require an isolated external execution service. Incoming-webhook, signal and widget entries are configuration records; no externally exposed inbound execution endpoint or embedded arbitrary widget runtime is enabled. SMS/email templates and AI preferences are definitions; no SMS/email/LLM provider has been configured or invoked. No public custom domain, native mobile/offline client or arbitrary custom-report/SQL builder is included.

The source PDFs contain 264 observed UI states, proposed architecture and unresolved third-party/integration gaps. This release consolidates repeated states into reusable forms and workflows; it is not a certification of exact Zoho screen/behavior parity or completion of all proposed enterprise requirements. See `docs/RELEASE_SCOPE.md` for the actual reconstruction map.

## Stack and data

React 19 + Vinext/Next-compatible routes, TypeScript, Cloudflare Workers, D1 relational database and private R2 files. The hosted implementation adapts the documents' proposed Postgres design to **40 physical SQLite tables** with typed financial columns and JSON configuration metadata. Migrations add tenant-reference integrity, conservation, immutable history and optimistic-guard triggers. The original proposed 109-table architecture remains source design material, not a claim about the physical database.

`app/api/[[...path]]/route.ts` routes authenticated `/api` and `/api/v1` operations. `lib/api.ts` is the server contract implementation, `lib/server-*` contains domain services, `db/schema.ts` the schema and `drizzle/` the forward-only SQL migrations. Browser local storage retains only the selected workspace ID; business records live on the server.

Protected bank/travel identifiers use AES-GCM. If `DATA_ENCRYPTION_KEY` is supplied, use a base64-encoded 32-byte key. Otherwise a cryptographically generated key is stored in a reserved, private R2 object outside document listings/ordinary exports. Preserve that key with encrypted data; rotation and disaster recovery require an operational runbook. The key is never delivered to the client.

## Development and verification

Use Node 24 and the package manager in `packageManager`. Install through the Sites dependency helper when working in the managed environment. Normal commands:

```sh
pnpm install
pnpm dev
pnpm exec tsc --noEmit
pnpm test
pnpm build
```

For managed previews use `sites-preview start /workspace/sites/expenseflow-platform`; the daemon owns the preview. Apply each SQL migration exactly once to the bound database. Sites publication applies deployment migrations from the archive. Authenticated identity comes only from platform-injected `oai-authenticated-user-*` headers. A direct unauthenticated local preview shows the sign-in gate; do not add fake production identity headers or an auth bypass.

The API test suite bundles the real server implementation against isolated in-memory SQLite and R2 fixtures and synthetic verified identities. It never contacts Zoho or a financial provider. It covers access, workflow states, exact amounts, concurrent/stale writes, retries, settlements, budgets, policy snapshots, custom fields, CSV/card flows, receipt gates, protected identifiers, real PDF/ZIP output and immutable history. It does not replace browser acceptance testing, independent penetration testing, load testing, scanner/provider certification or disaster-recovery rehearsal.

## API conventions

- Authenticated platform session plus `X-Workspace-Id` on organization requests.
- `POST /api/session` bootstraps verified membership.
- Every subsequent mutation requires `Idempotency-Key` (same key and body replays the saved result; different body conflicts).
- Updates and state-changing record operations require `If-Match: <integer version>`; missing version returns 428 and stale versions return 412.
- Success `{data, requestId}`; failure `{error:{code,message,requestId}}`.
- Record lists `{items,nextCursor}`, at most 250 rows per page. CSV exports page through authorized records, refuse more than 5,000 and preserve supplied filters.
- Binary responses are authenticated downloads with private/no-store/nosniff headers.

Source field/permission/report/integration registers are retained in `docs/` with the source requirements and screen inventory.
