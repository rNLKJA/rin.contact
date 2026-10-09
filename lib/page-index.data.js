/**
 * The page index behind the ⌘K palette and /info/site-map. This body is only
 * a placeholder. While webpack compiles this file, scripts/page-index-loader.js
 * replaces it with the index that scripts/page-index.mjs builds from the site
 * (see next.config.js), so the real data is made fresh by every build.
 *
 * Import it from getStaticProps or a lazily loaded chunk only, never from code
 * that ships with the first load: it holds every page in both locales.
 */
const PAGE_INDEX = { columns: [], entries: [] };

export default PAGE_INDEX;
