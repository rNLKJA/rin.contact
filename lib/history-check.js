/**
 * Guards for lib/history-data.js (/info/history). historyDataProblems() runs in
 * getStaticProps, so a malformed entry fails the build; the CI script
 * (scripts/check-career-data.mjs) runs it too and also checks that every
 * screenshot exists and stays under the image budget.
 */
import { IMAGE_SOURCES, MILESTONES, VERSIONS } from "./history-data.js";

export const HISTORY_IMAGE_MAX_BYTES = 250 * 1024;

const COPY_FIELDS = ["title", "dates", "changed", "thinking", "alt"];

/** Site rules that apply to every history string, in either language. */
const BANNED = [
  { pattern: / — /, why: "a spaced em dash" },
  { pattern: /\bmarks?\b|\bgrades?\b|\bGPA\b|\bWAM\b|\bdistinction\b/i, why: "a mark or grade" },
  { pattern: /\b\d+(\.\d+)?\s*\/\s*(10|20|40|50|100)\b/, why: "a score out of a total" },
  { pattern: /分数|成绩|满分/, why: "a mark or grade" },
  { pattern: /\bcomplian(t|ce)\b|合规/i, why: "a compliance claim" },
  { pattern: /IAPro|BlueTeam/i, why: "an internal system name" },
];

const isIsoPrefix = (s) => /^\d{4}-\d{2}(-\d{2})?$/.test(s);

function ruleProblems(where, text) {
  return BANNED.filter(({ pattern }) => pattern.test(text)).map(
    ({ why }) => `${where} contains ${why}`
  );
}

export function historyDataProblems() {
  const problems = [];
  const ids = new Set();

  VERSIONS.forEach((v, i) => {
    const at = `VERSIONS[${i}] (${v.id})`;
    if (ids.has(v.id)) problems.push(`${at}: duplicate id`);
    ids.add(v.id);
    if (v.id !== `v${i + 1}` || v.version !== v.id) problems.push(`${at}: ids must run v1..v5`);
    if (!isIsoPrefix(v.from)) problems.push(`${at}: from must be YYYY-MM`);
    if (v.to !== null && !isIsoPrefix(v.to)) problems.push(`${at}: to must be YYYY-MM or null`);
    if (!Array.isArray(v.stack) || v.stack.length === 0) problems.push(`${at}: empty stack`);
    if (v.sourceUrl !== `https://github.com/rNLKJA/rin.contact/tree/${v.id}`) {
      problems.push(`${at}: sourceUrl should point at the ${v.id} branch`);
    }
    if (v.image) {
      const { src, mobileSrc, w, h, source, capturedAt } = v.image;
      if (!/^\/images\/history\/[\w-]+\.(webp|png)$/.test(src || "")) {
        problems.push(`${at}: image.src must live in /images/history/`);
      }
      if (mobileSrc && !/^\/images\/history\/[\w-]+\.(webp|png)$/.test(mobileSrc)) {
        problems.push(`${at}: image.mobileSrc must live in /images/history/`);
      }
      if (!(w > 0 && h > 0)) problems.push(`${at}: image needs w and h`);
      if (!IMAGE_SOURCES.includes(source)) problems.push(`${at}: unknown image.source ${source}`);
      if (!isIsoPrefix(capturedAt || "")) problems.push(`${at}: image.capturedAt must be a date`);
    }
    if (v.archive) {
      const { ts, url, frameUrl } = v.archive;
      if (!/^\d{14}$/.test(ts || ""))
        problems.push(`${at}: archive.ts must be a Wayback timestamp`);
      if (!url?.startsWith(`https://web.archive.org/web/${ts}/`)) {
        problems.push(`${at}: archive.url must be a Wayback URL for ${ts}`);
      }
      if (!frameUrl?.startsWith(`https://web.archive.org/web/${ts}if_/`)) {
        problems.push(`${at}: archive.frameUrl must use the if_ form`);
      }
    }
    for (const lang of ["en", "zh"]) {
      COPY_FIELDS.forEach((field) => {
        const text = v[lang]?.[field];
        if (typeof text !== "string" || !text.trim()) {
          problems.push(`${at}: missing ${lang}.${field}`);
        } else {
          problems.push(...ruleProblems(`${at} ${lang}.${field}`, text));
        }
      });
    }
  });

  MILESTONES.forEach((m, i) => {
    const at = `MILESTONES[${i}]`;
    if (!isIsoPrefix(m.date)) problems.push(`${at}: date must be ISO`);
    if (m.to && !isIsoPrefix(m.to)) problems.push(`${at}: to must be ISO`);
    for (const lang of ["en", "zh"]) {
      if (typeof m[lang] !== "string" || !m[lang].trim()) problems.push(`${at}: missing ${lang}`);
      else problems.push(...ruleProblems(`${at} ${lang}`, m[lang]));
    }
  });

  return problems;
}

/** Every image path the history page uses, for the file-size check. */
export function historyImagePaths() {
  return VERSIONS.flatMap((v) => (v.image ? [v.image.src, v.image.mobileSrc] : [])).filter(Boolean);
}
