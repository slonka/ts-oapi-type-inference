async function getRoot() {
    const res = await fetch("http://localhost:8080/", {
        method: "GET",
        headers: { "Accept": "application/json" },
    });
    const data = (await res.json());
    // Now TypeScript thinks it's definitely UserResponse
    console.log("Username:", data.username);
    console.log("Email:", data.email);
}
export {};
