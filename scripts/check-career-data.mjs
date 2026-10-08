#!/usr/bin/env node
/**
 * npm run check:career
 *
 * 1. Runs the lib/career-check.js assertions on lib/career-data.js.
 * 2. Runs the lib/coursework-check.js assertions on lib/coursework-data.js and
 *    the courseworkPage locale strings (site rules for /projects/coursework: no
 *    marks or grades, GitHub linked only for repos marked public, en and zh in step).
 * 3. Runs the lib/history-check.js assertions on lib/history-data.js
 *    (/info/history), checks both locales carry the infoHistory strings, and
 *    checks every history screenshot exists and stays under 250 KB.
 * 4. Searches the site's source for claims that were once published and are
 *    false (BANNED), so they cannot quietly come back through another file.
 * 5. Runs the lib/skills-check.js assertions for /skills: the taxonomy, every
 *    stack token mapping to a skill, the subject list, the built atlas in both
 *    locales (evidence for every skill, source-only links, props budget, no
 *    marks, grades, self-rated levels or SAPOL system names), the copy rules
 *    and a scan of the knowledge notes for marks.
 * Exits non-zero on any problem. Node 22, no dependencies.
 */
/* eslint-disable no-console -- a CLI reports to the console */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { BANNED, careerDataProblems } from "../lib/career-check.js";
import { courseworkDataProblems } from "../lib/coursework-check.js";
import { getAllPosts } from "../lib/posts.js";
import { skillsDataProblems } from "../lib/skills-check.js";
import {
  HISTORY_IMAGE_MAX_BYTES,
  historyDataProblems,
  historyImagePaths,
} from "../lib/history-check.js";

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

const courseworkCopy = ["en-AU", "zh-Hans"].map(
  (locale) =>
    JSON.parse(readFileSync(join(root, "locales", `${locale}.json`), "utf8")).courseworkPage
);
const dicts = Object.fromEntries(
  [
    ["en", "en-AU"],
    ["zh", "zh-Hans"],
  ].map(([key, locale]) => [
    key,
    JSON.parse(readFileSync(join(root, "locales", `${locale}.json`), "utf8")),
  ])
);
const posts = (await getAllPosts()).map(({ slug, title, date, tags }) => ({
  slug,
  title,
  date,
  tags,
}));
const problems = [
  ...careerDataProblems(),
  ...courseworkDataProblems(courseworkCopy),
  ...historyDataProblems(),
  ...skillsDataProblems({ dicts, posts, root }),
];

// /info/history: screenshots exist and fit the budget; both locales have the page strings.
for (const src of historyImagePaths()) {
  try {
    const { size } = statSync(join(root, "public", src));
    if (size > HISTORY_IMAGE_MAX_BYTES) {
      problems.push(`public${src} is ${Math.round(size / 1024)} KB (limit 250 KB)`);
    }
  } catch {
    problems.push(`public${src} is missing`);
  }
}
const historyKeys = Object.keys(
  JSON.parse(readFileSync(join(root, "locales", "en-AU.json"), "utf8")).infoHistory || {}
);
for (const locale of ["en-AU", "zh-Hans"]) {
  const dict = JSON.parse(readFileSync(join(root, "locales", `${locale}.json`), "utf8"));
  if (!dict.infoHistory) problems.push(`locales/${locale}.json has no infoHistory`);
  else {
    for (const key of historyKeys) {
      if (!(key in dict.infoHistory))
        problems.push(`locales/${locale}.json misses infoHistory.${key}`);
    }
  }
  if (!dict.guide?.launch || !dict.guide?.pressStart) {
    problems.push(`locales/${locale}.json misses guide.launch or guide.pressStart`);
  }
}

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
