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
 * `tour` is a deployed demo's guided tour (its /tour page), set only while that
 * page is live. A coursework card gets its tour from the lab instead.
 * `caseStudyKind: "impact"` labels the case-study button Impact, for a page
 * that says what the work involved rather than how a system was built.
 *
 * Link labels for screen readers come from the locale templates
 * (projects.*Label), which start with the visible button text.
 *
 * `zh` holds a card's Chinese title and subtitle where the site has them. The
 * cards on /projects stay in English, but the page index (⌘K palette and
 * /info/site-map, scripts/page-index.mjs) lists them in the visitor's
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
    // no repository link on purpose. The case study describes how it works, and
    // the demo is a concept sandbox on made-up members, not the real app.
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
    demo: "/projects/order-system-sandbox#demo",
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
    // A generic concept demo on synthetic data. No SAPOL data or system.
    caseStudy: "/projects/professional-standards-reporting",
    demo: "/projects/professional-standards-reporting#demo",
    current: true,
  },
  {
    // A 2025 explainer and notebook, revived in 2026. The stack is the 2025 one,
    // so /skills dates it to the original work. The public repo holds both.
    id: "em-algorithm",
    title: "EM Algorithm, Explained",
    subtitle: "An Interactive Expectation-Maximisation Lab",
    zh: { title: "EM 算法图解", subtitle: "可交互的期望最大化算法实验室" },
    org: "Personal · Open Source",
    period: "Sep 2025",
    tag: "Statistics",
    domain: ["AI / ML", "Open Source"],
    status: "Revived in 2026",
    stack: [
      "Python",
      "NumPy",
      "SciPy",
      "Matplotlib",
      "Jupyter Notebook",
      "Gaussian mixture models",
    ],
    summary:
      "A maths-complete explainer of the expectation-maximisation algorithm that I wrote in September 2025, framed around sparse movie ratings, with a notebook that fits a two-component Gaussian mixture from scratch. In 2026 I rebuilt it as a web lab where you can step through the worked example by hand, run EM on the notebook's 200 ratings, and trigger label switching, stopping too early, local maxima and variance collapse. The TypeScript port reproduces the notebook's printed results, and the slips in my own hand-worked numbers are corrected beside the originals.",
    impact:
      "Notebook results reproduced to within 10⁻⁶ · Four pitfalls you can trigger · Corrections shown beside the originals",
    link: "https://github.com/rNLKJA/EM-Algorithm",
    demo: "https://em-algorithm-lab.vercel.app",
  },
  {
    // Built on public releases from the gambling regulator (CBS). Not affiliated
    // with CBS or Rin's employer, neutral on gambling, and wherever it is
    // described it carries the Gambling Help Line.
    id: "sa-gaming-machines",
    title: "SA Gaming Machine Statistics",
    subtitle: "Public Gaming-Machine Figures, FY 2009/10 to FY 2024/25",
    zh: { title: "南澳博彩机统计", subtitle: "2009/10 至 2024/25 财年的公开博彩机数据" },
    org: "Personal · Open Source",
    period: "Sep 2025",
    tag: "Data Visualisation",
    domain: "Open Source",
    status: "Revived in 2026",
    stack: ["Power BI", "Excel", "Public data"],
    summary:
      "South Australia publishes its gaming-machine statistics as separate PDF releases. In September 2025 I transcribed about 110 of them, from FY 2009/10 to FY 2024/25, into one workbook with a Power BI report. In 2026 I rebuilt it as a website on statewide revenue and tax, council areas, licences and manufacturers, with every figure checked against its PDF and the gaps in the series shown. It is a personal project on public releases from Consumer and Business Services, not affiliated with CBS, the Government of South Australia or my employer, and it takes no position for or against gambling. If gambling is affecting you or someone close to you, call the Gambling Help Line on 1800 858 858.",
    impact:
      "4,406 of 4,409 figures matched to their PDF · Yearly totals corrected · Gambling Help Line 1800 858 858",
    link: "https://github.com/rNLKJA/South-Australia-Gaming-Machine-Statistics",
    demo: "https://sa-gaming-machine-stats.vercel.app",
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
    // A concept demo on made-up people and events, not the app.
    caseStudy: "/projects/map-first-discovery",
    demo: "/projects/map-first-discovery#demo",
    current: true,
  },
  {
    // A personal project (the repo README says so), not CBS work. The stack is
    // the 2025 CLI's, whose data source was not recorded: ABS remoteness and
    // SEIFA arrived with the 2026 revival, so they stay out of the stack.
    id: "sa-address",
    title: "SA Address Generator",
    subtitle: "Mock South Australian Addresses for Software Testing",
    zh: { title: "南澳模拟地址生成器", subtitle: "用于软件测试的南澳模拟地址" },
    org: "Personal · Open Source",
    period: "Aug 2025",
    tag: "Data Engineering",
    domain: "Open Source",
    status: "Revived in 2026",
    stack: ["Python", "Pandas", "Mapbox API"],
    summary:
      "A personal command-line tool I wrote in August 2025 that makes mock South Australian addresses for software testing, each with a suburb, postcode, council and remoteness level, and looks up real addresses through the Mapbox API. Porting it to the web in 2026 showed that its remoteness and socio-economic weights were never applied and its socio-economic column was empty. The revival keeps that uniform mode as built, adds the promised weighting from ABS remoteness and SEIFA data, and checks each sample against its target mix. Every output is labelled as synthetic test data.",
    impact:
      "20 of 20 recorded Python runs replayed exactly · Sample mix checked against its target · Labelled synthetic test data",
    link: "https://github.com/rNLKJA/SA-Mock-Address-Generator",
    demo: "https://sa-mock-address-generator.vercel.app",
  },
  {
    id: "us-political",
    title: "US Political Data",
    subtitle: "Presidential Debate & Campaign Document Scraper",
    zh: { title: "美国政治文本数据", subtitle: "总统辩论与竞选文件采集" },
    org: "Personal Research",
    period: "Aug 2025",
    tag: "Data Engineering",
    domain: ["Research", "Open Source"],
    status: "Revived in 2026",
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
      "Two notebooks I wrote in August 2025 that collect public pages from The American Presidency Project at UC Santa Barbara, with a thread pool, retries and resumable runs: 7,556 campaign documents from 2016 to 2024 and 179 debate transcripts from 1960 to 2024. In 2026 I revived the collection as Campaign Text Lab, a descriptive reading room that reads the original CSV files without scraping again, with distinctive-word comparisons, debate talk shares and term timelines. Every speaker goes through the same code, and nothing is scored or predicted.",
    impact:
      "7,556 campaign documents · 179 debate transcripts, 1960 to 2024 · Descriptive only, nothing predicted",
    link: "https://github.com/rNLKJA/Political-Data-Collection-System",
    demo: "https://campaign-text-lab.vercel.app",
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
    // A concept demo on synthetic areas. No CBS data.
    caseStudy: "/projects/regulatory-analytics-map",
    demo: "/projects/regulatory-analytics-map#demo",
  },
  {
    // From GenAI-Lec-Gen, a private repo: the 2024 prototype's database holds
    // private tutoring notes, so no repository link. The demo uses an openly
    // licensed OpenStax textbook. The stack is the 2024 prototype's.
    id: "lecture-revision-lab",
    title: "Lecture Revision Lab",
    subtitle: "Revision Material That Cites Its Sources",
    zh: { title: "讲义复习实验室", subtitle: "每一条都注明出处的复习材料" },
    org: "Personal",
    period: "Oct 2024",
    tag: "GenAI / RAG",
    domain: ["AI / ML", "Personal"],
    status: "Revived in 2026",
    stack: ["Python", "RAG", "DSPy", "OpenAI API", "Sentence Transformers", "SQLite"],
    summary:
      "A retrieval-augmented generation prototype I built in October 2024 to turn course notes into revision material, with DSPy, sentence-transformer embeddings and SQLite. In 2026 I rebuilt it to run in the browser. It finds the passages that answer a question and drafts revision agendas, worked examples and practice questions that cite those passages, and nothing is exported until a person has reviewed each item. Generation runs on the visitor's own API key, and the demo uses an openly licensed OpenStax statistics textbook instead of my private notes.",
    impact:
      "Retrieval matches the 2024 Python on 10 of 10 sample queries · Every item cites its passages · Reviewed before export",
    demo: "https://lecture-revision-lab.vercel.app",
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
    // A concept demo on a made-up module and synthetic learners.
    caseStudy: "/projects/hex-micro-course",
    demo: "/projects/hex-micro-course#demo",
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
    zh: { title: "ENSO 气候风险", subtitle: "粮食安全与冲突预测" },
    org: "CSIRO × University of Melbourne",
    period: "Feb 2023 – Nov 2023",
    tag: "Data Science",
    domain: "Climate Research",
    // A clean-room rebuild on public data only (World Bank and NOAA) is drafted
    // in a private repo and waits for approval before it is published, so the
    // card has no demo or link yet. The rebuild is also listed under Planned
    // and in progress (lib/pipeline-data.js).
    status: "Public-data clean-room version drafted · Awaiting approval",
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
    // Private repo: it keeps the tutorial notebooks, so no repository link. The
    // projects follow a public tutorial series, credited here, and are not
    // original ideas. The stack is the 2022 one.
    id: "ml-gallery",
    title: "40 Reps, Re-checked",
    subtitle: "A Machine Learning Notebook Gallery, Audited",
    zh: { title: "40 Reps, Re-checked", subtitle: "机器学习笔记本合集与复查" },
    org: "Personal · Study log",
    period: "Nov 2022 – Dec 2022",
    tag: "Data Science",
    domain: ["AI / ML", "Personal"],
    status: "Revived in 2026",
    stack: [
      "Python",
      "pandas",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "NLTK",
      "LightGBM",
      "Plotly",
      "Jupyter Notebook",
    ],
    summary:
      "Forty projects I worked through for practice in late 2022, one notebook each, following Aman Kharwal's 180 Data Science and Machine Learning Projects with Python series on thecleverprogrammer.com. The project ideas and methods come from his tutorials. In 2026 I turned them into a study log that records which notebooks ran, which broke and what each printed, plus eight audits where a little more rigour changes the conclusion, such as stock forecasts that lose to a flat forecast once the split respects time.",
    impact:
      "40 notebooks logged, 33 ran end to end · 8 audits against baselines and time-ordered splits · Tutorial source credited",
    demo: "https://ds-ml-tutorial-audit.vercel.app",
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
    // Private repos (the 2022 originals and the 2026 revival), so no repository
    // link. The stack is the 2022 one. The revival has a guided tour.
    id: "project-cradle",
    title: "Project Cradle",
    subtitle: "Invite-Only Member Hub",
    zh: { title: "Project Cradle", subtitle: "邀请制会员社区" },
    org: "Personal · with Jiahong Zheng",
    period: "Jan 2022 – Mar 2022",
    tag: "Full Stack",
    domain: "Personal",
    status: "Revived in 2026",
    stack: ["TypeScript", "Express.js", "MongoDB", "Mongoose", "Next.js", "Chakra UI", "JWT Auth"],
    summary:
      "A small community you can only join with an invite code from a member, where each member holds at most two unused codes. Jiahong Zheng and I built it in early 2022 to learn a full stack, with an Express and MongoDB API behind a Next.js front end. The database is long gone, so in 2026 I revived it as one Next.js app on SQLite (Turso), with the 2022 invite rules ported and checked by parity tests, an invite tree, demo logins and a guided tour.",
    impact:
      "Pair project with Jiahong Zheng · 2022 invite rules ported with parity tests · Demo logins and a guided tour",
    demo: "https://project-cradle.vercel.app",
    tour: "https://project-cradle.vercel.app/tour",
  },
  {
    // The MAST30034 industry capstone with CSL (2021 Semester 2), dated by the
    // team's meeting minutes (31 Aug to 20 Oct 2021) and commits. The live demo
    // and case study come from its lab, HPLC QC Lab, which runs on synthetic
    // data only. The repo is private, so no repository link.
    id: "hplc",
    coursework: "hplc-qc-lab",
    title: "HPLC Pipeline",
    subtitle: "Lab-Data Quality, an Industry Capstone with CSL",
    zh: { title: "HPLC 数据管线", subtitle: "与 CSL 合作的实验室数据质量毕业项目" },
    org: "University of Melbourne × CSL",
    period: "Aug 2021 – Oct 2021",
    tag: "Data Science",
    domain: "Biotech",
    status: "Completed",
    stack: [
      "Python",
      "pandas",
      "Scikit-learn",
      "PCA",
      "t-SNE",
      "UMAP",
      "K-Means",
      "DBSCAN",
      "Control charts",
      "FAIR Data",
      "Jupyter Notebook",
    ],
    summary:
      "This was our MAST30034 industry capstone with CSL. I worked in Group 07 (Team 4399) with Yuchen (Cynthia) Cai, Rongshun Li, Zhiliang (Tommy) Tang and Quzihan (Martin) Wu, and was the team's Scrum Master. We parsed free-text HPLC lab-result spreadsheets into tidy records in the spirit of the FAIR principles, rebuilt control charts for four assays to find out-of-control runs, and compared PCA, t-SNE and UMAP with K-Means and DBSCAN as an aid for spotting unusual runs. I revived it in 2026 as HPLC QC Lab, which runs the team's methods on synthetic data, with no CSL data, code or documents.",
    impact:
      "Team of five · About 99.7% of lab-result records parsed in 2021 · Revived on synthetic data only",
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
