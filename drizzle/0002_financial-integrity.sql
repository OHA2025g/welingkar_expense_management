CREATE TRIGGER version_guard BEFORE INSERT ON mutation_guards WHEN NEW.passed != 1 BEGIN SELECT RAISE(ABORT,'version_conflict'); END;
--> statement-breakpoint

CREATE UNIQUE INDEX batch_report_active_once ON batch_reports(orgId,reportId) WHERE releasedAt IS NULL;
--> statement-breakpoint

CREATE TRIGGER tenant_employees_roleId_insert BEFORE INSERT ON employees WHEN NEW.roleId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM roles WHERE id=NEW.roleId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_employees_roleId_update BEFORE UPDATE ON employees WHEN NEW.roleId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM roles WHERE id=NEW.roleId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_employees_managerId_insert BEFORE INSERT ON employees WHEN NEW.managerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.managerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_employees_managerId_update BEFORE UPDATE ON employees WHEN NEW.managerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.managerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_employees_departmentId_insert BEFORE INSERT ON employees WHEN NEW.departmentId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.departmentId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_employees_departmentId_update BEFORE UPDATE ON employees WHEN NEW.departmentId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.departmentId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_employees_policyId_insert BEFORE INSERT ON employees WHEN NEW.policyId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.policyId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_employees_policyId_update BEFORE UPDATE ON employees WHEN NEW.policyId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.policyId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_objects_parentId_insert BEFORE INSERT ON objects WHEN NEW.parentId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.parentId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_objects_parentId_update BEFORE UPDATE ON objects WHEN NEW.parentId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.parentId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reports_ownerId_insert BEFORE INSERT ON reports WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reports_ownerId_update BEFORE UPDATE ON reports WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reports_approverId_insert BEFORE INSERT ON reports WHEN NEW.approverId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.approverId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reports_approverId_update BEFORE UPDATE ON reports WHEN NEW.approverId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.approverId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reports_tripId_insert BEFORE INSERT ON reports WHEN NEW.tripId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM trips WHERE id=NEW.tripId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reports_tripId_update BEFORE UPDATE ON reports WHEN NEW.tripId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM trips WHERE id=NEW.tripId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_ownerId_insert BEFORE INSERT ON expenses WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_ownerId_update BEFORE UPDATE ON expenses WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_reportId_insert BEFORE INSERT ON expenses WHEN NEW.reportId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM reports WHERE id=NEW.reportId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_reportId_update BEFORE UPDATE ON expenses WHEN NEW.reportId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM reports WHERE id=NEW.reportId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_categoryId_insert BEFORE INSERT ON expenses WHEN NEW.categoryId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.categoryId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_categoryId_update BEFORE UPDATE ON expenses WHEN NEW.categoryId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.categoryId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_projectId_insert BEFORE INSERT ON expenses WHEN NEW.projectId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.projectId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_projectId_update BEFORE UPDATE ON expenses WHEN NEW.projectId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.projectId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_customerId_insert BEFORE INSERT ON expenses WHEN NEW.customerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.customerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expenses_customerId_update BEFORE UPDATE ON expenses WHEN NEW.customerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.customerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expense_items_expenseId_insert BEFORE INSERT ON expense_items WHEN NEW.expenseId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM expenses WHERE id=NEW.expenseId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expense_items_expenseId_update BEFORE UPDATE ON expense_items WHEN NEW.expenseId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM expenses WHERE id=NEW.expenseId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expense_items_categoryId_insert BEFORE INSERT ON expense_items WHEN NEW.categoryId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.categoryId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_expense_items_categoryId_update BEFORE UPDATE ON expense_items WHEN NEW.categoryId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.categoryId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_trips_ownerId_insert BEFORE INSERT ON trips WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_trips_ownerId_update BEFORE UPDATE ON trips WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_trips_approverId_insert BEFORE INSERT ON trips WHEN NEW.approverId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.approverId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_trips_approverId_update BEFORE UPDATE ON trips WHEN NEW.approverId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.approverId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_itinerary_items_tripId_insert BEFORE INSERT ON itinerary_items WHEN NEW.tripId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM trips WHERE id=NEW.tripId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_itinerary_items_tripId_update BEFORE UPDATE ON itinerary_items WHEN NEW.tripId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM trips WHERE id=NEW.tripId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_booking_options_tripId_insert BEFORE INSERT ON booking_options WHEN NEW.tripId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM trips WHERE id=NEW.tripId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_booking_options_tripId_update BEFORE UPDATE ON booking_options WHEN NEW.tripId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM trips WHERE id=NEW.tripId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advances_ownerId_insert BEFORE INSERT ON advances WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advances_ownerId_update BEFORE UPDATE ON advances WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advances_tripId_insert BEFORE INSERT ON advances WHEN NEW.tripId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM trips WHERE id=NEW.tripId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advances_tripId_update BEFORE UPDATE ON advances WHEN NEW.tripId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM trips WHERE id=NEW.tripId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advances_accountId_insert BEFORE INSERT ON advances WHEN NEW.accountId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.accountId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advances_accountId_update BEFORE UPDATE ON advances WHEN NEW.accountId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.accountId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advance_allocations_advanceId_insert BEFORE INSERT ON advance_allocations WHEN NEW.advanceId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM advances WHERE id=NEW.advanceId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advance_allocations_advanceId_update BEFORE UPDATE ON advance_allocations WHEN NEW.advanceId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM advances WHERE id=NEW.advanceId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advance_allocations_reportId_insert BEFORE INSERT ON advance_allocations WHEN NEW.reportId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM reports WHERE id=NEW.reportId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advance_allocations_reportId_update BEFORE UPDATE ON advance_allocations WHEN NEW.reportId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM reports WHERE id=NEW.reportId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advance_refunds_advanceId_insert BEFORE INSERT ON advance_refunds WHEN NEW.advanceId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM advances WHERE id=NEW.advanceId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_advance_refunds_advanceId_update BEFORE UPDATE ON advance_refunds WHEN NEW.advanceId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM advances WHERE id=NEW.advanceId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_payment_batches_accountId_insert BEFORE INSERT ON payment_batches WHEN NEW.accountId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.accountId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_payment_batches_accountId_update BEFORE UPDATE ON payment_batches WHEN NEW.accountId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.accountId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_batch_reports_batchId_insert BEFORE INSERT ON batch_reports WHEN NEW.batchId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM payment_batches WHERE id=NEW.batchId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_batch_reports_batchId_update BEFORE UPDATE ON batch_reports WHEN NEW.batchId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM payment_batches WHERE id=NEW.batchId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_batch_reports_reportId_insert BEFORE INSERT ON batch_reports WHEN NEW.reportId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM reports WHERE id=NEW.reportId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_batch_reports_reportId_update BEFORE UPDATE ON batch_reports WHEN NEW.reportId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM reports WHERE id=NEW.reportId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reimbursements_reportId_insert BEFORE INSERT ON reimbursements WHEN NEW.reportId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM reports WHERE id=NEW.reportId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reimbursements_reportId_update BEFORE UPDATE ON reimbursements WHEN NEW.reportId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM reports WHERE id=NEW.reportId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reimbursements_batchId_insert BEFORE INSERT ON reimbursements WHEN NEW.batchId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM payment_batches WHERE id=NEW.batchId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reimbursements_batchId_update BEFORE UPDATE ON reimbursements WHEN NEW.batchId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM payment_batches WHERE id=NEW.batchId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reimbursements_accountId_insert BEFORE INSERT ON reimbursements WHEN NEW.accountId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.accountId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_reimbursements_accountId_update BEFORE UPDATE ON reimbursements WHEN NEW.accountId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.accountId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_cards_ownerId_insert BEFORE INSERT ON cards WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_cards_ownerId_update BEFORE UPDATE ON cards WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_card_transactions_cardId_insert BEFORE INSERT ON card_transactions WHEN NEW.cardId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM cards WHERE id=NEW.cardId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_card_transactions_cardId_update BEFORE UPDATE ON card_transactions WHEN NEW.cardId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM cards WHERE id=NEW.cardId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_card_matches_transactionId_insert BEFORE INSERT ON card_matches WHEN NEW.transactionId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM card_transactions WHERE id=NEW.transactionId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_card_matches_transactionId_update BEFORE UPDATE ON card_matches WHEN NEW.transactionId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM card_transactions WHERE id=NEW.transactionId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_card_matches_expenseId_insert BEFORE INSERT ON card_matches WHEN NEW.expenseId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM expenses WHERE id=NEW.expenseId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_card_matches_expenseId_update BEFORE UPDATE ON card_matches WHEN NEW.expenseId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM expenses WHERE id=NEW.expenseId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_budgets_ownerId_insert BEFORE INSERT ON budgets WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_budgets_ownerId_update BEFORE UPDATE ON budgets WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_budgets_projectId_insert BEFORE INSERT ON budgets WHEN NEW.projectId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.projectId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_budgets_projectId_update BEFORE UPDATE ON budgets WHEN NEW.projectId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.projectId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_budget_lines_budgetId_insert BEFORE INSERT ON budget_lines WHEN NEW.budgetId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM budgets WHERE id=NEW.budgetId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_budget_lines_budgetId_update BEFORE UPDATE ON budget_lines WHEN NEW.budgetId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM budgets WHERE id=NEW.budgetId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_budget_lines_categoryId_insert BEFORE INSERT ON budget_lines WHEN NEW.categoryId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.categoryId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_budget_lines_categoryId_update BEFORE UPDATE ON budget_lines WHEN NEW.categoryId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM objects WHERE id=NEW.categoryId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_approval_tasks_recordId_insert BEFORE INSERT ON approval_tasks WHEN NEW.recordId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM record_registry WHERE id=NEW.recordId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_approval_tasks_recordId_update BEFORE UPDATE ON approval_tasks WHEN NEW.recordId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM record_registry WHERE id=NEW.recordId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_approval_tasks_approverId_insert BEFORE INSERT ON approval_tasks WHEN NEW.approverId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.approverId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_approval_tasks_approverId_update BEFORE UPDATE ON approval_tasks WHEN NEW.approverId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.approverId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_documents_ownerId_insert BEFORE INSERT ON documents WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_documents_ownerId_update BEFORE UPDATE ON documents WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_attachments_documentId_insert BEFORE INSERT ON attachments WHEN NEW.documentId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM documents WHERE id=NEW.documentId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_attachments_documentId_update BEFORE UPDATE ON attachments WHEN NEW.documentId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM documents WHERE id=NEW.documentId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_attachments_recordId_insert BEFORE INSERT ON attachments WHEN NEW.recordId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM record_registry WHERE id=NEW.recordId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_attachments_recordId_update BEFORE UPDATE ON attachments WHEN NEW.recordId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM record_registry WHERE id=NEW.recordId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_bank_accounts_ownerId_insert BEFORE INSERT ON bank_accounts WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_bank_accounts_ownerId_update BEFORE UPDATE ON bank_accounts WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_travel_profiles_ownerId_insert BEFORE INSERT ON travel_profiles WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_travel_profiles_ownerId_update BEFORE UPDATE ON travel_profiles WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_delegations_ownerId_insert BEFORE INSERT ON delegations WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_delegations_ownerId_update BEFORE UPDATE ON delegations WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_delegations_delegateId_insert BEFORE INSERT ON delegations WHEN NEW.delegateId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.delegateId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_delegations_delegateId_update BEFORE UPDATE ON delegations WHEN NEW.delegateId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.delegateId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_out_of_office_ownerId_insert BEFORE INSERT ON out_of_office WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_out_of_office_ownerId_update BEFORE UPDATE ON out_of_office WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_out_of_office_alternateId_insert BEFORE INSERT ON out_of_office WHEN NEW.alternateId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.alternateId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_out_of_office_alternateId_update BEFORE UPDATE ON out_of_office WHEN NEW.alternateId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.alternateId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_comments_ownerId_insert BEFORE INSERT ON comments WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_comments_ownerId_update BEFORE UPDATE ON comments WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_comments_recordId_insert BEFORE INSERT ON comments WHEN NEW.recordId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM record_registry WHERE id=NEW.recordId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_comments_recordId_update BEFORE UPDATE ON comments WHEN NEW.recordId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM record_registry WHERE id=NEW.recordId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_record_registry_ownerId_insert BEFORE INSERT ON record_registry WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_record_registry_ownerId_update BEFORE UPDATE ON record_registry WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_notifications_ownerId_insert BEFORE INSERT ON notifications WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER tenant_notifications_ownerId_update BEFORE UPDATE ON notifications WHEN NEW.ownerId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM employees WHERE id=NEW.ownerId AND orgId=NEW.orgId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER immutable_audit_events_update BEFORE UPDATE ON audit_events BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
--> statement-breakpoint

