# Zoho Expense reconstruction business requirements

The business objective is to reproduce the inspected travel and expense management experience as a coherent, governed application. Employees must be able to record spend and request travel; approvers must see only authorized work; finance administrators must reconcile advances and reimbursements; administrators must control policies, users, reporting and integrations. This BRD separates the observed product capabilities from proposed acceptance requirements for a new implementation.

## Scope and intended outcomes

The business scope includes both Admin View and My View, expense evidence capture, report approval, travel requests, advances, cards, budgets, standard analytics, settings, configuration, extensibility and integration setup entry points. The deliverable is a reconstruction specification, not a live migration, financial audit, compliance opinion, connected payment system or extraction of proprietary server code.

The initial outcome is a testable product baseline using synthetic records. Completion means that every registered screen state is implemented or explicitly deferred, every field has an agreed contract, permission rules apply to both interface and API, financial balances reconcile, and integrations have approved test evidence. Empty-state visual similarity alone is insufficient to demonstrate a functioning expense platform.

## Stakeholders and responsibilities

The employee/submitter records expenses, creates trips and reports, associates evidence, applies advances and maintains personal travel information. The approver reviews permitted reports/trips, deals with policy findings and records decisions. Admin handles company-wide visibility, users, configuration and reimbursements. Super Admin is an account designation visible on the current user's record; it must not be conflated with every ordinary Admin user.

Finance operations is a proposed operating responsibility for reconciliation, batch preparation, offline reimbursement recording, exports and provider exception handling. Travel operations is a proposed operating responsibility for document access, itinerary options and booking coordination. These responsibilities may be assigned through custom roles rather than introduced as additional built-in role names. Delegates act on behalf of principals within configured permission/time limits. An out-of-office approver receives rerouted requests for a defined period.

The product owner approves business-rule choices and unresolved parity decisions. Engineering owns the API, persistence, calculations and background processing. Design owns the component system and responsive behaviour. QA owns role/session validation and sandbox workflow evidence. Finance and travel administrators validate settlement and booking semantics. No current user is automatically authorized to act as all these personas merely because the inspected session is a super-admin account.

## Business capability requirements

BR-01 through BR-14 in business_requirements.csv define the traceable objectives. Employee spend capture must preserve expense date, merchant/category, amount/currency, reimbursable choice and evidence. Travel governance must preserve purpose, travel type, approval and the separation between travel approval and confirmed booking. Settlement integrity must preserve original advances, their allocations/refunds and actual reimbursement results.

Policy administration must support user-policy assignment, global and category-specific controls, mileage/per-diem configuration and rule revisions. Scoped administration must support roles, reporting relationships, departments and protected-data permissions. Evidence management must preserve file provenance and travel-document consent. Card reconciliation must retain source transaction identities and distinguish personal, corporate and user-paid corporate cards.

Budgets must support general and employee plans, fiscal periods, category lines and agreed enforcement. Reporting must reproduce the 31 inspected standard definitions, dashboards and the observed custom/export/scheduling paths. Extensibility must cover configurable fields, layouts, tags, templates, validation and custom actions. Integration continuity must describe provider setup, mapping, synchronization and exception handling without assuming a provider is connected because it appears in a catalogue.

Decision traceability must record who acted, for whom, against which record revision and policy/approval definition. Employee continuity must cover temporary delegation, out-of-office routing, travel preferences and document prerequisites. Export administration must support report PDFs, column templates and scoped backup/export jobs with controlled delivery.

## Primary business journeys

For an expense claim, the employee creates an expense manually or through a permitted capture/import path, resolves policy/evidence issues, adds it to a report and submits. The system resolves the configured approval flow. The authorized approver approves or rejects, potentially addressing individual expenses if enabled. Finance applies valid advance balances, records refunds where applicable and prepares reimbursement for the remaining eligible amount. History and analytics expose the completed actions. Sources: OBS-193, OBS-199, OBS-202 and OBS-133.

