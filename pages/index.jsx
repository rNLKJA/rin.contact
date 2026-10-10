import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { CERTS, ROLES } from "@/lib/career-data";
import { PROJECTS } from "@/lib/projects-data";
import { COURSEWORK } from "@/lib/coursework-data";
import { getAllPosts } from "@/lib/posts";
import { buildSkillsAtlas } from "@/lib/skills-atlas";
import en from "@/locales/en-AU.json";
import zh from "@/locales/zh-Hans.json";
import GlyphCounters from "@/components/sections/GlyphCounters";

// Moved from pages/_document.jsx — these describe homepage-only content
// (career timeline anchors, project list, credentials) and were previously
// shipped in every page's <head> even though only the homepage uses them.
const PROFILE_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://rin.contact/#profilepage",
  url: "https://rin.contact",
  name: "Rin Huang (黄孙创宇) — Official Portfolio",
  datePublished: "2024-01-01T00:00:00+10:30",
  dateModified: "2026-10-03T00:00:00+09:30",
  mainEntity: { "@id": "https://rin.contact/#person" },
  about: { "@id": "https://rin.contact/#person" },
  // isPartOf links this page into the WebSite entity — completing the entity graph
  isPartOf: { "@id": "https://rin.contact/#website" },
  // breadcrumb cross-reference tightens the structured data graph
  breadcrumb: { "@id": "https://rin.contact/#breadcrumb" },
  // primaryImageOfPage helps Google associate the OG image with this entity in image search
  primaryImageOfPage: {
    "@type": "ImageObject",
    "@id": "https://rin.contact/#og-image",
    url: "https://rin.contact/api/og/?title=Rin%20Huang&subtitle=Senior%20Data%20Analyst%20%40%20SAPOL&section=home",
    width: 1200,
    height: 630,
    caption:
      "Rin Huang (黄孙创宇, Sunchuangyu Huang) — Senior Data Analyst & Research Software Engineer",
  },
  // significantLinks tells Google that LinkedIn/GitHub are related pages, not competitors
  significantLinks: ["https://linkedin.com/in/sunchuangyuhuang", "https://github.com/rNLKJA"],
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#hero-bio", ".hero-role", "h2"],
  },
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://rin.contact/#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Rin Huang",
      item: "https://rin.contact/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Career",
      item: "https://rin.contact/#timeline",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Projects",
      item: "https://rin.contact/#projects",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Skills",
      item: "https://rin.contact/#skills",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contact",
      item: "https://rin.contact/#contact",
    },
  ],
};

const PROJECTS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://rin.contact/#projects",
  name: "Projects by Rin Huang (Sunchuangyu Huang)",
  description: "Software, data science, and analytics projects by Rin Huang",
  author: { "@id": "https://rin.contact/#person" },
  itemListElement: PROJECTS.map((project, index) => {
    const baseItem = {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type":
          project.link && project.link.includes("github.com")
            ? "SoftwareSourceCode"
            : "SoftwareApplication",
        name: project.title,
        description: project.summary,
        author: { "@id": "https://rin.contact/#person" },
      },
    };

    // Add programming languages if stack exists
    if (project.stack && project.stack.length > 0) {
      baseItem.item.programmingLanguage = project.stack;
    }

    // Add repository link if it's a GitHub link
    if (project.link && project.link.includes("github.com")) {
      baseItem.item.codeRepository = project.link;
    }

    // Add application category for apps
    if (project.tag === "Mobile Dev") {
      baseItem.item.applicationCategory = "MobileApplication";
      baseItem.item.operatingSystem = "iOS, Android";
    } else if (project.tag === "Analytics" || project.domain === "Government") {
      baseItem.item.applicationCategory = "BusinessApplication";
    } else if (project.domain === "Startup") {
      baseItem.item.applicationCategory = "SocialNetworkingApplication";
    }

    return baseItem;
  }),
};

