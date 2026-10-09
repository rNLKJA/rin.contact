/**
 * Checks for the concept notes registry (lib/knowledge-notes.js), run by
 * npm run check:career. Node only (reads the file system), no dependencies.
 *
 * - Every note has a kebab-case slug used once, a parent that is a live
 *   Knowledge topic, a known status, and its title, line and reading time in
 *   both languages.
 * - A live note has its page wrapper (pages/knowledge/notes/<slug>.jsx) and
 *   its content module (components/knowledge/notes/<slug>.jsx). A draft note
 *   has no page yet, and every page under pages/knowledge/notes/ is a live note.
 * - Note content shows no marks and keeps to the voice rules that a script can
 *   check: no spaced em dash, and no Chinese double dash.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { KNOWLEDGE_TIERS, knowledgeSlug } from "./knowledge-index.js";
import { KNOWLEDGE_NOTES } from "./knowledge-notes.js";
import { MARK_PATTERN } from "./skills-check.js";

const STATUSES = new Set(["live", "draft"]);
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DASHES = [
  { text: " — ", why: "a spaced em dash" },
  { text: "——", why: "a Chinese double dash" },
];

const exists = (path) => {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
};

const listJsx = (dir) => {
  try {
    return readdirSync(dir).filter((f) => /\.jsx?$/.test(f));
  } catch {
    return [];
  }
};

export function knowledgeNoteProblems(root = process.cwd()) {
  const problems = [];
  const liveTopics = new Set(
    KNOWLEDGE_TIERS.flatMap((t) => t.topics)
      .filter((tp) => tp.status === "live")
      .map((tp) => knowledgeSlug(tp.href))
  );
  const seen = new Set();

  for (const note of KNOWLEDGE_NOTES) {
    const where = `lib/knowledge-notes.js: ${note.slug || "(no slug)"}`;
    if (!SLUG.test(note.slug || "")) problems.push(`${where} has a slug that is not kebab-case`);
    if (seen.has(note.slug)) problems.push(`${where} is listed twice`);
    seen.add(note.slug);
    if (!liveTopics.has(note.parent)) {
      problems.push(`${where} sits under "${note.parent}", which is not a live Knowledge topic`);
    }
    if (!STATUSES.has(note.status)) problems.push(`${where} has unknown status "${note.status}"`);
    if (!Number.isFinite(note.order)) problems.push(`${where} has no order`);
    for (const field of ["title", "note", "readingTime"]) {
      for (const lang of ["en", "zh"]) {
        if (typeof note[field]?.[lang] !== "string" || !note[field][lang].trim()) {
          problems.push(`${where} has no ${lang} ${field}`);
        }
      }
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(note.updated || "")) {
      problems.push(`${where} has no updated date (YYYY-MM-DD)`);
    }
    const page = join(root, "pages", "knowledge", "notes", `${note.slug}.jsx`);
    const content = join(root, "components", "knowledge", "notes", `${note.slug}.jsx`);
    if (note.status === "live") {
      if (!exists(page)) problems.push(`${where} is live but has no pages/knowledge/notes page`);
      if (!exists(content)) {
        problems.push(`${where} is live but has no components/knowledge/notes content`);
      }
    } else if (exists(page)) {
      problems.push(`${where} is a draft but already has a page under pages/knowledge/notes`);
    }
  }

  const live = new Set(KNOWLEDGE_NOTES.filter((n) => n.status === "live").map((n) => n.slug));
  for (const file of listJsx(join(root, "pages", "knowledge", "notes"))) {
    const slug = file.replace(/\.jsx?$/, "");
    if (!live.has(slug)) {
      problems.push(`pages/knowledge/notes/${file} has no live entry in lib/knowledge-notes.js`);
    }
  }

  const dir = join(root, "components", "knowledge", "notes");
  for (const file of listJsx(dir)) {
    readFileSync(join(dir, file), "utf8")
      .split("\n")
      .forEach((line, i) => {
        const where = `components/knowledge/notes/${file}:${i + 1}`;
        const mark = line.match(MARK_PATTERN);
        if (mark) problems.push(`${where} shows a mark ${mark[0]}`);
        for (const d of DASHES) {
          if (line.includes(d.text)) problems.push(`${where} uses ${d.why}`);
        }
      });
  }

  return problems;
}
