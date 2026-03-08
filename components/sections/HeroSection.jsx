import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const ROLES = [
  "Senior Data Analyst",
  "Research Software Engineer",
  "Data Science Consultant",
  "Co-Founder & Dev Lead",
  "Intelligence & Coordination Officer",
  "Full-Stack Engineer",
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
function MagneticButton({ href, primary, children }) {
  const btnRef = useRef(null);

  const handleMove = useCallback((e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.28;
    const dy = (e.clientY - cy) * 0.28;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.2s cubic-bezier(0.23,1,0.32,1)" }}
      className={
        primary
          ? "inline-block bg-[#FF3C3C] border border-[#FF3C3C] text-white px-8 py-3 text-xs tracking-widest uppercase rounded-full hover:bg-transparent hover:text-[#FF3C3C] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#FF3C3C]"
          : "inline-block border border-[#3D3D3D] px-8 py-3 text-xs tracking-widest uppercase text-[#3D3D3D] rounded-full hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200"
      }
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
      className="relative pt-8 pb-20 md:pt-12 md:pb-28 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Animated blob — slow drift in top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,60,60,0.09) 0%, transparent 70%)",
          animation: "blob-drift 18s ease-in-out infinite alternate",
        }}
      />
      {/* Dot-matrix overlay */}
      <div
        className="dot-matrix pointer-events-none absolute top-0 right-0 w-64 h-64 opacity-20"
        aria-hidden="true"
      />

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* LEFT — identity + copy */}
        <div>

          {/* Status pill */}
          <div className="inline-flex items-center gap-2 border border-[#E0E0E0] px-4 py-1.5 mb-8 text-xs tracking-widest uppercase rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-blink" aria-hidden="true" />
            ASO7 Senior Data Analyst · Adelaide, SA
          </div>

          <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-4">01 — Profile</p>

          {/* Name — pinned to Bitcount display font */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-none tracking-tight mb-2 animate-fade-up">
            Rin Huang
          </h1>
          {/* Wisr-style wavy underline accent */}
          <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-4">
            <path d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
                  stroke="#FF3C3C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeOpacity="0.5"/>
          </svg>

          {/* Subtitle + socials */}
          <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-up delay-100">
            <div className="flex flex-col">
              <span className="text-sm tracking-widest uppercase text-[#7A7A7A]">
                Sunchuangyu Huang
              </span>
              <span className="text-sm tracking-widest uppercase text-[#7A7A7A]">
                He/Him · Adelaide &amp; Melbourne
              </span>
            </div>
            <span className="text-sm tracking-widest uppercase text-[#7A7A7A]">|</span>
            <a href="https://www.linkedin.com/in/sunchuangyuhuang/" target="_blank" rel="noreferrer"
              aria-label="LinkedIn profile"
              className="text-[#B0B0B0] hover:text-black transition-colors duration-200 flex-shrink-0">
              <FaLinkedin size={16} />
            </a>
            <a href="https://github.com/rNLKJA" target="_blank" rel="noreferrer"
              aria-label="GitHub profile"
              className="text-[#B0B0B0] hover:text-black transition-colors duration-200 flex-shrink-0">
              <FiGithub size={16} />
            </a>
          </div>

          {/* Typewriter */}
          <div
            className="text-xl md:text-2xl font-light text-[#3D3D3D] mb-8 h-8 animate-fade-up delay-200"
            aria-live="polite" aria-label={`Current role: ${role}`}
          >
            {role}<span className="animate-blink ml-0.5" aria-hidden="true">_</span>
          </div>

          {/* Bio */}
          <p className="text-base font-light text-[#3D3D3D] leading-relaxed mb-10 animate-fade-up delay-300">
            From climate risk modelling at CSIRO to ministerial dashboards for the
            SA Government, from genomics pipelines at WEHI to a mental health mobile
            app at UniMelb — I work at the edges of disciplines where data, strategy,
            and engineering intersect. Generalist by nature, specialist by discipline.
          </p>

          {/* CTAs — magnetic on desktop */}
          <div className="flex flex-wrap items-center gap-3 animate-fade-up delay-400">
            <MagneticButton href="#timeline" primary>Career Path</MagneticButton>
            <MagneticButton href="#contact">Get in Touch</MagneticButton>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10">
            {TAGS.map((tag, i) => (
              <span
                key={tag}
                className="border border-[#E0E0E0] px-3 py-1 text-xs tracking-wider uppercase text-[#7A7A7A]
                           rounded-full hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200 cursor-default
                           animate-fade-up opacity-0"
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
                <span className="text-[10px] tracking-widest uppercase text-[#7A7A7A] mt-1">{label}</span>
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
