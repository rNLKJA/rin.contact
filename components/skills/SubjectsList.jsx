import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import { MICRO_LABEL, SkillChip } from "@/components/skills/EvidenceList";

const K = "skillsPage.subjects";
const LINK =
  "inline-flex min-h-[32px] items-center text-[13px] text-[#1A1A1A] dark:text-[#DDDDDD] underline decoration-[#D0D0D0] dark:decoration-[#555555] underline-offset-4 hover:text-[#CC0000] hover:decoration-current dark:hover:text-[#FF3C3C] transition-colors duration-200 [overflow-wrap:anywhere]";

/**
 * A rough height for a degree's subject list, so content-visibility reserves
 * about the right space before it renders and anchor jumps land close.
 */
function estimatedHeight(years) {
  const terms = years.reduce((n, y) => n + y.terms.length, 0);
  const rows = years.reduce((n, y) => n + y.terms.reduce((m, tm) => m + tm.subjects.length, 0), 0);
  return 80 + years.length * 48 + terms * 40 + rows * 124;
}

function termHeading(t, term) {
  if (term === null) return t(`${K}.yearOnly`);
  if (term === "winter") return t(`${K}.winter`);
  return t(`courseworkPage.semesters.${term}`);
}

/**
 * Every University of Melbourne subject, grouped by degree, year and term in
 * the order taken. Each row links to its revived labs, its knowledge notes and
 * any role or case study that grew out of it, and lists its topics as links
 * into the atlas. No grades, credit points or WAM: the data carries none.
 */
export default function SubjectsList({ subjects, evidence, skills, onSelectSkill, count }) {
  const { t } = useI18n();
  const noteLabel = Object.fromEntries(
    evidence.filter((e) => e.kind === "note").map((e) => [e.href, e.label])
  );
  const skillLabel = Object.fromEntries(skills.map((s) => [s.id, s.label]));
  const linkText = (kind, label) => fill(t(`${K}.linkFormat`), { kind: t(`${K}.${kind}`), label });

  return (
    <div>
      <p className="mb-8 max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
        {fill(t(`${K}.intro`), { count })}
      </p>

      <div className="space-y-14">
        {subjects.map(({ level, degree, years }) => (
          <section
            key={level}
            aria-labelledby={`subjects-${level}`}
            className="[content-visibility:auto]"
            style={{ containIntrinsicSize: `auto ${estimatedHeight(years)}px` }}
          >
            <h3
              id={`subjects-${level}`}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-4 border-b border-[#F0F0F0] dark:border-[#1E1E1E]"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#CC0000] dark:text-[#FF3C3C]">
                {t(`courseworkPage.levels.${level}`)}
              </span>
              {degree && (
                <>
                  <span className="sr-only">: </span>
                  <span className="text-xl md:text-2xl font-semibold text-black dark:text-white">
                    {degree.role}
                  </span>
                  <span className="sr-only">, </span>
                  <span className="font-sans text-xs tracking-normal tabular-nums text-[#5C5C5C] dark:text-[#9A9A9A]">
                    {degree.period}
                  </span>
                </>
              )}
            </h3>

            {years.map(({ year, terms }) => (
              <div
                key={year}
                className="grid md:grid-cols-[112px_minmax(0,1fr)] gap-x-6 gap-y-3 pt-8"
              >
                <p
                  aria-hidden="true"
                  className="font-display text-4xl md:text-5xl leading-none tabular-nums text-black dark:text-white md:sticky md:top-24 self-start"
                >
                  {year}
                </p>
                <div className="min-w-0 space-y-8">
                  {terms.map(({ term, subjects: rows }) => (
                    <div key={String(term)}>
                      <h4 className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]">
                        <span
                          className="block w-1.5 h-1.5 bg-[#CC0000] dark:bg-[#FF3C3C]"
                          aria-hidden="true"
                        />
                        <span className="sr-only">
                          {fill(t("courseworkPage.yearPrefix"), { year })}
                        </span>
                        {termHeading(t, term)}
                      </h4>
                      <ul className="divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E] border-y border-[#F0F0F0] dark:border-[#1E1E1E]">
                        {rows.map((x) => {
                          const links = [
                            ...x.labs.map((lab) => ({
                              href: `/projects/coursework#${lab.slug}`,
                              text: linkText("lab", lab.title),
                            })),
                            ...x.notes
                              .map((slug) => `/knowledge/${slug}`)
                              .filter((href) => noteLabel[href])
                              .map((href) => ({ href, text: linkText("note", noteLabel[href]) })),
                            ...(x.related
                              ? [{ href: x.related.href, text: t(`${K}.${x.related.kind}`) }]
                              : []),
                          ];
                          return (
                            <li
                              key={x.code}
                              id={`subject-${x.code}`}
                              className="scroll-mt-24 py-4 target:bg-[#FFF5F5] dark:target:bg-[#1A0E0E]"
                            >
                              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                                <span className="font-mono text-[11px] tracking-wider text-[#5C5C5C] dark:text-[#9A9A9A]">
                                  {x.code}
                                </span>
                                <span className="min-w-0 text-[15px] leading-snug text-[#1A1A1A] dark:text-[#EEEEEE] [overflow-wrap:anywhere]">
                                  {x.name}
                                </span>
                              </p>
                              {links.length > 0 && (
                                <ul className="mt-1 flex flex-wrap gap-x-4">
                                  {links.map((l) => (
                                    <li key={l.href}>
                                      <Link href={l.href} className={LINK}>
                                        {l.text}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                <span className={`${MICRO_LABEL} mr-1`}>{t(`${K}.topics`)}</span>
                                {x.skills
                                  .filter((id) => skillLabel[id])
                                  .map((id) => (
                                    <SkillChip
                                      key={id}
                                      id={id}
                                      label={skillLabel[id]}
                                      onSelect={onSelectSkill}
                                    />
                                  ))}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
