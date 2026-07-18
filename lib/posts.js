/**
 * posts.js — Blog content utilities
 *
 * Reads Markdown files from the posts/ directory and compiles them
 * to HTML at build time (getStaticProps). ```flow and ```bars code
 * blocks are transformed to self-contained, on-brand HTML at build
 * time — no diagram library ships to the client.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import { visit } from "unist-util-visit";

const POSTS_DIR = path.join(process.cwd(), "posts");

/** Minimal HTML-escape for label text coming from the markdown source. */
function esc(s = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Render a ```flow block to HTML.
 *
 * Tiny line-based DSL (one node per line; 2-space indent for children):
 *   step  <label>                 a sequential step
 *   decision <label>              an either/or node (OR fan-out)
 *   split <label>                 a parallel fan-out (AND)
 *   join  <label>                 a node where inputs merge
 *     branch <key> -> <outcome>   an outcome under a decision/split
 *     from   <input>              an input feeding a join
 *   loop  [<label>]               marks the flow as cyclic (back to start)
 *   note  <text>                  a small caption under the diagram
 *
 * Plain lines with no keyword are treated as steps, so simple linear flows
 * can be written as a bare list of labels. Flows with no decision/split/join
 * render as horizontal chips; anything branching renders as a vertical stepper.
 */
function renderFlow(src) {
  const lines = src
    .split("\n")
    .map((l) => l.replace(/\s+$/, ""))
    .filter((l) => l.trim());
  const nodes = [];
  let loop = null;
  let note = null;

  for (const raw of lines) {
    const indented = /^\s{2,}/.test(raw);
    const line = raw.trim();
    const sp = line.indexOf(" ");
    const kw = (sp === -1 ? line : line.slice(0, sp)).toLowerCase();
    const rest = sp === -1 ? "" : line.slice(sp + 1).trim();

    if (indented && (kw === "branch" || kw === "from")) {
      const parent = nodes[nodes.length - 1];
      if (!parent) continue;
      (parent.children || (parent.children = [])).push(
        kw === "from"
          ? { key: null, out: rest }
          : (() => {
              const m = rest.split(/\s*->\s*/);
              return m.length > 1
                ? { key: m[0], out: m.slice(1).join(" -> ") }
                : { key: null, out: rest };
            })()
      );
      continue;
    }
    if (kw === "loop") {
      loop = rest || "loops back to the start";
      continue;
    }
    if (kw === "note") {
      note = rest;
      continue;
    }
    if (kw === "step" || kw === "decision" || kw === "split" || kw === "join") {
      nodes.push({ kind: kw, label: rest });
    } else {
      nodes.push({ kind: "step", label: line });
    }
  }

  const branching = nodes.some((n) => ["decision", "split", "join"].includes(n.kind));
  const aria = esc(nodes.map((n) => n.label).join(" then "));
  const kindWord = { decision: "decides", split: "splits", join: "merges" };

  if (!branching) {
    const chips = nodes
      .map(
        (n, i) =>
          `<span class="flow-node"><span class="flow-idx">${i + 1}</span><span class="flow-label">${esc(n.label)}</span></span>`
      )
      .join('<span class="flow-arrow" aria-hidden="true">→</span>');
    const loopHtml = loop ? `<div class="flow-loop">↻ ${esc(loop)}</div>` : "";
    const noteHtml = note ? `<div class="flow-note">${esc(note)}</div>` : "";
    return `<div class="flow flow--linear" role="img" aria-label="Workflow: ${aria}"><div class="flow-track">${chips}</div>${loopHtml}${noteHtml}</div>`;
  }

  let idx = 0;
  const rows = nodes
    .map((n) => {
      const isStep = n.kind === "step";
      const badge = isStep
        ? `<span class="flow-idx">${++idx}</span>`
        : `<span class="flow-kind">${kindWord[n.kind]}</span>`;
      const children = (n.children || [])
        .map(
          (c) =>
            `<div class="flow-branch">${
              c.key ? `<span class="flow-branch-label">${esc(c.key)}</span>` : ""
            }<span class="flow-branch-arrow" aria-hidden="true">→</span><span class="flow-branch-out">${esc(c.out)}</span></div>`
        )
        .join("");
      const childHtml = children ? `<div class="flow-branches">${children}</div>` : "";
      return `<div class="flow-row flow-row--${n.kind}"><span class="flow-cell">${badge}<span class="flow-label">${esc(n.label)}</span></span>${childHtml}</div>`;
    })
    .join("");
  const loopHtml = loop ? `<div class="flow-loop">↻ ${esc(loop)}</div>` : "";
  const noteHtml = note ? `<div class="flow-note">${esc(note)}</div>` : "";
  return `<div class="flow flow--stepper" role="img" aria-label="Workflow: ${aria}"><div class="flow-rail">${rows}</div>${loopHtml}${noteHtml}</div>`;
}

/** Render a ```bars block (proportional bars) to HTML. Each line: "<number> <label>". */
function renderBars(src) {
  const rows = src
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const m = l.match(/^([\d.]+)\s+(.*)$/);
      return m ? { val: parseFloat(m[1]), raw: m[1], label: m[2] } : null;
    })
    .filter(Boolean);
  const max = Math.max(...rows.map((r) => r.val), 1);
  const bars = rows
    .map(
      (r) =>
        `<div class="flowbar"><div class="flowbar-head"><span class="flowbar-label">${esc(
          r.label
        )}</span><span class="flowbar-val">${esc(r.raw)}</span></div><div class="flowbar-track"><div class="flowbar-fill" style="width:${(
          (r.val / max) *
          100
        ).toFixed(1)}%"></div></div></div>`
    )
    .join("");
  return `<div class="flowbars" role="img" aria-label="${esc(rows.map((r) => `${r.raw} ${r.label}`).join(", "))}">${bars}</div>`;
}

