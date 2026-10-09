/**
 * The skills taxonomy behind /skills ("Everything I've learned"): ten areas, the
 * skills in each, and the curated maps that turn the site's existing data
 * (projects, roles, coursework, notes, credentials, posts) into evidence.
 *
 * All taxonomy copy lives here, in en-AU and zh-Hans, and stays out of the
 * locale JSON, because I18nContext loads both dictionaries on every page.
 * Proper nouns (tools, libraries, acronyms) stay in English in both locales.
 *
 * Site rules (lib/skills-check.js fails the build if they break):
 * - Skills are evidenced, never rated: no levels, scores or percentages.
 * - SAPOL internal system names are dropped (DENY_TOKENS) and never shown.
 * - The clinical app from the psychiatry role is named only as Moodist.
 *
 * To add a skill: add it to SKILLS with en and zh labels and the normalised
 * aliases (lower case) that the data's stacks use for it, then run
 * `npm run check:career`. It fails on any stack token that resolves to nothing.
 */

// ── Areas, in display order ─────────────────────────────────────────────────
export const DOMAINS = [
  {
    id: "statistics",
    en: {
      label: "Statistics & inference",
      short: "Statistics",
      blurb:
        "I estimate, test and model with data, from first-year hypothesis tests to Bayesian models.",
    },
    zh: {
      label: "统计与推断",
      short: "统计",
      blurb: "用数据做估计、检验和建模，从大一的假设检验一直到贝叶斯模型。",
    },
  },
  {
    id: "maths",
    en: {
      label: "Mathematics & algorithms",
      short: "Maths",
      blurb:
        "This is the maths underneath: linear algebra, calculus, optimisation and the algorithms that put them to work.",
    },
    zh: {
      label: "数学与算法",
      short: "数学",
      blurb: "底层的数学：线性代数、微积分、最优化，以及把它们用起来的算法。",
    },
  },
  {
    id: "ml",
    en: {
      label: "Machine learning & AI",
      short: "ML & AI",
      blurb: "These are models that learn from data, and the habits I use to check that they work.",
    },
    zh: {
      label: "机器学习与人工智能",
      short: "机器学习",
      blurb: "从数据中学习的模型，以及我用来检查模型是否可靠的方法。",
    },
  },
  {
    id: "genai",
    en: {
      label: "GenAI, evaluation & governance",
      short: "GenAI",
      blurb:
        "I build with large language models, check their answers against the data and keep an audit trail.",
    },
    zh: {
      label: "生成式 AI、评测与治理",
      short: "生成式 AI",
      blurb: "用大语言模型做开发，对照数据核对它的回答，并保留审计记录。",
    },
  },
  {
    id: "data",
    en: {
      label: "Data engineering & cloud",
      short: "Data & cloud",
      blurb:
        "I get data in, store it, move it and compute on it, on a laptop, a cluster or the cloud.",
    },
    zh: {
      label: "数据工程与云",
      short: "数据与云",
      blurb: "把数据接进来、存好、搬动，并在笔记本电脑、集群或云上完成计算。",
    },
  },
  {
    id: "analytics",
    en: {
      label: "Analytics, BI & intelligence",
      short: "Analytics",
      blurb: "I turn data into reports, maps and intelligence that people can act on.",
    },
    zh: {
      label: "分析、商业智能与情报",
      short: "分析",
      blurb: "把数据做成别人能据此行动的报告、地图和情报。",
    },
  },
  {
    id: "software",
    en: {
      label: "Programming & software",
      short: "Software",
      blurb: "These are the languages, frameworks and practices I use to build tools and apps.",
    },
    zh: {
      label: "编程与软件开发",
      short: "软件",
      blurb: "我用来做工具和应用的编程语言、框架和工程习惯。",
    },
  },
  {
    id: "research",
    en: {
      label: "Research methods & reproducibility",
      short: "Research",
      blurb: "I frame questions, design studies and make results that other people can rerun.",
    },
    zh: {
      label: "研究方法与可复现性",
      short: "研究",
      blurb: "提出问题、设计研究，并让别人能重新跑出同样的结果。",
    },
  },
  {
    id: "communication",
    en: {
      label: "Communication, leadership & teaching",
      short: "Communication",
      blurb: "I explain findings, teach, lead teams and keep work moving.",
    },
    zh: {
      label: "沟通、领导与教学",
      short: "沟通",
      blurb: "讲清楚发现、教学、带团队，让工作持续推进。",
    },
  },
  {
    id: "breadth",
    en: {
      label: "Languages & breadth",
      short: "Languages & breadth",
      blurb: "These are the languages I work in, and what I studied and trained in outside data.",
    },
    zh: {
      label: "语言与通识",
      short: "语言与通识",
      blurb: "我工作中使用的语言，以及数据以外修过的课和参加过的培训。",
    },
  },
];

// ── Skills ──────────────────────────────────────────────────────────────────
// k(id, domain, en, zh, aliases). Aliases are normalised stack tokens (lower
// case, single spaces) that resolve to this skill; see resolveToken() in
// lib/skills-atlas.js for the normalisation.
const k = (id, domain, en, zh, aliases = []) => ({ id, domain, en, zh, aliases });

