import React, { useEffect, useState, useRef, useCallback } from "react";
import { isSAPOLPeriod } from "@/lib/employment-period";

// Inline SVGs — avoids react-icons bundle on critical hero path
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ROLES = [
  "Senior Data Analyst @ SAPOL",
  "Research Software Engineer @ WEHI",
  "Data Science Consultant @ CSIRO & CSL",
  "Co-Founder & Dev Lead @ Mapiva",
  "Intelligence & Coordination Officer @ AGD",
  "Full-Stack Engineer @ Unimelb",
];

const STATS = [
  { value: 6,  label: "Roles",    sub: "across gov, research & startup" },
  { value: 17, label: "Projects", sub: "shipped to production" },
  { value: 2,  label: "Degrees",  sub: "University of Melbourne" },
  { value: 23, label: "Certs",    sub: "cloud · analytics · agile" },
];

const TAGS = [
  "Strategic Thinking", "Continuous Improvement", "Data Science",
  "Statistical Intelligence", "Government Analytics", "Web Development",
  "Mobile Development", "Research Engineering", "Cloud & Infrastructure",
  "UI/UX Design", "Project Management",
];

// ─── Typewriter ──────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ─── Count-up ────────────────────────────────────────────────────────────────
function CountUp({ target, duration = 1200, started }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [started, target, duration]);

  return <>{count}</>;
}

