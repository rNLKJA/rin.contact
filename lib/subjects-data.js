/**
 * Every University of Melbourne subject Rin completed, for the "Subjects I
 * studied" section of /skills: 24 in the Bachelor of Science (Data Science) and
 * 12 in the Master of Data Science. Codes, names and years were checked against
 * UNIMELB_COURSEWORK_INVENTORY.md and the academic transcript.
 *
 * Site rule: this file carries no results of any kind (no marks, grades, WAM,
 * credit points or rankings). lib/skills-check.js fails the build if a record
 * gains a key that is not declared below.
 *
 * Record shape:
 *   code     subject code, e.g. "COMP10001"
 *   level    "undergraduate" | "master" (maps to EDUCATION bsc / mds)
 *   year     the year the subject was completed
 *   term     1 | 2 | "winter" | "summer" | null (null shows the year only)
 *   en, zh   subject name (proper nouns stay in English in both locales)
 *   skills   skill ids from lib/skills-taxonomy.js (the topics it taught)
 *   notes    /knowledge slugs written on the subject's topics
 *   related  null | { href, kind: "caseStudy" | "role" } for work that grew out of it
 *
 * 2019 subjects are semester 2: the course started on 29 Jul 2019.
 * Revived labs are not listed here; getSubjects() derives them from
 * COURSEWORK.subjectCode, so the two lists cannot drift apart.
 */

import { EDUCATION } from "./career-data.js";
import { COURSEWORK } from "./coursework-data.js";

/** The date this list was last checked against the transcript. */
export const SUBJECTS_AS_OF = "2026-10-08";

export const SUBJECT_LEVELS = ["undergraduate", "master"];
const LEVEL_DEGREE = { undergraduate: "bsc", master: "mds" };
const TERM_ORDER = ["summer", 1, "winter", 2, null];

/** The fields a subject record may carry. Anything else fails the check. */
export const SUBJECT_KEYS = [
  "code",
  "level",
  "year",
  "term",
  "en",
  "zh",
  "skills",
  "notes",
  "related",
];

const s = (code, level, year, term, en, zh, skills, notes = [], related = null) => ({
  code,
  level,
  year,
  term,
  en,
  zh,
  skills,
  notes,
  related,
});

const UG = "undergraduate";
const MS = "master";

