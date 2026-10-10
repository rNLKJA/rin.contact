/**
 * CareerInstrument — the career page's opening visual.
 *
 * Every role is a row of glyph lights, one light per month since January 2023,
 * grouped into the three tracks the metro map uses (government, research,
 * engineering). The lights switch on left to right when the panel comes into
 * view, a red "now" line sweeps to the current month, and ongoing roles pulse
 * at their last light. Hovering or focusing a row reads it out in the dot-matrix
 * display; clicking jumps to that role in the timeline below (#role-<id>).
 *
 * Everything comes from lib/career-data.js, so the panel can't drift from the
 * timeline. Rendered client-side only (it needs today's month); the timeline
 * below carries the same information for crawlers and screen readers.
 */
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getRoles } from "@/lib/career-data";

const HeroDotField = dynamic(() => import("@/components/ui/HeroDotField"), { ssr: false });

const ORIGIN_YEAR = 2023;
const TRACKS = ["government", "research", "engineering"];

const COPY = {
  en: {
    label: "Career signal",
    note: "Each light is a month. Hover a row to read it, click to jump to the role.",
    tracks: { government: "Government", research: "Research", engineering: "Engineering" },
    idle: (roles) => `${roles} roles`,
    idleSub: "Three tracks · since 2023",
    now: "Now",
    months: (m) => {
      const y = Math.floor(m / 12);
      const r = m % 12;
      if (!y) return `${m} month${m === 1 ? "" : "s"}`;
      return `${y} yr${r ? ` ${r} mo` : ""}`;
    },
    ongoing: "ongoing",
  },
  zh: {
    label: "职业信号",
    note: "每一格是一个月。悬停读取，点击跳到对应经历。",
    tracks: { government: "政府", research: "科研", engineering: "工程" },
    idle: (roles) => `${roles} 个角色`,
    idleSub: "三条轨道 · 始于 2023",
    now: "现在",
    months: (m) => `${m} 个月`,
    ongoing: "进行中",
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

/** Months since January of ORIGIN_YEAR for an ISO date (YYYY-MM-DD). */
function monthIndex(iso) {
  const [y, m] = String(iso).split("-").map(Number);
  return (y - ORIGIN_YEAR) * 12 + (m - 1);
}

export default function CareerInstrument() {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(null);

  const now = new Date();
  const nowIdx = (now.getFullYear() - ORIGIN_YEAR) * 12 + now.getMonth();
  const total = nowIdx + 1;

  const groups = useMemo(() => {
    const roles = getRoles(locale).map((r) => {
      const start = monthIndex(r.start);
      const end = r.current || !r.end ? nowIdx : monthIndex(r.end);
      return { ...r, s: start, e: Math.min(end, nowIdx) };
    });
    return TRACKS.map((track) => ({
      track,
      roles: roles.filter((r) => r.track === track).sort((a, b) => a.s - b.s),
    })).filter((g) => g.roles.length);
  }, [locale, nowIdx]);

  const allRoles = groups.flatMap((g) => g.roles);
  const current = allRoles.find((r) => r.id === active);

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
  const years = [];
  for (let y = ORIGIN_YEAR; (y - ORIGIN_YEAR) * 12 < total; y++) years.push(y);

  const jump = (id) => {
    const target = document.getElementById(`role-${id}`);
    if (!target) return;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#role-${id}`);
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
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <p className="text-xs tracking-widest uppercase text-[#B71C1C] dark:text-[#FF3C3C] m-0">
            <span aria-hidden="true">■ — </span>
            {copy.label}
          </p>
          <p className="text-xs text-[#6E6E6E] dark:text-[#9A9A9A] m-0">{copy.note}</p>
        </div>

        {/* Readout */}
        <div
          className="border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white/80 dark:bg-[#0A0A0A]/80 px-5 py-4 md:px-6 md:py-5 mb-6 min-h-[104px] md:min-h-[116px]"
          aria-live="polite"
        >
          {current ? (
            <>
              <p className="font-display text-2xl md:text-4xl leading-tight text-black dark:text-white m-0">
                {current.role}
              </p>
              <p className="font-mono text-[11px] md:text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mt-2 m-0">
                {current.org} · {current.period} · {copy.months(current.e - current.s + 1)}
                {current.current && (
                  <span className="text-[#B71C1C] dark:text-[#FF3C3C]"> · {copy.ongoing}</span>
                )}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-3xl md:text-5xl leading-none text-black dark:text-white m-0">
                {copy.idle(allRoles.length)}
              </p>
              <p className="font-mono text-[11px] md:text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mt-3 m-0">
                {copy.idleSub}
              </p>
            </>
          )}
        </div>

        {/* Lanes */}
        <div className="flex gap-3 md:gap-5">
          {/* Labels */}
          <div className="w-[92px] md:w-[230px] flex-shrink-0">
            {groups.map((g) => (
              <div key={g.track}>
                <p className="h-8 flex items-end pb-1 m-0 font-mono text-[10px] md:text-[11px] tracking-widest uppercase text-[#B71C1C] dark:text-[#FF3C3C]">
                  {copy.tracks[g.track]}
                </p>
                {g.roles.map((r) => (
                  <a
                    key={r.id}
                    href={`#role-${r.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      jump(r.id);
                    }}
                    onMouseEnter={() => setActive(r.id)}
                    onFocus={() => setActive(r.id)}
                    onBlur={() => setActive(null)}
                    aria-label={`${r.role}, ${r.org}, ${r.period}`}
                    className={`h-7 flex items-center text-xs truncate transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#FF3C3C] ${
                      active === r.id
                        ? "text-[#B71C1C] dark:text-[#FF3C3C]"
                        : active
                          ? "text-[#9A9A9A] dark:text-[#5C5C5C]"
                          : "text-black dark:text-white"
                    }`}
                  >
                    <span className="font-medium md:mr-2 truncate md:shrink-0">
                      {r.orgShort || r.org}
                    </span>
                    <span className="hidden md:inline min-w-0 text-[#6E6E6E] dark:text-[#9A9A9A] truncate">
                      {r.role}
                    </span>
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Strips */}
          <div className="relative flex-1 min-w-0" aria-hidden="true">
            {groups.map((g) => (
              <div key={g.track}>
                <div className="h-8" />
                {g.roles.map((r) => {
                  const hot = active === r.id;
                  const dim = active && !hot;
                  return (
                    <div
                      key={r.id}
                      className="h-7 flex items-center gap-px md:gap-[3px] cursor-pointer"
                      onMouseEnter={() => setActive(r.id)}
                      onClick={() => jump(r.id)}
                    >
                      {Array.from({ length: total }, (_, m) => {
                        const lit = m >= r.s && m <= r.e;
                        const head = lit && r.current && m === r.e;
                        let cls = "bg-black/[0.07] dark:bg-white/[0.08]";
                        if (lit && on) {
                          cls = hot
                            ? "bg-[#FF3C3C]"
                            : dim
                              ? "bg-black/25 dark:bg-white/25"
                              : "bg-black dark:bg-white";
                          if (head && !hot) cls = "bg-[#FF3C3C] career-pulse";
                        }
                        return (
                          <span
                            key={m}
                            className={`block h-[9px] md:h-[10px] flex-1 rounded-[2px] transition-colors duration-300 ${cls}`}
                            style={
                              lit && !reduce
                                ? { transitionDelay: started && !active ? `${m * 22}ms` : "0ms" }
                                : undefined
                            }
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Now line */}
            <div
              className="absolute top-6 bottom-0 w-px bg-[#FF3C3C] pointer-events-none"
              style={{
                left: on ? `${((nowIdx + 0.5) / total) * 100}%` : "0%",
                transition: reduce ? "none" : "left 2.4s cubic-bezier(0.2, 0.7, 0.2, 1)",
              }}
            >
              <span className="absolute -top-5 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase text-[#B71C1C] dark:text-[#FF3C3C] whitespace-nowrap">
                {copy.now}
              </span>
            </div>

            {/* Year axis */}
            <div className="relative h-6 mt-2">
              {years.map((y) => (
                <span
                  key={y}
                  className="absolute top-0 font-mono text-[10px] md:text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A]"
                  style={{ left: `${(((y - ORIGIN_YEAR) * 12) / total) * 100}%` }}
                >
                  {y}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        :global(.career-pulse) {
          animation: career-pulse 1.6s ease-in-out infinite;
        }
        @keyframes career-pulse {
          50% {
            opacity: 0.35;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.career-pulse) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
