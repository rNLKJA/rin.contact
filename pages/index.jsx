import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";

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
  dateModified: "2026-03-10T00:00:00+10:30",
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
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "SoftwareApplication",
        name: "Mapiva",
        description:
          "Co-founded a mobile social connection app — full product ownership from architecture through implementation as Dev Lead.",
        applicationCategory: "SocialNetworkingApplication",
        operatingSystem: "iOS, Android",
        author: { "@id": "https://rin.contact/#person" },
        programmingLanguage: ["React Native", "Expo"],
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "SoftwareSourceCode",
        name: "SA Address Generator",
        description:
          "Internal tool to generate validated South Australian addresses based on SEIFA indices and remoteness classifications, verified via Mapbox API.",
        codeRepository: "https://github.com/rNLKJA/SA-Mock-Address-Generator",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "SoftwareSourceCode",
        name: "US Political Data Collection System",
        description:
          "Scraped ~180 presidential debate transcripts and ~25,000 campaign documents from the UC Santa Barbara American Presidency Project with multi-threaded processing.",
        codeRepository: "https://github.com/rNLKJA/Political-Data-Collection-System",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "SoftwareApplication",
        name: "CBS Intelligence Analytics",
        description:
          "First intelligence analytics capability within the CBS Prevention Team — integrating ABS, SA Health, ACCC, and DataSA data into unified dashboards and GIS maps used by the Minister's Office.",
        applicationCategory: "BusinessApplication",
        author: { "@id": "https://rin.contact/#person" },
        programmingLanguage: ["Python", "Power BI"],
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "SoftwareApplication",
        name: "MoodQ",
        description:
          "Clinician-facing and patient-facing mental health mobile app for the University of Melbourne Psychiatry research group. Migrated from Uniapp to Expo React Native, reducing hosting costs ~$500/month.",
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
        author: { "@id": "https://rin.contact/#person" },
        programmingLanguage: ["Expo", "React Native", "Node.js"],
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "SoftwareApplication",
        name: "SAPOL Intelligence Dashboards",
        description:
          "Operational intelligence and crime analytics dashboards supporting frontline policing, resource allocation, and command-level decision-making across South Australia.",
        applicationCategory: "BusinessApplication",
        author: { "@id": "https://rin.contact/#person" },
        programmingLanguage: ["Python", "Power BI", "SQL"],
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Flow Cytometry Analysis Pipeline",
        description:
          "Automated flow cytometry data analysis using cloud and HPC, with test infrastructure for reproducibility and open-source contributions to celseq2.",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem",
      position: 8,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Climate Fact-Checker",
        description:
          "Two-stage automated fact-checking for climate change claims — TF-IDF evidence retrieval and Transformer-based classification, outperforming LSTM baselines.",
        codeRepository: "https://github.com/rNLKJA",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem",
      position: 9,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Australia Social Media Analytics on the Cloud",
        description:
          "Harvested and analysed Twitter and Mastodon data alongside ABS SUDO spatial data to produce a Social Sense Dashboard across Australian regions.",
        codeRepository: "https://github.com/rNLKJA/Australia-Social-Media-Analytics-on-the-Cloud",
        programmingLanguage: ["Python", "CouchDB"],
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem",
      position: 10,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Twitter HPC Analysis",
        description:
          "Processed a large-scale Twitter dataset on SPARTAN HPC using MPI and Python, identifying tweet distribution across Australian cities.",
        codeRepository: "https://github.com/rNLKJA/Twitter-Data-Analysis-with-HPC",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem",
      position: 11,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Cachex AI Game Agent",
        description:
          "AI agents for Cachex — a two-player connection game — using heuristic A* search and competitive game theory with strategic sabotage logic.",
        codeRepository: "https://github.com/rNLKJA/Cachex-AI",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem",
      position: 12,
      item: {
        "@type": "SoftwareSourceCode",
        name: "PCRM — Personal Customer Relationship Management",
        description:
          "Full-stack CRM system with React frontend, Express REST API, and MongoDB backend, built as the COMP30022 IT Project at the University of Melbourne.",
        codeRepository: "https://github.com/rNLKJA/Personal-Customer-Relation-Management-PCRM",
        programmingLanguage: ["Node.js", "React.js", "MongoDB"],
        author: { "@id": "https://rin.contact/#person" },
      },
    },
  ],
};

