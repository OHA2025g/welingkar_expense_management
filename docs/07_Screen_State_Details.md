# Zoho Expense screen state details

This appendix contains the observed control inventory and proposed build contract for every deduplicated screen state. Screen states include expanded menus and editor tabs; they are not all independent pages. Required markers and disabled/default states are observations. Backend validation, permission enforcement and later persisted workflow steps remain subject to the SRS and coverage gaps. Personal values are redacted.

## Application shell

### SCR-001 Admin dashboard

Route: `/admin/dashboard`. State: Table. Build priority: P0. Evidence: OBS-001, OBS-309, OBS-321.

Selected tabs: For Approval (0 Reports).

No editable field controls were captured in this state.

Table columns: Approver, Count, Employee, Amount.

Visible action controls: More, Contact Support, This Year, This Month, Need help? Drop us an email and we’ll get back to you..

Reconstruction: Build the persistent header, view switcher, context search, sidebar and utility rail. Keep navigation state separate from business record state.

Component: ShellLayout. Data relationships: organization, user, permission.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-166 My getting started

Route: `/home/gettingstarted`. State: Onboarding. Build priority: P0. Evidence: OBS-188.

No editable field controls were captured in this state.

Visible action controls: Play, Request a Demo, Contact Support, Take a Tour, Upload Document, New Report, [email redacted], Automate receipt forwarding, Copy email, Switch to Admin View, Need help? Drop us an email and we’ll get back to you..

Reconstruction: Build the persistent header, view switcher, context search, sidebar and utility rail. Keep navigation state separate from business record state.

Component: ShellLayout. Data relationships: organization, user, permission.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-167 My dashboard

Route: `/home/dashboard`. State: Page. Build priority: P0. Evidence: OBS-189.

No editable field controls were captured in this state.

Visible action controls: Contact Support, Upload Document, Need help? Drop us an email and we’ll get back to you..

Reconstruction: Build the persistent header, view switcher, context search, sidebar and utility rail. Keep navigation state separate from business record state.

Component: ShellLayout. Data relationships: organization, user, permission.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-195 Admin getting started

Route: `/admin/gettingstarted`. State: Onboarding. Build priority: P0. Evidence: OBS-219, OBS-220.

No editable field controls were captured in this state.

Visible action controls: Contact Support, Customize, Mark as Completed, Invite, Connect, Automate, Configure, Switch to My View, Need help? Drop us an email and we’ll get back to you..

Reconstruction: Build the persistent header, view switcher, context search, sidebar and utility rail. Keep navigation state separate from business record state.

Component: ShellLayout. Data relationships: organization, user, permission.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Trip approval

### SCR-002 Simplify business travel and booking

Route: `/tripsapproval/all`. State: Page. Build priority: P1. Evidence: OBS-002, OBS-003.

No editable field controls were captured in this state.

Visible action controls: Previous, Next, Preview flowchart.

Reconstruction: Reconstruct status tabs, list columns, advanced search and owner/approver scopes. Implement decision commands separately from list reads.

Component: ApprovalList. Data relationships: trip, approval run, approval task.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-244 Trips

Route: `/tripsapproval/all`. State: Table. Build priority: P1. Evidence: OBS-294, OBS-298.

Observed controls: Select All (checkbox).

Table columns: Select All, Submitter, Trip#, Trip Details, Destination, Status, Approver.

Visible action controls: Settings, More Action Menu, More Filters, Submitter, Trip#, Destination, Status, Approver, Advanced Search.

Reconstruction: Reconstruct status tabs, list columns, advanced search and owner/approver scopes. Implement decision commands separately from list reads.

Component: ApprovalList. Data relationships: trip, approval run, approval task.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-248 Trips

Route: `/tripsapproval/all`. State: Table. Build priority: P1. Evidence: OBS-299.

Observed controls: Select All (checkbox).

Table columns: Select All, Submitter, Trip#, Trip Details, Destination, Status, Approver.

Expanded options: All, Awaiting Approval, Approved, Rejected, Closed, Cancelled, Archived, New Custom View.

Visible action controls: Settings, More Action Menu, More Filters, Submitter, Trip#, Destination, Status, Approver, Advanced Search.

Reconstruction: Reconstruct status tabs, list columns, advanced search and owner/approver scopes. Implement decision commands separately from list reads.

Component: ApprovalList. Data relationships: trip, approval run, approval task.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-249 Search

Route: `/tripsapproval/all`. State: Dialog. Build priority: P1. Evidence: OBS-300.

Observed controls: Search (combobox, value Trips Approval); Trip# (textbox); Trip Name (textbox); Travel Type (combobox, value All); Submitted By (combobox, value Select); Approver (combobox, value Select); Destination City (combobox); Filter By (combobox, value Select); Business Purpose (textbox); Policy (combobox, value Select).

Visible action controls: Close, Select, Search, Cancel.

Reconstruction: Reconstruct status tabs, list columns, advanced search and owner/approver scopes. Implement decision commands separately from list reads.

Component: ApprovalList. Data relationships: trip, approval run, approval task.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Report approval

### SCR-003 Streamline expense reporting

Route: `/approvals/all`. State: Page. Build priority: P0. Evidence: OBS-004.

No editable field controls were captured in this state.

Visible action controls: Previous, Next, Preview flowchart.

Reconstruction: Implement independent approval and reimbursement states, status filters, custom views and column sorting. Block commands outside the applicable role and record scope.

Component: ApprovalList. Data relationships: expense report, approval task, reimbursement.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-181 Pending approvals dashboard

Route: `/approvals/dashboard`. State: Page. Build priority: P0. Evidence: OBS-205.

No editable field controls were captured in this state.

Visible action controls: 00 Pending Trips, 00 Pending Reports.

Reconstruction: Implement independent approval and reimbursement states, status filters, custom views and column sorting. Block commands outside the applicable role and record scope.

Component: ApprovalList. Data relationships: expense report, approval task, reimbursement.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-245 Reports

Route: `/approvals/all`. State: Table. Build priority: P0. Evidence: OBS-295.

Observed controls: Select All (checkbox).

Table columns: Select All, Submitter, Report#, Report Name, Status, Approver, Total, To be Reimbursed.

Visible action controls: Settings, Sort by, More Filters, Submitter, Report#, Report Name, Status, Approver, Total, To be Reimbursed, Advanced Search.

Reconstruction: Implement independent approval and reimbursement states, status filters, custom views and column sorting. Block commands outside the applicable role and record scope.

Component: ApprovalList. Data relationships: expense report, approval task, reimbursement.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-246 Reports

Route: `/approvals/all`. State: Table. Build priority: P0. Evidence: OBS-296.

Observed controls: Select All (checkbox).

Table columns: Select All, Submitter, Report#, Report Name, Status, Approver, Total, To be Reimbursed.

Expanded options: All, Awaiting Approval, Overdue, Awaiting Reimbursement, Rejected, Reimbursed, Archived, Exported, Unexported, New Custom View.

Visible action controls: Settings, Sort by, More Filters, Submitter, Report#, Report Name, Status, Approver, Total, To be Reimbursed, Advanced Search.

Reconstruction: Implement independent approval and reimbursement states, status filters, custom views and column sorting. Block commands outside the applicable role and record scope.

Component: ApprovalList. Data relationships: expense report, approval task, reimbursement.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Advance administration

### SCR-004 Handle cash advances

Route: `/advanceapprovals/all`. State: Page. Build priority: P1. Evidence: OBS-005.

No editable field controls were captured in this state.

Visible action controls: Record Advance, Previous, Next, Preview flowchart.

Reconstruction: Use the admin form with mandatory target user. Keep recording, requesting, approving and paying as distinct domain operations.

Component: AdvanceDialog. Data relationships: advance, user, paid-through account.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-005 Record Advance

Route: `/advanceapprovals/all`. State: Dialog. Build priority: P1. Evidence: OBS-006, OBS-007.

Observed controls: User * (combobox, required marker, value Select); Currency (inferred from displayed option) (combobox, value INR- Indian Rupee); Amount (textbox, required marker); Date * (textbox, required marker); Paid Through (combobox, value Petty Cash); Reference# (textbox); Notes (textbox); Apply to Trip (combobox, value Select).

Visible action controls: Close, Record Advance, Cancel.

Reconstruction: Use the admin form with mandatory target user. Keep recording, requesting, approving and paying as distinct domain operations.

Component: AdvanceDialog. Data relationships: advance, user, paid-through account.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Batch payments

### SCR-006 Simplify Reimbursements with Batch Payments

Route: `/payments`. State: Page. Build priority: P1. Evidence: OBS-008.

No editable field controls were captured in this state.

Visible action controls: New Batch, Previous, Next, Preview flowchart.

Reconstruction: Build batch metadata followed by report selection and reimbursement steps. Validate balances and prevent duplicate report reservation and duplicate provider effects.

Component: PaymentBatchWizard. Data relationships: payment batch, report reservation, payment instruction.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-013 New Batch

Route: `/payments`. State: Dialog. Build priority: P1. Evidence: OBS-015.

Observed controls: Batch Name * (textbox, required marker); Currency (combobox, value INR- Indian Rupee); Description (textbox, 500 characters); Paid Through * (combobox, required marker, value Select); Payment Date (textbox).

Visible action controls: Close, Next, Cancel.

Reconstruction: Build batch metadata followed by report selection and reimbursement steps. Validate balances and prevent duplicate report reservation and duplicate provider effects.

Component: PaymentBatchWizard. Data relationships: payment batch, report reservation, payment instruction.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Cards

### SCR-007 Corporate Cards

Route: `/corporatecards`. State: Page. Build priority: P1. Evidence: OBS-009, OBS-016.

No editable field controls were captured in this state.

Visible action controls: Bulk Connect cards, Connect individual cards, Previous, Next.

Reconstruction: Reconstruct import and bulk-connection forms. Keep consent, provider onboarding, feed ingestion and reconciliation as separate states; use provider fakes before live integration.

Component: CardWorkspace. Data relationships: card account, card transaction, expense match.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-014 Import Statement

Route: `/corporatecards/connect/manualcard`. State: Form. Build priority: P1. Evidence: OBS-017.

Observed controls: Select Card Type * (radiogroup, required marker); Debit Card (radio); Credit Card (radio, checked); Card/Account Name * (textbox, required marker); Account Code (textbox); Currency * (combobox, required marker, value INR- Indian Rupee); Bank Name (textbox); Billing date (textbox); Account Owner (combobox, value Assign card owner); Description (textbox, 500 characters).

Visible action controls: Save and Continue, Cancel.

Reconstruction: Reconstruct import and bulk-connection forms. Keep consent, provider onboarding, feed ingestion and reconciliation as separate states; use provider fakes before live integration.

Component: CardWorkspace. Data relationships: card account, card transaction, expense match.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed; later wizard steps gated by persistence.

### SCR-180 Get started with cards

Route: `/cards/gettingstarted`. State: Onboarding. Build priority: P1. Evidence: OBS-204.

No editable field controls were captured in this state.

Visible action controls: Connect Card, Import Statement, An illustration of the cards list page of an employee. It contains the list of corporate and personal cards connected by an employee..

Reconstruction: Reconstruct import and bulk-connection forms. Keep consent, provider onboarding, feed ingestion and reconciliation as separate states; use provider fakes before live integration.

Component: CardWorkspace. Data relationships: card account, card transaction, expense match.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-254 Request Bulk Card Connection

Route: `/corporatecards`. State: Dialog. Build priority: P1. Evidence: OBS-307.

Observed controls: Bank Name * (textbox, required marker); Card Network * (combobox, required marker, value Select); Number of Cards * (textbox, required marker); Company ID (textbox, 100 characters); Description (textbox, 100 characters).

Visible action controls: Bulk Connect cards, Connect individual cards, Previous, Next, Close, Submit Request, Cancel.

Reconstruction: Reconstruct import and bulk-connection forms. Keep consent, provider onboarding, feed ingestion and reconciliation as separate states; use provider fakes before live integration.

Component: CardWorkspace. Data relationships: card account, card transaction, expense match.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-255 Connect your card to Zoho Expense!

Route: `/corporatecards`. State: Dialog. Build priority: P1. Evidence: OBS-308.

Observed controls: I agree to the End User Terms for Automatic Bank Feeds (checkbox).

Visible action controls: Close, Proceed, Cancel.

Reconstruction: Reconstruct import and bulk-connection forms. Keep consent, provider onboarding, feed ingestion and reconciliation as separate states; use provider fakes before live integration.

Component: CardWorkspace. Data relationships: card account, card transaction, expense match.

Verification boundary: Consent gate observed; agreement not accepted and bank provider journey not entered.

## Budgets

### SCR-008 Enforce budgets

Route: `/budgets`. State: Page. Build priority: P1. Evidence: OBS-010.

No editable field controls were captured in this state.

Visible action controls: New Budget.

Reconstruction: Reconstruct general and user variants, fiscal-year periods, category rows and totals. Evaluate threshold warnings and blocking without counting one expense twice.

Component: BudgetGrid. Data relationships: budget, budget scope, period, budget line.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-009 Enforce budgets

Route: `/budgets`. State: Page. Build priority: P1. Evidence: OBS-011.

No editable field controls were captured in this state.

Expanded options: General Budget, User Budget.

Visible action controls: New Budget.

Reconstruction: Reconstruct general and user variants, fiscal-year periods, category rows and totals. Evaluate threshold warnings and blocking without counting one expense twice.

Component: BudgetGrid. Data relationships: budget, budget scope, period, budget line.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-010 New Budget

Route: `/budgets/new`. State: Form. Build priority: P1. Evidence: OBS-012.

Observed controls: Name * (textbox, required marker); Fiscal Year * (combobox, required marker, value Apr 2026 - Mar 2027); Budget Period * (combobox, required marker, value Monthly); Budget Type * (combobox, required marker, value Amount); Budget amount-Apr 2026 (textbox); Budget amount-May 2026 (textbox); Budget amount-Jun 2026 (textbox); Budget amount-Jul 2026 (textbox); Budget amount-Aug 2026 (textbox); Budget amount-Sep 2026 (textbox); Budget amount-Oct 2026 (textbox); Budget amount-Nov 2026 (textbox); Budget amount-Dec 2026 (textbox); Budget amount-Jan 2027 (textbox); Budget amount-Feb 2027 (textbox); Budget amount-Mar 2027 (textbox).

Table columns: Category, Apr 2026, May 2026, Jun 2026, Jul 2026, Aug 2026, Sep 2026, Oct 2026, Nov 2026, Dec 2026, Jan 2027, Feb 2027, Mar 2027, Total.

Visible action controls: Close, Create this budget for a specific tag or project, Pre-fill from Previous Years' Actuals, Save, Cancel.

Reconstruction: Reconstruct general and user variants, fiscal-year periods, category rows and totals. Evaluate threshold warnings and blocking without counting one expense twice.

Component: BudgetGrid. Data relationships: budget, budget scope, period, budget line.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-011 New Budget

Route: `/budgets/new`. State: Form. Build priority: P1. Evidence: OBS-013.

Observed controls: Name * (textbox, required marker); Fiscal Year * (combobox, required marker, value Apr 2026 - Mar 2027); Budget Period * (combobox, required marker, value Monthly); Search (textbox); Budget Type * (combobox, required marker, value Amount); Budget amount-Apr 2026 (textbox); Budget amount-May 2026 (textbox); Budget amount-Jun 2026 (textbox); Budget amount-Jul 2026 (textbox); Budget amount-Aug 2026 (textbox); Budget amount-Sep 2026 (textbox); Budget amount-Oct 2026 (textbox); Budget amount-Nov 2026 (textbox); Budget amount-Dec 2026 (textbox); Budget amount-Jan 2027 (textbox); Budget amount-Feb 2027 (textbox); Budget amount-Mar 2027 (textbox).

Table columns: Category, Apr 2026, May 2026, Jun 2026, Jul 2026, Aug 2026, Sep 2026, Oct 2026, Nov 2026, Dec 2026, Jan 2027, Feb 2027, Mar 2027, Total.

Expanded options: Monthly, Quarterly, Half Yearly, Yearly.

Visible action controls: Close, Create this budget for a specific tag or project, Pre-fill from Previous Years' Actuals, Save, Cancel.

Reconstruction: Reconstruct general and user variants, fiscal-year periods, category rows and totals. Evaluate threshold warnings and blocking without counting one expense twice.

Component: BudgetGrid. Data relationships: budget, budget scope, period, budget line.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-012 New Budget

Route: `/budgets/new`. State: Form. Build priority: P1. Evidence: OBS-014.

Observed controls: User * (combobox, required marker, value Select); Fiscal Year * (combobox, required marker, value Apr 2026 - Mar 2027); Budget Period * (combobox, required marker, value Monthly); Budget Type * (combobox, required marker, value Amount); Budget amount-Apr 2026 (textbox); Budget amount-May 2026 (textbox); Budget amount-Jun 2026 (textbox); Budget amount-Jul 2026 (textbox); Budget amount-Aug 2026 (textbox); Budget amount-Sep 2026 (textbox); Budget amount-Oct 2026 (textbox); Budget amount-Nov 2026 (textbox); Budget amount-Dec 2026 (textbox); Budget amount-Jan 2027 (textbox); Budget amount-Feb 2027 (textbox); Budget amount-Mar 2027 (textbox).

Table columns: Category, Apr 2026, May 2026, Jun 2026, Jul 2026, Aug 2026, Sep 2026, Oct 2026, Nov 2026, Dec 2026, Jan 2027, Feb 2027, Mar 2027, Total.

Visible action controls: Close, Pre-fill from Previous Years' Actuals, Save, Cancel.

Reconstruction: Reconstruct general and user variants, fiscal-year periods, category rows and totals. Evaluate threshold warnings and blocking without counting one expense twice.

Component: BudgetGrid. Data relationships: budget, budget scope, period, budget line.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Analytics

### SCR-015 Analytics catalogue

Route: `/reports/booksapp`. State: Table. Build priority: P2. Evidence: OBS-018, OBS-050.

