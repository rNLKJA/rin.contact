/**
 * ProjectField — a visual timeline of all projects as glyph nodes.
 *
 * Every project from PROJECTS (lib/projects-data.js) becomes a lit glyph node:
 * x = start year/month parsed from its period, y = lanes by its domain/category.
 * Nodes light left to right on first view; hover/focus shows title, period and
 * domain in dot-matrix; click scrolls to the card (or opens it if the page does).
 * Category chips above the field dim non-matching nodes. Idle: "{n} projects".
 *
 * Reduced motion shows all nodes lit immediately, no sweep.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { projectAnchor } from "@/lib/projects-data";

const HeroDotField = dynamic(() => import("@/components/ui/HeroDotField"), { ssr: false });

const COPY = {
  en: {
    label: "Project timeline",
    note: "Each node is a project. Hover to read, click to jump.",
    idle: (n) => `${n} project${n === 1 ? "" : "s"}`,
    idleSub: "Since 2019 · spanning 10 domains",
  },
  zh: {
    label: "项目时间线",
    note: "每个节点是一个项目。悬停读取，点击跳转。",
    idle: (n) => `${n} 个项目`,
    idleSub: "始于 2019 · 跨 10 个领域",
  },
};

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false
  );

/** Parse "Jun 2026", "Aug 2025 – Present", etc. to a fractional year for x. */
function parseStartYear(period) {
  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const match = period.match(/^(\w+)\s+(\d{4})/);
  if (!match) return 2019; // fallback
  const [, mon, yr] = match;
  const y = parseInt(yr, 10);
  const m = months[mon] ?? 0;
  return y + m / 12;
}

export default function ProjectField({ projects = [] }) {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");

  // Extract unique domains (category or first domain in array)
  const allDomains = Array.from(
    new Set(projects.map((p) => (Array.isArray(p.domain) ? p.domain[0] : p.domain)))
  ).sort();

  // Map projects to timeline coordinates
  const nodes = projects.map((p) => {
    const x = parseStartYear(p.period);
    const domain = Array.isArray(p.domain) ? p.domain[0] : p.domain;
    const yIndex = allDomains.indexOf(domain);
    return {
      id: p.id,
      x,
      y: yIndex,
      title: p.title,
      period: p.period,
      domain,
      tag: p.tag,
    };
  });

  const filtered = filter === "all" ? nodes : nodes.filter((n) => n.domain === filter);
  const now = new Date().getFullYear() + new Date().getMonth() / 12;
  const minX = Math.min(...nodes.map((n) => n.x));
  const maxX = now;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const on = started || reduce;
  const current = filtered.find((n) => n.id === active);

  const jump = (id) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    const anchor = projectAnchor(project);
    if (!anchor) {
      // Featured or has its own case-study page: do nothing or navigate
      return;
    }
    const target = document.getElementById(anchor);
    if (!target) return;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${anchor}`);
  };

  return (
    <section
      ref={ref}
      aria-label={copy.label}
      className="relative overflow-hidden border-y border-[#E0E0E0] dark:border-[#3D3D3D]"
      onMouseLeave={() => setActive(null)}
    >
      <HeroDotField />
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Label row */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <p className="text-xs tracking-widest uppercase text-[#B71C1C] dark:text-[#FF3C3C] m-0">
            <span aria-hidden="true">■ — </span>
            {copy.label}
          </p>
          <p className="text-xs text-[#6E6E6E] dark:text-[#9A9A9A] m-0">{copy.note}</p>
        </div>

        {/* Readout box */}
        <div
          className="border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white/80 dark:bg-[#0A0A0A]/80 px-5 py-4 md:px-6 md:py-5 mb-6 min-h-[104px] md:min-h-[116px]"
          aria-live="polite"
        >
          {current ? (
            <>
              <p className="font-display text-2xl md:text-4xl leading-tight text-black dark:text-white m-0">
                {current.title}
              </p>
              <p className="font-mono text-[11px] md:text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mt-2 m-0">
                {current.period} · {current.domain}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-3xl md:text-5xl leading-none text-black dark:text-white m-0">
                {copy.idle(filtered.length)}
              </p>
              <p className="font-mono text-[11px] md:text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mt-3 m-0">
                {copy.idleSub}
              </p>
            </>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by domain">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-xs font-medium tracking-wide uppercase border transition-colors duration-200 ${
              filter === "all"
                ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                : "bg-white dark:bg-[#0A0A0A] text-black dark:text-white border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white"
            }`}
          >
            All
          </button>
          {allDomains.map((d) => {
            const count = nodes.filter((n) => n.domain === d).length;
            return (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1 text-xs font-medium tracking-wide uppercase border transition-colors duration-200 ${
                  filter === d
                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                    : "bg-white dark:bg-[#0A0A0A] text-black dark:text-white border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white"
                }`}
              >
                {d} ({count})
              </button>
            );
          })}
        </div>

        {/* The field */}
        <div
          className="relative bg-white/50 dark:bg-[#0A0A0A]/50 border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 md:p-8"
          style={{ minHeight: "320px" }}
        >
          {filtered.map((n, i) => {
            const xFrac = (n.x - minX) / (maxX - minX);
            const yFrac = (n.y + 0.5) / Math.max(allDomains.length, 1);
            const hot = active === n.id;
            const dim = active && !hot && filter === "all";
            const lit = on;

            return (
              <button
                key={n.id}
                onClick={() => jump(n.id)}
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                aria-label={`${n.title}, ${n.period}, ${n.domain}`}
                className="absolute outline-none focus-visible:ring-2 focus-visible:ring-[#FF3C3C] transition-all duration-300"
                style={{
                  left: `${xFrac * 100}%`,
                  top: `${yFrac * 100}%`,
                  transform: "translate(-50%, -50%)",
                  transitionDelay: lit && !active ? `${i * 30}ms` : "0ms",
                }}
              >
                <span
                  className={`block w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                    lit
                      ? hot
                        ? "bg-[#FF3C3C] scale-125"
                        : dim
                          ? "bg-black/20 dark:bg-white/20"
                          : "bg-black dark:bg-white"
                      : "bg-black/10 dark:bg-white/10"
                  }`}
                />
              </button>
            );
          })}

          {/* Lane labels (left side) */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around pointer-events-none pl-2">
            {allDomains.map((d) => (
              <span
                key={d}
                className={`text-[10px] font-mono tracking-widest uppercase transition-opacity duration-300 ${
                  filter === "all" || filter === d
                    ? "text-[#6E6E6E] dark:text-[#9A9A9A] opacity-100"
                    : "opacity-30"
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Year axis (bottom) */}
          <div className="absolute left-0 right-0 bottom-0 h-6 flex items-end justify-between px-8 pointer-events-none">
            {[Math.floor(minX), Math.floor((minX + maxX) / 2), Math.ceil(maxX)].map((yr) => (
              <span
                key={yr}
                className="text-[10px] md:text-[11px] font-mono text-[#6E6E6E] dark:text-[#9A9A9A]"
              >
                {yr}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
