/**
 * Dynamic sitemap for rin.contact — v5.22.1
 * Excludes all pages with <meta name="robots" content="noindex">
 */

import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://rin.contact";

// ── Image sitemap (Google Image Search) ───────────────────────────────────────
const IMAGES = [
  { loc: `${BASE_URL}/images/meta-image.png`, title: "Rin Huang — Portfolio", caption: "Senior Data Analyst & Research Software Engineer, Adelaide, Australia", license: BASE_URL },
  { loc: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Coat_of_arms_of_the_South_Australia_Police.svg", title: "South Australia Police", caption: "ASO7 Senior Data Analyst — SAPOL Professional & Ethical Standards Branch", license: "https://www.police.sa.gov.au" },
  { loc: "https://media.licdn.com/dms/image/v2/C560BAQEbZveHn7HVCQ/company-logo_200_200/company-logo_200_200/0/1630651674988/attorney_generals_logo?e=2147483647&v=beta&t=V5cMKtM1QRUW0fqwpysEvD4iHxPO5FmaPoXIJpNQs5c", title: "CBS — Attorney-General's Department SA", caption: "ASO4 Intelligence & Coordination Officer, Jan 2025–Mar 2026", license: "https://www.agd.sa.gov.au" },
  { loc: "https://yt3.googleusercontent.com/wD1YaCDSytQDbDcSAkR21j8IQTl9lyC6LDr3p5ZC2yGX-RzU1ayGmn6swOS_LLzMKpvyA--UJQY=s176-c-k-c0x00ffffff-no-rj-mo", title: "University of Melbourne", caption: "Master of Data Science, Bachelor of Science, STEM Mentor", license: "https://www.unimelb.edu.au" },
  { loc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRIgIQHaq6ZhUDwJUqfFa5xZJ9Tn5f6YLBA&s", title: "WEHI — Biomedical Research", caption: "Software Engineer Intern — Bioinformatics, Feb–Jul 2024", license: "https://www.wehi.edu.au" },
  { loc: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/CSIRO_Logo.svg/120px-CSIRO_Logo.svg.png", title: "CSIRO", caption: "Data Science Consultant — Climate & Earth Systems, Feb–Nov 2023", license: "https://www.csiro.au" },
  { loc: "https://s3-symbol-logo.tradingview.com/csl--600.png", title: "CSL Behring", caption: "Data Analyst & Agile Leader — R&D, Feb–Jun 2022", license: "https://www.csl.com" },
  { loc: "https://media.licdn.com/dms/image/v2/C560BAQHbsXv7y0802A/company-logo_200_200/company-logo_200_200/0/1630627937392/trinityunimelb_logo?e=2147483647&v=beta&t=L-l1ISC0casA8uKqb1QYyFZWMyfe9n8A_tuT_MyOG_c", title: "Trinity College, Unimelb", caption: "Foundation Studies Programme, 2018–2019", license: "https://www.trinity.unimelb.edu.au" },
];

// ── Core pages ────────────────────────────────────────────────────────────────
const CORE = [
  { path: "/",               priority: 1.0, freq: "weekly",  hreflang: true },
  { path: "/career",         priority: 0.9, freq: "monthly" },
  { path: "/strategic",      priority: 0.9, freq: "monthly" },
  { path: "/projects",       priority: 0.9, freq: "monthly" },
  { path: "/projects/signal", priority: 0.8, freq: "monthly" },
  { path: "/about",          priority: 0.8, freq: "monthly" },
  { path: "/lab",            priority: 0.8, freq: "monthly" },
  { path: "/resume",         priority: 0.7, freq: "monthly" },
  { path: "/cv",             priority: 0.8, freq: "monthly" },
  { path: "/hire-me",        priority: 0.7, freq: "monthly" },
  { path: "/tools/card",     priority: 0.7, freq: "monthly" },
  { path: "/blog",           priority: 0.8, freq: "weekly"  },
];

// ── zh-Hans pages (Tier 1 translations) ───────────────────────────────────────
const ZH_PAGES = [
  { path: "/",        priority: 1.0, freq: "weekly" },
  { path: "/about",   priority: 0.8, freq: "monthly" },
  { path: "/resume",  priority: 0.7, freq: "monthly" },
  { path: "/hire-me", priority: 0.7, freq: "monthly" },
];

// ── Section index pages ───────────────────────────────────────────────────────
const INDEXES = [
  { path: "/knowledge",      priority: 0.7, freq: "weekly" },
  { path: "/ds",             priority: 0.6, freq: "monthly" },
  { path: "/info",           priority: 0.5, freq: "monthly" },
  { path: "/tools",          priority: 0.5, freq: "monthly" },
  { path: "/fun",            priority: 0.4, freq: "monthly" },
];

// ── Knowledge topic pages (thorough, indexable explainers) ────────────────────
const KNOWLEDGE = [
  { path: "/knowledge/natural-language-processing", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/linear-algebra", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/probability", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/statistics", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/calculus-optimisation", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/statistical-machine-learning", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/linear-statistical-models", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/database-systems", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/bayesian-statistics", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/artificial-intelligence", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/pca-dimensionality-reduction", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/clustering", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/web-information-technology", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/operations-research", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/cluster-cloud-computing", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/elements-of-data-processing", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/statistical-modelling", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/applied-data-science", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/computational-statistics", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/advanced-database-systems", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/science-communication", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/business-intelligence-dashboards", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/geospatial-analysis", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/data-science-mentoring", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/intelligence-analysis", priority: 0.6, freq: "monthly" },
  { path: "/knowledge/data-governance", priority: 0.6, freq: "monthly" },
];

// ── Info sub-pages (all indexable — no noindex meta) ──────────────────────────
const INFO = [
  { path: "/info/now",             priority: 0.6, freq: "weekly" },
  { path: "/info/accessibility",   priority: 0.6, freq: "monthly" },
  { path: "/info/uses",            priority: 0.5, freq: "monthly" },
  { path: "/info/api",             priority: 0.5, freq: "monthly" },
  { path: "/info/roadmap",         priority: 0.5, freq: "monthly" },
  { path: "/info/changelog",       priority: 0.4, freq: "monthly" },
  { path: "/info/colophon",        priority: 0.4, freq: "monthly" },
  { path: "/info/references",      priority: 0.4, freq: "monthly" },
  { path: "/info/thank-you",       priority: 0.4, freq: "monthly" },
  { path: "/info/site-map",        priority: 0.3, freq: "monthly" },
  { path: "/info/manifest",        priority: 0.3, freq: "yearly" },
];

// ── XML helpers ────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function imageXml(img) {
  return [
    "    <image:image>",
    `      <image:loc>${esc(img.loc)}</image:loc>`,
    `      <image:title>${esc(img.title)}</image:title>`,
    `      <image:caption>${esc(img.caption)}</image:caption>`,
    `      <image:license>${esc(img.license)}</image:license>`,
    "    </image:image>",
  ].join("\n");
}

// The site is trailingSlash:true, so the canonical URL for every page ends with
// a "/". Emit that form here so crawlers index the real URL instead of following
// a 308 redirect from the slash-less variant.
function withTrailingSlash(path) {
  return path.endsWith("/") ? path : `${path}/`;
}

function urlXml({ path, priority, freq }, today, extra = "") {
  return [
    "  <url>",
    `    <loc>${BASE_URL}${withTrailingSlash(path)}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <changefreq>${freq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    extra,
    "  </url>",
  ].filter(Boolean).join("\n");
}

// ── Generate ───────────────────────────────────────────────────────────────────
async function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  const imageExtra = IMAGES.map(imageXml).join("\n");

  const posts = await getAllPosts();
  const blogPostUrls = posts.map((p) =>
    urlXml({ path: `/blog/${p.slug}`, priority: 0.7, freq: "monthly" }, today)
  );

  const urls = [
    // Homepage with hreflang + image sitemap
    urlXml({ path: "/", priority: 1.0, freq: "weekly" }, today, [
      `    <xhtml:link rel="alternate" hreflang="en-AU"     href="${BASE_URL}/"/>`,
      `    <xhtml:link rel="alternate" hreflang="zh-Hans"   href="${BASE_URL}/zh-Hans/"/>`,
      `    <xhtml:link rel="alternate" hreflang="x-default"  href="${BASE_URL}/"/>`,
      imageExtra,
    ].join("\n")),
    // Core pages
    ...CORE.filter(p => p.path !== "/").map(p => urlXml(p, today)),
    // Section indexes
    ...INDEXES.map(p => urlXml(p, today)),
    // Info sub-pages
    ...INFO.map(p => urlXml(p, today)),
    // Knowledge topic pages
    ...KNOWLEDGE.map(p => urlXml(p, today)),
    // Blog posts
    ...blogPostUrls,
    // zh-Hans pages
    ...ZH_PAGES.map(({ path, priority, freq }) =>
      urlXml({ path: `/zh-Hans${path}`, priority, freq }, today, [
        `    <xhtml:link rel="alternate" hreflang="en-AU"   href="${BASE_URL}${path === "/" ? "/" : path}/"/>`,
        `    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${BASE_URL}/zh-Hans${path === "/" ? "/" : path}/"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${path === "/" ? "/" : path}/"/>`,
      ].join("\n"))
    ),
  ].join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

// ── Next.js handler ────────────────────────────────────────────────────────────
export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=43200");
  res.write(await generateSitemap());
  res.end();
  return { props: {} };
}