Observed controls: Search reports (combobox).

Table columns: Report Name, Report Category, Created By, Schedule, More Actions.

Visible action controls: Create New Report, Show dropdown menu.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-016 Expense Details

Route: `/reports/booksapp/expense/details`. State: Table. Build priority: P2. Evidence: OBS-019.

No editable field controls were captured in this state.

Table columns: Report, User Name, Receipt, Payment Mode, Category, Expense Date, Expense Amount, Expense Amount (FCY).

Visible action controls: View the reports sidebar, Export, Expense Date :, This Month, Run Report, Show dropdown menu, Table View, Chart View, None, Report, User Name, Category, Expense Date, Expense Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-017 Expenses

Route: `/reports/booksapp/expense/details`. State: Table. Build priority: P2. Evidence: OBS-020.

Observed controls: Search reports (textbox).

Table columns: Report, User Name, Receipt, Payment Mode, Category, Expense Date, Expense Amount, Expense Amount (FCY).

Visible action controls: Hide the reports sidebar, Expenses, Reports, Reimbursements, Trips, Tax Summary, Corporate Cards, Budget, Activity, View the reports sidebar, Export, Expense Date :, This Month, Run Report, Show dropdown menu, Table View, Chart View, None, Report, User Name, Category, Expense Date, Expense Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-018 Unsubmitted Expenses

Route: `/reports/booksapp/expense/details`. State: Table. Build priority: P2. Evidence: OBS-021.

No editable field controls were captured in this state.

Table columns: Report, User Name, Receipt, Payment Mode, Category, Expense Date, Expense Amount, Expense Amount (FCY).

Visible action controls: View the reports sidebar, Export, Expense Date :, This Month, Run Report, Show dropdown menu, None, Report, User Name, Category, Expense Date, Expense Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-019 Expenses by Category

Route: `/reports/booksapp/expense/category`. State: Table. Build priority: P2. Evidence: OBS-022.

No editable field controls were captured in this state.

Table columns: Category, Expense Amount, Expense Count, Expense Amount without Tax.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Category, Expense Amount, Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-020 Expenses by User

Route: `/reports/booksapp/expense/user`. State: Table. Build priority: P2. Evidence: OBS-023.

No editable field controls were captured in this state.

Table columns: User Name, Expense Amount, Expense Count, Expense Amount without Tax.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, User Name, Expense Amount, Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-021 Mileage Expenses by User

Route: `/reports/booksapp/expense/mileage`. State: Table. Build priority: P2. Evidence: OBS-024.

No editable field controls were captured in this state.

Table columns: User Name, Expense Amount, Unit, Expense Count, Expense Amount without Tax.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, User Name, Expense Amount, Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-022 Expense Policy Violations by User

Route: `/reports/booksapp/expense/policyviolationsbyuser`. State: Table. Build priority: P2. Evidence: OBS-025.

No editable field controls were captured in this state.

Table columns: User Name, Expense Amount, Violated Expense Amount, Expense Count, Violated Expense Count.

Visible action controls: View the reports sidebar, Export, Expense Date :, This Month, Run Report, Show dropdown menu, User Name, Expense Amount, Violated Expense Amount, Expense Count, Violated Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-023 Expenses by Department

Route: `/reports/booksapp/expense/department`. State: Table. Build priority: P2. Evidence: OBS-026.

No editable field controls were captured in this state.

Table columns: Department, Expense Amount, Expense Count, Expense Amount without Tax.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Department, Expense Amount, Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-024 Expenses by Attendee

Route: `/reports/booksapp/expense/attendee`. State: Table. Build priority: P2. Evidence: OBS-027.

No editable field controls were captured in this state.

Table columns: Attendee, Expense Amount, Expense Count, Expense Amount without Tax, Attendee Share, Attendee Share with Tax.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Attendee, Expense Amount, Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-025 Expenses by Customer

Route: `/reports/booksapp/expense/customer`. State: Table. Build priority: P2. Evidence: OBS-028.

No editable field controls were captured in this state.

Table columns: Customer, Expense Amount, Expense Count, Expense Amount without Tax.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Customer, Expense Amount, Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-026 Expenses by Project

Route: `/reports/booksapp/expense/project`. State: Table. Build priority: P2. Evidence: OBS-029.

No editable field controls were captured in this state.

Table columns: Project, Customer, Expense Amount without Tax, Expense Count, Expense Amount.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Project, Customer, Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-027 Expense by Merchant

Route: `/reports/booksapp/expense/merchant`. State: Table. Build priority: P2. Evidence: OBS-030.

No editable field controls were captured in this state.

Table columns: Merchant, Expense Amount, Expense Count, Expense Amount without Tax.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Merchant, Expense Amount, Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-028 Expenses by Currency

Route: `/reports/booksapp/expense/currency`. State: Table. Build priority: P2. Evidence: OBS-031.

No editable field controls were captured in this state.

Table columns: Currency, Expense Amount, Expense Amount (FCY), Expense Amount without Tax (FCY), Expense Count, Expense Amount without Tax.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Currency, Expense Amount, Expense Amount without Tax (FCY), Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-029 Expenses

Route: `/reports/booksapp/expense/currency`. State: Table. Build priority: P2. Evidence: OBS-032.

Observed controls: Search reports (textbox).

Table columns: Currency, Expense Amount, Expense Amount (FCY), Expense Amount without Tax (FCY), Expense Count, Expense Amount without Tax.

Visible action controls: Hide the reports sidebar, Expenses, Reports, Reimbursements, Trips, Tax Summary, Corporate Cards, Budget, Activity, View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Currency, Expense Amount, Expense Amount without Tax (FCY), Expense Count.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-030 Expense Reports Details

Route: `/reports/booksapp/expensereportdetails`. State: Table. Build priority: P2. Evidence: OBS-033.

No editable field controls were captured in this state.

Table columns: Report#, Report Name, Status, Start Date, End Date, Submitted By, Approver, Amount, Policy Violated.

Visible action controls: View the reports sidebar, Export, Start Date :, This Month, Run Report, Show dropdown menu, None, Report#, Report Name, Status, Start Date, End Date, Submitted By, Amount, Policy Violated.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-031 Policy Violations

Route: `/reports/booksapp/expensereportpolicyviolation`. State: Table. Build priority: P2. Evidence: OBS-034.

No editable field controls were captured in this state.

Table columns: Report#, Report Name, Submitted By, Approver, Policy Violations Count.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Report#, Report Name.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-032 Report Approval Time

Route: `/reports/booksapp/expensereporttimetakenforapproval`. State: Table. Build priority: P2. Evidence: OBS-035.

No editable field controls were captured in this state.

Table columns: Approver, Approver Email ID, Average Time Taken, < 1 Days, 1-15 Days, 16-30 Days, 31-45 Days, > 45 Days.

Visible action controls: View the reports sidebar, Approved Date :, This Month, Run Report, 4 X 15 Days, Approver, 1-15 Days, 16-30 Days, 31-45 Days, > 45 Days.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-033 Expenses

Route: `/reports/booksapp/expensereporttimetakenforapproval`. State: Table. Build priority: P2. Evidence: OBS-036.

Observed controls: Search reports (textbox).

Table columns: Approver, Approver Email ID, Average Time Taken, < 1 Days, 1-15 Days, 16-30 Days, 31-45 Days, > 45 Days.

Visible action controls: Hide the reports sidebar, Expenses, Reports, Reimbursements, Trips, Tax Summary, Corporate Cards, Budget, Activity, View the reports sidebar, Approved Date :, This Month, Run Report, 4 X 15 Days, Approver, 1-15 Days, 16-30 Days, 31-45 Days, > 45 Days.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-034 Reimbursement Details

Route: `/reports/booksapp/reimbursementdetails`. State: Table. Build priority: P2. Evidence: OBS-037.

No editable field controls were captured in this state.

Table columns: Report Name, Reimbursed By, Reimbursed On, Paid Through, Reference#, Notes, Reimbursement Amount.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Table View, Chart View, None, Report Name, Reimbursed By, Reimbursed On, Paid Through, Reference#, Reimbursement Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-035 Reimbursements by User

Route: `/reports/booksapp/reimbursementbyuser`. State: Table. Build priority: P2. Evidence: OBS-038.

No editable field controls were captured in this state.

Table columns: User Name, Reimbursement Count, Reimbursement Amount.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, User Name, Reimbursement Count, Reimbursement Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-036 Awaiting Reimbursements by User

Route: `/reports/booksapp/pendingreimbursementbyuser`. State: Table. Build priority: P2. Evidence: OBS-039.

No editable field controls were captured in this state.

Table columns: User Name, Reimbursable Amount, Advance Amount, Refund Amount, Amount To Be Reimbursed.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, User Name.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-037 Liability Summary

Route: `/reports/booksapp/liabilitysummary`. State: Table. Build priority: P2. Evidence: OBS-040.

No editable field controls were captured in this state.

Table columns: User Name, Employee Liability, Company Liability.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, User Name, Employee Liability, Company Liability.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-038 Advances by User

Route: `/reports/booksapp/advancebyuser`. State: Table. Build priority: P2. Evidence: OBS-041.

No editable field controls were captured in this state.

Table columns: User Name, Advance Count, Advance Amount.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, User Name, Advance Count, Advance Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-039 Trip Details

Route: `/reports/booksapp/tripdetails`. State: Table. Build priority: P2. Evidence: OBS-042.

No editable field controls were captured in this state.

Table columns: Trip Number, Start Date, End Date, Trip Status, Destination Country, Destination City, Budget amount, Submitted By, Approver, Travel Type, Submitted Date.

Visible action controls: View the reports sidebar, Export, Start Date :, This Month, Run Report, Show dropdown menu, None, Trip Number, Start Date, End Date, Trip Status, Submitted By, Submitted Date.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-040 Trip Approval Time

Route: `/reports/booksapp/triptimetakenforapproval`. State: Table. Build priority: P2. Evidence: OBS-043.

No editable field controls were captured in this state.

Table columns: Approver, Approver Email ID, Average Time Taken, < 1 Days, 1-15 Days, 16-30 Days, 31-45 Days, > 45 Days.

Visible action controls: View the reports sidebar, This Month, Run Report, 4 X 15 Days, Approver, 1-15 Days, 16-30 Days, 31-45 Days, > 45 Days.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-041 Trip Stage Summary

Route: `/reports/booksapp/tripsummary`. State: Page. Build priority: P2. Evidence: OBS-044.

No editable field controls were captured in this state.

Visible action controls: View the reports sidebar, This Month, Run Report.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-042 Trip Expense Summary

Route: `/reports/booksapp/tripexpensesummary`. State: Table. Build priority: P2. Evidence: OBS-045.

No editable field controls were captured in this state.

Table columns: Trip Number, Trip Name, Booking Expenses, Per diem Allowance, Trip Expenses, Total Expense Amount.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Table View, Chart View, None, Trip Number, Booking Expenses, Per diem Allowance, Trip Expenses, Total Expense Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-043 Trip Summary by Report Status

Route: `/reports/booksapp/tripsummarybyreport`. State: Page. Build priority: P2. Evidence: OBS-046.

No editable field controls were captured in this state.

Visible action controls: View the reports sidebar, This Month, Run Report.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-044 Tax Summary

Route: `/reports/booksapp/expensetaxsummary`. State: Table. Build priority: P2. Evidence: OBS-047.

No editable field controls were captured in this state.

Table columns: Tax Name, Tax Percentage (%), Expense Amount, Tax Amount.

Visible action controls: View the reports sidebar, Export, Expense Date :, This Month, Run Report, Show dropdown menu, Tax Name, Tax Percentage (%), Expense Amount, Tax Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-045 Corporate Card Reconciliation

Route: `/reports/corporatecards`. State: Table. Build priority: P2. Evidence: OBS-048, OBS-049.

No editable field controls were captured in this state.

Table columns: Card/Account Name, Number of Cards, Total Amount, Unsubmitted Amount, Unapproved Expenses, Missing Reciepts, Excluded Amount.

Visible action controls: Search reports, Corporate Cards, Export, Close, This Month, More Filters, Run Report.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-046 Corporate Card Transaction Details

Route: `/reports/booksapp/corporatecardtransactions`. State: Table. Build priority: P2. Evidence: OBS-051.

Observed controls: Group By : (combobox, value None).

Table columns: Card Name, User Name, Date, Merchant Name, Status, Amount.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Card Name, User Name, Date, Merchant Name, Amount.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-047 Budget Vs Actuals

Route: `/reports/budgetvsactuals`. State: Page. Build priority: P2. Evidence: OBS-052, OBS-053.

Observed controls: [unlabelled] Please select a budget (combobox, value Select).

Visible action controls: Search reports, Budgets, Close.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-048 Activity Logs

Route: `/reports/booksapp/expenseactivitylogs`. State: Table. Build priority: P2. Evidence: OBS-054.

No editable field controls were captured in this state.

Table columns: Date, Activity Details, Description.

Visible action controls: View the reports sidebar, Export, This Month, Run Report, Show dropdown menu, Add Filters, Date, Activity Details.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-049 Active Users

Route: `/reports/booksapp/activeusers`. State: Table. Build priority: P2. Evidence: OBS-055.

No editable field controls were captured in this state.

Table columns: User Name, Email Address, Expense report count, AutoScan count, Mileage Expense count.

Visible action controls: View the reports sidebar, Custom, Run Report, User Name.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-050 Analytics catalogue

Route: `/reports/booksapp`. State: Page. Build priority: P2. Evidence: OBS-056.

Observed controls: Search reports (combobox).

Visible action controls: Create New Report, Show dropdown menu.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-051 Shared analytics reports

Route: `/reports/booksapp/sharedreports`. State: Page. Build priority: P2. Evidence: OBS-057.

Observed controls: Search reports (combobox).

Visible action controls: Create New Report, Show dropdown menu.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-052 My analytics reports

Route: `/reports/booksapp/customreports`. State: Page. Build priority: P2. Evidence: OBS-058.

Observed controls: Search reports (combobox); Schedule Type (combobox, value "Schedule Type :"); Parent Report (combobox, value "Parent Report :").

Visible action controls: Create New Report, Show dropdown menu.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-053 Scheduled analytics reports

Route: `/reports/booksapp/scheduledlist`. State: Page. Build priority: P2. Evidence: OBS-059.

Observed controls: Search reports (combobox).

Visible action controls: Create New Report, Show dropdown menu.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-054 Report Category

Route: `/reports/booksapp/scheduledlist`. State: Dialog. Build priority: P2. Evidence: OBS-060.

Observed controls: Choose how you would like to create the report (radiogroup); Create from existing report (radio, checked); Create an entirely new report (radio); Select a Report (combobox, value Select a Report); Search reports (combobox).

Visible action controls: Close, Proceed, Cancel, Create New Report, Show dropdown menu.

Reconstruction: Reuse a report viewer while retaining each report definition, columns, date basis and grouping. Implement card/budget reports as their observed variants; separate view, export and schedule operations.

Component: ReportViewer. Data relationships: report definition, report column, analytics read model.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Settings catalogue

### SCR-055 All settings

Route: `/settings`. State: Page. Build priority: P0. Evidence: OBS-061.

No editable field controls were captured in this state.

Reconstruction: Render the grouped settings navigation with search and explicit feature/permission visibility. Preserve route aliases without exposing unauthorized destinations.

Component: SettingsCatalogue. Data relationships: feature registry, permission.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Organization

### SCR-056 Organization Profile

Route: `/settings/organization`. State: Form. Build priority: P0. Evidence: OBS-063.

Observed controls: Organization Name * (textbox, required marker, value OHA System); Street 1 (textbox); Street 2 (textbox); City (textbox); State (combobox, value Maharashtra); ZIP Code (textbox); Country (combobox, disabled, value India); Phone (textbox); Fax (textbox); Website (textbox); Organization's Support Email Address (textbox, value <redacted>); Currency (inferred from displayed option) (combobox, disabled, value INR - Indian Rupee); Fiscal Year (combobox, value April - March); Time Zone (combobox, disabled, value (GMT 5:30) India Standard Time (Asia/Calcutta)); Date Format (combobox, value dd/MM/yyyy [ 29/10/2015 ]); Date Separator (combobox).

Visible action controls: Attach documents from computer, Configure Emails, Save.

Reconstruction: Reconstruct identity, regional fields and branding/domain configuration. Retain read-only country/base-currency/time-zone states seen in this account.

Component: OrganizationSettings. Data relationships: organization, region, brand, domain.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-057 Branding

Route: `/settings/branding`. State: Page. Build priority: P0. Evidence: OBS-064.

No editable field controls were captured in this state.

Visible action controls: Attach documents from computer, Dark Pane, Light Pane, Blue.

Reconstruction: Reconstruct identity, regional fields and branding/domain configuration. Retain read-only country/base-currency/time-zone states seen in this account.

Component: OrganizationSettings. Data relationships: organization, region, brand, domain.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-207 Custom domain

Route: `/settings/customdomain`. State: Page. Build priority: P0. Evidence: OBS-234.

Observed controls: Enter preferred domain (textbox).

Visible action controls: Add Domain.

Reconstruction: Reconstruct identity, regional fields and branding/domain configuration. Retain read-only country/base-currency/time-zone states seen in this account.

Component: OrganizationSettings. Data relationships: organization, region, brand, domain.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Master data

### SCR-058 Departments

Route: `/settings/departments`. State: Page. Build priority: P0. Evidence: OBS-065.

No editable field controls were captured in this state.

Visible action controls: New Department, More Action Menu.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-059 New Department

Route: `/settings/departments`. State: Dialog. Build priority: P0. Evidence: OBS-066.

Observed controls: Department Name * (textbox, required marker); Department Code (textbox); Department Head (combobox, value Select); Description (textbox, 250 characters).

Visible action controls: Close, Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-068 Taxes

Route: `/settings/taxes/taxrates`. State: Table. Build priority: P0. Evidence: OBS-076, OBS-310.

No editable field controls were captured in this state.

Table columns: Tax Name, Rate (%), More Action Menu.

