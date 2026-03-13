import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// ── Background art helpers (Nothing OS + Wisr design language) ───────────────

// Earth: thin cross/plus mark — precision & structure
function ArtCross({ className = "" }) {
  return (
    <div aria-hidden="true" className={`absolute w-5 h-5 pointer-events-none select-none ${className}`}>
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-px bg-current" />
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-px bg-current" />
    </div>
  );
}

// Water: thin-outline circle — smooth, sweeping curves
function ArtCircle({ className = "", style = {} }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full border pointer-events-none select-none opacity-10 md:opacity-40 ${className}`}
      style={style}
    />
  );
}

// Fire: thin-outline squircle — bold geometric statement (Nothing app-icon shape)
function ArtSquircle({ className = "", style = {} }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute border pointer-events-none select-none opacity-10 md:opacity-40 ${className}`}
      style={{ borderRadius: "22%", ...style }}
    />
  );
}

// Water: organic blob — fluid, flowing, morphing shape (Wisr Water element)
function ArtBlob({ className = "", style = {} }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute border pointer-events-none select-none animate-art-morph opacity-10 md:opacity-40 ${className}`}
      style={style}
    />
  );
}

// Water: SVG flowing S-curve (Wisr signature wave)
function WaveArc({ className = "", stroke = "#E0E0E0" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`absolute w-full pointer-events-none select-none opacity-[0.08] md:opacity-30 ${className}`}
    >
      <path
        d="M0,40 C180,8 360,72 540,40 C720,8 900,72 1080,40 C1260,8 1380,64 1440,40"
        stroke={stroke}
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

// Air: large ghost label — bleeds off bottom edge, readable as texture not text
function GhostLabel({ children, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute pointer-events-none select-none font-bold leading-none tracking-tighter
                  text-[clamp(5rem,11vw,13rem)] ${className}`}
      style={{ fontFamily: 'var(--font-bitcount), monospace' }}
    >
      {children}
    </span>
  );
}

// Hero is above the fold — load immediately
import HeroSection from "@/components/sections/HeroSection";
import MiniTerminal from "@/components/MiniTerminal";
import ConfettiBurst from "@/components/ui/ConfettiBurst";

// ── Konami sequence ───────────────────────────────────────────────────────────
const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

// ── Glitch overlay ────────────────────────────────────────────────────────────
function GlitchOverlay({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Scanline sweep */}
      <div
        className="absolute left-0 w-full h-1 bg-[#FF3C3C] opacity-60"
        style={{ animation: "glitch-scan 0.6s linear infinite", top: 0 }}
        aria-hidden="true"
      />
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Centre message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border border-[#FF3C3C] bg-black/90 px-8 py-5 text-center animate-glitch-shake">
          <p className="font-mono text-[#FF3C3C] text-xs tracking-widest uppercase mb-1">
            ↑↑↓↓←→←→BA  ·  UNLOCKED
          </p>
          <p className="font-mono text-white text-sm font-bold tracking-wider">
            You found the easter egg.
          </p>
          <p className="font-mono text-[#585858] text-xs mt-1">
            Achievement: 30 extra years of curiosity.
          </p>
        </div>
      </div>
    </div>
  );
}

const SectionProgress  = dynamic(() => import("@/components/layout/SectionProgress"),      { ssr: false });
const StatusBadge      = dynamic(() => import("@/components/ui/StatusBadge"),               { ssr: false });
const ReadingToast     = dynamic(() => import("@/components/ui/ReadingToast"),              { ssr: false });
const SectionNavCards  = dynamic(() => import("@/components/sections/SectionNavCards"),     { loading: () => <div className="min-h-[320px]" aria-hidden="true" /> });
const ContactSection   = dynamic(() => import("@/components/sections/ContactSection"),      { loading: () => <div className="bg-[#1A1A1A] min-h-[320px]" aria-hidden="true" /> });