// ─── Magnetic button ─────────────────────────────────────────────────────────
// Desktop: accent red; mobile: black outline (Nothing primary style) for AA contrast
function MagneticButton({ href, primary, children }) {
  const btnRef   = useRef(null);
  const rectRef  = useRef(null);
  const rafRef   = useRef(null);

  // Defer getBCR to rAF — avoids forced reflow when layout may be invalid.
  const handleEnter = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (btnRef.current) rectRef.current = btnRef.current.getBoundingClientRect();
    });
  }, []);

  const handleMove = useCallback((e) => {
    const el   = btnRef.current;
    const rect = rectRef.current;
    if (!el || !rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * 0.28;
    const dy = (e.clientY - cy) * 0.28;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
    rectRef.current = null;
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // Primary (Career Path): mobile = black outline (Nothing style, AA contrast); desktop = darker red accent
  const primaryClasses =
    "inline-block border px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-none min-h-[44px] flex items-center justify-center transition-colors duration-200 " +
    (primary
      ? "border-black text-black bg-transparent hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-black md:border-[#B71C1C] md:text-[#B71C1C] md:hover:bg-[#B71C1C] md:hover:text-white md:focus-visible:outline-[#B71C1C]"
      : "border-0 border-b-2 border-[#3D3D3D] text-[#3D3D3D] hover:border-[#B71C1C] hover:text-[#B71C1C] focus-visible:outline-2 focus-visible:outline-[#3D3D3D]");

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.2s cubic-bezier(0.23,1,0.32,1)" }}
      className={primaryClasses}
    >
      {children}
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const role = useTypewriter(ROLES);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-20 pb-20 md:pt-20 md:pb-28 overflow-hidden"
      aria-label="Introduction"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Decorative elements — hidden on mobile for faster LCP */}
      <div aria-hidden="true" className="hidden md:block pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,60,60,0.05) 0%, transparent 70%)", animation: "blob-drift 18s ease-in-out infinite alternate" }} />
      <div className="hidden md:block dot-matrix pointer-events-none absolute top-0 right-0 w-64 h-64 opacity-10" aria-hidden="true" />

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* LEFT — identity + copy */}
        <div>

          {/* Status pill — AGD before 23 Mar 2026, SAPOL on or after */}
          <div className="inline-flex items-center gap-2 border border-[#E0E0E0] px-4 py-1.5 mb-8 text-xs tracking-widest uppercase rounded-full text-[#1A1A1A]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 md:animate-blink" aria-hidden="true" />
            {isSAPOLPeriod()
              ? "ASO7 Senior Data Analyst · Adelaide, SA"
              : "ASO4 Intelligence & Coordination Officer @ AGD"}
          </div>

          <p className="text-xs tracking-widest uppercase text-[#B71C1C] mb-4">01 — Profile</p>

          {/* Name — pinned to Bitcount display font; no animation on mobile for LCP */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-none tracking-tight mb-2 md:animate-fade-up"
            itemProp="name"
          >
            Rin Huang
            <span className="sr-only">
              {/* All canonical name forms — indexed by crawlers, read by screen readers */}
              {" "}— Sunchuangyu Huang · Huang Sunchuangyu · 黄孙创宇 · 黄孙 Rin ·
              HUANG SUNCHUANGYU · HUANGSUNCHUANGYU · HUANG SUN CHUANG YU
            </span>
          </h1>
          {/* Wisr-style wavy underline accent */}
          <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-4">
            <path d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
                  stroke="#FF3C3C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.5"/>
          </svg>

          {/* Subtitle + socials — black on mobile for AA contrast; no animation on mobile for LCP */}
          <div className="flex flex-wrap items-center gap-3 mb-8 md:animate-fade-up md:delay-100">
            <div className="flex flex-col">
              <span className="text-sm tracking-widest uppercase text-black md:text-[#5C5C5C]" itemProp="alternateName">
                Sunchuangyu Huang
              </span>
              <span className="text-sm tracking-wide text-black md:text-[#7A7A7A]" lang="zh-Hans" itemProp="alternateName">
                黄孙创宇
              </span>
              <span className="text-sm tracking-widest uppercase text-black md:text-[#5C5C5C]">
                He/Him · Adelaide &amp; Melbourne
              </span>
            </div>
            <span className="text-sm tracking-widest uppercase text-black md:text-[#5C5C5C]">|</span>
            <a href="https://www.linkedin.com/in/sunchuangyuhuang/" target="_blank" rel="noreferrer"
              aria-label="LinkedIn profile"
              className="text-[#B0B0B0] hover:text-black transition-colors duration-200 flex-shrink-0">
              <LinkedInIcon />
            </a>
            <a href="https://github.com/rNLKJA" target="_blank" rel="noreferrer"
              aria-label="GitHub profile"
              className="text-[#B0B0B0] hover:text-black transition-colors duration-200 flex-shrink-0">
              <GitHubIcon />
            </a>
          </div>

          {/* Typewriter — hero-role for LCP: no animation on mobile */}
          <div
            role="status"
            aria-live="polite"
            aria-label={role ? `Current role: ${role}` : undefined}
            className="hero-role text-xl md:text-2xl font-light text-[#3D3D3D] mb-8 h-8 md:animate-fade-up md:delay-200"
          >
            {role}<span className="md:animate-blink ml-0.5 inline-block w-[0.5em] text-center" aria-hidden="true">_</span>
          </div>

          {/* Bio — LCP element: no animation on mobile so it paints immediately */}
          <p id="hero-bio" className="text-base font-light text-[#3D3D3D] leading-relaxed mb-10 md:animate-fade-up md:delay-300">
            From climate risk modelling at CSIRO to ministerial dashboards for the
            SA Government, from genomics pipelines at WEHI to a mental health mobile
            app at UniMelb — I work at the edges of disciplines where data, strategy,
            and engineering intersect. Generalist by nature, specialist by discipline.
          </p>

          {/* CTAs — hero-ctas for LCP; magnetic on desktop; no animation on mobile for LCP */}
          <div className="hero-ctas flex flex-wrap items-center gap-3 md:animate-fade-up md:delay-400">
            <MagneticButton href="#timeline" primary>Career Path</MagneticButton>
            <MagneticButton href="#contact">Get in Touch</MagneticButton>
          </div>

          {/* Tags — visible on mobile for LCP; staggered fade on desktop only */}
          <div className="flex flex-wrap gap-2 mt-10">
            {TAGS.map((tag, i) => (
              <span
                key={tag}
                className="border border-[#E0E0E0] px-3 py-1 text-xs tracking-wider uppercase text-black md:text-[#5C5C5C]
                           rounded-full hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200 cursor-default
                           md:animate-fade-up md:opacity-0"
                style={{ animationDelay: `${500 + i * 50}ms`, animationFillMode: "forwards" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — stats (ref here so observer works on all screen sizes) */}
        <div ref={statsRef}>
          {/* Desktop 2×2 grid */}
          <div className="hidden md:grid grid-cols-2 gap-px animate-fade-up delay-300">
            {STATS.map(({ value, label, sub }, i) => (
              <div
                key={label}
                className="bg-white px-8 py-10 flex flex-col gap-2 group hover:bg-[#FF3C3C] transition-colors duration-300"
              >
                <span className="text-5xl font-semibold leading-none tabular-nums tracking-tight group-hover:text-white transition-colors duration-300">
                  <CountUp target={value} duration={900 + i * 120} started={statsStarted} />
                  <span className="text-[#FF3C3C] group-hover:text-white transition-colors duration-300">+</span>
                </span>
                <span className="text-sm font-medium tracking-wide uppercase group-hover:text-white transition-colors duration-300">
                  {label}
                </span>
                <span className="text-xs text-[#B0B0B0] font-light group-hover:text-white/70 transition-colors duration-300">
                  {sub}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile — flat strip */}
          <div className="flex flex-wrap gap-8 md:hidden">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="flex flex-col items-start">
                <span className="text-3xl font-semibold leading-none tabular-nums tracking-tight">
                  <CountUp target={value} duration={900 + i * 120} started={statsStarted} />
                  <span className="text-[#FF3C3C]">+</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-black md:text-[#5C5C5C] mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blob keyframe */}
      <style>{`
        @keyframes blob-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-40px, 30px) scale(1.12); }
        }
      `}</style>
    </section>
  );
}
