import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { useInView } from "@/hooks/useInView";

const PROJECTS = [
  {
    id: "signal",
    title: "Signal",
    subtitle: "Governance Layer for AI-Assisted Government Data",
    org: "Personal · Open Source",
    period: "Jun 2026 – Present",
    tag: "AI Governance",
    domain: ["AI / ML", "Open Source"],
    status: "Live · v1.14",
    stack: ["Python", "FastAPI", "LLM", "Modal", "Pydantic v2", "NumPy", "SciPy", "Docker", "GitHub Actions", "EU AI Act", "DTA v2.0"],
    summary:
      "A governed data product that puts AI governance on the request path — tamper-evident hash-chained audit logs, auto-generated DTA and EU AI Act compliance artefacts, and faithfulness-checked LLM narratives. The live reference implementation analyses South Australian and NYC crime statistics with Mann-Kendall trend tests, Sen-slope forecasting, and z-score anomaly review.",
    impact: "Live deployment · 128 tests · Tamper-evident audit + DTA v2.0 governance set · Open-core product",
    link: "https://github.com/rNLKJA/signal",
    linkLabel: "View Signal repository on GitHub",
    demo: "https://rnlkja--signal-api-api.modal.run",
    demoLabel: "Open the live Signal dashboard",
    caseStudy: "/projects/signal",
    featured: true,
    current: true,
  },
  {
    id: "ranking-radar",
    title: "Ranking Radar",
    subtitle: "University Rankings Visualisation & Open Dataset",
    org: "Personal · Open Source",
    period: "Jun 2026",
    tag: "Data Visualisation",
    domain: ["Open Source", "Research"],
    status: "Live",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "D3.js", "Node.js", "Data Pipeline", "FAIR Data", "Vercel"],
    summary:
      "Brings four ranking systems (QS, Times Higher Education, and two U.S. News rankings) together for 3,790 universities across 40 years. A no-hard-coding pipeline pulls each ranking live and recovers QS history from archived edition IDs, published as an open, FAIR-licensed dataset.",
    impact: "3,790 universities · 4 ranking systems · live-sourced FAIR open dataset",
    link: "https://qs-usnews-ranking-viz.vercel.app",
    linkText: "Visit live demo ↗",
    linkLabel: "Open Ranking Radar live demo",
  },
  {
    id: "sapol-epsb",
    title: "SAPOL EPSB Analytics",
    subtitle: "Integrity & Disciplinary Intelligence",
    org: "South Australia Police — Ethical & Professional Standards",
    period: "Mar 2026 – Present",
    tag: "Analytics",
    domain: "Government",
    status: "In production",
    stack: ["IAPro", "Blue Team", "Business Objects", "SQL", "Python", "Statistical Modelling", "ETL", "Data Modelling", "Power BI"],
    summary:
      "As ASO7 Senior Data Analyst in SAPOL's Ethical & Professional Standards Branch, leads the high-level analysis behind complaint resolution, governance and disciplinary processes — building IAPro reporting templates and dashboards, and maintaining SAPOL's core data as the authoritative single source for strategic, corporate and Parliamentary reporting.",
    impact: "Senior officer level · Authoritative single source of truth · Parliamentary & executive reporting",
    current: true,
  },
  {
    id: "mapiva",
    title: "Mapiva",
    subtitle: "Social Connection Mobile App",
    org: "Mapiva (Co-founded)",
    period: "Aug 2025 – Present",
    tag: "Mobile Dev",
    domain: "Startup",
    status: "MVP Jan 2027",
    stack: ["React Native", "Expo", "Product design", "GitHub Actions", "CI/CD", "PostgreSQL", "SQLite", "Django", "Rust"],
    summary:
      "Co-founded a mobile app to help people discover and connect with others. Full product ownership from architecture through implementation as Dev Lead.",
    impact: "Co-founder · Full product ownership · MVP ETA Jan 2027",
    current: true,
  },
  {
    id: "sa-address",
    title: "SA Address Generator",
    subtitle: "Socio-Economic & Remoteness-Based Address Tool",
    org: "Consumer and Business Services SA",
    period: "Aug 2025",
    tag: "Data Engineering",
    domain: "Government",
    status: "Delivered",
    stack: ["Python", "Mapbox API", "SEIFA", "ABS Remoteness", "GeoPandas", "Pandas", "Data Validation", "Faker"],
    summary:
      "Built an internal tool to generate validated real South Australian addresses based on socio-economic status (SEIFA indices) and remoteness classifications — filling a gap no public API could address. All outputs verified via Mapbox API.",
    impact: "Validated address generation · SEIFA + remoteness filtering · Internal QA tool",
    link: "https://github.com/rNLKJA/SA-Mock-Address-Generator",
    linkLabel: "View SA Address Generator repository on GitHub",
  },
  {
    id: "us-political",
    title: "US Political Data",
    subtitle: "Presidential Debate & Campaign Document Scraper",
    org: "Personal Research",
    period: "Aug 2025",
    tag: "Data Engineering",
    domain: ["Research", "Open Source"],
    status: "Open source",
    stack: ["Python", "Web scraping", "Multi-threading", "CSV pipeline", "BeautifulSoup", "Requests", "Pandas", "Rate limiting"],
    summary:
      "Scraped the UC Santa Barbara American Presidency Project to collect ~180 presidential debate transcripts and ~25,000 campaign documents, with multi-threaded processing, rate limiting, and full metadata extraction.",
    impact: "~25,000 documents collected · Decades of US political communication data",
    link: "https://github.com/rNLKJA/Political-Data-Collection-System",
    linkLabel: "View US Political Data Collection System repository on GitHub",
  },
  {
    id: "cbs",
    title: "CBS Intelligence",
    subtitle: "Regulatory Analytics from the Ground Up",
    org: "Attorney-General's Department SA",
    period: "Jan 2025 – Mar 2026",
    tag: "Analytics",
    domain: "Government",
    status: "Completed",
    // current: true,
    stack: ["Power BI", "Python", "GIS/ArcGIS", "Time series", "Regression", "SQL", "DAX", "Statistical Analysis", "DataSA", "ABS API"],
    summary:
      "Built the first intelligence analytics capability within the CBS Prevention Team — integrating ABS, SA Health, ACCC, and DataSA data into unified dashboards and GIS maps used by the Minister's Office.",
    impact: "Minister's Office reporting · SOPs institutionalised",
  },
  {
    id: "moodq",
    title: "MoodQ",
    subtitle: "Mental Health Mobile Application",
    org: "University of Melbourne — Psychiatry",
    period: "Aug 2024 – Feb 2026",
    tag: "Mobile Dev",
    domain: "Research",
    status: "Handed to production team",
    stack: ["Expo", "React Native", "AWS RDS", "LightSail", "Rust", "CI/CD", "PostgreSQL", "SQLite", "Django"],
    summary:
      "A clinician-facing and patient-facing mental health mobile app developed for the University of Melbourne's Psychiatry research group. Migrated from Uniapp to Expo React Native, reducing costs by ~$500/month and delivering a GDPR-compliant production application.",
    impact: "~$500/month cost saved · Production deployed · Cross-platform iOS + Android",
  },
  {
    id: "sapol",
    title: "SAPOL Intelligence",
    subtitle: "Crime Analytics & Operational Dashboards",
    org: "South Australia Police",
    period: "Jul 2024 – Dec 2024",
    tag: "Analytics",
    domain: "Government",
    status: "Completed",
    stack: ["Power BI", "Python", "SQL", "ArcGIS", "Time series", "Jupyter Notebook", "Research Software Engineering", "Power Query","IAPro"],
    summary:
      "Contributed to operational intelligence and crime analytics as an Intelligence and Coordination Officer. Built dashboards and analytical products supporting frontline policing, resource allocation, and command-level decision-making across South Australia.",
    impact: "Operational decision support · Crime pattern analytics · Cross-unit coordination",
  },
  {
    id: "wehi-flow",
    title: "Flow Cytometry Pipeline",
    subtitle: "Genomics & HPC Research Automation",
    org: "WEHI",
    period: "Feb 2024 – Jul 2024",
    tag: "Data Science",
    domain: ["Biotech", "Open Source"],
    status: "Open source contributor",
    stack: ["Python", "Cloud HPC", "celseq2", "Git", "Shiny R", "Nextflow", "Bioinformatics", "Bash", "Linux", "Data Pipelines"],
    summary:
      "Automated flow cytometry data analysis using cloud and HPC, developed test infrastructure for improved reproducibility, and contributed to the open-source celseq2 workflow toolkit.",
    impact: "Reduced manual processing · celseq2 open-source contribution",
  },
  {
    id: "factcheck",
    title: "Climate Fact-Checker",
    subtitle: "Automated Fact-Checking for Climate Claims",
    org: "University of Melbourne",
    period: "Apr 2024 – May 2024",
    tag: "NLP / ML",
    domain: "Climate Research",
    status: "Completed",
    stack: ["Python", "TF-IDF", "Transformers", "NLP", "Virtual Environment", "BERT", "Hugging Face", "PyTorch", "spaCy", "Scikit-learn"],
    summary:
      "Designed a two-stage automated fact-checking system for climate change claims — TF-IDF evidence retrieval followed by Transformer-based classification (SUPPORTS / REFUTES / NOT ENOUGH INFO / DISPUTED), outperforming LSTM baselines.",
    impact: "Transformer model outperformed LSTM · Scalable misinformation detection pipeline",
    link: "https://github.com/rNLKJA",
    linkLabel: "View Climate Fact-Checker on GitHub profile",
  },
  {
    id: "hex",
    title: "HEX",
    subtitle: "Digital Content Library Builder",
    org: "HEX",
    period: "Nov 2023 – Jun 2024",
    tag: "EdTech",
    domain: "Startup",
    stack: ["Content Design", "EdTech", "Market Research", "LLMs", "Instructional Design", "Curriculum Development", "Notion", "Interactive Content"],
    summary:
      "Built and refined interactive digital educational content aimed at bridging the gap between education and professional success. Conducted market research on leveraging advanced technologies to improve course engagement and learner outcomes for students across Australia and beyond.",
    impact: "80+ students supported · Improved course engagement through technology-driven content innovation",
    link: "https://www.startwithhex.com/",
    linkLabel: "Visit HEX company homepage",
    linkText: "Visit HEX homepage ↗",
  },
  {
    id: "selfdriving-db",
    title: "Self-Driving Databases",
    subtitle: "Workload-Driven Optimisation & Index Selection",
    org: "University of Melbourne",
    period: "Jun 2023 – Jul 2023",
    tag: "Research",
    domain: "AI / ML",
    status: "Completed",
    stack: ["Database systems", "ML optimisation", "Query planning", "PostgreSQL", "B-tree Indexing", "Cost Models", "Query Optimisation", "Literature Review"],
    summary:
      "Research project exploring AI/ML techniques for autonomous database management — covering workload-driven optimisation and automatic index selection to reduce DBA overhead and improve query performance.",
    impact: "Literature review · Autonomous DB optimisation frameworks",
    link: "https://github.com/rNLKJA",
    linkLabel: "View Self-Driving Databases research on GitHub profile",
  },
  {
    id: "social-cloud",
    title: "Social Media Analytics",
    subtitle: "Australia on the Cloud",
    org: "University of Melbourne",
    period: "Apr 2023 – Jun 2023",
    tag: "Cloud / Analytics",
    domain: "Cloud / HPC",
    status: "Completed",
    stack: ["Python", "Twitter API", "Mastodon API", "CouchDB", "AWS", "SUDO", "Pandas", "Folium", "Matplotlib", "Spatial Analysis", "REST APIs"],
    summary:
      "Harvested and analysed Twitter and Mastodon data alongside ABS SUDO spatial data to produce a Social Sense Dashboard illuminating Australian sentiment, social trends, and regional behavioural patterns.",
    impact: "Cross-platform social analytics · Spatial + social data fusion",
    link: "https://github.com/rNLKJA/Australia-Social-Media-Analytics-on-the-Cloud",
    linkLabel: "View Australia Social Media Analytics repository on GitHub",
  },
  {
    id: "twitter-hpc",
    title: "Twitter HPC Analysis",
    subtitle: "Big Data on SPARTAN",
    org: "University of Melbourne",
    period: "Mar 2023 – Apr 2023",
    tag: "HPC / Big Data",
    domain: "Cloud / HPC",
    status: "Completed",
    stack: ["Python", "MPI", "SPARTAN HPC", "Parallel computing", "Slurm"],
    summary:
      "Processed a large-scale Twitter dataset on the University of Melbourne's SPARTAN HPC cluster using MPI and Python, identifying tweet distribution across Australian cities and top contributors.",
    impact: "HPC parallel processing · City-level tweet distribution insights",
    link: "https://github.com/rNLKJA/Twitter-Data-Analysis-with-HPC",
    linkLabel: "View Twitter HPC Analysis repository on GitHub",
  },
  {
    id: "climate",
    title: "ENSO Climate Risk",
    subtitle: "Food Security & Conflict Forecasting",
    org: "CSIRO × University of Melbourne",
    period: "Feb 2023 – Nov 2023",
    tag: "Data Science",
    domain: "Climate Research",
    status: "Research published",
    stack: ["Python", "AR time series", "Rolling window", "Statistical modelling", "Research Software Engineering", "Jupyter Notebook"],
    summary:
      "Built AutoRegressive time series models with rolling window forecasting to quantify how El Niño-Southern Oscillation patterns amplify commodity price volatility and food security-induced conflict risk.",
    impact: "Climate → conflict risk insights · 10-month CSIRO research engagement",
  },
  {
    id: "cachex",
    title: "Cachex AI",
    subtitle: "Game-Playing AI Agent",
    org: "University of Melbourne",
    period: "Apr 2022 – Jun 2022",
    tag: "AI / Algorithms",
    domain: "AI / ML",
    status: "Completed",
    stack: ["Python", "A* pathfinding", "Heuristic search", "Game theory", "AI Agents", "Minimax", "Alpha-beta pruning", "Graph search"],
    summary:
      "Implemented AI agents for Cachex — a two-player connection game — covering heuristic A* search for the exploration phase and a competitive game agent using strategic anticipation and sabotage logic.",
    impact: "A* pathfinding · Competitive AI agent · Game theory application",
    link: "https://github.com/rNLKJA/Cachex-AI",
    linkLabel: "View Cachex AI repository on GitHub",
  },
  {
    id: "hplc",
    title: "HPLC Pipeline",
    subtitle: "Medical Research Automation",
    org: "CSL (CSL Behring)",
    period: "Feb 2022 – Jun 2022",
    tag: "Data Science",
    domain: "Biotech",
    status: "Delivered",
    stack: ["Python", "Scikit-learn", "T-SNE", "DBSCAN", "UMAP","Machine Learning","Research Software Engineering","Jupyter Notebook"],
    summary:
      "Built a Python automation script to streamline HPLC experiment result processing, and applied unsupervised clustering methods to uncover hidden patterns in complex medical research datasets.",
    impact: "Reduced HPLC processing time · Improved data quality confidence",
  },
  {
    id: "pcrm",
    title: "PCRM",
    subtitle: "Personal Customer Relationship Management",
    org: "University of Melbourne",
    period: "Aug 2021 – Nov 2021",
    tag: "Full Stack",
    domain: "Research",
    status: "Completed",
    stack: ["Node.js", "React.js", "Express.js", "MongoDB", "HTML/CSS", "REST API", "JWT Auth", "Mongoose", "Agile"],
    summary:
      "Collaborative full-stack CRM system built as the COMP30022 IT Project — managing customer interactions and data with a responsive React frontend, Express REST API, and MongoDB backend.",
    impact: "Full-stack delivery · Team project · Production-grade architecture",
    link: "https://github.com/rNLKJA/Personal-Customer-Relation-Management-PCRM",
    linkLabel: "View PCRM repository on GitHub",
  },
  {
    id: "nyc-taxi",
    title: "NYC Taxi Analysis",
    subtitle: "Quantitative Analysis with Spark",
    org: "University of Melbourne",
    period: "Jul 2021 – Aug 2021",
    tag: "Data Science",
    domain: "Research",
    status: "Completed",
    stack: ["Python", "Apache Spark", "Machine Learning", "Clustering", "Pandas", "PySpark","Research Software Engineering","Jupyter Notebook"],
    summary:
      "Analysed 2014–2017 New York City Yellow Taxi data using Apache Spark for big data processing, applying linear modelling to predict trip costs and clustering to identify traffic hotspots.",
    impact: "Big data Spark pipeline · Traffic hotspot clustering · Trip cost modelling",
  },
  {
    id: "portfolio",
    title: "rin.contact",
    subtitle: "Personal Portfolio — v5",
    org: "Personal Project",
    period: "2020 – Present",
    tag: "Web Dev",
    domain: "Personal",
    status: "v5 in development",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel", "JavaScript", "SEO", "Schema.org", "JSON-LD", "CSS Animations", "GitHub Actions"],
    summary:
      "Five major iterations of a personal website — currently rebuilt in v5 with a Nothing OS-inspired minimal design language. A living record of technical and professional development since 2020.",
    impact: "5 major versions · rin.contact · Open source",
    link: "https://github.com/rNLKJA",
    linkLabel: "View rin.contact portfolio on GitHub",
    current: true,
  },
];

