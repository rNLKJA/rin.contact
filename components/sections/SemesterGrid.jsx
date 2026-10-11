/**
 * SemesterGrid — timeline of coursework labs by term and level.
 *
 * Every COURSEWORK entry (lib/coursework-data.js) becomes its own 10-14px lit cell:
 * columns = terms in chronological order (term {year, semester}),
 * two rows = undergraduate and master's (LEVELS from the data file).
 * Cells light in chronological order on first view. Hover/focus reads out
 * subject code + title, mono line with term and team/individual. Click scrolls
 * to that lab's entry (find its anchor id). Idle: "{n} labs revived" + year span.
 * Matches CareerInstrument style: compact glyph grid, dot-matrix readout.
 *
 * Reduced motion shows all cells lit immediately, no sweep.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const HeroDotField = dynamic(() => import("@/components/ui/HeroDotField"), { ssr: false });

const COPY = {
  en: {
    label: "Coursework timeline",
    note: "Each cell is a lab. Hover to read, click to jump.",
    idle: (n) => `${n} lab${n === 1 ? "" : "s"} revived`,
    idleSub: (from, to) => `${from} to ${to} · undergraduate and master's`,
    individual: "individual",
    team: (n) => `team of ${n}`,
    levels: {
      undergraduate: "Undergraduate",
      master: "Master's",
    },
  },
  zh: {
    label: "课程项目时间线",
    note: "每个格子是一个实验室。悬停读取，点击跳转。",
    idle: (n) => `已重建 ${n} 个课程实验室`,
    idleSub: (from, to) => `${from} 至 ${to} · 本科与硕士`,
    individual: "个人",
    team: (n) => `${n} 人团队`,
    levels: {
      undergraduate: "本科",
      master: "硕士",
    },
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

/** Term key for sorting: "2019-2", "2020-1.5", etc. */
function termKey(term) {
  const sem = term.semester === "winter" ? "1.5" : String(term.semester);
  return `${term.year}-${sem}`;
}

function termLabel(term, lang) {
  if (term.semester === "winter")
    return lang === "zh" ? `${term.year} 冬季` : `${term.year} Winter`;
  return lang === "zh" ? `${term.year} S${term.semester}` : `${term.year} S${term.semester}`;
}

export default function SemesterGrid({ coursework = [] }) {
  const router = useRouter();
  const { locale = "en-AU" } = router;
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(null);

  // Extract unique terms in order
  const terms = Array.from(new Set(coursework.map((c) => termKey(c.term)))).sort();

  const levels = ["undergraduate", "master"];

  // Year span
  const years = coursework.map((c) => c.term.year);
  const from = Math.min(...years);
  const to = Math.max(...years);

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
  const current = active ? coursework.find((c) => c.slug === active) : null;

  const jump = (slug) => {
    const target = document.getElementById(slug);
    if (!target) return;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${slug}`);
  };

  // Build a map: termKey -> level -> array of labs
  const grid = {};
  terms.forEach((tk) => {
    grid[tk] = { undergraduate: [], master: [] };
  });
  coursework.forEach((c) => {
    const tk = termKey(c.term);
    grid[tk][c.level].push(c);
  });

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
                {current.subjectCode} · {termLabel(current.term, lang)} ·{" "}
                {current.team.length === 0 ? copy.individual : copy.team(current.team.length + 1)}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-3xl md:text-5xl leading-none text-black dark:text-white m-0">
                {copy.idle(coursework.length)}
              </p>
              <p className="font-mono text-[11px] md:text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mt-3 m-0">
                {copy.idleSub(from, to)}
              </p>
            </>
          )}
        </div>

        {/* The grid: wrapping flex, no inner scrollbars */}
        <div className="flex flex-wrap gap-3">
          {/* Level labels column (always first) */}
          <div className="w-[72px] md:w-20 flex-shrink-0 flex flex-col gap-2">
            <div className="h-6 flex items-center">
              <span className="text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#B71C1C] dark:text-[#FF3C3C]">
                Level
              </span>
            </div>
            {levels.map((lvl) => (
              <div key={lvl} className="h-auto min-h-[28px] flex items-center">
                <span className="text-[10px] md:text-xs font-medium text-black dark:text-white leading-tight">
                  {copy.levels[lvl]}
                </span>
              </div>
            ))}
          </div>

          {/* Term columns: each lab is its own cell, stacked if multiple labs per term/level */}
          {terms.map((tk) => {
            const termObj = coursework.find((c) => termKey(c.term) === tk)?.term;
            if (!termObj) return null;

            return (
              <div
                key={tk}
                className="flex flex-col gap-2 w-auto min-w-[52px] md:min-w-[64px] flex-shrink-0"
              >
                {/* Term header */}
                <div className="h-6 flex items-center justify-center">
                  <span className="text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
                    {termLabel(termObj, lang)}
                  </span>
                </div>

                {/* Cells for each level */}
                {levels.map((lvl) => {
                  const labs = grid[tk][lvl];

                  return (
                    <div
                      key={lvl}
                      className="flex flex-wrap gap-1 items-center justify-center min-h-[28px]"
                    >
                      {labs.map((lab) => {
                        const hot = active === lab.slug;
                        const dim = active && !hot;
                        const chronoIndex = coursework.findIndex((c) => c.slug === lab.slug);

                        return (
                          <button
                            key={lab.slug}
                            data-lab-cell
                            onClick={() => jump(lab.slug)}
                            onMouseEnter={() => setActive(lab.slug)}
                            onFocus={() => setActive(lab.slug)}
                            onBlur={() => setActive(null)}
                            aria-label={`${lab.subjectCode} ${lab.title}, ${termLabel(termObj, lang)}, ${
                              lab.team.length === 0
                                ? copy.individual
                                : copy.team(lab.team.length + 1)
                            }`}
                            className="outline-none focus-visible:ring-2 focus-visible:ring-[#FF3C3C] transition-all duration-300"
                            style={{
                              transitionDelay: on && !active ? `${chronoIndex * 40}ms` : "0ms",
                            }}
                          >
                            <span
                              className={`block w-[11px] h-[11px] md:w-[13px] md:h-[13px] rounded-[2px] transition-all duration-300 ${
                                on
                                  ? hot
                                    ? "bg-[#FF3C3C] scale-110"
                                    : dim
                                      ? "bg-black/20 dark:bg-white/20"
                                      : "bg-black dark:bg-white"
                                  : "bg-black/10 dark:bg-white/10"
                              }`}
                            />
                          </button>
                        );
                      })}
                      {labs.length === 0 && <span className="w-[11px] md:w-[13px]" />}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
