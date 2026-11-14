CREATE TABLE `advances` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`tripId` text,
	`amountMinor` integer NOT NULL,
	`currency` text DEFAULT 'INR' NOT NULL,
	`fxMicros` integer DEFAULT 1000000 NOT NULL,
	`paidOn` text NOT NULL,
	`accountId` text,
	`reference` text,
	`notes` text,
	`status` text DEFAULT 'recorded' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `advance_allocations` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`advanceId` text NOT NULL,
	`reportId` text NOT NULL,
	`sourceAmountMinor` integer NOT NULL,
	`reportAmountMinor` integer NOT NULL,
	`reversedAt` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`advanceId`) REFERENCES `advances`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reportId`) REFERENCES `reports`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `approval_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`recordId` text NOT NULL,
	`module` text NOT NULL,
	`approverId` text NOT NULL,
	`step` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`decisionAt` text,
	`reason` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recordId`) REFERENCES `record_registry`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`approverId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `attachments` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`documentId` text NOT NULL,
	`recordId` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`documentId`) REFERENCES `documents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recordId`) REFERENCES `record_registry`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attachment_once` ON `attachments` (`orgId`,`documentId`,`recordId`);--> statement-breakpoint
CREATE TABLE `audit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`actorId` text NOT NULL,
	`principalId` text,
	`action` text NOT NULL,
	`recordId` text,
	`module` text,
	`createdAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `audit_timeline` ON `audit_events` (`orgId`,`createdAt`);--> statement-breakpoint
CREATE TABLE `bank_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`label` text NOT NULL,
	`lastFour` text NOT NULL,
	`encrypted` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `bank_owner` ON `bank_accounts` (`orgId`,`ownerId`);--> statement-breakpoint
CREATE TABLE `batch_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`batchId` text NOT NULL,
	`reportId` text NOT NULL,
	`amountMinor` integer NOT NULL,
	`releasedAt` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`batchId`) REFERENCES `payment_batches`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reportId`) REFERENCES `reports`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `batch_reports_idx` ON `batch_reports` (`orgId`,`batchId`);--> statement-breakpoint
CREATE TABLE `payment_batches` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`name` text NOT NULL,
	`currency` text DEFAULT 'INR' NOT NULL,
	`accountId` text NOT NULL,
	`paymentDate` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'draft' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `booking_options` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`tripId` text NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`amountMinor` integer NOT NULL,
	`currency` text DEFAULT 'INR' NOT NULL,
	`status` text DEFAULT 'proposed' NOT NULL,
	`confirmation` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `budget_lines` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`budgetId` text NOT NULL,
	`categoryId` text,
	`startDate` text NOT NULL,
	`endDate` text NOT NULL,
	`amountMinor` integer NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`budgetId`) REFERENCES `budgets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`name` text NOT NULL,
	`ownerId` text,
	`projectId` text,
	`kind` text DEFAULT 'general' NOT NULL,
	`fiscalStart` text NOT NULL,
	`fiscalEnd` text NOT NULL,
	`period` text DEFAULT 'monthly' NOT NULL,
	`warningPercent` integer DEFAULT 80 NOT NULL,
	`blockAtLimit` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `card_matches` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`transactionId` text NOT NULL,
	`expenseId` text NOT NULL,
	`amountMinor` integer NOT NULL,
	`reversedAt` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transactionId`) REFERENCES `card_transactions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`expenseId`) REFERENCES `expenses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `card_transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`cardId` text NOT NULL,
	`transactionDate` text NOT NULL,
	`description` text NOT NULL,
	`amountMinor` integer NOT NULL,
	`currency` text DEFAULT 'INR' NOT NULL,
	`reference` text,
	`status` text DEFAULT 'unmatched' NOT NULL,
	`importKey` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`cardId`) REFERENCES `cards`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `card_txn_import` ON `card_transactions` (`orgId`,`importKey`);--> statement-breakpoint
CREATE TABLE `cards` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`name` text NOT NULL,
	`bank` text,
	`lastFour` text,
	`currency` text DEFAULT 'INR' NOT NULL,
	`kind` text DEFAULT 'corporate' NOT NULL,
	`status` text DEFAULT 'manual' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`recordId` text NOT NULL,
	`ownerId` text NOT NULL,
	`message` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recordId`) REFERENCES `record_registry`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `configurations` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`module` text,
	`ownerId` text,
	`visibility` text DEFAULT 'everyone' NOT NULL,
	`enabled` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `config_kind` ON `configurations` (`orgId`,`kind`);--> statement-breakpoint