CREATE TRIGGER immutable_audit_events_delete BEFORE DELETE ON audit_events BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
--> statement-breakpoint

CREATE TRIGGER immutable_reimbursements_update BEFORE UPDATE ON reimbursements BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
--> statement-breakpoint

CREATE TRIGGER immutable_reimbursements_delete BEFORE DELETE ON reimbursements BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
--> statement-breakpoint

CREATE TRIGGER immutable_advance_refunds_update BEFORE UPDATE ON advance_refunds BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
--> statement-breakpoint

CREATE TRIGGER immutable_advance_refunds_delete BEFORE DELETE ON advance_refunds BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
--> statement-breakpoint

CREATE TRIGGER immutable_workflow_executions_update BEFORE UPDATE ON workflow_executions BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
--> statement-breakpoint

CREATE TRIGGER immutable_workflow_executions_delete BEFORE DELETE ON workflow_executions BEGIN SELECT RAISE(ABORT,'immutable_history'); END;
--> statement-breakpoint

CREATE TRIGGER positive_expenses_insert BEFORE INSERT ON expenses WHEN NEW.amountMinor <= 0 OR NEW.baseAmountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_expenses_update BEFORE UPDATE ON expenses WHEN NEW.amountMinor <= 0 OR NEW.baseAmountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_expense_items_insert BEFORE INSERT ON expense_items WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_expense_items_update BEFORE UPDATE ON expense_items WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_advances_insert BEFORE INSERT ON advances WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_advances_update BEFORE UPDATE ON advances WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_advance_allocations_insert BEFORE INSERT ON advance_allocations WHEN NEW.sourceAmountMinor <= 0 OR NEW.reportAmountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_advance_allocations_update BEFORE UPDATE ON advance_allocations WHEN NEW.sourceAmountMinor <= 0 OR NEW.reportAmountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_advance_refunds_insert BEFORE INSERT ON advance_refunds WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_advance_refunds_update BEFORE UPDATE ON advance_refunds WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_reimbursements_insert BEFORE INSERT ON reimbursements WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_reimbursements_update BEFORE UPDATE ON reimbursements WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_card_transactions_insert BEFORE INSERT ON card_transactions WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_card_transactions_update BEFORE UPDATE ON card_transactions WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_card_matches_insert BEFORE INSERT ON card_matches WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_card_matches_update BEFORE UPDATE ON card_matches WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_budget_lines_insert BEFORE INSERT ON budget_lines WHEN NEW.amountMinor < 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_budget_lines_update BEFORE UPDATE ON budget_lines WHEN NEW.amountMinor < 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_batch_reports_insert BEFORE INSERT ON batch_reports WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_batch_reports_update BEFORE UPDATE ON batch_reports WHEN NEW.amountMinor <= 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_booking_options_insert BEFORE INSERT ON booking_options WHEN NEW.amountMinor < 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER positive_booking_options_update BEFORE UPDATE ON booking_options WHEN NEW.amountMinor < 0 BEGIN SELECT RAISE(ABORT,'invalid_amount'); END;
--> statement-breakpoint

