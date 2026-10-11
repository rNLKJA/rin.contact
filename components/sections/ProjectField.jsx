/**
 * ProjectField — a visual timeline of all projects as glyph nodes.
 *
 * Every project from PROJECTS (lib/projects-data.js) becomes a lit 8-10px glyph:
 * x = start year/month parsed from its period, y = lanes by its domain/category.
 * Nodes light left to right on first view; hover/focus shows title, period and
 * domain in the readout; click scrolls to the card. Category chips filter.
 * Idle: "{n} projects". Matches CareerInstrument style: compact glyph grid, dot-matrix
 * readout, hairline borders, section shell.
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

/** Parse period to a fractional year. Handles: "Jun 2026", "Aug 2025 – Present", "2020 – Present", "2024 – 2025". */
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
  // Try "MMM YYYY" or "MMM YYYY – ..."
  const monthYear = period.match(/^(\w+)\s+(\d{4})/);
  if (monthYear) {
    const [, mon, yr] = monthYear;
    const y = parseInt(yr, 10);
    const m = months[mon] ?? 0;
    return y + m / 12;
  }
  // Try "YYYY" or "YYYY – ..."
  const yearOnly = period.match(/^(\d{4})/);
  if (yearOnly) {
    return parseInt(yearOnly[1], 10);
  }
  // Fallback
  // eslint-disable-next-line no-console
  console.warn(`ProjectField: Could not parse period "${period}", defaulting to 2019`);
  return 2019;
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

  // Map projects to timeline coordinates, with collision detection
  const nodes = projects.map((p, idx) => {
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
      idx,
    };
  });

  // Apply collision avoidance: if multiple nodes share the same x,y, offset them slightly
  const occupied = new Map();
  nodes.forEach((n) => {
    const key = `${n.x.toFixed(2)},${n.y}`;
    const count = occupied.get(key) || 0;
    n.offsetX = count * 0.01; // 1% offset per collision (reduced from 1.5%)
    n.offsetY = (count % 2) * 0.02 - 0.01; // alternate above/below (reduced from 3%)
    occupied.set(key, count + 1);
  });

  const filtered = filter === "all" ? nodes : nodes.filter((n) => n.domain === filter);
  const now = new Date().getFullYear();
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
    if (!anchor) return;
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

        {/* The plot */}
        <div className="relative flex gap-2">
          {/* Lane labels (left) */}
          <div
            data-lane-labels
            className="w-20 md:w-24 flex-shrink-0 flex flex-col justify-around text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] py-2"
          >
            {allDomains.map((d) => (
              <span
                key={d}
                className={`leading-tight transition-opacity duration-300 ${
                  filter === "all" || filter === d ? "opacity-100" : "opacity-30"
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Plot area with dot grid + nodes */}
          <div data-plot className="relative flex-1 min-w-0 min-h-[280px] md:min-h-[320px]">
            {/* Faint dot grid background */}
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
                backgroundSize: "16px 16px",
                backgroundPosition: "0 0",
              }}
              aria-hidden="true"
            />

            {/* Project nodes (inset by 8px to keep translate(-50%, -50%) within bounds) */}
            <div className="absolute inset-0" style={{ padding: "8px" }}>
              <div className="relative w-full h-full">
                {filtered.map((n) => {
                  // Clamp coordinates to keep nodes fully inside plot container
                  let xFrac = (n.x - minX) / (maxX - minX) + (n.offsetX || 0);
                  let yFrac = (n.y + 0.5) / Math.max(allDomains.length, 1) + (n.offsetY || 0);
                  // Clamp to [0.01, 0.99] to ensure translate(-50%, -50%) stays inside
                  xFrac = Math.max(0.01, Math.min(0.99, xFrac));
                  yFrac = Math.max(0.01, Math.min(0.99, yFrac));
                  const hot = active === n.id;
                  const dim = active && !hot && filter === "all";
                  const lit = on;

                  return (
                    <button
                      key={n.id}
                      data-project-node
                      onClick={() => jump(n.id)}
                      onMouseEnter={() => setActive(n.id)}
                      onFocus={() => setActive(n.id)}
                      onBlur={() => setActive(null)}
                      aria-label={`${n.title}, ${n.period}, ${n.domain}`}
                      className="absolute outline-none focus-visible:ring-2 focus-visible:ring-[#FF3C3C] focus-visible:ring-offset-1 transition-all duration-300"
                      style={{
                        left: `${xFrac * 100}%`,
                        top: `${yFrac * 100}%`,
                        transform: "translate(-50%, -50%)",
                        transitionDelay: lit && !active ? `${n.idx * 30}ms` : "0ms",
                      }}
                    >
                      <span
                        className={`block w-[9px] h-[9px] rounded-[2px] transition-all duration-300 pointer-events-none ${
                          lit
                            ? hot
                              ? "bg-[#FF3C3C] scale-110"
                              : dim
                                ? "bg-black/[0.07] dark:bg-white/[0.07]"
                                : "bg-black dark:bg-white"
                            : "bg-black/[0.07] dark:bg-white/[0.07]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Year ticks (bottom) */}
            <div
              className="absolute left-0 right-0 bottom-0 flex justify-between items-end h-6 px-3 text-[10px] font-mono text-[#6E6E6E] dark:text-[#9A9A9A] pointer-events-none"
              aria-hidden="true"
            >
              {[Math.floor(minX), Math.floor((minX + maxX) / 2), maxX].map((yr) => (
                <span key={yr} data-year-tick>
                  {yr}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
