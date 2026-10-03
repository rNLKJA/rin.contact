/**
 * /resume: the recruiter-ready resume. Role, level, impact and contact sit above
 * the fold, every number links to the bullet it comes from, and "Save as PDF"
 * prints a clean, text-based A4 document. All content comes from
 * lib/career-data.js (the same data as /cv, /career and /resume/terminal).
 */
import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import { getResume } from "@/lib/career-data";
import { assertCareerData } from "@/lib/career-check";
import ResumeSection from "@/components/resume/ResumeSection";
import RoleEntry from "@/components/resume/RoleEntry";
import CareerStrip from "@/components/resume/CareerStrip";
import MobileActionBar from "@/components/resume/MobileActionBar";
import PrintStyles from "@/components/resume/PrintStyles";
import { useJumpTo } from "@/components/resume/useJumpTo";

const BASE = "https://rin.contact";

export function getStaticProps({ locale = "en-AU" }) {
  assertCareerData();
  const data = getResume(locale);
  const prefix = locale === "zh-Hans" ? "/zh-Hans" : "";
  const pageUrl = `${BASE}${prefix}/resume/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: locale === "zh-Hans" ? "简历 · 黄孙创宇" : "Resume · Sunchuangyu (Rin) Huang",
        inLanguage: locale,
        dateModified: data.asOf,
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#person` },
        mainEntity: { "@id": `${BASE}/#person` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}${prefix}/` },
          { "@type": "ListItem", position: 2, name: "Resume", item: pageUrl },
        ],
      },
      {
        "@type": "Person",
        "@id": `${BASE}/#person`,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of Melbourne",
          url: "https://www.unimelb.edu.au",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "Master of Data Science",
            credentialCategory: "degree",
            recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Melbourne" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Bachelor of Science (Data Science)",
            credentialCategory: "degree",
            recognizedBy: { "@type": "CollegeOrUniversity", name: "University of Melbourne" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Skills Assessment: Statistician (ANZSCO 224113)",
            credentialCategory: "professional assessment",
            recognizedBy: { "@type": "Organization", name: "VETASSESS" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "IELTS General Training, Band 8",
            credentialCategory: "language proficiency",
            recognizedBy: { "@type": "Organization", name: "IELTS" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "NAATI Credentialed Community Language (Mandarin)",
            credentialCategory: "language credential",
            recognizedBy: { "@type": "Organization", name: "NAATI" },
          },
        ],
      },
    ],
  };

  return { props: { data, jsonLd } };
}

const SECTION_LINK =
  "underline decoration-[#E0E0E0] dark:decoration-[#3D3D3D] underline-offset-4 hover:decoration-current transition-colors duration-200";