export const SKILLS = [
  // ── statistics ────────────────────────────────────────────────────────────
  k(
    "statistical-modelling",
    "statistics",
    "Statistical modelling and GLMs",
    "统计建模与广义线性模型",
    ["statistical modelling", "statistical analysis", "geepack", "nnet"]
  ),
  k("regression", "statistics", "Regression", "回归分析", ["regression", "glmnet"]),
  k("hypothesis-testing", "statistics", "Hypothesis testing", "假设检验", ["hypothesis testing"]),
  k(
    "interval-estimation",
    "statistics",
    "Confidence intervals and the bootstrap",
    "置信区间与 bootstrap",
    []
  ),
  k("bayesian-inference", "statistics", "Bayesian inference and MCMC", "贝叶斯推断与 MCMC", [
    "bayesian inference",
    "mvtnorm",
    "coda",
  ]),
  k("simulation", "statistics", "Simulation and Monte Carlo", "模拟与蒙特卡洛方法", []),
  k("time-series", "statistics", "Time series and forecasting", "时间序列与预测", [
    "time series",
    "ar time series",
    "rolling window",
    "rolling-window forecasting",
    "statsmodels",
    "pmdarima",
  ]),
  k("multivariate", "statistics", "Multivariate statistics", "多元统计", [
    "multivariate analysis",
    "pls",
  ]),
  k("spatial-statistics", "statistics", "Spatial statistics", "空间统计", []),
  k("survival-analysis", "statistics", "Survival analysis", "生存分析", []),
  k("experiment-design", "statistics", "Experiment and A/B test design", "实验与 A/B 测试设计", []),
  k("causal-inference", "statistics", "Causal inference", "因果推断", []),
  k("probability", "statistics", "Probability", "概率论", []),
  k("sampling", "statistics", "Sampling and survey methods", "抽样与调查方法", []),
  k("statistical-process-control", "statistics", "Statistical process control", "统计过程控制", [
    "control charts",
  ]),
  k("minitab", "statistics", "Minitab", "Minitab", ["minitab"]),

  // ── maths ─────────────────────────────────────────────────────────────────
  k("linear-algebra", "maths", "Linear algebra", "线性代数", []),
  k("calculus-optimisation", "maths", "Calculus and optimisation", "微积分与最优化", []),
  k(
    "operations-research",
    "maths",
    "Operations research and linear programming",
    "运筹学与线性规划",
    ["highs"]
  ),
  k("algorithms-data-structures", "maths", "Algorithms and data structures", "算法与数据结构", []),
  k("matlab", "maths", "MATLAB", "MATLAB", ["matlab"]),

  // ── ml ────────────────────────────────────────────────────────────────────
  k("statistical-learning", "ml", "Statistical learning", "统计学习", [
    "machine learning",
    "ml optimisation",
  ]),
  k("classification", "ml", "Classification", "分类", ["rpart", "e1071"]),
  k("model-evaluation", "ml", "Model evaluation and validation", "模型评估与验证", []),
  k("clustering", "ml", "Clustering", "聚类", ["clustering", "dbscan", "k-means"]),
  k("dimensionality-reduction", "ml", "Dimensionality reduction", "降维", [
    "t-sne",
    "umap",
    "umap-learn",
    "umap-js",
    "pca",
  ]),
  k("feature-engineering", "ml", "Feature engineering", "特征工程", []),
  k("ensemble-methods", "ml", "Ensemble methods", "集成方法", ["randomforest", "lightgbm"]),
  k("deep-learning", "ml", "Deep learning and transformers", "深度学习与 Transformer", [
    "transformers",
    "tensorflow",
    "keras",
  ]),
  k("nlp", "ml", "Natural language processing", "自然语言处理", ["nlp", "nltk", "spacy"]),
  k("information-retrieval", "ml", "Information retrieval", "信息检索", []),
  k("search-agents", "ml", "Search and game-playing agents", "搜索与博弈智能体", [
    "a* pathfinding",
    "heuristic search",
    "graph search",
    "minimax",
    "alpha-beta pruning",
    "game theory",
    "game-playing agents",
  ]),
  k(
    "reinforcement-learning",
    "ml",
    "Reinforcement learning and bandits",
    "强化学习与多臂老虎机",
    []
  ),
  k("recommender-systems", "ml", "Recommender systems", "推荐系统", []),
  k("anomaly-detection", "ml", "Anomaly detection", "异常检测", []),
  k("mlops", "ml", "MLOps and model monitoring", "MLOps 与模型监控", []),
  k("scikit-learn", "ml", "scikit-learn", "scikit-learn", ["scikit-learn", "imbalanced-learn"]),
  k("pytorch", "ml", "PyTorch", "PyTorch", ["pytorch"]),

  // ── genai ─────────────────────────────────────────────────────────────────
  k("llm-apps", "genai", "Building with LLMs", "基于大语言模型的开发", [
    "llm",
    "llms",
    "anthropic sdk",
    "openai api",
    "dspy",
  ]),
  k("llm-evaluation", "genai", "LLM evaluation and grounding", "LLM 评测与事实核查", []),
  k("ai-agents", "genai", "AI agents and tool use", "AI 智能体与工具调用", []),
  k("ai-governance", "genai", "AI governance and audit trails", "AI 治理与审计追踪", [
    "eu ai act",
    "dta",
  ]),
  k("explainable-ai", "genai", "Explainability and model documentation", "可解释性与模型文档", [
    "shap",
  ]),
  k("fairness", "genai", "Fairness and bias", "公平性与偏见", []),
  k("data-governance", "genai", "Data governance and privacy", "数据治理与隐私", [
    "data-sharing mous",
  ]),
  k("ai-productivity", "genai", "AI-assisted development", "AI 辅助开发", []),

  // ── data ──────────────────────────────────────────────────────────────────
  k("sql", "data", "SQL", "SQL", ["sql", "node-sql-parser"]),
  k("postgresql", "data", "PostgreSQL", "PostgreSQL", ["postgresql"]),
  k("sql-server", "data", "SQL Server", "SQL Server", ["sql server"]),
  k("sqlite", "data", "SQLite and libSQL", "SQLite 与 libSQL", ["sqlite", "sql.js", "turso"]),
  k("duckdb", "data", "DuckDB", "DuckDB", ["duckdb"]),
  k("mongodb", "data", "MongoDB", "MongoDB", ["mongodb", "mongodb atlas", "mongoose"]),
  k("couchdb", "data", "CouchDB", "CouchDB", ["couchdb"]),
  k("database-design", "data", "Database design and data modelling", "数据库设计与数据建模", [
    "database systems",
    "mysql workbench",
    "drizzle orm",
  ]),
  k("query-optimisation", "data", "Query optimisation and indexing", "查询优化与索引", [
    "b-tree indexing",
    "cost models",
    "query optimisation",
    "query planning",
  ]),
  k("data-pipelines", "data", "Data pipelines and ETL", "数据管线与 ETL", [
    "data pipeline",
    "data pipelines",
    "csv pipeline",
  ]),
  k("web-scraping", "data", "Web scraping and crawling", "网页爬取", [
    "web scraping",
    "beautifulsoup",
    "requests",
    "rate limiting",
  ]),
  k("record-linkage", "data", "Record linkage", "记录链接", ["textdistance", "fuzzywuzzy"]),
  k("data-validation", "data", "Data validation and quality checks", "数据校验与质量检查", [
    "data validation",
    "data-quality assurance",
  ]),
  k("spark", "data", "Apache Spark", "Apache Spark", ["apache spark", "pyspark", "spark mllib"]),
  k("hpc", "data", "HPC and parallel computing", "HPC 与并行计算", [
    "hpc",
    "spartan hpc",
    "mpi",
    "mpi4py",
    "slurm",
    "parallel computing",
  ]),
  k("cloud-computing", "data", "Cloud computing", "云计算", [
    "cloud",
    "melbourne research cloud",
    "ansible",
  ]),
  k("aws", "data", "AWS", "AWS", ["aws", "aws rds", "aws lightsail", "lightsail"]),
  k("azure", "data", "Microsoft Azure", "Microsoft Azure", ["azure"]),
  k("docker", "data", "Docker", "Docker", ["docker"]),
  k("deployment", "data", "Deployment and hosting", "部署与托管", [
    "vercel",
    "modal",
    "heroku",
    "github pages",
  ]),

  // ── analytics ─────────────────────────────────────────────────────────────
  k("power-bi", "analytics", "Power BI", "Power BI", ["power bi", "dax", "power query"]),
  k("tableau", "analytics", "Tableau", "Tableau", ["tableau"]),
  k("excel", "analytics", "Excel", "Excel", ["excel"]),
  k("reporting", "analytics", "Dashboards and decision reporting", "仪表板与决策报告", [
    "executive and parliamentary reporting",
    "powerpoint",
  ]),
  k("data-visualisation", "analytics", "Data visualisation", "数据可视化", [
    "matplotlib",
    "seaborn",
    "ggplot2",
    "plotly",
    "recharts",
    "d3",
    "d3.js",
  ]),
  k("geospatial", "analytics", "GIS and geospatial analysis", "GIS 与地理空间分析", [
    "arcgis",
    "gis/arcgis",
    "qgis",
    "geopandas",
    "geospatial analysis",
    "spatial analysis",
    "mapbox api",
  ]),
  k(
    "data-wrangling",
    "analytics",
    "Data cleaning and exploratory analysis",
    "数据清洗与探索性分析",
    ["polars"]
  ),
  k("pandas", "analytics", "pandas", "pandas", ["pandas"]),
  k("numpy-scipy", "analytics", "NumPy and SciPy", "NumPy 与 SciPy", ["numpy", "scipy"]),
  k("intelligence-analysis", "analytics", "Intelligence analysis and OSINT", "情报分析与 OSINT", [
    "intelligence products",
  ]),
  k("risk-frameworks", "analytics", "Risk-based prioritisation", "基于风险的优先级排序", [
    "risk-based frameworks",
  ]),
  k(
    "public-data",
    "analytics",
    "Australian public data (ABS, Data SA)",
    "澳洲公开数据（ABS、Data SA）",
    ["abs api", "datasa", "sudo", "public data"]
  ),
  k(
    "graph-analytics",
    "analytics",
    "Graph databases and network analysis",
    "图数据库与网络分析",
    []
  ),
  k("web-analytics", "analytics", "Web analytics", "网站分析", []),

  // ── software ──────────────────────────────────────────────────────────────
  k("python", "software", "Python", "Python", [
    "python",
    "virtual environment",
    "conda",
    "grok learning",
    // Input-schema validation: evidence of the language, not of data quality checks.
    "pydantic",
  ]),
  k("r-lang", "software", "R", "R", ["r", "reticulate", "islr", "mass", "rstudio"]),
  k("javascript", "software", "JavaScript", "JavaScript", ["javascript"]),
  k("typescript", "software", "TypeScript", "TypeScript", ["typescript", "zod"]),
  k("c-language", "software", "C", "C", ["c", "c99", "gcc", "valgrind"]),
  k("rust", "software", "Rust", "Rust", ["rust"]),
  k("react", "software", "React", "React", [
    "react",
    "react.js",
    "create react app",
    "react router",
    "swr",
    "react flow",
  ]),
  k("nextjs", "software", "Next.js", "Next.js", ["next.js", "pages router"]),
  k("react-native", "software", "React Native and Expo", "React Native 与 Expo", [
    "react native",
    "expo",
    "react native / expo",
  ]),
  k("nodejs", "software", "Node.js and Express", "Node.js 与 Express", [
    "node.js",
    "express",
    "express.js",
    "hono",
    "handlebars",
  ]),
  k("vue", "software", "Vue", "Vue", ["vue"]),
  k("flask", "software", "Flask", "Flask", ["flask"]),
  k("fastapi", "software", "FastAPI", "FastAPI", ["fastapi"]),
  k("django", "software", "Django", "Django", ["django"]),
  k("shiny", "software", "R Shiny", "R Shiny", ["r shiny", "shiny r", "shiny", "dt"]),
  k("rest-apis", "software", "REST APIs", "REST API", [
    "rest api",
    "rest apis",
    "twitter api",
    "mastodon api",
  ]),
  k("full-stack", "software", "Full-stack web development", "全栈 Web 开发", []),
  k("html-css", "software", "HTML and CSS", "HTML 与 CSS", ["html/css", "css animations"]),
  k("tailwind", "software", "Tailwind CSS", "Tailwind CSS", ["tailwind", "tailwind css"]),
  k("ui-libraries", "software", "Component libraries", "组件库", [
    "shadcn/ui",
    "mui",
    "material ui",
    "chakra ui",
  ]),
  k("web-maps", "software", "Interactive web maps", "交互式网页地图", [
    "maplibre gl",
    "google maps api",
    "google maps js api",
  ]),
  k("auth-security", "software", "Web security and authentication", "Web 安全与身份认证", [
    "jwt auth",
    "argon2id + jwt",
    "passport",
    "jose",
  ]),
  k("testing", "software", "Automated testing", "自动化测试", [
    "vitest",
    "jest",
    "playwright",
    "fast-check",
  ]),
  k("browser-compute", "software", "Web Workers and WebAssembly", "Web Worker 与 WebAssembly", [
    "web workers",
    "webassembly",
  ]),
  k("git", "software", "Git and GitHub", "Git 与 GitHub", ["git"]),
  k("ci-cd", "software", "CI/CD and GitHub Actions", "CI/CD 与 GitHub Actions", [
    "ci/cd",
    "github actions",
  ]),
  k("build-tooling", "software", "Build tooling", "构建工具", ["vite", "turborepo", "make"]),
  k("linux-shell", "software", "Linux and the shell", "Linux 与命令行", ["bash", "linux"]),
  k("ux-design", "software", "UX design", "用户体验设计", ["axure rp"]),
  k("accessibility", "software", "Web accessibility", "网页无障碍", []),
  k("seo", "software", "SEO and structured data", "SEO 与结构化数据", [
    "seo",
    "schema.org",
    "json-ld",
  ]),
  k("i18n", "software", "Internationalisation", "国际化（i18n）", ["i18next"]),
  k(
    "technical-publishing",
    "software",
    "Maths and Markdown on the web",
    "网页上的公式与 Markdown",
    ["katex", "remark"]
  ),

  // ── research ──────────────────────────────────────────────────────────────
  k("reproducibility", "research", "Reproducible analysis", "可复现分析", ["knitr", "renv"]),
  // Evidenced by the WEHI role (ROLE_EXTRAS) only. Coursework and capstone stacks
  // carry the same words, so the token is ignored rather than counted.
  k("research-software", "research", "Research software engineering", "科研软件工程", []),
  k("bioinformatics", "research", "Bioinformatics pipelines", "生物信息学流程", [
    "bioinformatics",
    "fcsparser",
  ]),
  k("research-design", "research", "Research design and literature review", "研究设计与文献综述", [
    "literature review",
    "market research",
  ]),
  k(
    "problem-framing",
    "research",
    "Problem framing and the project lifecycle",
    "问题定义与项目生命周期",
    []
  ),
  k("jupyter", "research", "Jupyter notebooks", "Jupyter Notebook", [
    "jupyter",
    "jupyter notebook",
    "google colab",
  ]),
  k("open-data", "research", "Open data publishing", "开放数据发布", ["fair data"]),

  // ── communication ─────────────────────────────────────────────────────────
  k(
    "science-communication",
    "communication",
    "Science and data communication",
    "科学与数据传播",
    []
  ),
  k("mentoring-teaching", "communication", "Mentoring and teaching", "辅导与教学", [
    "edtech",
    "content design",
    "instructional design",
    "curriculum development",
    "interactive content",
  ]),
  k("leadership", "communication", "Leadership", "领导力", []),
  k("agile", "communication", "Agile and Scrum", "敏捷与 Scrum", ["agile"]),
  k("project-management", "communication", "Project management", "项目管理", []),
  k("process-improvement", "communication", "Process review and improvement", "流程审查与改进", [
    "sops and data dictionaries",
  ]),
  k("stakeholder-engagement", "communication", "Stakeholder engagement", "利益相关方沟通", []),

  // ── breadth ───────────────────────────────────────────────────────────────
  k("mandarin", "breadth", "Mandarin Chinese", "普通话", []),
  k("english", "breadth", "English", "英语", []),
  k("negotiation", "breadth", "Negotiation", "谈判", []),
  k("finance-marketing", "breadth", "Finance and marketing basics", "金融与市场营销基础", []),
  k("samba", "breadth", "Samba percussion", "桑巴打击乐", []),
  k("mental-health-first-aid", "breadth", "Mental health first aid", "心理健康急救", []),
];

