/**
 * GlyphCounters — an instrument-panel band of live counts under the hero.
 *
 * Each count is set in the dot-matrix display font and counts up once the band
 * is in view, with a Nothing-style glyph light strip underneath: segments light
 * in proportion as the number climbs, then a red head sweeps the strip every few
 * seconds. A dot field behind the band glows red under the cursor (desktop).
 *
 * The numbers come from getStaticProps on the home page, which reads the same
 * data the rest of the site uses, so they can't drift from the pages they link to.
 * Reduced motion shows the final numbers and a still strip.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const HeroDotField = dynamic(() => import("@/components/ui/HeroDotField"), { ssr: false });

const SEGMENTS = 18;
const COUNT_MS = 1100;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const COPY = {
  en: {
    label: "By the numbers",
    note: "Counted from the site's own records at build time.",
    items: {
      roles: ["Roles", "government, research and startups"],
      projects: ["Projects", "each with a live demo"],
      coursework: ["Coursework revived", "rebuilt and re-checked"],
      skills: ["Evidenced skills", "every one linked to proof"],
    },
  },
  zh: {
    label: "数据一览",
    note: "构建时从网站自己的记录里统计。",
    items: {
      roles: ["工作角色", "政府、科研与创业"],
      projects: ["项目", "每个都有在线演示"],
      coursework: ["复活的课程项目", "重建并复核"],
      skills: ["有据可查的技能", "每一项都附证据"],
    },
  },
};

const HREF = {
  roles: "/career",
  projects: "/projects",
  coursework: "/projects/coursework",
  skills: "/skills",
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

function useCountUp(target, started, reduce) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduce || !started) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / COUNT_MS);
      setValue(Math.round(target * easeOut(k)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, started, reduce]);
  return reduce ? target : value;
}

function Counter({ id, target, started, reduce, index, copy }) {
  const value = useCountUp(target, started, reduce);
  const [label, sub] = copy.items[id];
  const lit = target > 0 ? Math.round((value / target) * SEGMENTS) : 0;
  const done = value === target && (started || reduce);

  return (
    <Link
      href={HREF[id]}
      className="group relative flex flex-col gap-3 px-6 py-8 md:px-8 md:py-10 bg-white/80 dark:bg-[#0A0A0A]/80 hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors duration-200"
    >
      <span className="font-mono text-[11px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className="font-display text-5xl md:text-6xl leading-none tabular-nums text-black dark:text-white group-hover:text-[#FF3C3C] transition-colors duration-200"
        aria-hidden="true"
      >
        {value}
      </span>
      <span className="sr-only">
        {target} {label}
      </span>
      {/* Glyph strip */}
      <span className="glyph-strip flex gap-[3px]" aria-hidden="true">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span
            key={i}
            className={`glyph-seg h-[5px] flex-1 rounded-full ${
              i < lit
                ? i === lit - 1 && !done
                  ? "bg-[#FF3C3C]"
                  : "bg-black/80 dark:bg-white/85"
                : "bg-black/10 dark:bg-white/10"
            } ${done && !reduce ? "glyph-sweep" : ""}`}
            style={done && !reduce ? { animationDelay: `${index * 0.35 + i * 0.06}s` } : undefined}
          />
        ))}
      </span>
      <span className="text-sm font-medium tracking-wide uppercase text-black dark:text-white">
        {label}
      </span>
      <span className="text-xs font-light text-[#6E6E6E] dark:text-[#9A9A9A] -mt-2">{sub}</span>
    </Link>
  );
}

export default function GlyphCounters({ stats }) {
  const { locale = "en-AU" } = useRouter();
  const copy = COPY[locale === "zh-Hans" ? "zh" : "en"];
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();

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
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!stats) return null;
  const ids = ["roles", "projects", "coursework", "skills"].filter(
    (id) => typeof stats[id] === "number"
  );

  return (
    <section
      ref={ref}
      aria-label={copy.label}
      className="relative overflow-hidden border-y border-[#E0E0E0] dark:border-[#3D3D3D]"
      data-guide="glyph-counters"
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E0E0E0] dark:bg-[#3D3D3D] border border-[#E0E0E0] dark:border-[#3D3D3D]">
          {ids.map((id, i) => (
            <Counter
              key={id}
              id={id}
              index={i}
              target={stats[id]}
              started={started}
              reduce={reduce}
              copy={copy}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        :global(.glyph-sweep) {
          animation: glyph-sweep 3.6s ease-in-out infinite;
        }
        @keyframes glyph-sweep {
          92% {
            background-color: #ff3c3c;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.glyph-sweep) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
