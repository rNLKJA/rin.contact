import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { CERTS, ROLES, EDUCATION } from "@/lib/career-data";
import { PROJECTS } from "@/lib/projects-data";
import { COURSEWORK } from "@/lib/coursework-data";
import { getAllPosts } from "@/lib/posts";
import { buildSkillsAtlas } from "@/lib/skills-atlas";
import en from "@/locales/en-AU.json";
import zh from "@/locales/zh-Hans.json";
import GlyphCounters from "@/components/sections/GlyphCounters";
import { ogImageUrl } from "@/lib/og";

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
    url: ogImageUrl({
      title: "Rin Huang",
      subtitle: "Senior Data Analyst @ SAPOL",
      section: "home",
      path: "/",
    }),
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

// ── Crop mark (decorative): a thin plus at a container corner ──────────────
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

// Hero is above the fold — load immediately
import HeroSection from "@/components/sections/HeroSection";
import { SHELL } from "@/components/home/SectionHeader";
const MiniTerminal = dynamic(() => import("@/components/MiniTerminal"), { ssr: false });
import ConfettiBurst from "@/components/ui/ConfettiBurst";

// HELLO in Morse: H . . . .  E .  L . - . .  L . - . .  O - - -
const MORSE = ["....", ".", ".-..", ".-..", "---"];

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
          <p className="font-mono text-[#9A9A9A] text-xs mt-1">
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
const CareerInstrument = dynamic(() => import("@/components/sections/CareerInstrument"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[452px] md:min-h-[424px] border-y border-[#E0E0E0] dark:border-[#3D3D3D]"
      aria-hidden="true"
    />
  ),
});
const SectionExplorer = dynamic(() => import("@/components/sections/SectionExplorer"), {
  loading: () => <div className="min-h-[640px]" aria-hidden="true" />,
});
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  loading: () => <div className="min-h-[320px]" aria-hidden="true" />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <div className="bg-[#1A1A1A] min-h-[1200px]" aria-hidden="true" />,
});

