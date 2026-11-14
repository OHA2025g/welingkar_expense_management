export type LocalUser = {
  key: string;
  authId: string;
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Approver" | "Submitter";
  department: string;
};

/** Demo accounts for Docker / local mock auth only. */
export const LOCAL_USERS: LocalUser[] = [
  {
    key: "seedy",
    authId: "local_seedy",
    name: "Seedy",
    email: "seedy@sites.test",
    password: "Admin@123",
    role: "Admin",
    department: "Finance",
  },
  {
    key: "maya",
    authId: "local_maya",
    name: "Maya Shah",
    email: "maya.shah@example.test",
    password: "Approver@123",
    role: "Approver",
    department: "Finance",
  },
  {
    key: "rohan",
    authId: "local_rohan",
    name: "Rohan Mehta",
    email: "rohan.mehta@example.test",
    password: "Submitter@123",
    role: "Submitter",
    department: "Engineering",
  },
  {
    key: "ananya",
    authId: "local_ananya",
    name: "Ananya Rao",
    email: "ananya.rao@example.test",
    password: "Submitter@123",
    role: "Submitter",
    department: "Sales",
  },
  {
    key: "arjun",
    authId: "local_arjun",
    name: "Arjun Nair",
    email: "arjun.nair@example.test",
    password: "Submitter@123",
    role: "Submitter",
    department: "Operations",
  },
  {
    key: "priya",
    authId: "local_priya",
    name: "Priya Kapoor",
    email: "priya.kapoor@example.test",
    password: "Admin@123",
    role: "Admin",
    department: "Finance",
  },
];

export const LOCAL_COMPANY_WORKSPACE_ID = "ws_local_shared_company";
export const LOCAL_DEMO_WORKSPACE_ID = "ws_local_shared_demo";

export function isLocalAuthId(authId: string): boolean {
  return authId.startsWith("local_");
}

export function findLocalUserByKey(key: string): LocalUser | undefined {
  return LOCAL_USERS.find((user) => user.key === key);
}

export function findLocalUserByEmail(email: string): LocalUser | undefined {
  const normalized = email.trim().toLowerCase();
  return LOCAL_USERS.find((user) => user.email === normalized);
}

export function authenticateLocalUser(
  email: string,
  password: string,
): LocalUser | undefined {
  const user = findLocalUserByEmail(email);
  if (!user || user.password !== password) return undefined;
  return user;
}
