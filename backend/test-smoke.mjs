import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const required = ["server.js","models/User.js","models/Destination.js","controllers/authController.js","controllers/itineraryController.js","routes/adminRoutes.js"];
for (const file of required) assert.equal(fs.existsSync(path.join(root,file)), true, `Missing ${file}`);
const pkg = JSON.parse(fs.readFileSync(path.join(root,"package.json"),"utf8"));
assert.equal(typeof pkg.scripts.start,"string");
console.log("Wayfarer backend smoke test passed");