// ── Token resolution ────────────────────────────────────────────────────────
/** One token that stands for several skills at once. */
export const MULTI_ALIASES = {
  bert: ["deep-learning", "nlp"],
  "tf-idf": ["nlp", "information-retrieval"],
  "docker swarm": ["docker", "cloud-computing"],
  "d3-geo": ["data-visualisation", "web-maps"],
  folium: ["web-maps", "data-visualisation"],
  seifa: ["geospatial", "public-data"],
  "abs remoteness": ["geospatial", "public-data"],
  rag: ["llm-apps", "information-retrieval"],
  "sentence transformers": ["information-retrieval", "nlp"],
  "gaussian mixture models": ["clustering", "statistical-learning"],
  "r markdown": ["r-lang", "reproducibility"],
  "python (pandas, numpy, scikit-learn)": ["python", "pandas", "numpy-scipy", "scikit-learn"],
  "r (tidyverse, shiny)": ["r-lang", "shiny"],
  "power bi (dax, power query)": ["power-bi"],
  "ci/cd (github actions)": ["ci-cd"],
  "sql (sql server, postgresql)": ["sql", "sql-server", "postgresql"],
  "time series (ar, arima)": ["time-series"],
};

/**
 * Tokens that add no evidence: fonts, small UI helpers and office tools, plus a
 * few that would overstate the work they sit on.
 */