export const SUBJECTS = [
  // ── Bachelor of Science (Data Science), 2019 to 2022 ──────────────────────
  s("COMP10001", UG, 2019, 2, "Foundations of Computing", "计算基础", ["python"]),
  s(
    "MAST10006",
    UG,
    2019,
    2,
    "Calculus 2",
    "微积分 2",
    ["calculus-optimisation"],
    ["calculus-optimisation"]
  ),
  s(
    "MAST10010",
    UG,
    2019,
    2,
    "Data Analysis 1",
    "数据分析 1",
    ["hypothesis-testing", "minitab"],
    ["statistics"]
  ),
  s(
    "MAST10007",
    UG,
    2020,
    null,
    "Linear Algebra",
    "线性代数",
    ["linear-algebra", "matlab"],
    ["linear-algebra"]
  ),
  s("COMP10002", UG, 2020, 1, "Foundations of Algorithms", "算法基础", [
    "c-language",
    "algorithms-data-structures",
  ]),
  s(
    "INFO20003",
    UG,
    2020,
    1,
    "Database Systems",
    "数据库系统",
    ["database-design", "sql"],
    ["database-systems", "sql-querying-data"]
  ),
  s("MAST20004", UG, 2020, null, "Probability", "概率论", ["probability"], ["probability"]),
  s("MKTG10001", UG, 2020, null, "Principles of Marketing", "市场营销原理", ["finance-marketing"]),
  s("MGMT20011", UG, 2020, null, "Business Negotiations", "商务谈判", ["negotiation"]),
  s("COMP20003", UG, 2020, 2, "Algorithms and Data Structures", "算法与数据结构", [
    "c-language",
    "algorithms-data-structures",
  ]),
  s(
    "COMP20008",
    UG,
    2020,
    2,
    "Elements of Data Processing",
    "数据处理基础",
    ["python", "data-wrangling", "data-pipelines", "record-linkage", "data-visualisation"],
    ["elements-of-data-processing"]
  ),
  s(
    "MAST20005",
    UG,
    2020,
    2,
    "Statistics",
    "统计学",
    ["hypothesis-testing", "interval-estimation", "r-lang"],
    ["statistics"]
  ),
  s(
    "MAST20018",
    UG,
    2020,
    2,
    "Discrete Maths and Operations Research",
    "离散数学与运筹学",
    ["operations-research"],
    ["operations-research"]
  ),
  s("FNCE10002", UG, 2021, null, "Principles of Finance", "金融学原理", ["finance-marketing"]),
  s(
    "COMP30027",
    UG,
    2021,
    1,
    "Machine Learning",
    "机器学习",
    ["classification", "model-evaluation", "statistical-learning", "scikit-learn"],
    ["model-evaluation"]
  ),
  s(
    "INFO30005",
    UG,
    2021,
    1,
    "Web Information Technologies",
    "Web 信息技术",
    ["full-stack", "nodejs", "javascript", "html-css", "mongodb"],
    ["web-information-technology"]
  ),
  s(
    "MAST30013",
    UG,
    2021,
    null,
    "Techniques in Operations Research",
    "运筹学方法",
    ["operations-research", "calculus-optimisation"],
    ["operations-research", "optimisation-methods"]
  ),
  s(
    "MAST30025",
    UG,
    2021,
    null,
    "Linear Statistical Models",
    "线性统计模型",
    ["regression", "r-lang"],
    ["linear-statistical-models"]
  ),
  s("EDUC30072", UG, 2021, null, "Positive Leadership and Careers", "积极领导力与职业", [
    "leadership",
  ]),
  s("COMP30022", UG, 2021, 2, "IT Project", "IT 项目", [
    "full-stack",
    "react",
    "javascript",
    "agile",
    "git",
  ]),
  s(
    "MAST30027",
    UG,
    2021,
    null,
    "Modern Applied Statistics",
    "现代应用统计",
    ["bayesian-inference", "statistical-modelling", "r-lang"],
    ["bayesian-statistics"]
  ),
  s(
    "MAST30034",
    UG,
    2021,
    2,
    "Applied Data Science",
    "应用数据科学",
    ["problem-framing", "spark", "regression", "data-wrangling"],
    ["applied-data-science"]
  ),
  s("MUSI20163", UG, 2022, null, "Samba Band", "桑巴乐队", ["samba"]),
  s(
    "COMP30024",
    UG,
    2022,
    1,
    "Artificial Intelligence",
    "人工智能",
    ["search-agents", "python"],
    ["artificial-intelligence"]
  ),

  // ── Master of Data Science, 2023 to 2024 ──────────────────────────────────
  s(
    "COMP90024",
    MS,
    2023,
    1,
    "Cluster and Cloud Computing",
    "集群与云计算",
    ["hpc", "cloud-computing"],
    ["cluster-cloud-computing"]
  ),
  s(
    "COMP90051",
    MS,
    2023,
    1,
    "Statistical Machine Learning",
    "统计机器学习",
    ["statistical-learning", "classification", "reinforcement-learning"],
    ["statistical-machine-learning", "reinforcement-learning"]
  ),
  s(
    "MAST90139",
    MS,
    2023,
    1,
    "Statistical Modelling for Data Science",
    "数据科学统计建模",
    ["statistical-modelling", "r-lang"],
    ["statistical-modelling"]
  ),
  s(
    "MAST90106",
    MS,
    2023,
    1,
    "Data Science Project Pt1",
    "数据科学项目（第 1 部分）",
    ["problem-framing", "research-design", "time-series"],
    ["time-series-analysis"],
    { href: "/resume#role-csiro", kind: "role" }
  ),
  s(
    "COMP90050",
    MS,
    2023,
    "winter",
    "Advanced Database Systems",
    "高级数据库系统",
    ["query-optimisation", "research-design"],
    ["advanced-database-systems"]
  ),
  s(
    "MAST90083",
    MS,
    2023,
    2,
    "Computational Statistics & Data Science",
    "计算统计与数据科学",
    ["simulation", "interval-estimation", "regression", "r-lang"],
    ["computational-statistics"]
  ),
  s(
    "MAST90107",
    MS,
    2023,
    2,
    "Data Science Project Pt2",
    "数据科学项目（第 2 部分）",
    ["time-series", "science-communication"],
    ["time-series-analysis"],
    { href: "/resume#role-csiro", kind: "role" }
  ),
  s(
    "MAST90125",
    MS,
    2023,
    2,
    "Bayesian Statistical Learning",
    "贝叶斯统计学习",
    ["bayesian-inference", "r-lang"],
    ["bayesian-statistics"]
  ),
  s(
    "MAST90138",
    MS,
    2023,
    2,
    "Multivariate Statistics for Data Science",
    "面向数据科学的多元统计",
    ["multivariate", "dimensionality-reduction", "classification", "r-lang"],
    ["pca-dimensionality-reduction", "clustering"]
  ),
  s(
    "COMP90042",
    MS,
    2024,
    1,
    "Natural Language Processing",
    "自然语言处理",
    ["nlp", "information-retrieval", "deep-learning", "pytorch"],
    ["natural-language-processing", "information-retrieval"]
  ),
  // Topics stay general on purpose: the WEHI role was not this internship, so
  // the subject shares no skill row with it.
  s("SCIE90017", MS, 2024, 1, "Science and Technology Internship", "科学与技术实习", [
    "stakeholder-engagement",
  ]),
  s(
    "SCIE90034",
    MS,
    2024,
    1,
    "Communicating Science at Work",
    "职场科学传播",
    ["science-communication"],
    ["science-communication"]
  ),
];