const DOMAIN_COLORS = {
  "Government":      { color: "#2563EB", bg: "#EFF6FF" }, // blue-600  4.53:1 ✓
  "Climate Research":{ color: "#0F766E", bg: "#F0FDFA" }, // teal-700  6.18:1 ✓
  "Biotech":         { color: "#7C3AED", bg: "#F5F3FF" }, // violet-700 6.26:1 ✓
  "Startup":         { color: "#C2410C", bg: "#FFF7ED" }, // orange-700 7.24:1 ✓
  "Research":        { color: "#15803D", bg: "#F0FDF4" }, // green-700  7.55:1 ✓
  "AI / ML":         { color: "#CC0000", bg: "#FFF1F1" }, // dark red   5.53:1 ✓
  "Cloud / HPC":     { color: "#B45309", bg: "#FFFBEB" }, // amber-700  5.25:1 ✓
  "Open Source":     { color: "#0E7490", bg: "#ECFEFF" }, // cyan-700   5.87:1 ✓
  "Personal":        { color: "#595959", bg: "#F5F5F5" }, // neutral    5.05:1 ✓
};

const DOMAINS = [
  "All",
  "Government",
  "Climate Research",
  "Biotech",
  "Startup",
  "Research",
  "AI / ML",
  "Cloud / HPC",
  "Open Source",
  "Personal",
];

