/**
 * Generates the dot-matrix covers as static SVG under public/covers/:
 *
 *   projects/<id>.svg      the cover for every project (1C), also shown inside
 *                          a case study's arch frame (4A)
 *   posts/<slug>.svg       the blog cover that plots a post's own numbers (2C)
 *   *.red.svg              the red overlay, only where something is current
 *
 * Covers are deterministic (seeded per project and post), so a re-run with
 * no data change leaves git clean. The ink layer is drawn in #1A1A1A and the
 * pages invert it for the dark theme; red sits in its own file so it stays
 * #FF3C3C in both themes.
 *
 * Also writes lib/covers/post-covers.json, the post cover specs the share
 * image route (pages/api/og.jsx) needs at the Edge, where posts/ is not on disk.
 *
 * Run: node scripts/generate-covers.mjs [--check]
 *   --check  exit 1 if any generated file differs from what is committed.
 */
/* eslint-disable no-console -- a build-time CLI that reports what it wrote */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECTS } from "../lib/projects-data.js";
import { PROJECT_COVERS, COVER_GRID, coverBox } from "../lib/covers/projects.js";
import { renderProjectCover } from "../lib/covers/render.js";
import matter from "gray-matter";
import { postCoverSpec, renderPostCover, POST_GRID } from "../lib/covers/posts.js";
import { renderSVG, hasRed } from "../lib/dotmatrix/core.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "covers");
const check = process.argv.includes("--check");
const changed = [];

function write(rel, content) {
  const file = path.join(ROOT, rel);
  const prev = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (prev === content) return;
  changed.push(rel);
  if (check) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function emit(dir, name, F, grid, title) {
  const opts = { pitch: grid.pitch, title };
  write(path.join("public", "covers", dir, `${name}.svg`), renderSVG(F, { ...opts, layer: "ink" }));
  const redFile = path.join("public", "covers", dir, `${name}.red.svg`);
  if (hasRed(F)) write(redFile, renderSVG(F, { ...opts, layer: "red", base: false }));
  else if (fs.existsSync(path.join(ROOT, redFile))) {
    changed.push(`${redFile} (stale)`);
    if (!check) fs.unlinkSync(path.join(ROOT, redFile));
  }
}

// 1C project covers. Red is reserved for current work, so a cover with red
// on a project that is not current (or the reverse) fails the build.
const manifest = {};
for (const p of PROJECTS) {
  if (!PROJECT_COVERS[p.id])
    throw new Error(`No cover form for project "${p.id}" in lib/covers/projects.js`);
  const card = renderProjectCover(p.id, COVER_GRID, coverBox(COVER_GRID.cols, COVER_GRID.rows));
  if (hasRed(card) !== Boolean(p.current)) {
    throw new Error(
      `Cover for "${p.id}": red must mark current work only (current: ${Boolean(p.current)}, red: ${hasRed(card)})`
    );
  }
  emit("projects", p.id, card, COVER_GRID, p.title);
  manifest[p.id] = {
    title: p.title,
    form: PROJECT_COVERS[p.id].form,
    alt: PROJECT_COVERS[p.id].alt,
    current: Boolean(p.current),
    period: p.period,
  };
}
write(path.join("lib", "covers", "project-covers.json"), `${JSON.stringify(manifest, null, 2)}\n`);

// 2C post covers. postCoverSpec throws if a cover plots a number the post
// does not state.
const POSTS_DIR = path.join(ROOT, "posts");
const posts = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md"))
  .sort()
  .map((f) => {
    const slug = f.replace(/\.md$/, "");
    const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, f), "utf8"));
    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      cover: postCoverSpec(slug, data, content),
    };
  });
for (const post of posts) {
  const F = renderPostCover(post, POST_GRID);
  emit("posts", post.slug, F, POST_GRID, post.title);
}
write(
  path.join("lib", "covers", "post-covers.json"),
  `${JSON.stringify(
    Object.fromEntries(posts.map(({ slug, title, cover }) => [slug, { title, ...cover }])),
    null,
    2
  )}\n`
);

// Drop covers for projects or posts that no longer exist.
for (const [dir, keep] of [
  ["projects", PROJECTS.map((p) => p.id)],
  ["posts", posts.map((p) => p.slug)],
]) {
  const d = path.join(OUT, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    const name = f.replace(/(\.red)?\.svg$/, "");
    if (!keep.includes(name)) {
      changed.push(`public/covers/${dir}/${f} (orphan)`);
      if (!check) fs.unlinkSync(path.join(d, f));
    }
  }
}

if (check) {
  if (changed.length) {
    console.error(
      `Covers are out of date (run node scripts/generate-covers.mjs):\n  ${changed.join("\n  ")}`
    );
    process.exit(1);
  }
  console.log("covers: up to date");
} else {
  console.log(`covers: ${changed.length ? `${changed.length} file(s) written` : "up to date"}`);
}