// ── Helpers ──────────────────────────────────────────────────────────────────
const isZh = (locale) => locale === "zh-Hans";

/** Sort key for a term within a year: summer (Jan), semester 1, winter, semester 2, year-only. */
export function termRank(term) {
  const i = TERM_ORDER.indexOf(term);
  return i === -1 ? TERM_ORDER.length : i;
}

/** The revived labs for a subject code, oldest assignment first. */
export function labsFor(code, locale = "en-AU") {
  return COURSEWORK.filter((p) => p.subjectCode === code)
    .sort((a, b) => a.assignmentDate.localeCompare(b.assignmentDate))
    .map((p) => ({ slug: p.slug, title: isZh(locale) ? p.zh.title : p.en.title }));
}

/**
 * Subjects for one locale, grouped level -> year -> term in the order taken.
 * Each subject carries its name in the page locale, its derived labs and the
 * raw skill and note ids; /skills adds the labels.
 */
export function getSubjects(locale = "en-AU") {
  return SUBJECT_LEVELS.map((level) => {
    const entry = EDUCATION.find((e) => e.id === LEVEL_DEGREE[level]);
    const copy = entry ? (isZh(locale) ? entry.zh : entry.en) : null;
    const rows = SUBJECTS.filter((x) => x.level === level).sort(
      (a, b) => a.year - b.year || termRank(a.term) - termRank(b.term)
    );
    const years = [];
    for (const x of rows) {
      let year = years.find((y) => y.year === x.year);
      if (!year) years.push((year = { year: x.year, terms: [] }));
      let term = year.terms.find((t) => t.term === x.term);
      if (!term) year.terms.push((term = { term: x.term, subjects: [] }));
      term.subjects.push({
        code: x.code,
        name: isZh(locale) ? x.zh : x.en,
        skills: x.skills,
        notes: x.notes,
        related: x.related,
        labs: labsFor(x.code, locale),
      });
    }
    return {
      level,
      degree: copy ? { role: copy.role, period: copy.period } : null,
      years,
    };
  });
}