export const IGNORE_TOKENS = [
  "bitcount prop double",
  "dm sans",
  "react-icons",
  "framer-motion",
  "shiki",
  "codemirror",
  "microsoft word",
  // How the COMP90050 survey was typeset, not a skill it shows.
  "latex",
  "notion",
  "faker",
  "openpyxl",
  "indexeddb",
  // A scraper's thread pool, not HPC.
  "multi-threading",
  // GMM was built to run on WEHI's Milton HPC. That says where it runs, not
  // that it was deployed, so it is not deployment evidence.
  "milton hpc",
  // On the CSIRO, HPLC capstone and NYC Taxi stacks. The one research software role
  // (WEHI) is evidenced through ROLE_EXTRAS instead.
  "research software engineering",
];

/** SAPOL internal system names. Dropped, and never allowed in /skills output. */
export const DENY_TOKENS = ["iapro", "blueteam", "blue team"];

// ── Curated maps: source id -> skill ids ────────────────────────────────────
/** Coursework capabilities (lib/coursework-data.js CAPABILITIES). Revivals only. */
export const CAPABILITY_SKILLS = {
  intervals: ["interval-estimation"],
  "paired-tests": ["hypothesis-testing"],
  simulation: ["simulation"],
  "experiment-design": ["experiment-design"],
  regression: ["regression"],
  bayesian: ["bayesian-inference"],
  spatial: ["spatial-statistics"],
  survival: ["survival-analysis"],
  classification: ["classification"],
  "model-evaluation": ["model-evaluation"],
  "dimensionality-reduction": ["dimensionality-reduction"],
  nlp: ["nlp"],
  search: ["search-agents"],
  "text-processing": ["algorithms-data-structures"],
  "parity-testing": ["testing", "reproducibility"],
  "property-testing": ["testing"],
  "seeded-rng": ["reproducibility"],
  parallel: ["hpc"],
  pipelines: ["data-pipelines"],
  "record-linkage": ["record-linkage"],
  databases: ["database-design"],
  "data-modelling": ["database-design"],
  "query-optimisation": ["query-optimisation"],
  "full-stack": ["full-stack"],
  "web-security": ["auth-security"],
  maps: ["web-maps"],
  "llm-evaluation": ["llm-evaluation"],
  "grounded-llm": ["llm-evaluation"],
  byok: ["llm-apps"],
  optimisation: ["operations-research"],
};

