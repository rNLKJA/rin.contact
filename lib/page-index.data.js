/**
 * The page index behind the ⌘K palette and /info/site-map. This body is only
 * a placeholder. While webpack compiles this file, scripts/page-index-loader.js
 * replaces it with the index that scripts/page-index.mjs builds from the site
 * (see next.config.js), so the real data is made fresh by every build.
 *
 * Import it from getStaticProps or a lazily loaded chunk only, never from code
 * that ships with the first load: it holds every page in both locales.
 *
 * Reaching this placeholder means the loader did not run (Turbopack, or a tool
 * that imports the file directly), so it throws instead of handing the palette
 * and the site map an empty list that every check would let through.
 */
function missingIndex() {
  throw new Error(
    "lib/page-index.data.js was loaded without scripts/page-index-loader.js. Build with webpack (npm run build), or read the index from scripts/page-index.mjs."
  );
}

export default missingIndex();
