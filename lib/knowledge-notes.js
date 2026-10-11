/**
 * Concept notes: short pages on one idea, each filed under a Knowledge topic.
 *
 * A topic page (/knowledge/<topic>) is a long explainer with a fixed arc. A
 * note (/knowledge/notes/<slug>) goes deeper on one idea from it, most with a
 * small widget to try. Notes were first drafted in my UOM-DS wiki (2023) and
 * are rewritten from scratch here.
 *
 * This registry is plain JS (no JSX) so the page index (⌘K and /info/site-map),
 * the sitemap, check:career and KnowledgeLayout can all read it.
 *
 * Each note has:
 * - slug: the URL segment under /knowledge/notes/.
 * - parent: the topic slug it sits under (must be a live topic).
 * - status: "live" is published. "draft" has no page yet.
 * - order: position among the parent's notes.
 * - title, note (one line), readingTime: { en, zh }.
 * - keywords: extra search terms for the ⌘K palette.
 * - wiki: the wiki pages it was drafted from (provenance only, never linked).
 * - updated: last rewrite, YYYY-MM-DD.
 *
 * A live note needs pages/knowledge/notes/<slug>.jsx and
 * components/knowledge/notes/<slug>.jsx. npm run check:career checks this.
 */
export const KNOWLEDGE_NOTES = [
  {
    slug: "exploration-vs-exploitation",
    parent: "reinforcement-learning",
    status: "live",
    order: 1,
    title: { en: "Exploration vs Exploitation", zh: "探索与利用" },
    note: {
      en: "Why a learner has to try options that look worse, and how ε-greedy and UCB1 decide when.",
      zh: "学习者为什么要去试看起来更差的选项，以及 ε-贪心和 UCB1 怎么决定什么时候去试。",
    },
    readingTime: { en: "~6 min read", zh: "约 6 分钟阅读" },
    keywords: "multi-armed bandit epsilon-greedy UCB regret 多臂老虎机 遗憾",
    wiki: ["Exploration-vs-Exploitation", "Multi-armed-Bandit-vs.-Experts"],
    updated: "2026-10-09",
  },
  {
    slug: "thresholds-roc-auc",
    parent: "model-evaluation",
    status: "live",
    order: 1,
    title: { en: "Thresholds and ROC-AUC", zh: "分类阈值与 ROC 曲线" },
    note: {
      en: "Why a classifier has a threshold, why ROC curves show the trade-off between sensitivity and specificity, and what AUC measures.",
      zh: "分类器为什么有阈值，ROC 曲线怎样展示真正率和假正率之间的权衡，AUC 衡量什么。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "ROC AUC threshold precision recall FPR TPR",
    wiki: ["ROC-AOC", "Evaluation-Matrix"],
    updated: "2026-10-15",
  },
  {
    slug: "amdahl-vs-gustafson",
    parent: "cluster-cloud-computing",
    status: "live",
    order: 1,
    title: { en: "Amdahl's vs Gustafson's Law", zh: "阿姆达尔与古斯塔夫森定律" },
    note: {
      en: "Why two formulas for parallel speed-up give different limits, and when to use each.",
      zh: "两个平行加速公式为什么给出不同的极限，以及什么时候用哪个。",
    },
    readingTime: { en: "~4 min read", zh: "约 4 分钟阅读" },
    keywords: "Amdahl Gustafson speed-up parallel scaling",
    wiki: ["COMP90024---Cluster-and-Cloud-Computing"],
    updated: "2026-10-15",
  },
  {
    slug: "running-jobs-on-spartan",
    parent: "cluster-cloud-computing",
    status: "live",
    order: 2,
    title: { en: "Running Jobs on Spartan", zh: "在 Spartan 上运行任务" },
    note: {
      en: "How to write a Slurm job script and submit it to a cluster, with a builder that shows the header.",
      zh: "怎样写 Slurm 任务脚本并提交到集群，附带一个显示头部的生成工具。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "Slurm HPC cluster job submission SBATCH",
    wiki: ["Guide:-How-to-run-slurm-Job-on-Spartan", "Loading-VirtualEnv-in-Spartan"],
    updated: "2026-10-15",
  },
  {
    slug: "learning-with-expert-advice",
    parent: "reinforcement-learning",
    status: "live",
    order: 2,
    title: { en: "Learning with Expert Advice", zh: "向专家学习" },
    note: {
      en: "Why a learner can ask multiple experts and use a multiplicative-weight rule to track the best one.",
      zh: "学习者为什么可以问多个专家，并用乘法权重规则来追踪最好的。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "expert advice multiplicative weight regret",
    wiki: ["Multi-armed-Bandit-vs.-Experts"],
    updated: "2026-10-15",
  },
  {
    slug: "gradient-descent-variants",
    parent: "calculus-optimisation",
    status: "live",
    order: 1,
    title: { en: "Gradient Descent Variants", zh: "梯度下降的变种" },
    note: {
      en: "Why mini-batch, momentum and adaptive learning rates help, with a racer that shows the paths on a non-convex loss surface.",
      zh: "小批量、动量和自适应学习率有什么好处，附带一个展示非凸损失面上最优化路径的比赛工具。",
    },
    readingTime: { en: "~6 min read", zh: "约 6 分钟阅读" },
    keywords: "SGD momentum Adam batch size learning rate",
    wiki: ["Offline-Learning", "How-loss-function-works"],
    updated: "2026-10-15",
  },
  {
    slug: "rest-vs-graphql",
    parent: "web-information-technology",
    status: "live",
    order: 1,
    title: { en: "REST vs GraphQL", zh: "REST 与 GraphQL" },
    note: {
      en: "Why REST fetches related resources in separate requests while GraphQL shapes one request to the schema you need.",
      zh: "为什么 REST 用多个请求获取关联资源，而 GraphQL 可以把一个请求调整成你需要的形状。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "REST GraphQL API fetch over-fetching schema",
    wiki: ["REST-vs.-GraphQL"],
    updated: "2026-10-15",
  },
  {
    slug: "graph-convolution-layer",
    parent: "graph-neural-networks",
    status: "live",
    order: 1,
    title: { en: "Graph Convolution Layer", zh: "图卷积层" },
    note: {
      en: "Why graph convolutions average neighbour features with a renormalised adjacency, and what each step does.",
      zh: "图卷积为什么用重新规范化的邻接矩阵来平均邻居特征，以及每一步做什么。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "GCN graph neural network message passing adjacency",
    wiki: ["Graph-Convolution-Networks---Deep-Learning-After-You-Drop-The-Camera"],
    updated: "2026-10-15",
  },
  {
    slug: "risk-and-pac-learning",
    parent: "statistical-machine-learning",
    status: "live",
    order: 1,
    title: { en: "Risk and PAC Learning", zh: "风险与 PAC 学习" },
    note: {
      en: "How expected risk splits into estimation and approximation error, and what probably approximately correct means.",
      zh: "期望风险怎样分解为估计误差和近似误差，以及 PAC 学习是什么意思。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "PAC learning generalization estimation error approximation error",
    wiki: ["Risk", "PAC-(Probability-Approximately-Correct)"],
    updated: "2026-10-15",
  },
  {
    slug: "glm-goodness-of-fit",
    parent: "statistical-modelling",
    status: "live",
    order: 1,
    title: { en: "Goodness of Fit in GLM", zh: "GLM 中的拟合优度" },
    note: {
      en: "Why Pearson's X² and deviance both measure fit to grouped data, and why they can disagree.",
      zh: "Pearson X² 和偏差为什么都衡量分组数据的拟合，以及为什么它们可能不一致。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "GLM deviance Pearson X² goodness-of-fit",
    wiki: ["Test-of-adequacy-(or-goodness)-of-fit", "Parameter-Estimation"],
    updated: "2026-10-15",
  },
  {
    slug: "filling-gaps-in-time-series",
    parent: "time-series-analysis",
    status: "live",
    order: 1,
    title: { en: "Filling Gaps in Time Series", zh: "时间序列中的缺失值" },
    note: {
      en: "Why forward fill, backward fill and interpolation work differently, and why backward fill leaks future information.",
      zh: "前向填充、后向填充和插值为什么效果不同，以及为什么后向填充会泄露未来信息。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "time series missing values forward fill backward fill",
    wiki: [
      "Backward-filling-and-Forward-filling",
      "Handling-missing-values-in-time-series-analysis",
    ],
    updated: "2026-10-15",
  },
  {
    slug: "study-designs",
    parent: "causal-inference",
    status: "live",
    order: 1,
    title: { en: "Study Designs", zh: "研究设计" },
    note: {
      en: "Why case-control, cohort and cross-sectional studies estimate different quantities, and when to use each.",
      zh: "病例对照、队列和横断面研究为什么估计不同的量，以及什么时候用哪个。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "case-control cohort cross-sectional odds ratio risk ratio",
    wiki: ["Case-Control-vs.-Cohort-vs.-Cross-Sectional-Study"],
    updated: "2026-10-15",
  },
  {
    slug: "alpha-beta-pruning",
    parent: "artificial-intelligence",
    status: "live",
    order: 1,
    title: { en: "Alpha-Beta Pruning", zh: "α-β 剪枝" },
    note: {
      en: "Why a game tree search can skip branches that cannot affect the best move, and when move ordering helps.",
      zh: "博弈树搜索为什么可以跳过不会影响最优着法的分支，以及什么时候着法排序有帮助。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "alpha-beta pruning minimax game tree",
    wiki: ["Artificial-Intelligence"],
    updated: "2026-10-15",
  },
  {
    slug: "auctions-and-mechanism-design",
    parent: "artificial-intelligence",
    status: "live",
    order: 2,
    title: { en: "Auctions and Mechanism Design", zh: "拍卖与机制设计" },
    note: {
      en: "Why a second-price sealed-bid auction makes truthful bidding dominant, and what that tells you about incentives.",
      zh: "第二价格密封拍卖为什么让诚实出价成为主导战略，以及这对激励有什么启示。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "auction Vickrey mechanism design incentive",
    wiki: ["Artificial-Intelligence"],
    updated: "2026-10-15",
  },
  {
    slug: "cap-sharding-replication",
    parent: "cluster-cloud-computing",
    status: "live",
    order: 3,
    title: { en: "CAP, Sharding and Replication", zh: "CAP 与分片复制" },
    note: {
      en: "Why you cannot have consistency, availability and partition tolerance at once, and why databases make different choices.",
      zh: "为什么你不能同时有一致性、可用性和分片容错，以及为什么数据库要做不同的权衡。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "CAP theorem consistency availability partition sharding replication",
    wiki: ["COMP90024---Cluster-and-Cloud-Computing"],
    updated: "2026-10-15",
  },
  {
    slug: "vms-vs-containers",
    parent: "cluster-cloud-computing",
    status: "live",
    order: 4,
    title: { en: "VMs vs Containers", zh: "虚拟机与容器" },
    note: {
      en: "Why containers share the host kernel while VMs run a full OS, and what each is good for.",
      zh: "容器为什么共享主机内核，而虚拟机运行完整的操作系统，以及各自的用途。",
    },
    readingTime: { en: "~4 min read", zh: "约 4 分钟阅读" },
    keywords: "container VM Docker virtualisation orchestration",
    wiki: ["COMP90024---Cluster-and-Cloud-Computing"],
    updated: "2026-10-15",
  },
  {
    slug: "grammar-of-graphics",
    parent: "data-visualisation",
    status: "live",
    order: 1,
    title: { en: "Grammar of Graphics", zh: "图形语法" },
    note: {
      en: "Why ggplot layers—data, aesthetics, geoms, stats, scales, coordinates—let you build any chart from a few rules.",
      zh: "ggplot 的图层为什么能让你用几条规则搭建任何图表。",
    },
    readingTime: { en: "~5 min read", zh: "约 5 分钟阅读" },
    keywords: "ggplot grammar of graphics visualization",
    wiki: ["ggplot-layers"],
    updated: "2026-10-15",
  },
];

export const NOTE_PREFIX = "/knowledge/notes/";

export const noteHref = (slug) => `${NOTE_PREFIX}${slug}`;

const lang = (locale) => (locale === "zh-Hans" ? "zh" : "en");

/** Live notes under one topic, in order. */
export function notesFor(topicSlug) {
  return KNOWLEDGE_NOTES.filter((n) => n.status === "live" && n.parent === topicSlug).sort(
    (a, b) => a.order - b.order
  );
}

/** The registry entry for a note slug ("exploration-vs-exploitation"), or undefined. */
export function findNote(slug) {
  return KNOWLEDGE_NOTES.find((n) => n.slug === slug);
}

/**
 * Footer links for a note: the sibling before and after it under the same
 * topic. The first note points back to its topic, and the last one points
 * back to the topic too unless that link is already on the left.
 * `parent` is { href, label } in the visitor's language.
 */
export function noteNeighbours(slug, parent, locale) {
  const note = findNote(slug);
  if (!note) return {};
  const siblings = notesFor(note.parent);
  const i = siblings.findIndex((n) => n.slug === slug);
  const link = (n) => n && { href: noteHref(n.slug), label: n.title[lang(locale)] };
  const prev = link(siblings[i - 1]) || parent;
  const next = link(siblings[i + 1]) || (prev === parent ? null : parent);
  return { prev, next };
}

/** Title, line and reading time of a note in the visitor's language. */
export function noteCopy(note, locale) {
  const l = lang(locale);
  return {
    title: note.title[l] || note.title.en,
    note: note.note[l] || note.note.en,
    readingTime: note.readingTime[l] || note.readingTime.en,
  };
}
