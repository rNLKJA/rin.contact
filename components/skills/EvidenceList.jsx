import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";

/** How many items a kind group shows before "Show all". */
const SHOWN = 6;

export const MICRO_LABEL =
  "font-mono text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]";
const MORE_BUTTON =
  "min-h-[32px] text-[11px] tracking-widest uppercase text-accent-ink underline decoration-transparent underline-offset-4 hover:decoration-current transition-colors duration-200";
const CHIP =
  "inline-flex min-h-[32px] items-center border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 text-[12px] leading-tight text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 [overflow-wrap:anywhere]";

/** "3 subjects" / "3 门课程", from skillsPage.kindCounts ([one, other]). */
export function kindCount(t, kind, count) {
  const forms = t(`skillsPage.kindCounts.${kind}`);
  const template = Array.isArray(forms) ? forms[count === 1 ? 0 : 1] : "{count}";
  return fill(template, { count });
}

/** "1 item" / "12 items". */
export function itemCount(
  t,
  count,
  one = "skillsPage.atlas.item",
  other = "skillsPage.atlas.items"
) {
  return count === 1 ? t(one) : fill(t(other), { count });
}

/**
 * A link to a skill's row in the atlas. Without JavaScript it is a plain link
 * (?skill=<id>#skill-<id>); with it, the click is handed to `onSelect`, which
 * opens the row and jumps to it.
 */
export function SkillChip({ id, label, onSelect, lang }) {
  return (
    <a
      href={`?skill=${id}#skill-${id}`}
      lang={lang}
      onClick={(e) => {
        if (!onSelect || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onSelect(id);
      }}
      className={CHIP}
    >
      {label}
    </a>
  );
}

/**
 * One evidence item: label and meta, linked to where the evidence lives.
 * External links open in a new tab and say so. Blog posts are English only, so
 * on the Chinese page they link to the English post and carry a tag.
 */
export function EvidenceLink({ item, hideMeta = false }) {
  const { t, locale } = useI18n();
  const englishOnly = item.lang === "en" && locale === "zh-Hans";
  const className = "group block py-2 min-h-[32px]";
  const body = (
    <>
      <span className="block text-[14px] leading-snug text-[#1A1A1A] dark:text-[#DDDDDD] group-hover:text-[#CC0000] dark:group-hover:text-[#FF3C3C] transition-colors duration-200 [overflow-wrap:anywhere]">
        <span lang={englishOnly ? "en" : undefined}>{item.label}</span>
        {item.external && (
          <>
            <span aria-hidden="true" className="text-[#5C5C5C] dark:text-[#9A9A9A]">
              {" "}
              ↗
            </span>
            <span className="sr-only"> ({t("skillsPage.atlas.newTab")})</span>
          </>
        )}
        {englishOnly && (
          <span className="ml-2 inline-block align-middle border border-[#E0E0E0] dark:border-[#3D3D3D] px-1.5 py-px font-mono text-[9px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]">
            {t("skillsPage.atlas.englishOnly")}
          </span>
        )}
      </span>
      {item.meta && !hideMeta && (
        <span className="block mt-0.5 text-[12px] leading-snug text-[#5C5C5C] dark:text-[#9A9A9A] [overflow-wrap:anywhere]">
          {item.meta}
        </span>
      )}
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }
  // A subject row on this page: a plain in-page anchor keeps the current filters.
  if (item.href.startsWith("/skills#")) {
    return (
      <a href={item.href.slice("/skills".length)} className={className}>
        {body}
      </a>
    );
  }
  if (englishOnly) {
    // /blog builds in English only, so /zh-Hans/blog/* does not exist.
    return (
      <Link href={item.href} locale="en-AU" hrefLang="en" className={className}>
        {body}
      </Link>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {body}
    </Link>
  );
}

/** One kind's items: the first few, then "Show all {count}". */
function KindGroup({ kind, items, id, subGroup, Heading }) {
  const { t } = useI18n();
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, SHOWN);
  const listId = `${id}-${kind}`;

  // Subjects in a year read best under their term ("Semester 1, 2020").
  const runs = [];
  for (const item of shown) {
    const key = subGroup ? item.meta || "" : "";
    const last = runs[runs.length - 1];
    if (last && last.key === key) last.items.push(item);
    else runs.push({ key, items: [item] });
  }

  return (
    <div>
      <Heading className={`${MICRO_LABEL} mb-1`}>
        {t(`skillsPage.kindsPlural.${kind}`)}
        <span className="ml-2 tabular-nums">{items.length}</span>
      </Heading>
      <div id={listId}>
        {runs.map((run) => (
          <div key={run.key || "all"}>
            {subGroup && run.key && (
              <p className="mt-2 text-[12px] text-[#5C5C5C] dark:text-[#9A9A9A]">{run.key}</p>
            )}
            <ul className="divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E]">
              {run.items.map((item) => (
                <li key={item.id}>
                  <EvidenceLink item={item} hideMeta={subGroup && Boolean(run.key)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {items.length > SHOWN && (
        <button
          type="button"
          aria-expanded={all}
          aria-controls={listId}
          onClick={() => setAll((v) => !v)}
          className={`mt-1 ${MORE_BUTTON}`}
        >
          {all
            ? t("skillsPage.atlas.showFewer")
            : fill(t("skillsPage.atlas.showAll"), { count: items.length })}
        </button>
      )}
    </div>
  );
}

/**
 * Evidence grouped by kind, in the page's kind order. `id` prefixes the group
 * ids (for aria-controls), `headingLevel` sets the group headings under the
 * caller's own heading, and `subGroupSubjects` splits subjects by term, which
 * is their meta line.
 */
export default function EvidenceList({
  items,
  kinds,
  id,
  headingLevel = 5,
  subGroupSubjects = false,
}) {
  const Heading = `h${headingLevel}`;
  const groups = kinds
    .map((kind) => ({ kind, items: items.filter((item) => item.kind === kind) }))
    .filter((g) => g.items.length);
  return (
    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {groups.map((g) => (
        <KindGroup
          key={g.kind}
          kind={g.kind}
          items={g.items}
          id={id}
          subGroup={subGroupSubjects && g.kind === "subject"}
          Heading={Heading}
        />
      ))}
    </div>
  );
}