/**
 * Custom remark plugin — transforms ```flow and ```bars code blocks into
 * self-contained styled HTML at build time (no client-side diagram library).
 */
function remarkFlowPlugin() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang === "flow") {
        node.type = "html";
        node.value = renderFlow(node.value);
      } else if (node.lang === "bars") {
        node.type = "html";
        node.value = renderBars(node.value);
      }
    });
  };
}

/** Read + frontmatter-parse a single .md file. Cheap — no remark pipeline. */
function readFrontmatter(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw); // { data, content }
}

/** Build the metadata object shared by parseMeta and parsePost. */
function metaFromFrontmatter(slug, data, content) {
  // Reading time from the markdown source (~200 wpm), min 1 minute.
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(words / 200));
  return {
    slug,
    title: data.title || slug,
    date: data.date || null,
    tags: data.tags || [],
    description: data.description || "",
    ogImage: data.ogImage || null,
    readingTime,
  };
}

/**
 * Metadata only — no remark pipeline. Used by getAllPosts(), which needs
 * every post's frontmatter but never renders their bodies. Keeping this
 * separate from parsePost() turns /blog/[slug]'s per-page build cost from
 * O(N) full-content parses (one per other post, just to get its title) into
 * O(1): only the current slug goes through the expensive remark pipeline.
 */
function parseMeta(slug) {
  const { data, content } = readFrontmatter(slug);
  return metaFromFrontmatter(slug, data, content);
}

/** Parse a single .md file and return its metadata + HTML body. */
async function parsePost(slug) {
  const { data, content } = readFrontmatter(slug);
  const meta = metaFromFrontmatter(slug, data, content);

  // remark-html & remark-gfm are ESM-only — use dynamic import
  const { default: remarkHtml } = await import("remark-html");
  const { default: remarkGfm } = await import("remark-gfm");
  const processor = remark()
    .use(remarkGfm)
    .use(remarkFlowPlugin)
    .use(remarkHtml, { sanitize: false });
  const result = processor.processSync(content);

  return { ...meta, contentHtml: String(result) };
}

/** Return all posts sorted by date descending. */
export async function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((f) => parseMeta(f.replace(/\.md$/, "")));
  return posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

/** Return a single post (with full HTML content). */
export async function getPostBySlug(slug) {
  return parsePost(slug);
}

/** Return all slugs (for getStaticPaths). */
export function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
