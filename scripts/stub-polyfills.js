/**
 * Replaces Next.js's hardcoded polyfill-module.js with an empty stub.
 * All polyfilled features (Array.at, Object.hasOwn, Array.flat, etc.) are
 * natively supported by our browserslist target: last 2 Chrome/Firefox/Safari/Edge.
 * Runs automatically after `npm install` via the postinstall hook.
 */
const fs = require("fs");
const path = require("path");

const target = path.resolve(
  __dirname,
  "../node_modules/next/dist/build/polyfills/polyfill-module.js"
);

if (fs.existsSync(target)) {
  fs.writeFileSync(target, "// stubbed — modern browsers support these natively\n");
  console.log("✓ next/polyfill-module stubbed (modern browsers only)");
} else {
  console.warn("⚠ polyfill-module.js not found — skipping stub");
}
