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
/** Squares drawn per cell; the number beside them is always the full count. */
const MAX_SQUARES = 12;
/** New skills shown per year before the "+N more" button. */
const MAX_CHIPS = 12;

// Forced-colours mode drops background colours, so the squares keep CanvasText.
const FORCED = "forced-colors:[forced-color-adjust:none] forced-colors:bg-[CanvasText]";
const INK = `bg-[#1A1A1A] dark:bg-[#EEEEEE] ${FORCED}`;
const RED = `bg-[#CC0000] dark:bg-[#FF3C3C] ${FORCED}`;

/**
 * One grid cell: up to 12 6px squares in fixed 6px columns (wrapping at 6, so
 * they never merge into a bar), then the count.
 */
function Cell({ n, colour }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {n > 0 && (
        <span aria-hidden="true" className="grid grid-cols-[repeat(6,6px)] gap-[2px]">
          {Array.from({ length: Math.min(n, MAX_SQUARES) }, (_, i) => (
            <span key={i} className={`block w-1.5 h-1.5 ${colour}`} />
          ))}
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
                    onClick={() => setAllSkills((v) => !v)}
                    className="inline-flex min-h-[32px] items-center border border-dashed border-[#BDBDBD] dark:border-[#555555] px-2.5 font-mono text-[11px] text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200"
                  >
                    {allSkills
                      ? t(`${K}.fewerSkills`)
                      : fill(t(`${K}.more`), { count: hiddenChips })}
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
 * Learning timeline: a static grid of dated items by kind and year (lg and
 * up, where every column fits), then a year list where each year sums up its
 * items, names the skills that first appear in it and opens to the items.
 * Below lg the year list alone carries the same counts. Knowledge notes and
 * explainers have no date of their own, so they stay out of it.
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

      {/* lg and up: the grid. Equal year columns; it scrolls if they ever stop fitting. */}
      <p className="hidden lg:block mb-4 max-w-[68ch] text-[12px] leading-relaxed text-[#5C5C5C] dark:text-[#9A9A9A]">
        {t(`${K}.gridNote`)}
      </p>
      <ScrollRegion label={t(`${K}.caption`)} className="hidden lg:block">
        <table className="w-full min-w-[880px] table-fixed border-collapse">
          <caption className="sr-only">{t(`${K}.caption`)}</caption>
          <colgroup>
            <col className="w-36" />
            {timeline.map((y) => (
              <col key={y.year} />
            ))}
          </colgroup>
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

      {/* Every year, with its counts, new skills and items */}
      <ol className="-mt-8 lg:mt-6">
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
