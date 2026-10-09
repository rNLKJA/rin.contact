/**
 * Work that is planned or in progress, shown as placeholders below the main
 * lists on /projects and /projects/coursework.
 *
 * These are kept out of PROJECTS and COURSEWORK on purpose, so they never
 * inflate the project counts, filters or the skills matrix. When one ships,
 * delete it here and give it a full entry in the main data file.
 *
 * Checked on 10 Oct 2026: Project Cradle, EM Algorithm, SA Gaming Machine
 * Statistics, the machine learning notebook gallery, the COMP20003 k-d tree and
 * the MAST20005 statistics lab are live and have moved to the main lists. What
 * is left is still planned or in progress.
 *
 * Only link repositories that are public.
 */

const OCT_2026 = { en: "Oct 2026", zh: "2026 年 10 月" };
const status = (en, zh) => ({ en: `${en} · ${OCT_2026.en}`, zh: `${zh} · ${OCT_2026.zh}` });

export const PROJECT_PIPELINE = [
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
    status: status("In progress (rebuilding from the report)", "进行中（按报告重建）"),
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