Visible action controls: New, Tax Name.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-069 Currencies

Route: `/settings/currencies`. State: Table. Build priority: P0. Evidence: OBS-077, OBS-232.

No editable field controls were captured in this state.

Table columns: Name, Symbol, More Action Menu.

Visible action controls: New Currency, Disable Automatic Exchange Rates, AED- UAE Dirham, More Action Menu, AUD- Australian Dollar, BND- Brunei Dollar, CAD- Canadian Dollar, CNY- Yuan Renminbi, EUR- Euro, GBP- Pound Sterling, INR- Indian Rupee, JPY- Japanese Yen, SAR- Saudi Riyal, USD- United States Dollar, ZAR- South African Rand.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-070 Approval Groups

Route: `/settings/approvalgroups`. State: Table. Build priority: P0. Evidence: OBS-078.

No editable field controls were captured in this state.

Table columns: Name, Description, More Action Menu.

Visible action controls: New Approval Group.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-071 New Approval Group

Route: `/settings/approvalgroups`. State: Dialog. Build priority: P0. Evidence: OBS-079.

Observed controls: Approval Group Name * (textbox, required marker); Description (textbox); Group Members * (combobox, required marker).

Visible action controls: Close, Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-100 Categories

Route: `/settings/expensecategories`. State: Table. Build priority: P0. Evidence: OBS-111, OBS-117.

Observed controls: Select All (checkbox); Air Travel Expense (checkbox); Automobile Expense (checkbox); Construction Loans (checkbox); Fuel/Mileage Expenses (checkbox); IT and Internet Expenses (checkbox); Job Costing (checkbox); Labor (checkbox); Lodging (checkbox); Materials (checkbox); Meals and Entertainment (checkbox); Mortgages (checkbox); Office Supplies (checkbox); Other Expenses (checkbox); Parking (checkbox); Prepaid Expenses (checkbox); Subcontractor (checkbox); TDS Payable (checkbox); TDS Receivable (checkbox); Telephone Expense (checkbox).

Table columns: Select All, Category Name, Account Code, More Action Menu.

Visible action controls: Preferences, More Action Menu, More Filters, Category Name, Total Count:.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-101 Merchants

Route: `/settings/merchants`. State: Page. Build priority: P0. Evidence: OBS-112, OBS-119.

No editable field controls were captured in this state.

Visible action controls: New Merchant, More.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-102 Customers

Route: `/settings/customers`. State: Page. Build priority: P0. Evidence: OBS-113, OBS-121.

No editable field controls were captured in this state.

Visible action controls: More, More Filters.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-103 Projects

Route: `/settings/projects`. State: Page. Build priority: P0. Evidence: OBS-114, OBS-123.

No editable field controls were captured in this state.

Visible action controls: Show dropdown menu, More Filters.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-104 Paid Through Accounts

Route: `/settings/paidthrough`. State: Table. Build priority: P0. Evidence: OBS-115.

No editable field controls were captured in this state.

Table columns: Account Name, Account Code, Type, More Action Menu.

Visible action controls: New Paid Through Account, Show dropdown menu, Account Name, Account Code, Type, Undeposited Funds, More Action Menu, Petty Cash, TDS Payable.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-105 New Account

Route: `/settings/paidthrough`. State: Dialog. Build priority: P0. Evidence: OBS-116.

Observed controls: Account Name * (textbox, required marker); Account Code (textbox); Account Type * (combobox, required marker, value Bank); Account Number (textbox); AAAA0000000 (textbox); Currency (combobox, value Select); Description (textbox, 500 characters).

Visible action controls: Close, Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-106 New Category

Route: `/settings/expensecategories/new`. State: Form. Build priority: P0. Evidence: OBS-118.

Observed controls: Category Name * (textbox, required marker); Make this a sub-category (checkbox); Account Code (textbox, 50 characters; letters, digits, hyphen, underscore); Expense Type (combobox, value Select); Description (textbox, 500 characters); Policies (combobox); Policies (combobox).

Visible action controls: Close, Select an icon for the category, Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-107 New Merchant

Route: `/settings/merchants`. State: Dialog. Build priority: P0. Evidence: OBS-120.

Observed controls: Merchant Name * (textbox, required marker); Merchant Code (textbox).

Visible action controls: Close, Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-108 New Customer

Route: `/settings/customers/new`. State: Form. Build priority: P0. Evidence: OBS-122.

Selected tabs: Contact Persons.

Observed controls: Customer Type (radiogroup); Business (radio, checked); Individual (radio); Salutation (combobox); First Name (textbox); Last Name (textbox); Company Name (textbox); Contact Display Name * (combobox, required marker); Email Address (textbox); Work Phone (textbox); Mobile (textbox); Currency * (combobox, required marker, value INR- Indian Rupee); Website (textbox); Skype (textbox); Facebook (textbox); Twitter (textbox); Salutation (combobox); First Name (textbox); Last Name (textbox); Email Address (textbox); Work Phone (textbox); Mobile (textbox).

Table columns: Name, Email Address, Work Phone / Mobile / Skype.

Visible action controls: Close, Skype Name / Number, Remove, Add Contact Person, Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-109 New Project

Route: `/settings/projects/new`. State: Form. Build priority: P0. Evidence: OBS-124.

Observed controls: Project Name * (textbox, required marker); Project Code (textbox, 500 characters); Description (textbox, 500 characters); Customer Name * (combobox, required marker, value Select); Project Head (combobox, value Select); Associate with all users (checkbox); Name (textbox, disabled, value [current user]); Email Address (textbox, disabled, value <redacted>).

Visible action controls: Close, Associate user, Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-203 Categories

Route: `/settings/expensetypes`. State: Table. Build priority: P0. Evidence: OBS-229.

Observed controls: Select All (checkbox); Food (checkbox); Lodging (checkbox); Air Travel (checkbox); Rental (checkbox); Taxi (checkbox); Incidentals (checkbox); Goods (checkbox); Services (checkbox); Others (checkbox); Allowances (checkbox); Breakfast (checkbox); Lunch (checkbox); Dinner (checkbox); Drinks (checkbox); Row - More Action Menu (combobox).

Table columns: Select All, Name, Default Category, Description, More Action Menu.

Visible action controls: More Filters, More Action Menu, Total Count:.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-205 New Expense Type

Route: `/settings/expensetypes/new`. State: Form. Build priority: P0. Evidence: OBS-231.

Observed controls: Name * (textbox, required marker, 500 characters); Description (textbox, 500 characters); Categories * (combobox, required marker); Configure per diem for this expense type (checkbox).

Visible action controls: Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-206 New Currency

Route: `/settings/currencies`. State: Dialog. Build priority: P0. Evidence: OBS-233.

Observed controls: [unlabelled] Currency Code * (combobox, required marker, value Select); Currency Symbol * (textbox, required marker); Decimal Places (combobox, value 2); Format (combobox, value Select).

Visible action controls: Close, Save, Cancel.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-237 contact field configuration

Route: `/settings/preferences/contact/fields`. State: Table. Build priority: P0. Evidence: OBS-284.

No editable field controls were captured in this state.

Table columns: Enable, Field, Mandatory, More Action Menu.

Visible action controls: More Filters, Save.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-238 project field configuration

Route: `/settings/preferences/project/fields`. State: Table. Build priority: P0. Evidence: OBS-285.

No editable field controls were captured in this state.

Table columns: Enable, Field, Mandatory, More Action Menu.

Visible action controls: More Filters, Save.

Reconstruction: Use typed forms and a common list frame; preserve entity-specific required fields, hierarchy and association rules. Do not infer record validity from empty lists.

Component: MasterDataCrud. Data relationships: department, category, expense type, customer, project, account, currency, tax.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## AI configuration

### SCR-060 AI preferences

Route: `/settings/booksapp/ai/preferences`. State: Form. Build priority: P3. Evidence: OBS-067, OBS-305.

Observed controls: Ask Zia (switch); Row - AI Provider (combobox, disabled, value Zia); Row - Model (combobox, disabled, value Internal LLM); Speech Assistant (switch); Row - AI Provider (combobox, disabled, value Zia); Row - Model (combobox, disabled, value Internal LLM); Writing Assistant (switch); Row - AI Provider (combobox, disabled, value Zia); Row - Model (combobox, disabled, value Internal LLM); Zia Forecasting (switch); Row - AI Provider (combobox, disabled, value Zia); Row - Model (combobox, disabled, value Internal LLM).

Table columns: Features, AI Provider, Model.

Visible action controls: Save, Cancel.

Reconstruction: Reconstruct feature/provider/model preferences and bring-your-own-key setup entry points. Store keys only as vault references; never permit assistant actions to bypass domain permissions.

Component: AIPreferences. Data relationships: AI feature setting, provider connection.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-253 AI provider setup

Route: `/settings/booksapp/ai/setup`. State: Page. Build priority: P3. Evidence: OBS-306.

No editable field controls were captured in this state.

Visible action controls: Setup Now.

Reconstruction: Reconstruct feature/provider/model preferences and bring-your-own-key setup entry points. Store keys only as vault references; never permit assistant actions to bypass domain permissions.

Component: AIPreferences. Data relationships: AI feature setting, provider connection.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Users

### SCR-061 Users

Route: `/settings/users`. State: Table. Build priority: P0. Evidence: OBS-068, OBS-073.

Observed controls: [unlabelled] Name (combobox, value Select); [unlabelled] Department (combobox, value Select); Select All (checkbox); Row - Select All (checkbox).

Table columns: Select All, User Details, Role, Policy, Submits To, More Action Menu.

Visible action controls: New Expense, Change View, More Action Menu, More Filters, Advanced Search, User Details, Role, Submits To.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-066 New User

Route: `/settings/users/new`. State: Form. Build priority: P0. Evidence: OBS-074.

Observed controls: First Name * (textbox, required marker); Middle Name (textbox); Last Name (textbox); Display Name (textbox); Employee ID (textbox); Email Address * (textbox, required marker); Mobile (combobox, value +91); Mobile (textbox); Role * (combobox, required marker, value Submitter); Submits To (combobox, value Select); Department (combobox, value Select); Policy * (combobox, required marker, value OHA System); Skip invitation email (checkbox).

Visible action controls: Close, Show more fields, Add, Cancel.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-067 New User

Route: `/settings/users/new`. State: Form. Build priority: P0. Evidence: OBS-075.

Observed controls: First Name * (textbox, required marker); Middle Name (textbox); Last Name (textbox); Display Name (textbox); Employee ID (textbox); Email Address * (textbox, required marker); Mobile (combobox, value +91); Mobile (textbox); Role * (combobox, required marker, value Submitter); Submits To (combobox, value Select); Department (combobox, value Select); Policy * (combobox, required marker, value OHA System); Date of Birth (textbox); Gender (combobox, value Select); Date of Joining (textbox); Designation (combobox); Skip invitation email (checkbox).

Visible action controls: Close, Add, Cancel.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-236 user field configuration

Route: `/settings/preferences/user/fields`. State: Table. Build priority: P0. Evidence: OBS-283.

No editable field controls were captured in this state.

Table columns: Enable, Field, Mandatory, More Action Menu.

Visible action controls: More Filters, Save.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-259 User detail overview

Route: `/settings/users/{record_id}/details`. State: Page. Build priority: P0. Evidence: OBS-314.

Selected tabs: Overview.

No editable field controls were captured in this state.

Visible action controls: More Action Menu, Close, Add Bank Account, Add Delegate, View Previous Delegates.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-260 User detail overview

Route: `/settings/users/{record_id}/details`. State: Page. Build priority: P0. Evidence: OBS-315.

Selected tabs: Travel Details, Travel Profile.

No editable field controls were captured in this state.

Visible action controls: More Action Menu, Close.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-261 User detail overview

Route: `/settings/users/{record_id}/details`. State: Page. Build priority: P0. Evidence: OBS-316.

Selected tabs: Activity Logs.

No editable field controls were captured in this state.

Visible action controls: More Action Menu, Close.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-262 User detail overview

Route: `/settings/users/{record_id}/details`. State: Page. Build priority: P0. Evidence: OBS-317, OBS-320.

Selected tabs: Budgets.

No editable field controls were captured in this state.

Visible action controls: More Action Menu, Close.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-263 Edit User

Route: `/settings/users/{record_id}/edit`. State: Form. Build priority: P0. Evidence: OBS-318.

Observed controls: First Name * (textbox, required marker, value [current user]); Middle Name (textbox); Last Name (textbox); Display Name (textbox, value [current user]); Employee ID (textbox); Email Address * (combobox, required marker, value [email redacted]); Mobile (combobox, value +91); Mobile (textbox); Role * (combobox, required marker, value Admin); Submits To (combobox, value Select); Approves And Forwards To (combobox, value Select); Department (combobox, value Select); Policy * (combobox, required marker, value OHA System); Skip invitation email (checkbox).

Visible action controls: Close, Add Criterion, Show more fields, Save, Cancel.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-264 Edit User

Route: `/settings/users/{record_id}/edit`. State: Form. Build priority: P0. Evidence: OBS-319.

Observed controls: First Name * (textbox, required marker, value [current user]); Middle Name (textbox); Last Name (textbox); Display Name (textbox, value [current user]); Employee ID (textbox); Email Address * (combobox, required marker, value [email redacted]); Mobile (combobox, value +91); Mobile (textbox); Role * (combobox, required marker, value Admin); Submits To (combobox, value Select); [unlabelled] Only if amount exceeds (textbox, value 0); Approves And Forwards To (combobox, value Select); Department (combobox, value Select); Policy * (combobox, required marker, value OHA System); Skip invitation email (checkbox).

Visible action controls: Close, Add Criterion, Show more fields, Save, Cancel.

Reconstruction: Build list, create/edit, overview, travel, activity and budget views. Distinguish super-admin designation from the Admin role; invitations are separate side effects.

Component: UserWorkspace. Data relationships: user, policy membership, department, reporting edge.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Roles and permissions

### SCR-062 Roles & Permissions

Route: `/settings/roles`. State: Table. Build priority: P0. Evidence: OBS-069.

No editable field controls were captured in this state.

Table columns: Role Name, Role Description, More Action Menu.

Visible action controls: Role Name, More Action Menu.

Reconstruction: Reconstruct the named permission controls and scope selectors. Enforce identical restrictions in the API; make user ownership, approval scope and protected-data access explicit.

Component: PermissionMatrix. Data relationships: role, permission, user role.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-063 View Approver role

Route: `/settings/roles/{record_id}/edit`. State: Form. Build priority: P0. Evidence: OBS-070.

Observed controls: Role Name * (textbox, required marker, value Approver); Role Description (textbox, value Submit and approve expense reports. Cannot access Settings.); Create and Submit Trips (checkbox, checked); View Trip (combobox, value My Trips); Approve Trip (combobox, value Direct Trips); Close Trip (checkbox, checked); Archive Trip (checkbox, checked); Reopen Trip (checkbox); Restrict users from editing approved trips. (checkbox); Add and modify my Travel Documents (checkbox, checked); All Company Travel Documents (combobox, value No Access); Create and Submit Expense Reports (checkbox, checked); View Report (combobox, value My Reports); Approve Report (combobox, value Direct Reports); Approve reports with policy violations (checkbox, checked); Modify Expenses in Submitted Reports (checkbox, checked); Reimburse Report (checkbox); Share Report (checkbox, checked); Archive Report (checkbox, checked); Edit reports and their expenses after they are marked as exported (checkbox); Prevent expense creation using a Parent category (checkbox); Prevent overwriting exchange rate in Expense Creation (checkbox); View Corporate Card (combobox, value My Corporate Cards); Connect Corporate Card For (combobox, value Myself); Record Advance For (combobox, value Myself); View Policy Advances (checkbox); Approve Employee Advance (checkbox, checked); Edit advances after they are marked as exported (checkbox); View Shared Budgets (checkbox); View General Budgets (checkbox, disabled); Add and Modify General Budgets (checkbox, disabled); View User Budgets (combobox, value None); Add and Modify User Budgets (combobox, disabled, value None); Allow users to add additional approvers (checkbox); Allow delegate to submit records (checkbox, checked); Allow delegate to approve records (checkbox, checked); Settings (checkbox); Add Users (checkbox); Preferences (checkbox); Custom View (checkbox, checked); Expense Categories (checkbox); Customers (checkbox); Projects (checkbox); Merchants (checkbox); Currencies (checkbox); Taxes (checkbox); Payment Mode (checkbox); Manage Integrations (checkbox); Billing (checkbox); Provide access to protected data (checkbox).

Visible action controls: Close, Cancel.

Reconstruction: Reconstruct the named permission controls and scope selectors. Enforce identical restrictions in the API; make user ownership, approval scope and protected-data access explicit.

Component: PermissionMatrix. Data relationships: role, permission, user role.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-064 View Submitter role

Route: `/settings/roles/{record_id}/edit`. State: Form. Build priority: P0. Evidence: OBS-071.

Observed controls: Role Name * (textbox, required marker, value Submitter); Role Description (textbox, value Submit expense reports. Cannot access Approvals and Settings.); Create and Submit Trips (checkbox, checked); View Trip (combobox, value My Trips); Approve Trip (combobox, value None); Close Trip (checkbox, checked); Archive Trip (checkbox, checked); Reopen Trip (checkbox); Restrict users from editing approved trips. (checkbox); Add and modify my Travel Documents (checkbox, checked); All Company Travel Documents (combobox, value No Access); Create and Submit Expense Reports (checkbox, checked); View Report (combobox, value My Reports); Approve Report (combobox, value None); Approve reports with policy violations (checkbox, disabled); Modify Expenses in Submitted Reports (checkbox, disabled); Reimburse Report (checkbox); Share Report (checkbox, checked); Archive Report (checkbox, checked); Edit reports and their expenses after they are marked as exported (checkbox); Prevent expense creation using a Parent category (checkbox); Prevent overwriting exchange rate in Expense Creation (checkbox); View Corporate Card (combobox, value My Corporate Cards); Connect Corporate Card For (combobox, value Myself); Record Advance For (combobox, value Myself); View Policy Advances (checkbox); Approve Employee Advance (checkbox); Edit advances after they are marked as exported (checkbox); View Shared Budgets (checkbox); View General Budgets (checkbox, disabled); Add and Modify General Budgets (checkbox, disabled); View User Budgets (combobox, value None); Add and Modify User Budgets (combobox, disabled, value None); Allow users to add additional approvers (checkbox); Allow delegate to submit records (checkbox, checked); Allow delegate to approve records (checkbox); Settings (checkbox); Add Users (checkbox); Preferences (checkbox); Custom View (checkbox, checked); Expense Categories (checkbox); Customers (checkbox); Projects (checkbox); Merchants (checkbox); Currencies (checkbox); Taxes (checkbox); Payment Mode (checkbox); Manage Integrations (checkbox); Billing (checkbox); Provide access to protected data (checkbox).

