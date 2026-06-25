import { CAREER_RAW, EDUCATION } from "@/components/sections/TimelineSection";

/**
 * Per-locale CV content for /cv.
 *
 * en-AU is derived from the same verified CAREER_RAW / EDUCATION that power
 * /career and /about, so the English CV can never drift from the rest of the
 * site. zh-Hans is hand-translated and index-aligned to those arrays — if the
 * source arrays change (order, roles, bullets), update EXPERIENCE_ZH /
 * EDUCATION_ZH to match. Proper nouns (tools, org acronyms) are kept; org names
 * carry a Chinese rendering with the acronym retained where it's the identifier.
 *
 * Called server-side from getStaticProps (no client weight, CAREER_RAW stays
 * out of the client bundle).
 */

function enExperience() {
  return CAREER_RAW.map((r) => ({
    role: r.role,
    org: r.org,
    period: r.period,
    location: r.location || "",
    summary: r.summary || "",
    bullets: (r.bullets || []).slice(0, 3),
  }));
}

function enEducation() {
  return EDUCATION.filter((e) => e.tag !== "Secondary").map((e) => ({
    role: e.role,
    org: e.org,
    period: e.period,
    location: e.location || "",
  }));
}

// ── 简体中文 — index-aligned to CAREER_RAW (6 roles) ──────────────────────────
const EXPERIENCE_ZH = [
  {
    role: "ASO7 高级数据分析师",
    org: "南澳大利亚警察局（SAPOL）",
    period: "2026年3月 – 至今",
    location: "南澳 阿德莱德",
    summary:
      "以第一性原理思维与战略规划为根基，构建分析模型与统计框架，将 SAPOL 复杂的警务数据转化为权威的、可用于决策的情报，服务于职业道德与专业标准处。",
    bullets: [
      "运用第一性原理思维，将复杂的数据难题拆解至本质，再从零重建结构化的分析路线图。",
      "就数据与报告提案为高层领导提供专家级战略顾问，推动基于证据的建议。",
      "将核心数据确立为管理信息、战略规划与议会报告的单一可信来源。",
    ],
  },
  {
    role: "ASO4 情报与协调官",
    org: "消费者与商业服务局（CBS），南澳总检察长部",
    period: "2025年1月 – 2026年3月",
    location: "南澳 阿德莱德",
    summary:
      "以战略思维设计基于风险的情报框架与合规计划，再用统计分析让这些框架由数据驱动。从零搭建了消费者与商业服务局的分析能力，将零散的多源数据转化为高层管理者与部长办公室直接使用的仪表板与 GIS 地图。",
    bullets: [
      "为烟草、建筑施工与产品安全合规设计基于风险的情报框架与运营计划——以战略思维而非例行周期为指引。",
      "开发可复用的标准作业程序（SOP）与数据校验框架，让机构情报不再被困在电子表格或某个人的记忆里。",
      "与 SAPOL、ITEC 及联邦机构建立数据共享谅解备忘录（MOU）——团队内首例。",
    ],
  },
  {
    role: "RA.1 研究助理 — MoodQ",
    org: "墨尔本大学 — 精神病学系",
    period: "2024年8月 – 2026年2月",
    location: "维州 帕克维尔",
    summary:
      "主导心理健康移动应用 MoodQ 的全栈开发——将应用从 Uniapp 迁移到 Expo React Native、构建临床医生仪表板，并在 18 个月里管理 AWS 基础设施，最终成功移交给专业团队。",
    bullets: [
      "将应用从 Uniapp 迁移到 Expo React Native，提升了在 iOS 与 Android 上的性能。",
      "构建临床医生前端仪表板，用于结构化的患者数据管理。",
      "通过对 AWS RDS 与 LightSail 的审慎选型，将托管成本每月降低约 500 美元。",
    ],
  },
  {
    role: "软件工程实习生（数据科学）",
    org: "WEHI（沃尔特与伊丽莎·霍尔医学研究所）",
    period: "2024年2月 – 2024年7月",
    location: "维州 帕克维尔",
    summary:
      "利用云计算与高性能计算（HPC）自动化流式细胞术分析管道，开发测试基础设施以提升研究的可复现性，并为开源工作流工具包 celseq2 做出贡献。",
    bullets: [
      "利用云计算与 HPC 自动化流式细胞术数据分析，减少了人工处理的开销。",
      "开发测试基础设施，提升了基因组学研究成果的可复现性。",
      "为开源工具包 celseq2 做出贡献，惠及更广泛的单细胞 RNA 测序（scRNA-seq）社区。",
    ],
  },
  {
    role: "数据科学产业顾问",
    org: "CSIRO（澳大利亚联邦科学与工业研究组织）",
    period: "2023年2月 – 2023年11月",
    location: "维州 墨尔本",
    summary:
      "与 Vassili Kitsios 博士合作开展气候—经济研究，构建自回归（AR）时间序列模型，量化厄尔尼诺—南方涛动（ENSO）如何放大大宗商品价格波动以及由粮食安全引发的冲突风险。",
    bullets: [
      "为 ENSO—大宗商品分析构建带滚动窗口预测的自回归时间序列模型。",
      "交付了将气候变化模式与全球粮食安全风险相联系的洞见。",
      "在墨尔本大学教职与 CSIRO 研究领导层之间架起沟通桥梁。",
    ],
  },
  {
    role: "数据分析师 · 敏捷负责人",
    org: "CSL（杰特贝林 CSL Behring）",
    period: "2022年2月 – 2022年6月",
    location: "维州 墨尔本",
    summary:
      "将 Python 自动化与无监督聚类（T-SNE、DBSCAN、UMAP）应用于高效液相色谱（HPLC）实验室数据，缩短了处理时间并提升了对医学研究数据质量的信心。",
    bullets: [
      "通过专门编写的 Python 自动化脚本，缩短了 HPLC 结果的处理时间。",
      "运用 T-SNE、DBSCAN 与 UMAP 在复杂的医学数据集中识别隐藏模式。",
      "主持敏捷仪式，在整个项目生命周期中支撑团队的交付节奏。",
    ],
  },
];

// ── 简体中文 — education (Secondary filtered out, 3 entries) ───────────────────
const EDUCATION_ZH = [
  {
    role: "数据科学硕士",
    org: "墨尔本大学",
    period: "2023年2月 – 2024年7月",
    location: "维州 帕克维尔",
  },
  {
    role: "理学学士 — 数据科学",
    org: "墨尔本大学",
    period: "2019年6月 – 2022年7月",
    location: "维州 帕克维尔",
  },
  {
    role: "预科课程（Foundation Studies）",
    org: "墨尔本大学三一学院",
    period: "2018年3月 – 2019年5月",
    location: "维州 帕克维尔",
  },
];

export function buildExperience(locale) {
  return locale === "zh-Hans" ? EXPERIENCE_ZH : enExperience();
}

export function buildEducation(locale) {
  return locale === "zh-Hans" ? EDUCATION_ZH : enEducation();
}
