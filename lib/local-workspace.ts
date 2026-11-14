import { alignLocalReporting, seedLocalRoleActivity } from "./local-role-data";
import {
  LOCAL_USERS,
  findLocalUserByKey,
  type LocalUser,
} from "./local-users";
import { all, database, hash, one, stmt, now } from "./server-db";

function identityRequest(user: LocalUser): Request {
  return new Request("https://local.test/api/session", {
    method: "POST",
    headers: {
      "oai-authenticated-user-id": user.authId,
      "oai-authenticated-user-email": user.email,
      "oai-authenticated-user-full-name": encodeURIComponent(user.name),
      "oai-authenticated-user-full-name-encoding": "percent-encoded-utf-8",
      "content-type": "application/json",
    },
    body: "{}",
  });
}

async function workspaceIdFor(authId: string, demo: boolean): Promise<string> {
  return `ws_${(await hash(authId + (demo ? ":demo" : ":company"))).slice(0, 24)}`;
}

async function syncRoster(orgId: string, managerAuthId: string): Promise<void> {
  const db = database();
  const roles = await all(db, "SELECT id, name FROM roles WHERE orgId=?", orgId);
  const roleIds = Object.fromEntries(roles.map((role) => [role.name, role.id]));
  const policy = await one(
    db,
    "SELECT id FROM objects WHERE orgId=? AND kind='policies' LIMIT 1",
    orgId,
  );
  if (!policy || !roleIds.Admin) return;

  const manager = await one(
    db,
    "SELECT id FROM employees WHERE orgId=? AND authId=? AND active=1",
    orgId,
    managerAuthId,
  );
  const stamp = now();

  for (const [index, user] of LOCAL_USERS.entries()) {
    const roleId = roleIds[user.role] || roleIds.Submitter;
    const existing = await one(
      db,
      "SELECT id FROM employees WHERE orgId=? AND lower(email)=?",
      orgId,
      user.email,
    );
    if (existing) {
      await stmt(
        db,
        "UPDATE employees SET authId=?, name=?, roleId=?, active=1, updatedAt=? WHERE id=? AND orgId=?",
        user.authId,
        user.name,
        roleId,
        stamp,
        existing.id,
        orgId,
      ).run();
      continue;
    }

    let departmentId: string | null = null;
    const dept = await one(
      db,
      "SELECT id FROM objects WHERE orgId=? AND kind='departments' AND name=? LIMIT 1",
      orgId,
      user.department,
    );
    if (dept) departmentId = dept.id;
    else {
      departmentId = `${orgId}_dept_local_${index}`;
      await stmt(
        db,
        'INSERT OR IGNORE INTO objects ("id","orgId","version","createdAt","updatedAt","data","kind","name","code","parentId","enabled") VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        departmentId,
        orgId,
        1,
        stamp,
        stamp,
        "{}",
        "departments",
        user.department,
        `D_L${index}`,
        null,
        1,
      ).run();
    }

    const employeeId = `${orgId}_local_${user.key}`;
    await stmt(
      db,
      'INSERT OR IGNORE INTO employees ("id","orgId","version","createdAt","updatedAt","data","authId","name","email","roleId","managerId","departmentId","policyId","active") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      employeeId,
      orgId,
      1,
      stamp,
      stamp,
      "{}",
      user.authId,
      user.name,
      user.email,
      roleId,
      user.authId === managerAuthId ? null : manager?.id || null,
      departmentId,
      policy.id,
      1,
    ).run();
  }
}

/** Ensure Seedy's company + sample workspaces exist and all local users can access them. */
export async function ensureLocalDirectory(): Promise<void> {
  const seedy = findLocalUserByKey("seedy");
  if (!seedy) return;

  // Dynamic import avoids a circular dependency with server-session.
  const { provision } = await import("./server-session");
  const seedyReq = identityRequest(seedy);
  await provision(seedyReq, false);
  await provision(seedyReq, true);

  const companyId = await workspaceIdFor(seedy.authId, false);
  const demoId = await workspaceIdFor(seedy.authId, true);
  await syncRoster(companyId, seedy.authId);
  await syncRoster(demoId, seedy.authId);
  await alignLocalReporting(companyId, seedy.authId);
  await alignLocalReporting(demoId, seedy.authId);
  await seedLocalRoleActivity(companyId);
  await seedLocalRoleActivity(demoId);
}