Visible action controls: Close, Cancel.

Reconstruction: Reconstruct the named permission controls and scope selectors. Enforce identical restrictions in the API; make user ownership, approval scope and protected-data access explicit.

Component: PermissionMatrix. Data relationships: role, permission, user role.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-065 View Admin role

Route: `/settings/roles/{record_id}/edit`. State: Form. Build priority: P0. Evidence: OBS-072.

Observed controls: Role Name * (textbox, required marker, value Admin); Role Description (textbox, value Unrestricted access to all modules.); Create and Submit Trips (checkbox, checked); View Trip (combobox, value All Company Trips); Approve Trip (combobox, value All Company Trips); Close Trip (checkbox, checked); Archive Trip (checkbox, checked); Reopen Trip (checkbox, checked); Restrict users from editing approved trips. (checkbox); Add and modify my Travel Documents (checkbox, checked); All Company Travel Documents (combobox, value Add and Modify Access); Create and Submit Expense Reports (checkbox, checked); View Report (combobox, value All Company Reports); Approve Report (combobox, value All Company Reports); Approve reports with policy violations (checkbox, checked); Modify Expenses in Submitted Reports (checkbox, checked); Reimburse Report (checkbox, checked); Share Report (checkbox, checked); Archive Report (checkbox, checked); Edit reports and their expenses after they are marked as exported (checkbox, checked); Prevent expense creation using a Parent category (checkbox); Prevent overwriting exchange rate in Expense Creation (checkbox); View Corporate Card (combobox, value All Corporate Cards); Connect Corporate Card For (combobox, value All Users); Record Advance For (combobox, value All Users); View Policy Advances (checkbox, checked); Approve Employee Advance (checkbox, checked); Edit advances after they are marked as exported (checkbox, checked); View Shared Budgets (checkbox, checked); View General Budgets (checkbox, checked); Add and Modify General Budgets (checkbox, checked); View User Budgets (combobox, value All Users); Add and Modify User Budgets (combobox, value All Users); Allow users to add additional approvers (checkbox, checked); Allow delegate to submit records (checkbox, checked); Allow delegate to approve records (checkbox, checked); Settings (checkbox, checked); Add Users (checkbox, checked); Preferences (checkbox, checked); Custom View (checkbox, checked); Expense Categories (checkbox, checked); Customers (checkbox, checked); Projects (checkbox, checked); Merchants (checkbox, checked); Currencies (checkbox, checked); Taxes (checkbox, checked); Payment Mode (checkbox, checked); Manage Integrations (checkbox, checked); Billing (checkbox, checked); Provide access to protected data (checkbox, checked).

Visible action controls: Close, Cancel.

Reconstruction: Reconstruct the named permission controls and scope selectors. Enforce identical restrictions in the API; make user ownership, approval scope and protected-data access explicit.

Component: PermissionMatrix. Data relationships: role, permission, user role.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-256 New Role

Route: `/settings/roles/new`. State: Form. Build priority: P0. Evidence: OBS-311.

Observed controls: Role Name * (textbox, required marker); Role Description (textbox); Create and Submit Trips (checkbox, checked); View Trip (combobox, value My Trips); Approve Trip (combobox, value Direct Trips); Close Trip (checkbox, checked); Archive Trip (checkbox, checked); Reopen Trip (checkbox); Restrict users from editing approved trips. (checkbox); Add and modify my Travel Documents (checkbox, checked); All Company Travel Documents (combobox, value Add and Modify Access); Create and Submit Expense Reports (checkbox, checked); View Report (combobox, value My Reports); Approve Report (combobox, value Direct Reports); Approve reports with policy violations (checkbox); Modify Expenses in Submitted Reports (checkbox); Reimburse Report (checkbox); Share Report (checkbox, checked); Archive Report (checkbox, checked); Edit reports and their expenses after they are marked as exported (checkbox, checked); Prevent expense creation using a Parent category (checkbox); Prevent overwriting exchange rate in Expense Creation (checkbox); View Corporate Card (combobox, value My Corporate Cards); Connect Corporate Card For (combobox, value Myself); Record Advance For (combobox, value Myself); View Policy Advances (checkbox); Approve Employee Advance (checkbox); Edit advances after they are marked as exported (checkbox, checked); View Shared Budgets (checkbox, checked); View General Budgets (checkbox, checked); Add and Modify General Budgets (checkbox, checked); View User Budgets (combobox, value All Users); Add and Modify User Budgets (combobox, value All Users); Allow users to add additional approvers (checkbox, checked); Allow delegate to submit records (checkbox, checked); Allow delegate to approve records (checkbox, checked); Settings (checkbox, checked); Add Users (checkbox, checked); Preferences (checkbox, checked); Custom View (checkbox, checked); Expense Categories (checkbox, checked); Customers (checkbox, checked); Projects (checkbox, checked); Merchants (checkbox, checked); Currencies (checkbox, checked); Taxes (checkbox, checked); Payment Mode (checkbox, checked); Manage Integrations (checkbox, checked); Billing (checkbox, checked); Provide access to protected data (checkbox, checked).

Visible action controls: Close, Save, Cancel.

Reconstruction: Reconstruct the named permission controls and scope selectors. Enforce identical restrictions in the API; make user ownership, approval scope and protected-data access explicit.

Component: PermissionMatrix. Data relationships: role, permission, user role.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Policies

### SCR-072 Policies

Route: `/settings/policies`. State: Table. Build priority: P0. Evidence: OBS-080.

Observed controls: Search (textbox).

Table columns: Name, Description, Last Modified By, More Action Menu.

Visible action controls: More Action Menu.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-073 Policy settings

Route: `/settings/policies/-1`. State: Form. Build priority: P0. Evidence: OBS-081, OBS-301.

Selected tabs: Policy Settings.

Observed controls: Name * (textbox, required marker, disabled, value OHA System, 250 characters); Description (textbox, disabled, 250 characters); Policy Admins (combobox); Allow uncategorized expenses to be part of expense reports Note: Uncategorized expenses are considered as policy violation (checkbox, checked); Domestic (checkbox); International (checkbox).

Table columns: Travel Type, Submission Window.

Visible action controls: Back, More Action Menu, Upload Travel Policy Attach documents from computer, Attach documents from computer, Save.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-074 Policy settings

Route: `/settings/policies/-1`. State: Table. Build priority: P0. Evidence: OBS-082.

Selected tabs: Category Limits.

Observed controls: Select All (checkbox, checked); Air Travel Expense - Select All (checkbox, checked); Automobile Expense - Select All (checkbox, checked); Construction Loans - Select All (checkbox, checked); Fuel/Mileage Expenses - Select All (checkbox, checked); IT and Internet Expenses - Select All (checkbox, checked); Job Costing - Select All (checkbox, checked); Labor - Select All (checkbox, checked); Lodging - Select All (checkbox, checked); Materials - Select All (checkbox, checked); Meals and Entertainment - Select All (checkbox, checked); Mortgages - Select All (checkbox, checked); Office Supplies - Select All (checkbox, checked); Other Expenses - Select All (checkbox, checked); Parking - Select All (checkbox, checked); Prepaid Expenses - Select All (checkbox, checked); Subcontractor - Select All (checkbox, checked); TDS Payable - Select All (checkbox, checked); TDS Receivable - Select All (checkbox, checked); Telephone Expense - Select All (checkbox, checked).

Table columns: Expense amount limit, Receipt required limit, Description required, Select All, Category Name, Action.

Visible action controls: Back, More Action Menu, Override, Save.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-075 Policy settings

Route: `/settings/policies/-1`. State: Form. Build priority: P0. Evidence: OBS-083.

Selected tabs: Mileage.

Observed controls: Default Unit (radiogroup); Km (radio, checked); Mile (radio); Default Category (combobox, value Fuel/Mileage Expenses).

Visible action controls: Back, More Action Menu, New Vehicle, New Rate, Save, Disable Mileage.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-076 Policy settings

Route: `/settings/policies/-1`. State: Page. Build priority: P0. Evidence: OBS-084.

Selected tabs: Per Diem.

No editable field controls were captured in this state.

Visible action controls: Back, More Action Menu, Import Rates, Configure Custom Rates.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-077 Policy settings

Route: `/settings/policies/-1`. State: Page. Build priority: P0. Evidence: OBS-085, OBS-089.

Selected tabs: Rules.

No editable field controls were captured in this state.

Visible action controls: Back, More Action Menu, Add Rule.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-078 Policy settings

Route: `/settings/policies/-1`. State: Page. Build priority: P0. Evidence: OBS-086.

Selected tabs: Audit.

No editable field controls were captured in this state.

Visible action controls: Back, More Action Menu, Enable.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-079 Add Rule

Route: `/settings/policies/-1`. State: Dialog. Build priority: P0. Evidence: OBS-087.

Observed controls: Name * (textbox, required marker); Rule Type * (combobox, required marker, value Daily limit); Effective From (textbox); Limit Type * (combobox, required marker, value Fixed Amount); Amount * (textbox, required marker); Limit amount is inclusive of tax (checkbox); [unlabelled] Category or Expense Type (combobox, value Category); [unlabelled control] (combobox, value Select); Action Type (combobox, value Warn).

Visible action controls: Close, Save, Cancel.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-080 Add Rule

Route: `/settings/policies/-1`. State: Dialog. Build priority: P0. Evidence: OBS-088.

Observed controls: Name * (textbox, required marker); Rule Type * (combobox, required marker, value Daily limit); Search (textbox); Effective From (textbox); Limit Type * (combobox, required marker, value Fixed Amount); Amount * (textbox, required marker); Limit amount is inclusive of tax (checkbox); [unlabelled] Category or Expense Type (combobox, value Category); [unlabelled control] (combobox, value Select); Action Type (combobox, value Warn).

Expanded options: Daily limit, Monthly limit, Yearly limit, Custom.

Visible action controls: Close, Save, Cancel.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-081 Policy settings

Route: `/settings/policies/-1`. State: Form. Build priority: P0. Evidence: OBS-090.

Selected tabs: Mileage.

Observed controls: Default Unit (radiogroup); Km (radio, checked); Mile (radio); Default Category (combobox, value Fuel/Mileage Expenses); Start date (textbox); Mileage rate (textbox).

Table columns: Start date, Mileage rate, More Action Menu.

Visible action controls: Back, More Action Menu, New Vehicle, Remove, New Rate, Save, Disable Mileage.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-250 Air Travel Expense

Route: `/settings/policies/-1`. State: Dialog. Build priority: P0. Evidence: OBS-302.

Observed controls: Expense amount limit (checkbox); Receipt required limit (checkbox); Make description mandatory (checkbox).

Visible action controls: Close, Save, Cancel.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-251 New Vehicle

Route: `/settings/policies/-1`. State: Dialog. Build priority: P0. Evidence: OBS-303.

Observed controls: Vehicle Name * (textbox, required marker); Record Mileage Using * (combobox, required marker, value All); Hint (textbox, 100 characters).

Visible action controls: Close, Save, Cancel.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-252 Per Diem Preferences

Route: `/settings/policies/-1`. State: Dialog. Build priority: P0. Evidence: OBS-304.

Selected tabs: Per Diem.

Observed controls: Home Location * (combobox, required marker, value Select); Default Category * (combobox, required marker, value Select); First Travel Day Per Diem * (combobox, required marker, value Arrival Location); Last Travel Day Per Diem * (combobox, required marker, value Departure Location).

Visible action controls: Back, More Action Menu, Import Rates, Configure Custom Rates, Close, Save and Continue, Cancel.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed; later wizard steps gated by persistence.

### SCR-257 New Policy

Route: `/settings/policies/-1/clone`. State: Form. Build priority: P0. Evidence: OBS-312.

Observed controls: Name * (textbox, required marker, 250 characters); Description (textbox, 250 characters); Policy Admins (combobox); Allow uncategorized expenses to be part of expense reports Note: Uncategorized expenses are considered as policy violation (checkbox, checked); Domestic (checkbox); International (checkbox).

Table columns: Travel Type, Submission Window.

Visible action controls: Upload Travel Policy Attach documents from computer, Attach documents from computer, Save and Continue.

Reconstruction: Build tabs and effective-dated rule editors. Evaluate deterministic limits and save versioned policy snapshots so later edits do not rewrite past decisions.

Component: PolicyEditor. Data relationships: policy, category limit, rule, mileage and per-diem rate.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed; later wizard steps gated by persistence.

## Customization

### SCR-082 Reporting tags

Route: `/settings/booksapp/advanced-reportingtags`. State: Page. Build priority: P2. Evidence: OBS-091, OBS-224.

No editable field controls were captured in this state.

Visible action controls: New Reporting Tag.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-083 PDF Templates

Route: `/settings/pdftemplates`. State: Page. Build priority: P2. Evidence: OBS-092, OBS-239.

No editable field controls were captured in this state.

Visible action controls: New Template, Group By Category, Mark as Default Template, More Action Menu, Standard, Group By Date.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-084 Trip Request Notification

Route: `/settings/booksapp/emails/templates`. State: Table. Build priority: P2. Evidence: OBS-093, OBS-248.

No editable field controls were captured in this state.

Table columns: Name, Subject and Content, More Actions.

Visible action controls: New.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-085 SMS Notifications

Route: `/settings/smsnotifications`. State: Table. Build priority: P2. Evidence: OBS-094.

No editable field controls were captured in this state.

Table columns: Notification Type, Module, Content, Status.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-086 Web Tabs

Route: `/settings/webtabs`. State: Table. Build priority: P2. Evidence: OBS-095, OBS-235.

No editable field controls were captured in this state.

Table columns: Name, URL, More Action Menu.

Visible action controls: New Web Tab.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-199 Create reporting tag

Route: `/settings/booksapp/advanced-reportingtags/configure-tag`. State: Form. Build priority: P2. Evidence: OBS-225.

Observed controls: Reporting Tag Name (textbox, required marker); Description (textbox); Expenses and Purchase Requests (checkbox); [unlabelled] Expenses and Purchase Requests (radiogroup); At Transaction Level (radio, disabled); At Line Item Level (radio, disabled); Expense Reports (checkbox, disabled); Top-ups and Withdrawals (checkbox); Make this reporting tag as mandatory (checkbox).

Visible action controls: Save and Continue, Cancel.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed; later wizard steps gated by persistence.

### SCR-208 New Web Tab

Route: `/settings/webtabs`. State: Dialog. Build priority: P2. Evidence: OBS-236.

Observed controls: Name * (textbox, required marker); URL * (textbox, required marker); Visibility (radiogroup); Only me (radio); Only selected users & roles (radio); Everyone (radio, checked).

Table columns: Name, URL, More Action Menu.

Visible action controls: New Web Tab, Close, Save, Cancel.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-210 Choose a template

Route: `/settings/pdftemplates`. State: Page. Build priority: P2. Evidence: OBS-240, OBS-241, OBS-242.

No editable field controls were captured in this state.

Visible action controls: Close.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-211 Report Template Customization

Route: `/settings/pdftemplates`. State: Form. Build priority: P2. Evidence: OBS-243.

Selected tabs: Template Properties.

Observed controls: Template Name * (textbox, required marker, value Standard); Margin Top (textbox, value 0.7); Margin Right (textbox, value 0.4); Margin Bottom (textbox, value 0.7); Margin Left (textbox, value 0.55); PDF Font (combobox, value Ubuntu).

Visible action controls: Close, Save, Cancel.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-212 Report Template Customization

Route: `/settings/pdftemplates/new`. State: Form. Build priority: P2. Evidence: OBS-244.

Selected tabs: Header.

Observed controls: Organization Logo (checkbox, checked); Organization Name (checkbox, checked); Organization Address (checkbox, checked); Enable (checkbox, checked, disabled); Document Title (textbox, value EXPENSE REPORT); Report Number (checkbox, checked); Amount to be Reimbursed (checkbox, checked); Total Amount (checkbox, checked).

Visible action controls: Close, Fields, Formatting, Save, Cancel.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-213 Report Template Customization

Route: `/settings/pdftemplates/new`. State: Form. Build priority: P2. Evidence: OBS-245.

Selected tabs: Report Fields.

Observed controls: Report Name (checkbox, checked); Select the Submitter (checkbox, checked); Submitter (textbox, value Submitted By); Select the Approver (checkbox, checked); Approver (textbox, value Report To); Select the Submitted On (checkbox, checked); Submitted On (textbox); Select the Report Duration (checkbox, checked); Report Duration (textbox); Select the Customer (checkbox, checked); Customer (textbox); Select the Project (checkbox, checked); Project (textbox); Select the Custom Fields (checkbox, checked); Custom Fields (textbox, disabled); Select the Tags (checkbox); Tags (textbox, disabled); Select the Policy Name (checkbox); Policy Name (textbox, disabled).

Visible action controls: Close, Fields, Formatting, Customize submitter details, Customize approver details, Save, Cancel.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-214 Report Template Customization

Route: `/settings/pdftemplates/new`. State: Form. Build priority: P2. Evidence: OBS-246.

Selected tabs: Summary.

