/**
 * Projects data: the single source of truth for /projects (ProjectsSection) and
 * the project evidence on /skills. Moved out of components/sections/ProjectsSection.jsx
 * so plain Node scripts (scripts/check-career-data.mjs) can import it without JSX.
 *
 * `coursework` names the revived lab in lib/coursework-data.js that a card grew
 * out of. /projects then adds the lab's live demo, its guided tour (when it has
 * one) and a case-study link to the lab's card on /projects/coursework. It must
 * agree with PROJECT_MERGE in lib/skills-taxonomy.js (npm run check:career).
 * Such a card links GitHub only to the lab's own repository, and only when the
 * lab may link it (its repoUrl), so the card and its case study never disagree.
 *
 * `demo` is the card's Live demo. Every card has one, from the card itself or
 * from its coursework lab, apart from the Forage card, whose page is an impact
 * write-up instead. An on-site demo is a path to the section that holds it
 * (/projects/<slug>#demo) and opens in the same tab. Other demos open in a new one.
 * `caseStudyKind: "impact"` labels the case-study button Impact, for a page
 * that says what the work involved rather than how a system was built.
 *
 * Link labels for screen readers come from the locale templates
 * (projects.*Label), which start with the visible button text.
 *
 * `zh` holds a card's Chinese title and subtitle where the site has them. The
 * cards on /projects stay in English, but the page index (⌘K palette and
 * /info/site-map, scripts/page-index.mjs) lists case studies in the visitor's
 * language.
 */

