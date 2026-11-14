import { all, database, now, one, stmt } from "./server-db";

type SqlValue = string | number | null;
type Row = Record<string, SqlValue>;

const merchants = [
  "IndiGo",
  "Marriott Hotels",
  "Blue Tokai Coffee",
  "Uber Business",
  "Amazon Business",
  "The Leela",
];

function daysAgo(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

function queue(
  db: D1Database,
  batch: D1PreparedStatement[],
  table: string,
  row: Row,
) {
  const keys = Object.keys(row);
  batch.push(
    stmt(
      db,
      `INSERT OR IGNORE INTO ${table} (${keys.map((key) => `"${key}"`).join(",")}) VALUES (${keys.map(() => "?").join(",")})`,
      ...keys.map((key) => row[key]),
    ),
  );
}

function stamped(id: string, orgId: string, stamp: string, extra: Row): Row {
  return {
    id,
    orgId,
    version: 1,
    createdAt: stamp,
    updatedAt: stamp,
    data: "{}",
    ...extra,
  };
}

/** Point submitters at the approver and every other local user at the workspace owner. */
export async function alignLocalReporting(
  orgId: string,
  ownerAuthId: string,
): Promise<void> {
  const db = database();
  const employees = await all(
    db,
    "SELECT e.id, e.authId, r.name AS role FROM employees e JOIN roles r ON r.id=e.roleId WHERE e.orgId=? AND e.active=1",
    orgId,
  );
  const owner = employees.find((employee) => employee.authId === ownerAuthId);
  const approver = employees.find((employee) => employee.role === "Approver");
  if (!owner) return;
  const stamp = now();
  for (const employee of employees) {
    if (!String(employee.authId || "").startsWith("local_")) continue;
    let managerId: string | null = null;
    if (employee.id !== owner.id) {
      managerId =
        employee.role === "Submitter" && approver && approver.id !== employee.id
          ? approver.id
          : owner.id;
      if (managerId === employee.id) managerId = null;
    }
    await stmt(
      db,
      "UPDATE employees SET managerId=?, updatedAt=? WHERE id=? AND orgId=?",
      managerId,
      stamp,
      employee.id,
      orgId,
    ).run();
  }
}

/**
 * Give every local role its own expenses, reports, trips, advances and cards.
 * Pending approvals for other people land with the Approver.
 */
export async function seedLocalRoleActivity(orgId: string): Promise<void> {
  const db = database();
  const employees = await all(
    db,
    "SELECT e.id, e.authId, e.name, r.name AS role FROM employees e JOIN roles r ON r.id=e.roleId WHERE e.orgId=? AND e.active=1 AND e.authId LIKE 'local_%' ORDER BY e.createdAt",
    orgId,
  );
  if (!employees.length) return;

  const approver =
    employees.find((employee) => employee.role === "Approver") || employees[0];
  const admin =
    employees.find((employee) => employee.role === "Admin") || employees[0];
  const category = await one(
    db,
    "SELECT id FROM objects WHERE orgId=? AND kind='categories' AND enabled=1 ORDER BY name LIMIT 1",
    orgId,
  );
  const account = await one(
    db,
    "SELECT id FROM objects WHERE orgId=? AND kind='accounts' AND enabled=1 ORDER BY name LIMIT 1",
    orgId,
  );
  if (!category || !account) return;

  const stamp = now();
  const today = stamp.slice(0, 10);
  const alreadySeeded = await one(
    db,
    "SELECT id FROM audit_events WHERE id=?",
    `${orgId}_rolepack_audit`,
  );
  if (!alreadySeeded && approver.id !== admin.id) {
    await stmt(
      db,
      `UPDATE approval_tasks SET approverId=?, updatedAt=? WHERE orgId=? AND status='pending' AND approverId=? AND recordId IN (SELECT id FROM record_registry WHERE orgId=? AND ownerId!=?)`,
      approver.id,
      stamp,
      orgId,
      admin.id,
      orgId,
      approver.id,
    ).run();
    await stmt(
      db,
      "UPDATE reports SET approverId=?, updatedAt=? WHERE orgId=? AND status='submitted' AND approverId=? AND ownerId!=?",
      approver.id,
      stamp,
      orgId,
      admin.id,
      approver.id,
    ).run();
    await stmt(
      db,
      "UPDATE trips SET approverId=?, updatedAt=? WHERE orgId=? AND status='submitted' AND approverId=? AND ownerId!=?",
      approver.id,
      stamp,
      orgId,
      admin.id,
      approver.id,
    ).run();
  }

  const existingBudget = await one(
    db,
    "SELECT id FROM budgets WHERE orgId=? LIMIT 1",
    orgId,
  );
  const batch: D1PreparedStatement[] = [];
  if (!existingBudget) {
    const budgetId = `${orgId}_rolepack_budget`;
    const year = new Date().getUTCMonth() >= 3 ? new Date().getUTCFullYear() : new Date().getUTCFullYear() - 1;
    queue(db, batch, "budgets", stamped(budgetId, orgId, stamp, {
      name: "Company travel budget",
      ownerId: null,
      projectId: null,
      kind: "general",
      fiscalStart: `${year}-04-01`,
      fiscalEnd: `${year + 1}-03-31`,
      period: "monthly",
      warningPercent: 80,
      blockAtLimit: 0,
      status: "active",
    }));
    queue(db, batch, "budget_lines", stamped(`${budgetId}_line`, orgId, stamp, {
      budgetId,
      categoryId: null,
      startDate: `${year}-04-01`,
      endDate: `${year + 1}-03-31`,
      amountMinor: 500000000,
    }));
  }

  for (const [index, employee] of employees.entries()) {
    const key = String(employee.authId).replace(/^local_/, "");
    const prefix = `${orgId}_rolepack_${key}`;
    const existing = await one(db, "SELECT id FROM expenses WHERE id=?", `${prefix}_expense_open`);
    if (existing) {
      if (batch.length) {
        await db.batch(batch);
        batch.length = 0;
      }
      continue;
    }
    const reviewerId = employee.id === approver.id ? admin.id : approver.id;
    const amount = [128000, 246500, 89000, 412000, 67500, 198000][index % 6];
    const merchant = merchants[index % merchants.length];

    const openExpense = `${prefix}_expense_open`;
    queue(db, batch, "expenses", stamped(openExpense, orgId, stamp, {
      ownerId: employee.id,
      reportId: null,
      merchant,
      expenseDate: daysAgo(2),
      categoryId: category.id,
      projectId: null,
      customerId: null,
      amountMinor: amount,
      currency: "INR",
      fxMicros: 1000000,
      baseAmountMinor: amount,
      reimbursable: 1,
      description: `${employee.role} unreported sample expense`,
      reference: `ROLE-${key}-OPEN`,
      kind: "standard",
      status: "unreported",
      deletedAt: null,
      importKey: openExpense,
    }));
    queue(db, batch, "record_registry", stamped(openExpense, orgId, stamp, {
      kind: "expenses",
      ownerId: employee.id,
    }));

    addReport(db, batch, {
      orgId,
      stamp,
      ownerId: employee.id,
      categoryId: category.id,
      prefix,
      key,
      suffix: "draft",
      name: `${employee.name} draft claim`,
      status: "draft",
      expenseStatus: "reported",
      amount: amount + 15000,
      merchant,
      date: daysAgo(6),
      approverId: reviewerId,
      submitted: false,
    });
    addReport(db, batch, {
      orgId,
      stamp,
      ownerId: employee.id,
      categoryId: category.id,
      prefix,
      key,
      suffix: "submitted",
      name: `${employee.name} submitted claim`,
      status: "submitted",
      expenseStatus: "reported",
      amount: amount + 42000,
      merchant: merchants[(index + 1) % merchants.length],
      date: daysAgo(4),
      approverId: reviewerId,
      submitted: true,
    });
    addReport(db, batch, {
      orgId,
      stamp,
      ownerId: employee.id,
      categoryId: category.id,
      prefix,
      key,
      suffix: "approved",
      name: `${employee.name} approved claim`,
      status: "approved",
      expenseStatus: "reported",
      amount: amount + 8000,
      merchant: merchants[(index + 2) % merchants.length],
      date: daysAgo(12),
      approverId: reviewerId,
      submitted: true,
    });
    addReport(db, batch, {
      orgId,
      stamp,
      ownerId: employee.id,
      categoryId: category.id,
      prefix,
      key,
      suffix: "rejected",
      name: `${employee.name} returned claim`,
      status: "rejected",
      expenseStatus: "rejected",
      amount: amount + 5000,
      merchant: merchants[(index + 3) % merchants.length],
      date: daysAgo(18),
      approverId: reviewerId,
      submitted: true,
    });

    const tripId = `${prefix}_trip`;
    queue(db, batch, "trips", stamped(tripId, orgId, stamp, {
      ownerId: employee.id,
      name: `${employee.name} client visit`,
      number: `RT-${key.toUpperCase()}-1`,
      travelType: "Domestic",
      purpose: `${employee.role} sample trip`,
      startDate: daysAgo(3),
      endDate: today,
      destination: ["Bengaluru", "Mumbai", "New Delhi", "Pune", "Hyderabad", "Chennai"][index % 6],
      approverId: reviewerId,
      status: "submitted",
    }));
    queue(db, batch, "record_registry", stamped(tripId, orgId, stamp, {
      kind: "trips",
      ownerId: employee.id,
    }));
    queue(db, batch, "itinerary_items", stamped(`${tripId}_flight`, orgId, stamp, {
      tripId,
      kind: "flight",
      startsAt: `${daysAgo(3)}T09:30:00.000Z`,
      endsAt: `${daysAgo(3)}T12:00:00.000Z`,
      fromPlace: "Mumbai",
      toPlace: "Bengaluru",
      sortOrder: 0,
      status: "requested",
    }));
    queue(db, batch, "approval_tasks", stamped(`${tripId}_task`, orgId, stamp, {
      recordId: tripId,
      module: "trips",
      approverId: reviewerId,
      step: 1,
      status: "pending",
      decisionAt: null,
      reason: null,
    }));

    const advanceId = `${prefix}_advance`;
    queue(db, batch, "advances", stamped(advanceId, orgId, stamp, {
      ownerId: employee.id,
      tripId,
      amountMinor: 1500000 + index * 100000,
      currency: "INR",
      fxMicros: 1000000,
      paidOn: daysAgo(10),
      accountId: account.id,
      reference: `ROLE-ADV-${key.toUpperCase()}`,
      notes: `${employee.role} sample advance`,
      status: "recorded",
    }));
    queue(db, batch, "record_registry", stamped(advanceId, orgId, stamp, {
      kind: "advances",
      ownerId: employee.id,
    }));

    const cardId = `${prefix}_card`;
    queue(db, batch, "cards", stamped(cardId, orgId, stamp, {
      ownerId: employee.id,
      name: `${employee.role} card`,
      bank: index % 2 === 0 ? "HDFC Bank" : "ICICI Bank",
      lastFour: String(4100 + index).slice(-4),
      currency: "INR",
      kind: "corporate",
      status: "manual",
    }));
    queue(db, batch, "card_transactions", stamped(`${cardId}_txn`, orgId, stamp, {
      cardId,
      transactionDate: daysAgo(1),
      description: merchant,
      amountMinor: amount,
      currency: "INR",
      reference: `ROLE-CARD-${key.toUpperCase()}`,
      status: "unmatched",
      importKey: `${cardId}_txn`,
    }));

    queue(db, batch, "notifications", stamped(`${prefix}_notice`, orgId, stamp, {
      ownerId: employee.id,
      title: "Sample records are ready",
      message: `Expenses, reports, a trip, an advance and a card were added for the ${employee.role} role.`,
      href: "/expenses",
      readAt: null,
    }));
    if (batch.length) {
      await db.batch(batch);
      batch.length = 0;
    }
  }

  if (!alreadySeeded) queue(db, batch, "audit_events", {
    id: `${orgId}_rolepack_audit`,
    orgId,
    actorId: admin.id,
    principalId: admin.id,
    action: "local_role_activity_seeded",
    module: "workspace",
    recordId: orgId,
    createdAt: stamp,
    data: JSON.stringify({ synthetic: true, roles: ["Admin", "Approver", "Submitter"] }),
  });

  if (batch.length) await db.batch(batch);
}

function addReport(
  db: D1Database,
  batch: D1PreparedStatement[],
  input: {
    orgId: string;
    stamp: string;
    ownerId: string;
    categoryId: string;
    prefix: string;
    key: string;
    suffix: string;
    name: string;
    status: string;
    expenseStatus: string;
    amount: number;
    merchant: string;
    date: string;
    approverId: string;
    submitted: boolean;
  },
) {
  const reportId = `${input.prefix}_report_${input.suffix}`;
  const expenseId = `${input.prefix}_expense_${input.suffix}`;
  queue(db, batch, "reports", stamped(reportId, input.orgId, input.stamp, {
    ownerId: input.ownerId,
    name: input.name,
    number: `RP-${input.key.toUpperCase()}-${input.suffix.slice(0, 3).toUpperCase()}`,
    purpose: "Role sample expense report",
    startDate: input.date,
    endDate: input.date,
    tripId: null,
    approverId: input.approverId,
    status: input.status,
    paymentStatus: "unpaid",
    submittedAt: input.submitted ? input.stamp : null,
    approvedAt: input.status === "approved" ? input.stamp : null,
    exportedAt: null,
    policySnapshot: "{}",
  }));
  queue(db, batch, "record_registry", stamped(reportId, input.orgId, input.stamp, {
    kind: "reports",
    ownerId: input.ownerId,
  }));
  queue(db, batch, "expenses", stamped(expenseId, input.orgId, input.stamp, {
    ownerId: input.ownerId,
    reportId,
    merchant: input.merchant,
    expenseDate: input.date,
    categoryId: input.categoryId,
    projectId: null,
    customerId: null,
    amountMinor: input.amount,
    currency: "INR",
    fxMicros: 1000000,
    baseAmountMinor: input.amount,
    reimbursable: 1,
    description: `${input.status} sample expense`,
    reference: `ROLE-${input.key}-${input.suffix}`.toUpperCase(),
    kind: "standard",
    status: input.expenseStatus,
    deletedAt: null,
    importKey: expenseId,
  }));
  queue(db, batch, "record_registry", stamped(expenseId, input.orgId, input.stamp, {
    kind: "expenses",
    ownerId: input.ownerId,
  }));
  if (input.status === "submitted") {
    queue(db, batch, "approval_tasks", stamped(`${reportId}_task`, input.orgId, input.stamp, {
      recordId: reportId,
      module: "reports",
      approverId: input.approverId,
      step: 1,
      status: "pending",
      decisionAt: null,
      reason: null,
    }));
  }
}
