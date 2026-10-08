import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import ScrollRegion from "@/components/ui/ScrollRegion";
import EvidenceList, {
  MICRO_LABEL,
  SkillChip,
  itemCount,
  kindCount,
} from "@/components/skills/EvidenceList";

const K = "skillsPage.timeline";
/** Squares drawn per cell before the rest are summed up as "+N". */
const MAX_SQUARES = 12;
/** New skills shown per year before the "+N" button. */
const MAX_CHIPS = 12;

const INK = "bg-[#1A1A1A] dark:bg-[#EEEEEE]";
const RED = "bg-[#CC0000] dark:bg-[#FF3C3C]";

/** One grid cell: up to 12 6px squares (wrapping at 6), "+N" and the count. */
function Cell({ n, colour }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {n > 0 && (
        <span aria-hidden="true" className="grid grid-cols-6 gap-[2px]">
          {Array.from({ length: Math.min(n, MAX_SQUARES) }, (_, i) => (
            <span key={i} className={`block w-1.5 h-1.5 ${colour}`} />
          ))}
        </span>
      )}
      {n > MAX_SQUARES && (
        <span
          aria-hidden="true"
          className="font-mono text-[10px] text-[#5C5C5C] dark:text-[#9A9A9A]"
        >
          +{n - MAX_SQUARES}
        </span>
      )}
      <span className="font-mono text-[10px] tabular-nums text-[#3D3D3D] dark:text-[#AAAAAA]">
        {n > 0 ? (
          n
        ) : (
          <>
            <span aria-hidden="true">·</span>
            <span className="sr-only">0</span>
          </>
        )}
      </span>
    </span>
  );
}

/** Counts per kind for one year, as a sentence: "3 subjects · 2 coursework". */
function yearSentence(t, year, kinds) {
  return kinds
    .filter((k) => year.byKind[k])
    .map((k) => kindCount(t, k, year.byKind[k]))
    .join(" · ");
}

