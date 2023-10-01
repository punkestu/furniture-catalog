const jwt = require("../lib/jwt");
const assert = require("assert");

async function main() {
    const payload = {ID: "hello", role: "client"};
    const token = jwt.Sign(payload);
    const {ID, role} = jwt.Verify(token);
    assert.deepEqual({ID, role}, payload, "failed");
}

main().then(()=>console.log("done"));