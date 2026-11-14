# Zoho Expense reverse engineering specification

Prepared for the product, engineering, design and QA teams on 24 October 2026. Inspected organization: OHA System. Source: the authenticated India-region portal identified by the user.

This pack describes the interface and configuration visible in the inspected account and proposes a separate implementation capable of reproducing those capabilities. It contains the reverse-engineering specification, BRD, SRS, database design, API architecture and screen reconstruction plan. Every screen state has source observation references in the registers. Proposed implementation choices are explicitly labelled; they are not claims about Zoho's internal database, private APIs or infrastructure.

## Inspection boundary

The inspection used the current authenticated super-admin session in Admin View and My View. Navigation, empty-state pages, archived filters, menus, blank forms, settings, existing role definitions, editor tabs and workflow guidance were inspected. No financial record was saved, submitted, approved, rejected, paid, deleted or imported. No integration was connected, bank-feed agreement accepted, bank details added, delegate granted, receipt uploaded or automation executed. The portal was returned to the original admin dashboard.

The tenant was a trial account with one user and empty financial lists. Empty-state screens therefore dominate the evidence. Screen observation does not establish server-side validation, permission enforcement for another user, transaction success, or a completed workflow. The coverage-gaps register identifies the fixtures needed to verify those branches. All reconstruction testing should use synthetic data in a separate development environment.

The observation set includes repeated views, expanded dropdowns and form variants. The screen register deduplicates repeated observations while retaining materially distinct states. A screen state is a page, dialog, selected editor tab, expanded menu or form variant; it is not necessarily a separate route. Record-specific URLs are normalized in the delivered evidence and personal contact values are redacted. Screenshots, bank-feed legal text, sample scripts and private financial records are not included in the evidence bundle.

## Evidence classification

Observed UI means an element, field, option, column, selected checkbox or disabled control was directly present. UI guidance means a capability or rule was described by the portal's onboarding/help text but was not exercised. Proposed design means a requirement, schema, endpoint, constraint or target introduced for the reconstruction. Unverified means a branch could not be tested without a saved record, configuration change, upload, consent, external connection or separate role session. The evidence index uses OBS identifiers, the screen register uses SCR identifiers, business requirements use BR identifiers and rules use RULE identifiers.

The SQL and OpenAPI artifacts are implementation drafts for a new system. No network API trace or database introspection was performed. Route/query names can reveal UI concepts, such as expense dates, grouping and selected columns; they do not prove a server endpoint or physical table structure.

## Application structure

Admin View contains Getting Started, Home, Trips, Reports, Advances, Batch Payments, Corporate Cards, Budgets, Analytics and Settings. My View contains Home, Trips, Expenses, Reports, Advances, Cards, Approvals, Analytics and My Settings. The same signed-in user can change the view context. Reconstructing only the admin sidebar would omit expense capture, personal settings and employee workflow entry points. Sources: OBS-001, OBS-189 and OBS-205.

The header contains organization/view context, module-sensitive search, quick add, notifications, settings and profile access. The desktop layout has a dark header, light sidebar, blue active navigation, white content surfaces, compact form labels, bordered tables and date/currency-aware controls. These are visual observations from desktop inspection. Exact design tokens and responsive breakpoints were not extracted. Reconstruction should use original component assets and verify alignment, type scale, focus states and responsive behaviour against approved visual references.

Analytics and several configuration pages render through an embedded content frame. Card reconciliation and budget comparison use separate page variants. The reconstruction can share a report engine internally while preserving the controls, navigation and data contracts observed for each variant. It does not need to reproduce the original iframe implementation merely to match the user experience.

## Admin dashboard

The admin dashboard contains Spend Summary, Overall Summary, pending trip counts by approver, pending reports split between approval and reimbursement, unreported advances by employee, corporate-card status counts, expenses by category/project, top policy violations, top spending users and top policy violators. The displayed fiscal year is April 2026 to March 2027. Spend and overall summaries default to This Year; category/project and policy/user breakdowns default to This Month. The inspected values are zero or empty. Sources: OBS-001 and OBS-321.

Reconstruction data must distinguish totals from actionable queues. A total-expense KPI is not the same measure as reimbursable liability, and a report awaiting approval is not eligible for reimbursement. Dashboard filters need an explicit date basis, currency basis, permission scope and refresh timestamp. The metric dictionary in the SRS defines proposed calculation contracts where the source UI supplies labels but no calculation formula.

## Travel and expenses

The New Trip dialog asks for Trip Name, Domestic/International travel type and Business Purpose. Save and Continue is the persistence boundary; later itinerary fields were not entered. Trip configuration separately exposes flight, hotel, car rental, bus, train and ferry field groups. The observed guidance describes employee submission, approval, optional booking choices supplied by the travel team, traveler selection, booking, advance association and expense reporting. Filters expose Awaiting Approval, Approved, Rejected, Closed, Cancelled and Archived. Sources: OBS-191, OBS-126, OBS-003 and OBS-299.

Manual expense entry contains optional report association, expense date, merchant, category, currency, amount, reimbursement choice, description and reference. Receipt upload can originate from a computer or cloud source. Itemized mode replaces the single category/amount with multiple category, description and amount rows and an expense total. Bulk mode exposes a five-row grid initially, per-row receipt attachment, currency/amount, reimbursement checkbox and expandable columns. Card-based expense creation offers connection/import entry points when no cards exist. Sources: OBS-193, OBS-194, OBS-197 and OBS-198.