/** Live /knowledge notes, by slug. */
export const KNOWLEDGE_SKILLS = {
  // Foundation
  "linear-algebra": ["linear-algebra"],
  probability: ["probability"],
  statistics: ["hypothesis-testing", "interval-estimation"],
  "calculus-optimisation": ["calculus-optimisation"],
  "linear-statistical-models": ["regression"],
  "database-systems": ["database-design", "sql"],
  "artificial-intelligence": ["search-agents"],
  "web-information-technology": ["full-stack", "rest-apis"],
  "operations-research": ["operations-research"],
  "elements-of-data-processing": ["data-wrangling", "data-pipelines"],
  "applied-data-science": ["problem-framing"],
  "data-visualisation": ["data-visualisation"],
  "feature-engineering": ["feature-engineering"],
  "sampling-survey-methodology": ["sampling"],
  "sql-querying-data": ["sql"],
  "model-evaluation": ["model-evaluation"],
  // Advanced
  "natural-language-processing": ["nlp"],
  "statistical-machine-learning": ["statistical-learning"],
  "bayesian-statistics": ["bayesian-inference"],
  "pca-dimensionality-reduction": ["dimensionality-reduction"],
  clustering: ["clustering"],
  "cluster-cloud-computing": ["hpc", "cloud-computing", "spark"],
  "statistical-modelling": ["statistical-modelling"],
  "computational-statistics": ["simulation", "interval-estimation"],
  "advanced-database-systems": ["query-optimisation"],
  "science-communication": ["science-communication"],
  "time-series-analysis": ["time-series"],
  "causal-inference": ["causal-inference", "experiment-design"],
  "deep-learning": ["deep-learning"],
  "reinforcement-learning": ["reinforcement-learning"],
  "ensemble-methods": ["ensemble-methods"],
  "recommender-systems": ["recommender-systems"],
  "survival-analysis": ["survival-analysis"],
  "information-retrieval": ["information-retrieval"],
  "large-language-models": ["llm-apps"],
  "topic-modelling": ["nlp"],
  "ai-agents": ["ai-agents"],
  "spatial-statistics": ["spatial-statistics"],
  "conformal-prediction": ["interval-estimation"],
  "causal-discovery": ["causal-inference"],
  "kalman-filter": ["time-series"],
  "active-semi-supervised-learning": ["statistical-learning"],
  "extreme-value-theory": ["statistical-modelling"],
  "hierarchical-models": ["statistical-modelling", "bayesian-inference"],
  "optimisation-methods": ["calculus-optimisation", "operations-research"],
  "gaussian-processes": ["bayesian-inference"],
  "robust-statistics": ["statistical-modelling"],
  "quantile-regression": ["regression"],
  "graph-neural-networks": ["deep-learning", "graph-analytics"],
  "probabilistic-graphical-models": ["bayesian-inference"],
  // In practice
  "business-intelligence-dashboards": ["reporting", "power-bi"],
  "geospatial-analysis": ["geospatial"],
  "intelligence-analysis": ["intelligence-analysis"],
  "data-governance": ["data-governance"],
  "anomaly-detection": ["anomaly-detection"],
  "network-graph-analysis": ["graph-analytics"],
  reproducibility: ["reproducibility"],
  "mlops-monitoring": ["mlops"],
  "explainable-ai": ["explainable-ai"],
  "fairness-bias": ["fairness"],
  "differential-privacy": ["data-governance"],
  "knowledge-graphs": ["graph-analytics"],
  "streaming-analytics": ["data-pipelines"],
  "data-architecture": ["data-pipelines"],
  "statistical-process-control": ["statistical-process-control"],
  "federated-learning": ["statistical-learning", "data-governance"],
  // Taught
  "data-science-mentoring": ["mentoring-teaching"],
  "edtech-digital-learning": ["mentoring-teaching"],
};

