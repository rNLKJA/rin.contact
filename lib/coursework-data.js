/**
 * Coursework data: the single source of truth for /projects/coursework, where
 * University of Melbourne assignments (2019 to 2024) are shown as the live
 * demos they were revived into in 2026.
 *
 * Same shape as lib/career-data.js: locale-neutral fields (dates, links, stacks,
 * taxonomy ids) sit at the top level and readable copy sits in `en` (en-AU) and
 * `zh` (zh-Hans). Read it through getCoursework(locale), which also applies the
 * site rules below, so pages never touch the raw entries.
 *
 * Site rules (lib/coursework-check.js fails the build if they break):
 * - No marks or grades, no self-scored metrics, no "compliant" claims.
 * - Nothing about any employer's internal systems or data.
 * - Team projects name every teammate in `team`.
 * - GitHub is linked only when the repository is public (repoPublic: true);
 *   private repositories keep repoUrl empty. A public repository whose main
 *   branch does not hold the 2026 revival yet sets repoLinked: false, so the
 *   card does not send visitors to code that predates the demo. The live demo
 *   is always linked.
 * - tourUrl is set only when the demo's /tour page (captioned walkthrough
 *   videos) is live; it must be on the same site as liveUrl.
 * - assignmentDate is the final deadline or submission month, at the precision
 *   the records support (datePrecision: "day" | "month" | "term"). Each entry's
 *   comment says where the date comes from.
 *
 * Proper nouns (subject codes, tools, libraries, teammates' names) stay in
 * English in both locales.
 *
 * To add a project: append an entry to COURSEWORK (order does not matter), with
 * en and zh copy holding the same number of skills and highlights; tag `areas`
 * and `capabilities` from the lists below; set repoPublic and repoLinked to
 * match the repository, and tourUrl if the demo has a tour; update
 * COURSEWORK_AS_OF; then run `npm run
 * check:career`. Counts, the timeline, the shared stack and the matrix follow
 * from the data.
 */

import { EDUCATION } from "./career-data.js";
import { formatAsOf, formatMonth } from "./career-format.js";

/** The date these entries were last checked against the live sites and repos. */
export const COURSEWORK_AS_OF = "2026-10-06";

const UNIVERSITY = {
  name: "University of Melbourne",
  url: "https://www.unimelb.edu.au",
};

/** Study levels, oldest first. Each maps to its degree in lib/career-data.js. */
export const LEVELS = ["undergraduate", "master"];
const LEVEL_DEGREE = { undergraduate: "bsc", master: "mds" };

/** Filter areas, in display order. Labels live in locales (courseworkPage.areas). */
export const AREAS = ["statistics", "ml", "algorithms", "data-engineering", "web", "genai-eval"];

/** Skills-matrix row groups: the filter areas plus testing and reproducibility. */
export const SKILL_GROUPS = [
  "statistics",
  "ml",
  "algorithms",
  "reproducibility",
  "data-engineering",
  "web",
  "genai-eval",
];

export const STATUSES = ["live"];

// ── Canonical skills: the rows of the skills matrix ──────────────────────────
// Each project lists the ids it demonstrates in `capabilities`; its own, more
// specific skill names stay in en.skills / zh.skills for the project card.
export const CAPABILITIES = [
  {
    id: "intervals",
    group: "statistics",
    en: "Interval estimation (bootstrap, Wilson, t)",
    zh: "区间估计（bootstrap、Wilson、t 区间）",
  },
  {
    id: "paired-tests",
    group: "statistics",
    en: "Paired and exact tests (McNemar, Wilcoxon, sign, permutation)",
    zh: "配对与精确检验（McNemar、Wilcoxon、符号检验、置换检验）",
  },
  {
    id: "simulation",
    group: "statistics",
    en: "Simulation and interval coverage checks",
    zh: "模拟与区间覆盖率检验",
  },
  {
    id: "experiment-design",
    group: "statistics",
    en: "Experiment and benchmark design",
    zh: "实验与基准测试设计",
  },
  {
    id: "regression",
    group: "statistics",
    en: "Regression (least squares, ridge, lasso, robust errors)",
    zh: "回归（最小二乘、岭回归、Lasso、稳健标准误）",
  },
  {
    id: "bayesian",
    group: "statistics",
    en: "Bayesian inference and MCMC",
    zh: "贝叶斯推断与 MCMC",
  },
  {
    id: "spatial",
    group: "statistics",
    en: "Spatial statistics (Moran's I, LISA)",
    zh: "空间统计（Moran's I、LISA）",
  },
  {
    id: "survival",
    group: "statistics",
    en: "Survival analysis (Kaplan-Meier)",
    zh: "生存分析（Kaplan-Meier）",
  },
  {
    id: "classification",
    group: "ml",
    en: "Classification (Naive Bayes, logistic regression, k-NN, trees)",
    zh: "分类（朴素贝叶斯、逻辑回归、k-NN、决策树）",
  },
  {
    id: "model-evaluation",
    group: "ml",
    en: "Model evaluation (cross-validation, calibration, model checks)",
    zh: "模型评估（交叉验证、校准、模型检验）",
  },
  {
    id: "dimensionality-reduction",
    group: "ml",
    en: "Dimensionality reduction (PCA, SVD)",
    zh: "降维（PCA、SVD）",
  },
  {
    id: "nlp",
    group: "ml",
    en: "Language processing (n-grams, tokenisation, sentiment)",
    zh: "自然语言处理（n-gram、分词、情感分析）",
  },
  {
    id: "search",
    group: "algorithms",
    en: "Search (A*, BFS, uniform-cost, minimax, exhaustive)",
    zh: "搜索算法（A*、BFS、一致代价、minimax、穷举）",
  },
  {
    id: "text-processing",
    group: "algorithms",
    en: "String and text processing (C, regex, segmentation)",
    zh: "字符串与文本处理（C、正则、切分）",
  },
  {
    id: "parity-testing",
    group: "reproducibility",
    en: "Faithful ports checked against the original",
    zh: "对照原版逐项核对的忠实移植",
  },
  {
    id: "property-testing",
    group: "reproducibility",
    en: "Property-based and differential testing",
    zh: "基于属性的测试与差分测试",
  },
  {
    id: "seeded-rng",
    group: "reproducibility",
    en: "Bit-exact ports of NumPy and R random generators",
    zh: "逐位一致地移植 NumPy 与 R 的随机数生成器",
  },
  {
    id: "parallel",
    group: "data-engineering",
    en: "Parallel processing on HPC (MPI, Slurm)",
    zh: "HPC 上的并行处理（MPI、Slurm）",
  },
  {
    id: "pipelines",
    group: "data-engineering",
    en: "Crawling, extraction and data pipelines",
    zh: "爬取、抽取与数据管线",
  },
  {
    id: "record-linkage",
    group: "data-engineering",
    en: "Record linkage and blocking",
    zh: "记录链接与分块",
  },
  {
    id: "databases",
    group: "data-engineering",
    en: "Databases (MongoDB, CouchDB, SQLite)",
    zh: "数据库（MongoDB、CouchDB、SQLite）",
  },
  {
    id: "full-stack",
    group: "web",
    en: "Full-stack product features",
    zh: "全栈产品功能",
  },
  {
    id: "web-security",
    group: "web",
    en: "Web security (sessions, CSP, scoped queries)",
    zh: "Web 安全（会话、CSP、按用户隔离的查询）",
  },
  {
    id: "maps",
    group: "web",
    en: "Maps and geospatial UI",
    zh: "地图与地理空间界面",
  },
  {
    id: "llm-evaluation",
    group: "genai-eval",
    en: "LLM evaluation harnesses",
    zh: "LLM 评测框架",
  },
  {
    id: "grounded-llm",
    group: "genai-eval",
    en: "LLM answers checked against the data",
    zh: "对照数据核查 LLM 回答",
  },
  {
    id: "byok",
    group: "genai-eval",
    en: "Bring-your-own-key (BYOK) AI features",
    zh: "BYOK（自带密钥）AI 功能",
  },
];