Observed controls: Trip Summary (checkbox, checked); Policy Violations (checkbox, checked); Report Summary (checkbox, checked); Attach Receipts (checkbox); Attach Report Documents (checkbox).

Visible action controls: Close, Fields, Formatting, Save, Cancel.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-215 Report Template Customization

Route: `/settings/pdftemplates/new`. State: Form. Build priority: P2. Evidence: OBS-247.

Selected tabs: Footer.

Observed controls: Page Number (checkbox, checked); Submitter Signature (checkbox, checked); Approver Signature (checkbox, checked); All approvers' signatures (checkbox); Approval History (checkbox, checked).

Visible action controls: Close, Save, Cancel.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-216 Trip Request Notification - Default

Route: `/settings/booksapp/emails/templates/edit`. State: Form. Build priority: P2. Evidence: OBS-249.

Observed controls: Template Name* (textbox, required marker); [unlabelled] Subject* (textbox, required marker); undefined (textbox).

Visible action controls: Normal Text, 16px, Arial, Show dropdown menu, Insert Placeholder, Save, Cancel.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-217 Report Notification

Route: `/settings/booksapp/emails/templates`. State: Table. Build priority: P2. Evidence: OBS-250.

No editable field controls were captured in this state.

Table columns: Name, Subject and Content, More Actions.

Visible action controls: New.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-218 Employee Advance Notification

Route: `/settings/booksapp/emails/templates`. State: Table. Build priority: P2. Evidence: OBS-251.

No editable field controls were captured in this state.

Table columns: Name, Subject and Content, More Actions.

Visible action controls: New.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-219 Employee Advance Refund Notification

Route: `/settings/booksapp/emails/templates`. State: Table. Build priority: P2. Evidence: OBS-252.

No editable field controls were captured in this state.

Table columns: Name, Subject and Content, More Actions.

Visible action controls: New.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-220 User Onboarding Notification

Route: `/settings/booksapp/emails/templates`. State: Table. Build priority: P2. Evidence: OBS-253.

No editable field controls were captured in this state.

Table columns: Name, Subject and Content, More Actions.

Visible action controls: Show dropdown menu.

Reconstruction: Build tag scope/options, PDF editor tabs, email rich text, SMS events and web-tab visibility. Apply sharing and placeholder validation before saving.

Component: CustomizationStudio. Data relationships: tag, template, notification template, web tab.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Automation

### SCR-087 Report Automation

Route: `/settings/automation/reportautomation`. State: Table. Build priority: P2. Evidence: OBS-096, OBS-109.

No editable field controls were captured in this state.

Table columns: Type of expenses in automated reports, Description, More Action Menu.

Visible action controls: Configure Now.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-088 Workflow Rules

Route: `/settings/booksapp/automation/workflows`. State: Table. Build priority: P2. Evidence: OBS-097, OBS-106.

No editable field controls were captured in this state.

Table columns: Name, Module, Description, Status, More Actions.

Visible action controls: View Logs, New Workflow Rule, Configure Usage Limit Notification, All, Change Execution Order.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-089 Email Alerts

Route: `/settings/booksapp/automation/actions/alerts`. State: Table. Build priority: P2. Evidence: OBS-098, OBS-254, OBS-257, OBS-264.

No editable field controls were captured in this state.

Table columns: Name, Module, Email Template, Related rules, Actions.

Visible action controls: Configure Failure Preferences, New Email Alert, All, Name.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-090 In-app Notifications

Route: `/settings/booksapp/automation/actions/pushnotifications`. State: Table. Build priority: P2. Evidence: OBS-099, OBS-258.

No editable field controls were captured in this state.

Table columns: Name, Module, Related rules, Actions.

Visible action controls: New In-app Notification, All, Name.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-091 Field Updates

Route: `/settings/booksapp/automation/actions/fieldupdates`. State: Table. Build priority: P2. Evidence: OBS-100, OBS-260.

No editable field controls were captured in this state.

Table columns: Name, Module, Field To Update, New Value, Related rules, Actions.

Visible action controls: New Field Update, All, Name.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-092 Webhooks

Route: `/settings/booksapp/automation/actions/webhooks`. State: Table. Build priority: P2. Evidence: OBS-101, OBS-262.

No editable field controls were captured in this state.

Table columns: Name, Module, URL to notify, Related rules, Actions.

Visible action controls: Configure Failure Preferences, New Webhook, All, Name.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-093 Functions

Route: `/settings/booksapp/automation/actions/customfunctions`. State: Table. Build priority: P2. Evidence: OBS-102, OBS-265.

No editable field controls were captured in this state.

Table columns: Name, Module, Description, Related rules, Actions.

Visible action controls: Configure Failure Preferences, New Function, All.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-094 Workflow Logs

Route: `/settings/booksapp/automation/logs/alerts`. State: Table. Build priority: P2. Evidence: OBS-103, OBS-267.

No editable field controls were captured in this state.

Table columns: Occurred at, Name, Log ID, Entity type, Status.

Visible action controls: Configure Failure Preferences, Show dropdown menu, Last Three Months, Apply Filter, Export.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-095 Schedules

Route: `/settings/booksapp/automation/customschedulers`. State: Table. Build priority: P2. Evidence: OBS-104.

No editable field controls were captured in this state.

Table columns: Name, Last Executed On, Next date, Frequency, Status, Actions.

Visible action controls: New Schedule.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-096 New Schedule

Route: `/settings/booksapp/automation/newcustomscheduler`. State: Form. Build priority: P2. Evidence: OBS-105.

Observed controls: Name* (textbox, required marker); Frequency* (combobox, required marker, value Daily); Exclude weekends (checkbox); Start Date & Time* (textbox, required marker); Start Time (combobox, value 10:30); Expires After* (combobox, required marker, value Never Expires); [unlabelled] for each element (textbox).

Visible action controls: Change, View Deluge Components Usage, Connections, organization, Save, Save and Execute, Cancel.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-097 New Workflow Rule

Route: `/settings/booksapp/automation/workflows`. State: Dialog. Build priority: P2. Evidence: OBS-107.

Observed controls: Workflow Rule Name* (textbox, required marker); Description (textbox); Module* (combobox, required marker).

Table columns: Name, Module, Description, Status, More Actions.

Visible action controls: View Logs, New Workflow Rule, Configure Usage Limit Notification, All, Change Execution Order, Close, Next, Cancel.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-098 New Workflow Rule

Route: `/settings/booksapp/automation/workflows`. State: Dialog. Build priority: P2. Evidence: OBS-108.

Observed controls: Workflow Rule Name* (textbox, required marker); Description (textbox); Module* (combobox, required marker); Search (textbox).

Table columns: Name, Module, Description, Status, More Actions.

Expanded options: Employee Advance Refund, Expense Report, Employee Advance, Trip.

Visible action controls: View Logs, New Workflow Rule, Configure Usage Limit Notification, All, Change Execution Order, Close, Next, Cancel.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-099 Report Automation - All Expenses

Route: `/settings/automation/reportautomation/new`. State: Form. Build priority: P2. Evidence: OBS-110.

Observed controls: [unlabelled] Report Generation Frequency (combobox, value Monthly); [unlabelled control] (combobox, value On a specific day); [unlabelled control] (combobox, value First); [unlabelled control] (combobox, value Monday); Include expenses that are dated Days before the scheduled day (textbox, value 4); [unlabelled control] (textbox, value ${EXPENSE_REPORT.USER} - ${EXPENSE_REPORT.REPORT_NUMBER} ${EXPENSE_REPORT.END_DATE}); Send reminders to users to create expenses (checkbox); Do you want the generated reports to be submitted automatically? (radiogroup); Yes, submit reports automatically (radio); No, users will submit their report manually (radio, checked); Send reminders to users to submit their report manually (checkbox); Generate a report even if the user has no expense within the report generation period (checkbox); Skip Report Automation for specific roles (checkbox); Select roles (combobox, disabled).

Visible action controls: Insert Placeholders, Save.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-221 New Email Alert

Route: `/settings/booksapp/automation/actions/alerts`. State: Dialog. Build priority: P2. Evidence: OBS-255, OBS-256.

Observed controls: Name* (textbox, required marker); Module* (combobox, required marker); From (combobox); Email Template* (combobox, required marker); Email Recipients* (combobox, required marker); Cc (combobox); Bcc (combobox).

Table columns: Name, Module, Email Template, Related rules, Actions.

Visible action controls: Configure Failure Preferences, New Email Alert, All, Name, Close, Save, Cancel.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-222 New In-app Notification

Route: `/settings/booksapp/automation/actions/pushnotifications`. State: Dialog. Build priority: P2. Evidence: OBS-259.

Observed controls: Name* (textbox, required marker); Module* (combobox, required marker); Recipients* (combobox, required marker); There are no In-app notifications - Name (textbox).

Table columns: Name, Module, Related rules, Actions.

Visible action controls: New In-app Notification, All, Name, Close, Insert Placeholders, Save, Cancel.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-223 New Field Update

Route: `/settings/booksapp/automation/actions/fieldupdates`. State: Dialog. Build priority: P2. Evidence: OBS-261.

Observed controls: Name* (textbox, required marker); Module* (combobox, required marker); Field Name (combobox).

Table columns: Name, Module, Field To Update, New Value, Related rules, Actions.

Visible action controls: New Field Update, All, Name, Close, Save, Cancel.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-224 New Webhook

Route: `/settings/booksapp/automation/actions/webhooks/new`. State: Form. Build priority: P2. Evidence: OBS-263.

Observed controls: Name* (textbox, required marker); Module* (combobox, required marker); Description (textbox); url & parameters* (combobox, required marker, value POST); Enter your URL (textbox); Headers Key (textbox); Value (textbox); I want to secure this webhook. (checkbox); Authorization Type (radiogroup); Self Authorization (radio, checked); Connections (radio); Body (radiogroup); Default Payload (radio, checked); x-www-form-urlencoded (radio); Raw (radio).

Visible action controls: Insert Placeholder, Add Parameters, + Add New Header, Save, Save and Execute, Cancel.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-225 New Function

Route: `/settings/booksapp/automation/actions/newcustomfunction`. State: Form. Build priority: P2. Evidence: OBS-266.

Observed controls: Function Name* (textbox, required marker); Description (textbox); Module* (combobox, required marker, value Select the Module).

Visible action controls: Proceed, Cancel.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-226 Workflow Logs

Route: `/settings/booksapp/automation/logs/webhooks`. State: Table. Build priority: P2. Evidence: OBS-268.

No editable field controls were captured in this state.

Table columns: Select, Occurred at, Name, Log ID, Entity type, Status.

Visible action controls: Configure Failure Preferences, Show dropdown menu, Last Three Months, Apply Filter, Export.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-227 Workflow Logs

Route: `/settings/booksapp/automation/logs/customfunctions`. State: Table. Build priority: P2. Evidence: OBS-269.

Observed controls: Select this row (checkbox, disabled).

Table columns: Select, Occurred at, Name, Log ID, Entity type, Status.

Visible action controls: Configure Failure Preferences, Show dropdown menu, Last Three Months, Apply Filter, Export.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-228 Workflow Logs

Route: `/settings/booksapp/automation/logs/customschedulers`. State: Table. Build priority: P2. Evidence: OBS-270.

No editable field controls were captured in this state.

Table columns: Occurred at, Schedule Name, Log ID, Status.

Visible action controls: Show dropdown menu, Last Three Months, Apply Filter, Export.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-229 Workflow Logs

Route: `/settings/booksapp/automation/logs/custombuttons`. State: Table. Build priority: P2. Evidence: OBS-271.

No editable field controls were captured in this state.

Table columns: Occurred at, Button Name, Log ID, Entity type, Location, Status.

Visible action controls: Show dropdown menu, Last Three Months, Apply Filter, Export.

Reconstruction: Separate rule definitions, actions, schedulers and execution logs. Persist jobs and idempotency before adding external notifications or code execution.

Component: AutomationStudio. Data relationships: automation rule, action, schedule, execution log.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Trip configuration

### SCR-110 Trips

Route: `/settings/preferences/trip`. State: Form. Build priority: P0. Evidence: OBS-125.

Observed controls: Prefix * (textbox, required marker, value TRIP-); Start With * (textbox, required marker, value 00001); Associate expenses incurred only within the trip’s duration. (checkbox); Create an advance for the trip's budget amount and associate it with the trip when it is approved. (checkbox); Restrict report creation for trips (checkbox); [unlabelled control] (combobox, disabled, value Cancelled); Mandate travel profile for users to create trips (checkbox); Auto create Trip allowance for (combobox, value None); Allow other travelers to create and associate their expense reports and advances with the trip (checkbox); Name (textbox); Consider as (combobox, value Approved); Attach trip as a PDF file to the notification email (checkbox); Receive a copy of the trip. (checkbox); Display Terms & Conditions (checkbox); Allow approvers to approve their own trips (checkbox, checked); Receive a copy of the trip upon its approval (checkbox); Trips are approved (checkbox, checked); Trips are submitted (checkbox, checked); Trips are canceled (checkbox, checked); Enable Chatlets (checkbox, checked); Chatlet Creation Permissions (radiogroup); Allow only admins and approvers to create chatlets (radio, checked); Allow all users to create chatlets (radio).

Table columns: Name, Consider as, Delete.

Visible action controls: Disable Trips, Add custom status, Save.

Reconstruction: Implement preference/field/approval/layout/action tabs. Respect global field enablement and mandatory settings when resolving layouts for travel type and policy.

Component: ModuleSettings. Data relationships: field definition, layout, approval flow, module preference.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-111 trip field configuration

Route: `/settings/preferences/trip/fields`. State: Table. Build priority: P0. Evidence: OBS-126.

Observed controls: Business Purpose - Enable (checkbox, checked); Business Purpose - Mandatory (checkbox); Business Purpose - Show in PDF (checkbox, checked); Billable - Enable (checkbox); Billable - Mandatory (checkbox, disabled); Billable - Show in PDF (checkbox, disabled); Customer - Enable (checkbox); Customer - Mandatory (checkbox, disabled); Customer - Show in PDF (checkbox, disabled); Project - Enable (checkbox); Project - Mandatory (checkbox, disabled); Project - Show in PDF (checkbox, disabled); Meal Preference - Enable (checkbox, checked); Meal Preference - Mandatory (checkbox); Meal Preference - Show in PDF (checkbox, checked); Seat Preference - Enable (checkbox, checked); Seat Preference - Mandatory (checkbox); Seat Preference - Show in PDF (checkbox, checked); Budget amount - Enable (checkbox); Budget amount - Mandatory (checkbox, disabled); Budget amount - Show in PDF (checkbox, disabled); Other Travelers - Enable (checkbox); Other Travelers - Mandatory (checkbox, disabled); Other Travelers - Show in PDF (checkbox, disabled); Personal - Enable (checkbox); Personal - Mandatory (checkbox, disabled); Personal - Show in PDF (checkbox, disabled); Is visa required? - Enable (checkbox, checked); Is visa required? - Mandatory (checkbox); Is visa required? - Show in PDF (checkbox, checked); Is International ( Default Value ) - Enable (checkbox, checked); Is International ( Default Value ) - Mandatory (checkbox); Is International ( Default Value ) - Show in PDF (checkbox, checked); Flight Reservations - Enable (checkbox, checked); Flight Reservations - Mandatory (checkbox, disabled); Flight Reservations - Show in PDF (checkbox, checked, disabled); Hotel Reservations - Enable (checkbox, checked); Hotel Reservations - Mandatory (checkbox, disabled); Hotel Reservations - Show in PDF (checkbox, checked, disabled); Car Rentals - Enable (checkbox, checked); Car Rentals - Mandatory (checkbox, disabled); Car Rentals - Show in PDF (checkbox, checked, disabled); Bus - Enable (checkbox, checked); Bus - Mandatory (checkbox, disabled); Bus - Show in PDF (checkbox, checked, disabled); Train - Enable (checkbox, checked); Train - Mandatory (checkbox, disabled); Train - Show in PDF (checkbox, checked, disabled); Ferry - Enable (checkbox); Ferry - Mandatory (checkbox, disabled); Ferry - Show in PDF (checkbox, disabled).

Table columns: Enable, Field, Mandatory, Show in PDF, More Action Menu.

Visible action controls: Save.

Reconstruction: Implement preference/field/approval/layout/action tabs. Respect global field enablement and mandatory settings when resolving layouts for travel type and policy.

Component: ModuleSettings. Data relationships: field definition, layout, approval flow, module preference.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-112 Trips

Route: `/settings/preferences/trip/approvals`. State: Page. Build priority: P0. Evidence: OBS-127.

Observed controls: [unlabelled] Approval Types (radiogroup); Hierarchical Approval (radio, checked); Custom Approval (radio).

Visible action controls: Save.

Reconstruction: Implement preference/field/approval/layout/action tabs. Respect global field enablement and mandatory settings when resolving layouts for travel type and policy.

Component: ModuleSettings. Data relationships: field definition, layout, approval flow, module preference.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-113 trip page layout

Route: `/settings/preferences/trip/pagelayouts`. State: Page. Build priority: P0. Evidence: OBS-128.

No editable field controls were captured in this state.

Reconstruction: Implement preference/field/approval/layout/action tabs. Respect global field enablement and mandatory settings when resolving layouts for travel type and policy.

Component: ModuleSettings. Data relationships: field definition, layout, approval flow, module preference.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-114 Trips

Route: `/settings/preferences/trip/custombuttons`. State: Page. Build priority: P0. Evidence: OBS-129.

No editable field controls were captured in this state.

Reconstruction: Implement preference/field/approval/layout/action tabs. Respect global field enablement and mandatory settings when resolving layouts for travel type and policy.

Component: ModuleSettings. Data relationships: field definition, layout, approval flow, module preference.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-202 New trip page layout

Route: `/settings/preferences/trip/pagelayouts/new`. State: Form. Build priority: P0. Evidence: OBS-228.

