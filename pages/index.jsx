import React from "react";
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

const SectionProgress = dynamic(() => import("@/components/layout/SectionProgress"), { ssr: false });

// Below-fold sections — code-split so they don't inflate the initial JS bundle.
// SSR is kept (default) so content is still in the HTML for SEO crawlers.
const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection"), {
  loading: () => <div className="bg-[#F5F5F5] min-h-[480px]" aria-hidden="true" />,
});
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  loading: () => <div className="bg-white min-h-[480px]" aria-hidden="true" />,
});
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <div className="bg-[#F5F5F5] min-h-[480px]" aria-hidden="true" />,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  loading: () => <div className="bg-white min-h-[320px]" aria-hidden="true" />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <div className="bg-[#1A1A1A] min-h-[320px]" aria-hidden="true" />,
});

export default function Home() {
  return (
    <>
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

          {/* ══ TIMELINE — light surface ══ */}
          <div className="bg-[#F5F5F5] relative overflow-hidden content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
              <TimelineSection />
            </div>
            {/* Decorative elements — desktop only, reduces mobile LCP/main-thread */}
            <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
              <GhostLabel className="left-0 bottom-0 translate-y-[28%] text-black opacity-[0.02] md:opacity-[0.045]">JOURNEY</GhostLabel>
              <ArtCross className="top-10 left-8 text-[#BEBEBE]" />
              <ArtCross className="top-10 right-10 text-[#BEBEBE]" />
              <ArtCircle className="animate-art-breathe border-[#D8D8D8]"       style={{ width:"1200px", height:"1200px", top:"-400px",  left:"-400px",  animationDelay:"2s" }} />
              <ArtCircle className="animate-art-breathe border-[#DCDCDC]"       style={{ width: "720px", height: "720px",  top:"-160px",  left:"-160px",  animationDelay:"3.2s" }} />
              <ArtCircle className="animate-art-float border-[#DEDEDE]"         style={{ width: "460px", height: "460px",  bottom:"-100px", right:"-100px", animationDelay:"4s" }} />
              <ArtSquircle className="animate-art-spin border-[#D4D4D4]"        style={{ width:"300px",  height:"300px",  top:"50%",   right:"-80px", animationDelay:"0.5s" }} />
              <ArtBlob     className="border-[#DCDCDC]"                         style={{ width:"380px",  height:"350px",  bottom:"40px", left:"-60px",  animationDelay:"5s" }} />
            </div>
          </div>

          {/* ══ PROJECTS — white ══ */}
          <div className="bg-white relative overflow-hidden content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
              <ProjectsSection />
            </div>
            <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
              <GhostLabel className="left-0 bottom-0 translate-y-[28%] text-black opacity-[0.02] md:opacity-[0.04]">WORK</GhostLabel>
              <ArtCross className="top-10 right-10 text-[#C8C8C8]" />
              <ArtCross className="bottom-12 left-8 text-[#C8C8C8]" />
              <ArtCircle className="animate-art-breathe border-[#E0E0E0]"       style={{ width:"1440px", height:"1440px", bottom:"-520px", left:"-520px" }} />
              <ArtCircle className="animate-art-breathe border-[#E6E6E6]"       style={{ width: "900px", height: "900px",  bottom:"-250px", left:"-250px",  animationDelay:"3s" }} />
              <ArtCircle className="animate-art-breathe border-[#EBEBEB]"       style={{ width: "440px", height: "440px",  bottom: "-20px", left: "-20px",  animationDelay:"4.5s" }} />
              <ArtSquircle className="animate-art-spin border-[#E0E0E0]"        style={{ width:"360px",  height:"360px",  top:"48px",  right:"40px",  animationDelay:"1s" }} />
              <ArtBlob     className="border-[#EAEAEA]"                         style={{ width:"360px",  height:"400px",  top:"25%",   right:"-80px", animationDelay:"2s" }} />
              <WaveArc className="bottom-[15%] h-20" stroke="#EBEBEB" />
            </div>
          </div>

          {/* ══ SKILLS — light surface ══ */}
          <div className="bg-[#F5F5F5] relative overflow-hidden content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
              <SkillsSection />
            </div>
            <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
              <GhostLabel className="right-0 bottom-0 translate-y-[28%] text-black opacity-[0.02] md:opacity-[0.045]">SKILLS</GhostLabel>
              <div className="dot-matrix absolute left-0 top-0 w-80 h-80 opacity-[0.03] md:opacity-[0.08]" />
              <ArtCross className="top-10 right-10 text-[#BEBEBE]" />
              <ArtCross className="bottom-12 left-8 text-[#BEBEBE]" />
              <ArtCircle className="animate-art-float border-[#D8D8D8]"         style={{ width:"1100px", height:"1100px", top:"calc(50% - 550px)", right:"-350px", animationDelay:"1s" }} />
              <ArtCircle className="animate-art-float border-[#DCDCDC]"         style={{ width: "660px", height: "660px",  top:"calc(50% - 330px)", right:"-130px", animationDelay:"2s" }} />
              <ArtBlob     className="border-[#D4D4D4]"                         style={{ width:"460px",  height:"420px",  top:"20%",   left:"-120px", animationDelay:"4s" }} />
              <ArtSquircle className="animate-art-spin border-[#D0D0D0]"        style={{ width:"280px",  height:"280px",  bottom:"40px", left:"40px",   animationDelay:"2.5s" }} />
              <WaveArc className="top-[42%] h-20" stroke="#DCDCDC" />
            </div>
          </div>

          {/* ══ FAQ — white ══ */}
          <div className="bg-white relative overflow-hidden content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
              <FAQSection />
            </div>
            <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
              <GhostLabel className="left-0 bottom-0 translate-y-[28%] text-black opacity-[0.02] md:opacity-[0.04]">FAQ</GhostLabel>
              <ArtCross className="top-10 right-10 text-[#C8C8C8]" />
              <ArtCross className="bottom-12 right-12 text-[#C8C8C8]" />
              <ArtCircle className="animate-art-breathe border-[#EBEBEB]"       style={{ width:"1000px", height:"1000px", top:"-300px",  right:"-300px" }} />
              <ArtCircle className="animate-art-breathe border-[#EEEEEE]"       style={{ width: "560px", height: "560px",  top:"-80px",   right:"-80px",   animationDelay:"1s" }} />
              <ArtSquircle className="animate-art-spin border-[#E2E2E2]"        style={{ width:"240px",  height:"240px",  bottom:"40px", left:"40px",   animationDelay:"3s" }} />
              <ArtBlob     className="border-[#EBEBEB]"                         style={{ width:"380px",  height:"340px",  top:"30%",   left:"-80px",  animationDelay:"6s" }} />
            </div>
          </div>

          {/* ══ CONTACT — dark ══ */}
          <div className="bg-[#1A1A1A] relative overflow-hidden content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
              <ContactSection />
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

