import { fill } from "@/lib/fill";

const K = "courseworkPage.matrix";
const GROUP =
  "font-mono text-[10px] tracking-[0.25em] uppercase text-[#CC0000] dark:text-[#FF3C3C] text-left";

/**
 * Skill -> project dot matrix: one row per canonical skill, one column per
 * project (oldest on the left), a filled dot where the project demonstrates the
 * skill. Choosing a skill filters the timeline. Columns outside the current
 * filter fade back, and their headings stop linking to cards that are not on
 * the page. A table from md up; a list on phones, where one column per project would not
 * fit. There is deliberately no per-skill count: a tally of self-tagged skills
 * reads like a score.
 */
export default function SkillsMatrix({
  t,
  locale,
  groups,
  capabilities,
  projects,
  visible,
  activeSkill,
  onSelectSkill,
}) {
  const isZh = locale === "zh-Hans";
  const titleOf = Object.fromEntries(projects.map((p) => [p.slug, p.title]));
  const rows = groups
    .map((g) => ({ group: g, caps: capabilities.filter((c) => c.group === g) }))
    .filter((g) => g.caps.length);

  const skillButton = (c, className) => (
    <button
      type="button"
      onClick={() => onSelectSkill(c.id)}
      aria-pressed={activeSkill === c.id}
      title={fill(t(`${K}.filterBy`), { skill: c.label })}
      className={`text-left hover:text-[#CC0000] dark:hover:text-[#FF3C3C] transition-colors duration-200 ${
        activeSkill === c.id ? "text-[#CC0000] dark:text-[#FF3C3C]" : ""
      } ${className}`}
    >
      {c.label}
    </button>
  );

  return (
    <>
      {/* md and up: the matrix */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="sr-only">{t(`${K}.caption`)}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="align-bottom pb-3 pr-4 text-left text-[10px] tracking-widest uppercase font-normal text-[#5C5C5C] dark:text-[#9A9A9A]"
              >
                {t(`${K}.skill`)}
              </th>
              {projects.map((p) => {
                const shown = visible.has(p.slug);
                const Label = shown ? "a" : "span";
                return (
                  <th
                    key={p.slug}
                    scope="col"
                    className={`align-bottom pb-3 px-0.5 font-normal transition-opacity duration-200 ${
                      shown ? "" : "opacity-40"
                    }`}
                  >
                    <Label
                      {...(shown ? { href: `#${p.slug}` } : {})}
                      className={`mx-auto inline-block max-h-[168px] overflow-hidden text-[11px] leading-tight text-[#3D3D3D] dark:text-[#CCCCCC] [writing-mode:vertical-rl] ${
                        shown
                          ? "hover:text-[#CC0000] dark:hover:text-[#FF3C3C] transition-colors duration-200"
                          : ""
                      } ${isZh ? "" : "rotate-180"}`}
                    >
                      <span className="sr-only">{p.subjectCode} </span>
                      {p.title}
                    </Label>
                  </th>
                );
              })}
            </tr>
          </thead>
          {rows.map(({ group, caps }) => (
            <tbody key={group}>
              <tr>
                <th scope="rowgroup" colSpan={projects.length + 1} className={`${GROUP} pt-5 pb-2`}>
                  {t(`courseworkPage.areas.${group}`)}
                </th>
              </tr>
              {caps.map((c) => (
                <tr
                  key={c.id}
                  className={`border-t border-[#F0F0F0] dark:border-[#1E1E1E] ${
                    activeSkill === c.id
                      ? "bg-[#FFF1F1] dark:bg-[#1F0E0E]"
                      : "hover:bg-[#FAFAFA] dark:hover:bg-[#111111]"
                  }`}
                >
                  <th
                    scope="row"
                    className="py-1.5 pr-4 text-left text-[13px] font-normal leading-snug text-[#1A1A1A] dark:text-[#DDDDDD]"
                  >
                    {skillButton(c, "min-h-[24px]")}
                  </th>
                  {projects.map((p) => {
                    const has = c.projects.includes(p.slug);
                    return (
                      <td
                        key={p.slug}
                        className={`py-1.5 text-center transition-opacity duration-200 ${
                          visible.has(p.slug) ? "" : "opacity-40"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`inline-block rounded-full ${
                            has
                              ? "w-2.5 h-2.5 bg-[#CC0000] dark:bg-[#FF3C3C]"
                              : "w-1.5 h-1.5 bg-[#E0E0E0] dark:bg-[#333333]"
                          }`}
                        />
                        {has && <span className="sr-only">{t(`${K}.yes`)}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Phones: the same data as a list */}
      <div className="md:hidden space-y-6">
        {rows.map(({ group, caps }) => (
          <div key={group}>
            <h3 className={`${GROUP} mb-2`}>{t(`courseworkPage.areas.${group}`)}</h3>
            <ul className="divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E] border-y border-[#F0F0F0] dark:border-[#1E1E1E]">
              {caps.map((c) => (
                <li key={c.id} className="py-3">
                  <p>
                    {skillButton(
                      c,
                      "min-h-[24px] text-sm font-medium text-[#1A1A1A] dark:text-[#DDDDDD]"
                    )}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#5C5C5C] dark:text-[#9A9A9A]">
                    {c.projects.map((slug) => titleOf[slug]).join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
