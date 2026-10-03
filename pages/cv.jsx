import { useCallback, useEffect } from "react";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import BackToTop from "@/components/ui/BackToTop";
import { useI18n } from "@/contexts/I18nContext";
import { buildExperience, buildEducation } from "@/components/cv/cvData";
import { CERTS, groupCertsByIssuer, getLanguages, CAREER_AS_OF } from "@/lib/career-data";
import { assertCareerData } from "@/lib/career-check";
import ResumeSection from "@/components/resume/ResumeSection";
import PrintStyles from "@/components/resume/PrintStyles";

// Build the CV at build time from lib/career-data.js, the same data behind /career,
// /resume and the resume terminal, so it can never drift from the rest of the site
// and adds no client weight. Each entry carries en-AU and zh-Hans copy.
export function getStaticProps({ locale = "en-AU" }) {
  assertCareerData();
  return {
    props: {
      // The long-form document: every bullet for every role.
      experience: buildExperience(locale, { bulletsPerRole: Infinity }),
      education: buildEducation(locale),
      // Credentials grouped by issuer, largest group first. Names are proper
      // nouns, identical across locales.
      certGroups: groupCertsByIssuer(CERTS),
      certTotal: CERTS.length,
      languages: getLanguages(locale),
      asOf: CAREER_AS_OF,
    },
  };
}

// Skill groups — labels and item lists localised via cvPage.skills.<key>.
const SKILL_KEYS = ["dataAnalytics", "intelligence", "engineering"];

// Contact rows — labels localised via cvPage.contact.<key>; values are stable
// identifiers that read the same in every language.
const CONTACT = [
  { key: "email", value: "huang@rin.contact", href: "mailto:huang@rin.contact" },
  { key: "site", value: "rin.contact", href: "https://rin.contact" },
  {
    key: "linkedin",
    value: "in/sunchuangyuhuang",
    href: "https://www.linkedin.com/in/sunchuangyuhuang/",
  },
  { key: "github", value: "rNLKJA", href: "https://github.com/rNLKJA" },
  { key: "location", value: null, href: null },
];