function CountUp({ target, duration = 900, started }) {
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

function ProjectDetail({ project }) {
  const { t } = useI18n();
  return (
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-[#0A0A0A]">
      <div className="md:col-span-2 space-y-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-1 flex items-center gap-3 flex-wrap">
            {project.title}
            {project.current && (
              <span className="border border-[#FF3C3C] px-3 py-0.5 text-[10px] tracking-widest uppercase text-[#FF3C3C] rounded-full">
                {t("projects.active")}
              </span>
            )}
          </h3>
          <p className="text-xs text-[#595959] dark:text-[#AAAAAA] tracking-wide">{project.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-[#595959] dark:text-[#AAAAAA]">
          <span>{project.org}</span>
          <span>·</span>
          <span>{project.period}</span>
        </div>
        <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">{project.summary}</p>
        <div className="mt-3 p-4 bg-[#FFF5F5] dark:bg-[#1A1111] rounded-lg">
          <span className="inline-block mb-2 px-2 py-0.5 bg-[#FF3C3C] text-white text-[9px] tracking-widest uppercase font-mono rounded-full">{t("projects.impact")}</span>
          <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed font-medium">
            {project.impact}
          </p>
        </div>
        {(project.link || project.demo || project.caseStudy) && (
          <div className="flex flex-wrap gap-2">
            {project.caseStudy && (
              <Link
                href={project.caseStudy}
                aria-label={`Read the ${project.title} case study`}
                className="inline-flex items-center gap-2 border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-white dark:text-[#0A0A0A] rounded-full hover:bg-black dark:hover:bg-white transition-colors duration-200"
              >
                Read case study →
              </Link>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={project.demoLabel || `Open the live ${project.title} demo`}
                className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
              >
                Live demo ↗
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={project.linkLabel || `View ${project.title} on GitHub`}
                className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                {project.linkText || (project.link?.includes("github.com") ? `${t("projects.viewOnGithub")} ↗` : `${t("projects.viewOnGithub")} ↗`)}
              </a>
            )}
          </div>
        )}
        {/* Share buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://rin.contact/projects")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A] px-3 py-1.5 text-[10px] tracking-widest uppercase text-[#7A7A7A] hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors duration-200"
            aria-label={`Share ${project.title} on LinkedIn`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            {t("projects.share")}
          </a>
          <a
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(`Check out "${project.title}" — ${project.summary.split(".")[0]}.`)}&url=${encodeURIComponent("https://rin.contact/projects")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A] px-3 py-1.5 text-[10px] tracking-widest uppercase text-[#7A7A7A] hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
            aria-label={`Tweet ${project.title}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {t("projects.post")}
          </a>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-2">{t("projects.stack")}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full
                           cursor-default hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-1">{t("projects.status")}</p>
          <p className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">{project.status}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-1">{t("projects.domain")}</p>
          <p className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
            {Array.isArray(project.domain) ? project.domain.join(" · ") : project.domain}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeaturedSpotlight({ project }) {
  if (!project) return null;
  const primaryDomain = Array.isArray(project.domain) ? project.domain[0] : project.domain;
  const dc = DOMAIN_COLORS[primaryDomain];
  return (
    <div className="mb-12 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
      <div className="px-6 md:px-8 py-3 border-b border-[#E0E0E0] dark:border-[#3D3D3D] bg-[#FAFAFA] dark:bg-[#141414] flex items-center justify-between gap-4">
        <span className="text-[10px] tracking-widest uppercase text-[#FF3C3C] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] animate-pulse" aria-hidden="true" />
          Featured — Flagship
        </span>
        <span className="text-[10px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A] truncate">{project.status}</span>
      </div>
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">{project.title}</h3>
            <p className="text-sm text-[#595959] dark:text-[#AAAAAA]">{project.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-[#595959] dark:text-[#AAAAAA]">
            <span>{project.org}</span>
            <span>·</span>
            <span>{project.period}</span>
          </div>
          <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">{project.summary}</p>
          <div className="p-4 bg-[#FFF5F5] dark:bg-[#1A1111] rounded-lg">
            <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed font-medium">{project.impact}</p>
          </div>
          {(project.link || project.demo || project.caseStudy) && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.caseStudy && (
                <Link
                  href={project.caseStudy}
                  aria-label={`Read the ${project.title} case study`}
                  className="inline-flex items-center gap-2 border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] px-4 py-1.5 text-xs tracking-widest uppercase
                             text-white dark:text-[#0A0A0A] rounded-full hover:bg-black dark:hover:bg-white transition-colors duration-200"
                >
                  Read case study →
                </Link>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={project.demoLabel || `Open the live ${project.title} demo`}
                  className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase
                             text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
                >
                  Live demo ↗
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={project.linkLabel || `View ${project.title} on GitHub`}
                  className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase
                             text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {project.linkText || "View on GitHub ↗"}
                </a>
              )}
            </div>
          )}
        </div>
        <div className="space-y-5">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-2">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full
                             cursor-default hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] mb-1">Domain</p>
            <p className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA]" style={dc ? { color: dc.color } : undefined}>
              {Array.isArray(project.domain) ? project.domain.join(" · ") : project.domain}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView();
  const [activeFilter, setActiveFilter] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");
  const [countStarted, setCountStarted] = useState(false);

  // Start count-up as soon as section header enters view
  useEffect(() => {
    if (inView) setCountStarted(true);
  }, [inView]);

  const isAllView = activeFilter === "All";

  const domainMatch = (p, filter) =>
    Array.isArray(p.domain) ? p.domain.includes(filter) : p.domain === filter;

  const domainStr = (p) =>
    Array.isArray(p.domain) ? p.domain.join(" ").toLowerCase() : p.domain.toLowerCase();

  const featured = PROJECTS.find((p) => p.featured) ?? null;
  // The featured project leads in the spotlight above; keep it out of the
  // default list to avoid a duplicate. When searching, show everything.
  const showSpotlight = isAllView && search === "";

  const filtered = isAllView
    ? PROJECTS.filter((p) =>
        search === ""
          ? !p.featured
          : p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
            p.tag.toLowerCase().includes(search.toLowerCase()) ||
            domainStr(p).includes(search.toLowerCase())
      )
    : PROJECTS.filter((p) => domainMatch(p, activeFilter));

  const activeProject = filtered.find((p) => p.id === openId) ?? null;

  const handleSelect = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-24" aria-label="Projects">
      {/* Section header */}
      <div
        ref={ref}
        className={`mb-12 transition-all duration-600 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">{t("projects.sectionLabel")}</p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
          <CountUp target={PROJECTS.length} started={countStarted} /> {t("projects.heading")}
        </h2>
        {/* Wisr-style wavy accent */}
        <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-4">
          <path d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
                stroke="#E0E0E0" className="dark:stroke-[#3D3D3D]" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        <p className="text-base font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-xl leading-relaxed">
          {t("projects.headingDesc")}
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mt-8" role="group" aria-label="Filter projects">
          {DOMAINS.map((d) => {
            const dc = DOMAIN_COLORS[d];
            const isActive = activeFilter === d;
            const activeStyle = dc
              ? { borderColor: dc.color, backgroundColor: dc.color, color: "#fff" }
              : { borderColor: "#FF3C3C", backgroundColor: "#FF3C3C", color: "#fff" };
            const idleStyle = { borderColor: "#E0E0E0", color: "#595959" };
            return (
              <button
                key={d}
                onClick={() => { setActiveFilter(d); setOpenId(null); setSearch(""); }}
                className="border px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200 flex items-center gap-1 rounded-full"
                style={isActive ? activeStyle : idleStyle}
                onMouseEnter={(e) => {
                  if (isActive) return;
                  if (dc) { e.currentTarget.style.borderColor = dc.color; e.currentTarget.style.color = dc.color; }
                  else { e.currentTarget.style.borderColor = "#FF3C3C"; e.currentTarget.style.color = "#FF3C3C"; }
                }}
                onMouseLeave={(e) => {
                  if (isActive) return;
                  e.currentTarget.style.borderColor = "#E0E0E0";
                  e.currentTarget.style.color = "#595959";
                }}
                aria-pressed={isActive}
              >
                {dc && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: isActive ? "#fff" : dc.color }}
                  />
                )}
                {d === "All" ? t("projects.allProjects") : d}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Featured flagship spotlight ── */}
      {showSpotlight && <FeaturedSpotlight project={featured} />}

      {/* ── ALL view: searchable list ── */}
      {isAllView && (
        <div className="w-full">
          {/* Search */}
          <div className="mb-4 flex items-center border border-[#E0E0E0] dark:border-[#3D3D3D] focus-within:border-[#FF3C3C] focus-within:outline-none transition-colors duration-200">
            <span className="pl-4 text-[#6B6B6B] dark:text-[#9A9A9A] text-sm select-none">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenId(null); }}
              placeholder={t("projects.searchPlaceholder")}
              className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-[#6B6B6B] dark:placeholder:text-[#9A9A9A]"
              aria-label={t("projects.searchPlaceholder")}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="pr-4 text-[#6B6B6B] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200 text-xs"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* List */}
          <div className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
            {filtered.length === 0 && (
              <p className="py-8 text-sm text-[#6B6B6B] dark:text-[#9A9A9A] text-center">No projects match &ldquo;{search}&rdquo;</p>
            )}
            {filtered.map((project, i) => {
              const isOpen = openId === project.id;
              const primaryDomain = Array.isArray(project.domain) ? project.domain[0] : project.domain;
              const dc = DOMAIN_COLORS[primaryDomain];
              return (
                <div
                  key={project.id}
                  className="border-b border-[#E0E0E0] dark:border-[#3D3D3D] group/row transition-colors duration-150 hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] relative"
                >
                  {/* Domain colour left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-200 opacity-0 group-hover/row:opacity-100"
                    style={{ backgroundColor: dc?.color ?? "#FF3C3C" }}
                    aria-hidden="true"
                  />
                  <button
                    onClick={() => handleSelect(project.id)}
                    className="w-full flex items-center gap-4 py-3.5 text-left group pl-2"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[10px] text-[#6B6B6B] dark:text-[#9A9A9A] tabular-nums w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 items-center">
                      <span className="text-sm font-medium flex items-center gap-2">
                        {project.title}
                        {project.current && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0" />}
                      </span>
                      <span className="text-xs text-[#595959] dark:text-[#AAAAAA] truncate hidden md:block">{project.subtitle}</span>
                      <span className="hidden md:flex items-center gap-3 justify-end">
                        <span
                          className="text-[10px] tracking-widest uppercase border px-2.5 py-0.5 rounded-full"
                          style={dc ? { borderColor: dc.color, color: dc.color } : { borderColor: "#595959", color: "#595959" }}
                        >
                          {project.tag}
                        </span>
                        <span className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">{project.period}</span>
                      </span>
                    </span>
                    <span className={`text-[#6B6B6B] transition-transform duration-200 flex-shrink-0 text-sm ${isOpen ? "rotate-45 text-[#FF3C3C]" : "group-hover:text-[#FF3C3C]"}`}>
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "600px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.4s ease, opacity 0.25s ease",
                    }}
                  >
                    <div className="border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
                      <ProjectDetail project={project} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {(() => { const shown = filtered.length + (showSpotlight ? 1 : 0); return (
          <p className="mt-3 text-xs text-[#6B6B6B] dark:text-[#9A9A9A]">{shown} project{shown !== 1 ? "s" : ""}</p>
          ); })()}
        </div>
      )}

      {/* ── Domain-filtered: folder tabs (desktop) ── */}
      {!isAllView && (
        <>
          <div className="hidden md:block w-full">
            <div className="flex items-stretch overflow-x-auto gap-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="tablist">
              {filtered.map((project, i) => {
                const isActive = openId === project.id;
                return (
                  <button
                    key={project.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelect(project.id)}
                    className={`
                      group relative flex-shrink-0 flex flex-col justify-center
                      px-4 py-3 min-w-[110px] max-w-[160px] text-left
                      border-t border-l border-r transition-colors duration-200
                      ${isActive
                        ? "bg-[#FF3C3C] text-white border-[#FF3C3C]"
                        : "bg-white dark:bg-[#0A0A0A] text-[#3D3D3D] dark:text-[#AAAAAA] border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-[#FF3C3C] hover:text-[#FF3C3C]"
                      }
                    `}
                    style={{ borderRadius: "4px 4px 0 0" }}
                  >
                    <span className={`text-[10px] tabular-nums mb-1 ${isActive ? "text-white opacity-60" : "text-[#6B6B6B] dark:text-[#9A9A9A]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-xs font-medium leading-tight truncate">{project.title}</span>
                      {project.current && (
                        <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-white opacity-50" : "bg-[#FF3C3C]"}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div
              className={`border transition-all duration-400 overflow-hidden ${activeProject ? "border-[#FF3C3C]" : "border-[#E0E0E0] dark:border-[#3D3D3D]"}`}
              style={{ maxHeight: activeProject ? "600px" : "52px", transition: "max-height 0.4s ease, border-color 0.2s ease" }}
            >
              {!activeProject && (
                <div className="px-6 py-4 flex items-center gap-3 text-xs text-[#6B6B6B] dark:text-[#9A9A9A] tracking-wide select-none">
                  <span>↑</span>
                  <span>Select a folder to view project details</span>
                </div>
              )}
              {activeProject && <ProjectDetail project={activeProject} />}
            </div>
          </div>

          {/* Mobile accordion */}
          <div className="md:hidden border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
            {filtered.map((project, i) => {
              const isOpen = openId === project.id;
              return (
                <div key={project.id} className="border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
                  <button
                    onClick={() => handleSelect(project.id)}
                    className="w-full flex items-center gap-4 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs text-[#6B6B6B] dark:text-[#9A9A9A] tabular-nums w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="text-sm font-medium block truncate">{project.title}</span>
                      <span className="text-xs text-[#595959] dark:text-[#AAAAAA]">{project.tag}</span>
                    </span>
                    {project.current && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0" />}
                    <span className={`text-[#595959] dark:text-[#AAAAAA] transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{ maxHeight: isOpen ? "800px" : "0px", opacity: isOpen ? 1 : 0, transition: "max-height 0.4s ease, opacity 0.25s ease" }}
                  >
                    <div className="pb-6 pl-9 space-y-4">
                      <p className="text-xs text-[#595959] dark:text-[#AAAAAA]">{project.org} · {project.period}</p>
                      <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">{project.summary}</p>
                      <div className="p-3 bg-[#FFF5F5] dark:bg-[#1A1111] rounded-lg">
                        <span className="inline-block mb-1.5 px-2 py-0.5 bg-[#FF3C3C] text-white text-[9px] tracking-widest uppercase font-mono rounded-full">{t("projects.impact")}</span>
                        <p className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed font-medium">{project.impact}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((t) => (
                          <span key={t} className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200">{t}</span>
                        ))}
                      </div>
                      {(project.link || project.demo || project.caseStudy) && (
                        <div className="flex flex-wrap gap-2">
                          {project.caseStudy && (
                            <Link href={project.caseStudy}
                               aria-label={`Read the ${project.title} case study`}
                               className="inline-flex items-center gap-2 border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] px-4 py-1.5 text-xs tracking-widest uppercase text-white dark:text-[#0A0A0A] rounded-full hover:bg-black dark:hover:bg-white transition-colors duration-200">
                              Read case study →
                            </Link>
                          )}
                          {project.demo && (
                            <a href={project.demo} target="_blank" rel="noreferrer"
                               aria-label={project.demoLabel || `Open the live ${project.title} demo`}
                               className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200">
                              Live demo ↗
                            </a>
                          )}
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer"
                               aria-label={project.linkLabel || `View ${project.title} on GitHub`}
                               className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200">
                              {project.linkText || (project.link?.includes("github.com") ? `${t("projects.viewOnGithub")} ↗` : `${t("projects.viewOnGithub")} ↗`)}
                            </a>
                          )}
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://rin.contact/projects")}`}
                          target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A] px-2.5 py-1 text-[10px] tracking-widest uppercase text-[#7A7A7A] hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors"
                          aria-label="Share on LinkedIn"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a
                          href={`https://x.com/intent/tweet?text=${encodeURIComponent(`Check out "${project.title}" — ${project.summary.split(".")[0]}.`)}&url=${encodeURIComponent("https://rin.contact/projects")}`}
                          target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A] px-2.5 py-1 text-[10px] tracking-widest uppercase text-[#7A7A7A] hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors"
                          aria-label="Share on X"
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