export default function Home() {
  const [termOpen,  setTermOpen]  = useState(false);
  const [glitchOn,  setGlitchOn]  = useState(false);
  const [konamiConfetti, setKonamiConfetti] = useState(null);
  const konamiRef = useRef([]);

  // Backtick toggles terminal; Escape closes it
  const handleKeyDown = useCallback((e) => {
    // Konami code tracking
    const next = [...konamiRef.current, e.key].slice(-KONAMI.length);
    konamiRef.current = next;
    if (next.join(",") === KONAMI.join(",")) {
      konamiRef.current = [];
      setGlitchOn(true);
      setKonamiConfetti(Date.now());
      return;
    }
    // Terminal toggle
    if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setTermOpen((o) => !o);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {glitchOn && <GlitchOverlay onDone={() => setGlitchOn(false)} />}
      <ConfettiBurst trigger={konamiConfetti} size="big" />

      {/* Floating terminal trigger — bottom-right */}
      <button
        onClick={() => setTermOpen((o) => !o)}
        aria-label={termOpen ? "Close terminal" : "Open terminal (or press `)"}
        title={termOpen ? "Close terminal" : "Open terminal  ·  press `"}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 border border-[#3D3D3D] bg-[#0C0C0C]
                   flex items-center justify-center text-[#FF3C3C] font-mono text-sm
                   hover:border-[#FF3C3C] hover:bg-[#111111] transition-colors duration-200
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF3C3C]"
        style={{ borderRadius: 0 }}
      >
        {termOpen ? "✕" : ">_"}
      </button>

      {/* Terminal panel */}
      {termOpen && (
        <div className="fixed bottom-20 right-6 z-40 shadow-2xl animate-fade-up">
          <MiniTerminal onClose={() => setTermOpen(false)} />
        </div>
      )}

      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* ── LCP: preload above-the-fold assets ── */}
        <link rel="preload" href="/logo.svg" as="image" fetchpriority="high" />

        {/* ── Primary meta ── */}
        <title>Rin Huang (黄孙创宇) — Official Portfolio | Senior Data Analyst</title>
        <meta
          name="description"
          content="Rin Huang's official website — Senior Data Analyst at South Australia Police, Research Software Engineer at WEHI &amp; CSIRO. Full career history, projects, and contact. Also known as 黄孙创宇 (Huang Sunchuangyu)."
        />
        <meta
          name="keywords"
          content="Rin Huang, Sunchuangyu Huang, Huang Sunchuangyu, 黄孙创宇, 黄孙 Rin, HUANG SUNCHUANGYU, HUANGSUNCHUANGYU, HUANG SUN CHUANG YU, Huang Sun Chuang Yu, Senior Data Analyst, Data Science, Research Software Engineer, Full-Stack Developer, Adelaide, South Australia Police, SAPOL, WEHI, CSIRO, Python, Machine Learning, Statistical Analysis, Government Analytics, Strategic Intelligence"
        />

        {/* ── Geo (local SEO) ── */}
        <meta name="geo.region" content="AU-SA" />
        <meta name="geo.placename" content="Adelaide, South Australia" />
        <meta name="geo.position" content="-34.9285;138.6007" />
        <meta name="ICBM" content="-34.9285, 138.6007" />

        {/* ── Open Graph ── */}
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Rin Huang" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:url" content="https://rin.contact/" />
        <meta property="og:title" content="Rin Huang (黄孙创宇 · Huang Sunchuangyu) — Senior Data Analyst · Research Software Engineer" />
        <meta
          property="og:description"
          content="Official personal portfolio of Rin Huang (黄孙创宇) — Senior Data Analyst at South Australia Police, Research Software Engineer at WEHI & CSIRO. Career history, projects, skills, and contact."
        />
        <meta property="og:image" content="https://rin.contact/images/meta-image.png" />
        <meta property="og:image:alt" content="Rin Huang — portfolio preview" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:updated_time" content="2026-03-10T00:00:00+10:30" />
        <meta property="profile:first_name" content="Sunchuangyu" />
        <meta property="profile:last_name" content="Huang" />
        <meta property="profile:username" content="rNLKJA" />

        {/* ── Twitter / X Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rNLKJA" />
        <meta name="twitter:creator" content="@rNLKJA" />
        <meta name="twitter:domain" content="rin.contact" />
        <meta name="twitter:title" content="Rin Huang (黄孙创宇) — Senior Data Analyst · Research Software Engineer" />
        <meta
          name="twitter:description"
          content="Official personal portfolio of Rin Huang (黄孙创宇) — Senior Data Analyst at South Australia Police & Research Software Engineer. Career, projects, and contact at rin.contact."
        />
        <meta name="twitter:image" content="https://rin.contact/images/meta-image.png" />
        <meta name="twitter:image:alt" content="Rin Huang — portfolio preview" />
        {/* label/data pairs — rendered as key-value rows inside the card */}
        <meta name="twitter:label1" content="Role" />
        <meta name="twitter:data1" content="Senior Data Analyst · Adelaide, SA" />
        <meta name="twitter:label2" content="Specialisation" />
        <meta name="twitter:data2" content="Data Science · Strategic Intelligence" />

        {/* ── FAQPage structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What does a Senior Data Analyst do at South Australia Police?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "As an ASO7 Senior Data Analyst in SAPOL's Professional and Ethical Standards Branch (PESB), I develop analytical models and statistical frameworks that translate complex policing data into decision-ready intelligence. This includes strategic planning, parliamentary reporting, and governance of end-to-end analytics solutions across IAPro and connected systems.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is strategic intelligence analytics and how does it differ from standard data analysis?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Standard data analysis answers 'what happened'. Strategic intelligence analytics answers 'what should we do about it' — it frames data within operational context, risk tolerance, and organisational objectives, producing intelligence products that directly inform executive and ministerial decision-making.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What programming languages and tools do you use professionally?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Python is my primary language for data engineering, statistical modelling, and automation. I also use R for advanced statistical analysis, SQL for structured queries, Power BI and Tableau for dashboards, ArcGIS and Mapbox for geospatial work, and Next.js, React Native, and AWS for software development.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are you available for consulting, contract, or advisory work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — I am open to strategic data consulting, government analytics advisory, and research data engineering engagements. You can reach me at huang@rin.contact.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is your educational background?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "I hold two degrees from the University of Melbourne: a Bachelor of Science (Computing and Software Systems) and a Master of Data Science, along with 23 professional certifications across cloud, analytics, and project management.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is your Chinese name, and how do you spell it?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "My Chinese legal name is 黄孙创宇 (Huang Sunchuangyu). 黄 (Huang) is my family name and 孙创宇 (Sunchuangyu) is my given name. In Australian formal documents you may also see it written as HUANG SUNCHUANGYU, HUANGSUNCHUANGYU, HUANG SUN CHUANG YU, or informally as 黄孙 Rin. All of these forms refer to the same person. In everyday English I go by Rin Huang, and you can find me at rin.contact.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who is 黄孙创宇 / 黄孙 Rin / HUANGSUNCHUANGYU?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "黄孙创宇 — also written 黄孙 Rin, Huang Sunchuangyu, HUANG SUNCHUANGYU, HUANGSUNCHUANGYU, or HUANG SUN CHUANG YU — is the Chinese legal name of Sunchuangyu (Rin) Huang, a Senior Data Analyst at South Australia Police and Research Software Engineer based in Adelaide, Australia. The family name is 黄 (Huang) and the given name is 孙创宇 (Sunchuangyu). All of these name forms refer to the same person at rin.contact.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <SectionProgress />
      <div className="relative">
        {/* Dot-matrix — fixed top-right anchor (persists across all sections) */}
        <div
          className="dot-matrix fixed top-0 right-0 w-72 h-72 opacity-[0.03] md:opacity-10 pointer-events-none z-0"
          aria-hidden="true"
        />

      <div className="relative z-10">

          {/* ══ HERO — white ══ */}
          {/* LCP: hero content first in DOM; decorative elements deferred on mobile */}
          <div className="bg-white relative overflow-hidden">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
              <HeroSection />
            </div>
            {/* Decorative elements — hidden on mobile for faster LCP, desktop only */}
            <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
              <ArtCross className="top-10 left-8 text-[#C0C0C0]" />
              <ArtCross className="bottom-12 right-12 text-[#C0C0C0]" />
              <ArtCircle className="animate-art-breathe border-[#E0E0E0]"       style={{ width:"1300px", height:"1300px", right:"-450px", bottom:"-450px" }} />
              <ArtCircle className="animate-art-breathe border-[#E4E4E4]"       style={{ width: "840px", height: "840px",  right:"-220px", bottom:"-220px", animationDelay:"1.2s" }} />
              <ArtCircle className="animate-art-breathe border-[#EBEBEB]"       style={{ width: "420px", height: "420px",  right: "-10px", bottom: "-10px", animationDelay:"2.4s" }} />
              <ArtSquircle className="animate-art-spin border-[#DCDCDC]"        style={{ width:"320px",  height:"320px",  top:"48px",  left:"40px",   animationDelay:"1.5s" }} />
              <ArtBlob     className="border-[#E8E8E8]"                         style={{ width:"420px",  height:"380px",  top:"30%",   left:"-100px", animationDelay:"3s" }} />
              <WaveArc className="top-[38%] h-20" stroke="#EBEBEB" />
              <div className="dot-matrix absolute left-0 bottom-0 w-80 h-80 opacity-[0.03] md:opacity-[0.08]" />
            </div>
          </div>

          {/* ══ STATUS + SECTION NAV CARDS — white ══ */}
          <div className="bg-white border-t border-[#F5F5F5]">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-10">
              <StatusBadge />
            </div>
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <SectionNavCards />
            </div>
          </div>

          {/* Reading progress toast — client-side only */}
          <ReadingToast threshold={0.7} />

          {/* ══ CONTACT — dark ══ */}
          <div className="bg-[#1A1A1A] relative overflow-hidden content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
              <ContactSection />
            </div>
            {/* ── Morse code easter egg — HELLO encoded as dots & dashes ─────── */}
            {/* H=....  E=.  L=.-..  L=.-..  O=--- */}
            {/* Hint: /fun/secret */}
            <div
              className="flex items-center justify-center pb-5 gap-px"
              aria-hidden="true"
              title="Can you decode this?"
              style={{ opacity: 0.12 }}
            >
              {/* H = . . . . */}
              {[1,1,1,1].map((_, i) => <span key={`h${i}`} className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5" />)}
              <span className="inline-block w-3" />
              {/* E = . */}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5" />
              <span className="inline-block w-3" />
              {/* L = . - . . */}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5" />
              <span className="inline-block w-4 h-1 rounded-sm bg-white mx-0.5" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5" />
              <span className="inline-block w-3" />
              {/* L = . - . . */}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5" />
              <span className="inline-block w-4 h-1 rounded-sm bg-white mx-0.5" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5" />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5" />
              <span className="inline-block w-3" />
              {/* O = - - - */}
              <span className="inline-block w-4 h-1 rounded-sm bg-white mx-0.5" />
              <span className="inline-block w-4 h-1 rounded-sm bg-white mx-0.5" />
              <span className="inline-block w-4 h-1 rounded-sm bg-white mx-0.5" />
            </div>
            <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
              <GhostLabel className="right-0 bottom-0 translate-y-[28%] text-white opacity-[0.02] md:opacity-[0.06]">CONNECT</GhostLabel>
              <div className="absolute left-0 top-0 w-80 h-80 opacity-[0.05] md:opacity-20"
                style={{ backgroundImage:"radial-gradient(circle, #2E2E2E 1px, transparent 1px)", backgroundSize:"16px 16px" }} />
              <ArtCross className="top-10 left-8 text-[#2C2C2C]" />
              <ArtCross className="bottom-12 right-12 text-[#2C2C2C]" />
              <ArtCircle className="animate-art-breathe border-[#222222]"       style={{ width:"1300px", height:"1300px", bottom:"-450px", right:"-450px" }} />
              <ArtCircle className="animate-art-breathe border-[#242424]"       style={{ width: "760px", height: "760px",  bottom:"-180px", right:"-180px", animationDelay:"1.5s" }} />
              <ArtCircle className="animate-art-breathe border-[#262626]"       style={{ width: "360px", height: "360px",  bottom:  "20px", right:  "20px", animationDelay:"3s" }} />
              <ArtCircle className="animate-art-float border-[#222222]"         style={{ width: "560px", height: "560px",  top:"-160px",  left:"-160px",  animationDelay:"3s" }} />
              <ArtCircle className="animate-art-float border-[#232323]"         style={{ width: "280px", height: "280px",  top:"-20px",   left:"-20px",   animationDelay:"4.5s" }} />
              <ArtSquircle className="animate-art-spin border-[#222222]"        style={{ width:"300px",  height:"300px",  top:"30%",   right:"-60px", animationDelay:"0s" }} />
              <ArtBlob     className="border-[#212121]"                         style={{ width:"400px",  height:"360px",  bottom:"60px", left:"-80px",  animationDelay:"7s" }} />
              <WaveArc className="top-[35%] h-20" stroke="#222222" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