/**
 * /ds explainers left off /skills. Each one models Rin himself (skill weights,
 * a role mix in percentages, "overfits on Python"), which reads as a
 * self-rating, so it is never evidence.
 */
export const EXCLUDED_DS = ["model-card", "feature-importance", "ensemble"];

/** /ds explainers, by route id. Every explainer not in EXCLUDED_DS needs an entry. */
export const DS_SKILLS = {
  "confusion-matrix": ["model-evaluation"],
  "bias-variance": ["statistical-learning"],
  "training-curves": ["model-evaluation"],
  pipeline: ["data-pipelines"],
  survival: ["survival-analysis"],
  "version-control": ["git"],
  "null-hypothesis": ["hypothesis-testing"],
  regression: ["regression"],
  "ab-test": ["experiment-design"],
  phacking: ["hypothesis-testing"],
  eda: ["data-wrangling"],
  recommendation: ["recommender-systems"],
  sentiment: ["nlp"],
  overfitting: ["statistical-learning"],
  "data-drift": ["mlops"],
  cicd: ["ci-cd"],
  "technical-debt": ["process-improvement"],
};

/** Blog post tags. A post with no mapped tag adds no evidence. */
export const TAG_SKILLS = {
  statistics: ["statistical-modelling"],
  forecasting: ["time-series"],
  nlp: ["nlp"],
  "ai-agents": ["ai-agents"],
  mcp: ["ai-agents"],
  claude: ["ai-productivity"],
  cursor: ["ai-productivity"],
  "vibe-coding": ["ai-productivity"],
  productivity: ["ai-productivity"],
  "ai-governance": ["ai-governance"],
  reproducibility: ["reproducibility"],
  "strategic-intelligence": ["intelligence-analysis"],
  communication: ["science-communication"],
  writing: ["science-communication"],
  mentoring: ["mentoring-teaching"],
  "data-engineering": ["data-pipelines"],
};

