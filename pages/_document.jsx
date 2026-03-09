import Document, { Head, Html, Main, NextScript } from "next/document";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://rin.contact/#person",
  name: "Sunchuangyu (Rin) Huang",
  alternateName: ["Rin Huang", "黄孙创宇", "Sunchuangyu Huang"],
  givenName: "Sunchuangyu",
  additionalName: "Rin",
  familyName: "Huang",
  url: "https://rin.contact",
  image: "https://rin.contact/images/meta-image.png",
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
  description:
    "Sunchuangyu (Rin) Huang — also known as 黄孙创宇 — is a Senior Data Analyst at South Australia Police, Research Software Engineer, and Full-Stack Developer specialising in data science, strategic intelligence, and continuous improvement.",
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rin.contact/#website",
  url: "https://rin.contact",
  name: "Rin Huang — Portfolio",
  description:
    "Personal portfolio of Sunchuangyu (Rin) Huang — Senior Data Analyst, Research Software Engineer, and Full-Stack Developer based in Adelaide, Australia.",
  author: { "@id": "https://rin.contact/#person" },
  inLanguage: "en-AU",
  copyrightYear: 2026,
  datePublished: "2024-01-01",
  dateModified: "2026-03-09",
};

const PROFILE_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://rin.contact/#profilepage",
  url: "https://rin.contact",
  name: "Rin Huang — Portfolio",
  datePublished: "2024-01-01",
  dateModified: "2026-03-09",
  mainEntity: { "@id": "https://rin.contact/#person" },
  about: { "@id": "https://rin.contact/#person" },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#hero-bio"],
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
      dateCreated: "2026-02",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "IELTS General Training — Band 8",
      credentialCategory: "LanguageAssessment",
      recognizedBy: { "@type": "Organization", name: "IELTS Official" },
      dateCreated: "2026-02",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Credentialed Community Language — Mandarin",
      credentialCategory: "LanguageCredential",
      recognizedBy: { "@type": "Organization", name: "NAATI" },
      dateCreated: "2025-12",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Microsoft", url: "https://microsoft.com" },
      dateCreated: "2024-07",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Neo4j Certified Professional",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Neo4j", url: "https://neo4j.com" },
      dateCreated: "2025-08",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Neo4j Graph Data Science Certification",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Neo4j", url: "https://neo4j.com" },
      dateCreated: "2025-08",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google UX Design Specialisation",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2025-12",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Business Intelligence Specialisation",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2025-12",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Project Management Specialisation",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2025-12",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google IT Automation with Python",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2022-05",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Data Analytics Specialisation",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2021-06",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Open-Source Intelligence (OSINT) Fundamentals",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "TCM Security" },
      dateCreated: "2025-10",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Analytics Individual Qualification (GAIQ)",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Google", url: "https://google.com" },
      dateCreated: "2024-05",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Advanced SQL for Data Scientists",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "LinkedIn Learning" },
      dateCreated: "2024-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Atlassian Agile Project Management Professional Certificate",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Atlassian", url: "https://atlassian.com" },
      dateCreated: "2024-04",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Career Essentials in GitHub Professional Certificate",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "GitHub", url: "https://github.com" },
      dateCreated: "2024-01",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Melbourne Plus: Innovation",
      credentialCategory: "microcredential",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Melbourne", url: "https://www.unimelb.edu.au" },
      dateCreated: "2024-05",
      holder: { "@id": "https://rin.contact/#person" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Melbourne Plus: People Leadership",
      credentialCategory: "microcredential",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Melbourne", url: "https://www.unimelb.edu.au" },
      dateCreated: "2024-10",
      holder: { "@id": "https://rin.contact/#person" },
    },
  ],
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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

          {/* ── Theme ── */}
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="color-scheme" content="light" />

          {/* ── Authorship ── */}
          <meta name="author" content="Sunchuangyu (Rin) Huang" />
          <meta name="google-site-verification" content="uQJ5D6LcYS7OR9_3FJ9XiOezDuy2XJz9uNMoyxXTWoM" />
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

          {/* ── Favicons & PWA ── */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* ── Canonical & hreflang ── */}
          <link rel="canonical" href="https://rin.contact/" />
          <link rel="alternate" hrefLang="en-AU" href="https://rin.contact/" />
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
          <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
          <link rel="dns-prefetch" href="https://s3-symbol-logo.tradingview.com" />
          <link rel="dns-prefetch" href="https://api.emailjs.com" />
          <link rel="preconnect" href="https://media.licdn.com" />
          <link rel="preconnect" href="https://yt3.googleusercontent.com" />

          {/* ── Font preconnect ── */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          {/*
            Three-font system (Wisr × Nothing):
            • Bitcount Prop Double — pixel display, hero h1 brand name only
            • Playfair Display    — editorial serif, all section h2/h3 headings
            • DM Sans             — humanist sans, body, nav, buttons, labels
          */}
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@300..600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@300..600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
            rel="stylesheet"
          />

          {/* ── JSON-LD structured data ── */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFILE_PAGE_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PROJECTS_SCHEMA) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(CREDENTIALS_SCHEMA) }} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
