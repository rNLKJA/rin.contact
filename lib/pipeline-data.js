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
 * the MAST20005 statistics lab are live and have moved to the main lists. The
 * ENSO public-data rebuild shipped on 10 Oct 2026: its demo is on the ENSO card
 * and it is listed under coursework. Checked again on 24 Oct 2026: the COMP30027
 * cooking-time classifier is live as the Recipe Timer Lab in
 * lib/coursework-data.js, so it has left the pipeline. Nothing else is planned
 * or in progress, so both lists are empty and /projects and
 * /projects/coursework hide their pipeline sections until an item is added.
 *
 * Only link repositories that are public. `demo` is an on-site page with a
 * runnable demo (/projects/<slug>#demo), which /projects links as Live demo and
 * the page index lists by the item's title.
 */

const OCT_2026 = { en: "Oct 2026", zh: "2026 年 10 月" };
// An as-of date, so a status never reads like a ship date. Exported so the next
// item can use it: status: pipelineStatus("In progress", "进行中").
export const pipelineStatus = (en, zh) => ({
  en: `${en} · as of ${OCT_2026.en}`,
  zh: `${zh} · 截至 ${OCT_2026.zh}`,
});

export const PROJECT_PIPELINE = [];

export const COURSEWORK_PIPELINE = [];

export const localisePipeline = (items, locale) => {
  const zh = locale === "zh-Hans";
  return items.map((p) => ({
    id: p.id,
    title: zh ? p.title.zh : p.title.en,
    meta: zh ? p.meta.zh : p.meta.en,
    summary: zh ? p.summary.zh : p.summary.en,
    status: zh ? p.status.zh : p.status.en,
    link: p.link ?? null,
    demo: p.demo ?? null,
  }));
};
