/**
 * /info/site-map: every page on the site, grouped like the footer, with a box
 * that filters the list as you type.
 *
 * The list comes from the page index that the ⌘K palette also reads
 * (lib/page-index.data.js, built from the site's pages and data at compile
 * time), passed in through getStaticProps for the visitor's locale. Nothing
 * here is a hand-kept list, so the site map and the palette never drift apart.
 * The filter uses the palette's matching (lib/page-search.js) and keeps the
 * page order. With JavaScript off, the full list still renders.
 */
import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import { openSearch, useSearchShortcutLabel } from "@/hooks/useSearchShortcut";
import { fill } from "@/lib/fill";
import PAGE_INDEX from "@/lib/page-index.data";
import { localiseIndex, queryWords, scorePage } from "@/lib/page-search";
import { searchCopy } from "@/lib/search-copy";

const MUTED = "text-[#6E6E6E] dark:text-[#9A9A9A]";
const LABEL = "font-mono text-[10px] tracking-widest uppercase";

export async function getStaticProps({ locale = "en-AU" }) {
  return {
    props: {
      columns: PAGE_INDEX.columns,
      pages: localiseIndex(PAGE_INDEX, locale),
    },
  };
}

export default function SiteMapPage({ columns, pages }) {
  const { t, locale = "en-AU" } = useI18n();
  const groupLabels = searchCopy(locale).groups;
  const shortcut = useSearchShortcutLabel();
  const inputId = useId();
  const [query, setQuery] = useState("");

  const byGroup = useMemo(() => {
    const map = new Map();
    for (const page of pages) {
      if (!map.has(page.group)) map.set(page.group, []);
      map.get(page.group).push(page);
    }
    return map;
  }, [pages]);

  // null while the box is empty: show everything.
  const visible = useMemo(() => {
    const words = queryWords(query);
    if (!words.length) return null;
    return new Set(pages.filter((p) => scorePage(p, words) > 0).map((p) => p.href));
  }, [pages, query]);

  const trimmed = query.trim();
  const total = pages.length;
  let count = fill(t("infoSiteMap.showingAll"), { total });
  if (visible) {
    count = visible.size
      ? fill(t("infoSiteMap.showing"), { n: visible.size, total })
      : fill(t("infoSiteMap.empty"), { q: trimmed });
  }

  return (
    <>
      <SeoHead
        title={t("infoSiteMap.metaTitle")}
        description={t("infoSiteMap.metaDescription")}
        path="/info/site-map"
        ogTitle={t("infoSiteMap.heading")}
        ogImage={{ title: "Site map", subtitle: t("infoSiteMap.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="w-full max-w-[880px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className={`${LABEL} ${MUTED} mb-4`}>/info/site-map</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("infoSiteMap.heading")}
          </h1>
          <p className="text-sm text-[#595959] dark:text-[#AAAAAA] max-w-[560px]">
            {t("infoSiteMap.intro")}
          </p>

          {/* The palette, for jumping without scrolling this list */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={openSearch}
              aria-haspopup="dialog"
              className={`inline-flex items-center gap-2 h-9 px-3 border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#1A1A1A] dark:text-white hover:border-black dark:hover:border-white transition-colors duration-200 ${LABEL}`}
            >
              <FiSearch size={14} strokeWidth={1.5} aria-hidden="true" />
              {t("infoSiteMap.openSearch")}
              <span aria-hidden="true" className={`hidden [@media(hover:hover)]:inline ${MUTED}`}>
                {shortcut}
              </span>
            </button>
            <p className={`hidden [@media(hover:hover)]:block text-xs ${MUTED}`}>
              {fill(t("infoSiteMap.shortcut"), { keys: shortcut })}
            </p>
          </div>

          {/* Filter */}
          <div role="search" className="mt-10 mb-12">
            <label htmlFor={inputId} className={`block mb-2 ${LABEL} ${MUTED}`}>
              {t("infoSiteMap.filterLabel")}
            </label>
            <div className="flex items-center gap-3 pl-3 pr-1 border border-[#E0E0E0] dark:border-[#3D3D3D] focus-within:border-[#FF3C3C] dark:focus-within:border-[#FF3C3C] transition-colors duration-200">
              <FiSearch
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className={`flex-shrink-0 ${MUTED}`}
              />
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape" && query) {
                    e.preventDefault();
                    setQuery("");
                  }
                }}
                placeholder={t("infoSiteMap.filterPlaceholder")}
                autoComplete="off"
                spellCheck={false}
                enterKeyHint="search"
                className="flex-1 min-w-0 h-11 bg-transparent text-base focus:outline-none focus-visible:outline-none placeholder:text-[#6E6E6E] dark:placeholder:text-[#9A9A9A] [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className={`flex-shrink-0 h-9 px-2 ${LABEL} ${MUTED} hover:text-black dark:hover:text-white transition-colors duration-200`}
                >
                  {t("infoSiteMap.clear")}
                </button>
              )}
            </div>
            <p role="status" className={`mt-2 text-xs ${MUTED}`}>
              {count}
            </p>
          </div>

          <div className="space-y-14">
            {columns.map((column) => {
              const groups = column.groups
                .map((id) => ({
                  id,
                  items: (byGroup.get(id) || []).filter((p) => !visible || visible.has(p.href)),
                }))
                .filter((g) => g.items.length > 0);
              if (!groups.length) return null;
              const headingId = `site-map-${column.id}`;
              return (
                <section key={column.id} aria-labelledby={headingId}>
                  <h2
                    id={headingId}
                    className={`flex items-center gap-2 mb-5 text-accent-ink ${LABEL}`}
                  >
                    <span aria-hidden="true" className="w-1.5 h-1.5 bg-[#FF3C3C]" />
                    {t(column.headingKey)}
                  </h2>
                  <div className="space-y-8">
                    {groups.map((g) => (
                      <div key={g.id}>
                        {g.id !== column.id && (
                          <h3 className={`flex items-baseline gap-2 mb-3 ${LABEL} ${MUTED}`}>
                            {groupLabels[g.id]}
                            <span className="tabular-nums">{g.items.length}</span>
                          </h3>
                        )}
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1">
                          {g.items.map((page) => (
                            <li key={page.href} className="min-w-0">
                              <Link
                                href={page.href}
                                prefetch={false}
                                className="group flex flex-col min-h-[44px] justify-center py-1"
                              >
                                <span className="text-sm text-[#1A1A1A] dark:text-white group-hover:text-accent-ink transition-colors duration-200">
                                  {page.title}
                                </span>
                                <span
                                  aria-hidden="true"
                                  className={`font-mono text-[10px] truncate ${MUTED}`}
                                >
                                  {page.href}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-14">
            <Link
              href="/info"
              className="text-[11px] font-mono tracking-widest uppercase text-[#6E6E6E] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              ← /info
            </Link>
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#6E6E6E] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
            >
              {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