// ── Projects (any order; getCoursework() sorts by assignmentDate) ────────────
export const COURSEWORK = [
  {
    // Part A spec: due 5 Apr 2022. Part B spec is missing; the final commits end
    // 11 May 2022, consistent with an 11 May deadline but unconfirmed, so month.
    slug: "cachex-arena",
    subjectCode: "COMP30024",
    level: "undergraduate",
    term: { year: 2022, semester: 1 },
    assignmentDate: "2022-05",
    datePrecision: "month",
    team: ["Wei Zhao"],
    areas: ["algorithms", "ml", "statistics", "genai-eval"],
    capabilities: [
      "search",
      "parity-testing",
      "intervals",
      "paired-tests",
      "experiment-design",
      "llm-evaluation",
      "grounded-llm",
      "byok",
    ],
    originalStack: ["Python 3.6", "NumPy", "SciPy", "Jupyter"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Web Workers",
      "Vitest",
      "zod",
      "Anthropic SDK",
    ],
    liveUrl: "https://cachex-ai.vercel.app",
    tourUrl: "https://cachex-ai.vercel.app/tour",
    repoPublic: true,
    repoUrl: "https://github.com/rNLKJA/Cachex-AI",
    status: "live",
    en: {
      title: "Cachex Arena",
      subject: "Artificial Intelligence",
      summary:
        "Our COMP30024 agent for Cachex, a Hex-like connection game with captures and a steal rule, revived as a browser arena. Play the minimax agent, watch AI vs AI, step through the A* solver, and run a seeded tournament that reports win rates with confidence intervals.",
      myRole:
        "Pair project with Wei Zhao as team _4399: we wrote the A* solver, the minimax agent and the Part A report together. I rebuilt it as Cachex Arena in 2026.",
      skills: [
        "A* search with Manhattan and Euclidean heuristics",
        "Minimax with alpha-beta pruning",
        "Evaluation function design",
        "Parity testing of a TypeScript port against Python",
        "Wilson and bootstrap confidence intervals",
        "Bradley-Terry strength ratings",
        "Wilcoxon signed-rank and exact McNemar tests",
        "LLM-as-a-player evaluation",
        "BYOK AI with a local audit log",
      ],
      highlights: [
        "Ported the Python agent and A* solver line by line to TypeScript running in Web Workers. Parity tests match the original on 184 A* runs, 40 refereed games and 179 minimax searches.",
        "A seeded 1,200-game round robin with Wilson and bootstrap intervals showed the dynamic-depth search rarely went past one ply, and a one-line bug stopped alpha-beta from narrowing its window. Both are documented and the agent is kept as submitted.",
        "A paired study on 980 random boards compared the Manhattan and Euclidean heuristics with a paired bootstrap, Wilcoxon and exact McNemar tests: Manhattan expands fewer nodes but finds a shortest path less often.",
        "Two optional bring-your-own-key features: an LLM Arena where the visitor's model plays the agent, with every move validated against the legal set and results compared game by game with simple baselines, and a move commentator whose claims are checked against the agent's own search. Every call is kept in a local audit log.",
      ],
    },
    zh: {
      title: "Cachex 对战场",
      subject: "人工智能",
      summary:
        "COMP30024 课上我们为 Cachex（一种带吃子和换手规则的类 Hex 连线棋）写的智能体，如今复活成浏览器里的对战场。可以和 minimax 智能体下棋、看 AI 互搏、逐步查看 A* 搜索，还能跑带随机种子的循环赛，胜率都附置信区间。",
      myRole:
        "与 Wei Zhao 组队（_4399）完成，A* 求解器、minimax 智能体和 Part A 报告由两人共同完成；2026 年由我重建为 Cachex Arena。",
      skills: [
        "使用 Manhattan 与 Euclidean 启发式的 A* 搜索",
        "带 alpha-beta 剪枝的 minimax",
        "评估函数设计",
        "TypeScript 移植版与 Python 原版的一致性测试",
        "Wilson 与 bootstrap 置信区间",
        "Bradley-Terry 实力评分",
        "Wilcoxon 符号秩检验与精确 McNemar 检验",
        "LLM 作为棋手的评测",
        "BYOK AI 与本地审计日志",
      ],
      highlights: [
        "把 Python 写的智能体和 A* 求解器逐行移植成在 Web Worker 中运行的 TypeScript；在 184 次 A* 搜索、40 局裁判对局和 179 次 minimax 搜索上与原版结果完全一致。",
        "用带随机种子的 1,200 局循环赛（Wilson 与 bootstrap 区间）复盘后发现：动态深度搜索几乎从不超过一层，一行代码的 bug 让 alpha-beta 的窗口始终收不紧。这些都写进了文档，智能体保持提交时的原样。",
        "在 980 个配对随机棋盘上比较 Manhattan 与 Euclidean 两种启发式，用配对 bootstrap、Wilcoxon 检验和精确 McNemar 检验：Manhattan 展开的节点更少，但找到最短路径的比例更低。",
        "两个可选的 BYOK 功能：LLM 对战场让访客用自己的模型与智能体对弈，每一步都校验是否合法，并与简单基线逐局比较；AI 走法解说的每条说法都会对照智能体自己的搜索结果核查。每次调用都记录在本地审计日志里。",
      ],
    },
  },
  {
    // Spec: due 30 Aug 2021, but work and the submitted report run to 10 Sep 2021
    // (likely an extension, unconfirmed), so the month of final submission.
    slug: "source-separation-lab",
    subjectCode: "MAST30034",
    level: "undergraduate",
    term: { year: 2021, semester: 2 },
    assignmentDate: "2021-09",
    datePrecision: "month",
    team: [],
    areas: ["statistics", "ml"],
    capabilities: [
      "simulation",
      "regression",
      "dimensionality-reduction",
      "model-evaluation",
      "paired-tests",
      "intervals",
      "seeded-rng",
      "parity-testing",
      "grounded-llm",
      "byok",
    ],
    originalStack: [
      "Python",
      "Jupyter",
      "NumPy",
      "pandas",
      "scikit-learn",
      "matplotlib",
      "seaborn",
      "R",
    ],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "KaTeX",
      "Web Workers",
      "Vitest",
      "zod",
    ],
    liveUrl: "https://mast30034-source-separation.vercel.app",
    tourUrl: "https://mast30034-source-separation.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "Source Separation Lab",
      subject: "Applied Data Science",
      summary:
        "My Applied Data Science assignment on recovering hidden sources from a synthetic fMRI-style dataset, rebuilt as an interactive lab. Generate the data, then recover the time courses and spatial maps with least squares, ridge, lasso and principal component regression, all recomputed in the browser.",
      myRole:
        "Individual assignment. I wrote the original analysis, notebook and report, and built the 2026 revival.",
      skills: [
        "Synthetic spatiotemporal data simulation",
        "Least squares, ridge and lasso regression",
        "Principal component regression via SVD",
        "Monte Carlo tuning of the lasso penalty",
        "Bias-variance decomposition",
        "Paired comparisons with common random numbers",
        "Bootstrap and Student-t intervals",
        "Port of NumPy's MT19937 RandomState",
        "BYOK LLM figure explanations with number checks",
      ],
      highlights: [
        "A bit-for-bit port of NumPy's legacy random generator regenerates the 2021 noise, so every reported number is recomputed exactly in the browser.",
        "Re-examined the lasso penalty in a paired design on 50 seeded datasets against a comparator fixed in advance: the submitted ρ = 0.625 gives about 10% higher MSE than ρ = 0.60 and is worse on all 50.",
        "Added a bias-variance decomposition, per-source recovery intervals and paired re-tests of the 2021 claims, with decision records that say where the original reasoning does not hold.",
        "An optional 'Explain this figure' feature runs on the visitor's own API key, checks each number in the answer against the figure's summary and logs every call locally.",
      ],
    },
    zh: {
      title: "信号源分离实验室",
      subject: "应用数据科学",
      summary:
        "应用数据科学课的个人作业：从一组模拟的 fMRI 式时空数据中还原隐藏的信号源。现在做成交互式实验室，可以自己生成数据，再用最小二乘、岭回归、Lasso 和主成分回归还原时间序列与空间图，所有计算都在浏览器里重新跑一遍。",
      myRole: "个人作业。原始分析、notebook 和报告都由我完成，2026 年的复活版也由我搭建。",
      skills: [
        "合成时空数据模拟",
        "最小二乘、岭回归与 Lasso 回归",
        "基于 SVD 的主成分回归",
        "用蒙特卡洛方法调整 Lasso 惩罚",
        "偏差-方差分解",
        "使用公共随机数的配对比较",
        "Bootstrap 与 Student-t 区间",
        "移植 NumPy 的 MT19937 RandomState",
        "带数字核查的 BYOK LLM 图表解释",
      ],
      highlights: [
        "逐位移植 NumPy 旧版随机数生成器，重现 2021 年的噪声，报告里的每个数字都能在浏览器里原样算出来。",
        "在 50 组带种子的配对数据上，以事先固定的对照值重新审视 Lasso 惩罚的选择：当年选的 ρ = 0.625 比 ρ = 0.60 的 MSE 高约 10%，50 组数据全部更差。",
        "新增偏差-方差分解、各信号源恢复度的区间估计，以及对 2021 年结论的配对复检；决策记录如实写明当年推理站不住脚的地方。",
        "可选的“解释这张图”功能用访客自己的 API key 调用，逐一核对回答中的数字是否出自图表摘要，每次调用都记在本地日志里。",
      ],
    },
  },
  {
    // Canvas headers in the submitted notebooks: A1 due 20 Mar 2024, A2 due
    // 3 Apr 2024 (1pm). The later (A2) deadline is used.
    slug: "nlp-playground",
    subjectCode: "COMP90042",
    level: "master",
    term: { year: 2024, semester: 1 },
    assignmentDate: "2024-04-03",
    datePrecision: "day",
    team: [],
    areas: ["ml", "genai-eval"],
    capabilities: [
      "text-processing",
      "nlp",
      "classification",
      "intervals",
      "paired-tests",
      "model-evaluation",
      "experiment-design",
      "parity-testing",
      "llm-evaluation",
      "byok",
    ],
    originalStack: ["Python 3.8", "Jupyter", "NLTK", "scikit-learn", "NumPy"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Web Workers",
      "Vitest",
      "Playwright",
      "zod",
    ],
    liveUrl: "https://comp90042-nlp-playground.vercel.app",
    tourUrl: "https://comp90042-nlp-playground.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "NLP Playground",
      subject: "Natural Language Processing",
      summary:
        "My two NLP assignments rebuilt as three browser demos: a hashtag segmenter, a tweet geolocator using Naive Bayes and logistic regression, and Hangman played by n-gram language models. The 2026 upgrade adds intervals, paired tests, calibration checks and an optional LLM evaluation.",
      myRole: "Individual assignments. I wrote both original notebooks and built the 2026 revival.",
      skills: [
        "MaxMatch hashtag segmentation",
        "Unigram and character n-gram language models",
        "Naive Bayes and logistic regression text classification",
        "Bootstrap and Wilson intervals",
        "Exact McNemar test",
        "Calibration (reliability diagrams, ECE)",
        "Paired benchmarking on a common split",
        "LLM evaluation harness",
        "BYOK AI with a local audit log",
      ],
      highlights: [
        "Ported NLTK's TweetTokenizer, the WordNet lemmatiser and both classifiers to TypeScript; the ports reproduce every test-set prediction from the submitted notebooks.",
        "Re-analysis showed the two classifiers cannot be separated on 142 test tweets (exact McNemar p = 1.00), and that Naive Bayes is badly overconfident.",
        "Re-ran all five Hangman guessers on one common split so they are compared pair by pair, with bootstrap intervals on each difference.",
        "An optional LLM Hangman harness plays a model on the same seeded words under the same scoring, counts invalid guesses, refusals and cost separately, and logs each call in the browser.",
      ],
    },
    zh: {
      title: "NLP 实验场",
      subject: "自然语言处理",
      summary:
        "两份 NLP 个人作业重做成三个浏览器演示：话题标签切分、用朴素贝叶斯和逻辑回归判断推文来自哪个国家，以及由 n-gram 语言模型来猜词的 Hangman。2026 年的升级补上了置信区间、配对检验、校准评估和可选的 LLM 评测。",
      myRole: "个人作业。两份原始 notebook 和 2026 年的复活版都由我完成。",
      skills: [
        "MaxMatch 话题标签切分",
        "Unigram 与字符级 n-gram 语言模型",
        "朴素贝叶斯与逻辑回归文本分类",
        "Bootstrap 与 Wilson 区间",
        "精确 McNemar 检验",
        "校准评估（可靠性图、ECE）",
        "同一数据划分上的配对基准测试",
        "LLM 评测框架",
        "BYOK AI 与本地审计日志",
      ],
      highlights: [
        "把 NLTK 的 TweetTokenizer、WordNet 词形还原和两个分类器移植成 TypeScript，与提交的 notebook 在每条测试推文上的预测完全一致。",
        "补做的分析显示，在 142 条测试推文上两种分类器无法区分（精确 McNemar 检验 p = 1.00），而朴素贝叶斯明显过度自信。",
        "让五种 Hangman 猜词器在同一份数据划分上重跑，逐对比较，并为每个差值给出 bootstrap 区间。",
        "可选的 LLM Hangman 评测让模型在同一批带种子的单词上按同样规则作答，无效猜测、拒答和费用分开统计，每次调用都记在浏览器本地日志里。",
      ],
    },
  },
  {
    // Three projects across the semester. Project 1 due 12 Sep 2019; the surviving
    // Project 2 file was last saved 15 Oct 2019; Project 3 has no date. Term only.
    slug: "comp10001-playground",
    subjectCode: "COMP10001",
    level: "undergraduate",
    term: { year: 2019, semester: 2 },
    assignmentDate: "2019-10",
    datePrecision: "term",
    team: [],
    areas: ["algorithms", "genai-eval"],
    capabilities: [
      "search",
      "parity-testing",
      "property-testing",
      "intervals",
      "simulation",
      "llm-evaluation",
      "byok",
      "web-security",
    ],
    originalStack: ["Python 3", "Grok Learning"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Web Workers",
      "Vitest",
      "fast-check",
      "zod",
      "IndexedDB",
    ],
    liveUrl: "https://comp10001-playground.vercel.app",
    tourUrl: "https://comp10001-playground.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "COMP10001 Playground",
      subject: "Foundations of Computing",
      summary:
        "My first three programming projects in one interactive site: count an election three ways, guide Falca past a dragon to the treasure with BFS and uniform-cost search, and find the best way to group a hand of cards.",
      myRole:
        "Individual projects. I wrote the originals on Grok Learning and built the 2026 revival.",
      skills: [
        "Vote counting (first past the post, second-preference runoff, instant runoff)",
        "Breadth-first search",
        "Uniform-cost search",
        "Exhaustive set-partition search",
        "Parity testing against Python",
        "Property-based testing with fast-check",
        "Wilson and bootstrap intervals",
        "Interval coverage simulation",
        "LLM evaluation against an exact solver",
        "Content Security Policy for BYOK keys",
      ],
      highlights: [
        "The cave project is a line-by-line port of my surviving 2019 file, bugs included, beside a spec-correct mode. The two lost projects were rebuilt from the task and are labelled as rebuilt.",
        "Parity tests check the TypeScript against the Python on 230 seeded caves, and property-based tests check invariants against independent oracles.",
        "A bring-your-own-key evaluation asks whether an LLM can find the best card grouping, scored by the same rules engine against an exact solver and a greedy baseline, with Wilson intervals.",
        "A coverage simulation showed the bootstrap intervals run narrow on small samples, so the default became 30 hands and those intervals are labelled nominal.",
      ],
    },
    zh: {
      title: "COMP10001 编程游乐场",
      subject: "计算基础",
      summary:
        "我第一门编程课的三个项目，合成了一个交互网站：用三种规则计票，用 BFS 和一致代价搜索带 Falca 绕过恶龙拿到宝藏，再为一手牌找出最优分组。",
      myRole: "个人项目。原作在 Grok Learning 上完成，2026 年的复活版也由我搭建。",
      skills: [
        "计票规则（简单多数制、第二偏好决选、即时决选制）",
        "广度优先搜索",
        "一致代价搜索",
        "集合划分穷举搜索",
        "与 Python 原版的一致性测试",
        "用 fast-check 做基于属性的测试",
        "Wilson 与 bootstrap 区间",
        "区间覆盖率模拟",
        "以精确求解器为基准的 LLM 评测",
        "保护 BYOK 密钥的内容安全策略（CSP）",
      ],
      highlights: [
        "洞穴寻宝项目是对我 2019 年留存源文件的逐行移植，连原有 bug 也保留，旁边另设按题目要求修正的模式；另外两个原稿已丢失的项目按题目重建，并明确标注。",
        "在 230 个带种子的洞穴上与 Python 原版做对照测试，再用基于属性的测试，拿独立参照实现检查各项不变式。",
        "用访客自己的 key 评测 LLM 能否找到最优分牌：与精确求解器和贪心基线用同一套规则引擎打分，并给出 Wilson 区间。",
        "覆盖率模拟发现小样本下 bootstrap 区间偏窄，于是默认改为 30 手牌，这类区间也标为“名义 95%”。",
      ],
    },
  },
  {
    // Spec PDF header: "Assignment 1, Due: 4pm Tuesday 12 May 2020".
    slug: "message-cleanser",
    subjectCode: "COMP10002",
    level: "undergraduate",
    term: { year: 2020, semester: 1 },
    assignmentDate: "2020-05-12",
    datePrecision: "day",
    team: [],
    areas: ["algorithms", "genai-eval"],
    capabilities: [
      "text-processing",
      "parity-testing",
      "property-testing",
      "intervals",
      "paired-tests",
      "llm-evaluation",
      "byok",
      "web-security",
    ],
    originalStack: ["C99", "gcc"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Shiki",
      "Vitest",
      "fast-check",
      "zod",
      "Anthropic SDK",
    ],
    liveUrl: "https://comp10002-message-cleanser.vercel.app",
    tourUrl: "https://comp10002-message-cleanser.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "Message Cleanser",
      subject: "Foundations of Algorithms",
      summary:
        "My first C assignment, a five-stage cleanser that strips noise from comma-tokenised messages and keeps only known emoticons, revived as a stage-by-stage visualiser running a faithful TypeScript port.",
      myRole:
        "Individual assignment, written on a skeleton from the teaching staff. I wrote the solution and built the 2026 revival.",
      skills: [
        "C string processing",
        "Differential testing against a compiled binary",
        "Property-based testing",
        "Wilson and bootstrap intervals",
        "Exact McNemar test",
        "Rules vs LLM evaluation design",
        "BYOK AI audit logging",
        "Content Security Policy",
      ],
      highlights: [
        "Recovered the complete 2020 solution from a Notability note and confirmed it reproduces both official sample outputs byte for byte.",
        "Differential testing on 500 seeded inputs against the compiled C program: all 481 completed runs match byte for byte, and the 19 runs where the C binary crashes are flagged by the port instead.",
        "A Rules vs LLM harness tests whether a language model can follow the cleansing procedure, scored against the rule engine with Wilson intervals and paired tests. No LLM results are published.",
        "Bring-your-own-key calls go straight from the browser, are restricted by a Content Security Policy and are recorded in a local audit log.",
      ],
    },
    zh: {
      title: "表情消息清洗器",
      subject: "算法基础",
      summary:
        "我的第一份 C 语言作业：一个分五个阶段的清洗程序，去掉逗号分隔消息里的杂质，只保留词典里的表情符号。现在复活成逐阶段的可视化工具，背后跑的是忠实移植的 TypeScript 版本。",
      myRole: "个人作业，基于教学团队提供的代码框架。解答和 2026 年的复活版都由我完成。",
      skills: [
        "C 语言字符串处理",
        "对照编译后程序的差分测试",
        "基于属性的测试",
        "Wilson 与 bootstrap 区间",
        "精确 McNemar 检验",
        "“规则 vs LLM”评测设计",
        "BYOK AI 审计日志",
        "内容安全策略（CSP）",
      ],
      highlights: [
        "2020 年的完整解答是从 Notability 笔记里找回来的，确认能逐字节复现两份官方样例输出。",
        "用 500 个带种子的生成输入对照编译后的 C 程序做差分测试：481 次正常运行全部逐字节一致，C 程序崩溃的 19 次则由移植版标记出来。",
        "“规则 vs LLM”评测检验大模型能否照着清洗流程做对，以规则引擎为标准答案，给出 Wilson 区间和配对检验；目前没有公布任何 LLM 结果。",
        "BYOK 调用直接从浏览器发往服务商，受内容安全策略（CSP）限制，并记录在本地审计日志里。",
      ],
    },
  },
  {
    // Spec PDFs: Project 1 due 21 Sep 2020; Project 2 due 8am Wed 21 Oct 2020.
    // The later (Project 2) deadline is used.
    slug: "data-processing-lab",
    subjectCode: "COMP20008",
    level: "undergraduate",
    term: { year: 2020, semester: 2 },
    assignmentDate: "2020-10-21",
    datePrecision: "day",
    team: [],
    areas: ["data-engineering", "ml", "genai-eval"],
    capabilities: [
      "pipelines",
      "text-processing",
      "record-linkage",
      "classification",
      "dimensionality-reduction",
      "model-evaluation",
      "intervals",
      "paired-tests",
      "seeded-rng",
      "parity-testing",
      "llm-evaluation",
      "byok",
    ],
    originalStack: [
      "Python 3",
      "requests",
      "BeautifulSoup",
      "pandas",
      "NumPy",
      "matplotlib",
      "textdistance",
      "fuzzywuzzy",
      "scikit-learn",
    ],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Web Workers",
      "Vitest",
      "zod",
      "Anthropic SDK",
    ],
    liveUrl: "https://comp20008-data-processing.vercel.app",
    tourUrl: "https://comp20008-data-processing.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "Data Processing Lab",
      subject: "Elements of Data Processing",
      summary:
        "My two Elements of Data Processing projects as one interactive lab: replay a breadth-first crawl of rugby match reports, tune an Abt-Buy product matcher and its blocking keys, and train k-NN and decision tree classifiers on World Bank indicators.",
      myRole:
        "Individual projects. I wrote the original code and reports and built the 2026 revival.",
      skills: [
        "Breadth-first web crawling",
        "Regex information extraction",
        "Record linkage and blocking",
        "k-NN and decision tree classification",
        "PCA and feature selection",
        "Repeated stratified cross-validation with Nadeau-Bengio correction",
        "Wilson and bootstrap intervals",
        "Exact McNemar test",
        "LLM-as-a-judge evaluation",
        "BYOK AI audit logging",
      ],
      highlights: [
        "Every 2020 figure is reproduced exactly, down to each decision tree node, through ports of NumPy's random generator and scikit-learn's tree builder.",
        "Repeated 10 × 5-fold cross-validation showed the report's preferred decision tree is not reliably better than 3-NN (95% interval for the gap: -4.4 to +10.2 points).",
        "Re-running the originals surfaced three differences the reports did not mention, such as two score rules and an unseeded k-means, and the lab lets you switch between them.",
        "An optional LLM-as-a-judge harness compares a model with the 2020 matcher on a seeded, stratified sample of candidate pairs, run on the visitor's own key and logged locally.",
      ],
    },
    zh: {
      title: "数据处理实验室",
      subject: "数据处理基础",
      summary:
        "数据处理基础课的两个个人项目合成一个交互实验室：重放对橄榄球赛报的广度优先爬取，调整 Abt-Buy 商品匹配和分块规则，再用世界银行指标训练 k-NN 与决策树分类器。",
      myRole: "个人项目。原始代码、报告和 2026 年的复活版都由我完成。",
      skills: [
        "广度优先网页爬取",
        "正则表达式信息抽取",
        "记录链接与分块",
        "k-NN 与决策树分类",
        "PCA 与特征选择",
        "带 Nadeau-Bengio 校正的重复分层交叉验证",
        "Wilson 与 bootstrap 区间",
        "精确 McNemar 检验",
        "LLM 评审（LLM-as-a-judge）评测",
        "BYOK AI 审计日志",
      ],
      highlights: [
        "通过移植 NumPy 随机数生成器和 scikit-learn 的决策树构建器，2020 年的每个数字都原样复现，连决策树的每个节点都一致。",
        "重复 10 × 5 折交叉验证表明，报告里偏好的决策树并不比 3-NN 可靠地更好（差值的 95% 区间为 -4.4 到 +10.2 个百分点）。",
        "重跑原代码时发现三处报告没提到的差异，比如两套比分规则和一个没设种子的 k-means，实验室里都可以切换查看。",
        "可选的 LLM 评审评测：在带种子的分层候选对样本上，把大模型与 2020 年的匹配器对比，用访客自己的 key 运行，调用记录保存在本地。",
      ],
    },
  },
  {
    // Spec: "The deadline for submitting the assignment is: Wednesday 5th April
    // (by 12 noon!)", one report per student pair. Commits peak up to 5 Apr 2023.
    slug: "spartan-tweet-cruncher",
    subjectCode: "COMP90024",
    level: "master",
    term: { year: 2023, semester: 1 },
    assignmentDate: "2023-04-05",
    datePrecision: "day",
    team: ["Wei Zhao"],
    areas: ["data-engineering", "statistics"],
    capabilities: [
      "parallel",
      "text-processing",
      "experiment-design",
      "intervals",
      "simulation",
      "parity-testing",
      "llm-evaluation",
      "grounded-llm",
      "byok",
    ],
    originalStack: ["Python 3.7", "mpi4py", "Slurm", "Spartan HPC", "polars", "pandas", "NumPy"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Web Workers",
      "d3-geo",
      "Vitest",
      "zod",
      "Anthropic SDK",
    ],
    liveUrl: "https://comp90024-spartan-twitter.vercel.app",
    tourUrl: "https://comp90024-spartan-twitter.vercel.app/tour",
    repoPublic: true,
    repoUrl: "https://github.com/rNLKJA/Twitter-Data-Analysis-with-HPC",
    status: "live",
    en: {
      title: "Spartan Tweet Cruncher",
      subject: "Cluster and Cloud Computing",
      summary:
        "Our pair assignment that processed 9.09 million geotagged tweets with MPI on the University's Spartan HPC, revived with the original results, the scaling story, and the same algorithm running across Web Workers in your browser.",
      myRole:
        "Pair assignment with Wei Zhao: we wrote the MPI program and the report together. I built the 2026 revival.",
      skills: [
        "MPI parallel processing (scatter and gather)",
        "Byte-range file chunking",
        "Regex stream parsing",
        "Amdahl's and Gustafson's laws",
        "Benchmark design with repeated randomised rounds",
        "Order-statistic and bootstrap intervals",
        "Interval coverage simulation",
        "Grounded question answering with citation checks",
        "LLM evaluation with unanswerable questions",
        "BYOK AI audit logging",
      ],
      highlights: [
        "The original split the 18.74 GB file into byte ranges per MPI rank; wall-clock time fell from 11:01 on one core to 1:41 on eight (one run per layout).",
        "While porting, found a chunk-boundary bug that can count a tweet twice (about 1 in 500 boundaries). The port keeps it, a test pins it and the lab explains it.",
        "The browser benchmark repeats each worker count in shuffled rounds and reports medians with exact order-statistic intervals and bootstrap intervals, with coverage checked by simulation.",
        "An optional Ask page answers only from the result tables, must cite rows and show its arithmetic, and every answer is checked automatically and logged locally. A 24-question harness, including questions the tables cannot answer, scores a model on the visitor's own key.",
      ],
    },
    zh: {
      title: "Spartan 推文并行分析",
      subject: "集群与云计算",
      summary:
        "与 Wei Zhao 合作的作业：在学校的 Spartan 超算上用 MPI 并行处理 909 万条带地理标签的推文。复活版展示原始结果和扩展性分析，还能在浏览器里用 Web Worker 跑同一套算法。",
      myRole: "与 Wei Zhao 合作完成，MPI 程序和报告由两人共同完成；2026 年的复活版由我搭建。",
      skills: [
        "MPI 并行处理（scatter 与 gather）",
        "按字节范围切分文件",
        "正则流式解析",
        "Amdahl 定律与 Gustafson 定律",
        "多轮随机重复的基准测试设计",
        "次序统计量区间与 bootstrap 区间",
        "区间覆盖率模拟",
        "带引用核查的有据问答",
        "含不可回答问题的 LLM 评测",
        "BYOK AI 审计日志",
      ],
      highlights: [
        "原程序按字节范围把 18.74 GB 的文件分给各个 MPI 进程，单核 11:01 的运行时间在 8 核上降到 1:41（每种配置只跑了一次）。",
        "移植时发现一个分块边界 bug：同一条推文可能被两个进程重复计数（大约每 500 个边界出现一次）。移植版保留了这个行为，用测试固定下来，实验页面也会解释。",
        "浏览器基准测试按随机顺序多轮重复每种 worker 数量，给出中位数的精确次序统计区间和 bootstrap 区间，并用模拟检验区间的覆盖率。",
        "可选的“问数据”页面只能依据结果表作答，必须引用数据行并写出算式，答案会自动核对并记录在本地日志中；另有 24 题评测集（包括结果表无法回答的问题），用访客自己的 key 给模型打分。",
      ],
    },
  },
  {
    // No spec survives. The submitted report was created 21 Oct 2023; the exact
    // due date is unknown, so month.
    slug: "four-roads-to-a-posterior",
    subjectCode: "MAST90125",
    level: "master",
    term: { year: 2023, semester: 2 },
    assignmentDate: "2023-10",
    datePrecision: "month",
    team: [],
    areas: ["statistics"],
    capabilities: [
      "bayesian",
      "model-evaluation",
      "seeded-rng",
      "parity-testing",
      "grounded-llm",
      "byok",
    ],
    originalStack: ["R", "R Markdown", "knitr", "mvtnorm", "coda"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "KaTeX",
      "Web Workers",
      "Vitest",
      "zod",
    ],
    liveUrl: "https://mast90125-bayesian-logistic.vercel.app",
    tourUrl: "https://mast90125-bayesian-logistic.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "Four Roads to a Posterior",
      subject: "Bayesian Statistical Learning",
      summary:
        "My Bayesian assignment fitting a logistic regression to a small dose-response trial four ways (Laplace, Metropolis-Hastings, HMC and expectation propagation), revived as an interactive explainer that replays the 2023 chains draw for draw.",
      myRole:
        "Individual assignment. I wrote the original R Markdown analysis and built the 2026 revival.",
      skills: [
        "Bayesian logistic regression",
        "Laplace approximation",
        "Metropolis-Hastings",
        "Hamiltonian Monte Carlo",
        "Expectation propagation",
        "Convergence diagnostics (rank-normalised R-hat, bulk and tail ESS, MCSE)",
        "Posterior predictive checks",
        "Prior sensitivity analysis",
        "Porting R's RNG and QUADPACK integration",
        "BYOK diagnostics explainer with automated checks",
      ],
      highlights: [
        "Ported R's random number generator, mvtnorm and QUADPACK integration to TypeScript, so the browser matches the original R output to about 1e-11.",
        "Found and documented five bugs in the 2023 data encoding and likelihood. An 'As submitted' toggle keeps the original behaviour beside the corrected analysis.",
        "Added a four-chain Bayesian workflow (R-hat, ESS, MCSE, posterior predictive checks, prior sensitivity), which showed the HMC and EP encoding bug passes every convergence check and is caught only by a predictive check.",
        "An optional 'Explain these diagnostics' feature runs on the visitor's key and flags numbers or verdicts that contradict the R-hat and ESS thresholds.",
      ],
    },
    zh: {
      title: "通往后验的四条路",
      subject: "贝叶斯统计学习",
      summary:
        "贝叶斯统计学习课的作业：用 Laplace 近似、Metropolis-Hastings、哈密顿蒙特卡洛和期望传播四种方法，为一个小型剂量反应试验拟合逻辑回归。现在做成交互讲解站，可以逐次重现 2023 年的抽样链。",
      myRole: "个人作业。原始 R Markdown 分析和 2026 年的复活版都由我完成。",
      skills: [
        "贝叶斯逻辑回归",
        "Laplace 近似",
        "Metropolis-Hastings 抽样",
        "哈密顿蒙特卡洛",
        "期望传播",
        "收敛诊断（秩归一化 R-hat、bulk 与 tail ESS、MCSE）",
        "后验预测检验",
        "先验敏感性分析",
        "移植 R 的随机数生成器与 QUADPACK 数值积分",
        "带自动核查的 BYOK 诊断解读",
      ],
      highlights: [
        "把 R 的随机数生成器、mvtnorm 和 QUADPACK 数值积分移植成 TypeScript，浏览器结果与原 R 输出相差约 1e-11。",
        "找出并记录了 2023 年代码里五处数据编码和似然函数的 bug；“按原样提交”开关保留原始行为，可以和修正后的分析对照。",
        "补上四链贝叶斯工作流（R-hat、ESS、MCSE、后验预测检验、先验敏感性分析），发现 HMC 和 EP 的编码 bug 能通过所有收敛诊断，只有后验预测检验能发现。",
        "可选的“解释诊断结果”功能用访客自己的 key，会标出与 R-hat、ESS 阈值相矛盾的数字或结论。",
      ],
    },
  },
  {
    // Spec: team assignment due 22 May 2023 (noon), presentations 23 to 24 May,
    // but team commits run to 26 May and the report was built 26 May, so month.
    slug: "social-sense",
    subjectCode: "COMP90024",
    level: "master",
    term: { year: 2023, semester: 1 },
    assignmentDate: "2023-05",
    datePrecision: "month",
    team: ["Xuan Wang", "Wei Zhao", "Zongchao Xie", "Runqiu Fei"],
    areas: ["data-engineering", "statistics", "genai-eval"],
    capabilities: [
      "nlp",
      "parallel",
      "databases",
      "pipelines",
      "spatial",
      "regression",
      "intervals",
      "paired-tests",
      "parity-testing",
      "full-stack",
      "maps",
      "llm-evaluation",
      "grounded-llm",
      "byok",
    ],
    originalStack: [
      "Python",
      "mpi4py",
      "NLTK (VADER)",
      "Flask",
      "React 18",
      "Plotly",
      "CouchDB",
      "Ansible",
      "Docker Swarm",
      "Melbourne Research Cloud",
    ],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "MapLibre GL",
      "SQLite (libSQL)",
      "node-sql-parser",
      "Web Workers",
      "Vitest",
      "zod",
    ],
    liveUrl: "https://comp90024-social-sense.vercel.app",
    tourUrl: "https://comp90024-social-sense.vercel.app/tour",
    repoPublic: true,
    repoUrl: "https://github.com/rNLKJA/Australia-Social-Media-Analytics-on-the-Cloud",
    // Unlinked until the revival (PRs #17 and #18) is merged into main.
    repoLinked: false,
    status: "live",
    en: {
      title: "Social Sense",
      subject: "Cluster and Cloud Computing",
      summary:
        "Team 57's cloud analytics project, which scored 2.4 million geotagged tweets and 1.7 million Mastodon toots for sentiment and compared them with official income and crime data, revived as a read-only site with maps, linked charts and a reproducible data pipeline.",
      myRole:
        "Built the React front end for Team 57 and worked on data processing and API tools. I built the 2026 revival.",
      skills: [
        "Sentiment analysis with VADER",
        "MPI data processing",
        "CouchDB MapReduce views",
        "Spatial autocorrelation (Moran's I, LISA)",
        "OLS with HC3 robust standard errors",
        "Bootstrap intervals",
        "Small-area suppression",
        "Text-to-SQL with server-side validation",
        "LLM evaluation (execution accuracy, exact McNemar)",
        "BYOK AI audit logging",
      ],
      highlights: [
        "Re-ran the team's own Python on the surviving inputs with 18 parity checks against the 2023 dashboard, producing a 1.7 MB read-only SQLite database.",
        "Ported NLTK's tokeniser, WordNet lemmatiser and VADER to TypeScript; they match the original Python with no mismatches on 44,156 real toots.",
        "Added uncertainty and spatial statistics: t-based intervals per area, Moran's I with LISA cluster maps, and suppression of areas with fewer than 30 tweets. Both headline relationships are consistent with no association.",
        "Optional text-to-SQL on the visitor's own key: the server validates and runs one read-only query, answers must cite rows, and a 16-question harness measures execution accuracy.",
      ],
    },
    zh: {
      title: "Social Sense 社媒情绪看板",
      subject: "集群与云计算",
      summary:
        "Team 57 的云计算项目：给 240 万条带地理标签的推文和 170 万条 Mastodon 帖子打情感分，再和官方收入、犯罪数据对照。复活版是一个只读网站，有地图、联动图表和可复现的数据管线。",
      myRole:
        "在 Team 57 负责 React 前端，同时参与数据处理和 API 工具开发；2026 年的复活版由我搭建。",
      skills: [
        "基于 VADER 的情感分析",
        "MPI 数据处理",
        "CouchDB MapReduce 视图",
        "空间自相关（Moran's I、LISA）",
        "带 HC3 稳健标准误的 OLS",
        "Bootstrap 区间",
        "小区域数据屏蔽",
        "带服务器端校验的自然语言转 SQL",
        "LLM 评测（执行准确率、精确 McNemar 检验）",
        "BYOK AI 审计日志",
      ],
      highlights: [
        "在留存的数据上重跑团队原来的 Python 代码，对照 2023 年看板做了 18 项一致性检查，最终得到一个 1.7 MB 的只读 SQLite 数据库。",
        "把 NLTK 的分词、WordNet 词形还原和 VADER 移植成 TypeScript，在 44,156 条真实 Mastodon 帖子上与原 Python 结果零差异。",
        "补充不确定性和空间统计：各区域的 t 区间、Moran's I 与 LISA 聚类图，并屏蔽推文少于 30 条的区域。两个主要关系都与“无关联”一致。",
        "可选的自然语言转 SQL：用访客自己的 key 生成查询，由服务器校验后只读执行，回答必须引用数据行；另有 16 题评测集衡量执行准确率。",
      ],
    },
  },
  {
    // Canvas spec missing. The team README records "Last commit at 30th May 2021"
    // for the final deliverable; the exact due day is unknown, so month.
    slug: "snacks-in-a-van",
    subjectCode: "INFO30005",
    level: "undergraduate",
    term: { year: 2021, semester: 1 },
    assignmentDate: "2021-05",
    datePrecision: "month",
    team: ["Bin Liang", "Declan Gannon", "Khin Liew", "Wei Zhao"],
    areas: ["web", "statistics"],
    capabilities: [
      "full-stack",
      "web-security",
      "databases",
      "maps",
      "parity-testing",
      "survival",
      "experiment-design",
      "simulation",
      "paired-tests",
      "intervals",
      "grounded-llm",
      "byok",
    ],
    originalStack: [
      "Node.js",
      "Express",
      "Handlebars",
      "MongoDB Atlas",
      "Mongoose",
      "Passport",
      "Google Maps JS API",
      "Jest",
      "Heroku",
    ],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "SQLite (libSQL)",
      "Turso",
      "Drizzle ORM",
      "MapLibre GL",
      "SWR",
      "Vitest",
      "zod",
      "Vercel",
    ],
    liveUrl: "https://snacks-in-a-van.vercel.app",
    repoPublic: true,
    repoUrl: "https://github.com/rNLKJA/Unimelb-undergraduate-2021-INFO30005-Project",
    // Unlinked until the revival (PRs #2 and #3) is merged into main.
    repoLinked: false,
    status: "live",
    en: {
      title: "Snacks in a Van",
      subject: "Web Information Technologies",
      summary:
        "A two-portal ordering app for roving snack vans from our INFO30005 group project. Customers find the nearest open vans on a map and order ahead, and vendors run a live order board. Rebuilt as one Next.js app with demo accounts, operations analytics and an A/B test designer.",
      myRole:
        "In Group 4399 I designed the vendor app and built customer ordering, the outstanding-orders list, customer and vendor login, and the optional map and blog features. I rebuilt it in 2026.",
      skills: [
        "Full-stack web development",
        "Session authentication with bcrypt",
        "Parity testing against the original JavaScript",
        "Kaplan-Meier survival analysis",
        "A/B test design and power analysis",
        "Permutation tests and Newcombe intervals",
        "Append-only audit trail with database triggers",
        "BYOK AI with server-side record verification",
      ],
      highlights: [
        "Ported the 2021 business rules (nearest vans, order states, change window, pricing) to TypeScript, with parity tests that run the original JavaScript side by side.",
        "Operations analytics include a Kaplan-Meier time-to-fulfil curve and late-discount rates by van, each shown with its uncertainty and sample size.",
        "An A/B test designer for the late-discount rule covers sample size, a seeded simulation with a known injected effect, and a peeking warning backed by 10,000 A/A runs.",
        "Adds an append-only audit trail and an optional bring-your-own-key shift summary that never sees personal data.",
        "Production now runs on a shared Turso database, so a customer's order reaches the vendor board and the audit tables persist. Decision records explain the earlier per-instance demo storage and why it was replaced.",
      ],
    },
    zh: {
      title: "Snacks in a Van 流动餐车点单",
      subject: "Web 信息技术",
      summary:
        "INFO30005 小组项目做的流动餐车双端点单应用：顾客在地图上找到最近的营业餐车提前下单，摊主在实时订单看板上出餐。现已重建为单个 Next.js 应用，带演示账号、运营分析和 A/B 测试设计器。",
      myRole:
        "在 4399 小组负责摊主端设计，开发了顾客下单、待处理订单列表、顾客与摊主登录，以及地图和博客两个附加功能；2026 年由我重建。",
      skills: [
        "全栈 Web 开发",
        "基于 bcrypt 的会话认证",
        "与原版 JavaScript 的一致性测试",
        "Kaplan-Meier 生存分析",
        "A/B 测试设计与功效分析",
        "置换检验与 Newcombe 区间",
        "基于数据库触发器的仅追加审计日志",
        "带服务器端记录核验的 BYOK AI",
      ],
      highlights: [
        "把 2021 年的业务规则（最近餐车、订单状态、修改时限、计价）移植成 TypeScript，对照测试会让原版 JavaScript 并排运行。",
        "运营分析包括 Kaplan-Meier 出餐时间曲线和各餐车的迟到折扣率，每个数字都标出不确定性和样本量。",
        "为“迟到折扣”规则做了 A/B 测试设计器：样本量计算、注入已知效应的带种子模拟，以及基于 10,000 次 A/A 试验的提前偷看警告。",
        "新增仅可追加的审计日志，以及可选的 BYOK 班次小结，后者不接触任何个人数据。",
        "线上版本现已改用共享的 Turso 数据库，顾客下的单能送到摊主的订单看板，审计表也能长期保存；决策记录说明了早期按实例临时存储的做法，以及为什么换掉它。",
      ],
    },
  },
  {
    // No brief survives. Semester commits in the team repo end 12 Nov 2021 and
    // the task-list PDF was created 11 Nov 2021, so month.
    slug: "personal-crm",
    subjectCode: "COMP30022",
    level: "undergraduate",
    term: { year: 2021, semester: 2 },
    assignmentDate: "2021-11",
    datePrecision: "month",
    team: ["Bin Liang", "Hongji (Harrison) Huang", "Wei Zhao", "Yixiao Tian"],
    areas: ["web", "statistics", "genai-eval"],
    capabilities: [
      "full-stack",
      "web-security",
      "maps",
      "databases",
      "parity-testing",
      "intervals",
      "paired-tests",
      "llm-evaluation",
      "byok",
    ],
    originalStack: [
      "React 16",
      "Material UI",
      "Express",
      "MongoDB",
      "Mongoose",
      "Passport (JWT)",
      "Google Maps API",
      "Jest",
      "Heroku",
    ],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "SQLite (libSQL)",
      "Turso",
      "Drizzle ORM",
      "MapLibre GL",
      "jose",
      "Vitest",
      "zod",
      "Vercel",
    ],
    liveUrl: "https://comp30022-personal-crm.vercel.app",
    tourUrl: "https://comp30022-personal-crm.vercel.app/tour",
    repoPublic: true,
    repoUrl: "https://github.com/rNLKJA/Personal-Customer-Relation-Management-PCRM",
    // Unlinked until the revival (PRs #1 and #2) is merged into main.
    repoLinked: false,
    status: "live",
    en: {
      title: "4399 CRM",
      subject: "IT Project",
      summary:
        "A mobile-first personal CRM from our COMP30022 IT Project: keep track of contacts, log geo-tagged meetings, view them on a map and calendar, and swap contacts by QR code. Rebuilt as a single Next.js app with a 'Try as guest' sandbox, an Insights page and an optional AI assistant.",
      myRole:
        "Scrum Master for Team 4399 (Group 49) and a front-end developer on contacts, meeting records and the map. I rebuilt it in 2026.",
      skills: [
        "Scrum delivery",
        "Mobile-first UI design",
        "Session authentication with httpOnly cookies",
        "QR code contact exchange",
        "Geocoding and interactive maps",
        "Parity testing against the original functions",
        "Security hardening with owner-scoped queries",
        "Seeded bootstrap intervals",
        "Paired bootstrap and exact sign test",
        "LLM vs rule-based baseline evaluation",
        "BYOK AI with in-browser redaction",
      ],
      highlights: [
        "Ported the original search, sort, validation and contact-sync logic, with parity tests that load the 2021 functions straight from the coursework folder.",
        "Closed security gaps found during the port: queries are scoped to the signed-in owner, a constant reset bypass is gone and sessions use httpOnly cookies.",
        "An optional bring-your-own-key meeting-note assistant removes names, e-mails, phone numbers and addresses in the browser before any call, and a 32-note harness compares its follow-ups with a rule-based baseline note by note (paired bootstrap, exact sign test).",
        "Replaced the 2021 services: MapLibre with OpenFreeMap tiles and Photon geocoding instead of Google Maps, an on-screen demo inbox instead of Gmail, and a shared Turso database instead of MongoDB Atlas.",
        "'Try as guest' creates a private 24-hour sandbox with 25 contacts and 40 meetings. The Insights page shows meetings per week with a seeded bootstrap interval, and every account can export or delete everything stored about it.",
      ],
    },
    zh: {
      title: "4399 CRM 个人关系管理",
      subject: "IT 项目",
      summary:
        "COMP30022 IT 项目里我们做的移动优先个人 CRM：管理联系人，记录带地点的见面，在地图和日历上查看，还能扫二维码互加联系人。现已重建为单个 Next.js 应用，点“访客试用”就能直接体验，另有 Insights 统计页和可选的 AI 助手。",
      myRole:
        "4399 团队（第 49 组）的 Scrum Master，负责前端的联系人、见面记录和地图部分；2026 年由我重建。",
      skills: [
        "Scrum 交付",
        "移动优先界面设计",
        "基于 httpOnly cookie 的会话认证",
        "二维码交换联系人",
        "地理编码与交互地图",
        "与原有函数的一致性测试",
        "按所有者隔离查询的安全加固",
        "带随机种子的 bootstrap 区间",
        "配对 bootstrap 与精确符号检验",
        "LLM 与规则基线的对比评测",
        "浏览器内先脱敏的 BYOK AI",
      ],
      highlights: [
        "移植了原有的搜索、排序、校验和联系人同步逻辑，对照测试直接从课程代码目录加载 2021 年的函数来比对结果。",
        "移植时补上了发现的安全漏洞：查询只限登录用户自己的数据，重置密码接口不再接受固定的验证标记，会话改用 httpOnly cookie。",
        "可选的 BYOK 会议笔记助手在发出请求前，先在浏览器里去掉姓名、邮箱、电话和地址；另有 32 条笔记的评测集，把它给出的跟进建议与基于规则的基线逐条比较（配对 bootstrap、精确符号检验）。",
        "替换了 2021 年依赖的服务：地图从 Google Maps 换成 MapLibre 配 OpenFreeMap 和 Photon 地理编码；邮件改为页面内的演示收件箱，不再走 Gmail；数据库从 MongoDB Atlas 换成共享的 Turso。",
        "“访客试用”会生成一个 24 小时有效的私有沙盒，内含 25 位联系人和 40 条见面记录；Insights 页面按周统计见面次数，并给出带随机种子的 bootstrap 区间；每个账户都可以导出或删除与自己相关的全部数据。",
      ],
    },
  },
  {
    // Spec (proj2-spec-v1): due 11am Thu 25 May 2023; the final commits are the
    // same day.
    slug: "bandit-lab",
    subjectCode: "COMP90051",
    level: "master",
    term: { year: 2023, semester: 1 },
    assignmentDate: "2023-05-25",
    datePrecision: "day",
    team: [],
    areas: ["ml", "statistics", "genai-eval"],
    capabilities: [
      "experiment-design",
      "model-evaluation",
      "bayesian",
      "simulation",
      "intervals",
      "paired-tests",
      "seeded-rng",
      "parity-testing",
      "llm-evaluation",
      "byok",
    ],
    originalStack: ["Python", "NumPy", "SciPy", "Matplotlib", "Jupyter"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Web Workers",
      "WebAssembly",
      "KaTeX",
      "Vitest",
      "zod",
      "Anthropic SDK",
    ],
    liveUrl: "https://comp90051-bandit-lab.vercel.app",
    tourUrl: "https://comp90051-bandit-lab.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "Bandit Lab",
      subject: "Statistical Machine Learning",
      summary:
        "My multi-armed bandit project, revived as a browser lab: successive-elimination bandits that cope with late or lost feedback, Thompson sampling and Doubly-Adaptive Thompson Sampling, evaluated in 2023 by replaying 300,000 recorded news clicks. Now they race on a seeded synthetic log whose delays you can reshape, up to seven algorithms side by side.",
      myRole: "Individual project. I wrote the original notebook and built the 2026 revival.",
      skills: [
        "Successive-elimination bandits under delayed feedback",
        "Thompson sampling with Gaussian priors",
        "Doubly-Adaptive Thompson Sampling",
        "Offline replay evaluation with delayed rewards",
        "Bit-exact port of NumPy's PCG64 generator",
        "Bootstrap intervals over seeded repetitions",
        "Paired comparisons and effect sizes",
        "LLM-as-a-policy evaluation",
        "BYOK AI with a local audit log",
      ],
      highlights: [
        "Ported the five algorithms line for line to TypeScript running in a Web Worker, with NumPy's PCG64 generator, ziggurat normals and pairwise sums reproduced exactly, so the browser prints the notebook's results to the last digit.",
        "Where the notebook had a single run, each algorithm now replays over 20 seeded repetitions with bootstrap bands, paired comparisons against Thompson sampling, effect sizes and delay-sensitivity heatmaps.",
        "Visitors can shape per-arm Pareto delays, packet loss and reward-dependent lags, then scrub through the confidence bounds, eliminations and posterior draws inside each algorithm.",
        "An optional bring-your-own-key experiment lets a language model choose the arms, scored against Thompson sampling and UCB1 on the same seeds, with every call written to an exportable audit log.",
      ],
    },
    zh: {
      title: "多臂老虎机实验室",
      subject: "统计机器学习",
      summary:
        "统计机器学习课的个人项目：能应对延迟或丢失反馈的逐次淘汰（successive elimination）算法、Thompson 采样和 Doubly-Adaptive Thompson Sampling，2023 年通过回放 30 万条真实新闻点击日志来评估。如今复活成浏览器里的实验室，算法在带种子的合成日志上比拼，可以调整延迟分布，让最多七个算法同场比较。",
      myRole: "个人项目。原始 notebook 和 2026 年的复活版都由我完成。",
      skills: [
        "延迟反馈下的逐次淘汰算法",
        "高斯先验的 Thompson 采样",
        "Doubly-Adaptive Thompson Sampling",
        "带延迟奖励的离线回放评估",
        "逐位一致地移植 NumPy 的 PCG64 生成器",
        "基于带种子重复实验的 bootstrap 区间",
        "配对比较与效应量",
        "LLM 作为策略的评测",
        "BYOK AI 与本地审计日志",
      ],
      highlights: [
        "把五个算法逐行移植成在 Web Worker 中运行的 TypeScript，并精确复现 NumPy 的 PCG64 生成器、ziggurat 正态抽样和成对求和，浏览器打印的结果与 notebook 分毫不差。",
        "原 notebook 每个算法只跑一次；现在每个算法用 20 次带种子的重复回放，给出 bootstrap 区间、与 Thompson 采样的配对比较、效应量和延迟敏感性热力图。",
        "访客可以按臂设置 Pareto 延迟、丢包和随奖励变化的延迟，再逐帧查看每个算法内部的置信界、淘汰过程和后验抽样。",
        "可选的 BYOK 实验让语言模型来选臂，在相同种子下与 Thompson 采样和 UCB1 比较，每次调用都写入可导出的审计日志。",
      ],
    },
  },
  {
    // Kaggle in-class competition; no spec in the repo. The team report was
    // finalised on 27 Apr 2023 and the commits stop that day, so month.
    slug: "human-or-machine",
    subjectCode: "COMP90051",
    level: "master",
    term: { year: 2023, semester: 1 },
    assignmentDate: "2023-04",
    datePrecision: "month",
    team: ["Yifei Du", "Huihui He"],
    areas: ["ml", "statistics"],
    capabilities: [
      "classification",
      "nlp",
      "model-evaluation",
      "intervals",
      "paired-tests",
      "parity-testing",
    ],
    originalStack: [
      "Python",
      "Jupyter",
      "scikit-learn",
      "imbalanced-learn",
      "PyTorch",
      "mpi4py",
      "pandas",
    ],
    revivedStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Vitest"],
    liveUrl: "https://comp90051-human-or-machine.vercel.app",
    tourUrl: "https://comp90051-human-or-machine.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "Human or Machine?",
      subject: "Statistical Machine Learning",
      summary:
        "Team 27's detectors for a class Kaggle competition: decide whether a text was written by a person or a model when every word has been replaced by a number. Revived as a lab where the original weights score texts live in the browser, with a class-imbalance sandbox and a leak-free re-evaluation.",
      myRole:
        "Team 27 with Yifei Du and Huihui He. I worked on the MPI preprocessing and the CNN experiments, and shared the bag-of-words features with Yifei and the SMOTE and under-sampling comparison with both; Yifei built the SVM and SGD models and Huihui the logistic regression and word embeddings. I built the 2026 revival.",
      skills: [
        "Bag-of-words features on anonymised token ids",
        "Logistic regression and linear SVMs (SGD)",
        "Class imbalance: SMOTE and random under-sampling",
        "CNN experiments (ResNet, ShuffleNet) on count vectors",
        "Leak-free held-out re-evaluation",
        "Calibration, AUC and paired tests with intervals",
        "Exporting model weights for client-side scoring",
      ],
      highlights: [
        "Exported the six original detectors' weights once and score them in the browser; all 6,000 test predictions (six models by 1,000 texts) match the 2023 files.",
        "An interactive detector blends human and machine token profiles into a specimen and shows which token ids push the score each way.",
        "Re-checking in 2026 found that the 2023 validation split leaked copied machine texts. Re-fitted on a clean split, the domain-1 detector still separates the classes well, but a text-length baseline comes close, and both are reported with 95% intervals.",
        "A class-imbalance sandbox compares SMOTE with random under-sampling and shows what the notebooks' SMOTE step actually did, and an experiment journal records the meetings, the approaches tried and every leaderboard submission.",
      ],
    },
    zh: {
      title: "人还是机器？",
      subject: "统计机器学习",
      summary:
        "Team 27 为课内 Kaggle 竞赛做的检测器：在每个词都被换成数字编号的情况下，判断一段文字出自人还是模型。如今复活成实验室，原始权重在浏览器里实时给文本打分，另有类别不平衡沙盒和无泄漏的重新评估。",
      myRole:
        "与 Yifei Du、Huihui He 组成 Team 27。我负责 MPI 预处理和 CNN 实验，与 Yifei 一起做词袋特征，并与两位一起完成 SMOTE 与欠采样的比较；Yifei 负责 SVM 和 SGD 模型，Huihui 负责逻辑回归和词向量。2026 年的复活版由我搭建。",
      skills: [
        "基于匿名词编号的词袋特征",
        "逻辑回归与线性 SVM（SGD）",
        "类别不平衡处理：SMOTE 与随机欠采样",
        "把计数向量当作图像的 CNN 实验（ResNet、ShuffleNet）",
        "无泄漏的留出集重新评估",
        "带区间的校准、AUC 与配对检验",
        "导出模型权重，在浏览器端打分",
      ],
      highlights: [
        "一次性导出六个原始检测器的权重，在浏览器里打分；全部 6,000 个测试预测（六个模型各 1,000 条文本）与 2023 年的文件一致。",
        "交互式检测器把人写和机器生成的词编号分布混合成样本，实时显示哪些词编号把结果推向哪一边。",
        "2026 年复查发现，2023 年的验证集混入了重复的机器文本，存在泄漏。在干净的划分上重新拟合后，domain 1 的检测器依然能较好地区分两类，但只看文本长度的基线也相差不远；两者都附 95% 区间。",
        "类别不平衡沙盒比较 SMOTE 与随机欠采样，并揭示 notebook 里的 SMOTE 步骤实际做了什么；实验日志记录了组会、尝试过的方法和每一次排行榜提交。",
      ],
    },
  },
  {
    // Notebook header: 2021 S2 Project 1. The GitHub Classroom repo was last
    // pushed on 15 Aug 2021; the exact deadline is unconfirmed, so month.
    slug: "nyc-taxi-2019",
    subjectCode: "MAST30034",
    level: "undergraduate",
    term: { year: 2021, semester: 2 },
    assignmentDate: "2021-08",
    datePrecision: "month",
    team: [],
    areas: ["data-engineering", "statistics", "web"],
    capabilities: [
      "pipelines",
      "databases",
      "regression",
      "model-evaluation",
      "intervals",
      "maps",
      "parity-testing",
      "byok",
    ],
    originalStack: ["Python", "PySpark", "Spark MLlib", "pandas", "Folium", "Jupyter"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "DuckDB",
      "SQLite",
      "MapLibre GL",
      "Recharts",
      "Vitest",
      "zod",
      "Anthropic SDK",
    ],
    liveUrl: "https://mast30034-nyc-taxi.vercel.app",
    tourUrl: "https://mast30034-nyc-taxi.vercel.app/tour",
    repoPublic: true,
    repoUrl: "https://github.com/rNLKJA/Unimelb-undergraduate-2021-MAST30034-Project-1",
    status: "live",
    en: {
      title: "NYC Taxi 2019",
      subject: "Applied Data Science",
      summary:
        "My analysis of every 2019 New York yellow-cab trip, revived as an interactive site: the same cleaning rules re-run on more than 84 million records, joined to weather, permitted events and collisions, with zone maps, route lines and the 2021 regression estimating trip times in the browser.",
      myRole:
        "Individual project. I wrote the original PySpark notebook and built the 2026 revival.",
      skills: [
        "Cleaning 84 million rows in documented rounds",
        "Joining weather, event and collision data",
        "Elastic-net regression with hand-written 10-fold CV",
        "Temporal hold-out and residual diagnostics",
        "Robust standard errors and conformal intervals",
        "DuckDB pipelines with logged row counts",
        "Zone maps and route views with MapLibre GL",
        "BYOK plain-English questions with SQL review",
      ],
      highlights: [
        "Re-ran the 2021 cleaning rules as DuckDB SQL on TLC's current 2019 files. Apart from the raw files, which TLC has since re-issued, every row count lands within 0.003% of the notebook's and is logged beside it.",
        "The 2021 regression runs in the browser with every term behind a prediction shown, and the 2026 evaluation adds a temporal hold-out, robust standard errors, residual diagnostics and conformal intervals, where a simple lookup table turns out to beat it.",
        "Zone maps, busiest routes and day-by-day weather, events and collisions for all 263 taxi zones, served from a 15 MB read-only SQLite file holding aggregates only, with no trip-level records.",
        "An optional bring-your-own-key 'Ask the data' page turns plain-English questions into SQL that the visitor reviews before it runs, with every call labelled and logged.",
      ],
    },
    zh: {
      title: "纽约出租车 2019",
      subject: "应用数据科学",
      summary:
        "我对 2019 年纽约全部黄色出租车行程的个人分析项目，如今复活成交互网站：用同一套清洗规则重新处理 8,400 多万条记录，关联天气、获批活动和交通事故数据，配有出租车分区地图和路线视图，还能在浏览器里用 2021 年的回归模型估算行程时间。",
      myRole: "个人项目。原始 PySpark notebook 和 2026 年的复活版都由我完成。",
      skills: [
        "分轮次、有文档记录地清洗 8,400 万行数据",
        "关联天气、活动与交通事故数据",
        "手写 10 折交叉验证的弹性网回归",
        "时间留出集与残差诊断",
        "稳健标准误与共形预测区间",
        "逐步记录行数的 DuckDB 数据管线",
        "用 MapLibre GL 做分区地图与路线视图",
        "BYOK 自然语言提问，SQL 先审后跑",
      ],
      highlights: [
        "把 2021 年的清洗规则改写成 DuckDB SQL，在 TLC 现行的 2019 年数据上重跑。除了 TLC 后来重新发布的原始文件，其余每一步的行数都与 notebook 相差不到 0.003%，并与原数字并排记录。",
        "2021 年的回归模型在浏览器里运行，每个预测背后的各项都能看到；2026 年新增的评估包括时间留出集、稳健标准误、残差诊断和共形区间，结果发现一张简单的查找表反而更准。",
        "全部 263 个出租车分区的地图、最繁忙路线，以及逐日的天气、活动和事故数据，都来自一个 15 MB 的只读 SQLite 文件；网站只提供汇总数据，不含单条行程记录。",
        "可选的 BYOK“问数据”页面把自然语言问题转成 SQL，访客审阅后才会执行，每次调用都有标注和记录。",
      ],
    },
  },
  {
    // Assignment 3 spec: "Due time: 5 pm Friday May 26, 2023", the last of the
    // three assignments.
    slug: "glm-playground",
    subjectCode: "MAST90139",
    level: "master",
    term: { year: 2023, semester: 1 },
    assignmentDate: "2023-05-26",
    datePrecision: "day",
    team: [],
    areas: ["statistics"],
    capabilities: [
      "regression",
      "model-evaluation",
      "simulation",
      "parity-testing",
      "grounded-llm",
      "byok",
    ],
    originalStack: ["R", "R Markdown", "nnet", "MASS", "geepack", "ggplot2"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "KaTeX",
      "Vitest",
      "zod",
    ],
    liveUrl: "https://mast90139-glm-playground.vercel.app",
    tourUrl: "https://mast90139-glm-playground.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "GLM Playground",
      subject: "Statistical Modelling for Data Science",
      summary:
        "Three assignments on generalised linear models, revived as six interactive case studies: logistic, log-linear, multinomial, proportional-odds and GEE models refitted live in the browser and checked against the R code I submitted in 2023.",
      myRole:
        "Individual assignments. I wrote the original R Markdown analyses and built the 2026 revival.",
      skills: [
        "Logistic and binomial GLMs (dose-response, LD50)",
        "Poisson log-linear models for contingency tables",
        "Multinomial and proportional-odds models",
        "GEE with robust sandwich errors",
        "Stepwise model selection and analysis of deviance",
        "Simulated residual envelopes and influence checks",
        "Porting IRLS and Newton-Raphson fits to TypeScript",
        "BYOK explanations with automated number checks",
      ],
      highlights: [
        "Reimplemented glm, nnet::multinom, MASS::polr and geepack::geeglm in about 1,300 lines of dependency-free TypeScript; 49 parity checks hold them to R's output, typically within 1e-9.",
        "Each case study lets visitors change the inputs and recomputes estimates, intervals and tests on the spot, from beetle dose-response to a three-way table that shows Simpson's paradox.",
        "Added model checks the coursework did not ask for: simulated residual envelopes, influence, over-dispersion, profile-likelihood intervals, a proportional-odds test and GEE sensitivity, every simulation seeded. Slips in the 2023 write-up are shown beside the recomputed value.",
        "An optional bring-your-own-key reading aid explains each page from its numeric summary only, flags numbers it cannot trace and keeps an exportable audit log. The sensitive Assignment 1 survey appears only as model summaries.",
      ],
    },
    zh: {
      title: "GLM 演练场",
      subject: "数据科学统计建模",
      summary:
        "三份广义线性模型作业，如今复活成六个交互案例：逻辑回归、对数线性、多项、比例优势和 GEE 模型都在浏览器里实时重新拟合，并对照我 2023 年提交的 R 代码核对。",
      myRole: "个人作业。原始 R Markdown 分析和 2026 年的复活版都由我完成。",
      skills: [
        "逻辑回归与二项 GLM（剂量反应、LD50）",
        "列联表的 Poisson 对数线性模型",
        "多项 logit 与比例优势模型",
        "带稳健三明治标准误的 GEE",
        "逐步模型选择与偏差分析",
        "模拟残差包络与影响点诊断",
        "把 IRLS 与 Newton-Raphson 拟合移植成 TypeScript",
        "带数字自动核查的 BYOK 解读",
      ],
      highlights: [
        "用约 1,300 行无依赖的 TypeScript 重新实现 glm、nnet::multinom、MASS::polr 和 geepack::geeglm；49 项一致性检查把结果与 R 的输出对齐，误差通常在 1e-9 以内。",
        "每个案例都可以改动输入，当场重算估计值、区间和检验，从甲虫剂量反应实验到呈现辛普森悖论的三维列联表。",
        "补上了作业没有要求的模型检验：模拟残差包络、影响点、过度离散、轮廓似然区间、比例优势检验和 GEE 敏感性分析，所有模拟都固定随机种子。2023 年报告里的笔误与重算后的数值并排列出。",
        "可选的 BYOK 解读只依据每页的数值摘要来解释，会标出无法溯源的数字，并保存可导出的审计日志。作业 1 的调查数据较为敏感，只以模型摘要的形式出现。",
      ],
    },
  },
  {
    // No spec survives. Assignment 3, the later of the two kept, was knitted on
    // 18 Oct 2023, so month.
    slug: "compstats-playground",
    subjectCode: "MAST90083",
    level: "master",
    term: { year: 2023, semester: 2 },
    assignmentDate: "2023-10",
    datePrecision: "month",
    team: [],
    areas: ["statistics", "ml"],
    capabilities: [
      "regression",
      "model-evaluation",
      "classification",
      "simulation",
      "intervals",
      "paired-tests",
      "seeded-rng",
      "parity-testing",
      "byok",
    ],
    originalStack: ["R", "R Markdown", "glmnet", "e1071", "ISLR", "ggplot2"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "Web Workers",
      "KaTeX",
      "D3",
      "Vitest",
      "zod",
    ],
    liveUrl: "https://mast90083-compstats-playground.vercel.app",
    tourUrl: "https://mast90083-compstats-playground.vercel.app/tour",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "CompStats Playground",
      subject: "Computational Statistics & Data Science",
      summary:
        "Two assignments on ridge and lasso, autoregressive model selection, support vector machines and the bootstrap, ported line by line from R. Drag λ, rerun a Monte Carlo study or retrain an SVM, and the site still prints the numbers in the original PDFs.",
      myRole:
        "Individual assignments (Assignments 1 and 3). I wrote the original R Markdown and built the 2026 revival.",
      skills: [
        "Ridge and lasso regularisation paths",
        "Cross-validated tuning (cv.glmnet, e1071::tune)",
        "AR order selection with information criteria",
        "Monte Carlo simulation studies",
        "Multiclass SVMs (linear and radial kernels)",
        "Bootstrap bias correction",
        "Bit-exact port of R's Mersenne-Twister seeding",
        "Wilson intervals, McNemar tests and coverage checks",
      ],
      highlights: [
        "Ported glmnet's coordinate descent, LIBSVM's SMO solver, cv.glmnet and e1071::tune to TypeScript, with R's Mersenne-Twister seeding replayed bit for bit, so set.seed(10) draws the same folds and series as in 2023.",
        "Vitest holds the ports to reference outputs exported from R and to the printed PDFs, from 1e-10 relative error up to exact equality of counts.",
        "The 2026 upgrade adds Wilson intervals on simulated rates and error rates, paired tests wherever two methods share the same data, repeated cross-validation and coverage checks.",
        "A known bug in the 2023 model-selection code can be toggled on and off, and the bootstrap page corrects the submission's claim that the bias-corrected estimator is unbiased. An optional bring-your-own-key AI explainer keeps an audit log.",
      ],
    },
    zh: {
      title: "计算统计演练场",
      subject: "计算统计与数据科学",
      summary:
        "两份作业，涵盖岭回归与 Lasso、自回归模型定阶、支持向量机和 bootstrap，代码从 R 逐行移植过来。拖动 λ、重跑蒙特卡洛模拟或重新训练 SVM，网站给出的数字仍与原 PDF 一致。",
      myRole: "个人作业（作业 1 与作业 3）。原始 R Markdown 和 2026 年的复活版都由我完成。",
      skills: [
        "岭回归与 Lasso 正则化路径",
        "交叉验证调参（cv.glmnet、e1071::tune）",
        "用信息准则为 AR 模型定阶",
        "蒙特卡洛模拟研究",
        "多类别 SVM（线性核与径向核）",
        "Bootstrap 偏差校正",
        "逐位一致地移植 R 的 Mersenne-Twister 播种",
        "Wilson 区间、McNemar 检验与覆盖率检查",
      ],
      highlights: [
        "把 glmnet 的坐标下降、LIBSVM 的 SMO 求解器、cv.glmnet 和 e1071::tune 移植成 TypeScript，并逐位重现 R 的 Mersenne-Twister 播种，set.seed(10) 抽出的交叉验证折和模拟序列与 2023 年完全相同。",
        "Vitest 用从 R 导出的参考结果和原 PDF 上的数字检验移植版，精度从 1e-10 的相对误差到计数完全相等。",
        "2026 年的升级为模拟比率和错误率加上 Wilson 区间，凡是两种方法共用同一份数据时都做配对检验，另有重复交叉验证和覆盖率检查。",
        "2023 年模型选择代码里的已知 bug 可以一键开关；bootstrap 页面纠正了原提交中“偏差校正后的估计量无偏”的说法。可选的 BYOK AI 解读会保留审计日志。",
      ],
    },
  },
  {
    // Assignment 1 spec: due 11 Sep 2023. No Assignment 3 spec survives; its
    // files were last saved on 22 Oct 2023, so month.
    slug: "multivariate-lab",
    subjectCode: "MAST90138",
    level: "master",
    term: { year: 2023, semester: 2 },
    assignmentDate: "2023-10",
    datePrecision: "month",
    team: [],
    areas: ["statistics", "ml"],
    capabilities: [
      "dimensionality-reduction",
      "classification",
      "model-evaluation",
      "parity-testing",
    ],
    originalStack: ["R", "R Markdown", "MASS", "randomForest", "pls", "rpart", "ggplot2"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "KaTeX",
      "Web Workers",
      "Vitest",
    ],
    liveUrl: "https://mast90138-multivariate-lab.vercel.app",
    repoPublic: false,
    repoUrl: "",
    status: "live",
    en: {
      title: "Multivariate Lab",
      subject: "Multivariate Statistics for Data Science",
      summary:
        "Two assignments on covariance, PCA and high-dimensional classification, revived as three labs: a covariance and eigen playground, a wheat-seeds PCA explorer, and the story of how 365 days of rainfall tell northern and southern Australian weather stations apart.",
      myRole:
        "Individual assignments (Assignments 1 and 3). I wrote the original R Markdown and built the 2026 revival, which I am still extending.",
      skills: [
        "Covariance matrices and eigendecomposition",
        "Principal component analysis",
        "Partial least squares",
        "PCA with logistic regression and hand-written LOOCV",
        "Random forests tuned by out-of-bag error",
        "Classification trees (rpart)",
        "Porting R's glm.fit, kernel PLS and rpart to TypeScript",
      ],
      highlights: [
        "Ported a Jacobi eigen-solver, R's glm.fit with LINPACK's pivoting QR, kernel PLS and rpart's tree growing to TypeScript, checked against R in the test suite, so the browser recomputes the wheat PCA, every logistic fit and the PLS tree.",
        "Wherever the 2023 work had a bug, the lab offers an 'As submitted' and 'Corrected' switch, and the covariance playground corrects one of the original answers.",
        "Fixing the LOOCV and test-set scaling bugs in the rainfall classifiers brings the logistic regression and the classification tree down to one test error out of 41 (the random forest stays at three), and late-January rainfall turns out to be the most informative stretch of the year.",
      ],
    },
    zh: {
      title: "多元统计实验室",
      subject: "面向数据科学的多元统计",
      summary:
        "两份关于协方差、主成分分析和高维分类的作业，如今复活成三个实验室：协方差与特征分解演练场、小麦种子 PCA 浏览器，以及用一年 365 天降雨量区分澳大利亚南北气象站的分析故事。",
      myRole:
        "个人作业（作业 1 与作业 3）。原始 R Markdown 由我完成，2026 年的复活版也由我搭建，目前仍在完善中。",
      skills: [
        "协方差矩阵与特征分解",
        "主成分分析",
        "偏最小二乘",
        "手写 LOOCV 的 PCA 加逻辑回归",
        "用袋外误差调参的随机森林",
        "分类树（rpart）",
        "把 R 的 glm.fit、核 PLS 和 rpart 移植成 TypeScript",
      ],
      highlights: [
        "把 Jacobi 特征值求解器、R 的 glm.fit（含 LINPACK 选主元 QR）、核 PLS 和 rpart 的建树算法移植成 TypeScript，并在测试中对照 R 核对，浏览器可以重算小麦数据的 PCA、每个逻辑回归拟合和 PLS 树。",
        "凡是 2023 年作业有 bug 的地方，实验室都提供“按原样提交”与“修正后”切换；协方差演练场还纠正了原答案中的一处错误。",
        "修正降雨分类器中 LOOCV 和测试集标准化的 bug 后，逻辑回归和分类树在 41 个测试样本上都只错 1 个（随机森林仍错 3 个）；分析还发现，一月下旬的降雨量最能区分南北。",
      ],
    },
  },
  {
    // Group project, 2024 S1. No spec in the repo; the final notebook and README
    // commits are on 26 May 2024, so month.
    slug: "climate-claim-checker",
    subjectCode: "COMP90042",
    level: "master",
    term: { year: 2024, semester: 1 },
    assignmentDate: "2024-05",
    datePrecision: "month",
    team: ["Wei Zhao", "Xuan Wang"],
    areas: ["ml"],
    capabilities: [
      "nlp",
      "text-processing",
      "classification",
      "model-evaluation",
      "databases",
      "parity-testing",
    ],
    originalStack: ["Python", "Google Colab", "pandas", "NLTK", "scikit-learn", "PyTorch"],
    revivedStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "SQLite",
      "Recharts",
      "Vitest",
      "zod",
    ],
    liveUrl: "https://comp90042-climate-fact-check.vercel.app",
    repoPublic: true,
    repoUrl: "https://github.com/rNLKJA/Automated-Fact-Checking-System-for-Climate-Change-Claims",
    status: "live",
    en: {
      title: "Climate Claim Checker",
      subject: "Natural Language Processing",
      summary:
        "Our group's two-stage fact-checker for climate-science claims: TF-IDF retrieval over about 1.2 million Wikipedia passages, then a Transformer trained from scratch labels each claim. Revived so visitors can check a claim of their own or browse the 154 development claims, with the original pipeline re-run faithfully, weak results included.",
      myRole:
        "Group project with Wei Zhao and Xuan Wang. I worked on the system design, preprocessing, TF-IDF evidence retrieval, the report and the presentation; Wei built the Transformer and LSTM classifiers, and Xuan tested and debugged the retrieval, led the literature review and co-wrote the report and presentation. I built the 2026 revival, which I am still extending.",
      skills: [
        "TF-IDF keyword extraction and cosine-similarity retrieval",
        "Text preprocessing (contractions, stopwords, Porter stemming)",
        "Transformer classifier trained from scratch",
        "Evidence F-score, accuracy and harmonic-mean evaluation",
        "Parity-tested TypeScript port down to NLTK's stemmer",
        "Read-only SQLite passage index",
      ],
      highlights: [
        "Ported every step of the 2024 notebook to TypeScript and checked it against the original Python, down to NLTK's Porter stemmer and the order in which NumPy breaks ties. Re-running the retrieval rule over all 1.19 million passages reproduces the reported development evidence score to every printed digit.",
        "Re-running the code in 2026 showed that the Transformer encoder mixed claims within a batch instead of words within a claim, so on a single claim it reduces to a per-word lookup table, which makes every prediction on the site fully explainable.",
        "It also showed that the committed notebook differs from the code behind the reported results, and that a stray vocabulary term padded the tags of 14% of evidence passages. All three retrieval variants are reproduced: the submitted scoring rule, the notebook's version that counts similarity twice, and its final cell that passes raw text instead of stems.",
        "The weak spots are stated plainly: retrieval found the right passages for only 13 of the 154 development claims, and the retrained classifier never predicts two of the four verdicts, the class-imbalance problem the report warned about.",
      ],
    },
    zh: {
      title: "气候声明核查器",
      subject: "自然语言处理",
      summary:
        "我们小组为气候科学声明做的两阶段事实核查系统：先用 TF-IDF 在约 120 万条维基百科段落中检索证据，再由从零训练的 Transformer 给声明打标签。复活后访客可以输入自己的声明，也可以浏览 154 条开发集声明；原始流程如实重跑，薄弱的结果也照样呈现。",
      myRole:
        "与 Wei Zhao、Xuan Wang 合作的小组项目。我负责系统设计、预处理、TF-IDF 证据检索以及报告和展示；Wei 负责 Transformer 与 LSTM 分类器，Xuan 负责检索的测试与调试和文献综述，并参与报告和展示。2026 年的复活版由我搭建，目前仍在完善中。",
      skills: [
        "TF-IDF 关键词抽取与余弦相似度检索",
        "文本预处理（缩写展开、停用词、Porter 词干提取）",
        "从零训练的 Transformer 分类器",
        "证据 F 值、准确率与调和平均评估",
        "细到 NLTK 词干提取器的 TypeScript 一致性移植",
        "只读 SQLite 段落索引",
      ],
      highlights: [
        "把 2024 年 notebook 的每一步移植成 TypeScript，并对照原版 Python 核对，细到 NLTK 的 Porter 词干提取器和 NumPy 处理并列值的顺序。在全部 119 万条段落上重跑检索规则，开发集的证据 F 值与报告中印出的每一位都一致。",
        "2026 年重跑发现，Transformer 编码器混合的是同一批次里的不同声明，而不是同一条声明里的词；因此对单条声明而言，它等价于一张逐词打分的查找表，网站上的每个预测都能完整解释。",
        "重跑还发现，提交到 GitHub 的 notebook 与报告结果背后的代码并不一致，另有一个混入词表的多余词项出现在 14% 证据段落的标签里。三种检索变体都已复现：提交时的打分规则、notebook 里把相似度重复计算的版本，以及最后一个单元格传入原始文本而非词干的版本。",
        "如实呈现短板：检索只为 154 条开发集声明中的 13 条找到了正确段落；重新训练的分类器从不预测四种结论中的两种，正是报告讨论中提醒过的类别不平衡问题。",
      ],
    },
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const isZh = (locale) => locale === "zh-Hans";

