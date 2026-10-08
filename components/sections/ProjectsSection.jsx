import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useI18n } from "@/contexts/I18nContext";
import ScrollRegion from "@/components/ui/ScrollRegion";
import Tabs, { tabPanelProps } from "@/components/ui/Tabs";

// Turn a domain label into a clean URL slug ("AI / ML" -> "ai-ml"), so a
// filtered Projects view can be shared as /projects?category=ai-ml.
const slugifyDomain = (d) =>
  d
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
import { useTheme } from "@/contexts/ThemeContext";
import { useInView } from "@/hooks/useInView";
import { PROJECTS } from "@/lib/projects-data";

const DOMAIN_COLORS = {
  Government: { color: "#2563EB", bg: "#EFF6FF" }, // blue-600  4.53:1 ✓
  "Climate Research": { color: "#0F766E", bg: "#F0FDFA" }, // teal-700  6.18:1 ✓
  Biotech: { color: "#7C3AED", bg: "#F5F3FF" }, // violet-700 6.26:1 ✓
  Startup: { color: "#C2410C", bg: "#FFF7ED" }, // orange-700 7.24:1 ✓
  Research: { color: "#15803D", bg: "#F0FDF4" }, // green-700  7.55:1 ✓
  "AI / ML": { color: "#CC0000", dark: "#FF3C3C", bg: "#FFF1F1" }, // dark red   5.53:1 ✓ (dark: 5.62:1)
  "Cloud / HPC": { color: "#B45309", bg: "#FFFBEB" }, // amber-700  5.25:1 ✓
  "Open Source": { color: "#0E7490", bg: "#ECFEFF" }, // cyan-700   5.87:1 ✓
  Personal: { color: "#595959", bg: "#F5F5F5" }, // neutral    5.05:1 ✓
};

// Text colour for a domain in the current theme; #CC0000 only reaches 3.36:1 on
// the dark background, so entries can carry a brighter dark-mode ink.
const domainInk = (dc, isDark) => (isDark && dc.dark) || dc.color;

const DOMAINS = [
  "All",
  "Government",
  "Climate Research",
  "Biotech",
  "Startup",
  "Research",
  "AI / ML",
  "Cloud / HPC",
  "Open Source",
  "Personal",
];

// Motion rules: start at 70% of the target and land within 300ms.
function CountUp({ target, duration = 300, started }) {
  const from = Math.round(target * 0.7);
  const [count, setCount] = useState(from);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(from + eased * (target - from)));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started, target, duration, from]);

  return <>{count}</>;
}