CREATE TABLE `delegations` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`delegateId` text NOT NULL,
	`startsOn` text NOT NULL,
	`endsOn` text NOT NULL,
	`access` text DEFAULT 'submit' NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`delegateId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`name` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`sha256` text NOT NULL,
	`objectKey` text NOT NULL,
	`status` text DEFAULT 'validated' NOT NULL,
	`ocrStatus` text DEFAULT 'not_started' NOT NULL,
	`ocrText` text,
	`ocrConfidence` integer,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`authId` text,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`roleId` text NOT NULL,
	`managerId` text,
	`departmentId` text,
	`policyId` text,
	`active` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employee_org_email` ON `employees` (`orgId`,`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `employee_org_auth` ON `employees` (`orgId`,`authId`);--> statement-breakpoint
CREATE TABLE `workflow_executions` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ruleId` text,
	`eventId` text NOT NULL,
	`status` text NOT NULL,
	`message` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workflow_event_once` ON `workflow_executions` (`orgId`,`ruleId`,`eventId`);--> statement-breakpoint
CREATE TABLE `expense_items` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`expenseId` text NOT NULL,
	`categoryId` text,
	`description` text DEFAULT '' NOT NULL,
	`amountMinor` integer NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`expenseId`) REFERENCES `expenses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`reportId` text,
	`merchant` text DEFAULT '' NOT NULL,
	`expenseDate` text NOT NULL,
	`categoryId` text,
	`projectId` text,
	`customerId` text,
	`amountMinor` integer NOT NULL,
	`currency` text DEFAULT 'INR' NOT NULL,
	`fxMicros` integer DEFAULT 1000000 NOT NULL,
	`baseAmountMinor` integer NOT NULL,
	`reimbursable` integer DEFAULT 1 NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`reference` text DEFAULT '' NOT NULL,
	`kind` text DEFAULT 'standard' NOT NULL,
	`status` text DEFAULT 'unreported' NOT NULL,
	`deletedAt` text,
	`importKey` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reportId`) REFERENCES `reports`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `expenses_owner_date` ON `expenses` (`orgId`,`ownerId`,`expenseDate`);--> statement-breakpoint
CREATE UNIQUE INDEX `expense_import_key` ON `expenses` (`orgId`,`importKey`);--> statement-breakpoint
CREATE TABLE `idempotency_keys` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`actorId` text NOT NULL,
	`requestKey` text NOT NULL,
	`fingerprint` text NOT NULL,
	`response` text NOT NULL,
	`createdAt` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idempotency_scope` ON `idempotency_keys` (`orgId`,`actorId`,`requestKey`);--> statement-breakpoint
CREATE TABLE `import_stages` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`kind` text NOT NULL,
	`checksum` text NOT NULL,
	`status` text DEFAULT 'preview' NOT NULL,
	`rowCount` integer NOT NULL,
	`committedAt` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `itinerary_items` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`tripId` text NOT NULL,
	`kind` text NOT NULL,
	`startsAt` text NOT NULL,
	`endsAt` text,
	`fromPlace` text,
	`toPlace` text,
	`sortOrder` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tripId`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`state` text DEFAULT 'queued' NOT NULL,
	`total` integer DEFAULT 0 NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL,
	`dedupeKey` text NOT NULL,
	`error` text,
	`availableAt` text NOT NULL,
	`finishedAt` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `job_dedupe` ON `jobs` (`orgId`,`dedupeKey`);--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`href` text,
	`readAt` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `objects` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`code` text,
	`parentId` text,
	`enabled` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `objects_lookup` ON `objects` (`orgId`,`kind`);--> statement-breakpoint
CREATE UNIQUE INDEX `object_code` ON `objects` (`orgId`,`kind`,`code`);--> statement-breakpoint
CREATE TABLE `out_of_office` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`alternateId` text NOT NULL,
	`startsOn` text NOT NULL,
	`endsOn` text NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`alternateId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `outbox_events` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`event` text NOT NULL,
	`recordId` text,
	`state` text DEFAULT 'pending' NOT NULL,
	`processedAt` text,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `advance_refunds` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`advanceId` text NOT NULL,
	`amountMinor` integer NOT NULL,
	`refundedOn` text NOT NULL,
	`reference` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`advanceId`) REFERENCES `advances`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `record_registry` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`kind` text NOT NULL,
	`ownerId` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `registry_owner` ON `record_registry` (`orgId`,`ownerId`,`kind`);--> statement-breakpoint