const CREDENTIALS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOccupationalCredential",
      name: "VETASSESS — Statistician (ANZSCO 224113)",
      credentialCategory: "ProfessionalAssessment",
      recognizedBy: { "@type": "Organization", name: "VETASSESS" },
      dateCreated: "2026-02-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "IELTS General Training — Band 8",
      credentialCategory: "LanguageAssessment",
      recognizedBy: { "@type": "Organization", name: "IELTS Official" },
      dateCreated: "2026-02-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Credentialed Community Language — Mandarin",
      credentialCategory: "LanguageCredential",
      recognizedBy: { "@type": "Organization", name: "NAATI" },
      dateCreated: "2025-12-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Microsoft", url: "https://microsoft.com" },
      dateCreated: "2024-07-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Neo4j Certified Professional",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Neo4j", url: "https://neo4j.com" },
      dateCreated: "2025-08-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Neo4j Graph Data Science Certification",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Neo4j", url: "https://neo4j.com" },
      dateCreated: "2025-08-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google UX Design Specialisation",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2025-12-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Business Intelligence Specialisation",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2025-12-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Project Management Specialisation",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2025-12-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google IT Automation with Python",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2022-05-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Data Analytics Specialisation",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2021-06-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Open-Source Intelligence (OSINT) Fundamentals",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "TCM Security" },
      dateCreated: "2025-10-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Analytics Individual Qualification (GAIQ)",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2024-05-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Advanced SQL for Data Scientists",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "LinkedIn Learning" },
      dateCreated: "2024-01-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Atlassian Agile Project Management Professional Certificate",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Atlassian", url: "https://atlassian.com" },
      dateCreated: "2024-04-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Career Essentials in GitHub Professional Certificate",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "GitHub", url: "https://github.com" },
      dateCreated: "2024-01-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Melbourne Plus: Innovation",
      credentialCategory: "microcredential",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "University of Melbourne",
        url: "https://www.unimelb.edu.au",
      },
      dateCreated: "2024-05-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Melbourne Plus: People Leadership",
      credentialCategory: "microcredential",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "University of Melbourne",
        url: "https://www.unimelb.edu.au",
      },
      dateCreated: "2024-10-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
  ],
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

export default function Home() {
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
              ? "Rin Huang（黄孙创宇）的官方网站 — 南澳大利亚警察局高级数据分析师，曾任WEHI研究软件工程师、CSIRO数据科学顾问。完整的职业经历、项目成果和联系方式。"
              : "Rin Huang's official website — Senior Data Analyst at South Australia Police, Research Software Engineer at WEHI & CSIRO. Full career history, projects, and contact. Also known as 黄孙创宇 (Huang Sunchuangyu)."
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
            ? "Rin Huang（黄孙创宇）的官方网站 — 南澳大利亚警察局高级数据分析师。职业经历、项目成果、23项专业认证。亦被称为 Huang Sunchuangyu、HUANGSUNCHUANGYU。"
            : "Rin Huang's official website — Senior Data Analyst at South Australia Police, Research Software Engineer at WEHI & CSIRO. Full career history, projects, and contact. Also known as 黄孙创宇 (Huang Sunchuangyu)."
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
            ? "Rin Huang（黄孙创宇）的个人主页 — 南澳大利亚警察局高级数据分析师，WEHI研究软件工程师，CSIRO数据科学顾问。职业经历、项目成果、技能与联系方式。"
            : "Official personal portfolio of Rin Huang (黄孙创宇) — Senior Data Analyst at South Australia Police, Research Software Engineer at WEHI & CSIRO. Career history, projects, skills, and contact."
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
          { property: "og:updated_time", content: "2026-03-10T00:00:00+10:30" },
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
