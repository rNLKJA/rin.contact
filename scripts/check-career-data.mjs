#!/usr/bin/env node
/**
 * npm run check:career
 *
 * 1. Runs the lib/career-check.js assertions on lib/career-data.js.
 * 2. Searches the site's source for claims that were once published and are
 *    false (BANNED), so they cannot quietly come back through another file.
 * Exits non-zero on any problem. Node 22, no dependencies.
 */
/* eslint-disable no-console -- a CLI reports to the console */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { BANNED, careerDataProblems } from "../lib/career-check.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const SCAN = ["components", "pages", "lib", "locales", "posts", "public/rin.json"];
const EXT = /\.(jsx?|mjs|json|md|txt|xml)$/;
const SKIP = new Set(["lib/career-check.js"]);

function* walk(path) {
  const st = statSync(path);
  if (st.isDirectory()) {
    for (const name of readdirSync(path)) yield* walk(join(path, name));
  } else if (EXT.test(path)) {
    yield path;
  }
}

const problems = careerDataProblems();

for (const entry of SCAN) {
  const start = join(root, entry);
  try {
    statSync(start);
  } catch {
    continue;
  }
  for (const file of walk(start)) {
    const rel = relative(root, file);
    if (SKIP.has(rel)) continue;
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const b of BANNED) {
        if (line.includes(b)) problems.push(`${rel}:${i + 1} contains "${b}"`);
      }
    });
  }
}

if (problems.length) {
  console.error(`Career content check failed (${problems.length}):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("Career content check passed.");
