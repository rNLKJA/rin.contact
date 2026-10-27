import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HeroDotField = dynamic(() => import("@/components/ui/HeroDotField"), { ssr: false });
// The placeholder reserves the canvas and its caption, so nothing moves when it loads.
const EvidenceField = dynamic(() => import("@/components/ui/EvidenceField"), {
  ssr: false,
  loading: () => (
    <div aria-hidden="true">
      <div className="w-full aspect-[16/11] md:aspect-[5/4]" />
      <div className="mt-3 h-[52px] md:h-[40px]" />
    </div>
  ),
});

// Inline SVGs — avoids react-icons bundle on critical hero path
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Greeting period keys mapped to translation keys
const GREETING_KEYS = {
  early: "hero.greeting.early",
  morning: "hero.greeting.morning",
  lunch: "hero.greeting.lunch",
  afternoon: "hero.greeting.afternoon",
  evening: "hero.greeting.evening",
  late: "hero.greeting.late",
  night: "hero.greeting.night",
};

// ─── Role line ───────────────────────────────────────────────────────────────
// The first role is rendered in full on the server and stays put for a few
// seconds; only then does the line start retyping the others. Under reduced
// motion it never cycles.
function useRoleCycle(words, reduce, { hold = 4000, type = 55, erase = 22, rest = 3200 } = {}) {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(words[0]?.length ?? 0);
  const [phase, setPhase] = useState("hold"); // hold | erase | type

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const word = words[idx];
    let timer;
    if (phase === "hold") {
      timer = setTimeout(() => setPhase("erase"), idx === 0 && chars === word.length ? hold : rest);
    } else if (phase === "erase") {
      if (chars > 0) timer = setTimeout(() => setChars((c) => c - 1), erase);
      else {
        setIdx((i) => (i + 1) % words.length);
        setPhase("type");
      }
    } else if (phase === "type") {
      if (chars < word.length) timer = setTimeout(() => setChars((c) => c + 1), type);
      else setPhase("hold");
    }
    return () => clearTimeout(timer);
  }, [words, idx, chars, phase, reduce, hold, type, erase, rest]);

  if (reduce || !words.length) return words[0] || "";
  return words[idx].slice(0, chars);
}

// ─── Call to action — square, monochrome, colour invert on hover ─────────────
function Cta({ href, primary, children }) {
  const cls =
    "inline-flex items-center justify-center gap-2 h-11 px-6 border text-xs font-medium tracking-widest uppercase rounded-none transition-colors duration-200 " +
    (primary
      ? "border-black bg-black text-white hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-transparent dark:hover:text-white"
      : "border-[#D0D0D0] text-black hover:border-black hover:bg-black hover:text-white dark:border-[#5C5C5C] dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black");
  // Same-page hash links (#contact) keep the native anchor for smooth scroll.
  return href.startsWith("#") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

// ─── Dot burst click effect ───────────────────────────────────────────────────
function useDotBurst() {
  const [bursts, setBursts] = useState([]);

  const spawn = useCallback((e) => {
    if (e.target.closest("a,button,input")) return;
    const id = Date.now() + Math.random();
    setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 700);
  }, []);

  return { spawn, bursts };
}