CREATE TABLE `reimbursements` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`reportId` text NOT NULL,
	`batchId` text,
	`amountMinor` integer NOT NULL,
	`paidOn` text NOT NULL,
	`reference` text NOT NULL,
	`accountId` text NOT NULL,
	`mode` text DEFAULT 'offline' NOT NULL,
	`status` text DEFAULT 'recorded' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reportId`) REFERENCES `reports`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`batchId`) REFERENCES `payment_batches`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`name` text NOT NULL,
	`number` text NOT NULL,
	`purpose` text,
	`startDate` text,
	`endDate` text,
	`tripId` text,
	`approverId` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`paymentStatus` text DEFAULT 'unpaid' NOT NULL,
	`submittedAt` text,
	`approvedAt` text,
	`exportedAt` text,
	`policySnapshot` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `reports_status` ON `reports` (`orgId`,`status`);--> statement-breakpoint
CREATE UNIQUE INDEX `reports_number` ON `reports` (`orgId`,`number`);--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`name` text NOT NULL,
	`isSystem` integer DEFAULT 0 NOT NULL,
	`permissions` text DEFAULT '{}' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `role_name` ON `roles` (`orgId`,`name`);--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`settingKey` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `settings_key` ON `settings` (`orgId`,`settingKey`);--> statement-breakpoint
CREATE TABLE `travel_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`encrypted` text NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `travel_owner` ON `travel_profiles` (`orgId`,`ownerId`);--> statement-breakpoint
CREATE TABLE `trips` (
	`id` text PRIMARY KEY NOT NULL,
	`orgId` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL,
	`ownerId` text NOT NULL,
	`name` text NOT NULL,
	`number` text NOT NULL,
	`travelType` text NOT NULL,
	`purpose` text,
	`startDate` text,
	`endDate` text,
	`destination` text,
	`approverId` text,
	`status` text DEFAULT 'draft' NOT NULL,
	FOREIGN KEY (`orgId`) REFERENCES `workspaces`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ownerId`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `trip_number` ON `trips` (`orgId`,`number`);--> statement-breakpoint
CREATE TABLE `workspaces` (
	`id` text PRIMARY KEY NOT NULL,
	`ownerAuthId` text NOT NULL,
	`name` text NOT NULL,
	`isDemo` integer DEFAULT 0 NOT NULL,
	`baseCurrency` text DEFAULT 'INR' NOT NULL,
	`country` text DEFAULT 'India' NOT NULL,
	`timeZone` text DEFAULT 'Asia/Kolkata' NOT NULL,
	`fiscalStartMonth` integer DEFAULT 4 NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`createdAt` text NOT NULL,
	`data` text DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `workspace_owner` ON `workspaces` (`ownerAuthId`);