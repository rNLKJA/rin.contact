/**
 * AboutOpener — the creative opener for /about.
 *
 * Three parts in the Nothing-OS visual language (dot-matrix + glyph lights):
 * 1. Local time panel: Adelaide time clock (updates per minute), weekday, 24-segment
 *    hour strip (current hour red, daytime 07-19 lit ink). No availability claims.
 * 2. How I work: four stages (Frame → Evidence → Recommend → Ship) light in sequence
 *    when scrolled into view, loop every ~6s. Hover/focus shows a real example from
 *    career-data.js in dot-matrix, naming the role. Examples fit each stage.
 * 3. Facts strip: 5 glyph counters computed at build from career-data.js: roles,
 *    degrees (University of Melbourne in EDUCATION), credentials, languages (2),
 *    cities (Adelaide, Melbourne). Count up on first view like GlyphCounters.
 *
 * Client-only for the clock (dynamic ssr:false with sized placeholder). EN + zh-Hans
 * copy, Australian spelling, no em dashes, no semicolons in prose, NO EMOJI. Standard
 * cursor only. Accessible: keyboard focus, aria-live, reduced motion, no layout shift.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ROLES, EDUCATION, CERTS } from "@/lib/career-data";

const HeroDotField = dynamic(() => import("@/components/ui/HeroDotField"), { ssr: false });

const STAGES = ["Frame", "Evidence", "Recommend", "Ship"];
const STAGES_ZH = ["构建框架", "收集证据", "提出建议", "交付"];
const STAGE_LOOP_MS = 6000;
const STAGE_HOLD_MS = 1200;

// Real examples from career-data.js, matched to each stage. Paraphrased from bullets.
const EXAMPLES = {
  en: [
    {
      stage: "Frame",
      text: "Led an end-to-end review of the complaint workflow from receipt to closure",
      role: "SAPOL",
    },
    {
      stage: "Evidence",
      text: "Analysed 400+ inspections with time series, clustering and multivariate methods",
      role: "CBS",
    },
    {
      stage: "Recommend",
      text: "Designed the inspection scheduling framework for 1,500+ licensed sites",
      role: "CBS",
    },
    {
      stage: "Ship",
      text: "Built a Python client for 1,100+ complaint-management API endpoints",
      role: "SAPOL",
    },
  ],
  zh: [
    {
      stage: "构建框架",
      text: "主导投诉流程的全流程审查，从受理到结案",
      role: "SAPOL",
    },
    {
      stage: "收集证据",
      text: "用时间序列、聚类和多元统计方法分析 400 多次检查",
      role: "CBS",
    },
    {
      stage: "提出建议",
      text: "为 1,500 多个持牌场所设计检查排期框架",
      role: "CBS",
    },
    {
      stage: "交付",
      text: "为 1,100 多个投诉管理系统接口编写 Python 客户端",
      role: "SAPOL",
    },
  ],
};

const COPY = {
  en: {
    label: "Right now",
    timeCaption: "Adelaide, South Australia",
    howIWork: "How I work",
    roles: "Roles",
    degrees: "Degrees",
    credentials: "Credentials",
    languages: "Languages",
    cities: "Cities",
  },
  zh: {
    label: "此刻",
    timeCaption: "南澳大利亚 阿德莱德",
    howIWork: "我的工作方式",
    roles: "工作角色",
    degrees: "学位",
    credentials: "认证",
    languages: "语言",
    cities: "城市",
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

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target, started, reduce) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduce || !started) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / 1100);
      setValue(Math.round(target * easeOut(k)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, started, reduce]);
  return reduce ? target : value;
}

function Counter({ label, target, started, reduce }) {
  const value = useCountUp(target, started, reduce);
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="font-display text-4xl md:text-5xl leading-none tabular-nums text-black dark:text-white"
        aria-label={`${target} ${label}`}
      >
        {value}
      </span>
      <span className="text-xs tracking-wide uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
        {label}
      </span>
    </div>
  );
}

function TimePanel() {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];
  const [time, setTime] = useState(null);
  const [weekday, setWeekday] = useState("");
  const [currentHour, setCurrentHour] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const adelaide = new Intl.DateTimeFormat(locale, {
        timeZone: "Australia/Adelaide",
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      const day = new Intl.DateTimeFormat(locale, {
        timeZone: "Australia/Adelaide",
        weekday: "long",
      }).format(now);
      const parts = new Intl.DateTimeFormat(locale, {
        timeZone: "Australia/Adelaide",
        hour: "numeric",
        hour12: false,
      }).formatToParts(now);
      const hr = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
      setTime(adelaide);
      setWeekday(day);
      setCurrentHour(hr);
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [locale]);

  if (!time) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-5xl md:text-6xl leading-none tabular-nums text-black dark:text-white">
          {time}
        </span>
        <span className="text-sm tracking-wide uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
          {weekday}
        </span>
      </div>
      <div className="flex gap-[3px]" aria-hidden="true">
        {Array.from({ length: 24 }, (_, h) => {
          const isCurrent = h === currentHour;
          const isDaytime = h >= 7 && h <= 19;
          return (
            <span
              key={h}
              className={`h-[5px] flex-1 rounded-full ${
                isCurrent
                  ? "bg-[#FF3C3C]"
                  : isDaytime
                    ? "bg-black/80 dark:bg-white/85"
                    : "bg-black/10 dark:bg-white/10"
              }`}
            />
          );
        })}
      </div>
      <span className="text-xs text-[#6E6E6E] dark:text-[#9A9A9A]">{copy.timeCaption}</span>
    </div>
  );
}

function HowIWorkPanel({ started, reduce }) {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];
  const stages = lang === "zh" ? STAGES_ZH : STAGES;
  const examples = EXAMPLES[lang];
  const [activeStage, setActiveStage] = useState(0);
  const [hoverStage, setHoverStage] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (reduce || !started) return;
    const cycle = () => {
      setActiveStage((prev) => (prev + 1) % 4);
      timerRef.current = setTimeout(cycle, STAGE_LOOP_MS);
    };
    timerRef.current = setTimeout(cycle, STAGE_HOLD_MS);
    return () => clearTimeout(timerRef.current);
  }, [started, reduce, activeStage]);

  const displayStage = hoverStage !== null ? hoverStage : activeStage;
  const example = examples[displayStage];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm tracking-wide uppercase text-black dark:text-white m-0">
        {copy.howIWork}
      </p>
      <div className="flex gap-3 md:gap-4">
        {stages.map((stage, i) => {
          const isActive = started && (reduce ? i === 0 : i <= activeStage);
          const isHovered = hoverStage === i;
          return (
            <button
              key={i}
              onMouseEnter={() => setHoverStage(i)}
              onMouseLeave={() => setHoverStage(null)}
              onFocus={() => setHoverStage(i)}
              onBlur={() => setHoverStage(null)}
              className="flex-1 min-w-0 h-16 md:h-20 border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white/80 dark:bg-[#0A0A0A]/80 hover:bg-white dark:hover:bg-[#0A0A0A] transition-colors duration-200 flex flex-col items-start justify-between px-3 py-2 md:px-4 md:py-3 text-left outline-none focus-visible:ring-1 focus-visible:ring-[#FF3C3C]"
              aria-label={`${stage}: ${examples[i].text}, ${examples[i].role}`}
            >
              <span className="flex w-full items-center justify-between">
                <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`block w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    isActive || isHovered ? "bg-[#FF3C3C]" : "bg-black/10 dark:bg-white/10"
                  }`}
                />
              </span>
              <span
                className={`font-mono text-[11px] md:text-xs tracking-widest uppercase truncate max-w-full transition-colors duration-300 ${
                  isActive || isHovered
                    ? "text-black dark:text-white"
                    : "text-[#9A9A9A] dark:text-[#6B6B6B]"
                }`}
              >
                {stage}
              </span>
            </button>
          );
        })}
      </div>
      <div
        className="border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white/80 dark:bg-[#0A0A0A]/80 px-4 py-3 min-h-[88px]"
        aria-live="polite"
      >
        <p className="font-display text-sm md:text-base leading-relaxed text-black dark:text-white m-0 mb-2">
          {example.text}
        </p>
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] m-0">
          {stages[displayStage]} · {example.role}
        </p>
      </div>
    </div>
  );
}

function FactsStrip({ started, reduce }) {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];

  const roleCount = ROLES.length;
  const degreeCount = EDUCATION.filter(
    (e) => !e.secondary && (e.en.org === "University of Melbourne" || e.zh.org === "墨尔本大学")
  ).length;
  const credCount = CERTS.length;
  const langCount = 2;
  const cityCount = 2;

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
      <Counter label={copy.roles} target={roleCount} started={started} reduce={reduce} />
      <Counter label={copy.degrees} target={degreeCount} started={started} reduce={reduce} />
      <Counter label={copy.credentials} target={credCount} started={started} reduce={reduce} />
      <Counter label={copy.languages} target={langCount} started={started} reduce={reduce} />
      <Counter label={copy.cities} target={cityCount} started={started} reduce={reduce} />
    </div>
  );
}

function AboutOpenerClient() {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label={copy.label}
      className="relative overflow-hidden border-y border-[#E0E0E0] dark:border-[#3D3D3D]"
    >
      <HeroDotField />
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-10 md:py-14">
        <p className="text-xs tracking-widest uppercase text-[#B71C1C] dark:text-[#FF3C3C] mb-6 m-0">
          <span aria-hidden="true">■ — </span>
          {copy.label}
        </p>
        <div className="space-y-10 md:space-y-12">
          <TimePanel />
          <HowIWorkPanel started={started} reduce={reduce} />
          <FactsStrip started={started} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

// Sized placeholder for SSR to prevent layout shift.
function AboutOpenerPlaceholder() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-[#E0E0E0] dark:border-[#3D3D3D]"
    >
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-10 md:py-14">
        <div style={{ minHeight: "580px" }} />
      </div>
    </section>
  );
}

export default dynamic(() => Promise.resolve(AboutOpenerClient), {
  ssr: false,
  loading: AboutOpenerPlaceholder,
});