export default function CvPage({ experience, education, certGroups, certTotal, languages, asOf }) {
  const { t, locale = "en-AU" } = useI18n();

  // "Save as PDF" uses the browser's own print: selectable, searchable text and
  // working links, and the CSP allows it (a CDN capture library was blocked).
  // The saved file takes its name from document.title, so set it while printing.
  useEffect(() => {
    const month = asOf.slice(0, 7);
    const printTitle =
      locale === "zh-Hans" ? `黄孙创宇-完整简历-${month}` : `Sunchuangyu-Rin-Huang-CV-${month}`;
    let previous = "";
    const before = () => {
      previous = document.title;
      document.title = printTitle;
    };
    const after = () => {
      if (previous) document.title = previous;
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, [asOf, locale]);

  const downloadPdf = useCallback(() => window.print(), []);

  return (
    <>
      <SeoHead
        title={t("cvPage.metaTitle")}
        description={t("cvPage.metaDescription")}
        path="/cv"
        ogImage={{ title: t("cvPage.ogTitle"), subtitle: t("cvPage.ogSubtitle"), section: "cv" }}
        locale={locale}
      />

      <BackToTop />
      <div className="bg-white dark:bg-[#0A0A0A] min-h-screen print-root">
        <div className="max-w-[820px] mx-auto px-6 md:px-12 py-14 md:py-20">
          {/* Action bar — hidden when printing */}
          <div className="cv-noprint flex items-center justify-between gap-4 mb-12">
            <Link
              href="/resume"
              className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              ← {t("cvPage.backToResume")}
            </Link>
            <button
              onClick={downloadPdf}
              className="inline-flex items-center gap-2 border border-[#CC0000] dark:border-[#FF3C3C] px-5 py-2 text-[11px] tracking-widest uppercase
                         text-[#CC0000] dark:text-[#FF3C3C] hover:bg-[#CC0000] hover:text-white dark:hover:bg-[#CC0000] dark:hover:border-[#CC0000] transition-colors duration-200"
            >
              {t("cvPage.savePdf")}
            </button>
          </div>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-[#E5E5E5] dark:border-[#262626]">
            <p className="cv-accent text-[11px] tracking-[0.3em] uppercase text-[#CC0000] dark:text-[#FF3C3C] mb-3 font-mono">
              {t("cvPage.eyebrow")}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white mb-1">
              Sunchuangyu (Rin) Huang
            </h1>
            <p className="text-base text-[#3D3D3D] dark:text-[#AAAAAA] mb-5">
              {t("cvPage.tagline")}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[#5C5C5C] dark:text-[#9A9A9A]">
              {CONTACT.map((c) => {
                const value = c.value ?? t("cvPage.locationValue");
                return (
                  <li key={c.key}>
                    <span className="text-[#6E6E6E] dark:text-[#9A9A9A] mr-1.5">
                      {t(`cvPage.contact.${c.key}`)}
                    </span>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="hover:text-[#CC0000] dark:hover:text-[#FF3C3C] transition-colors duration-200"
                      >
                        {value}
                      </a>
                    ) : (
                      <span>{value}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </header>

          {/* Summary */}
          <ResumeSection id="profile" title={t("cvPage.sections.profile")} className="border-t-0">
            <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
              {t("cvPage.profileBody")}
            </p>
          </ResumeSection>

          {/* Objective — positioning statement (求职意向 in zh) */}
          <ResumeSection id="objective" title={t("cvPage.objective.title")}>
            <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
              {t("cvPage.objective.body")}
            </p>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection id="experience" title={t("cvPage.sections.experience")}>
            <div className="space-y-7">
              {experience.map((x, i) => (
                <article key={i} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h3 className="text-sm font-semibold text-black dark:text-white">{x.role}</h3>
                    <span className="text-[11px] tabular-nums text-[#6E6E6E] dark:text-[#9A9A9A]">
                      {x.period}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5C5C] dark:text-[#9A9A9A] mb-1.5">
                    {x.org}
                    {x.location ? (
                      <span className="text-[#6E6E6E] dark:text-[#9A9A9A]"> · {x.location}</span>
                    ) : null}
                  </p>
                  {x.summary && (
                    <p className="text-[13px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-1.5">
                      {x.summary}
                    </p>
                  )}
                  {x.bullets.length > 0 && (
                    <ul className="space-y-1">
                      {x.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-[13px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed"
                        >
                          <span
                            className="cv-accent text-[#CC0000] dark:text-[#FF3C3C] flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          >
                            ·
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </ResumeSection>

          {/* Education */}
          <ResumeSection id="education" title={t("cvPage.sections.education")}>
            <div className="space-y-3">
              {education.map((e, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 break-inside-avoid"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-black dark:text-white inline">
                      {e.role}
                    </h3>
                    <span className="text-xs text-[#5C5C5C] dark:text-[#9A9A9A]"> — {e.org}</span>
                  </div>
                  <span className="text-[11px] tabular-nums text-[#6E6E6E] dark:text-[#9A9A9A]">
                    {e.period}
                  </span>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection id="skills" title={t("cvPage.sections.skills")}>
            <dl className="space-y-2">
              {SKILL_KEYS.map((key) => (
                <div key={key} className="flex flex-col sm:flex-row sm:gap-4 break-inside-avoid">
                  <dt className="text-xs font-semibold text-black dark:text-white sm:w-48 flex-shrink-0">
                    {t(`cvPage.skills.${key}.group`)}
                  </dt>
                  <dd className="text-[13px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                    {t(`cvPage.skills.${key}.items`)}
                  </dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          {/* Certifications */}
          <ResumeSection
            id="certifications"
            title={`${t("cvPage.sections.certifications")} (${certTotal})`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {certGroups.map((g) => (
                <div key={g.issuer} className="break-inside-avoid">
                  <p className="text-xs font-semibold text-black dark:text-white">
                    {g.issuer}{" "}
                    <span className="cv-accent text-[#CC0000] dark:text-[#FF3C3C] font-normal">
                      ({g.count})
                    </span>
                  </p>
                  <p className="text-[12px] text-[#5C5C5C] dark:text-[#9A9A9A] leading-relaxed">
                    {g.names.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Languages */}
          <ResumeSection id="languages" title={t("resumePage.sections.languages")}>
            <dl className="space-y-1">
              {languages.map((l) => (
                <div key={l.name} className="text-[13px] text-[#3D3D3D] dark:text-[#AAAAAA]">
                  <dt className="inline font-semibold text-black dark:text-white">{l.name}</dt>
                  <dd className="inline"> · {l.level}</dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          {/* Foot */}
          <p className="cv-noprint mt-12 pt-6 border-t border-[#E5E5E5] dark:border-[#262626] text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A]">
            {t("cvPage.footPrefix")}{" "}
            <Link href="/" className="text-[#CC0000] dark:text-[#FF3C3C] hover:underline">
              rin.contact
            </Link>
            .
          </p>
        </div>
      </div>

      <PrintStyles />
    </>
  );
}