// ─── Time-of-day greeting — returns translation key ───────────────────────────
function useTimeGreeting() {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 9) setGreeting(GREETING_KEYS.early);
    else if (h >= 9 && h < 12) setGreeting(GREETING_KEYS.morning);
    else if (h >= 12 && h < 14) setGreeting(GREETING_KEYS.lunch);
    else if (h >= 14 && h < 17) setGreeting(GREETING_KEYS.afternoon);
    else if (h >= 17 && h < 20) setGreeting(GREETING_KEYS.evening);
    else if (h >= 20 && h < 23) setGreeting(GREETING_KEYS.late);
    else setGreeting(GREETING_KEYS.night);
  }, []);
  return greeting;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  const reduce = useReducedMotion();
  const roles = t("heroRoles");
  const tags = t("heroTags");
  const roleList = Array.isArray(roles) ? roles : [];
  const role = useRoleCycle(roleList, reduce);
  const greeting = useTimeGreeting();
  const { spawn, bursts } = useDotBurst();

  return (
    <section
      id="hero"
      className="relative pt-12 md:pt-16 overflow-hidden"
      aria-label="Introduction"
      itemScope
      itemType="https://schema.org/Person"
      onClick={spawn}
    >
      {/* Dot-burst particles */}
      {bursts.map(({ id, x, y }) => (
        <span
          key={id}
          aria-hidden="true"
          className="pointer-events-none fixed z-50"
          style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <span
              key={deg}
              className="absolute block rounded-full bg-[#FF3C3C]"
              style={{
                width: i % 2 === 0 ? 3 : 2,
                height: i % 2 === 0 ? 3 : 2,
                animation: "dot-burst 0.65s ease-out forwards",
                animationDelay: `${i * 18}ms`,
                "--deg": `${deg}deg`,
                "--dist": `${18 + (i % 3) * 8}px`,
              }}
            />
          ))}
        </span>
      ))}
      {/* Still dot-matrix backdrop (no cursor reaction, by request) */}
      <HeroDotField />

      {/* ── 12-column grid: copy on the left half, the evidence field on the right ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 md:items-center">
        <div className="md:col-span-6" data-guide="hero-intro">
          {/* Time-of-day greeting: the line is always rendered, so filling it in
              after mount moves nothing. */}
          <p
            className="h-4 mb-5 text-[11px] leading-4 tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A] font-mono"
            style={greeting ? { animation: "fade-in 200ms ease-out both" } : undefined}
          >
            {greeting ? t(greeting) : " "}
          </p>

          {/* Status pill — one line in any font, so the swap to DM Sans moves nothing */}
          <div className="inline-flex items-center gap-2 max-w-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-3.5 h-8 mb-7 text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase whitespace-nowrap rounded-full text-[#1A1A1A] dark:text-white">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] shrink-0 md:animate-blink"
              aria-hidden="true"
            />
            {t("hero.statusPill")}
          </div>

          {/* Name — pinned to Bitcount display font; no animation on mobile for LCP */}
          <h1
            className="hero-name font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-none tracking-tight m-0 md:animate-fade-up text-black dark:text-white"
            itemProp="name"
          >
            Rin Huang
            <span className="sr-only">{t("hero.srName")}</span>
          </h1>

          {/* Other names, pronouns, place — two fixed lines, then the profile links */}
          <div className="mt-5 mb-7 text-xs leading-5 tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A] md:animate-fade-up md:delay-100">
            <p className="m-0 flex items-center gap-2.5 whitespace-nowrap">
              <span itemProp="alternateName">{t("hero.subtitle")}</span>
              {!isZh && (
                <>
                  <span aria-hidden="true">·</span>
                  <span lang="zh-Hans" className="tracking-wide" itemProp="alternateName">
                    黄孙创宇
                  </span>
                </>
              )}
            </p>
            <p className="m-0 flex items-center gap-4 whitespace-nowrap">
              <span>{t("hero.pronouns")}</span>
              <span className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/sunchuangyuhuang/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-1.5 -m-1.5 text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://github.com/rNLKJA"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="p-1.5 -m-1.5 text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  <GitHubIcon />
                </a>
              </span>
            </p>
          </div>

          {/* Role line — the first role is server-rendered in full */}
          <p className="hero-role m-0 mb-6 h-14 lg:h-7 text-lg lg:text-xl leading-7 font-light lg:whitespace-nowrap overflow-hidden text-[#3D3D3D] dark:text-[#B4B4B4] md:animate-fade-up md:delay-200">
            <span className="sr-only">{roleList[0]}</span>
            <span aria-hidden="true">{role}</span>
            <span
              className="md:animate-blink ml-0.5 inline-block w-[0.5em] text-center text-[#9A9A9A]"
              aria-hidden="true"
            >
              _
            </span>
          </p>

          {/* Bio — LCP element: no animation on mobile so it paints immediately */}
          <p
            id="hero-bio"
            className="max-w-xl text-[15px] md:text-[16px] font-light text-[#3D3D3D] dark:text-[#B4B4B4] leading-relaxed mb-8 md:animate-fade-up md:delay-300"
          >
            {t("hero.bio")}
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-wrap items-center gap-3 md:animate-fade-up md:delay-400">
            <Cta href="/career" primary>
              {t("hero.ctaCareer")} <span aria-hidden="true">→</span>
            </Cta>
            <Cta href="#contact">{t("hero.ctaContact")}</Cta>
          </div>
        </div>

        {/* RIGHT — the evidence field: name -> trend -> risk-ranked sites. */}
        <div className="md:col-span-6 md:animate-fade-up md:delay-300">
          <EvidenceField />
        </div>
      </div>

      {/* Hero foot — practice areas as one plain list across the full width,
          the same anatomy as the "Worked with" strip (no pills, nothing to orphan). */}
      <div className="relative z-10 mt-12 md:mt-14 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-5 pb-8 md:pb-10">
        <ul
          className="m-0 p-0 list-none text-[11px] md:text-[12px] leading-[22px] md:leading-6 tracking-wider md:tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]"
          style={{ textWrap: "balance" }}
          aria-label={isZh ? "专长领域" : "Practice areas"}
        >
          {(Array.isArray(tags) ? tags : []).map((tag, i, arr) => (
            <React.Fragment key={tag}>
              <li className="inline whitespace-nowrap">
                {tag}
                {i < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-2 md:mx-2.5 text-[#C8C8C8] dark:text-[#3D3D3D]"
                  >
                    /
                  </span>
                )}
              </li>{" "}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Name hover charge */}
      <style>{`
        .hero-name {
          font-variation-settings: "wght" 600;
          transition: font-variation-settings 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        @media (hover: hover) {
          .hero-name:hover { font-variation-settings: "wght" 820; }
        }
      `}</style>
    </section>
  );
}