For travel, the employee creates a request and submits for approval. The observed workflow guidance allows a travel team to present booking options after approval, obtain traveler selection and complete booking. An advance may be associated with the trip. The employee reports actual spend and the trip can be closed or archived through authorized actions. Exact itinerary/booking forms require sandbox references because the initial trip wizard persists a record before showing later steps. Sources: OBS-003, OBS-190 and OBS-191.

For card spend, an authorized user connects a provider or imports a statement. Corporate feeds may match/create expenses automatically; personal transactions require explicit conversion according to the guidance. Users associate receipts, exclude personal corporate-card charges when permitted and submit expense reports. Matching must preserve source identity and avoid counting one charge more than once. Sources: OBS-017, OBS-130 and OBS-204.

For configuration, an administrator creates master data, assigns users and policies, defines approval relationships and configures fields/layouts. Policy changes must have explicit versions and effective periods. Automation and integration setup remain separate decisions with their own permissions and execution controls. Product acceptance requires verifying that configuration affects the intended users and new records without silently rewriting earlier evaluations.

## Business rules and decisions

business_rules.csv contains observed settings, UI-described rules and proposed integrity requirements. Current settings include hierarchical trip/report approval, No Approval for advances, self-approval enabled for trips/reports, a 15-day report approval target, reimbursable expenses by default and weekly unreported-expense reminders. These are the inspected organization's settings, not universal requirements for every organization.

Before production, the product owner must decide whether to preserve those settings exactly or adopt another approved configuration. In particular, self-approval, default role grants, exported-record editing, report-automation validation exceptions and protected-data access need explicit acceptance. Proposed integrity controls such as duplicate-payment prevention and consistent tenant isolation should be retained regardless of presentation parity.

## Data ownership and migration

Organization, user, role, department, policy and master-data relationships establish business ownership. Trips, expenses, reports and advances retain employee ownership and organization scope. Attachments inherit authorized record access; travel identifiers and bank details require additional protected-data controls. An employee leaving the organization must not remove the provenance of earlier approvals or settlements.

No live data migration is included in this inspection. A future migration requires authorized exports, entity counts, identifier mappings, file checksums, currency/rounding reconciliation, historical status mapping, duplicate detection and a documented cutover/reversal plan. The source account's current zero financial totals cannot serve as a production-volume or migration-quality benchmark.

## Reporting outcomes

Management needs visibility into spend, pending approvals, reimbursement liability, advances, card completeness, budget consumption and policy findings. Operational teams need actionable queues with aging and ownership. Analytics must retain filter scope, date basis, currency basis and freshness. Totals must be explainable through underlying authorized records; a filtered/exported report must not broaden access compared with its corresponding workspace.

Standard reporting parity is defined by report_catalogue.csv. Custom reporting must use approved fields and aggregations. Scheduled delivery and exports require explicit recipient visibility and file-expiry controls. No report was saved or emailed during the inspection.

## Success measures and acceptance

Proposed delivery measures are complete coverage of registered in-scope screens, agreement between interface and API permissions, zero unexplained differences in seeded settlement fixtures, zero duplicate effects during retries, and successful end-to-end sandbox journeys for the three default roles. These are acceptance goals rather than measured performance of the source portal.

The acceptance pack must include screenshots of the reconstructed screens, fixture definitions, role/session test evidence, calculation examples, API error behaviour, import/receipt processing results and provider-fake reconciliation. A screen is complete only when its empty, populated, loading, validation, denied and error states are accounted for as applicable. A workflow is complete only when its state changes, audit history and reporting consequences agree.

## Dependencies and deferred scope

Exact record-detail fidelity depends on the sandbox fixtures listed in coverage_gaps.csv. Provider integration depends on authorized credentials, service entitlements and sample payloads. Receipt OCR/audit depends on synthetic documents and an agreed extraction/evidence policy. Responsive/accessibility acceptance needs a separate device and assistive-technology pass. Subscription, marketplace installation, external support requests and bank-account onboarding were not performed.

No project cost, delivery duration or statutory compliance certification is inferred from this inspection. The reconstruction plan proposes sequencing and acceptance gates; estimates should be based on the chosen parity scope, provider commitments, team capacity and unresolved decisions.
