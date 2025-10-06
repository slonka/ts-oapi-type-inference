// Typed fetch function
async function fetchEntity(url) {
    const res = await fetch(`http://localhost:8080${url}`, { headers: { "Accept": "application/json" } });
    if (!res.ok)
        throw new Error(`HTTP error! ${res.status}`);
    return res.json();
}
// Read URL from command line arguments
const arg = process.argv[2];
if (!arg) {
    console.error("Usage: ts-node main.ts <url>");
    process.exit(1);
}
// Type assertion to satisfy TypeScript
const url = arg;
async function run() {
    const user = await fetchEntity(url);
    console.log("Response:", user);
}
run().catch(console.error);
export {};