// Built from CERTS in lib/career-data.js so the JSON-LD always lists the same
// verified credentials as /career, /cv and /resume. Issue dates are kept to the
// year (ISO 8601 allows a bare year) rather than guessing a month.
const CREDENTIAL_CATEGORY = {
  VETASSESS: "ProfessionalAssessment",
  IELTS: "LanguageAssessment",
  NAATI: "LanguageCredential",
  "University of Melbourne": "microcredential",
};

const ISSUER_URL = {
  Google: "https://google.com",
  Microsoft: "https://microsoft.com",
  Neo4j: "https://neo4j.com",
  Atlassian: "https://atlassian.com",
  GitHub: "https://github.com",
  "University of Melbourne": "https://www.unimelb.edu.au",
};

const CREDENTIALS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": CERTS.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    credentialCategory: CREDENTIAL_CATEGORY[c.issuer] || "certification",
    recognizedBy: {
      "@type": c.issuer === "University of Melbourne" ? "CollegeOrUniversity" : "Organization",
      name: c.issuer,
      ...(ISSUER_URL[c.issuer] ? { url: ISSUER_URL[c.issuer] } : {}),
    },
    ...(c.year ? { dateCreated: c.year } : {}),
    holder: { "@id": "https://rin.contact/#person" },
  })),
};

// ── Background art helpers (Nothing OS + Wisr design language) ───────────────