Observed controls: Name * (textbox, required marker); Type * (combobox, required marker, value Domestic); Policies * (combobox, required marker, 250 characters); Description (textbox, 250 characters); Business Purpose - Enable (checkbox, checked); Business Purpose - Mandatory (checkbox); Business Purpose (textbox); Business Purpose - Help Text (textbox); Billable - Enable (checkbox, disabled); Billable - Mandatory (checkbox, disabled); Billable - Default Value (checkbox, disabled); Billable - Help Text (textbox, disabled); Customer - Enable (checkbox, disabled); Customer - Mandatory (checkbox, disabled); Customer - Default Value (combobox, disabled, value Select); Customer - Help Text (textbox, disabled); Project - Enable (checkbox, disabled); Project - Mandatory (checkbox, disabled); Project - Default Value (combobox, disabled, value Select); Project - Help Text (textbox, disabled); Meal Preference - Enable (checkbox, checked); Meal Preference - Mandatory (checkbox); Meal Preference - Default Value (combobox, value Select); Meal Preference - Help Text (textbox); Seat Preference - Enable (checkbox, checked); Seat Preference - Mandatory (checkbox); Seat Preference - Default Value (combobox, value Select); Seat Preference - Help Text (textbox); Budget amount - Enable (checkbox, disabled); Budget amount - Mandatory (checkbox, disabled); Budget amount (textbox, disabled); Budget amount - Help Text (textbox, disabled); Other Travelers - Enable (checkbox, disabled); Other Travelers - Mandatory (checkbox, disabled); Other Travelers - Default Value (combobox, disabled, value Select); Other Travelers - Help Text (textbox, disabled); Personal - Enable (checkbox, disabled); Personal - Mandatory (checkbox, disabled); Personal - Default Value (checkbox, disabled); Personal - Help Text (textbox, disabled); Is visa required? - Enable (checkbox, checked); Is visa required? - Mandatory (checkbox); Is visa required? - Default Value (checkbox, disabled); Is visa required? - Help Text (textbox); Flight Reservations - Enable (checkbox, checked); Flight Reservations - Mandatory (checkbox, disabled); Flight Reservations - Default Value (checkbox, disabled); Flight Reservations - Help Text (textbox); Hotel Reservations - Enable (checkbox, checked); Hotel Reservations - Mandatory (checkbox, disabled); Hotel Reservations - Default Value (checkbox, disabled); Hotel Reservations - Help Text (textbox); Car Rentals - Enable (checkbox, checked); Car Rentals - Mandatory (checkbox, disabled); Car Rentals - Default Value (checkbox, disabled); Car Rentals - Help Text (textbox); Bus - Enable (checkbox, checked); Bus - Mandatory (checkbox, disabled); Bus - Default Value (checkbox, disabled); Bus - Help Text (textbox); Train - Enable (checkbox, checked); Train - Mandatory (checkbox, disabled); Train - Default Value (checkbox, disabled); Train - Help Text (textbox); Ferry - Enable (checkbox, disabled); Ferry - Mandatory (checkbox, disabled); Ferry - Default Value (checkbox, disabled); Ferry - Help Text (textbox, disabled).

Table columns: Enable, Field, Mandatory, Default Value, Help Text.

Visible action controls: Close, Save, Cancel.

Reconstruction: Implement preference/field/approval/layout/action tabs. Respect global field enablement and mandatory settings when resolving layouts for travel type and policy.

Component: ModuleSettings. Data relationships: field definition, layout, approval flow, module preference.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-239 New custom button

Route: `/settings/preferences/trip/custombuttons/new`. State: Form. Build priority: P0. Evidence: OBS-286.

Observed controls: Name * (textbox, required marker); Location * (combobox, required marker, value Details Page Menu); [unlabelled] "1" (textbox, disabled, value When); [unlabelled] "1" (combobox, value Select); Select a comparator for criteria . (combobox, value Select); [unlabelled] Select (textbox, disabled); URL * (textbox, required marker); Share with * (radiogroup, required marker); Only me (radio, checked); Only selected users & roles (radio); Everyone (radio).

Visible action controls: Close, Add Criteria, More Filters, Save, Cancel.

Reconstruction: Implement preference/field/approval/layout/action tabs. Respect global field enablement and mandatory settings when resolving layouts for travel type and policy.

Component: ModuleSettings. Data relationships: field definition, layout, approval flow, module preference.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-240 New custom button

Route: `/settings/preferences/trip/custombuttons/new`. State: Form. Build priority: P0. Evidence: OBS-287.

Observed controls: Name * (textbox, required marker); Location * (combobox, required marker, value Details Page Menu); [unlabelled] "1" (textbox, disabled, value When); [unlabelled] "1" (combobox, value Select); Select a comparator for criteria . (combobox, value Select); [unlabelled] Select (textbox, disabled); [unlabelled] for each element (textbox); Share with * (radiogroup, required marker); Only me (radio, checked); Only selected users & roles (radio); Everyone (radio).

Visible action controls: Close, Add Criteria, Save, Save And Execute, Cancel.

Reconstruction: Implement preference/field/approval/layout/action tabs. Respect global field enablement and mandatory settings when resolving layouts for travel type and policy.

Component: ModuleSettings. Data relationships: field definition, layout, approval flow, module preference.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Expense configuration

### SCR-115 Expenses

Route: `/settings/preferences/expense`. State: Form. Build priority: P0. Evidence: OBS-130.

Observed controls: Enable automated currency conversion (checkbox, checked); Create reimbursable expenses by default (checkbox, checked); Set the expense expiry period to 0 Days (checkbox); [unlabelled] Create reimbursable expenses by default (textbox, disabled, value 0); Warn users when an expense created by them nears its expiry date (checkbox, disabled); Send reminders for unreported expenses (checkbox, checked); Send reminders for unreported expenses (combobox, value Weekly); Auto-match/create expenses for corporate card transactions . Learn More (checkbox, checked); Permit users to edit the amount in personal card expenses (checkbox); Allow corporate cards to be converted to user-paid corporate cards, enabling card owners to claim reimbursement for its expenses. (checkbox).

Visible action controls: Map fields, Save.

Reconstruction: Implement receipt scanning/mapping, conversion, reimbursement defaults, reminders, card auto-match and category-based layouts.

Component: ModuleSettings. Data relationships: expense preference, field definition, layout.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-116 expense field configuration

Route: `/settings/preferences/expense/fields`. State: Table. Build priority: P0. Evidence: OBS-131.

Observed controls: Tax - Enable (checkbox, checked); Tax - Mandatory (checkbox); Tax - Show in PDF (checkbox, checked); Reference# - Enable (checkbox, checked); Reference# - Mandatory (checkbox); Reference# - Show in PDF (checkbox, checked); Billable - Enable (checkbox); Billable - Mandatory (checkbox, disabled); Billable - Show in PDF (checkbox, disabled); Customer - Enable (checkbox); Customer - Mandatory (checkbox, disabled); Customer - Show in PDF (checkbox, disabled); Description - Enable (checkbox, checked); Description - Mandatory (checkbox); Description - Show in PDF (checkbox, checked); Project - Enable (checkbox); Project - Mandatory (checkbox, disabled); Project - Show in PDF (checkbox, disabled); Payment Mode - Enable (checkbox); Payment Mode - Mandatory (checkbox, disabled); Payment Mode - Show in PDF (checkbox, disabled); Expense Location - Enable (checkbox); Expense Location - Mandatory (checkbox, disabled); Expense Location - Show in PDF (checkbox, disabled); Paid Through - Enable (checkbox, checked); Paid Through - Mandatory (checkbox); Paid Through - Show in PDF (checkbox, checked); Attendees - Enable (checkbox); Attendees - Mandatory (checkbox, disabled); Attendees - Show in PDF (checkbox, disabled); Tax Inclusive ( Default Value ) - Enable (checkbox, checked); Tax Inclusive ( Default Value ) - Mandatory (checkbox); Tax Inclusive ( Default Value ) - Show in PDF (checkbox, checked); Personal - Enable (checkbox); Personal - Mandatory (checkbox, disabled); Personal - Show in PDF (checkbox, disabled).

Table columns: Enable, Field, Mandatory, Show in PDF, More Action Menu.

Visible action controls: Save.

Reconstruction: Implement receipt scanning/mapping, conversion, reimbursement defaults, reminders, card auto-match and category-based layouts.

Component: ModuleSettings. Data relationships: expense preference, field definition, layout.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-117 expense page layout

Route: `/settings/preferences/expense/pagelayouts`. State: Page. Build priority: P0. Evidence: OBS-132.

No editable field controls were captured in this state.

Reconstruction: Implement receipt scanning/mapping, conversion, reimbursement defaults, reminders, card auto-match and category-based layouts.

Component: ModuleSettings. Data relationships: expense preference, field definition, layout.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-200 expense custom field editor

Route: `/settings/preferences/expense/fields/new`. State: Form. Build priority: P0. Evidence: OBS-226.

Observed controls: Label Name * (textbox, required marker); Data Type * (combobox, required marker, value Select); Is Mandatory (radiogroup); Yes (radio); No (radio, checked); Show in all PDF (radiogroup); Yes (radio, checked); No (radio).

Visible action controls: Close, Save, Cancel.

Reconstruction: Implement receipt scanning/mapping, conversion, reimbursement defaults, reminders, card auto-match and category-based layouts.

Component: ModuleSettings. Data relationships: expense preference, field definition, layout.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-201 expense custom field editor

Route: `/settings/preferences/expense/fields/new`. State: Form. Build priority: P0. Evidence: OBS-227.

Observed controls: Label Name * (textbox, required marker); Data Type * (combobox, required marker, value Select); Search (textbox); Is Mandatory (radiogroup); Yes (radio); No (radio, checked); Show in all PDF (radiogroup); Yes (radio, checked); No (radio).

Expanded options: Text Box (Single Line), Email, URL, Phone, Number, Decimal, Amount, Percent, Date, Date and Time, Check Box, Auto-Generate Number, Dropdown, Multi-select, Lookup, Text Box (Multi-line), External Lookup.

Visible action controls: Close, Save, Cancel.

Reconstruction: Implement receipt scanning/mapping, conversion, reimbursement defaults, reminders, card auto-match and category-based layouts.

Component: ModuleSettings. Data relationships: expense preference, field definition, layout.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-235 New expense page layout

Route: `/settings/preferences/expense/pagelayouts/new`. State: Form. Build priority: P0. Evidence: OBS-282.

Observed controls: Name * (textbox, required marker); Categories * (combobox, required marker, 250 characters); Description (textbox, 250 characters); Tax - Enable (checkbox, checked); Tax - Mandatory (checkbox); Tax - Default Value (combobox, value Select); Tax - Help Text (textbox); Reference# - Enable (checkbox, checked); Reference# - Mandatory (checkbox); Reference# (textbox); Reference# - Help Text (textbox); Billable - Enable (checkbox, disabled); Billable - Mandatory (checkbox, disabled); Billable - Default Value (checkbox, disabled); Billable - Help Text (textbox, disabled); Customer - Enable (checkbox, disabled); Customer - Mandatory (checkbox, disabled); Customer - Default Value (combobox, disabled, value Select); Customer - Help Text (textbox, disabled); Claim Reimbursement - Enable (checkbox, checked, disabled); Claim Reimbursement - Mandatory (checkbox, checked, disabled); Claim Reimbursement - Default Value (checkbox); Claim Reimbursement - Help Text (textbox); Description - Enable (checkbox, checked); Description - Mandatory (checkbox); Description (textbox); Description - Help Text (textbox); Project - Enable (checkbox, disabled); Project - Mandatory (checkbox, disabled); Project - Default Value (combobox, disabled, value Select); Project - Help Text (textbox, disabled); Payment Mode - Enable (checkbox, disabled); Payment Mode - Mandatory (checkbox, disabled); Payment Mode - Default Value (combobox, disabled, value Select); Payment Mode - Help Text (textbox, disabled); Expense Location - Enable (checkbox, disabled); Expense Location - Mandatory (checkbox, disabled); Expense Location - Default Value (combobox, disabled, value Select); Expense Location - Help Text (textbox, disabled); Paid Through - Enable (checkbox, checked); Paid Through - Mandatory (checkbox); Paid Through - Default Value (combobox, value Select); Paid Through - Help Text (textbox); Attendees - Enable (checkbox, disabled); Attendees - Mandatory (checkbox, disabled); Attendees - Default Value (combobox, disabled, value Select); Attendees - Help Text (textbox, disabled); Tax Inclusive - Enable (checkbox, checked); Tax Inclusive - Mandatory (checkbox, disabled); Tax Inclusive - Default Value (checkbox); Tax Inclusive - Help Text (textbox); Personal - Enable (checkbox, disabled); Personal - Mandatory (checkbox, disabled); Personal - Default Value (checkbox, disabled); Personal - Help Text (textbox, disabled).

Table columns: Enable, Field, Mandatory, Default Value, Help Text.

Visible action controls: Close, Save, Cancel.

Reconstruction: Implement receipt scanning/mapping, conversion, reimbursement defaults, reminders, card auto-match and category-based layouts.

Component: ModuleSettings. Data relationships: expense preference, field definition, layout.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Report configuration

### SCR-118 Reports

Route: `/settings/preferences/expensereport`. State: Form. Build priority: P0. Evidence: OBS-133.

Observed controls: Prefix * (textbox, required marker, value ER-); Start With * (textbox, required marker, value 00001); Generate report name automatically. Learn More (checkbox); Name (textbox); Consider as (combobox, value Approved); Configure the last day for report submission (checkbox); Allow submitters to attach documents to a report after submission (checkbox); Notify approver via email when reports are submitted (checkbox, checked); Attach report as a PDF file to the notification email (checkbox, checked); Copy the submitter in the email (checkbox, checked); Receive a copy of the report (checkbox); Display Terms & Conditions (checkbox); Mandate reason for editing expenses (checkbox); Allow approvers to reject the expenses in reports (checkbox, checked); Allow approvers to approve their own reports (checkbox, checked); Make reports due for approval within 15 days of submission (checkbox, checked); Approved - Delete (textbox, value 15); Notify approver when submitted reports are nearing their due dates (checkbox, checked); Restrict users from recalling a report if one of the approvers in the approval flow approves the report (checkbox); Receive a copy of the report upon its approval (checkbox); Expense reports are approved or rejected (checkbox, checked); Expense reports are marked as reimbursed (checkbox, checked); Comments are added to expense reports (checkbox, checked); Enable Chatlets (checkbox, checked); Chatlet Creation Permissions (radiogroup); Allow only admins and approvers to create chatlets (radio, checked); Allow all users to create chatlets (radio).

Table columns: Name, Consider as, Delete.

Visible action controls: Go to PDF Templates, Add custom status, Save.

Reconstruction: Implement numbering, submission/approval notifications, custom statuses, validation rules and report-type associations. Preserve the stated automated-report validation exception.

Component: ModuleSettings. Data relationships: report preference, report type, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-119 expensereport field configuration

Route: `/settings/preferences/expensereport/fields`. State: Table. Build priority: P0. Evidence: OBS-134.

Observed controls: Customer - Enable (checkbox); Customer - Mandatory (checkbox, disabled); Customer - Show in PDF (checkbox, disabled); Business Purpose - Enable (checkbox, checked); Business Purpose - Mandatory (checkbox); Business Purpose - Show in PDF (checkbox, checked); Project - Enable (checkbox); Project - Mandatory (checkbox, disabled); Project - Show in PDF (checkbox, disabled); Duration - Enable (checkbox, checked); Duration - Mandatory (checkbox); Duration - Show in PDF (checkbox, checked); Trip - Enable (checkbox, checked); Trip - Mandatory (checkbox); Trip - Show in PDF (checkbox, checked).

Table columns: Enable, Field, Mandatory, Show in PDF, More Action Menu.

Visible action controls: Save.

Reconstruction: Implement numbering, submission/approval notifications, custom statuses, validation rules and report-type associations. Preserve the stated automated-report validation exception.

Component: ModuleSettings. Data relationships: report preference, report type, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-120 Reports

Route: `/settings/preferences/expensereport/approvals`. State: Page. Build priority: P0. Evidence: OBS-135.

Observed controls: [unlabelled] Approval Types (radiogroup); Hierarchical Approval (radio, checked); Custom Approval (radio).

Visible action controls: Save.

Reconstruction: Implement numbering, submission/approval notifications, custom statuses, validation rules and report-type associations. Preserve the stated automated-report validation exception.

Component: ModuleSettings. Data relationships: report preference, report type, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-121 Reports

Route: `/settings/preferences/expensereport/custombuttons`. State: Page. Build priority: P0. Evidence: OBS-136.

No editable field controls were captured in this state.

Reconstruction: Implement numbering, submission/approval notifications, custom statuses, validation rules and report-type associations. Preserve the stated automated-report validation exception.

Component: ModuleSettings. Data relationships: report preference, report type, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-122 Reports

Route: `/settings/reporttypes`. State: Page. Build priority: P0. Evidence: OBS-137.

No editable field controls were captured in this state.

Visible action controls: All.

Reconstruction: Implement numbering, submission/approval notifications, custom statuses, validation rules and report-type associations. Preserve the stated automated-report validation exception.

Component: ModuleSettings. Data relationships: report preference, report type, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-123 report validation rules

Route: `/settings/preferences/expensereport/validationrules`. State: Page. Build priority: P0. Evidence: OBS-138, OBS-146.

No editable field controls were captured in this state.

Reconstruction: Implement numbering, submission/approval notifications, custom statuses, validation rules and report-type associations. Preserve the stated automated-report validation exception.

Component: ModuleSettings. Data relationships: report preference, report type, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-124 New report validation rule

Route: `/settings/preferences/expensereport/validationrules/new`. State: Form. Build priority: P0. Evidence: OBS-139.

Observed controls: Validation Rule Name * (textbox, required marker).

Visible action controls: Add Validation, Save.

Reconstruction: Implement numbering, submission/approval notifications, custom statuses, validation rules and report-type associations. Preserve the stated automated-report validation exception.

Component: ModuleSettings. Data relationships: report preference, report type, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-204 New Report Type

