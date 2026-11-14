# Reconstruction release scope

The two supplied documents guide module organization, fields, permissions and workflows. This map records actual delivery, rather than treating observed menus as implemented provider capabilities.

| Source area | Implemented surface | Boundary |
|---|---|---|
| Admin and My views | `/dashboard`, per-workspace scoping, company/sample switch | Private owner access initially; team Site access must also be authorized before an employee can sign in |
| Expenses and capture states | `/expenses`, single/itemized/mileage/per diem forms, bulk grid, CSV/TSV wizard, private receipt upload, server `receipt_ocr` + browser assist, receipt review panel | Digital PDF text scrape + optional external OCR connection + browser Tesseract assist; structured extraction with per-field confidence; live receipts use quarantined→scanning→clean/rejected via builtin content scanner (optional external AV); submit gated on clean when requireScanner is enabled |
| Expense reports | `/reports`, selection, policy findings, submit/approve/reject/recall/archive, PDF, history/comments | Offline reimbursement records only |
| Trips and bookings | `/trips`, approvals, itinerary, options, selection, confirmations | No purchase/provider booking calls |
| Advances | `/advances`, approvals, allocation, refund and balance ledger | No bank disbursement |
| Approval queues | `/approvals`, pending assigned tasks, sequential progression and OOO substitution | Independent operational review still required before organizational use |
| Payments | `/batches`, reserve, authorize, record settlement | No online transfer initiation |
| Cards | `/cards`, statement import, reconciliation, conversion, exclusion | Manual/CSV source, no bank feeds |
| Budgets | `/budgets`, user/general scope, monthly/quarterly/half-yearly/yearly allocations | Recorded expenses constitute actuals; overlapping lines are separate limits |
| Analytics | `/analytics`, 31 standard report engines, filters, CSV, charts | Bounded online analysis; no arbitrary custom report builder |
| Organization and master data | `/settings`, users, roles, departments, customers/projects/categories, paid-through accounts, taxes/currencies, expense/report types | Customer/project extensions use typed custom fields rather than a separate CRM |
| Policies | Policy details, category limits, mileage, per diem, spending rules | Per diem meal deduction metadata and advanced time bands need extension |
| Permissions | 48 source controls mapped to server action/scope grants | Default roles read-only; roles designed for this product, not Zoho internals |
| Customization | Fields/layouts, validation, tags, saved views, templates, links, web tabs | Some developer entries are configuration records; no arbitrary injected code/HTML |
| Personal settings | Profile, masked bank metadata, encrypted travel/loyalty identifiers, bounded delegation and OOO | Does not open bank accounts or send enrollment invites |
| Automation | Outbox, rules/actions, notification/text update, execution logs, due runner, `security_scan` + `receipt_ocr` job drain | Unattended scheduler, service runner credentials and inbound endpoint not provisioned; cron should call `/api/automation/run` to drain scans and OCR |
| Integrations | 26 source catalogue tiles and connection definitions | Provider adapters/OAuth/feeds/payouts remain setup work |
| Data administration | Actual data/document/audit ZIP, jobs, execution logs, API usage | Bounded exports; restore needs controlled migration/recovery procedure |

The source's 321 observations, 264 screen states and 1,267 controls are evidence registers, not a browser-test pass count. Repeated dialogs/list states are consolidated into typed components. The original documents contain proposed database/API designs and unobserved states; their presence does not imply an exact private backend replica.

## Deployment acceptance

TypeScript checking, the real domain/API suite with isolated fixtures, the hosting build and private publication form the release checks. Signed-in browser inspection is recorded separately because it requires the owner's platform session. No source Zoho transaction has been created, edited, approved, deleted or submitted by this implementation workflow.