// Earth: thin cross/plus mark — precision & structure
function ArtCross({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute w-5 h-5 pointer-events-none select-none ${className}`}
    >
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
      style={{ fontFamily: "var(--font-bitcount), monospace" }}
    >
      {children}
    </span>
  );
}

// Hero is above the fold — load immediately
import HeroSection from "@/components/sections/HeroSection";
import SectionDivider from "@/components/ui/SectionDivider";
const MiniTerminal = dynamic(() => import("@/components/MiniTerminal"), { ssr: false });
import ConfettiBurst from "@/components/ui/ConfettiBurst";

// ── Konami sequence ───────────────────────────────────────────────────────────
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
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
            ↑↑↓↓←→←→BA · UNLOCKED
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

const SectionProgress = dynamic(() => import("@/components/layout/SectionProgress"), {
  ssr: false,
});
const StatusBadge = dynamic(() => import("@/components/ui/StatusBadge"), { ssr: false });
const ReadingToast = dynamic(() => import("@/components/ui/ReadingToast"), { ssr: false });
const PositioningStatement = dynamic(() => import("@/components/sections/PositioningStatement"), {
  loading: () => <div className="min-h-[260px]" aria-hidden="true" />,
});
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"), {
  loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
});
const MarqueeBand = dynamic(() => import("@/components/sections/MarqueeBand"), {
  loading: () => <div className="min-h-[80px]" aria-hidden="true" />,
});
const SectionNavCards = dynamic(() => import("@/components/sections/SectionNavCards"), {
  loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
});
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <div className="bg-[#1A1A1A] min-h-[320px]" aria-hidden="true" />,
});

export default function Home({ glyphStats }) {
  const { locale = "en-AU" } = useRouter();
  const isZh = locale === "zh-Hans";
  const [termOpen, setTermOpen] = useState(false);
  const [glitchOn, setGlitchOn] = useState(false);
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
        {/* viewport is set globally in _app.jsx */}

        {/* ── LCP: preload above-the-fold assets ── */}
        <link rel="preload" href="/logo.svg" as="image" fetchpriority="high" />

        {/* ── Primary meta ── */}
        <title>
          {isZh
            ? "Rin Huang (黄孙创宇) — 个人主页 | 高级数据分析师"
            : "Rin Huang (黄孙创宇) — Official Portfolio | Senior Data Analyst"}
        </title>
        <meta
          name="description"
          content={
            isZh
              ? "Rin Huang（黄孙创宇）的官方网站。现任南澳大利亚警察局（SAPOL）ASO7 高级数据分析师、Mapiva 联合创始人兼开发负责人，曾任职于南澳总检察长部消费者与商业服务局（CBS）、墨尔本大学、WEHI 和 CSIRO。完整的职业经历、项目成果和联系方式。"
              : "Official website of Rin Huang, ASO7 Senior Data Analyst at South Australia Police and Co-Founder & Dev Lead at Mapiva. Previously at CBS (Attorney-General's Department SA), the University of Melbourne, WEHI and CSIRO. Full career history, projects and contact. Also known as 黄孙创宇 (Huang Sunchuangyu)."
          }
        />
        <meta
          name="keywords"
          content="Rin Huang, Sunchuangyu Huang, Huang Sunchuangyu, 黄孙创宇, 黄孙 Rin, HUANG SUNCHUANGYU, Senior Data Analyst, Data Science, 高级数据分析师, 数据分析, 数据科学, 软件工程师, 澳大利亚, Research Software Engineer, Full-Stack Developer, Adelaide, South Australia Police, SAPOL, WEHI, CSIRO, Python, Machine Learning, Strategic Intelligence"
        />

        {/* ── Geo (local SEO) ── */}
        <meta name="geo.region" content="AU-SA" />
        <meta name="geo.placename" content="Adelaide, South Australia" />
        <meta name="geo.position" content="-34.9285;138.6007" />
        <meta name="ICBM" content="-34.9285, 138.6007" />

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
                    text: "As an ASO7 Senior Data Analyst in the Intelligence & Probity Unit of SAPOL's Ethical and Professional Standards Branch (EPSB), I turn complaint, investigation and workforce data into reports and advice that executives and oversight bodies can act on. That includes the quarterly Use of Force and Vehicle Pursuit statistical reports, a review of the branch's complaint administration workflow, an analysis of expiation notices, and tooling such as a Python client and web console for the complaint-management system APIs, covering more than 1,100 endpoints.",
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
                    text: `I hold two degrees from the University of Melbourne: a Bachelor of Science majoring in Data Science and a Master of Data Science. Alongside them I hold ${CERTS.length} professional credentials and assessments across data, analytics, cloud, project management and language, including a VETASSESS Statistician skills assessment, IELTS General Training Band 8 and NAATI Credentialed Community Language (Mandarin).`,
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

        {/* ── Profile page / breadcrumb / projects / credentials — homepage-only ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_PAGE_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PROJECTS_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CREDENTIALS_SCHEMA) }}
        />
      </Head>

      <SeoHead
        title={
          isZh
            ? "Rin Huang (黄孙创宇) — 个人主页 | 高级数据分析师"
            : "Rin Huang (黄孙创宇) — Official Portfolio | Senior Data Analyst"
        }
        description={
          isZh
            ? `Rin Huang（黄孙创宇）的官方网站。南澳大利亚警察局（SAPOL）ASO7 高级数据分析师，Mapiva 联合创始人兼开发负责人。职业经历、项目成果、${CERTS.length} 项专业认证。亦被称为 Huang Sunchuangyu、HUANGSUNCHUANGYU。`
            : "Official website of Rin Huang, ASO7 Senior Data Analyst at South Australia Police and Co-Founder & Dev Lead at Mapiva. Previously at CBS (Attorney-General's Department SA), the University of Melbourne, WEHI and CSIRO. Full career history, projects and contact. Also known as 黄孙创宇 (Huang Sunchuangyu)."
        }
        path="/"
        ogImage={{
          title: "Rin Huang",
          subtitle: isZh ? "高级数据分析师 @ SAPOL" : "Senior Data Analyst @ SAPOL",
          section: "home",
        }}
        ogType="profile"
        ogTitle={
          isZh
            ? "Rin Huang (黄孙创宇) — 高级数据分析师 · 研究软件工程师"
            : "Rin Huang (黄孙创宇 · Huang Sunchuangyu) — Senior Data Analyst · Research Software Engineer"
        }
        ogDescription={
          isZh
            ? "Rin Huang（黄孙创宇）的个人主页。现任南澳大利亚警察局（SAPOL）ASO7 高级数据分析师、Mapiva 联合创始人兼开发负责人，曾任 WEHI 研究软件工程师和 CSIRO 数据科学产业顾问。职业经历、项目成果、技能与联系方式。"
            : "Official portfolio of Rin Huang (黄孙创宇), ASO7 Senior Data Analyst at South Australia Police and Co-Founder & Dev Lead at Mapiva. Previously a Research Software Engineer at WEHI and a Data Science Industrial Consultant at CSIRO. Career history, projects, skills and contact."
        }
        locale={locale}
        extraMeta={[
          { name: "twitter:site", content: "@rNLKJA" },
          { name: "twitter:creator", content: "@rNLKJA" },
          { name: "twitter:domain", content: "rin.contact" },
          { name: "twitter:label1", content: isZh ? "职位" : "Role" },
          {
            name: "twitter:data1",
            content: isZh
              ? "高级数据分析师 · 阿德莱德"
              : "Senior Data Analyst &middot; Adelaide, SA",
          },
          { name: "twitter:label2", content: isZh ? "专长" : "Specialisation" },
          {
            name: "twitter:data2",
            content: isZh ? "数据科学 · 战略情报" : "Data Science &middot; Strategic Intelligence",
          },
          { property: "profile:first_name", content: "Sunchuangyu" },
          { property: "profile:last_name", content: "Huang" },
          { property: "profile:username", content: "rNLKJA" },
          { property: "og:updated_time", content: "2026-10-03T00:00:00+09:30" },
          { property: "og:locale:alternate", content: isZh ? "en_AU" : "zh_CN" },
        ]}
      />

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
          <div className="bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
              <HeroSection />
            </div>
            {/* Decorative elements — hidden on mobile for faster LCP, desktop only */}
            <div
              className="hidden md:block absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              <ArtCross className="top-10 left-8 text-[#C0C0C0] dark:text-[#3D3D3D]" />
              <ArtCross className="bottom-12 right-12 text-[#C0C0C0] dark:text-[#3D3D3D]" />
              <ArtCircle
                className="animate-art-breathe border-[#E0E0E0] dark:border-[#3D3D3D]"
                style={{ width: "1300px", height: "1300px", right: "-450px", bottom: "-450px" }}
              />
              <ArtCircle
                className="animate-art-breathe border-[#E4E4E4] dark:border-[#3D3D3D]"
                style={{
                  width: "840px",
                  height: "840px",
                  right: "-220px",
                  bottom: "-220px",
                  animationDelay: "1.2s",
                }}
              />
              <ArtCircle
                className="animate-art-breathe border-[#EBEBEB] dark:border-[#3D3D3D]"
                style={{
                  width: "420px",
                  height: "420px",
                  right: "-10px",
                  bottom: "-10px",
                  animationDelay: "2.4s",
                }}
              />
              <ArtSquircle
                className="animate-art-spin border-[#DCDCDC] dark:border-[#3D3D3D]"
                style={{
                  width: "320px",
                  height: "320px",
                  top: "48px",
                  left: "40px",
                  animationDelay: "1.5s",
                }}
              />
              <ArtBlob
                className="border-[#E8E8E8] dark:border-[#2A2A2A]"
                style={{
                  width: "420px",
                  height: "380px",
                  top: "30%",
                  left: "-100px",
                  animationDelay: "3s",
                }}
              />
              <WaveArc className="top-[38%] h-20 dark:[&>path]:stroke-[#3D3D3D]" stroke="#EBEBEB" />
              <div className="dot-matrix absolute left-0 bottom-0 w-80 h-80 opacity-[0.03] md:opacity-[0.08]" />
            </div>
          </div>

          {/* ══ BY THE NUMBERS — glyph counters, counted at build time ══ */}
          <div className="bg-white dark:bg-[#0A0A0A]">
            <GlyphCounters stats={glyphStats} />
          </div>

          {/* ══ POSITIONING — thesis band (identity -> thesis -> proof) ══ */}
          <div className="bg-white dark:bg-[#0A0A0A] content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <PositioningStatement />
            </div>
          </div>

          {/* ══ DIVIDER — positioning to featured ══ */}
          <div className="bg-white dark:bg-[#0A0A0A]">
            <SectionDivider />
          </div>

          {/* ══ FEATURED WORK — flagship spotlight ══ */}
          <div className="bg-white dark:bg-[#0A0A0A] content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <FeaturedWork />
            </div>
          </div>

          {/* ══ MARQUEE — kinetic domains band (full-bleed) ══ */}
          <MarqueeBand />

          {/* ══ STATUS + SECTION NAV CARDS — white ══ */}
          <div className="bg-white dark:bg-[#0A0A0A] border-t border-[#F5F5F5] dark:border-[#1E1E1E] content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-10">
              <StatusBadge />
            </div>
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <SectionNavCards />
            </div>
          </div>

          {/* ══ DIVIDER — explore to testimonials ══ */}
          <div className="bg-white dark:bg-[#0A0A0A]">
            <SectionDivider />
          </div>

          {/* ══ TESTIMONIALS — social proof ══ */}
          <div className="bg-white dark:bg-[#0A0A0A] content-visibility-auto">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <TestimonialsSection />
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
              {[1, 1, 1, 1].map((_, i) => (
                <span
                  key={`h${i}`}
                  className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5"
                />
              ))}
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
            <div
              className="hidden md:block absolute inset-0 pointer-events-none"
              aria-hidden="true"
            >
              <GhostLabel className="right-0 bottom-0 translate-y-[28%] text-white opacity-[0.02] md:opacity-[0.06]">
                CONNECT
              </GhostLabel>
              <div
                className="absolute left-0 top-0 w-80 h-80 opacity-[0.05] md:opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, #2E2E2E 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <ArtCross className="top-10 left-8 text-[#2C2C2C]" />
              <ArtCross className="bottom-12 right-12 text-[#2C2C2C]" />
              <ArtCircle
                className="animate-art-breathe border-[#222222]"
                style={{ width: "1300px", height: "1300px", bottom: "-450px", right: "-450px" }}
              />
              <ArtCircle
                className="animate-art-breathe border-[#242424]"
                style={{
                  width: "760px",
                  height: "760px",
                  bottom: "-180px",
                  right: "-180px",
                  animationDelay: "1.5s",
                }}
              />
              <ArtCircle
                className="animate-art-breathe border-[#262626]"
                style={{
                  width: "360px",
                  height: "360px",
                  bottom: "20px",
                  right: "20px",
                  animationDelay: "3s",
                }}
              />
              <ArtCircle
                className="animate-art-float border-[#222222]"
                style={{
                  width: "560px",
                  height: "560px",
                  top: "-160px",
                  left: "-160px",
                  animationDelay: "3s",
                }}
              />
              <ArtCircle
                className="animate-art-float border-[#232323]"
                style={{
                  width: "280px",
                  height: "280px",
                  top: "-20px",
                  left: "-20px",
                  animationDelay: "4.5s",
                }}
              />
              <ArtSquircle
                className="animate-art-spin border-[#222222]"
                style={{
                  width: "300px",
                  height: "300px",
                  top: "30%",
                  right: "-60px",
                  animationDelay: "0s",
                }}
              />
              <ArtBlob
                className="border-[#212121]"
                style={{
                  width: "400px",
                  height: "360px",
                  bottom: "60px",
                  left: "-80px",
                  animationDelay: "7s",
                }}
              />
              <WaveArc className="top-[35%] h-20" stroke="#222222" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// The glyph counters read the same data as the pages they link to (career,
// projects, coursework and the skills atlas), so the numbers can't drift.
export async function getStaticProps({ locale = "en-AU" }) {
  const posts = (await getAllPosts()).map(({ slug, title, date, tags }) => ({
    slug,
    title,
    date: date ?? null,
    tags: tags ?? [],
  }));
  const dict = locale === "zh-Hans" ? zh : en;
  const atlas = buildSkillsAtlas(locale, { dict, posts });
  return {
    props: {
      glyphStats: {
        roles: ROLES.length,
        projects: PROJECTS.length,
        coursework: COURSEWORK.length,
        skills: atlas.stats.skills,
      },
    },
  };
}
