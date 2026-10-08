import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import { EvidenceLink, MICRO_LABEL, SkillChip } from "@/components/skills/EvidenceList";

const K = "skillsPage.now";
const SUBHEAD =
  "flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A] dark:text-white";
const NOTE = "mt-2 max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]";

/** A 3×3 pixel checker in the accent red: the page's small pixel touch. */
function PixelMark() {
  return (
    <svg
      aria-hidden="true"
      width="9"
      height="9"
      viewBox="0 0 3 3"
      shapeRendering="crispEdges"
      className="shrink-0 text-[#CC0000] dark:text-[#FF3C3C]"
      fill="currentColor"
    >
      <rect x="0" y="0" width="1" height="1" />
      <rect x="2" y="0" width="1" height="1" />
      <rect x="1" y="1" width="1" height="1" />
      <rect x="0" y="2" width="1" height="1" />
      <rect x="2" y="2" width="1" height="1" />
    </svg>
  );
}

/**
 * "What I work with now", built on the server in lib/skills-atlas.js (now):
 *
 * 1. Core skills: the five I declare on LinkedIn, each with its two or three
 *    latest roles, projects or labs (linked) and the month I last used it.
 * 2. In active use: every skill used in a role, project or lab in the last 18
 *    months, grouped by area, newest first. Each chip opens its atlas row.
 *
 * Dates and counts only, never a level: the evidence carries the claim.
 */
export default function SkillsNow({ atlas, onSelectSkill }) {
  const { t } = useI18n();
  const { now, evidence, skills, domains } = atlas;
  const skillLabel = Object.fromEntries(skills.map((s) => [s.id, s.label]));
  const areaLabel = Object.fromEntries(domains.map((d) => [d.id, d.short]));

  return (
    <div className="space-y-12">
      <section aria-labelledby="now-core-h">
        <h3 id="now-core-h" className={SUBHEAD}>
          <PixelMark />
          {t(`${K}.coreTitle`)}
        </h3>
        <p className={NOTE}>{t(`${K}.coreNote`)}</p>

        <ul className="mt-6 divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E] border-y border-[#F0F0F0] dark:border-[#1E1E1E]">
          {now.core.map((c) => (
            <li
              key={c.id}
              className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-x-8 gap-y-2 py-5"
            >
              <div className="min-w-0">
                <h4 className="flex items-center gap-2.5 text-lg font-semibold leading-snug text-black dark:text-white">
                  <span
                    aria-hidden="true"
                    className="block w-1.5 h-1.5 shrink-0 bg-[#CC0000] dark:bg-[#FF3C3C]"
                  />
                  {c.label}
                </h4>
                {c.last && (
                  <p className="mt-1 pl-4 text-[12px] tabular-nums text-[#5C5C5C] dark:text-[#9A9A9A]">
                    {fill(t(`${K}.lastUsed`), { date: c.last })}
                  </p>
                )}
                <p className={`mt-3 pl-4 ${MICRO_LABEL}`}>{t(`${K}.inAtlas`)}</p>
                <div className="mt-1.5 pl-4 flex flex-wrap gap-1.5">
                  {c.skills.map((id) => (
                    <SkillChip key={id} id={id} label={skillLabel[id]} onSelect={onSelectSkill} />
                  ))}
                </div>
              </div>
              <ul className="min-w-0 pl-4 md:pl-0 divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E]">
                {c.evidence.map((i) => (
                  <li key={evidence[i].id}>
                    <EvidenceLink item={evidence[i]} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="now-active-h">
        <h3 id="now-active-h" className={SUBHEAD}>
          <PixelMark />
          {t(`${K}.activeTitle`)}
        </h3>
        <p className={NOTE}>
          {fill(t(`${K}.activeNote`), {
            count: now.activeCount,
            months: now.months,
            since: now.since,
            asOf: now.asOf,
          })}
        </p>

        <div className="mt-6 divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E] border-y border-[#F0F0F0] dark:border-[#1E1E1E]">
          {now.active.map((g) => (
            <div
              key={g.domain}
              className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)] gap-x-6 gap-y-2 py-4"
            >
              <h4
                id={`now-area-${g.domain}`}
                className="self-start flex items-center gap-2 md:min-h-[32px] font-mono text-[10px] tracking-[0.25em] uppercase text-[#CC0000] dark:text-[#FF3C3C]"
              >
                <span aria-hidden="true" className="block w-1.5 h-1.5 shrink-0 bg-current" />
                {areaLabel[g.domain]}
              </h4>
              <ul aria-labelledby={`now-area-${g.domain}`} className="flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <li key={s.id} className="max-w-full">
                    <SkillChip
                      id={s.id}
                      label={skillLabel[s.id]}
                      meta={s.last}
                      metaPrefix={t(`${K}.lastUsedPrefix`)}
                      onSelect={onSelectSkill}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