/** Oldest first; assignmentDate is ISO (YYYY-MM or YYYY-MM-DD), so strings sort. */
function byAssignmentDate(a, b) {
  return a.assignmentDate.localeCompare(b.assignmentDate) || a.slug.localeCompare(b.slug);
}

/**
 * The visible date at its recorded precision ("3 Apr 2024" / "May 2022"), or
 * null for term-only entries (the page shows the semester instead), plus the
 * machine-readable value for <time dateTime> and JSON-LD.
 */
function dateFields(p, locale) {
  if (p.datePrecision === "day") {
    return { dateLabel: formatAsOf(p.assignmentDate, locale), dateTime: p.assignmentDate };
  }
  if (p.datePrecision === "month") {
    return { dateLabel: formatMonth(p.assignmentDate, locale), dateTime: p.assignmentDate };
  }
  return { dateLabel: null, dateTime: String(p.term.year) };
}

/** Items present in every list, in the order of the first list. */
function common(lists) {
  if (!lists.length) return [];
  return lists[0].filter((item) => lists.every((list) => list.includes(item)));
}

function localiseProject(p, locale, sharedStack) {
  const { en, zh, repoUrl, repoPublic, repoLinked, ...base } = p;
  return {
    ...base,
    ...(isZh(locale) ? zh : en),
    ...dateFields(p, locale),
    // The stack every revival shares is stated once on the page; cards list the rest.
    revivedExtras: p.revivedStack.filter((s) => !sharedStack.includes(s)),
    // Private repositories are never linked, whatever repoUrl holds, and public
    // ones only once their main branch holds the revival.
    repoUrl: repoPublic && repoLinked !== false && repoUrl ? repoUrl : null,
    tourUrl: p.tourUrl || null,
  };
}

