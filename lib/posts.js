/**
 * posts.js — Blog content utilities
 *
 * Reads Markdown files from the posts/ directory and compiles them
 * to HTML at build time (getStaticProps). Mermaid code blocks are
 * transformed to <div class="mermaid"> for client-side rendering.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import { visit } from "unist-util-visit";

const POSTS_DIR = path.join(process.cwd(), "posts");

/**
 * Custom remark plugin — transforms ```mermaid code blocks into
 * <div class="mermaid"> for client-side rendering by the mermaid library.
 */
function remarkMermaidPlugin() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang === "mermaid") {
        node.type = "html";
        node.value = `<div class="mermaid">\n${node.value}\n</div>`;
      }
    });
  };
}

/** Parse a single .md file and return its metadata + HTML body. */
async function parsePost(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // remark-html & remark-gfm are ESM-only — use dynamic import
  const { default: remarkHtml } = await import("remark-html");
  const { default: remarkGfm } = await import("remark-gfm");
  const processor = remark().use(remarkGfm).use(remarkMermaidPlugin).use(remarkHtml, { sanitize: false });
  const result = processor.processSync(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || null,
    tags: data.tags || [],
    description: data.description || "",
    ogImage: data.ogImage || null,
    contentHtml: String(result),
  };
}

/** Return all posts sorted by date descending. */
export async function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (f) => {
      const slug = f.replace(/\.md$/, "");
      const { title, date, tags, description, ogImage } = await parsePost(slug);
      return { slug, title, date, tags, description, ogImage };
    })
  );
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
