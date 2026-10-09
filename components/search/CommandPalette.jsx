/**
 * CommandPalette: jump to any page on the site. Opened with ⌘K / Ctrl+K, the
 * search button in the desktop header or the one in the mobile menu. Header.jsx
 * loads it with next/dynamic on first use, so neither this file nor the page
 * index it reads (lib/page-index.data.js, built at compile time) ships with a
 * page's first load.
 *
 * A modal dialog (hooks/useDialog: Escape, focus trap, scroll lock, focus back
 * to whatever opened it) around a combobox. Focus stays in the input, ↑ and ↓
 * move through the results (aria-activedescendant), Enter opens the active one.
 * Before typing it lists the main pages in footer order. While typing, each
 * group shows its best matches, and the group holding the best match comes
 * first. Results are real links, so ⌘-click or a middle click still opens a
 * new tab.
 */
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import PAGE_INDEX from "@/lib/page-index.data";
import { localiseIndex, rankPages } from "@/lib/page-search";
import { searchCopy } from "@/lib/search-copy";
import { fill } from "@/lib/fill";
import { useDialog } from "@/hooks/useDialog";
import { useI18n } from "@/contexts/I18nContext";

const PER_GROUP = 8; // matches shown per group while typing
const GROUP_ORDER = PAGE_INDEX.columns.flatMap((c) => c.groups);
// Each footer column's own group holds its main pages: the list before typing.
const MAIN_GROUPS = new Set(PAGE_INDEX.columns.map((c) => c.id));

const MUTED = "text-[#6E6E6E] dark:text-[#9A9A9A]";
const KBD =
  "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 border border-[#E0E0E0] dark:border-[#3D3D3D] font-mono text-[10px] leading-none normal-case";

function buildGroups(pages, query) {
  const searching = query.trim().length > 0;
  const list = searching ? rankPages(pages, query) : pages.filter((p) => MAIN_GROUPS.has(p.group));
  const byGroup = new Map();
  for (const page of list) {
    if (!byGroup.has(page.group)) byGroup.set(page.group, []);
    byGroup.get(page.group).push(page);
  }
  // A Map keeps first-seen order, which is best match first while searching.
  const ids = searching ? [...byGroup.keys()] : GROUP_ORDER.filter((id) => byGroup.has(id));
  let start = 0;
  return ids.map((id) => {
    const all = byGroup.get(id);
    const items = searching ? all.slice(0, PER_GROUP) : all;
    const group = { id, total: all.length, items, start };
    start += items.length;
    return group;
  });
}

// The same pixel cross as the quest log's close button.
function PixelCross({ className = "" }) {
  return (
    <svg
      viewBox="0 0 7 7"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`w-3 h-3 fill-current ${className}`}
    >
      <path d="M0 0h1v1H0zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 4h1v1H4zM5 5h1v1H5zM6 6h1v1H6zM6 0h1v1H6zM5 1h1v1H5zM4 2h1v1H4zM2 4h1v1H2zM1 5h1v1H1zM0 6h1v1H0z" />
    </svg>
  );
}