Route: `/settings/reporttypes/new`. State: Form. Build priority: P0. Evidence: OBS-230.

Observed controls: Name * (textbox, required marker, 100 characters); Description (textbox, 100 characters); Expense Types * (combobox, required marker); Policies * (combobox, required marker).

Visible action controls: Save.

Reconstruction: Implement numbering, submission/approval notifications, custom statuses, validation rules and report-type associations. Preserve the stated automated-report validation exception.

Component: ModuleSettings. Data relationships: report preference, report type, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Advance configuration

### SCR-125 Advances

Route: `/settings/preferences/advancepayment`. State: Form. Build priority: P1. Evidence: OBS-147.

Observed controls: Name (textbox); Consider as (combobox, value Approved); Notify approver via email (Applicable only if custom approval is enabled) (checkbox, disabled); Display Terms & Conditions (checkbox); Enable Chatlets (checkbox, checked); Chatlet Creation Permissions (radiogroup); Allow only admins and approvers to create chatlets (radio, checked); Allow all users to create chatlets (radio).

Table columns: Name, Consider as, Delete.

Visible action controls: Disable Advance, Add custom status, Save.

Reconstruction: Implement no/simple/custom approval choices plus terms, chatlets, fields, validation and custom actions. Do not assume report approval settings apply to advances.

Component: ModuleSettings. Data relationships: advance preference, field definition, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-126 advancepayment field configuration

Route: `/settings/preferences/advancepayment/fields`. State: Table. Build priority: P1. Evidence: OBS-148.

Observed controls: Reference# - Enable (checkbox, checked); Reference# - Mandatory (checkbox); Reference# - Show in PDF (checkbox, checked); Notes - Enable (checkbox, checked); Notes - Mandatory (checkbox); Notes - Show in PDF (checkbox, checked); Paid Through - Enable (checkbox, checked); Paid Through - Mandatory (checkbox); Paid Through - Show in PDF (checkbox, checked); Customer - Enable (checkbox); Customer - Mandatory (checkbox, disabled); Customer - Show in PDF (checkbox, disabled); Project - Enable (checkbox); Project - Mandatory (checkbox, disabled); Project - Show in PDF (checkbox, disabled); Apply to Trip - Enable (checkbox, checked, disabled); Apply to Trip - Mandatory (checkbox); Apply to Trip - Show in PDF (checkbox, checked).

Table columns: Enable, Field, Mandatory, Show in PDF, More Action Menu.

Visible action controls: Save.

Reconstruction: Implement no/simple/custom approval choices plus terms, chatlets, fields, validation and custom actions. Do not assume report approval settings apply to advances.

Component: ModuleSettings. Data relationships: advance preference, field definition, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-127 Advances

Route: `/settings/preferences/advancepayment/approvals`. State: Page. Build priority: P1. Evidence: OBS-149.

Observed controls: [unlabelled] Approval Types (radiogroup); No Approval (radio, checked); Simple Approval (radio); Custom Approval (radio).

Visible action controls: Save.

Reconstruction: Implement no/simple/custom approval choices plus terms, chatlets, fields, validation and custom actions. Do not assume report approval settings apply to advances.

Component: ModuleSettings. Data relationships: advance preference, field definition, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-128 Advances

Route: `/settings/preferences/advancepayment/custombuttons`. State: Page. Build priority: P1. Evidence: OBS-150.

No editable field controls were captured in this state.

Reconstruction: Implement no/simple/custom approval choices plus terms, chatlets, fields, validation and custom actions. Do not assume report approval settings apply to advances.

Component: ModuleSettings. Data relationships: advance preference, field definition, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-258 advance validation rules

Route: `/settings/preferences/advancepayment/validationrules`. State: Page. Build priority: P1. Evidence: OBS-313.

No editable field controls were captured in this state.

Reconstruction: Implement no/simple/custom approval choices plus terms, chatlets, fields, validation and custom actions. Do not assume report approval settings apply to advances.

Component: ModuleSettings. Data relationships: advance preference, field definition, validation, approval flow.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Petty cash

### SCR-129 Petty Cash Accounts

Route: `/settings/preferences/imprests`. State: Page. Build priority: P3. Evidence: OBS-151.

No editable field controls were captured in this state.

Visible action controls: Enable.

Reconstruction: Reproduce the disabled landing state. Ledger/top-up/withdrawal screens need an enabled sandbox tenant before exact reconstruction.

Component: FeatureGate. Data relationships: feature flag, petty cash account.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Custom modules

### SCR-130 Introducing Custom Modules

Route: `/settings/preferences/booksapp/custommodule-getstarted`. State: Page. Build priority: P3. Evidence: OBS-152, OBS-280.

No editable field controls were captured in this state.

Visible action controls: Create Module.

Reconstruction: Build module naming, sharing and primary-field settings. Use typed extension metadata with quotas rather than unvalidated table generation.

Component: ModuleBuilder. Data relationships: custom module, field definition, custom record.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-234 Create Module

Route: `/settings/preferences/booksapp/custommodule/new`. State: Form. Build priority: P3. Evidence: OBS-281.

Observed controls: Module Name* (textbox, required marker); Plural Name* (textbox, required marker); Description* (textbox, required marker); Record Level Sharing* (combobox, required marker, value Read and Write); Label Name* (textbox, required marker); Data Type* (combobox, required marker, value Text Box (Single Line)); Prevent Duplicate Values (radiogroup); Yes (radio); No (radio, checked).

Visible action controls: Save, Cancel.

Reconstruction: Build module naming, sharing and primary-field settings. Use typed extension metadata with quotas rather than unvalidated table generation.

Component: ModuleBuilder. Data relationships: custom module, field definition, custom record.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Integrations

### SCR-131 Integration catalogue

Route: `/integrations`. State: Page. Build priority: P2. Evidence: OBS-153.

Observed controls: Search Integrations (textbox).

Visible action controls: Request Integration.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-139 Zoho Books

Route: `/integrations/zapps/books`. State: Page. Build priority: P2. Evidence: OBS-161.

No editable field controls were captured in this state.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-140 QuickBooks Online

Route: `/integrations/accounting/quickbooksonline`. State: Page. Build priority: P2. Evidence: OBS-162.

No editable field controls were captured in this state.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-141 QuickBooks Desktop

Route: `/integrations/accounting/quickbooksdesktop`. State: Page. Build priority: P2. Evidence: OBS-163.

No editable field controls were captured in this state.

Visible action controls: Request Access.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-142 Xero

Route: `/integrations/accounting/xero`. State: Page. Build priority: P2. Evidence: OBS-164.

No editable field controls were captured in this state.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-143 Sage Accounting

Route: `/integrations/accounting/sageaccounting`. State: Page. Build priority: P2. Evidence: OBS-165.

No editable field controls were captured in this state.

Visible action controls: Request Access.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-144 Microsoft Dynamics integration

Route: `/integrations/accounting/microsoftdynamics`. State: Page. Build priority: P2. Evidence: OBS-166.

No editable field controls were captured in this state.

Visible action controls: Contact Us.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-145 Oracle integration

Route: `/integrations/accounting/oracle`. State: Page. Build priority: P2. Evidence: OBS-167.

No editable field controls were captured in this state.

Visible action controls: Contact Us.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-146 SAP integration

Route: `/integrations/accounting/sap`. State: Page. Build priority: P2. Evidence: OBS-168.

No editable field controls were captured in this state.

Visible action controls: Contact Us.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-147 Zoho People

Route: `/integrations/zapps/people`. State: Page. Build priority: P2. Evidence: OBS-169.

No editable field controls were captured in this state.

Visible action controls: Try Now.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-148 Zoho Payroll

Route: `/integrations/zapps/payroll`. State: Page. Build priority: P2. Evidence: OBS-170.

No editable field controls were captured in this state.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-149 Zoho Projects Integration

Route: `/settings/booksapp/integration/projects/connect`. State: Page. Build priority: P2. Evidence: OBS-171.

No editable field controls were captured in this state.

Visible action controls: Go back to Settings, Connect Now.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-150 Uber for Business

Route: `/integrations/otherapps/uber`. State: Page. Build priority: P2. Evidence: OBS-172.

Observed controls: I agree that I'm responsible for the data fetched from Uber into Zoho Expense. (checkbox).

Visible action controls: Enable.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-151 Bolt Business

Route: `/integrations/otherapps/bolt`. State: Page. Build priority: P2. Evidence: OBS-173.

No editable field controls were captured in this state.

Visible action controls: Play.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-152 Zoho Cliq

Route: `/integrations/otherapps/zchat`. State: Page. Build priority: P2. Evidence: OBS-174.

No editable field controls were captured in this state.

Visible action controls: Connect Now.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-153 Slack

Route: `/integrations/otherapps/slack`. State: Page. Build priority: P2. Evidence: OBS-175.

No editable field controls were captured in this state.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-154 Fintua Recover

Route: `/integrations/vatreclaim/fintuarecover`. State: Page. Build priority: P2. Evidence: OBS-176.

No editable field controls were captured in this state.

Visible action controls: Enable Integration.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-155 WAY2VAT

Route: `/integrations/vatreclaim/way2vat`. State: Page. Build priority: P2. Evidence: OBS-177.

No editable field controls were captured in this state.

Visible action controls: How It Works.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-156 Zoho Analytics Integration

Route: `/settings/booksapp/integrations/zohoreports`. State: Page. Build priority: P2. Evidence: OBS-178.

No editable field controls were captured in this state.

Visible action controls: Configure.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-157 Connect Zoho CRM

Route: `/settings/booksapp/crmintegration`. State: Page. Build priority: P2. Evidence: OBS-179.

No editable field controls were captured in this state.

Visible action controls: Select Organization, Configure Now, Sync CRM Users.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-158 Microsoft 365

Route: `/integrations/otherapps/office365`. State: Page. Build priority: P2. Evidence: OBS-180.

No editable field controls were captured in this state.

Visible action controls: Enable Integration.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-159 Google Workspace

Route: `/integrations/otherapps/gsuite`. State: Page. Build priority: P2. Evidence: OBS-181.

No editable field controls were captured in this state.

Visible action controls: Enable Integration.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-160 ScanSnap

Route: `/integrations/otherapps/scansnap`. State: Page. Build priority: P2. Evidence: OBS-182.

No editable field controls were captured in this state.

Visible action controls: ze.common.play.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-161 Lune: CO2 Calculator

Route: `/integrations/otherapps/lune`. State: Page. Build priority: P2. Evidence: OBS-183.

No editable field controls were captured in this state.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-162 Integration catalogue

Route: `/integrations`. State: Page. Build priority: P2. Evidence: OBS-184.

No editable field controls were captured in this state.

Visible action controls: Request Integration.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-163 HSBC

Route: `/integrations/onlinereimbursements/hsbc`. State: Page. Build priority: P2. Evidence: OBS-185.

No editable field controls were captured in this state.

Visible action controls: Enable Integration, How It Works.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-164 SBI

Route: `/integrations/onlinereimbursements/sbi`. State: Page. Build priority: P2. Evidence: OBS-186.

No editable field controls were captured in this state.

Visible action controls: Enable Integration, How It Works.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-165 AXIS BANK

Route: `/integrations/onlinereimbursements/axisbank`. State: Page. Build priority: P2. Evidence: OBS-187.

No editable field controls were captured in this state.

Visible action controls: Enable Integration, How It Works.

Reconstruction: Build provider-specific introduction/setup states and data-mapping contracts. Use explicit consent and credential vault references; never equate a catalogue entry with a connected integration.

Component: IntegrationCatalogue. Data relationships: integration provider, connection, mapping, sync run.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Developer tools

### SCR-132 Signals

Route: `/settings/booksapp/developerspace/signals`. State: Page. Build priority: P3. Evidence: OBS-154, OBS-272.

No editable field controls were captured in this state.

Visible action controls: New Signal.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-133 Widgets

Route: `/settings/booksapp/developerspace/zb-widgets`. State: Page. Build priority: P3. Evidence: OBS-155, OBS-274.

Observed controls: Development Mode (switch).

Visible action controls: New Widget.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-134 Incoming Webhooks

Route: `/settings/booksapp/developerspace/incomingwebhooks`. State: Page. Build priority: P3. Evidence: OBS-156, OBS-276.

No editable field controls were captured in this state.

Visible action controls: New Incoming Webhook, Create Incoming Webhook.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-135 Connections

Route: `/settings/booksapp/developerspace/connections`. State: Page. Build priority: P3. Evidence: OBS-157, OBS-278.

No editable field controls were captured in this state.

Visible action controls: New Connection, View My Connections, View All.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-136 API usage

Route: `/settings/booksapp/developerspace/apidashboard`. State: Table. Build priority: P3. Evidence: OBS-158.

Observed controls: Domain Type : (combobox, value All Domains).

Table columns: User, IP Address, Module, Application, Request Method, API Count, Occurence Timeframe.

Visible action controls: Increase API Limit Temporarily, Configure Usage Limit Notification, Today.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-230 New Signal

Route: `/settings/booksapp/developerspace/signals/new`. State: Form. Build priority: P3. Evidence: OBS-273.

Observed controls: Signal Name* (textbox, required marker); Service * (combobox, required marker); Trigger Type (combobox, value Function); Recipients (radiogroup); All Users (radio, checked); Disabled by Default (radio); Enabled by Default (radio); [unlabelled] for each element (textbox).

Visible action controls: Attach From Desktop, View Deluge Components Usage, Connections, signal_detail, organization, headers, params, body, Save, Save and Execute, Cancel.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-231 New Widget

Route: `/settings/booksapp/developerspace/zb-widgets`. State: Dialog. Build priority: P3. Evidence: OBS-275.

Observed controls: Development Mode (switch); [unlabelled] Name* (textbox, required marker); [unlabelled] Visibility (radiogroup); Only Me (radio, checked); Only Selected Users & Roles (radio); Everyone (radio); Description* (textbox, required marker).

Visible action controls: New Widget, Close, Attach From Desktop, Save, Cancel.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-232 New Incoming Webhook

Route: `/settings/booksapp/developerspace/incomingwebhooks/new`. State: Form. Build priority: P3. Evidence: OBS-277.

Observed controls: Name* (textbox, required marker); Description (textbox); [unlabelled] for each element (textbox).

Visible action controls: View Deluge Components Usage, Connections, organization, headers, params, body, Save, Save and Execute, Cancel.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-233 Connections

Route: `/settings/booksapp/developerspace/connections`. State: Page. Build priority: P3. Evidence: OBS-279.

Observed controls: Search here... (textbox).

Visible action controls: Close this page, New Connection, View My Connections, View All.

Reconstruction: Reconstruct configuration forms without embedding credentials in the UI. Isolate script execution and apply strict outbound destinations, quotas, secret references and audit events.

Component: DeveloperConsole. Data relationships: signal, widget, connection, incoming endpoint, API usage.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Data administration

### SCR-137 Backup Organization Data

Route: `/settings/backup/data`. State: Page. Build priority: P2. Evidence: OBS-159, OBS-288.

No editable field controls were captured in this state.

Visible action controls: Data Backup, Document Backup, Backup Organization Data.

Reconstruction: Reconstruct data/document/audit backup entry points and export-column mapping. Run exports as scoped jobs with expiry and audit, not as synchronous browser operations.

Component: DataAdministration. Data relationships: backup job, export template, export column.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-138 Export Templates for Reports

Route: `/settings/exports`. State: Table. Build priority: P2. Evidence: OBS-160, OBS-237.

No editable field controls were captured in this state.

Table columns: Template Name, Created Time, More Action Menu.

Reconstruction: Reconstruct data/document/audit backup entry points and export-column mapping. Run exports as scoped jobs with expiry and audit, not as synchronous browser operations.

Component: DataAdministration. Data relationships: backup job, export template, export column.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-209 Customize Export Template

Route: `/settings/exports/new`. State: Form. Build priority: P2. Evidence: OBS-238.

Observed controls: Export template name (textbox); Exclude the details of expenses during export (checkbox); Report Name Remove - Field Name (combobox, value Report Name); Display name for Report Name (textbox, value Report Name); Expense Date Remove - Field Name (combobox, value Expense Date); Display name for Expense Date (textbox, value Expense Date); Is Reimbursable Remove - Field Name (combobox, value Is Reimbursable); Display name for Is Reimbursable (textbox, value Is Reimbursable); Expense Amount Remove - Field Name (combobox, value Expense Amount); Display name for Expense Amount (textbox, value Expense Amount); Expense Category Remove - Field Name (combobox, value Expense Category); Display name for Expense Category (textbox, value Expense Category); Owner's Email Remove - Field Name (combobox, value Owner's Email); Display name for Owner's Email (textbox, value <redacted>).

Table columns: Field Name, Display Name.

Visible action controls: Choose columns, Remove, Add More, Save, Cancel.

Reconstruction: Reconstruct data/document/audit backup entry points and export-column mapping. Run exports as scoped jobs with expiry and audit, not as synchronous browser operations.

Component: DataAdministration. Data relationships: backup job, export template, export column.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-241 Backup Organization Documents

Route: `/settings/backup/receipts`. State: Page. Build priority: P2. Evidence: OBS-289.

No editable field controls were captured in this state.

Visible action controls: Data Backup, Document Backup, Backup Organization Documents.

Reconstruction: Reconstruct data/document/audit backup entry points and export-column mapping. Run exports as scoped jobs with expiry and audit, not as synchronous browser operations.

Component: DataAdministration. Data relationships: backup job, export template, export column.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-242 Backup Your Audit Trail

Route: `/settings/backup/audittrail`. State: Page. Build priority: P2. Evidence: OBS-290.

No editable field controls were captured in this state.

Visible action controls: Data Backup, Document Backup, Backup Your Audit Trail.

Reconstruction: Reconstruct data/document/audit backup entry points and export-column mapping. Run exports as scoped jobs with expiry and audit, not as synchronous browser operations.

Component: DataAdministration. Data relationships: backup job, export template, export column.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## My trips

### SCR-168 Get started with Trips