CREATE TRIGGER balance_advance_allocations BEFORE INSERT ON advance_allocations WHEN (SELECT amountMinor FROM advances WHERE id=NEW.advanceId) < COALESCE((SELECT SUM(sourceAmountMinor) FROM advance_allocations WHERE advanceId=NEW.advanceId AND reversedAt IS NULL),0)+COALESCE((SELECT SUM(amountMinor) FROM advance_refunds WHERE advanceId=NEW.advanceId),0)+NEW.sourceAmountMinor BEGIN SELECT RAISE(ABORT,'advance_balance'); END;
--> statement-breakpoint

CREATE TRIGGER owner_advance_allocations BEFORE INSERT ON advance_allocations WHEN (SELECT status FROM advances WHERE id=NEW.advanceId) NOT IN ('recorded','approved') BEGIN SELECT RAISE(ABORT,'locked_record'); END;
--> statement-breakpoint

CREATE TRIGGER balance_advance_refunds BEFORE INSERT ON advance_refunds WHEN (SELECT amountMinor FROM advances WHERE id=NEW.advanceId) < COALESCE((SELECT SUM(sourceAmountMinor) FROM advance_allocations WHERE advanceId=NEW.advanceId AND reversedAt IS NULL),0)+COALESCE((SELECT SUM(amountMinor) FROM advance_refunds WHERE advanceId=NEW.advanceId),0)+NEW.amountMinor BEGIN SELECT RAISE(ABORT,'advance_balance'); END;
--> statement-breakpoint