/**
 * Tags too broad to point at one skill. Any tag in neither list fails the check.
 * "continuous-improvement" and "decision-making" sit on essays, not on process
 * or reporting work, so they add nothing either.
 */
export const IGNORED_TAGS = [
  "continuous-improvement",
  "decision-making",
  "career",
  "data-science",
  "data-analysis",
  "job-hunt",
  "ai",
  "reflection",
  "philosophy",
  "engineering",
  "climate",
  "meta",
  "personal",
  "goals",
  "government",
];

/** Credentials (lib/career-data.js CERTS), by name. An empty list adds no evidence. */
export const CERT_SKILLS = {
  "Skills Assessment: Statistician (ANZSCO 224113)": [],
  "IELTS General Training, Band 8": ["english"],
  "Credentialed Community Language (Mandarin)": ["mandarin"],
  "Google UX Design": ["ux-design"],
  "Google Business Intelligence": ["reporting", "sql"],
  "Google Project Management": ["project-management"],
  "OSINT Fundamentals": ["intelligence-analysis"],
  "Neo4j Certified Professional": ["graph-analytics"],
  "Neo4j Graph Data Science": ["graph-analytics"],
  "Melbourne Plus: People Leadership": ["leadership"],
  "Melbourne Plus: Innovation": ["leadership"],
  "Azure Fundamentals (AZ-900)": ["azure", "cloud-computing"],
  "AI-Powered Productivity for Tech Roles": ["ai-productivity"],
  // The mentoring entry (VOLUNTEER anu-analytics-plus-2024) already counts this activity.
  "Analytics Plus Mentor (ANU CBE)": [],
  "Advanced Google Analytics": ["web-analytics"],
  "Google Analytics Individual Qualification (GAIQ)": ["web-analytics"],
  "Agile Project Management Professional Certificate": ["agile", "project-management"],
  "Career Essentials in GitHub": ["git"],
  "Advanced SQL for Data Scientists": ["sql"],
  "Google IT Automation with Python": ["python", "linux-shell", "git"],
  "Agile with Atlassian Jira": ["agile"],
  "Google Data Analytics": ["sql", "r-lang", "tableau", "data-wrangling"],
  "Mental Health First Aid": ["mental-health-first-aid"],
};

/**
 * Credential names shown differently on /skills. A test score is a result, and
 * /skills shows none, so the IELTS band is left off here (/resume keeps it).
 */
export const CERT_LABELS = {
  "IELTS General Training, Band 8": "IELTS General Training",
};

/**
 * Volunteering that counts as mentoring evidence. The rest is skipped:
 * feit-endeavour-2024 was event staffing and elite-talks-2017 predates study.
 */
export const VOLUNTEER_SKILLS = {
  "stem-mentor-2025": ["mentoring-teaching"],
  "peer-mentor-2024": ["mentoring-teaching", "leadership"],
  "anu-analytics-plus-2024": ["mentoring-teaching"],
};

/**
 * Skills a role shows beyond its `tools`, each tied to the public bullet in
 * lib/career-data.js that shows it. The check asserts every bullet exists.
 */
