/**
 * Work that is planned or in progress, shown as placeholders below the main
 * lists on /projects and /projects/coursework.
 *
 * These are kept out of PROJECTS and COURSEWORK on purpose, so they never
 * inflate the project counts, filters or the skills matrix. When one ships,
 * delete it here and give it a full entry in the main data file.
 *
 * Only link repositories that are public.
 */

const OCT_2026 = { en: "Oct 2026", zh: "2026 年 10 月" };
const status = (en, zh) => ({ en: `${en} · ${OCT_2026.en}`, zh: `${zh} · ${OCT_2026.zh}` });

export const PROJECT_PIPELINE = [
  {
    id: "project-cradle",
    title: { en: "Project Cradle", zh: "Project Cradle" },
    meta: {
      en: "Personal, with Jiahong Zheng · Jan – Mar 2022",
      zh: "个人项目，与 Jiahong Zheng 合作 · 2022 年 1 月 – 3 月",
    },
    summary: {
      en: "An invite-only member hub we built in 2022 to learn a full stack, with an Express and MongoDB API behind a Next.js front end. It is coming back as one Next.js app with invite trees and demo logins.",
      zh: "2022 年我们为学习全栈而做的邀请制会员站：Express 加 MongoDB 的后端，配 Next.js 前端。现在正在复活成一个完整的 Next.js 应用，带邀请关系树和演示登录。",
    },
    status: status("Revival", "复活中"),
  },
  {
    id: "em-algorithm",
    title: { en: "EM Algorithm, explained", zh: "EM 算法图解" },
    meta: { en: "Personal · Sep 2025", zh: "个人项目 · 2025 年 9 月" },
    summary: {
      en: "My maths-complete walkthrough of the expectation-maximisation algorithm, becoming an interactive Gaussian-mixture explorer where you can step through each E and M update.",
      zh: "我写的期望最大化（EM）算法完整推导，正在做成交互式高斯混合模型演示，可以一步步看每次 E 步和 M 步的更新。",
    },
    status: status("Interactive demo", "交互演示"),
    link: "https://github.com/rNLKJA/EM-Algorithm",
  },
  {
    id: "sa-gaming-machines",
    title: { en: "SA Gaming Machine Statistics", zh: "南澳博彩机统计" },
    meta: { en: "Personal · Sep 2025", zh: "个人项目 · 2025 年 9 月" },
    summary: {
      en: "A consolidated archive of South Australia's published gaming-machine statistics from FY2009 to FY2025, with a Power BI report. Next comes an interactive web dashboard.",
      zh: "整合南澳公开发布的 2009 至 2025 财年博彩机统计数据，并配有 Power BI 报表。下一步是做成交互式网页仪表板。",
    },
    status: status("Web dashboard", "网页仪表板"),
    link: "https://github.com/rNLKJA/South-Australia-Gaming-Machine-Statistics",
  },
  {
    id: "ml-gallery",
    title: { en: "Machine learning notebook gallery", zh: "机器学习笔记本合集" },
    meta: { en: "Personal · Nov 2022", zh: "个人项目 · 2022 年 11 月" },
    summary: {
      en: "Forty notebooks I worked through, covering regression, classification, forecasting, NLP and exploratory analysis, gathered into one browsable gallery.",
      zh: "我做过的四十个笔记本项目，涵盖回归、分类、时间序列预测、自然语言处理和探索性分析，整理成一个可以浏览的合集。",
    },
    status: status("Gallery", "合集"),
  },
  {
    id: "teaching",
    title: { en: "What learners build", zh: "学习者会做什么" },
    meta: { en: "Mentoring · 2024 – 2025", zh: "导师经历 · 2024 – 2025" },
    summary: {
      en: "The concepts and small projects from my mentoring and teaching, written up as a learning path: what each session covers and what learners make. No learner, cohort or organisation details.",
      zh: "把我辅导和教学中的概念与小项目整理成一条学习路径：每节课讲什么、学习者会做出什么。不涉及任何学员、班级或机构信息。",
    },
    status: status("Planned", "计划中"),
  },
];

export const COURSEWORK_PIPELINE = [
  {
    id: "comp20003",
    title: { en: "Nearest business, by k-d tree", zh: "用 k-d 树找最近的商家" },
    meta: {
      en: "COMP20003 Algorithms and Data Structures · Undergraduate · 2020 Semester 2",
      zh: "COMP20003 算法与数据结构 · 本科 · 2020 年第二学期",
    },
    summary: {
      en: "Nearest-neighbour search over a 2-d tree of Melbourne businesses. The original C code is lost, so it is being rebuilt from the surviving test outputs and the public CLUE data, and labelled as a rebuild.",
      zh: "在墨尔本商家数据上用二维 k-d 树做最近邻搜索。原来的 C 代码已经遗失，所以根据留存的测试输出和公开的 CLUE 数据重建，并会明确标注为重建版。",
    },
    status: status("Rebuild", "重建中"),
  },
  {
    id: "comp30027",
    title: { en: "How long will it take to cook?", zh: "这道菜要做多久？" },
    meta: {
      en: "COMP30027 Machine Learning · Undergraduate · 2021 Semester 1 · Pair project",
      zh: "COMP30027 机器学习 · 本科 · 2021 年第一学期 · 双人项目",
    },
    summary: {
      en: "A classifier that predicts a recipe's cooking time. Only our report survives, so it is being rebuilt from the report's methods on the public Food.com data.",
      zh: "预测菜谱烹饪时长的分类器。只有我们的报告留存下来，所以按报告里的方法，在公开的 Food.com 数据上重建。",
    },
    status: status("Rebuild", "重建中"),
  },
  {
    id: "mast20005",
    title: { en: "Statistics lab", zh: "统计学实验室" },
    meta: {
      en: "MAST20005 Statistics · Undergraduate · 2020",
      zh: "MAST20005 统计学 · 本科 · 2020 年",
    },
    summary: {
      en: "An interactive statistics lab built only from my own R assignments.",
      zh: "完全基于我自己的 R 语言作业做成的交互式统计学实验室。",
    },
    status: status("Rebuild", "重建中"),
  },
];

export const localisePipeline = (items, locale) => {
  const zh = locale === "zh-Hans";
  return items.map((p) => ({
    id: p.id,
    title: zh ? p.title.zh : p.title.en,
    meta: zh ? p.meta.zh : p.meta.en,
    summary: zh ? p.summary.zh : p.summary.en,
    status: zh ? p.status.zh : p.status.en,
    link: p.link ?? null,
  }));
};