export const PROJECTS = [
  {
    id: "signal",
    title: "Signal",
    subtitle: "Governance Layer for AI-Assisted Government Data",
    zh: { subtitle: "面向 AI 辅助政府数据的治理层" },
    org: "Personal · Open Source",
    period: "Jun 2026 – Present",
    tag: "AI Governance",
    domain: ["AI / ML", "Open Source"],
    status: "Live · v1.14",
    stack: [
      "Python",
      "FastAPI",
      "LLM",
      "Modal",
      "Pydantic v2",
      "NumPy",
      "SciPy",
      "Docker",
      "GitHub Actions",
      "EU AI Act",
      "DTA v2.0",
    ],
    summary:
      "A governed data product that puts AI governance on the request path — tamper-evident hash-chained audit logs, auto-generated DTA and EU AI Act compliance artefacts, and faithfulness-checked LLM narratives. The live reference implementation analyses South Australian and NYC crime statistics with Mann-Kendall trend tests, Sen-slope forecasting, and z-score anomaly review.",
    impact:
      "Live deployment · 128 tests · Tamper-evident audit + DTA v2.0 governance set · Open-core product",
    link: "https://github.com/rNLKJA/signal",
    demo: "https://rnlkja--signal-api-api.modal.run",
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
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "D3.js",
      "Node.js",
      "Data Pipeline",
      "FAIR Data",
      "Vercel",
    ],
    summary:
      "Brings four ranking systems (QS, Times Higher Education, and two U.S. News rankings) together for 3,790 universities across 40 years. A no-hard-coding pipeline pulls each ranking live and recovers QS history from archived edition IDs, published as an open, FAIR-licensed dataset.",
    impact: "3,790 universities · 4 ranking systems · live-sourced FAIR open dataset",
    demo: "https://qs-usnews-ranking-viz.vercel.app",
  },
  {
    // Private repo and private production system holding real customer data:
    // no link or demo on purpose. The case study describes how it works only.
    id: "order-system",
    title: "Meal-Prep Studio Order System",
    subtitle: "Members, Prepaid Cards, Orders & Finance App",
    zh: { title: "订餐会员管理系统", subtitle: "会员、餐卡、订餐和财务管理应用" },
    org: "Family Business · Private",
    period: "Apr 2026 – Present",
    tag: "Full Stack",
    domain: "Personal",
    status: "In production · Private",
    stack: [
      "TypeScript",
      "Expo",
      "React Native",
      "Hono",
      "Turso (libSQL)",
      "Drizzle ORM",
      "Zod",
      "argon2id + JWT",
      "Vitest",
      "Turborepo",
      "Vercel",
      "GitHub Actions",
    ],
    summary:
      "Built as sole developer for my mum's meal-prep studio: one system for members, prepaid meal cards, daily orders, kitchen and delivery, and finance. A single Expo codebase builds for iOS, Android and the web, on a Hono API on Vercel with Turso (libSQL) and Drizzle. It was built to replace group-chat sign-ups that were tallied by hand and re-keyed into an Excel workbook.",
    impact:
      "Sole developer · In production since April 2026 · One codebase for iOS, Android and web",
    caseStudy: "/projects/order-system",
    current: true,
  },
  {
    id: "sapol-epsb",
    title: "SAPOL EPSB Analytics",
    subtitle: "Professional Standards Reporting & Tooling",
    org: "South Australia Police, Ethical and Professional Standards Branch",
    period: "Mar 2026 – Present",
    tag: "Analytics",
    domain: "Government",
    status: "In production",
    stack: ["Python", "Power BI", "SQL Server", "FastAPI", "Vue", "Statistical modelling"],
    summary:
      "As ASO7 Senior Data Analyst in the Intelligence & Probity Unit of SAPOL's Ethical and Professional Standards Branch, produces the quarterly Use of Force and Vehicle Pursuit statistical reports, led an end-to-end review of the complaint administration workflow, and analysed a financial year of expiation notices. Also built a Python client and web console for the complaint-management system APIs, covering more than 1,100 endpoints.",
    impact:
      "Quarterly executive reporting · Admin workflow review · 1,100+ complaints API endpoints in one client",
    current: true,
  },
  {
    id: "mapiva",
    title: "Mapiva",
    subtitle: "Map-First Social Discovery App",
    org: "Mapiva (Co-founded)",
    period: "Aug 2025 – Present",
    tag: "Mobile Dev",
    domain: "Startup",
    status: "Beta 2027",
    stack: ["React Native", "Expo", "Django", "Rust", "PostgreSQL", "GitHub Actions"],
    summary:
      "Co-founded a Melbourne startup building a map-first app for discovering people and events nearby. As Dev Lead, owns the technical architecture (an Expo React Native client on a Django, Rust and PostgreSQL backend, shipped through GitHub Actions) and leads code review for a part-time engineering team.",
    impact: "Co-founder · Dev Lead · Beta planned for early 2027",
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
    stack: [
      "Python",
      "Mapbox API",
      "SEIFA",
      "ABS Remoteness",
      "GeoPandas",
      "Pandas",
      "Data Validation",
      "Faker",
    ],
    summary:
      "Built an internal tool to generate validated real South Australian addresses based on socio-economic status (SEIFA indices) and remoteness classifications — filling a gap no public API could address. All outputs verified via Mapbox API.",
    impact: "Validated address generation · SEIFA + remoteness filtering · Internal QA tool",
    link: "https://github.com/rNLKJA/SA-Mock-Address-Generator",
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
    stack: [
      "Python",
      "Web scraping",
      "Multi-threading",
      "CSV pipeline",
      "BeautifulSoup",
      "Requests",
      "Pandas",
      "Rate limiting",
    ],
    summary:
      "Scraped the UC Santa Barbara American Presidency Project to collect ~180 presidential debate transcripts and ~25,000 campaign documents, with multi-threaded processing, rate limiting, and full metadata extraction.",
    impact: "~25,000 documents collected · Decades of US political communication data",
    link: "https://github.com/rNLKJA/Political-Data-Collection-System",
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
    stack: [
      "Power BI",
      "Python",
      "GIS/ArcGIS",
      "Time series",
      "Regression",
      "SQL",
      "DAX",
      "Statistical Analysis",
      "DataSA",
      "ABS API",
    ],
    summary:
      "Built the first intelligence analytics capability within the CBS Prevention Team — integrating ABS, SA Health, ACCC, and DataSA data into unified dashboards and GIS maps used by the Minister's Office.",
    impact: "Minister's Office reporting · SOPs institutionalised",
  },
  {
    id: "moodq",
    title: "Moodist",
    subtitle: "Mental Health Mobile Application",
    zh: { subtitle: "心理健康手机应用" },
    org: "University of Melbourne — Psychiatry",
    period: "Aug 2024 – Feb 2026",
    tag: "Mobile Dev",
    domain: "Research",
    status: "Handed to production team",
    stack: ["Expo", "React Native", "Flask", "Python", "AWS RDS", "LightSail", "CI/CD"],
    summary:
      "A clinician-facing and patient-facing mental health app for the University of Melbourne's Department of Psychiatry, built as sole developer. Rebuilt it from Uniapp to Expo React Native with a clinician dashboard on a Flask backend, kept hosting under $500 a month by running each service in its own Docker container on AWS LightSail, and kept it GDPR-aligned before handing it to a professional team for production.",
    impact: "Sole developer · Hosting under $500/month · Cross-platform iOS + Android",
    caseStudy: "/projects/moodist",
    demo: "/projects/moodist#daybook",
  },
  {
    id: "wehi-flow",
    title: "Genomics Metadata Multiplexing",
    subtitle: "Sample-sheet tooling for plate-based single-cell sequencing",
    zh: { subtitle: "为孔板式单细胞测序整理样本表的工具" },
    org: "WEHI",
    period: "Feb 2024 – Jul 2024",
    tag: "Research Software",
    domain: ["Biotech", "Research"],
    status: "Completed",
    stack: [
      "R",
      "Shiny",
      "Python",
      "reticulate",
      "pandas",
      "fcsparser",
      "Bash",
      "Git",
      "Milton HPC (built to run on)",
    ],
    summary:
      "Worked on Genomics Metadata Multiplexing (GMM), an R Shiny tool that builds CEL-Seq2 sample sheets for plate-based single-cell sequencing. It merges flow-cytometry sort metadata from FACS index-sort files with the plate layout and primer indexes, so nobody has to stitch them together by hand. Wrote the Shiny side of the app, added test inputs with expected outputs, and contributed a column clean-up step to WEHIGenomicsRnD/celseq-sample-sheet-generator.",
    impact:
      "One sample sheet instead of a hand merge · Contribution merged into celseq-sample-sheet-generator",
    caseStudy: "/projects/wehi-genomics",
    demo: "/projects/wehi-genomics#gmm-demo",
  },
  {
    id: "factcheck",
    coursework: "climate-claim-checker",
    title: "Climate Fact-Checker",
    subtitle: "Automated Fact-Checking for Climate Claims",
    org: "University of Melbourne",
    period: "Apr 2024 – May 2024",
    tag: "NLP / ML",
    domain: "Climate Research",
    status: "Completed",
    // The 2024 stack, as the lab records it: pretrained models and embeddings
    // were not allowed, so the Transformer was trained from scratch.
    stack: ["Python", "PyTorch", "NLTK", "Scikit-learn", "pandas", "TF-IDF", "Google Colab"],
    summary:
      "A two-stage fact-checker for climate-science claims, built for COMP90042 with Wei Zhao and Xuan Wang. TF-IDF retrieval pulls evidence from about 1.2 million Wikipedia passages, then a Transformer trained from scratch labels each claim as supported, refuted, disputed or not enough information. I worked on the system design, the preprocessing and the TF-IDF retrieval, and Wei built the classifiers. I revived it in 2026, with the original pipeline re-run as it was and the weak results shown.",
    impact:
      "TF-IDF retrieval over 1.19 million passages · Reported evidence score reproduced in 2026 · Weak spots stated plainly",
    link: "https://github.com/rNLKJA/Automated-Fact-Checking-System-for-Climate-Change-Claims",
  },
  {
    id: "hex",
    title: "HEX",
    subtitle: "Digital Content Library Builder",
    org: "HEX",
    period: "Nov 2023 – Jun 2024",
    tag: "EdTech",
    domain: "Startup",
    stack: [
      "Content Design",
      "EdTech",
      "Market Research",
      "LLMs",
      "Instructional Design",
      "Curriculum Development",
      "Notion",
      "Interactive Content",
    ],
    summary:
      "Built and refined interactive digital educational content aimed at bridging the gap between education and professional success. Conducted market research on leveraging advanced technologies to improve course engagement and learner outcomes for students across Australia and beyond.",
    impact:
      "80+ students supported · Improved course engagement through technology-driven content innovation",
    link: "https://www.startwithhex.com/",
    linkText: "Visit HEX homepage",
  },
  {
    id: "selfdriving-db",
    coursework: "self-driving-db-lab",
    title: "Self-Driving Databases",
    subtitle: "Workload-Driven Optimisation & Index Selection",
    org: "University of Melbourne",
    period: "Jun 2023 – Jul 2023",
    tag: "Research",
    domain: "AI / ML",
    status: "Completed",
    stack: [
      "Database systems",
      "ML optimisation",
      "Query planning",
      "PostgreSQL",
      "B-tree Indexing",
      "Cost Models",
      "Query Optimisation",
      "Literature Review",
    ],
    summary:
      "A survey of self-driving databases for COMP90050, written by Group 40 with Xiaoyi Liu, Runqiu Fei and Qingxuan Yang. Runqiu and I covered index selection, from heuristics to bandits, and Xiaoyi and Qingxuan covered workload-driven optimisation. I revived it in 2026 as Self-Driving DB Lab, where the index advisors the survey described race on a live SQLite database in the browser.",
    impact: "Group 40 survey · Five index advisors implemented in 2026 · Revived as a browser lab",
    link: "https://github.com/rNLKJA/Unimelb-Master-2023-COMP90050",
  },
  {
    id: "social-cloud",
    coursework: "social-sense",
    title: "Social Media Analytics",
    subtitle: "Australia on the Cloud",
    org: "University of Melbourne",
    period: "Apr 2023 – Jun 2023",
    tag: "Cloud / Analytics",
    domain: "Cloud / HPC",
    status: "Completed",
    stack: [
      "Python",
      "Twitter API",
      "Mastodon API",
      "CouchDB",
      "Melbourne Research Cloud",
      "SUDO",
      "Pandas",
      "Folium",
      "Matplotlib",
      "Spatial Analysis",
      "REST APIs",
    ],
    summary:
      "Harvested and analysed Twitter and Mastodon data alongside ABS SUDO spatial data to produce a Social Sense Dashboard illuminating Australian sentiment, social trends, and regional behavioural patterns.",
    impact: "Cross-platform social analytics · Spatial + social data fusion",
    link: "https://github.com/rNLKJA/Australia-Social-Media-Analytics-on-the-Cloud",
  },
  {
    id: "twitter-hpc",
    coursework: "spartan-tweet-cruncher",
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
  },
  {
    id: "climate",
    title: "ENSO Climate Risk",
    subtitle: "Food Security & Conflict Forecasting",
    org: "CSIRO × University of Melbourne",
    period: "Feb 2023 – Nov 2023",
    tag: "Data Science",
    domain: "Climate Research",
    status: "Completed",
    stack: [
      "Python",
      "AR time series",
      "Rolling window",
      "Statistical modelling",
      "Research Software Engineering",
      "Jupyter Notebook",
    ],
    summary:
      "Built AutoRegressive time series models with rolling window forecasting to quantify how El Niño-Southern Oscillation patterns amplify commodity price volatility and food security-induced conflict risk.",
    impact: "Climate → conflict risk insights · 10-month CSIRO research engagement",
  },
  {
    id: "cachex",
    coursework: "cachex-arena",
    title: "Cachex AI",
    subtitle: "Game-Playing AI Agent",
    org: "University of Melbourne",
    period: "Apr 2022 – Jun 2022",
    tag: "AI / Algorithms",
    domain: "AI / ML",
    status: "Completed",
    stack: [
      "Python",
      "A* pathfinding",
      "Heuristic search",
      "Game theory",
      "Game-playing agents",
      "Minimax",
      "Alpha-beta pruning",
      "Graph search",
    ],
    summary:
      "A pair project with Wei Zhao as team _4399 for COMP30024. Cachex is a two-player connection game like Hex, with captures and a steal rule. We wrote an A* solver for the search task and a minimax agent with alpha-beta pruning to play the full game. I revived it in 2026 as Cachex Arena, where you can play the agent or run a seeded tournament.",
    impact:
      "A* solver · Minimax agent with alpha-beta pruning · Pair project, revived as a playable arena",
    link: "https://github.com/rNLKJA/Cachex-AI",
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
    stack: [
      "Python",
      "Scikit-learn",
      "T-SNE",
      "DBSCAN",
      "UMAP",
      "Machine Learning",
      "Research Software Engineering",
      "Jupyter Notebook",
    ],
    summary:
      "Built a Python automation script to streamline HPLC experiment result processing, and applied unsupervised clustering methods to uncover hidden patterns in complex medical research datasets.",
    impact: "Reduced HPLC processing time · Improved data quality confidence",
  },
  {
    id: "pcrm",
    coursework: "personal-crm",
    title: "PCRM",
    subtitle: "Personal Customer Relationship Management",
    org: "University of Melbourne",
    period: "Aug 2021 – Nov 2021",
    tag: "Full Stack",
    domain: "Research",
    status: "Completed",
    stack: [
      "Node.js",
      "React.js",
      "Express.js",
      "MongoDB",
      "HTML/CSS",
      "REST API",
      "JWT Auth",
      "Mongoose",
      "Agile",
    ],
    summary:
      "A mobile-first personal CRM built by Team 4399 for the COMP30022 IT Project, with Bin Liang, Hongji (Harrison) Huang, Wei Zhao and Yixiao Tian. It has a React front end, an Express REST API and a MongoDB database. I was the team's Scrum Master and worked on the contacts, meeting records and map screens. I rebuilt it in 2026 as 4399 CRM, a single Next.js app with a guest sandbox.",
    impact: "Five-person Scrum team · Full-stack web app · Revived in 2026 as 4399 CRM",
    link: "https://github.com/rNLKJA/Personal-Customer-Relation-Management-PCRM",
  },
  {
    id: "nyc-taxi",
    coursework: "nyc-taxi-2019",
    title: "NYC Taxi Analysis",
    subtitle: "Quantitative Analysis with Spark",
    org: "University of Melbourne",
    period: "Jul 2021 – Aug 2021",
    tag: "Data Science",
    domain: "Research",
    status: "Completed",
    stack: [
      "Python",
      "Apache Spark",
      "PySpark",
      "Spark MLlib",
      "Regression",
      "Pandas",
      "Folium",
      "Jupyter Notebook",
    ],
    summary:
      "My individual project for MAST30034 Applied Data Science. I cleaned every 2019 New York yellow-cab trip in PySpark, more than 84 million records, and fitted an elastic-net regression to estimate trip times. I revived it in 2026 as NYC Taxi 2019, with zone maps, weather, events and collisions, and the 2021 regression running in the browser.",
    impact:
      "84 million trips cleaned in PySpark · Elastic-net regression of trip times · Revived as a live demo",
    link: "https://github.com/rNLKJA/Unimelb-undergraduate-2021-MAST30034-Project-1",
  },
  {
    id: "portfolio",
    title: "rin.contact",
    subtitle: "Personal Portfolio, v5",
    org: "Personal Project",
    period: "2020 – Present",
    tag: "Web Dev",
    domain: "Personal",
    status: "v5 in development",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Vercel",
      "JavaScript",
      "SEO",
      "Schema.org",
      "JSON-LD",
      "CSS Animations",
      "GitHub Actions",
    ],
    summary:
      "Five major iterations of a personal website — currently rebuilt in v5 with a Nothing OS-inspired minimal design language. A living record of technical and professional development since 2020.",
    impact: "5 major versions · rin.contact · Open source",
    // The site is its own demo.
    demo: "/",
    link: "https://github.com/rNLKJA",
    current: true,
  },
  {
    // Twelve Forage job simulations grouped into one low-priority card, kept last.
    // The repos are private, so the card has no repository link. It is the one
    // card without a live demo: its page says what each simulation involved and
    // what I delivered, and the button reads Impact (Rin, 9 Oct 2026).
    id: "virtual-internships",
    title: "Virtual internships (Forage)",
    subtitle: "Twelve Company-Designed Job Simulations",
    zh: { title: "虚拟实习（Forage）", subtitle: "十二个由企业设计的工作模拟" },
    org: "Forage · KPMG, BCG, British Airways, PwC and others",
    period: "Oct 2022 – Aug 2023",
    tag: "Data Science",
    domain: "Personal",
    status: "Completed",
    stack: [
      "Python",
      "pandas",
      "scikit-learn",
      "SHAP",
      "SQL",
      "R",
      "Tableau",
      "Power BI",
      "Excel",
      "PowerPoint",
    ],
    summary:
      "I completed twelve self-paced job simulations on Forage, each designed by the company that set the brief. The companies were KPMG, BCG, British Airways, Quantium, Tata, Cognizant, GE Aviation, Accenture, Red Bull, PwC (two) and Standard Bank. The work covered customer analytics, churn and booking models, dashboards and data joins.",
    impact: "12 job simulations · Oct 2022 – Aug 2023 · analytics, ML and visualisation",
    caseStudy: "/projects/virtual-internships",
    caseStudyKind: "impact",
  },
];

/**
 * The anchor a card answers to on /projects (#<id>), or null. Cards with their
 * own case-study page link there instead, and the featured card sits in the
 * spotlight rather than the list. The page index links every other card here,
 * and ProjectsSection opens the card the hash names.
 */
export function projectAnchor(project) {
  return project.caseStudy || project.featured ? null : project.id;
}