export default function ResumePage({ data, jsonLd }) {
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  const jump = useJumpTo();
  const { profile, roles, impact, credentials } = data;
  const [copied, setCopied] = useState(false);

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(t("resumePage.actions.emailSubject"))}`;
  const current = roles.find((r) => r.id === "sapol") || roles[0];
  const also = roles.find((r) => r.current && r.id !== current.id);
  const degree = data.education[0];

  // Printed files get a sensible name: the browser uses document.title.
  useEffect(() => {
    const month = data.asOf.slice(0, 7);
    const printTitle = isZh ? `黄孙创宇-简历-${month}` : `Sunchuangyu-Rin-Huang-Resume-${month}`;
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
  }, [data.asOf, isZh]);

  const print = useCallback(() => window.print(), []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = mailto;
    }
  }, [profile.email, mailto]);

  // Glance values are composed per language so the Chinese reads naturally
  // ("2026年3月起", full-width brackets) rather than as translated English.
  const glance = [
    {
      k: t("resumePage.glance.current"),
      v: isZh
        ? `${current.orgShort} ${current.role} · ${current.startLabel}起`
        : `${current.role}, ${current.orgShort} · since ${current.startLabel}`,
      href: `#role-${current.id}`,
    },
    also && {
      k: t("resumePage.glance.also"),
      v: isZh ? `${also.org} ${also.role}` : `${also.role}, ${also.org}`,
      href: `#role-${also.id}`,
    },
    {
      k: t("resumePage.glance.experience"),
      v: isZh
        ? `${data.since}起 · ${data.roleCount} 段经历`
        : `Since ${data.since} · ${data.roleCount} roles`,
      href: "#experience",
    },
    { k: t("resumePage.glance.sectors"), v: profile.sectors },
    {
      k: t("resumePage.glance.basedIn"),
      v: `${profile.location} · ${t("resumePage.glance.basedInNote")}`,
    },
    {
      k: t("resumePage.glance.languages"),
      v: data.languages
        .map((l) => (isZh ? `${l.name}（${l.short}）` : `${l.name} (${l.short})`))
        .join(" · "),
    },
    degree && {
      k: t("resumePage.glance.education"),
      v: isZh ? `${degree.org} ${degree.role}` : `${degree.role}, ${degree.org}`,
    },
    { k: t("resumePage.glance.screening"), v: profile.screening },
  ].filter(Boolean);

  return (
    <>
      <SeoHead
        title={t("resumePage.metaTitle")}
        description={t("resumePage.metaDescription")}
        ogTitle={t("resumePage.ogTitle")}
        path="/resume"
        ogImage={{
          title: t("resumePage.ogTitle"),
          subtitle: t("resumePage.ogSubtitle"),
          section: "resume",
        }}
        locale={locale}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <PrintStyles />
      {/* Phones and tablets: keep focus and the footer clear of the fixed action bar */}
      <style>{`@media screen and (max-width: 1023px) {
        html { scroll-padding-bottom: 6rem; }
        body { padding-bottom: calc(4.5rem + env(safe-area-inset-bottom)); }
      }`}</style>

      <div className="print-root bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          {/* ── Header ─────────────────────────────────────────────────────── */}
          <header className="pt-10 md:pt-14 pb-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
            <div>
              <p className="cv-accent flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] uppercase text-[#CC0000] dark:text-[#FF3C3C] mb-5">
                <span className="block w-2 h-2 bg-current print-keep-bg" aria-hidden="true" />
                {t("resumePage.eyebrow")}
                <span className="text-[#6E6E6E] dark:text-[#9A9A9A] tracking-[0.2em]">
                  · {t("resumePage.updated")} {data.asOfLabel}
                </span>
              </p>
              {isZh ? (
                <>
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white">
                    {profile.nameZh}
                  </h1>
                  <p lang="en" className="mt-2 text-sm text-[#6E6E6E] dark:text-[#9A9A9A]">
                    {profile.name}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white">
                    {profile.name}
                  </h1>
                  <p lang="zh-Hans" className="mt-2 text-sm text-[#6E6E6E] dark:text-[#9A9A9A]">
                    {profile.nameZh}
                  </p>
                </>
              )}
              <p className="mt-5 text-lg md:text-xl text-black dark:text-white">
                {profile.headline}
              </p>
              <p className="text-base text-[#3D3D3D] dark:text-[#AAAAAA]">{profile.subline}</p>
              <p className="mt-1 text-sm text-[#6E6E6E] dark:text-[#9A9A9A]">
                {profile.location} · ACST/ACDT
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <li>
                  <a href={`mailto:${profile.email}`} className={SECTION_LINK}>
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a href={profile.linkedin} className={SECTION_LINK}>
                    linkedin.com/in/sunchuangyuhuang
                  </a>
                </li>
                <li>
                  <a href={profile.github} className={SECTION_LINK}>
                    github.com/rNLKJA
                  </a>
                </li>
                <li>
                  <a href={`https://${profile.site}`} className={SECTION_LINK}>
                    {profile.site}
                  </a>
                </li>
              </ul>
            </div>

            {/* Actions: desktop cluster (phones use the bottom bar) */}
            <div className="hidden lg:flex print:hidden flex-col items-end gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={print}
                  className="border border-[#CC0000] bg-[#CC0000] px-5 py-2.5 text-[11px] tracking-widest uppercase text-white hover:bg-[#A30000] transition-colors duration-200"
                >
                  {t("resumePage.actions.savePdf")}
                </button>
                <a
                  href={mailto}
                  className="border border-[#1A1A1A] dark:border-[#EEEEEE] px-5 py-2.5 text-[11px] tracking-widest uppercase text-black dark:text-white hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-[#EEEEEE] dark:hover:text-black transition-colors duration-200"
                >
                  {t("resumePage.actions.email")}
                </a>
              </div>
              <div className="flex items-center gap-4 text-[11px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
                <span>{t("resumePage.pdfMeta")}</span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {copied ? t("resumePage.actions.copied") : t("resumePage.actions.copyEmail")}
                </button>
                <span role="status" aria-live="polite" className="sr-only">
                  {copied ? t("resumePage.actions.copied") : ""}
                </span>
                <Link
                  href="/cv"
                  className="hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {t("resumePage.actions.viewDocument")} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </header>

          {/* ── Body: glance rail + main column ─────────────────────────────── */}
          <div className="print-block lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
            <aside
              aria-labelledby="glance-h"
              className="print-static pt-8 lg:col-start-2 lg:row-start-1 lg:sticky lg:top-24 self-start"
            >
              <h2
                id="glance-h"
                className="sr-only lg:not-sr-only cv-accent lg:!flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] uppercase text-[#CC0000] dark:text-[#FF3C3C] mb-5"
              >
                <span className="block w-1.5 h-1.5 bg-current print-keep-bg" aria-hidden="true" />
                <span className="cv-accent">{t("resumePage.glance.heading")}</span>
              </h2>
              <dl className="print-glance grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-px bg-[#F0F0F0] dark:bg-[#1E1E1E] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
                {glance.map((g) => (
                  <div key={g.k} className="bg-white dark:bg-[#0A0A0A] px-4 py-3 print-avoid">
                    <dt className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mb-1">
                      {g.k}
                    </dt>
                    <dd className="text-sm font-medium leading-snug text-[#1A1A1A] dark:text-[#EEEEEE]">
                      {g.href ? (
                        <a href={g.href} onClick={(e) => jump(e, g.href)} className={SECTION_LINK}>
                          {g.v}
                        </a>
                      ) : (
                        g.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>

            <div className="lg:col-start-1 lg:row-start-1 min-w-0">
              {/* 01 Summary */}
              <ResumeSection
                id="summary"
                n="01"
                title={t("resumePage.sections.summary")}
                className="border-t-0"
              >
                <p className="text-[15px] leading-relaxed text-[#1A1A1A] dark:text-[#DDDDDD] max-w-[62ch]">
                  {profile.summary}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
                    {t("resumePage.sections.openTo")}
                  </span>
                  {profile.openTo.map((o) => (
                    <span
                      key={o}
                      className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]"
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </ResumeSection>

              {/* 02 Impact */}
              <ResumeSection id="impact" n="02" title={t("resumePage.sections.impact")}>
                <ol className="print-impact grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#F0F0F0] dark:bg-[#1E1E1E] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
                  {impact.map((m) => (
                    <li key={m.href} className="bg-white dark:bg-[#0A0A0A]">
                      <a
                        href={m.href}
                        onClick={(e) => jump(e, m.href)}
                        className="group flex h-full flex-col px-5 py-4 hover:bg-[#FAFAFA] dark:hover:bg-[#111111] transition-colors duration-200"
                      >
                        <span className="print-value font-display text-3xl tabular-nums leading-none text-black dark:text-white">
                          {m.value}
                        </span>
                        <span className="mt-2 text-sm leading-snug text-[#3D3D3D] dark:text-[#AAAAAA]">
                          {m.label}
                        </span>
                        <span className="cv-accent mt-3 font-mono text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C]">
                          {m.orgShort} · {m.year}{" "}
                          <span
                            aria-hidden="true"
                            className="inline-block group-hover:translate-x-0.5 transition-transform duration-200 print:hidden"
                          >
                            →
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </ResumeSection>

              {/* 03 Timeline strip */}
              <ResumeSection id="timeline" n="03" title={t("resumePage.sections.timeline")}>
                <CareerStrip rows={data.strip} asOf={data.asOf} t={t} />
              </ResumeSection>

              {/* 04 Experience */}
              <ResumeSection id="experience" n="04" title={t("resumePage.sections.experience")}>
                {roles.map((r) => (
                  <RoleEntry key={r.id} role={r} t={t} />
                ))}
              </ResumeSection>

              {/* 05 Skills */}
              <ResumeSection id="skills" n="05" title={t("resumePage.sections.skills")}>
                <dl className="divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E]">
                  {data.skills.map((g) => (
                    <div
                      key={g.id}
                      className="grid sm:grid-cols-[180px_minmax(0,1fr)] gap-x-6 gap-y-2 py-3 first:pt-0 print-avoid"
                    >
                      <dt className="text-xs font-semibold text-black dark:text-white">
                        {g.group}
                      </dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {g.items.map((s) => (
                          <span
                            key={s}
                            className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]"
                          >
                            {s}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </ResumeSection>

              {/* 06 Education */}
              <ResumeSection id="education" n="06" title={t("resumePage.sections.education")}>
                <ul className="space-y-3">
                  {data.education.map((e) => (
                    <li
                      key={e.id}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
                    >
                      <div>
                        <p className="text-sm font-semibold text-black dark:text-white">{e.role}</p>
                        <p className="text-xs text-[#5C5C5C] dark:text-[#9A9A9A]">
                          {e.org} · {e.line}
                        </p>
                      </div>
                      <span className="text-[11px] tabular-nums text-[#6E6E6E] dark:text-[#9A9A9A]">
                        {e.period}
                      </span>
                    </li>
                  ))}
                </ul>
              </ResumeSection>

              {/* 07 Credentials and languages */}
              <ResumeSection id="credentials" n="07" title={t("resumePage.sections.credentials")}>
                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {credentials.key.map((c) => (
                    <div key={c.name} className="print-avoid">
                      <dt className="text-sm font-semibold text-black dark:text-white">{c.name}</dt>
                      <dd className="text-xs text-[#5C5C5C] dark:text-[#9A9A9A]">{c.note}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {credentials.featured.map((c) => (
                    <li key={c.name} className="flex gap-2.5 items-baseline text-[13px]">
                      <span
                        className="cv-accent w-1.5 h-1.5 rounded-full bg-[#CC0000] dark:bg-[#FF3C3C] flex-shrink-0 translate-y-[-2px] print-keep-bg"
                        aria-hidden="true"
                      />
                      <span className="text-[#1A1A1A] dark:text-[#DDDDDD]">
                        {c.name}
                        <span className="text-[#6E6E6E] dark:text-[#9A9A9A]">
                          {" "}
                          · {c.issuer}
                          {c.year ? `, ${c.year}` : ""}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs">
                  <Link href="/cv#certifications" className={SECTION_LINK}>
                    {t("resumePage.credentials.morePrefix")}
                    {credentials.moreCount}
                    {t("resumePage.credentials.moreSuffix")}
                  </Link>
                </p>

                <h3 className="mt-7 mb-3 font-mono text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
                  {t("resumePage.sections.languages")}
                </h3>
                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {data.languages.map((l) => (
                    <div key={l.name}>
                      <dt className="inline text-sm font-semibold text-black dark:text-white">
                        {l.name}
                      </dt>
                      <dd className="inline text-sm text-[#5C5C5C] dark:text-[#9A9A9A]">
                        {" "}
                        · {l.level}
                      </dd>
                    </div>
                  ))}
                </dl>
              </ResumeSection>

              {/* Go deeper */}
              <nav
                aria-label={t("resumePage.sections.goDeeper")}
                className="print:hidden border-t border-[#F0F0F0] dark:border-[#1E1E1E] py-8"
              >
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#F0F0F0] dark:bg-[#1E1E1E] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
                  {[
                    { href: "/cv", key: "cv" },
                    { href: "/career", key: "career" },
                    { href: "/projects", key: "projects" },
                    { href: "/resume/terminal", key: "terminal" },
                  ].map((l) => (
                    <li key={l.key} className="bg-white dark:bg-[#0A0A0A]">
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between gap-3 px-5 py-4 text-sm text-black dark:text-white hover:bg-[#FAFAFA] dark:hover:bg-[#111111] transition-colors duration-200"
                      >
                        {t(`resumePage.goDeeper.${l.key}`)}
                        <span
                          aria-hidden="true"
                          className="text-[#CC0000] dark:text-[#FF3C3C] group-hover:translate-x-0.5 transition-transform duration-200"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <p className="border-t border-[#F0F0F0] dark:border-[#1E1E1E] py-6 text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A]">
                {t("resumePage.footer.referees")} · {t("resumePage.updated")} {data.asOfLabel} ·{" "}
                rin.contact/resume
              </p>
            </div>
          </div>
        </div>
      </div>

      <MobileActionBar t={t} onPrint={print} mailto={mailto} />
    </>
  );
}