Route: `/trips/gettingstarted`. State: Onboarding. Build priority: P1. Evidence: OBS-190.

No editable field controls were captured in this state.

Visible action controls: An illustration of a trip's details page. It contains details of the trip, its itineraries, and the details of each itinerary., Previous, Next, Preview flowchart.

Reconstruction: Build the observed request dialog first. Itinerary and booking workspaces require sandbox reference records; gate Save and Continue behind validation.

Component: TripWorkspace. Data relationships: trip, itinerary, booking option, advance.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-169 New Trip

Route: `/trips/new`. State: Dialog. Build priority: P1. Evidence: OBS-191.

Observed controls: Trip Name * (textbox, required marker); Travel Type * (radiogroup, required marker); Domestic (radio, checked); International (radio); Business Purpose (textbox, 250 characters).

Visible action controls: Close, Save and Continue, Cancel.

Reconstruction: Build the observed request dialog first. Itinerary and booking workspaces require sandbox reference records; gate Save and Continue behind validation.

Component: TripWorkspace. Data relationships: trip, itinerary, booking option, advance.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed; later wizard steps gated by persistence.

## My expenses

### SCR-170 Get started with Expenses

Route: `/expenses/gettingstarted`. State: Onboarding. Build priority: P0. Evidence: OBS-192, OBS-291, OBS-292.

No editable field controls were captured in this state.

Visible action controls: Autoscan Receipts Attach documents from computer, Attach documents from computer, New Expense, An illustration of an expense's details page. It contains the information about the expense as well as the receipts attached to it., Previous, Next, Autoscan Receipts, Auto-forward Email Receipts, Convert Card Statements, Use the Mobile App, Use GPS, Instantly upload email receipts for autoscan using mail add-ons, Preview flowchart.

Reconstruction: Support single, itemized, bulk, card and import entry modes with consistent validation and an unsaved-change guard. Derive totals using decimal arithmetic.

Component: ExpenseComposer. Data relationships: expense, expense item, receipt, report.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-171 Add expense

Route: `/expenses/new`. State: Form. Build priority: P0. Evidence: OBS-193.

Selected tabs: Add Expense.

Observed controls: Report (combobox, value Select); Expense Date * (textbox, required marker); Merchant (combobox); Category * (combobox, required marker, value Select); Currency (inferred from displayed option) (combobox, value INR- Indian Rupee); Amount (textbox, required marker); Claim reimbursement (checkbox, checked); Description (textbox); Reference# (textbox).

Visible action controls: Close, Upload Document, Attach documents from computer computer, Attach documents from computer, Cloud, Itemize, Save and Close, Save and New, Cancel.

Reconstruction: Support single, itemized, bulk, card and import entry modes with consistent validation and an unsaved-change guard. Derive totals using decimal arithmetic.

Component: ExpenseComposer. Data relationships: expense, expense item, receipt, report.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-172 Itemized expense

Route: `/expenses/new`. State: Form. Build priority: P0. Evidence: OBS-194.

Selected tabs: Add Expense.

Observed controls: Report (combobox, value Select); Expense Date * (textbox, required marker); Merchant (combobox); Currency (combobox, value INR- Indian Rupee); [unlabelled control] (checkbox); [unlabelled control] (checkbox); Category (combobox, value Select); Description (textbox); Amount (textbox); [unlabelled control] (checkbox); Category (combobox, value Select); Description (textbox); Amount (textbox); Claim reimbursement (checkbox, checked); Reference# (textbox).

Table columns: Category *, Description, Amount *.

Visible action controls: Close, Upload Document, Attach documents from computer computer, Attach documents from computer, Cloud, Back to single expense view, Add Another Line, Save and Close, Save and New, Cancel.

Reconstruction: Support single, itemized, bulk, card and import entry modes with consistent validation and an unsaved-change guard. Derive totals using decimal arithmetic.

Component: ExpenseComposer. Data relationships: expense, expense item, receipt, report.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-173 Bulk add expenses

Route: `/expenses/new/bulkadd`. State: Form. Build priority: P0. Evidence: OBS-197.

Selected tabs: Bulk Add Expenses.

Observed controls: Report (combobox, value Select); Expense Date (textbox); Select or type to add (combobox); 1 Upload Document Reimbursable - Category * (combobox, required marker, value Select); Currency (inferred from displayed option) (combobox, value INR- Indian Rupee); Amount (textbox); Reimbursable (checkbox, checked); Description (textbox); Reference# (textbox); Expense Date (textbox); Select or type to add (combobox); 2 Upload Document Reimbursable - Category * (combobox, required marker, value Select); Currency (inferred from displayed option) (combobox, value INR- Indian Rupee); Amount (textbox); Reimbursable (checkbox, checked); Description (textbox); Reference# (textbox); Expense Date (textbox); Select or type to add (combobox); 3 Upload Document Reimbursable - Category * (combobox, required marker, value Select); Currency (inferred from displayed option) (combobox, value INR- Indian Rupee); Amount (textbox); Reimbursable (checkbox, checked); Description (textbox); Reference# (textbox); Expense Date (textbox); Select or type to add (combobox); 4 Upload Document Reimbursable - Category * (combobox, required marker, value Select); Currency (inferred from displayed option) (combobox, value INR- Indian Rupee); Amount (textbox); Reimbursable (checkbox, checked); Description (textbox); Reference# (textbox); Expense Date (textbox); Select or type to add (combobox); 5 Upload Document Reimbursable - Category * (combobox, required marker, value Select); Currency (inferred from displayed option) (combobox, value INR- Indian Rupee); Amount (textbox); Reimbursable (checkbox, checked); Description (textbox); Reference# (textbox).

Table columns: Show / Hide Columns, Expense Date *, Merchant, Category *, Amount *, Reimbursable, Description, Reference#.

Visible action controls: Close, Show / Hide Columns, Upload Document, Add More Expenses, Save, Cancel.

Reconstruction: Support single, itemized, bulk, card and import entry modes with consistent validation and an unsaved-change guard. Derive totals using decimal arithmetic.

Component: ExpenseComposer. Data relationships: expense, expense item, receipt, report.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-174 Expenses from cards

Route: `/expenses/new/transactions`. State: Form. Build priority: P0. Evidence: OBS-198.

Selected tabs: From Cards.

No editable field controls were captured in this state.

Visible action controls: Close, Connect Card, Import Statement.

Reconstruction: Support single, itemized, bulk, card and import entry modes with consistent validation and an unsaved-change guard. Derive totals using decimal arithmetic.

Component: ExpenseComposer. Data relationships: expense, expense item, receipt, report.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-243 Import Expenses

Route: `/expenses/import`. State: Page. Build priority: P0. Evidence: OBS-293.

Observed controls: Character Encoding * (combobox, required marker, value UTF-8 (Unicode)).

Visible action controls: Attach documents from computer, Next, Cancel.

Reconstruction: Support single, itemized, bulk, card and import entry modes with consistent validation and an unsaved-change guard. Derive totals using decimal arithmetic.

Component: ExpenseComposer. Data relationships: expense, expense item, receipt, report.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## My reports

### SCR-175 Get started with Reports

Route: `/expensereports/gettingstarted`. State: Onboarding. Build priority: P0. Evidence: OBS-199.

No editable field controls were captured in this state.

Visible action controls: New Report, An illustration of a report's details page. It contains the primary details of the report as well as the expenses and advances associated with it., Previous, Next, Preview flowchart.

Reconstruction: Reconstruct report creation and import. Build report detail with expenses, advances/refunds, history and comments using sandbox fixtures before matching record actions.

Component: ReportWorkspace. Data relationships: expense report, expense, advance application.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-176 New Report

Route: `/expensereports/gettingstarted`. State: Dialog. Build priority: P0. Evidence: OBS-200.

Observed controls: Report Name * (textbox, required marker, 500 characters); Max 500 characters (textbox); eg: 31/01/2025 (textbox); eg: 31/01/2025 (textbox); Trip (combobox, value Select).

Visible action controls: Close, Save, Cancel.

Reconstruction: Reconstruct report creation and import. Build report detail with expenses, advances/refunds, history and comments using sandbox fixtures before matching record actions.

Component: ReportWorkspace. Data relationships: expense report, expense, advance application.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-177 Import Reports

Route: `/expensereports/import`. State: Page. Build priority: P0. Evidence: OBS-201.

Observed controls: Character Encoding * (combobox, required marker, value UTF-8 (Unicode)).

Visible action controls: Attach documents from computer, Next, Cancel.

Reconstruction: Reconstruct report creation and import. Build report detail with expenses, advances/refunds, history and comments using sandbox fixtures before matching record actions.

Component: ReportWorkspace. Data relationships: expense report, expense, advance application.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## My advances

### SCR-178 Get started with Advances

Route: `/advancepayments/gettingstarted`. State: Onboarding. Build priority: P1. Evidence: OBS-202.

No editable field controls were captured in this state.

Visible action controls: Record Advance, An illustration of the advance's details page. It contains details such as the trip, date, reference number, recorded by, and approved by employee details., Previous, Next, Preview flowchart.

Reconstruction: Use the self-owned advance form; retain currency, date, source account and trip association. Reconcile applications and unused balance.

Component: AdvanceDialog. Data relationships: advance, report advance, refund.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-179 Record Advance

Route: `/advancepayments/gettingstarted`. State: Dialog. Build priority: P1. Evidence: OBS-203.

Observed controls: Currency (inferred from displayed option) (combobox, value INR- Indian Rupee); Amount (textbox, required marker); Date * (textbox, required marker); Paid Through (combobox, value Petty Cash); Reference# (textbox); Notes (textbox); Apply to Trip (combobox, value Select).

Visible action controls: Close, Record Advance, Cancel.

Reconstruction: Use the self-owned advance form; retain currency, date, source account and trip association. Reconcile applications and unused balance.

Component: AdvanceDialog. Data relationships: advance, report advance, refund.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## My settings

### SCR-182 My settings basic information

Route: `/userpreferences`. State: Page. Build priority: P1. Evidence: OBS-206.

Selected tabs: Basic Information.

No editable field controls were captured in this state.

Visible action controls: Add Bank Account, Add Delegate, View Previous Delegates, Add Out of Office Approver.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-183 Add Bank Account

Route: `/userpreferences`. State: Dialog. Build priority: P1. Evidence: OBS-207.

Observed controls: Account Holder Name * (textbox, required marker); Bank Name * (textbox, required marker); Account Number * (textbox, required marker); Retype Account No. * (textbox, required marker); Account Type * (combobox, required marker, value Select); AAAA0000000 (textbox).

Visible action controls: Close, Save, Cancel.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-184 Add Delegate

Route: `/userpreferences`. State: Dialog. Build priority: P1. Evidence: OBS-208.

Observed controls: Delegate access to * (combobox, required marker, value Select); Start Date (textbox); End Date (textbox); Access Type (combobox, value Submit access).

Visible action controls: Close, Grant Access, Cancel.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-185 Out of Office Approver

Route: `/userpreferences`. State: Dialog. Build priority: P1. Evidence: OBS-209.

Observed controls: User * (combobox, required marker, value Select); Start Date * (textbox, required marker); End Date * (textbox, required marker).

Visible action controls: Close, Save, Cancel.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-186 My settings basic information

Route: `/userpreferences`. State: Page. Build priority: P1. Evidence: OBS-210.

Selected tabs: Preferences.

No editable field controls were captured in this state.

Visible action controls: [email redacted], Update, How do I auto-forward receipts?, Configure.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-187 My settings basic information

Route: `/userpreferences`. State: Page. Build priority: P1. Evidence: OBS-211.

Selected tabs: Travel Details, Travel Profile.

No editable field controls were captured in this state.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-188 Add Travel Profile

Route: `/userpreferences/edittraveldetails`. State: Form. Build priority: P1. Evidence: OBS-212.

Observed controls: Salutation (combobox); First Name (textbox, value [current user]); Last Name (textbox); Nationality (combobox, value Select); D.O.B as in Passport/ID Proof * (textbox, required marker); Gender (combobox, value Select); Personal Email Address * (textbox, required marker); Personal Mobile Number (combobox, value +91); Personal Mobile Number (textbox); Redress Number (textbox); Known Traveler Number (textbox); Fax (textbox); Preferred Departure Airport (combobox, value Select); Address Line 1 (textbox); Address Line 2 (textbox); Country (combobox, value Select); State (textbox); City (textbox); Pin Code (textbox); Home Phone (textbox); Address Line 1 (textbox); Address Line 2 (textbox); Country (combobox, value Select); State (textbox); City (textbox); Pin Code (textbox); Work Phone (textbox).

Visible action controls: Close, Don't have a passport?, Save, Cancel.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-189 My settings basic information

Route: `/userpreferences`. State: Page. Build priority: P1. Evidence: OBS-213.

Selected tabs: Travel Details, Loyalty Programs.

No editable field controls were captured in this state.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-190 My settings basic information

Route: `/userpreferences`. State: Page. Build priority: P1. Evidence: OBS-214.

Selected tabs: Travel Details, Travel Documents.

No editable field controls were captured in this state.

Visible action controls: Add Travel Document.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-191 New Travel Document

Route: `/userpreferences`. State: Dialog. Build priority: P1. Evidence: OBS-215.

Observed controls: Type * (combobox, required marker, value Select); Country * (combobox, required marker, value Country); Document Number * (textbox, required marker); Issued On (textbox); Valid From (textbox); Expires On (textbox); I authorize Zoho Expense to store and process my travel document for the purpose of fulfilling my business travel requests. (checkbox).

Visible action controls: Close, Upload Document, Attach documents from computer computer, Attach documents from computer, Cloud, Save, Cancel.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-192 My settings basic information

Route: `/userpreferences`. State: Page. Build priority: P1. Evidence: OBS-216.

Selected tabs: Budgets.

No editable field controls were captured in this state.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-193 My settings basic information

Route: `/userpreferences`. State: Form. Build priority: P1. Evidence: OBS-217.

Selected tabs: Preferences.

Observed controls: Field (combobox, value Meal Preference); Meal Preference (combobox, value Select).

Visible action controls: [email redacted], Update, How do I auto-forward receipts?, Remove, Add Field, Save, Cancel, Configure.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-194 My settings basic information

Route: `/userpreferences`. State: Form. Build priority: P1. Evidence: OBS-218.

Selected tabs: Preferences.

Observed controls: Field (combobox, value Paid Through); Paid Through (combobox, value Select).

Visible action controls: [email redacted], Update, How do I auto-forward receipts?, Configure, Remove, Add Field, Save, Cancel.

Reconstruction: Build personal information tabs and dialogs. Enforce account-number confirmation, bounded delegation, travel-profile prerequisites and document consent.

Component: PersonalSettings. Data relationships: bank account, delegate, out-of-office route, travel profile.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Travel documents

### SCR-196 New Travel Document

Route: `/traveldocuments`. State: Dialog. Build priority: P1. Evidence: OBS-221.

Observed controls: User * (combobox, required marker, value Select); Type * (combobox, required marker, value Select); Country * (combobox, required marker, value Country); Document Number * (textbox, required marker); Issued On (textbox); Valid From (textbox); Expires On (textbox); I authorize Zoho Expense to store and process my travel document for the purpose of fulfilling my business travel requests. (checkbox).

Visible action controls: Close, Upload Document, Attach documents from computer computer, Attach documents from computer, Cloud, Save, Cancel.

Reconstruction: Build admin and self variants, filters and metadata form. Encrypt sensitive identifiers and protect download links with access checks and consent provenance.

Component: TravelDocumentVault. Data relationships: document, travel document, user.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-197 New Travel Document

Route: `/traveldocuments`. State: Dialog. Build priority: P1. Evidence: OBS-222.

Observed controls: User * (combobox, required marker, value Select); Type * (combobox, required marker, value Select); Search (textbox); Country * (combobox, required marker, value Country); Document Number * (textbox, required marker); Issued On (textbox); Valid From (textbox); Expires On (textbox); I authorize Zoho Expense to store and process my travel document for the purpose of fulfilling my business travel requests. (checkbox).

Expanded options: Visa, Passport, ESTA, Others.

Visible action controls: Close, Upload Document, Attach documents from computer computer, Attach documents from computer, Cloud, Save, Cancel.

Reconstruction: Build admin and self variants, filters and metadata form. Encrypt sensitive identifiers and protect download links with access checks and consent provenance.

Component: TravelDocumentVault. Data relationships: document, travel document, user.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

### SCR-198 Travel Documents

Route: `/traveldocuments`. State: Table. Build priority: P1. Evidence: OBS-223.

Selected tabs: All.

Observed controls: Department (combobox, value Select).

Table columns: User Name, Department, Type, Country, Document Number, Issued On, Valid From, Expires On, Attachments, More Action Menu.

Visible action controls: Add Travel Document, More Action Menu, More Filters, User Name, Type, Issued On, Expires On.

Reconstruction: Build admin and self variants, filters and metadata form. Encrypt sensitive identifiers and protect download links with access checks and consent provenance.

Component: TravelDocumentVault. Data relationships: document, travel document, user.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.

## Custom views

### SCR-247 New Custom View

Route: `/customviews/new`. State: Form. Build priority: P1. Evidence: OBS-297.

Observed controls: Name * (textbox, required marker); Mark as Favorite (checkbox); [unlabelled] "1" (textbox, disabled, value When); [unlabelled] "1" (combobox, value Select); Select a comparator for criteria . (combobox, value Select); [unlabelled] Select (textbox, disabled); Search (textbox); Share this with (radiogroup); Only me (radio, checked); Only selected users & roles (radio); Everyone (radio).

Visible action controls: Close, Add Criteria, Add, Remove, Save, Cancel.

Reconstruction: Build criteria, selected/available columns, favourite flag and visibility controls. Validate field identifiers against an allowlist and apply row authorization before user filters.

Component: CustomViewBuilder. Data relationships: saved view, predicate, column, share.

Verification boundary: Observed controls and displayed defaults; persistence and downstream actions not executed.