export const ROLE_EXTRAS = {
  sapol: [
    { skill: "reporting", bullet: 0 },
    { skill: "reproducibility", bullet: 0 },
    { skill: "process-improvement", bullet: 1 },
    { skill: "data-pipelines", bullet: 2 },
    { skill: "rest-apis", bullet: 3 },
    { skill: "ai-productivity", bullet: 4 },
    { skill: "mentoring-teaching", bullet: 4 },
    { skill: "accessibility", bullet: 4 },
    { skill: "data-governance", bullet: 5 },
  ],
  mapiva: [
    { skill: "leadership", bullet: 1 },
    { skill: "project-management", bullet: 1 },
    { skill: "data-governance", bullet: 2 },
  ],
  cbs: [
    { skill: "risk-frameworks", bullet: 0 },
    { skill: "stakeholder-engagement", bullet: 0 },
    { skill: "multivariate", bullet: 1 },
    { skill: "reporting", bullet: 1 },
    { skill: "data-validation", bullet: 2 },
    { skill: "public-data", bullet: 2 },
    { skill: "process-improvement", bullet: 3 },
    { skill: "data-governance", bullet: 4 },
    { skill: "intelligence-analysis", bullet: 5 },
    { skill: "graph-analytics", bullet: 5 },
    { skill: "geospatial", bullet: 5 },
  ],
  "unimelb-psychiatry": [
    { skill: "full-stack", bullet: 1 },
    { skill: "data-governance", bullet: 2 },
  ],
  wehi: [
    { skill: "research-software", bullet: 0 },
    { skill: "testing", bullet: 1 },
    { skill: "reproducibility", bullet: 1 },
  ],
  csiro: [{ skill: "stakeholder-engagement", bullet: 2 }],
};

/** Roles with a case study link there; every other role links to /resume#role-<id>. */
export const ROLE_HREF = {
  "unimelb-psychiatry": "/projects/moodist",
  wehi: "/projects/wehi-genomics",
};

/** Role labels that replace the career-data role title on /skills. None at present. */
export const ROLE_LABELS = {};

/**
 * Projects that are another item's evidence: each one adds its stack to the
 * target (a role, a coursework lab or a site version) and emits no item of its own.
 */
export const PROJECT_MERGE = {
  "sapol-epsb": { kind: "role", id: "sapol" },
  mapiva: { kind: "role", id: "mapiva" },
  cbs: { kind: "role", id: "cbs" },
  moodq: { kind: "role", id: "unimelb-psychiatry" },
  "wehi-flow": { kind: "role", id: "wehi" },
  climate: { kind: "role", id: "csiro" },
  hplc: { kind: "cw", id: "hplc-qc-lab" },
  cachex: { kind: "cw", id: "cachex-arena" },
  pcrm: { kind: "cw", id: "personal-crm" },
  "nyc-taxi": { kind: "cw", id: "nyc-taxi-2019" },
  "social-cloud": { kind: "cw", id: "social-sense" },
  "twitter-hpc": { kind: "cw", id: "spartan-tweet-cruncher" },
  factcheck: { kind: "cw", id: "climate-claim-checker" },
  "selfdriving-db": { kind: "cw", id: "self-driving-db-lab" },
  portfolio: { kind: "site", id: "v5" },
};

/**
 * Stack tokens (normalised) a project does not count on /skills, because the
 * work did not use them hands-on. /projects still lists them.
 * - selfdriving-db: the COMP90050 written survey, merged into the 2023
 *   assignment of Self-Driving DB Lab. It reviewed query optimisation and
 *   indexing but ran no PostgreSQL or ML of its own.
 */
export const PROJECT_DROP_TOKENS = {
  "selfdriving-db": ["database systems", "ml optimisation", "postgresql"],
};

/**
 * Skills a standalone project shows beyond its stack, from its public summary.
 * signal: faithfulness checks, 128 tests, Mann-Kendall, z-score review, Sen slope.
 */
export const PROJECT_EXTRAS = {
  signal: ["llm-evaluation", "testing", "hypothesis-testing", "anomaly-detection", "time-series"],
  "order-system": ["full-stack"],
};

/** Skills a site version shows beyond its stack. */
export const SITE_EXTRAS = {
  v2: ["mandarin"], // the first Chinese dictionary
  v5: ["i18n", "mandarin", "accessibility"],
};

/**
 * My declared core skills: the five "Top skills" on my LinkedIn profile, in its
 * order. These names are the only hand-written part of "What I work with now"
 * on /skills. Each one points at the atlas skills that hold its evidence (SQL
 * also counts SQL Server work). Its latest evidence and its last-used date are
 * computed in lib/skills-atlas.js, and lib/skills-check.js fails the build if a
 * core skill has no role, project or lab from the last 18 months behind it.
 */
export const CORE_SKILLS = [
  { id: "sql", en: "SQL", zh: "SQL", skills: ["sql", "sql-server"] },
  { id: "python", en: "Python", zh: "Python", skills: ["python"] },
  {
    id: "statistical-modelling",
    en: "Statistical modelling",
    zh: "统计建模",
    skills: ["statistical-modelling"],
  },
  { id: "power-bi", en: "Microsoft Power BI", zh: "Microsoft Power BI", skills: ["power-bi"] },
  { id: "data-governance", en: "Data governance", zh: "数据治理", skills: ["data-governance"] },
];
