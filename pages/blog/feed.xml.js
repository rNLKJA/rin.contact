/**
 * RSS feed for the blog — generated server-side, follows the same pattern
 * as the existing sitemap.xml.js generator.
 */
import { getAllPosts } from "@/lib/posts";

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRssXml(posts) {
  const siteUrl = "https://rin.contact";
  const blogUrl = `${siteUrl}/blog`;
  const lastBuild = posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const items = posts
    .map(
      (p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${siteUrl}/blog/${esc(p.slug)}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${esc(p.slug)}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <atom:link href="${blogUrl}/feed.xml" rel="self" type="application/rss+xml"/>
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
  const posts = await getAllPosts();
  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=43200");
  res.write(generateRssXml(posts));
  res.end();
  return { props: {} };
}

export default function RssFeed() {
  return null;
}