The inspected expense-create menu offers manual creation and import. A separate mileage/per-diem transaction composer was not exposed in this configuration. The policy editors and analytics include those concepts, so the capability map retains them with an availability gap. The import wizard accepts CSV/TSV and UTF-8 but field mapping and final import were not entered. Sources: OBS-292 and OBS-293.

Expense reports collect a required name, business purpose, optional duration and trip link. Guidance describes expense selection, comments, history, policy violations, recalls, advances and refunds. The admin report table includes submitter, number, name, status, approver, total and amount to reimburse. Approval, payment, export and archive must be separate dimensions in a new system; combining them into one status enum loses meaningful combinations. Sources: OBS-200, OBS-199, OBS-295 and OBS-296.

## Advances cards and budgets

Admin advance recording adds a required target user to the self-owned form. Both variants include amount/currency, date, paid-through account, reference, notes and trip link. The current approval setting is No Approval. Guidance permits multiple advances on one report, unused-balance carry-forward and refunds. No allocation or refund was executed. Sources: OBS-007, OBS-203, OBS-149 and OBS-202.

Batch payment begins with name, currency, description, paid-through account and payment date. Next steps require saved data and were not entered. Corporate cards have bulk connection request, individual connection and manual statement-import paths. The manual path starts with debit/credit type, card/account name, account code, currency, bank, billing date, owner and description. The individual provider path is blocked by an unaccepted bank-feed agreement. Sources: OBS-015, OBS-017, OBS-307 and OBS-308.

General budgets use a name; user budgets use a target user. Both use fiscal year, period, budget type and a category-by-period amount grid. Period options are Monthly, Quarterly, Half Yearly and Yearly. A previous-year actuals prefill control and general-budget tag/project scope control are visible. Threshold notification and blocking are described by the landing page but their exact timing, overlapping-scope precedence and treatment of pending expenses were not tested. Sources: OBS-010 to OBS-014.

## Configuration surface

Organization settings cover profile, branding, custom domain, departments, AI preferences and subscription entry. Users and Roles contains user maintenance and the named permission matrix. Setup contains currencies, policies and approval groups; tax rates are empty. Customization contains reporting tags, PDF templates, email templates, SMS notifications and web tabs. General master data contains categories, merchants, customers and projects; payment setup includes paid-through accounts and online reimbursement integrations. Sources: OBS-061, OBS-063, OBS-064, OBS-234 and OBS-076.

Travel/expense module settings include preferences, fields and applicable approvals, layouts, report types, validation rules and custom links/buttons. Field configuration records enablement, mandatory/default state and PDF visibility. Custom fields offer 17 displayed data types including single/multiline text, email, URL, phone, number, decimal, amount, percent, date/time, checkbox, generated number, dropdown, multi-select and lookup variants. Page layouts inherit global restrictions. Sources: OBS-125 to OBS-150, OBS-227, OBS-228 and OBS-282.

Policies are separately versioned business definitions. Their tabs expose general settings, category limits, mileage, per diem, rules and audit. The current default policy allows uncategorized expenses with a policy violation. Numeric category thresholds are not configured. Audit is disabled; its stated source-mismatch/duplicate checks were not tested. Sources: OBS-081 to OBS-090 and OBS-302 to OBS-304.

## Reporting and automation

All 31 standard analytics report pages were opened. The report catalogue preserves each default column set and controls. Categories comprise expenses, reports, reimbursements, trips, tax, corporate cards, budgets and activity. Favourites, shared reports, custom reports and scheduled reports are separate views. Custom report creation offers an existing-report starting point or an entirely new report. No report was saved or scheduled. Sources: OBS-018 through OBS-060.

Report Automation supports all expenses, corporate-card expenses and trip expenses. Its all-expense form exposes scheduling, an expense-age cutoff, naming placeholders, reminders, automatic/manual submission, empty-report generation and role exclusions. Workflow Rules is a separate automation system. Actions include email alerts, in-app messages, field updates, webhooks and functions; schedules and logs have dedicated views. Logs distinguish alerts, webhooks, functions, schedules and custom buttons. Sources: OBS-096, OBS-110, OBS-255, OBS-259, OBS-261, OBS-263, OBS-266 and OBS-267 to OBS-271.

## Personal and developer surfaces

My Settings includes basic information, employee bank account, delegation, out-of-office approval, receipt forwarding/default values, travel profile, loyalty programs, travel documents and budgets. The admin user detail page contains corresponding overview/travel/activity/budget tabs. Travel documents have user, type, country, document number, date metadata and storage consent. Loyalty creation is blocked until a travel profile exists. Sources: OBS-206 to OBS-218, OBS-221 to OBS-223 and OBS-314 to OBS-319.

Developer tools expose signals, widget packages, incoming webhooks, connection definitions and API-usage monitoring. Script-based editors include separate Save and Save and Execute controls. Connections have predefined and custom-service catalogues. No script ran and no credential was entered. Backups cover organization data, documents and audit trail; they were viewed without starting an export or email delivery. Sources: OBS-154 to OBS-160, OBS-273 to OBS-281 and OBS-288 to OBS-290.

## Reconstruction acceptance boundary

The observed navigation, field labels/defaults, table columns, empty states, settings tabs and role configuration form the initial parity baseline. Detail screens, calculations and state-changing actions listed in coverage_gaps.csv need non-production fixtures before claiming exact behavioural parity. The screen-state appendix and registers are the implementation inventory; the SRS and API/database chapters specify the proposed behaviour needed to make that inventory functional.
