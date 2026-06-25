import { useCallback, useRef } from "react";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import BackToTop from "@/components/ui/BackToTop";
import { useI18n } from "@/contexts/I18nContext";
import { buildExperience, buildEducation } from "@/components/cv/cvData";
import { CERTS } from "@/components/sections/CertificationsSection";

// Build the CV from the same verified data that powers /career and /about, at build
// time, so it can never drift from the rest of the site and adds no client weight.
// Experience/education are built per locale (en-AU derives from the shared data;
// zh-Hans is the hand-translated layer) so the Chinese CV reads in Chinese too.
export function getStaticProps() {
  const experienceByLocale = {
    "en-AU": buildExperience("en-AU"),
    "zh-Hans": buildExperience("zh-Hans"),
  };
  const educationByLocale = {
    "en-AU": buildEducation("en-AU"),
    "zh-Hans": buildEducation("zh-Hans"),
  };

  // Group certifications by issuer, ordered by how many Rin holds. Issuer and
  // cert names are proper nouns — kept identical across locales.
  const byIssuer = {};
  for (const c of CERTS) (byIssuer[c.issuer] ||= []).push(c.name);
  const certGroups = Object.entries(byIssuer)
    .map(([issuer, names]) => ({ issuer, names, count: names.length }))
    .sort((a, b) => b.count - a.count || a.issuer.localeCompare(b.issuer));

  return {
    props: { experienceByLocale, educationByLocale, certGroups, certTotal: CERTS.length },
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

export default function CvPage({ experienceByLocale, educationByLocale, certGroups, certTotal }) {
  const { t, locale = "en-AU" } = useI18n();
  const experience = experienceByLocale[locale] || experienceByLocale["en-AU"];
  const education = educationByLocale[locale] || educationByLocale["en-AU"];
  const cvRef = useRef(null);

  // One-click PDF download. Lazy-loads html2pdf from a CDN on first click (no
  // bundle weight); forces a clean light render via .cv-pdf-export during the
  // capture, and falls back to the browser print dialog if the library can't
  // load (offline / blocked).
  const downloadPdf = useCallback(async () => {
    if (typeof window === "undefined") return;
    const el = cvRef.current;
    if (!el) return window.print();
    const ensureLib = () =>
      new Promise((resolve, reject) => {
        if (window.html2pdf) return resolve(window.html2pdf);
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        s.onload = () => resolve(window.html2pdf);
        s.onerror = reject;
        document.head.appendChild(s);
      });
    try {
      const html2pdf = await ensureLib();
      el.classList.add("cv-pdf-export");
      const filename = locale === "zh-Hans" ? "Rin-Huang-简历.pdf" : "Rin-Huang-CV.pdf";
      await html2pdf()
        .set({
          margin: [10, 10, 12, 10],
          filename,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "avoid-all"] },
        })
        .from(el)
        .save();
    } catch (e) {
      window.print();
    } finally {
      el.classList.remove("cv-pdf-export");
    }
  }, [locale]);

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
      <div className="bg-white dark:bg-[#0A0A0A] min-h-screen cv-print-root">
        <div ref={cvRef} className="max-w-[820px] mx-auto px-6 md:px-12 py-14 md:py-20">
          {/* Action bar — hidden when printing */}
          <div className="cv-noprint flex items-center justify-between gap-4 mb-12">
            <Link
              href="/resume"
              className="text-[10px] tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white transition-colors"
            >
              ← {t("cvPage.backToResume")}
            </Link>
            <button
              onClick={downloadPdf}
              className="inline-flex items-center gap-2 border border-[#FF3C3C] px-5 py-2 text-[11px] tracking-widest uppercase
                         text-[#FF3C3C] hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200"
            >
              {t("cvPage.savePdf")}
            </button>
          </div>

          {/* Header */}
          <header className="mb-10 pb-8 border-b border-[#E5E5E5] dark:border-[#262626]">
            <p className="cv-accent text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-3 font-mono">
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
                      <a href={c.href} className="hover:text-[#FF3C3C] transition-colors">
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
          <Section title={t("cvPage.sections.profile")}>
            <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
              {t("cvPage.profileBody")}
            </p>
          </Section>

          {/* Objective — positioning statement (求职意向 in zh) */}
          <Section title={t("cvPage.objective.title")}>
            <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
              {t("cvPage.objective.body")}
            </p>
          </Section>

          {/* Experience */}
          <Section title={t("cvPage.sections.experience")}>
            <div className="space-y-7">
              {experience.map((x, i) => (
                <article key={i} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h3 className="text-sm font-semibold text-black dark:text-white">{x.role}</h3>
                    <span className="text-[11px] tabular-nums text-[#7A7A7A] dark:text-[#9A9A9A]">
                      {x.period}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5C5C] dark:text-[#9A9A9A] mb-1.5">
                    {x.org}
                    {x.location ? (
                      <span className="text-[#BBBBBB] dark:text-[#555]"> · {x.location}</span>
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
                            className="cv-accent text-[#FF3C3C] flex-shrink-0 mt-0.5"
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
          </Section>

          {/* Education */}
          <Section title={t("cvPage.sections.education")}>
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
                  <span className="text-[11px] tabular-nums text-[#7A7A7A] dark:text-[#9A9A9A]">
                    {e.period}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title={t("cvPage.sections.skills")}>
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
          </Section>

          {/* Certifications */}
          <Section title={`${t("cvPage.sections.certifications")} (${certTotal})`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {certGroups.map((g) => (
                <div key={g.issuer} className="break-inside-avoid">
                  <p className="text-xs font-semibold text-black dark:text-white">
                    {g.issuer}{" "}
                    <span className="cv-accent text-[#FF3C3C] font-normal">({g.count})</span>
                  </p>
                  <p className="text-[12px] text-[#5C5C5C] dark:text-[#9A9A9A] leading-relaxed">
                    {g.names.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Foot */}
          <p className="cv-noprint mt-12 pt-6 border-t border-[#E5E5E5] dark:border-[#262626] text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A]">
            {t("cvPage.footPrefix")}{" "}
            <Link href="/" className="text-[#FF3C3C] hover:underline">
              rin.contact
            </Link>
            .
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          /* Hide on-screen-only chrome (action bar, footer note). */
          .cv-noprint { display: none !important; }

          /* A recruiter may hit "Save as PDF" while browsing in dark mode. Force a
             clean black-on-white document regardless of the on-screen theme, so the
             CV is always readable and ink-efficient. The brand accent is preserved
             on the elements tagged .cv-accent. */
          html, body { background: #ffffff !important; }
          .cv-print-root { background: #ffffff !important; }
          .cv-print-root *:not(.cv-accent) {
            color: #1a1a1a !important;
            background-color: transparent !important;
            border-color: #d8d8d8 !important;
          }
          .cv-print-root .cv-accent { color: #ff3c3c !important; }

          /* Keep the accent and rules in the saved PDF rather than letting the
             browser strip colours. */
          .cv-print-root, .cv-print-root * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @page { margin: 14mm; }
        }

        /* One-click PDF export (html2pdf): force a clean light render while the
           CV element is captured, regardless of the on-screen theme. Mirrors the
           print rules but as a toggled class html2canvas can see. */
        .cv-pdf-export { background: #ffffff !important; }
        .cv-pdf-export *:not(.cv-accent) {
          color: #1a1a1a !important;
          background-color: transparent !important;
          border-color: #d8d8d8 !important;
        }
        .cv-pdf-export .cv-accent { color: #ff3c3c !important; }
        .cv-pdf-export .cv-noprint { display: none !important; }
      `}</style>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-9">
      <h2 className="cv-accent text-[11px] tracking-[0.25em] uppercase text-[#FF3C3C] mb-4 pb-2 border-b border-[#F0F0F0] dark:border-[#1E1E1E]">
        {title}
      </h2>
      {children}
    </section>
  );
}