export default function CommandPalette({ onClose }) {
  const { locale } = useI18n();
  const copy = searchCopy(locale);
  const router = useRouter();
  const uid = useId();
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  // Mounted only while open, like the design-philosophy modal.
  useDialog({ open: true, onClose, containerRef: panelRef, initialFocusRef: inputRef });

  const pages = useMemo(() => localiseIndex(PAGE_INDEX, locale), [locale]);
  const groups = useMemo(() => buildGroups(pages, query), [pages, query]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const matches = groups.reduce((n, g) => n + g.total, 0);
  const current = flat.length ? Math.min(active, flat.length - 1) : -1;
  const listId = `${uid}-results`;
  const optionId = (i) => `${uid}-option-${i}`;
  const activeId = current >= 0 ? `${uid}-option-${current}` : undefined;

  // Keep the active result in view as the arrow keys move it.
  useEffect(() => {
    if (activeId) document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  const go = useCallback(
    (page) => {
      onClose();
      router.push(page.href).catch(() => {});
    },
    [onClose, router]
  );

  const onKeyDown = (e) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return; // IME (pinyin) at work
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!flat.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((current + step + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      if (current < 0) return;
      e.preventDefault();
      go(flat[current]);
    } else if ((e.key || "").length === 1 && !e.metaKey && !e.ctrlKey) {
      // Typing here is for the search box, not the page's own shortcuts
      // (the backtick terminal on the home page, the Konami code).
      e.stopPropagation();
    }
  };

  // Plain clicks close the palette as the link navigates. Modified clicks open
  // a new tab, so the palette stays put for the next one.
  const onResultClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    onClose();
  };

  const trimmed = query.trim();
  let status = "";
  if (trimmed) {
    status = matches
      ? fill(matches === 1 ? copy.oneResult : copy.results, { n: matches })
      : fill(copy.empty, { q: trimmed });
  }

  return createPortal(
    <div className="fixed inset-0 z-[1100] flex items-start justify-center p-3 md:pt-[12vh] print:hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={copy.dialogLabel}
        className="pixel-frame relative flex flex-col w-full max-w-[640px] max-h-[calc(100dvh-1.5rem)] md:max-h-[min(36rem,76vh)]
                   border-2 border-black dark:border-white bg-white dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-white animate-enter-scale"
      >
        {/* Search field */}
        <div className="flex-shrink-0 flex items-center gap-3 pl-4 pr-1.5 border-b border-[#E0E0E0] dark:border-[#3D3D3D] focus-within:border-[#FF3C3C] dark:focus-within:border-[#FF3C3C] transition-colors duration-200">
          <FiSearch
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className={`flex-shrink-0 ${MUTED}`}
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={flat.length > 0}
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label={copy.inputLabel}
            placeholder={copy.placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            className="flex-1 min-w-0 h-14 bg-transparent text-base focus:outline-none focus-visible:outline-none placeholder:text-[#6E6E6E] dark:placeholder:text-[#9A9A9A]"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className={`inline-flex items-center justify-center min-w-[44px] h-11 px-2 border border-transparent hover:border-[#E0E0E0] dark:hover:border-[#3D3D3D] hover:text-black dark:hover:text-white transition-colors duration-200 ${MUTED}`}
          >
            <span className={`${KBD} hidden [@media(hover:hover)]:inline-flex`}>esc</span>
            <PixelCross className="[@media(hover:hover)]:hidden" />
          </button>
        </div>

        {/* Results */}
        <div
          id={listId}
          role="listbox"
          aria-label={copy.dialogLabel}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-2"
        >
          {groups.map((g) => {
            const headingId = `${uid}-group-${g.id}`;
            return (
              <div key={g.id} role="presentation" className="pb-1">
                <div
                  id={headingId}
                  aria-hidden="true"
                  className={`flex items-center justify-between gap-3 px-4 pt-2 pb-1 font-mono text-[10px] tracking-widest uppercase ${MUTED}`}
                >
                  <span>{copy.groups[g.id]}</span>
                  {g.total > g.items.length && (
                    <span className="tabular-nums">
                      {fill(copy.groupCount, { shown: g.items.length, total: g.total })}
                    </span>
                  )}
                </div>
                <div role="group" aria-labelledby={headingId}>
                  {g.items.map((page, k) => {
                    const i = g.start + k;
                    const selected = i === current;
                    return (
                      <Link
                        key={page.href}
                        id={optionId(i)}
                        href={page.href}
                        prefetch={false}
                        role="option"
                        aria-selected={selected}
                        tabIndex={-1}
                        onMouseMove={() => {
                          if (!selected) setActive(i);
                        }}
                        onClick={onResultClick}
                        className={`flex items-center gap-3 min-h-[44px] px-4 py-1.5 ${
                          selected ? "bg-[#F5F5F5] dark:bg-[#1A1A1A]" : ""
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`w-1.5 h-1.5 flex-shrink-0 ${
                            selected ? "bg-[#FF3C3C]" : "bg-[#D6D6D6] dark:bg-[#3D3D3D]"
                          }`}
                        />
                        <span className="flex-1 min-w-0">
                          <span className="block truncate text-sm">{page.title}</span>
                          {page.note && (
                            <span className={`block truncate text-[11px] leading-snug ${MUTED}`}>
                              {page.note}
                            </span>
                          )}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`hidden sm:block flex-shrink-0 max-w-[38%] truncate font-mono text-[10px] ${MUTED}`}
                        >
                          {page.href}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {trimmed && !flat.length && (
            <div className="px-4 py-8">
              <p className="text-sm">{fill(copy.empty, { q: trimmed })}</p>
              <p className={`mt-1 text-[12px] ${MUTED}`}>{copy.emptyHint}</p>
            </div>
          )}
        </div>

        {/* Keys, and the way to the full site map */}
        <div
          className={`flex-shrink-0 flex items-center gap-4 px-4 py-2 border-t border-[#E0E0E0] dark:border-[#3D3D3D] font-mono text-[10px] tracking-widest uppercase ${MUTED}`}
        >
          <span
            aria-hidden="true"
            className="hidden sm:[@media(hover:hover)]:flex items-center gap-4"
          >
            <span className="flex items-center gap-1">
              <span className={KBD}>↑</span>
              <span className={KBD}>↓</span>
              <span className="ml-1">{copy.hints.move}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className={KBD}>↵</span>
              <span className="ml-1">{copy.hints.open}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className={KBD}>esc</span>
              <span className="ml-1">{copy.hints.close}</span>
            </span>
          </span>
          <Link
            href="/info/site-map"
            prefetch={false}
            onClick={onResultClick}
            className="ml-auto inline-flex items-center min-h-[32px] hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {copy.browse} →
          </Link>
        </div>

        <p role="status" className="sr-only">
          {status}
        </p>
      </div>
    </div>,
    document.body
  );
}