export default function Home({ glyphStats, explorerData = {} }) {
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

      {/* Floating terminal trigger — bottom-right, from xl only: between md and
          xl it would sit over the content column. The panel still opens with
          the backtick key from md. Neutral ink at rest: red is kept for what is
          live; the red focus ring stays, as it shows on light and dark bands. */}
      <button
        onClick={() => setTermOpen((o) => !o)}
        aria-label={termOpen ? "Close terminal" : "Open terminal (or press `)"}
        title={termOpen ? "Close terminal" : "Open terminal  ·  press `"}
        className="hidden xl:flex fixed bottom-6 right-6 z-40 w-11 h-11 border border-[#3D3D3D] bg-[#0C0C0C]
                   items-center justify-center text-[#E0E0E0] font-mono text-sm
                   hover:border-white hover:text-white hover:bg-[#111111] transition-colors duration-200
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FF3C3C]"
        style={{ borderRadius: 0 }}
      >
        {termOpen ? "✕" : ">_"}
      </button>

      {/* Terminal panel */}
      {termOpen && (
        <div className="hidden md:block fixed bottom-20 right-6 z-40 animate-fade-up">
          <MiniTerminal onClose={() => setTermOpen(false)} />
        </div>
      )}

      <Head>
        {/* viewport is set globally in _app.jsx */}

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
      {/* One container (SHELL) for every section; instrument bands run their
          hairlines full-bleed, editorial sections share the 12-column grid. */}
      <div className="relative">
        {/* ══ HERO ══ */}
        <div className="relative overflow-hidden">
          <div className={`${SHELL} relative`}>
            {/* Crop marks at the container's top corners (desktop, decorative) */}
            <div className="hidden md:block" aria-hidden="true">
              <ArtCross className="top-5 left-[38px] text-[#C8C8C8] dark:text-[#3D3D3D]" />
              <ArtCross className="top-5 right-[38px] text-[#C8C8C8] dark:text-[#3D3D3D]" />
            </div>
            <HeroSection />
          </div>
        </div>

        {/* ══ 01 BY THE NUMBERS — glyph counters, counted at build time ══ */}
        <GlyphCounters stats={glyphStats} />

        {/* ══ 02 OPERATING PRINCIPLE ══ */}
        <div>
          <div className={SHELL}>
            <PositioningStatement />
          </div>
        </div>

        {/* ══ 03 FLAGSHIP ══ */}
        <div className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
          <div className={SHELL}>
            <FeaturedWork />
          </div>
        </div>

        {/* ══ 04 CAREER SIGNAL — one row per track, links to /career ══ */}
        <CareerInstrument compact />

        {/* ══ WORKED WITH + STATUS — one strip, two rows ══ */}
        <MarqueeBand />

        {/* ══ 05 EXPLORE ══ */}
        <div>
          <div className={SHELL}>
            <SectionExplorer
              postsByMonth={explorerData.postsByMonth}
              totalPosts={explorerData.totalPosts}
              careerMonths={explorerData.careerMonths}
              projectCount={explorerData.projectCount}
              roleCount={explorerData.roleCount}
              resumeYears={explorerData.resumeYears}
              resumeCount={explorerData.resumeCount}
            />
          </div>
        </div>

        {/* ══ 06 TESTIMONIALS ══ */}
        <div className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
          <div className={SHELL}>
            <TestimonialsSection index="06" />
          </div>
        </div>

        {/* Reading nudge — desktop only, retires when Contact is on screen */}
        <ReadingToast threshold={0.55} />

        {/* ══ 07 CONTACT — always dark ══ */}
        <div className="bg-[#1A1A1A] relative overflow-hidden border-b border-[#2A2A2A]">
          {/* Dot patch + crop marks (decorative, desktop) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute left-0 top-0 w-80 h-80 opacity-20"
              style={{
                backgroundImage: "radial-gradient(circle, #2E2E2E 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
          </div>
          <div className={`${SHELL} relative z-10`}>
            <div className="hidden md:block" aria-hidden="true">
              <ArtCross className="top-5 left-[38px] text-[#3D3D3D]" />
              <ArtCross className="top-5 right-[38px] text-[#3D3D3D]" />
            </div>
            <ContactSection />
            {/* ── Morse code easter egg — HELLO encoded as dots & dashes ─────── */}
            {/* H=....  E=.  L=.-..  L=.-..  O=--- */}
            {/* Hint: /fun/secret */}
            <div
              className="flex items-center justify-start pb-8 gap-px"
              aria-hidden="true"
              title="Can you decode this?"
              style={{ opacity: 0.16 }}
            >
              {MORSE.map((letter, li) => (
                <React.Fragment key={li}>
                  {li > 0 && <span className="inline-block w-3" />}
                  {letter
                    .split("")
                    .map((sym, si) =>
                      sym === "." ? (
                        <span
                          key={si}
                          className="inline-block w-1.5 h-1.5 rounded-full bg-white mx-0.5"
                        />
                      ) : (
                        <span key={si} className="inline-block w-4 h-1 bg-white mx-0.5" />
                      )
                    )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// The glyph counters read the same data as the pages they link to (career,
// projects, coursework and the skills atlas), so the numbers can't drift.
// The explorer tiles also read live data computed at build time.
export async function getStaticProps({ locale = "en-AU" }) {
  const posts = (await getAllPosts()).map(({ slug, title, date, tags }) => ({
    slug,
    title,
    date: date ?? null,
    tags: tags ?? [],
  }));
  const dict = locale === "zh-Hans" ? zh : en;
  const atlas = buildSkillsAtlas(locale, { dict, posts });

  // Compute postsByMonth for the explorer (last 6 months)
  const postsByMonth = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const count = posts.filter((p) => {
      if (!p.date) return false;
      const pDate = new Date(p.date);
      return pDate.getFullYear() === year && pDate.getMonth() === month;
    }).length;
    postsByMonth.push(count);
  }

  // Compute careerMonths for the explorer (last 12 months of role activity)
  const careerMonths = [];
  const ORIGIN_YEAR = 2023;
  const MONTHS_BACK = 12;
  const startMonth = (now.getFullYear() - ORIGIN_YEAR) * 12 + now.getMonth() - MONTHS_BACK;
  const endMonth = (now.getFullYear() - ORIGIN_YEAR) * 12 + now.getMonth();

  for (let m = startMonth; m <= endMonth; m++) {
    const hasRole = ROLES.some((role) => {
      const roleStart = new Date(role.start);
      const roleEnd = role.end ? new Date(role.end) : now;
      const roleStartMonth = (roleStart.getFullYear() - ORIGIN_YEAR) * 12 + roleStart.getMonth();
      const roleEndMonth = (roleEnd.getFullYear() - ORIGIN_YEAR) * 12 + roleEnd.getMonth();
      return m >= roleStartMonth && m <= roleEndMonth;
    });
    careerMonths.push(hasRole);
  }

  // Build resume year strip: 2019-2026, mark years with role or degree starts
  const currentYear = now.getFullYear();
  const resumeYears = [];
  for (let year = 2019; year <= currentYear; year++) {
    const hasRole = ROLES.some((r) => new Date(r.start).getFullYear() === year);
    const hasDegree = EDUCATION.some((e) => {
      const yearRange = e.year.split("–");
      const startYear = parseInt(yearRange[0]);
      return startYear === year;
    });
    resumeYears.push({ year, hasEntry: hasRole || hasDegree });
  }

  // Total resume count: roles + degrees
  const resumeCount = ROLES.length + EDUCATION.length;

  // Total published posts
  const totalPosts = posts.length;

  return {
    props: {
      glyphStats: {
        roles: ROLES.length,
        projects: PROJECTS.length,
        coursework: COURSEWORK.length,
        skills: atlas.stats.skills,
      },
      explorerData: {
        postsByMonth,
        totalPosts,
        careerMonths,
        projectCount: PROJECTS.length,
        roleCount: ROLES.length,
        resumeYears,
        resumeCount,
      },
    },
  };
}