function ProjectDetail({ project }) {
  const { t } = useI18n();
  return (
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-[#0A0A0A]">
      <div className="md:col-span-2 space-y-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-1 flex items-center gap-3 flex-wrap">
            {project.title}
            {project.current && (
              <span className="border border-[#FF3C3C] px-3 py-0.5 text-[10px] tracking-widest uppercase text-accent-ink rounded-full">
                {t("projects.active")}
              </span>
            )}
          </h3>
          <p className="text-xs text-[#595959] dark:text-[#AAAAAA] tracking-wide">
            {project.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-[#595959] dark:text-[#AAAAAA]">
          <span>{project.org}</span>
          <span>·</span>
          <span>{project.period}</span>
        </div>
        <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
          {project.summary}
        </p>
        <div className="mt-3 p-4 bg-[#FFF5F5] dark:bg-[#1A1111] rounded-lg">
          <span className="inline-block mb-2 px-2 py-0.5 bg-accent-fill text-white text-[9px] tracking-widest uppercase font-mono rounded-full">
            {t("projects.impact")}
          </span>
          <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed font-medium">
            {project.impact}
          </p>
        </div>
        {(project.link || project.demo || project.caseStudy) && (
          <div className="flex flex-wrap gap-2">
            {project.caseStudy && (
              <Link
                href={project.caseStudy}
                aria-label={`Read the ${project.title} case study`}
                className="inline-flex items-center gap-2 border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-white dark:text-[#0A0A0A] rounded-full hover:bg-black dark:hover:bg-white transition-colors duration-200"
              >
                Read case study →
              </Link>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={project.demoLabel || `Open the live ${project.title} demo`}
                className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
              >
                Live demo ↗
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={project.linkLabel || `View ${project.title} on GitHub`}
                className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                {project.linkText ||
                  (project.link?.includes("github.com")
                    ? `${t("projects.viewOnGithub")} ↗`
                    : `${t("projects.viewOnGithub")} ↗`)}
              </a>
            )}
          </div>
        )}
        {/* Share buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://rin.contact/projects")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A] px-3 py-1.5 text-[10px] tracking-widest uppercase text-ink-subtle hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors duration-200"
            aria-label={`Share ${project.title} on LinkedIn`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            {t("projects.share")}
          </a>
          <a
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(`Check out "${project.title}" — ${project.summary.split(".")[0]}.`)}&url=${encodeURIComponent("https://rin.contact/projects")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A] px-3 py-1.5 text-[10px] tracking-widest uppercase text-ink-subtle hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
            aria-label={`Tweet ${project.title}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {t("projects.post")}
          </a>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-2">
            {t("projects.stack")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full
                           cursor-default hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-1">
            {t("projects.status")}
          </p>
          <p className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">{project.status}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-1">
            {t("projects.domain")}
          </p>
          <p className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
            {Array.isArray(project.domain) ? project.domain.join(" · ") : project.domain}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeaturedSpotlight({ project }) {
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  if (!project) return null;
  const primaryDomain = Array.isArray(project.domain) ? project.domain[0] : project.domain;
  const dc = DOMAIN_COLORS[primaryDomain];
  return (
    <div className="mb-12 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
      <div className="px-6 md:px-8 py-3 border-b border-[#E0E0E0] dark:border-[#3D3D3D] bg-[#FAFAFA] dark:bg-[#141414] flex items-center justify-between gap-4">
        <span className="text-[10px] tracking-widest uppercase text-accent-ink flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] animate-pulse"
            aria-hidden="true"
          />
          Featured — Flagship
        </span>
        <span className="text-[10px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A] truncate">
          {project.status}
        </span>
      </div>
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-[#595959] dark:text-[#AAAAAA]">{project.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[#595959] dark:text-[#AAAAAA]">
            <span>{project.org}</span>
            <span>·</span>
            <span>{project.period}</span>
          </div>
          <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
            {project.summary}
          </p>
          <div className="p-4 bg-[#FFF5F5] dark:bg-[#1A1111] rounded-lg">
            <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed font-medium">
              {project.impact}
            </p>
          </div>
          {(project.link || project.demo || project.caseStudy) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.caseStudy && (
                <Link
                  href={project.caseStudy}
                  aria-label={`Read the ${project.title} case study`}
                  className="inline-flex items-center gap-2 border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] px-4 py-1.5 text-xs tracking-widest uppercase
                             text-white dark:text-[#0A0A0A] rounded-full hover:bg-black dark:hover:bg-white transition-colors duration-200"
                >
                  Read case study →
                </Link>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={project.demoLabel || `Open the live ${project.title} demo`}
                  className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase
                             text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
                >
                  Live demo ↗
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={project.linkLabel || `View ${project.title} on GitHub`}
                  className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase
                             text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {project.linkText || "View on GitHub ↗"}
                </a>
              )}
            </div>
          )}
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-2">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full
                             cursor-default hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-1">
              Domain
            </p>
            <p
              className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA]"
              style={dc ? { color: domainInk(dc, isDark) } : undefined}
            >
              {Array.isArray(project.domain) ? project.domain.join(" · ") : project.domain}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useI18n();
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  // Idle filter-pill colours are applied via inline JS (mouse handlers), so they
  // must be theme-aware here — Tailwind dark: variants do not reach inline styles.
  const idleBorder = isDark ? "#3D3D3D" : "#E0E0E0";
  const idleText = isDark ? "#9A9A9A" : "#595959";
  const router = useRouter();
  const [ref, inView] = useInView();
  const [activeFilter, setActiveFilter] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");
  const [countStarted, setCountStarted] = useState(false);

  // Start count-up as soon as section header enters view
  useEffect(() => {
    if (inView) setCountStarted(true);
  }, [inView]);

  // ── Shareable filter via the URL ──────────────────────────────────────────
  // Read ?category= on load and on back/forward, so a filtered view is a
  // shareable link (e.g. send a government recruiter /projects?category=government).
  useEffect(() => {
    if (!router.isReady) return;
    const slug = router.query.category;
    if (typeof slug !== "string") return;
    const match = DOMAINS.find((d) => slugifyDomain(d) === slug.toLowerCase());
    if (match) setActiveFilter(match);
  }, [router.isReady, router.query.category]);

  // Apply a filter AND reflect it in the URL (shallow, no scroll) so the user can
  // copy the link to whatever they have filtered to. "All" clears the param. The
  // URL write lives here (on the user action) rather than in an effect watching
  // activeFilter, so it cannot race the read effect above on first load.
  const selectFilter = (d) => {
    setActiveFilter(d);
    setOpenId(null);
    setSearch("");
    if (!router.isReady) return;
    const slug = d === "All" ? undefined : slugifyDomain(d);
    const query = { ...router.query };
    if (slug) query.category = slug;
    else delete query.category;
    router.replace({ pathname: router.pathname, query }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const isAllView = activeFilter === "All";

  const domainMatch = (p, filter) =>
    Array.isArray(p.domain) ? p.domain.includes(filter) : p.domain === filter;

  const domainStr = (p) =>
    Array.isArray(p.domain) ? p.domain.join(" ").toLowerCase() : p.domain.toLowerCase();

  const featured = PROJECTS.find((p) => p.featured) ?? null;
  // The featured project leads in the spotlight above; keep it out of the
  // default list to avoid a duplicate. When searching, show everything.
  const showSpotlight = isAllView && search === "";

  const filtered = isAllView
    ? PROJECTS.filter((p) =>
        search === ""
          ? !p.featured
          : p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
            p.tag.toLowerCase().includes(search.toLowerCase()) ||
            domainStr(p).includes(search.toLowerCase())
      )
    : PROJECTS.filter((p) => domainMatch(p, activeFilter));

  const activeProject = filtered.find((p) => p.id === openId) ?? null;

  const handleSelect = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-24" aria-label="Projects">
      {/* Section header */}
      <div
        ref={ref}
        className={`mb-12 transition-all duration-200 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1.5"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-accent-ink mb-3">
          {t("projects.sectionLabel")}
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
          <CountUp target={PROJECTS.length} started={countStarted} /> {t("projects.heading")}
        </h2>
        {/* Wisr-style wavy accent */}
        <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-4">
          <path
            d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
            stroke="#E0E0E0"
            className="dark:stroke-[#3D3D3D]"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-base font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-xl leading-relaxed">
          {t("projects.headingDesc")}
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mt-8" role="group" aria-label="Filter projects">
          {DOMAINS.map((d) => {
            const dc = DOMAIN_COLORS[d];
            const isActive = activeFilter === d;
            const activeStyle = dc
              ? { borderColor: dc.color, backgroundColor: dc.color, color: "#fff" }
              : { borderColor: "#CC0000", backgroundColor: "#CC0000", color: "#fff" };
            const idleStyle = { borderColor: idleBorder, color: idleText };
            return (
              <button
                key={d}
                onClick={() => selectFilter(d)}
                className="border px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200 flex items-center gap-1 rounded-full"
                style={isActive ? activeStyle : idleStyle}
                onMouseEnter={(e) => {
                  if (isActive) return;
                  if (dc) {
                    e.currentTarget.style.borderColor = dc.color;
                    e.currentTarget.style.color = domainInk(dc, isDark);
                  } else {
                    e.currentTarget.style.borderColor = "#FF3C3C";
                    e.currentTarget.style.color = "#FF3C3C";
                  }
                }}
                onMouseLeave={(e) => {
                  if (isActive) return;
                  e.currentTarget.style.borderColor = idleBorder;
                  e.currentTarget.style.color = idleText;
                }}
                aria-pressed={isActive}
              >
                {dc && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: isActive ? "#fff" : dc.color }}
                  />
                )}
                {d === "All" ? t("projects.allProjects") : d}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Featured flagship spotlight ── */}
      {showSpotlight && <FeaturedSpotlight project={featured} />}

      {/* ── ALL view: searchable list ── */}
      {isAllView && (
        <div className="w-full">
          {/* Search */}
          <div className="mb-4 flex items-center border border-[#E0E0E0] dark:border-[#3D3D3D] focus-within:border-[#FF3C3C] focus-within:outline-none transition-colors duration-200">
            <span className="pl-4 text-[#6B6B6B] dark:text-[#9A9A9A] text-sm select-none">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenId(null);
              }}
              placeholder={t("projects.searchPlaceholder")}
              className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-[#6B6B6B] dark:placeholder:text-[#9A9A9A]"
              aria-label={t("projects.searchPlaceholder")}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="pr-4 text-[#6B6B6B] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200 text-xs"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* List */}
          <div className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
            {filtered.length === 0 && (
              <p className="py-8 text-sm text-[#6B6B6B] dark:text-[#9A9A9A] text-center">
                No projects match &ldquo;{search}&rdquo;
              </p>
            )}
            {filtered.map((project, i) => {
              const isOpen = openId === project.id;
              const primaryDomain = Array.isArray(project.domain)
                ? project.domain[0]
                : project.domain;
              const dc = DOMAIN_COLORS[primaryDomain];
              return (
                <div
                  key={project.id}
                  className="border-b border-[#E0E0E0] dark:border-[#3D3D3D] group/row transition-colors duration-150 hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] relative"
                >
                  {/* Domain colour left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-200 opacity-0 group-hover/row:opacity-100 group-hover/row:animate-enter"
                    style={{ backgroundColor: dc?.color ?? "#FF3C3C" }}
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => handleSelect(project.id)}
                    className="w-full flex items-center gap-4 py-3.5 text-left group pl-2"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[10px] text-[#6B6B6B] dark:text-[#9A9A9A] tabular-nums w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 items-center">
                      <span className="text-sm font-medium flex items-center gap-2">
                        {project.title}
                        {project.current && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0" />
                        )}
                      </span>
                      <span className="text-xs text-[#595959] dark:text-[#AAAAAA] truncate hidden md:block">
                        {project.subtitle}
                      </span>
                      <span className="hidden md:flex items-center gap-3 justify-end">
                        <span
                          className="text-[10px] tracking-widest uppercase border px-2.5 py-0.5 rounded-full"
                          style={
                            dc
                              ? { borderColor: dc.color, color: domainInk(dc, isDark) }
                              : { borderColor: "#595959", color: "#595959" }
                          }
                        >
                          {project.tag}
                        </span>
                        <span className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">
                          {project.period}
                        </span>
                      </span>
                    </span>
                    <span
                      className={`text-[#6B6B6B] transition-transform duration-200 flex-shrink-0 text-sm ${isOpen ? "rotate-45 text-accent-ink" : "group-hover:text-[#FF3C3C]"}`}
                    >
                      +
                    </span>
                  </button>
                  {/* Height snaps (no max-height tween); the revealed content
                      enters from 70% via animate-enter-up instead. No cap when
                      open: a fixed cap clipped stack and status on phones. */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "none" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div
                      className={`border-t border-[#F0F0F0] dark:border-[#1E1E1E] ${isOpen ? "animate-enter-up" : ""}`}
                    >
                      <ProjectDetail project={project} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {(() => {
            const shown = filtered.length + (showSpotlight ? 1 : 0);
            return (
              <p className="mt-3 text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">
                {shown} project{shown !== 1 ? "s" : ""}
              </p>
            );
          })()}
        </div>
      )}

      {/* ── Domain-filtered: folder tabs (desktop) ── */}
      {!isAllView && (
        <>
          <div className="hidden md:block w-full">
            {/* Folder tabs — APG tabs with manual activation: arrows move focus,
                Enter/Space opens. The strip scrolls with an edge fade. */}
            <ScrollRegion
              focusable={false}
              scrollerClassName="scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <Tabs
                idBase="projects-folder"
                label={t("nav.projects")}
                activation="manual"
                items={filtered.map((project) => ({ id: project.id, label: project.title }))}
                value={openId}
                onChange={handleSelect}
                className="flex items-stretch gap-0"
                tabClassName={(isActive) => `
                      group relative flex-shrink-0 flex flex-col justify-center
                      px-4 py-3 min-w-[110px] max-w-[160px] text-left
                      border-t border-l border-r transition-colors duration-200
                      ${
                        isActive
                          ? "bg-accent-fill text-white border-accent-fill"
                          : "bg-white dark:bg-[#0A0A0A] text-[#3D3D3D] dark:text-[#AAAAAA] border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-[#FF3C3C] hover:text-[#FF3C3C]"
                      }
                    `}
                tabStyle={{ borderRadius: "4px 4px 0 0" }}
                renderTab={(item, isActive, i) => {
                  const project = filtered[i];
                  return (
                    <>
                      <span
                        aria-hidden="true"
                        className={`text-[10px] tabular-nums mb-1 ${isActive ? "text-white opacity-60" : "text-[#6B6B6B] dark:text-[#9A9A9A]"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs font-medium leading-tight truncate">
                          {project.title}
                        </span>
                        {project.current && (
                          <span
                            className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-white opacity-50" : "bg-[#FF3C3C]"}`}
                          />
                        )}
                      </div>
                    </>
                  );
                }}
              />
            </ScrollRegion>
            {/* Height snaps (no max-height tween); the opened detail enters
                from 70% via animate-enter-up. Border colour still eases. */}
            <div
              {...(activeProject
                ? tabPanelProps("projects-folder", activeProject.id)
                : { id: "projects-folder-panel" })}
              className={`border overflow-hidden ${activeProject ? "border-accent-fill" : "border-[#E0E0E0] dark:border-[#3D3D3D]"}`}
              style={{
                maxHeight: activeProject ? "600px" : "52px",
                transition: "border-color 0.2s ease",
              }}
            >
              {!activeProject && (
                <div className="px-6 py-4 flex items-center gap-3 text-xs text-[#6B6B6B] dark:text-[#9A9A9A] tracking-wide select-none">
                  <span>↑</span>
                  <span>{t("projectsPage.selectFolder")}</span>
                </div>
              )}
              {activeProject && (
                <div className="animate-enter-up">
                  <ProjectDetail project={activeProject} />
                </div>
              )}
            </div>
          </div>

          {/* Mobile accordion */}
          <div className="md:hidden border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
            {filtered.map((project, i) => {
              const isOpen = openId === project.id;
              return (
                <div key={project.id} className="border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
                  <button
                    onClick={() => handleSelect(project.id)}
                    className="w-full flex items-center gap-4 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A] tabular-nums w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="text-sm font-medium block truncate">{project.title}</span>
                      <span className="text-xs text-[#595959] dark:text-[#AAAAAA]">
                        {project.tag}
                      </span>
                    </span>
                    {project.current && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0" />
                    )}
                    <span
                      className={`text-[#595959] dark:text-[#AAAAAA] transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  {/* Height snaps (no max-height tween); the revealed content
                      enters from 70% via animate-enter-up instead. */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "none" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className={`pb-6 pl-9 space-y-4 ${isOpen ? "animate-enter-up" : ""}`}>
                      <p className="text-xs text-[#595959] dark:text-[#AAAAAA]">
                        {project.org} · {project.period}
                      </p>
                      <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                        {project.summary}
                      </p>
                      <div className="p-3 bg-[#FFF5F5] dark:bg-[#1A1111] rounded-lg">
                        <span className="inline-block mb-1.5 px-2 py-0.5 bg-accent-fill text-white text-[9px] tracking-widest uppercase font-mono rounded-full">
                          {t("projects.impact")}
                        </span>
                        <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed font-medium">
                          {project.impact}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((t) => (
                          <span
                            key={t}
                            className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {(project.link || project.demo || project.caseStudy) && (
                        <div className="flex flex-wrap gap-2">
                          {project.caseStudy && (
                            <Link
                              href={project.caseStudy}
                              aria-label={`Read the ${project.title} case study`}
                              className="inline-flex items-center gap-2 border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] px-4 py-1.5 text-xs tracking-widest uppercase text-white dark:text-[#0A0A0A] rounded-full hover:bg-black dark:hover:bg-white transition-colors duration-200"
                            >
                              Read case study →
                            </Link>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={
                                project.demoLabel || `Open the live ${project.title} demo`
                              }
                              className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
                            >
                              Live demo ↗
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={project.linkLabel || `View ${project.title} on GitHub`}
                              className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
                            >
                              {project.linkText ||
                                (project.link?.includes("github.com")
                                  ? `${t("projects.viewOnGithub")} ↗`
                                  : `${t("projects.viewOnGithub")} ↗`)}
                            </a>
                          )}
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://rin.contact/projects")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A] px-2.5 py-1 text-[10px] tracking-widest uppercase text-ink-subtle hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors"
                          aria-label="Share on LinkedIn"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                        <a
                          href={`https://x.com/intent/tweet?text=${encodeURIComponent(`Check out "${project.title}" — ${project.summary.split(".")[0]}.`)}&url=${encodeURIComponent("https://rin.contact/projects")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A] px-2.5 py-1 text-[10px] tracking-widest uppercase text-ink-subtle hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors"
                          aria-label="Share on X"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
