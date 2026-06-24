/**
 * RSS feed for the blog — generated server-side, follows the same pattern
 * as the existing sitemap.xml.js generator.
 *
 * Full-content feed: each item carries the whole post in <content:encoded> so
 * subscribers can read it in their reader (and aggregators can republish it),
 * not just the one-line description. Relative links/images are rewritten to
 * absolute URLs so they resolve outside the site.
 */
import { getAllPosts, getPostBySlug } from "@/lib/posts";

const SITE_URL = "https://rin.contact";

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Make in-site links/images absolute so they work in feed readers, and keep the
// content safe inside a CDATA block (split any literal "]]>" sequence).
function absolutise(html) {
  return String(html || "").replace(/(href|src)="\//g, `$1="${SITE_URL}/`);
}
function cdata(html) {
  return `<![CDATA[${String(html || "").replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function generateRssXml(posts) {
  const blogUrl = `${SITE_URL}/blog/`;
  const lastBuild = posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${esc(p.slug)}/`;
      const categories = (p.tags || []).map((t) => `\n      <category>${esc(t)}</category>`).join("");
      const content = p.contentHtml
        ? `\n      <content:encoded>${cdata(absolutise(p.contentHtml))}</content:encoded>`
        : "";
      return `
    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>${categories}${content}
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <title>Rin Huang — Blog</title>
    <link>${blogUrl}</link>
    <description>Thoughts on data science, intelligence frameworks, analytics engineering, and building things that compound.</description>
    <language>en-au</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}

export async function getServerSideProps({ res }) {
  const meta = await getAllPosts();
  // getAllPosts returns metadata only; pull the rendered HTML per post so the
  // feed can carry full content. Cached for a day, so 18 lookups is cheap.
  const posts = await Promise.all(
    meta.map(async (m) => {
      const full = await getPostBySlug(m.slug);
      return { ...m, contentHtml: full?.contentHtml || "" };
    })
  );
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=43200");
  res.write(generateRssXml(posts));
  res.end();
  return { props: {} };
}

export default function RssFeed() {
  return null;
}