CREATE TRIGGER owner_advance_refunds BEFORE INSERT ON advance_refunds WHEN (SELECT status FROM advances WHERE id=NEW.advanceId) NOT IN ('recorded','approved') BEGIN SELECT RAISE(ABORT,'locked_record'); END;
--> statement-breakpoint

CREATE TRIGGER advance_allocation_owner BEFORE INSERT ON advance_allocations WHEN (SELECT ownerId FROM advances WHERE id=NEW.advanceId)!=(SELECT ownerId FROM reports WHERE id=NEW.reportId) BEGIN SELECT RAISE(ABORT,'tenant_mismatch'); END;
--> statement-breakpoint

CREATE TRIGGER payment_balance BEFORE INSERT ON reimbursements WHEN NEW.amountMinor+COALESCE((SELECT SUM(reportAmountMinor) FROM advance_allocations WHERE reportId=NEW.reportId AND reversedAt IS NULL),0)+COALESCE((SELECT SUM(amountMinor) FROM reimbursements WHERE reportId=NEW.reportId AND status='recorded'),0)>COALESCE((SELECT SUM(baseAmountMinor) FROM expenses WHERE reportId=NEW.reportId AND reimbursable=1 AND status!='rejected' AND deletedAt IS NULL),0) OR (SELECT status FROM reports WHERE id=NEW.reportId)!='approved' BEGIN SELECT RAISE(ABORT,'payment_exceeds'); END;
--> statement-breakpoint

