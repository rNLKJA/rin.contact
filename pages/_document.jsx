import Document, { Head, Html, Main, NextScript } from "next/document";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://rin.contact/#person",
  name: "Sunchuangyu (Rin) Huang",
  alternateName: [
    "Rin Huang",
    "黄孙创宇",
    "黄孙 Rin",
    "Sunchuangyu Huang",
    "Huang Sunchuangyu",
    "HUANG SUNCHUANGYU",
    "HUANGSUNCHUANGYU",
    "HUANG SUN CHUANG YU",
    "Huang Sun Chuang Yu",
    "Sun Chuang Yu Huang",
  ],
  givenName: "Sunchuangyu",
  additionalName: "Rin",
  familyName: "Huang",
  url: "https://rin.contact",
  image: "https://rin.contact/api/og?title=Rin%20Huang&subtitle=Senior%20Data%20Analyst%20%40%20SAPOL&section=home",
  email: "huang@rin.contact",
  gender: "Male",
  nationality: { "@type": "Country", name: "Australia" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressRegion: "SA",
    addressCountry: "AU",
  },
  homeLocation: [
    {
      "@type": "Place",
      name: "Adelaide, South Australia, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -34.9285, longitude: 138.6007 },
      address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
    },
    {
      "@type": "Place",
      name: "Melbourne, Victoria, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -37.8136, longitude: 144.9631 },
      address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "VIC", addressCountry: "AU" },
    },
    {
      "@type": "Place",
      name: "Sydney, New South Wales, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -33.8688, longitude: 151.2093 },
      address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", addressCountry: "AU" },
    },
    {
      "@type": "Place",
      name: "Anshun, Guizhou, China",
      geo: { "@type": "GeoCoordinates", latitude: 26.2457, longitude: 105.9468 },
      address: { "@type": "PostalAddress", addressLocality: "Anshun", addressRegion: "Guizhou", addressCountry: "CN" },
    },
  ],
  workLocation: {
    "@type": "Place",
    name: "Adelaide, South Australia, Australia",
    address: { "@type": "PostalAddress", addressLocality: "Adelaide", addressRegion: "SA", addressCountry: "AU" },
  },
  jobTitle: "Senior Data Analyst",
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Data Analyst",
    description: "Develops analytical models and statistical frameworks that translate complex policing data into decision-ready intelligence for government and public safety organisations.",
    occupationLocation: { "@type": "City", name: "Adelaide" },
    skills: "Python, R, SQL, Power BI, Statistical Modelling, Strategic Intelligence, GIS, Machine Learning",
  },
  knowsLanguage: [
    { "@type": "Language", name: "English",           alternateName: "en" },
    { "@type": "Language", name: "Mandarin Chinese",  alternateName: "zh" },
  ],
  worksFor: {
    "@type": "Organization",
    name: "South Australia Police",
    url: "https://www.police.sa.gov.au",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Melbourne",
      url: "https://www.unimelb.edu.au",
    },
  ],
  knowsAbout: [
    "Data Science",
    "Statistical Analysis",
    "Strategic Intelligence",
    "Python",
    "Machine Learning",
    "Full-Stack Web Development",
    "Mobile Development",
    "Cloud Infrastructure",
    "Government Analytics",
    "Research Software Engineering",
  ],
  sameAs: [
    "https://github.com/rNLKJA",
    "https://linkedin.com/in/sunchuangyuhuang",
    "https://www.instagram.com/chuangyu_hscy/",
    "https://twitter.com/rNLKJA",
    "https://buymeacoffee.com/rNLKJA",
  ],
  // mainEntityOfPage declares rin.contact as THE primary web page for this person entity.
  // This is the key signal that lets Google favour rin.contact over LinkedIn in name searches.
  mainEntityOfPage: { "@id": "https://rin.contact/#profilepage" },
  subjectOf: { "@id": "https://rin.contact/#profilepage" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "huang@rin.contact",
    contactType: "professional enquiries",
    availableLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Mandarin Chinese" },
    ],
  },
  description:
    "Sunchuangyu (Rin) Huang — also known as 黄孙创宇 (黄孙 Rin), Huang Sunchuangyu, HUANG SUNCHUANGYU, and HUANGSUNCHUANGYU — is a Senior Data Analyst at South Australia Police, Research Software Engineer, and Full-Stack Developer specialising in data science, strategic intelligence, and continuous improvement.",
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rin.contact/#website",
  url: "https://rin.contact",
  name: "Rin Huang — Official Portfolio",
  description:
    "Official personal portfolio of Sunchuangyu (Rin) Huang — Senior Data Analyst, Research Software Engineer, and Full-Stack Developer based in Adelaide, Australia.",
  author: { "@id": "https://rin.contact/#person" },
  publisher: { "@id": "https://rin.contact/#person" },
  inLanguage: ["en-AU", "zh-Hans"],
  copyrightYear: 2026,
  datePublished: "2024-01-01T00:00:00+10:30",
  dateModified: "2026-03-10T00:00:00+10:30",
  // SearchAction enables a site search box in Google rich results and signals
  // this is a first-class website (not just a social profile).
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://rin.contact/?s={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

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
    url: "https://rin.contact/api/og?title=Rin%20Huang&subtitle=Senior%20Data%20Analyst%20%40%20SAPOL&section=home",
    width: 1200,
    height: 630,
    caption: "Rin Huang (黄孙创宇, Sunchuangyu Huang) — Senior Data Analyst & Research Software Engineer",
  },
  // significantLinks tells Google that LinkedIn/GitHub are related pages, not competitors
  significantLinks: [
    "https://linkedin.com/in/sunchuangyuhuang",
    "https://github.com/rNLKJA",
  ],
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#hero-bio", ".hero-role", "h2"],
  },
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
      "@type": "ListItem", position: 1,
      item: {
        "@type": "SoftwareApplication",
        name: "Mapiva",
        description: "Co-founded a mobile social connection app — full product ownership from architecture through implementation as Dev Lead.",
        applicationCategory: "SocialNetworkingApplication",
        operatingSystem: "iOS, Android",
        author: { "@id": "https://rin.contact/#person" },
        programmingLanguage: ["React Native", "Expo"],
      },
    },
    {
      "@type": "ListItem", position: 2,
      item: {
        "@type": "SoftwareSourceCode",
        name: "SA Address Generator",
        description: "Internal tool to generate validated South Australian addresses based on SEIFA indices and remoteness classifications, verified via Mapbox API.",
        codeRepository: "https://github.com/rNLKJA/SA-Mock-Address-Generator",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem", position: 3,
      item: {
        "@type": "SoftwareSourceCode",
        name: "US Political Data Collection System",
        description: "Scraped ~180 presidential debate transcripts and ~25,000 campaign documents from the UC Santa Barbara American Presidency Project with multi-threaded processing.",
        codeRepository: "https://github.com/rNLKJA/Political-Data-Collection-System",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem", position: 4,
      item: {
        "@type": "SoftwareApplication",
        name: "CBS Intelligence Analytics",
        description: "First intelligence analytics capability within the CBS Prevention Team — integrating ABS, SA Health, ACCC, and DataSA data into unified dashboards and GIS maps used by the Minister's Office.",
        applicationCategory: "BusinessApplication",
        author: { "@id": "https://rin.contact/#person" },
        programmingLanguage: ["Python", "Power BI"],
      },
    },
    {
      "@type": "ListItem", position: 5,
      item: {
        "@type": "SoftwareApplication",
        name: "MoodQ",
        description: "Clinician-facing and patient-facing mental health mobile app for the University of Melbourne Psychiatry research group. Migrated from Uniapp to Expo React Native, reducing hosting costs ~$500/month.",
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
        author: { "@id": "https://rin.contact/#person" },
        programmingLanguage: ["Expo", "React Native", "Node.js"],
      },
    },
    {
      "@type": "ListItem", position: 6,
      item: {
        "@type": "SoftwareApplication",
        name: "SAPOL Intelligence Dashboards",
        description: "Operational intelligence and crime analytics dashboards supporting frontline policing, resource allocation, and command-level decision-making across South Australia.",
        applicationCategory: "BusinessApplication",
        author: { "@id": "https://rin.contact/#person" },
        programmingLanguage: ["Python", "Power BI", "SQL"],
      },
    },
    {
      "@type": "ListItem", position: 7,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Flow Cytometry Analysis Pipeline",
        description: "Automated flow cytometry data analysis using cloud and HPC, with test infrastructure for reproducibility and open-source contributions to celseq2.",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem", position: 8,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Climate Fact-Checker",
        description: "Two-stage automated fact-checking for climate change claims — TF-IDF evidence retrieval and Transformer-based classification, outperforming LSTM baselines.",
        codeRepository: "https://github.com/rNLKJA",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem", position: 9,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Australia Social Media Analytics on the Cloud",
        description: "Harvested and analysed Twitter and Mastodon data alongside ABS SUDO spatial data to produce a Social Sense Dashboard across Australian regions.",
        codeRepository: "https://github.com/rNLKJA/Australia-Social-Media-Analytics-on-the-Cloud",
        programmingLanguage: ["Python", "CouchDB"],
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem", position: 10,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Twitter HPC Analysis",
        description: "Processed a large-scale Twitter dataset on SPARTAN HPC using MPI and Python, identifying tweet distribution across Australian cities.",
        codeRepository: "https://github.com/rNLKJA/Twitter-Data-Analysis-with-HPC",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem", position: 11,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Cachex AI Game Agent",
        description: "AI agents for Cachex — a two-player connection game — using heuristic A* search and competitive game theory with strategic sabotage logic.",
        codeRepository: "https://github.com/rNLKJA/Cachex-AI",
        programmingLanguage: "Python",
        author: { "@id": "https://rin.contact/#person" },
      },
    },
    {
      "@type": "ListItem", position: 12,
      item: {
        "@type": "SoftwareSourceCode",
        name: "PCRM — Personal Customer Relationship Management",
        description: "Full-stack CRM system with React frontend, Express REST API, and MongoDB backend, built as the COMP30022 IT Project at the University of Melbourne.",
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
      recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Melbourne", url: "https://www.unimelb.edu.au" },
      dateCreated: "2024-05-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Melbourne Plus: People Leadership",
      credentialCategory: "microcredential",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Melbourne", url: "https://www.unimelb.edu.au" },
      dateCreated: "2024-10-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
  ],
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

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-AU" suppressHydrationWarning>
        <Head>
          {/* ── Character set ── */}
          <meta charSet="utf-8" />

          {/* ── Trusted Types default policy (must run before any DOM XSS sink) ── */}
          <script
            dangerouslySetInnerHTML={{
              __html: `if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
  trustedTypes.createPolicy("default", {
    createHTML: function(s) { return s; },
    createScript: function(s) { return s; },
    createScriptURL: function(s) { return s; }
  });
}`,
            }}
          />

          {/* ── Theme (no-flash: runs before paint) ── */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var s=localStorage.getItem("rin_theme");var t=s==="light"||s==="dark"?s:"light";document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.setAttribute("data-theme",t);var m=document.querySelector("meta[name=theme-color]");if(m)m.setAttribute("content",t==="dark"?"#0A0A0A":"#ffffff");})();`,
            }}
          />
          <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="color-scheme" content="light dark" />

          {/* ── Authorship ── */}
          <meta name="author" content="Sunchuangyu (Rin) Huang" />
          <meta name="rating" content="general" />

          {/* ── Search engine verification ── */}
          <meta name="google-site-verification" content="uQJ5D6LcYS7OR9_3FJ9XiOezDuy2XJz9uNMoyxXTWoM" />
          <meta name="msvalidate.01" content="1A11F7338CB1C8779DDBD51D691938EE" />
          <meta name="baidu-site-verification" content="codeva-AxSgaBAlpG" />

          {/* ── Bing / IndexNow ── */}
          {/* IndexNow lets Bing index page changes near-instantly — key verified via /d4e8f2a1b7c3e9f5d2a8b1c6e7f0d3a9.txt */}
          <meta name="indexnow-key" content="d4e8f2a1b7c3e9f5d2a8b1c6e7f0d3a9" />
          <link rel="indexnow-key" href="https://rin.contact/d4e8f2a1b7c3e9f5d2a8b1c6e7f0d3a9.txt" />

          {/* ── Baidu mobile indexing ── */}
          {/* applicable-device tells Baidu Spider this page renders correctly on both desktop and mobile */}
          <meta name="applicable-device" content="pc,mobile" />
          {/* mobile-agent tells Baiduspider-Mobile where the mobile URL is (same page — responsive) */}
          <meta name="mobile-agent" content="format=html5;url=https://rin.contact/" />
          {/* Chinese keywords — Baidu still uses the keywords meta for ranking signals */}
          <meta name="keywords" content="黄孙创宇, 黄孙 Rin, 黄孙创宇简历, 黄孙创宇数据分析师, Sunchuangyu Huang, Huang Sunchuangyu, HUANGSUNCHUANGYU, 南澳大利亚警察, 数据分析, 数据科学, 软件工程师, 澳大利亚" />

          {/* ── Favicons & PWA ── */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

          {/* ── Canonical & hreflang ── */}
          <link rel="canonical" href="https://rin.contact/" />
          <link rel="alternate" hrefLang="en-AU" href="https://rin.contact/" />
          <link rel="alternate" hrefLang="zh-Hans" href="https://rin.contact/" />
          <link rel="alternate" hrefLang="x-default" href="https://rin.contact/" />

          {/* ── rel="me" — cross-profile identity verification ── */}
          <link rel="me" href="https://github.com/rNLKJA" />
          <link rel="me" href="https://linkedin.com/in/sunchuangyuhuang" />
          <link rel="me" href="https://twitter.com/rNLKJA" />
          <link rel="me" href="https://www.instagram.com/chuangyu_hscy/" />
          <link rel="me" href="mailto:huang@rin.contact" />

          {/* ── OpenSearch — browser address-bar integration ── */}
          <link
            rel="search"
            type="application/opensearchdescription+xml"
            title="Rin Huang"
            href="/opensearch.xml"
          />

          {/* ── DNS prefetch — third-party image & API domains ── */}
          <link rel="dns-prefetch" href="https://yt3.googleusercontent.com" />
          <link rel="dns-prefetch" href="https://encrypted-tbn0.gstatic.com" />
          <link rel="dns-prefetch" href="https://media.licdn.com" />
          <link rel="dns-prefetch" href="https://s3-symbol-logo.tradingview.com" />
          <link rel="dns-prefetch" href="https://api.emailjs.com" />

          {/*
            Fonts are self-hosted at build time via next/font/google (lib/fonts.js).
            No external Google Fonts requests — eliminates the critical request chain.
          */}

          {/* ── JSON-LD structured data ── */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_PAGE_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PROJECTS_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(CREDENTIALS_SCHEMA) }} />
        </Head>

        {/*
          ┌──────────────────────────────────────────────────────────────────────┐
          │                                                                      │
          │   Hello, developer. You found the page source.                      │
          │                                                                      │
          │   Since you're reading this, you're probably the kind of person     │
          │   Rin would enjoy working with.                                     │
          │                                                                      │
          │   Stack: Next.js 14 · Tailwind CSS · EmailJS · Vercel              │
          │   Design: Nothing OS aesthetic — stark, minimal, monochromatic      │
          │   Every decision is intentional.                                    │
          │                                                                      │
          │   Easter eggs:                                                       │
          │     /fun/secret  →  Morse code reveal                               │
          │     /resume     →  interactive CLI                                  │
          │     /fun/coffee →  you know why                                     │
          │     ↑↑↓↓←→←→BA  →  try it on the homepage                         │
          │     curl rin.contact  →  a different view entirely                  │
          │                                                                      │
          │   Want to hire Rin?  →  rin.contact/hire-me                         │
          │                                                                      │
          └──────────────────────────────────────────────────────────────────────┘
        */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
