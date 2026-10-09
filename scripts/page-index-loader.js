/**
 * Webpack loader for lib/page-index.data.js (wired up in next.config.js).
 * It swaps the placeholder for the page index that scripts/page-index.mjs
 * builds from pages/, posts/, the locales and the lib/ data, so the index is
 * made at build time by every build (Vercel, CI, next dev) and cannot drift.
 *
 * The script runs in a child Node process with --no-warnings: the lib/ modules
 * are ES modules in a package without "type", and Node would otherwise print
 * its module-type notice into the build log. The directories it reads are
 * declared as dependencies, so next dev rebuilds the index when they change.
 */
const { execFileSync } = require("node:child_process");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SCRIPT = path.join(ROOT, "scripts", "page-index.mjs");

module.exports = function pageIndexLoader() {
  for (const dir of ["pages", "posts", "locales", "lib"]) {
    this.addContextDependency(path.join(ROOT, dir));
  }
  this.addDependency(SCRIPT);
  const json = execFileSync(process.execPath, ["--no-warnings", SCRIPT], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  return `export default ${json.trim()};\n`;
};