CREATE TRIGGER allocation_balance BEFORE INSERT ON advance_allocations WHEN NEW.reportAmountMinor+COALESCE((SELECT SUM(reportAmountMinor) FROM advance_allocations WHERE reportId=NEW.reportId AND reversedAt IS NULL),0)+COALESCE((SELECT SUM(amountMinor) FROM reimbursements WHERE reportId=NEW.reportId AND status='recorded'),0)>COALESCE((SELECT SUM(baseAmountMinor) FROM expenses WHERE reportId=NEW.reportId AND reimbursable=1 AND status!='rejected' AND deletedAt IS NULL),0) BEGIN SELECT RAISE(ABORT,'allocation_exceeds'); END;
--> statement-breakpoint

CREATE TRIGGER card_match_balance BEFORE INSERT ON card_matches WHEN NEW.amountMinor+COALESCE((SELECT SUM(amountMinor) FROM card_matches WHERE transactionId=NEW.transactionId AND reversedAt IS NULL),0)>(SELECT amountMinor FROM card_transactions WHERE id=NEW.transactionId) OR NEW.amountMinor+COALESCE((SELECT SUM(amountMinor) FROM card_matches WHERE expenseId=NEW.expenseId AND reversedAt IS NULL),0)>(SELECT amountMinor FROM expenses WHERE id=NEW.expenseId) OR (SELECT currency FROM card_transactions WHERE id=NEW.transactionId)!=(SELECT currency FROM expenses WHERE id=NEW.expenseId) BEGIN SELECT RAISE(ABORT,'allocation_exceeds'); END;
--> statement-breakpoint

CREATE TRIGGER expense_money_locked BEFORE UPDATE ON expenses WHEN OLD.reportId IS NOT NULL AND EXISTS(SELECT 1 FROM reports WHERE id=OLD.reportId AND status NOT IN ('draft','rejected','recalled')) AND (OLD.amountMinor!=NEW.amountMinor OR OLD.baseAmountMinor!=NEW.baseAmountMinor OR OLD.currency!=NEW.currency OR COALESCE(OLD.reportId,'')!=COALESCE(NEW.reportId,'') OR OLD.deletedAt IS NOT NEW.deletedAt) BEGIN SELECT RAISE(ABORT,'locked_record'); END;
--> statement-breakpoint

CREATE TRIGGER advance_amount_locked BEFORE UPDATE ON advances WHEN (OLD.amountMinor!=NEW.amountMinor OR OLD.currency!=NEW.currency OR OLD.ownerId!=NEW.ownerId) AND (EXISTS(SELECT 1 FROM advance_allocations WHERE advanceId=OLD.id) OR EXISTS(SELECT 1 FROM advance_refunds WHERE advanceId=OLD.id)) BEGIN SELECT RAISE(ABORT,'locked_record'); END;
--> statement-breakpoint

