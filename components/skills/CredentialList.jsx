import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import { MICRO_LABEL, SkillChip } from "@/components/skills/EvidenceList";

const K = "skillsPage.credentials";

/**
 * Every credential, the same list as /resume: provider chips with counts (the
 * buckets CertificationsSection uses, with localised labels), then the list,
 * newest first, each with the skills it adds evidence to.
 */
export default function CredentialList({ credentials, skills, onSelectSkill, count }) {
  const { t } = useI18n();
  const skillLabel = Object.fromEntries(skills.map((s) => [s.id, s.label]));
  const provider = (key) => t(`${K}.providers.${key}`);

  return (
    <div className="[content-visibility:auto] [contain-intrinsic-size:auto_1400px]">
      <p className="mb-6 max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
        {fill(t(`${K}.intro`), { count })}
      </p>

      <ul aria-label={t(`${K}.byProvider`)} className="flex flex-wrap gap-2 mb-8">
        {credentials.providers.map(([key, n]) => (
          <li
            key={key}
            className="inline-flex items-center gap-2 border border-[#E8E8E8] dark:border-[#2A2A2A] px-3 py-1 text-[11px] tracking-wide"
          >
            <span className="text-black dark:text-white">{provider(key)}</span>
            <span className="text-accent-ink font-mono tabular-nums">{n}</span>
          </li>
        ))}
      </ul>

      <ul className="divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E] border-y border-[#F0F0F0] dark:border-[#1E1E1E]">
        {credentials.items.map((c) => (
          <li
            key={c.id}
            className="py-4 grid gap-x-6 gap-y-2 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div className="min-w-0">
              <p
                lang="en"
                className="text-[15px] leading-snug text-[#1A1A1A] dark:text-[#EEEEEE] [overflow-wrap:anywhere]"
              >
                {c.name}
              </p>
              <p className="mt-0.5 text-[12px] text-[#5C5C5C] dark:text-[#9A9A9A]">
                <span lang="en">{c.issuer}</span>
                {c.year && <span className="tabular-nums"> · {c.year}</span>}
                <span className="sr-only"> · {provider(c.provider)}</span>
              </p>
            </div>
            {c.skills.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
                <span className={`${MICRO_LABEL} mr-1`}>{t(`${K}.feeds`)}</span>
                {c.skills.map((id) => (
                  <SkillChip key={id} id={id} label={skillLabel[id]} onSelect={onSelectSkill} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
