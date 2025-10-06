import type { components } from "./schema";

// Map the key we care about to the response type
type KeyMap = {
  user: components["schemas"]["UserResponse"];
  admin: components["schemas"]["AdminResponse"];
};

// URL type
type EntityURL = `/_kri/${string}`;

// Extract key from URL
type KeyFromURL<T extends EntityURL> =
  T extends `/_kri/kri_${infer K}_${string}` ? K : never;

// Map URL to response type
type ResponseForURL<T extends EntityURL> =
  KeyFromURL<T> extends keyof KeyMap ? KeyMap[KeyFromURL<T>] : never;

// Typed fetch function
async function fetchEntity<T extends EntityURL>(url: T): Promise<ResponseForURL<T>> {
  const res = await fetch(`http://localhost:8080${url}`, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
  return res.json() as Promise<ResponseForURL<T>>;
}

async function run() {
  const user = await fetchEntity("/_kri/kri_user_mesh-1_zone-uni__backend_8080");
  console.log("User:", user.username, user.email); // TypeScript infers UserResponse
  console.log("\n")
  const admin = await fetchEntity("/_kri/kri_admin_mesh-1_zone-uni__backend_8080");
  console.log("Admin:", admin.admin_id, admin.permissions); // TypeScript infers AdminResponse
}

run().catch(console.error);
