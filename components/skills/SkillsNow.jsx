import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import {
  EvidenceLink,
  MICRO_LABEL,
  MORE_BUTTON,
  SkillChip,
  skillLinkProps,
} from "@/components/skills/EvidenceList";

const K = "skillsPage.now";
const SUBHEAD =
  "flex items-center gap-2.5 font-mono text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A] dark:text-white";
const NOTE = "mt-2 max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]";
const HAIRLINE = "border-[#F0F0F0] dark:border-[#1E1E1E]";

/** How many skills "In active use" shows before "Show all". */
const SHOWN = 15;

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
 * 1. Core skills: the five top skills on my LinkedIn profile, each with its two
 *    or three latest roles, projects or labs (linked) and the month I last used
 *    it. Where a core skill spans two atlas skills (SQL and SQL Server), each
 *    chip carries its own date.
 * 2. In active use: every skill used in a role, project or lab in the last 18
 *    months, in one list, newest first, then the ones used in more places. Each
 *    shows where and when it was last used and opens its atlas row. The first
 *    few show; the rest sit behind "Show all".
 *
 * Dates, places and counts only, never a level: the evidence carries the claim.
 */
export default function SkillsNow({ atlas, onSelectSkill }) {
  const { t } = useI18n();
  const [all, setAll] = useState(false);
  const { now, evidence, skills } = atlas;
  const skillLabel = Object.fromEntries(skills.map((s) => [s.id, s.label]));
  const active = all ? now.active : now.active.slice(0, SHOWN);

  return (
    <div className="space-y-12">
      <section aria-labelledby="now-core-h">
        <h3 id="now-core-h" className={SUBHEAD}>
          <PixelMark />
          {t(`${K}.coreTitle`)}
        </h3>
        <p className={NOTE}>{t(`${K}.coreNote`)}</p>

        <ul className={`mt-6 divide-y border-y ${HAIRLINE} divide-[#F0F0F0] dark:divide-[#1E1E1E]`}>
          {now.core.map((c) => (
            <li
              key={c.id}
              className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-x-8 gap-y-3 py-5"
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
                  {c.skills.map((s) => {
                    // One atlas skill shares the date above; two or more each
                    // show their own, so "SQL" and "SQL Server" never seem to
                    // disagree with the row's date.
                    const meta = c.skills.length > 1 ? s.last : null;
                    return (
                      <SkillChip
                        key={s.id}
                        id={s.id}
                        label={skillLabel[s.id]}
                        meta={meta}
                        srMeta={meta && fill(t(`${K}.chipLastUsed`), { date: meta })}
                        onSelect={onSelectSkill}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="min-w-0 pl-4 md:pl-0">
                <p id={`now-core-${c.id}-work`} className={MICRO_LABEL}>
                  {t(`${K}.latestWork`)}
                </p>
                <ul
                  aria-labelledby={`now-core-${c.id}-work`}
                  className="mt-1 divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E]"
                >
                  {c.evidence.map((i) => (
                    <li key={evidence[i].id}>
                      <EvidenceLink item={evidence[i]} />
                    </li>
                  ))}
                </ul>
              </div>
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

        <ol
          id="now-active-list"
          aria-labelledby="now-active-h"
          className={`mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t ${HAIRLINE}`}
        >
          {active.map((a) => (
            <li key={a.id} className={`min-w-0 border-b ${HAIRLINE}`}>
              <a
                {...skillLinkProps(a.id, onSelectSkill)}
                className="group flex min-h-[44px] flex-col justify-center py-2"
              >
                <span className="text-[14px] leading-snug text-[#1A1A1A] dark:text-[#DDDDDD] group-hover:text-[#CC0000] dark:group-hover:text-[#FF3C3C] transition-colors duration-200 [overflow-wrap:anywhere]">
                  {skillLabel[a.id]}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 text-[12px] leading-snug tabular-nums text-[#5C5C5C] dark:text-[#9A9A9A] [overflow-wrap:anywhere]"
                >
                  {a.where} · {a.last}
                </span>
                <span className="sr-only">
                  {fill(t(`${K}.chipLastUsedAt`), { where: a.where, date: a.last })}
                </span>
              </a>
            </li>
          ))}
        </ol>
        {now.active.length > SHOWN && (
          <button
            type="button"
            aria-expanded={all}
            aria-controls="now-active-list"
            onClick={() => setAll((v) => !v)}
            className={`mt-2 ${MORE_BUTTON}`}
          >
            {all
              ? t("skillsPage.atlas.showFewer")
              : fill(t("skillsPage.atlas.showAll"), { count: now.active.length })}
          </button>
        )}
      </section>
    </div>
  );
}