function YearEntry({ year, evidence, kinds, skillLabel, onSelectSkill }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [allSkills, setAllSkills] = useState(false);
  const panelId = `year-${year.year}-items`;
  const chipsId = `year-${year.year}-new`;
  const count = year.items.length;
  const chips = allSkills ? year.newSkills : year.newSkills.slice(0, MAX_CHIPS);
  const hiddenChips = year.newSkills.length - MAX_CHIPS;

  return (
    <li
      id={`year-${year.year}`}
      className="scroll-mt-24 grid md:grid-cols-[112px_minmax(0,1fr)] gap-x-6 gap-y-3 pt-8"
    >
      <h3 className="font-display text-4xl leading-none tabular-nums text-black dark:text-white md:sticky md:top-24 self-start">
        {year.year}
      </h3>
      <div className="min-w-0">
        <p className="text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
          {itemCount(t, count, `${K}.itemSummary`, `${K}.itemsSummary`)}
          {count > 0 && (
            <span className="text-[#5C5C5C] dark:text-[#9A9A9A]">
              {" · "}
              {yearSentence(t, year, kinds)}
            </span>
          )}
        </p>

        {year.newSkills.length > 0 && (
          <div className="mt-4">
            <h4 className={`${MICRO_LABEL} mb-2 flex items-center gap-2`}>
              <span aria-hidden="true" className={`block w-1.5 h-1.5 ${RED}`} />
              {t(`${K}.newSkills`)}
              <span className="tabular-nums">{year.newSkills.length}</span>
            </h4>
            <ul id={chipsId} className="flex flex-wrap gap-1.5">
              {chips.map((id) => (
                <li key={id}>
                  <SkillChip id={id} label={skillLabel(id)} onSelect={onSelectSkill} />
                </li>
              ))}
              {hiddenChips > 0 && (
                <li>
                  <button
                    type="button"
                    aria-expanded={allSkills}
                    aria-controls={chipsId}
                    aria-label={
                      allSkills
                        ? t(`${K}.fewerSkills`)
                        : fill(t(`${K}.moreSkills`), { count: hiddenChips })
                    }
                    onClick={() => setAllSkills((v) => !v)}
                    className="inline-flex min-h-[32px] items-center border border-dashed border-[#BDBDBD] dark:border-[#555555] px-2.5 font-mono text-[11px] text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200"
                  >
                    {allSkills ? "−" : fill(t(`${K}.more`), { count: hiddenChips })}
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}

        {count > 0 && (
          <div className="mt-4">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => {
                setMounted(true);
                setOpen((v) => !v);
              }}
              className="inline-flex min-h-[32px] items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-3 text-[11px] tracking-widest uppercase text-[#1A1A1A] dark:text-[#DDDDDD] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200"
            >
              {open ? t(`${K}.hideItems`) : itemCount(t, count, `${K}.showItem`, `${K}.showItems`)}
              <span
                aria-hidden="true"
                className={`inline-block transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>
            <div id={panelId} hidden={!open} className="mt-4 animate-enter-up">
              {mounted && (
                <EvidenceList
                  id={panelId}
                  items={year.items.map((i) => evidence[i])}
                  kinds={kinds}
                  headingLevel={4}
                  subGroupSubjects
                />
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

/**
 * Learning timeline: a static grid of dated items by kind and year (md and
 * up), a one-line summary per year on phones, then a year list where each year
 * names the skills that first appear in it and opens to its items. Knowledge
 * notes and explainers have no date of their own, so they stay out of it.
 */
export default function LearningTimeline({ atlas, onSelectSkill }) {
  const { t } = useI18n();
  const { timeline, evidence, timelineKinds, kinds, skills } = atlas;
  const labels = Object.fromEntries(skills.map((s) => [s.id, s.label]));
  const skillLabel = (id) => labels[id] || id;

  return (
    <div>
      <p className="mb-6 max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
        {t(`${K}.intro`)}
      </p>

      {/* md and up: the grid */}
      <ScrollRegion label={t(`${K}.caption`)} className="hidden md:block">
        <table className="w-full border-collapse">
          <caption className="sr-only">{t(`${K}.caption`)}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="pb-3 pr-4 text-left font-normal text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]"
              >
                {t(`${K}.kind`)}
              </th>
              {timeline.map((y) => (
                <th key={y.year} scope="col" className="pb-3 px-2 text-left font-normal">
                  <a
                    href={`#year-${y.year}`}
                    className="font-display text-sm tabular-nums text-black dark:text-white hover:text-[#CC0000] dark:hover:text-[#FF3C3C] transition-colors duration-200"
                  >
                    {y.year}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timelineKinds.map((k) => (
              <tr key={k} className="border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
                <th
                  scope="row"
                  className="py-2.5 pr-4 text-left font-normal text-[12px] text-[#1A1A1A] dark:text-[#DDDDDD] whitespace-nowrap"
                >
                  {t(`skillsPage.kindsPlural.${k}`)}
                </th>
                {timeline.map((y) => (
                  <td key={y.year} className="py-2.5 px-2 align-middle">
                    <Cell n={y.byKind[k]} colour={INK} />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
              <th
                scope="row"
                className="py-2.5 pr-4 text-left font-normal text-[12px] text-[#CC0000] dark:text-[#FF3C3C] whitespace-nowrap"
              >
                {t(`${K}.newSkills`)}
              </th>
              {timeline.map((y) => (
                <td key={y.year} className="py-2.5 px-2 align-middle">
                  <Cell n={y.newSkills.length} colour={RED} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </ScrollRegion>

      {/* Phones: one line per year */}
      <ol className="md:hidden divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E] border-y border-[#F0F0F0] dark:border-[#1E1E1E]">
        {timeline.map((y) => (
          <li key={y.year} className="py-3 flex items-baseline gap-4">
            <a
              href={`#year-${y.year}`}
              className="font-display text-3xl leading-none tabular-nums text-black dark:text-white shrink-0"
            >
              {y.year}
            </a>
            <p className="min-w-0 text-[12px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
              {yearSentence(t, y, timelineKinds) ||
                itemCount(t, 0, `${K}.itemSummary`, `${K}.itemsSummary`)}
              {y.newSkills.length > 0 && (
                <span className="text-[#CC0000] dark:text-[#FF3C3C]">
                  {" · "}
                  {t(`${K}.newSkills`)} {y.newSkills.length}
                </span>
              )}
            </p>
          </li>
        ))}
      </ol>

      {/* Every year, with its new skills and items */}
      <ol className="mt-6">
        {timeline.map((y) => (
          <YearEntry
            key={y.year}
            year={y}
            evidence={evidence}
            kinds={kinds}
            skillLabel={skillLabel}
            onSelectSkill={onSelectSkill}
          />
        ))}
      </ol>
    </div>
  );
}
