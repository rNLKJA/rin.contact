import React, { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import ThemeToggle, { ThemeSegmented } from "@/components/ui/ThemeToggle";
import LocaleSwitcher, { LocaleSegmented } from "@/components/ui/LocaleSwitcher";
import { useI18n } from "@/contexts/I18nContext";
import { useDialog } from "@/hooks/useDialog";

// ── Logo with double-click glitch easter egg ──────────────────────────────────
const GLITCH_ALTS = ["rNLKJA", "r̷N̸L̵K̶J̷A̸", "404", "Rin?", "¯\\_(ツ)_/¯", "rNLKJA"];

function LogoWithGlitch() {
  const [glitching, setGlitching] = useState(false);
  const [label, setLabel] = useState("rNLKJA");
  const phaseRef = useRef(0);

  const onDoubleClick = useCallback(
    (e) => {
      e.preventDefault();
      if (glitching) return;
      setGlitching(true);
      phaseRef.current = 0;

      const next = () => {
        phaseRef.current++;
        if (phaseRef.current < GLITCH_ALTS.length) {
          setLabel(GLITCH_ALTS[phaseRef.current]);
          setTimeout(next, phaseRef.current === GLITCH_ALTS.length - 1 ? 400 : 120);
        } else {
          setLabel("rNLKJA");
          setGlitching(false);
        }
      };
      setTimeout(next, 80);
    },
    [glitching]
  );

  return (
    <Link
      href="/"
      className="flex flex-row items-center gap-2.5 group flex-shrink-0"
      aria-label="Rin Huang — home"
      onDoubleClick={onDoubleClick}
    >
      <div
        className="flex items-center justify-center bg-white flex-shrink-0"
        style={{
          borderRadius: "22%",
          overflow: "hidden",
          width: 32,
          height: 32,
          filter: glitching ? "invert(1)" : "none",
          transition: "filter 0.08s",
        }}
      >
        <Image src="/logo.svg" alt="rNLKJA logo" width={32} height={32} priority />
      </div>
      <span
        className="font-semibold text-sm tracking-tight group-hover:opacity-60 transition-opacity duration-200"
        style={{ color: glitching ? "#FF3C3C" : undefined }}
      >
        {label}
      </span>
    </Link>
  );
}

const NAV_LINKS = [
  { href: "/career", key: "nav.career" },
  { href: "/projects", key: "nav.projects" },
  { href: "/projects/coursework", key: "nav.coursework" },
  { href: "/lab", key: "nav.lab" },
  { href: "/knowledge", key: "nav.knowledge" },
  { href: "/blog", key: "nav.blog" },
  { href: "/about", key: "nav.about" },
  { href: "/resume", key: "nav.resume" },
  { href: "/#contact", key: "nav.contact" },
];

// Standalone page links — rendered as distinct CTA buttons, not inline nav items
const PAGE_LINKS = [
  { href: "/tools/card", key: "nav.card", titleKey: "nav.businessCard" },
  { href: "/hire-me", key: "nav.hireMe", titleKey: "nav.hireMe", cta: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();
  const router = useRouter();
  const { pathname } = router;

  // Mobile menu behaves as a real modal dialog: Escape, focus trap, focus in
  // on open (first link) and back to the burger on close, page scroll lock.
  const menuRef = useRef(null);
  const firstLinkRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useDialog({
    open: menuOpen,
    onClose: closeMenu,
    containerRef: menuRef,
    initialFocusRef: firstLinkRef,
  });

  // Close on navigation. A locale switch keeps the same asPath, so changing
  // language inside the menu leaves it open. (State adjusted during render,
  // React's recommended alternative to a setState-in-effect.)
  const pathKey = (router.asPath || "").split("#")[0];
  const [menuPath, setMenuPath] = useState(pathKey);
  if (menuPath !== pathKey) {
    setMenuPath(pathKey);
    setMenuOpen(false);
  }

  // Close once the viewport reaches the desktop nav (lg, 1024px).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // "You are here" wayfinding. Matches exact route or any sub-route (e.g.
  // /projects/signal lights /projects). Skips hash links and the home anchor.
  // When a more specific link also matches (/projects/coursework), only that
  // one lights up, so Projects and Coursework are never active together.
  const matches = (href) => {
    if (!href || !href.startsWith("/") || href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };
  const isActive = (href) =>
    matches(href) &&
    !NAV_LINKS.some((l) => l.href !== href && l.href.startsWith(href + "/") && matches(l.href));
  // Direct DOM refs — scroll state never goes through React, so no re-renders on scroll
  const headerRef = useRef(null);
  const progressRef = useRef(null);
  const scrolledRef = useRef(false); // guards against redundant border toggles
  const maxScrollRef = useRef(0);

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const max = maxScrollRef.current;

    // Progress bar — direct style write, zero React involvement
    if (progressRef.current) {
      progressRef.current.style.width = max > 0 ? `${(scrollTop / max) * 100}%` : "0%";
    }

    // Border — only toggle when the threshold is actually crossed
    const isScrolled = scrollTop > 40;
    if (isScrolled !== scrolledRef.current) {
      scrolledRef.current = isScrolled;
      if (headerRef.current) {
        headerRef.current.style.borderBottom = isScrolled ? "1px solid var(--divider)" : "";
      }
    }
  }, []);

  useEffect(() => {
    // Defer layout reads to rAF — avoids forced reflow when ResizeObserver
    // fires during or immediately after a DOM mutation.
    let rafScheduled = false;
    const updateMax = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        const doc = document.documentElement;
        maxScrollRef.current = doc.scrollHeight - doc.clientHeight;
      });
    };

    // Defer initial layout read to idle — keeps it off the critical path
    const idle =
      typeof requestIdleCallback !== "undefined" ? requestIdleCallback : (cb) => setTimeout(cb, 1);
    idle(() => updateMax(), { timeout: 100 });

    const ro = new ResizeObserver(updateMax);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white dark:bg-[#0A0A0A] transition-all duration-200 print:hidden"
      role="banner"
    >
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] bg-[#FF3C3C] transition-none pointer-events-none"
      />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 flex justify-between items-center py-4">
        {/* ── Logo — double-click to glitch ── */}
        <LogoWithGlitch />

        {/* ── Desktop nav ── shown from lg: nine sections plus the page links do
            not fit a tablet-width bar, so 768-1023px keeps the burger menu.
            Tight item padding lets the full bar fit at 1024px. */}
        <nav
          className="hidden lg:flex flex-row items-center gap-0 xl:gap-0.5 whitespace-nowrap text-[11px] tracking-widest uppercase"
          aria-label={t("nav.primaryNav")}
        >
          {NAV_LINKS.map(({ href, key }) => {
            const active = isActive(href);
            return (
              <Link
                key={key}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative px-1.5 xl:px-2 py-1.5 rounded-full transition-all duration-200 ${
                  active
                    ? "text-[#CC0000] dark:text-[#FF3C3C]"
                    : "text-[#595959] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A]"
                }`}
              >
                {t(key)}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 bottom-[2px] w-[3px] h-[3px] bg-[#FF3C3C]"
                  />
                )}
              </Link>
            );
          })}

          {/* Thin separator */}
          <span className="h-3.5 w-px bg-[#E0E0E0] dark:bg-[#3D3D3D] mx-1.5" aria-hidden="true" />

          {/* Locale switcher */}
          <LocaleSwitcher />

          {/* Theme toggle — desktop */}
          <ThemeToggle className="ml-1" />

          {/* Page links — card + hire-me */}
          {PAGE_LINKS.map(({ href, key, titleKey, cta }) => {
            const active = isActive(href);
            return (
              <Link
                key={key}
                href={href}
                title={t(titleKey)}
                aria-current={active ? "page" : undefined}
                className={
                  cta
                    ? `px-3.5 py-1.5 border border-[#FF3C3C] transition-all duration-200 ${
                        active
                          ? "bg-accent-fill text-white"
                          : "text-accent-ink hover:bg-accent-fill hover:text-white"
                      }`
                    : `relative px-1.5 xl:px-2 py-1.5 rounded-full transition-all duration-200 ${
                        active
                          ? "text-[#CC0000] dark:text-[#FF3C3C]"
                          : "text-[#595959] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A]"
                      }`
                }
              >
                {t(key)}
                {!cta && active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 bottom-[2px] w-[3px] h-[3px] bg-[#FF3C3C]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Mobile burger ── */}
        {/* 44x44 hit area; negative margins keep the bars and the row height
            where they were. The open menu covers it and has its own close. */}
        <button
          type="button"
          className="lg:hidden relative flex flex-col items-center justify-center gap-[5px] w-11 h-11 -mr-1 -my-1.5"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={t("nav.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-5 h-px transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""} bg-black dark:bg-white`}
          />
          <span
            className={`block w-5 h-px bg-black dark:bg-white duration-200 ${menuOpen ? "opacity-0 transition-opacity" : "transition-none"}`}
          />
          <span
            className={`block w-5 h-px transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""} bg-black dark:bg-white`}
          />
        </button>
      </div>

      {/* ══ Full-page mobile menu ══ */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed inset-0 z-50 bg-white dark:bg-[#0A0A0A] flex flex-col lg:hidden
                    transition-opacity duration-200 ${menuOpen ? "opacity-100 pointer-events-auto animate-enter" : "opacity-0 pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.menuLabel")}
        {...(!menuOpen ? { inert: true } : {})}
      >
        {/* Top bar — brand, and the close control at the burger's position so
            it reads as the burger's open state and stays inside the dialog. */}
        <div className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
          <span className="font-semibold text-sm tracking-tight text-black dark:text-white">
            rNLKJA
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label={t("nav.closeMenu")}
            className="relative flex items-center justify-center w-11 h-11 -mr-1 -my-1.5"
          >
            <span
              aria-hidden="true"
              className="absolute w-5 h-px bg-black dark:bg-white rotate-45"
            />
            <span
              aria-hidden="true"
              className="absolute w-5 h-px bg-black dark:bg-white -rotate-45"
            />
          </button>
        </div>

        {/* Nav links — editorial numbered style */}
        {/* Scrolls on short screens; auto margins centre the list and keep the first item reachable */}
        <nav
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col px-8"
          aria-label={t("nav.primaryNav")}
        >
          <div className="my-auto flex flex-shrink-0 flex-col">
            {NAV_LINKS.map(({ href, key }, i) => {
              const active = isActive(href);
              return (
                <Link
                  key={key}
                  href={href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-shrink-0 items-baseline gap-4 py-4 [@media(max-height:700px)]:py-3 border-b border-[#F0F0F0] dark:border-[#1E1E1E] group transition-colors duration-200 ${
                    active ? "text-[#FF3C3C]" : "text-black dark:text-white hover:text-[#FF3C3C]"
                  }`}
                >
                  <span
                    className={`text-[10px] tracking-widest tabular-nums flex-shrink-0 w-5 transition-colors duration-200 ${
                      active ? "text-accent-ink" : "text-ink-subtle group-hover:text-[#FF3C3C]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl font-semibold tracking-tight">{t(key)}</span>
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="ml-auto w-1.5 h-1.5 bg-[#FF3C3C] self-center"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="ml-auto text-[#E0E0E0] group-hover:text-[#FF3C3C] transition-colors duration-200 text-sm"
                    >
                      ↗
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Page links — separated by a subtle label */}
            <p className="flex-shrink-0 text-[9px] tracking-widest uppercase text-ink-subtle mt-5 mb-1">
              {t("nav.pages")}
            </p>
            {PAGE_LINKS.map(({ href, key, cta }) => {
              const active = isActive(href);
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-shrink-0 items-center gap-4 py-4 [@media(max-height:700px)]:py-3 border-b border-[#F0F0F0] dark:border-[#1E1E1E] group transition-colors duration-200 ${
                    cta
                      ? "text-accent-ink"
                      : active
                        ? "text-accent-ink"
                        : "text-[#595959] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`text-[10px] tracking-widest flex-shrink-0 w-5 ${active ? "text-accent-ink" : "text-[#E0E0E0]"}`}
                  >
                    →
                  </span>
                  <span className="text-xl font-semibold tracking-tight">{t(key)}</span>
                  {active ? (
                    <span aria-hidden="true" className="ml-auto w-1.5 h-1.5 bg-[#FF3C3C]" />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="ml-auto text-[#E0E0E0] group-hover:text-current transition-colors duration-200 text-sm"
                    >
                      ↗
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom bar — Nothing-style settings rows, then square social chips */}
        <div className="px-8 py-5 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span
              id="menu-theme-label"
              className="text-[10px] tracking-widest uppercase text-ink-subtle"
            >
              {t("themeToggle.label")}
            </span>
            <ThemeSegmented labelledBy="menu-theme-label" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span
              id="menu-locale-label"
              className="text-[10px] tracking-widest uppercase text-ink-subtle"
            >
              {t("locale.label")}
            </span>
            <LocaleSegmented labelledBy="menu-locale-label" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/sunchuangyuhuang/" },
              { label: "GitHub", href: "https://github.com/rNLKJA" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center min-h-[36px] border border-[#E0E0E0] dark:border-[#3D3D3D] px-3.5 text-[10px] tracking-widest uppercase
                           text-[#595959] dark:text-[#AAAAAA] hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
