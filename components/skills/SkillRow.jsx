import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import EvidenceList, { itemCount, kindCount } from "@/components/skills/EvidenceList";

/**
 * The 6px row marker: filled when the skill was learned or used in study, work
 * or a credential, hollow when it is only written up in notes. The legend sits
 * in "How to read the numbers". In forced-colours mode the fill is kept as
 * CanvasText, so filled and hollow stay distinct.
 */
export function Marker({ hands, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-1.5 h-1.5 shrink-0 ${
        hands
          ? "bg-[#1A1A1A] dark:bg-[#EEEEEE] forced-colors:[forced-color-adjust:none] forced-colors:bg-[CanvasText]"
          : "border border-[#1A1A1A] dark:border-[#EEEEEE] bg-transparent"
      } ${className}`}
    />
  );
}

/**
 * One skill in the atlas: a disclosure button (APG pattern) with the label,
 * first record, item count and kind breakdown, and a panel of every evidence
 * item grouped by kind. The panel mounts on first open and stays mounted. The
 * count is plain text and never changes the row's visual weight.
 */
export default function SkillRow({ skill, evidence, kinds, open, mounted, onToggle, toggleRef }) {
  const { t, locale } = useI18n();
  const panelId = `skill-${skill.id}-panel`;
  const labelId = `skill-${skill.id}-label`;
  const metaId = `skill-${skill.id}-meta`;
  const breakdown = kinds.filter((k) => skill.kinds[k]).map((k) => kindCount(t, k, skill.kinds[k]));
  const meta = [
    skill.firstYear
      ? fill(t("skillsPage.atlas.firstRecord"), { year: skill.firstYear })
      : t("skillsPage.atlas.undated"),
    itemCount(t, skill.count),
    ...breakdown,
  ];

  return (
    <li id={`skill-${skill.id}`} className="scroll-mt-24">
      <h4>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          // The name is the label alone, so the heading list stays short; the
          // first record and counts are the description.
          aria-labelledby={labelId}
          aria-describedby={metaId}
          onClick={() => onToggle(skill.id)}
          className="group -mx-2 w-[calc(100%+1rem)] min-h-[44px] px-2 py-3 flex items-start gap-3 text-left hover:bg-[#FAFAFA] dark:hover:bg-[#111111] transition-colors duration-200"
        >
          <Marker hands={skill.hands} className="mt-[9px]" />
          <span className="min-w-0 flex-1">
            <span
              id={labelId}
              className="block text-[15px] leading-snug text-[#1A1A1A] dark:text-[#EEEEEE] group-hover:text-black dark:group-hover:text-white [overflow-wrap:anywhere]"
            >
              {skill.label}
              {locale === "zh-Hans" && skill.alt !== skill.label && (
                <span lang="en" className="ml-2 text-[12px] text-[#5C5C5C] dark:text-[#9A9A9A]">
                  {skill.alt}
                </span>
              )}
            </span>
            <span
              id={metaId}
              className="block mt-0.5 text-[12px] leading-relaxed text-[#5C5C5C] dark:text-[#9A9A9A] tabular-nums"
            >
              {meta.join(" · ")}
            </span>
          </span>
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className={`mt-1.5 shrink-0 text-[#5C5C5C] dark:text-[#9A9A9A] transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path
              d="M2.5 4.5 6 8l3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </h4>
      <div id={panelId} hidden={!open} className="pb-5 pl-[18px] animate-enter-up">
        {mounted && (
          <EvidenceList
            id={panelId}
            items={skill.evidence.map((i) => evidence[i])}
            kinds={kinds}
            headingLevel={5}
          />
        )}
      </div>
    </li>
  );
}
