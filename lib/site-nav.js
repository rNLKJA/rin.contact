/**
 * Site navigation shared by the footer and the page index. The page index
 * (scripts/page-index.mjs) feeds the ⌘K palette and /info/site-map, and it
 * groups every page by these footer columns, so the three never disagree.
 *
 * Plain data with locale keys for labels (no JSX), so the Node build script
 * can import it. The header keeps its own list in components/layout/Header.jsx
 * because it pairs each section with an icon. Every header page is in a column
 * here too, apart from home, which OTHER_PAGES adds.
 */

/** The footer's columns, in order. `plain` links are files, not pages. */
export const FOOTER_COLUMNS = [
  {
    id: "work",
    headingKey: "footer.work",
    links: [
      { href: "/strategic", key: "nav.strategic" },
      { href: "/career", key: "nav.career" },
      { href: "/projects", key: "nav.projects" },
      { href: "/projects/coursework", key: "nav.coursework" },
      { href: "/resume", key: "nav.resume" },
      { href: "/cv", key: "nav.cv" },
      { href: "/#contact", key: "nav.contact" },
      { href: "/hire-me", key: "nav.hireMe", cta: true },
    ],
  },
  {
    id: "learn",
    headingKey: "footer.learn",
    links: [
      { href: "/skills", key: "nav.skills" },
      { href: "/knowledge", key: "nav.knowledge" },
      { href: "/ds", key: "nav.dsExplainers" },
      { href: "/lab", key: "nav.lab" },
      { href: "/blog", key: "nav.blog" },
      { href: "/blog/feed.xml", key: "nav.rss", plain: true },
    ],
  },
  {
    id: "site",
    headingKey: "footer.site",
    links: [
      { href: "/about", key: "nav.about" },
      { href: "/info/now", key: "nav.now" },
      { href: "/info/uses", key: "nav.uses" },
      { href: "/info/colophon", key: "nav.colophon" },
      { href: "/info/history", key: "nav.history" },
      { href: "/info/changelog", key: "nav.changelog" },
      { href: "/info/roadmap", key: "nav.roadmap" },
      { href: "/info/accessibility", key: "nav.accessibility" },
      { href: "/info/site-map", key: "nav.siteMap" },
    ],
  },
  {
    id: "tools",
    headingKey: "footer.tools",
    links: [
      { href: "/tools/card", key: "nav.businessCard" },
      { href: "/resume/terminal", key: "nav.cliResume" },
      { href: "/info/api", key: "nav.api" },
      { href: "/fun", key: "nav.easterEggs" },
    ],
  },
];

/**
 * Pages the footer leaves out, with the column each belongs to. Any other page
 * the build finds under pages/ is still indexed, placed by its path.
 */
export const OTHER_PAGES = [
  { href: "/", key: "nav.home", column: "work" },
  { href: "/info", key: "nav.info", column: "site" },
  { href: "/info/manifest", key: "nav.manifest", column: "site" },
  { href: "/info/references", key: "nav.references", column: "site" },
  { href: "/info/thank-you", key: "nav.thankYou", column: "site" },
  { href: "/tools", key: "nav.tools", column: "tools" },
];