function degreeFor(level, locale) {
  const entry = EDUCATION.find((e) => e.id === LEVEL_DEGREE[level]);
  if (!entry) return null;
  const copy = isZh(locale) ? entry.zh : entry.en;
  return { role: copy.role, period: copy.period };
}

/** Everything /projects/coursework renders, for one locale. Called from getStaticProps. */
export function getCoursework(locale = "en-AU") {
  const sharedStack = common(COURSEWORK.map((p) => p.revivedStack));
  const projects = [...COURSEWORK]
    .sort(byAssignmentDate)
    .map((p) => localiseProject(p, locale, sharedStack));
  const years = projects.map((p) => p.term.year);
  const label = (c) => (isZh(locale) ? c.zh : c.en);

  // A skill every project shows cannot tell projects apart, so it is named once
  // above the matrix instead of filling a row of dots (and is not a filter).
  const inEvery = new Set(common(projects.map((p) => p.capabilities)));

  return {
    asOf: COURSEWORK_AS_OF,
    university: UNIVERSITY,
    projects,
    levels: LEVELS,
    degrees: Object.fromEntries(LEVELS.map((l) => [l, degreeFor(l, locale)])),
    areas: AREAS,
    skillGroups: SKILL_GROUPS,
    sharedStack,
    sharedCapabilities: CAPABILITIES.filter((c) => inEvery.has(c.id)).map(label),
    capabilities: CAPABILITIES.filter((c) => !inEvery.has(c.id)).map((c) => ({
      id: c.id,
      group: c.group,
      label: label(c),
      projects: projects.filter((p) => p.capabilities.includes(c.id)).map((p) => p.slug),
    })),
    stats: {
      projects: projects.length,
      subjects: new Set(projects.map((p) => p.subjectCode)).size,
      from: Math.min(...years),
      to: Math.max(...years),
      withTeam: projects.filter((p) => p.team.length > 0).length,
    },
  };
}
