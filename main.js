// Typed fetch function
async function fetchEntity(url) {
    const res = await fetch(`http://localhost:8080${url}`, { headers: { "Accept": "application/json" } });
    if (!res.ok)
        throw new Error(`HTTP error! ${res.status}`);
    return res.json();
}
async function run() {
    const user = await fetchEntity("/_kri/kri_user_mesh-1_zone-uni__backend_8080");
    console.log("User:", user.username, user.email); // TypeScript infers UserResponse
    console.log("\n");
    const admin = await fetchEntity("/_kri/kri_admin_mesh-1_zone-uni__backend_8080");
    console.log("Admin:", admin.admin_id, admin.permissions); // TypeScript infers AdminResponse
}
run().catch(console.error);
export {};