CREATE TRIGGER budget_enforcement_insert BEFORE INSERT ON expenses WHEN NEW.deletedAt IS NULL AND NEW.status!='rejected' AND EXISTS(SELECT 1 FROM budgets b JOIN budget_lines l ON l.budgetId=b.id WHERE b.orgId=NEW.orgId AND b.status='active' AND b.blockAtLimit=1 AND NEW.expenseDate BETWEEN l.startDate AND l.endDate AND (b.ownerId IS NULL OR b.ownerId=NEW.ownerId) AND (b.projectId IS NULL OR b.projectId=NEW.projectId) AND (l.categoryId IS NULL OR l.categoryId=NEW.categoryId) AND NEW.baseAmountMinor+COALESCE((SELECT SUM(e.baseAmountMinor) FROM expenses e WHERE e.orgId=NEW.orgId AND e.id!=NEW.id AND e.deletedAt IS NULL AND e.status!='rejected' AND e.expenseDate BETWEEN l.startDate AND l.endDate AND (b.ownerId IS NULL OR b.ownerId=e.ownerId) AND (b.projectId IS NULL OR b.projectId=e.projectId) AND (l.categoryId IS NULL OR l.categoryId=e.categoryId)),0)>l.amountMinor) BEGIN SELECT RAISE(ABORT,'budget_exceeded'); END;
--> statement-breakpoint

CREATE TRIGGER budget_enforcement_update BEFORE UPDATE ON expenses WHEN NEW.deletedAt IS NULL AND NEW.status!='rejected' AND EXISTS(SELECT 1 FROM budgets b JOIN budget_lines l ON l.budgetId=b.id WHERE b.orgId=NEW.orgId AND b.status='active' AND b.blockAtLimit=1 AND NEW.expenseDate BETWEEN l.startDate AND l.endDate AND (b.ownerId IS NULL OR b.ownerId=NEW.ownerId) AND (b.projectId IS NULL OR b.projectId=NEW.projectId) AND (l.categoryId IS NULL OR l.categoryId=NEW.categoryId) AND NEW.baseAmountMinor+COALESCE((SELECT SUM(e.baseAmountMinor) FROM expenses e WHERE e.orgId=NEW.orgId AND e.id!=NEW.id AND e.deletedAt IS NULL AND e.status!='rejected' AND e.expenseDate BETWEEN l.startDate AND l.endDate AND (b.ownerId IS NULL OR b.ownerId=e.ownerId) AND (b.projectId IS NULL OR b.projectId=e.projectId) AND (l.categoryId IS NULL OR l.categoryId=e.categoryId)),0)>l.amountMinor) BEGIN SELECT RAISE(ABORT,'budget_exceeded'); END;
--> statement-breakpoint

CREATE TRIGGER spending_rule_enforcement BEFORE INSERT ON expenses WHEN NEW.deletedAt IS NULL AND NEW.status!='rejected' AND EXISTS(SELECT 1 FROM configurations c WHERE c.orgId=NEW.orgId AND c.kind='spending_rules' AND c.enabled=1 AND json_extract(c.data,'$.action')='block' AND CAST(json_extract(c.data,'$.limitMinor') AS INTEGER)>0 AND (COALESCE(json_extract(c.data,'$.policyId'),'')='' OR json_extract(c.data,'$.policyId')=(SELECT policyId FROM employees WHERE id=NEW.ownerId)) AND (COALESCE(json_extract(c.data,'$.categoryId'),'')='' OR json_extract(c.data,'$.categoryId')=NEW.categoryId) AND (COALESCE(json_extract(c.data,'$.effectiveFrom'),'')='' OR json_extract(c.data,'$.effectiveFrom')<=NEW.expenseDate) AND NEW.baseAmountMinor+COALESCE((SELECT SUM(e.baseAmountMinor) FROM expenses e WHERE e.orgId=NEW.orgId AND e.ownerId=NEW.ownerId AND e.id!=NEW.id AND e.deletedAt IS NULL AND e.status!='rejected' AND (COALESCE(json_extract(c.data,'$.categoryId'),'')='' OR e.categoryId=NEW.categoryId) AND ((json_extract(c.data,'$.period')='daily' AND e.expenseDate=NEW.expenseDate) OR (json_extract(c.data,'$.period')='monthly' AND substr(e.expenseDate,1,7)=substr(NEW.expenseDate,1,7)) OR (json_extract(c.data,'$.period')='yearly' AND substr(e.expenseDate,1,4)=substr(NEW.expenseDate,1,4)))),0)>CAST(json_extract(c.data,'$.limitMinor') AS INTEGER)) BEGIN SELECT RAISE(ABORT,'spending_rule_exceeded'); END;
--> statement-breakpoint
