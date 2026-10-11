/**
 * /projects/coursework: University of Melbourne coursework (2019 to 2024),
 * revived in 2026 as live demos. Project copy comes from lib/coursework-data.js
 * (en and zh per entry), degree names from lib/career-data.js and UI strings
 * from locales (courseworkPage). Filters live in the URL (?area=&level=&skill=)
 * so a filtered view can be shared, like /projects?category=.
 */
import { useCallback, useMemo, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import PageHero from "@/components/layout/PageHero";
import SemesterGrid from "@/components/sections/SemesterGrid";
import BackToTop from "@/components/ui/BackToTop";
import ResumeSection from "@/components/resume/ResumeSection";
import CourseworkCard from "@/components/coursework/CourseworkCard";
import CourseworkFilters from "@/components/coursework/CourseworkFilters";
import SkillsMatrix from "@/components/coursework/SkillsMatrix";
import PipelineList from "@/components/sections/PipelineList";
import { COURSEWORK_PIPELINE, localisePipeline } from "@/lib/pipeline-data";
import { fill } from "@/lib/fill";
import { useI18n } from "@/contexts/I18nContext";
import { getCoursework } from "@/lib/coursework-data";
import { assertCourseworkData } from "@/lib/coursework-check";
import EmptyState from "@/components/ui/EmptyState";
import en from "@/locales/en-AU.json";
import zh from "@/locales/zh-Hans.json";

const BASE = "https://rin.contact";
const PATH = "/projects/coursework";
const ALL = "all";
const STACK_LABEL =
  "block mb-1 font-mono text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]";

export function getStaticProps({ locale = "en-AU" }) {
  assertCourseworkData([en.courseworkPage, zh.courseworkPage]);
  const data = getCoursework(locale);
  const copy = (locale === "zh-Hans" ? zh : en).courseworkPage;
  const prefix = locale === "zh-Hans" ? "/zh-Hans" : "";
  const pageUrl = `${BASE}${prefix}${PATH}/`;
  const vars = { count: data.stats.projects, from: data.stats.from, to: data.stats.to };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.ogTitle,
        description: fill(copy.metaDescription, vars),
        inLanguage: locale,
        dateModified: data.asOf,
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#person` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#projects` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: `${BASE}${prefix}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumb.projects,
            item: `${BASE}${prefix}/projects/`,
          },
          { "@type": "ListItem", position: 3, name: copy.breadcrumb.coursework, item: pageUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#projects`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: data.projects.length,
        itemListElement: data.projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${pageUrl}#${p.slug}`,
            name: p.title,
            description: p.summary,
            url: p.liveUrl,
            dateCreated: p.dateTime,
            inLanguage: locale,
            educationalLevel: copy.levels[p.level],
            keywords: p.skills.join(", "),
            about: { "@type": "DefinedTerm", termCode: p.subjectCode, name: p.subject },
            sourceOrganization: {
              "@type": "CollegeOrUniversity",
              name: data.university.name,
              url: data.university.url,
            },
            author: { "@id": `${BASE}/#person` },
            // Teammates are credited on the page but not published as schema.org
            // Person entries until they have agreed to be indexed by name.
          },
        })),
      },
    ],
  };

  // The OG image renderer ships Latin fonts only, so its text stays in English.
  const ogImage = {
    title: en.courseworkPage.heading,
    subtitle: fill(en.courseworkPage.ogSubtitle, vars),
    section: "projects",
  };

  return { props: { data, jsonLd, ogImage } };
}

/** Level -> year -> semester groups, keeping the chronological order of `projects`. */
function groupTimeline(projects, levels) {
  return levels
    .map((level) => {
      const years = [];
      for (const p of projects.filter((x) => x.level === level)) {
        let year = years.find((y) => y.year === p.term.year);
        if (!year) years.push((year = { year: p.term.year, terms: [] }));
        let term = year.terms.find((s) => s.semester === p.term.semester);
        if (!term) year.terms.push((term = { semester: p.term.semester, projects: [] }));
        term.projects.push(p);
      }
      return { level, years };
    })
    .filter((g) => g.years.length > 0);
}

export default function CourseworkPage({ data, jsonLd, ogImage }) {
  const { t, locale = "en-AU" } = useI18n();
  const router = useRouter();
  const statusRef = useRef(null);
  const {
    projects,
    stats,
    degrees,
    levels,
    areas,
    skillGroups,
    capabilities,
    sharedStack,
    sharedCapabilities,
  } = data;
  const vars = { count: stats.projects, from: stats.from, to: stats.to };

  // ── Filters: read from the URL; unknown values fall back to "all" ─────────
  const capIds = useMemo(() => new Set(capabilities.map((c) => c.id)), [capabilities]);
  const { area: qArea, level: qLevel, skill: qSkill } = router.query;
  const filters = {
    area: areas.includes(qArea) ? qArea : ALL,
    level: levels.includes(qLevel) ? qLevel : ALL,
    skill: capIds.has(qSkill) ? qSkill : ALL,
  };

  const setFilters = useCallback(
    (patch) => {
      const query = { ...router.query, ...patch };
      for (const [key, value] of Object.entries(patch)) {
        if (!value || value === ALL) delete query[key];
      }
      return router.replace({ pathname: router.pathname, query }, undefined, {
        shallow: true,
        scroll: false,
      });
    },
    [router]
  );

  const filtered = projects.filter(
    (p) =>
      (filters.area === ALL || p.areas.includes(filters.area)) &&
      (filters.level === ALL || p.level === filters.level) &&
      (filters.skill === ALL || p.capabilities.includes(filters.skill))
  );
  const visible = new Set(filtered.map((p) => p.slug));
  const groups = groupTimeline(filtered, levels);

  // A skill chosen in the matrix filters the timeline. router.replace resolves
  // once the shorter list is in the DOM; only then jump to it instantly (the
  // site's smooth scroll can run past 300ms) and move focus to the result count.
  // Scrolling before the re-render leaves the heading under the sticky header.
  const selectSkill = async (id) => {
    // A newer click can cancel this navigation; then the newer one scrolls.
    const changed = await setFilters({ skill: filters.skill === id ? ALL : id }).catch(() => false);
    const target = document.getElementById("timeline");
    if (!changed || !target) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    target.scrollIntoView({ block: "start" });
    root.style.scrollBehavior = previous;
    statusRef.current?.focus({ preventScroll: true });
  };

  // Reset from the empty state, then hand focus back to the result count.
  const clearFilters = async () => {
    await setFilters({ area: ALL, level: ALL, skill: ALL }).catch(() => false);
    statusRef.current?.focus({ preventScroll: true });
  };

  const termLabel = (p) =>
    fill(t("courseworkPage.termFormat"), {
      semester: t(`courseworkPage.semesters.${p.term.semester}`),
      year: p.term.year,
    });

  const glance = [
    { k: t("courseworkPage.glance.projects"), v: stats.projects },
    { k: t("courseworkPage.glance.subjects"), v: stats.subjects },
    { k: t("courseworkPage.glance.years"), v: `${stats.from}–${stats.to}` },
    { k: t("courseworkPage.glance.withTeam"), v: stats.withTeam },
  ];

  return (
    <>
      <SeoHead
        title={t("courseworkPage.metaTitle")}
        description={fill(t("courseworkPage.metaDescription"), vars)}
        ogTitle={t("courseworkPage.ogTitle")}
        path={PATH}
        ogImage={ogImage}
        ogImageAlt={t("courseworkPage.ogTitle")}
        locale={locale}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <BackToTop />

      <div className="bg-white dark:bg-[#0A0A0A]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <PageHero
            label={t("courseworkPage.sectionLabel")}
            heading={t("courseworkPage.heading")}
            description={fill(t("courseworkPage.description"), vars)}
            backLabel={t("courseworkPage.back")}
            backHref="/projects"
          />

          <SemesterGrid coursework={projects} />

          {/* 01 What revived means */}
          <ResumeSection
            id="revived"
            n="01"
            title={t("courseworkPage.sections.revived")}
            className="border-t-0 pt-10"
          >
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
              <div className="min-w-0">
                <p className="text-[15px] leading-relaxed text-[#1A1A1A] dark:text-[#DDDDDD] max-w-[62ch]">
                  {t("courseworkPage.intro")}
                </p>
                <ol className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#F0F0F0] dark:bg-[#1E1E1E] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
                  {(t("courseworkPage.steps") || []).map((s, i) => (
                    <li key={s.title} className="bg-white dark:bg-[#0A0A0A] px-5 py-4">
                      <p
                        className="font-mono text-[10px] tracking-widest tabular-nums text-[#CC0000] dark:text-[#FF3C3C]"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-black dark:text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
                        {s.body}
                      </p>
                    </li>
                  ))}
                </ol>
                {sharedStack.length > 0 && (
                  <p className="mt-5 text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA] max-w-[72ch]">
                    <span className={STACK_LABEL}>{t("courseworkPage.sharedStack")}</span>
                    {sharedStack.join(" · ")}
                  </p>
                )}
                <ul className="mt-5 space-y-1 text-xs leading-relaxed text-[#5C5C5C] dark:text-[#9A9A9A] max-w-[72ch]">
                  {(t("courseworkPage.notes") || []).map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>

              <aside aria-labelledby="glance-h" className="mt-8 lg:mt-0">
                <h3
                  id="glance-h"
                  className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#5C5C5C] dark:text-[#9A9A9A] mb-3"
                >
                  {t("courseworkPage.glance.heading")}
                </h3>
                <dl className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-px bg-[#F0F0F0] dark:bg-[#1E1E1E] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
                  {glance.map((g) => (
                    <div key={g.k} className="bg-white dark:bg-[#0A0A0A] px-4 py-3">
                      <dt className="text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A] mb-1">
                        {g.k}
                      </dt>
                      <dd className="font-display text-2xl tabular-nums leading-none text-black dark:text-white">
                        {g.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </ResumeSection>

          {/* 02 Timeline, oldest first, with filters */}
          <ResumeSection id="timeline" n="02" title={t("courseworkPage.sections.timeline")}>
            <CourseworkFilters
              t={t}
              areas={areas}
              levels={levels}
              groups={skillGroups}
              capabilities={capabilities}
              value={filters}
              onChange={setFilters}
              shown={filtered.length}
              total={projects.length}
              statusRef={statusRef}
            />

            {groups.length === 0 && (
              // The filter count above is already the live region.
              <EmptyState
                role={null}
                className="my-8"
                action={{ label: t("courseworkPage.filters.clear"), onClick: clearFilters }}
              >
                {t("courseworkPage.filters.empty")}
              </EmptyState>
            )}

            <div className="space-y-14">
              {groups.map(({ level, years }) => (
                <section key={level} aria-labelledby={`level-${level}`}>
                  <h3
                    id={`level-${level}`}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-4 border-b border-[#F0F0F0] dark:border-[#1E1E1E]"
                  >
                    <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#CC0000] dark:text-[#FF3C3C]">
                      {t(`courseworkPage.levels.${level}`)}
                    </span>
                    {degrees[level] && (
                      <>
                        <span className="sr-only">: </span>
                        <span className="text-xl md:text-2xl font-semibold text-black dark:text-white">
                          {degrees[level].role}
                        </span>
                        <span className="sr-only">, </span>
                        <span className="font-sans text-xs tracking-normal tabular-nums text-[#5C5C5C] dark:text-[#9A9A9A]">
                          {degrees[level].period}
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
                        {terms.map(({ semester, projects: items }) => (
                          <div key={semester}>
                            <h4 className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]">
                              <span
                                className="block w-1.5 h-1.5 bg-[#CC0000] dark:bg-[#FF3C3C]"
                                aria-hidden="true"
                              />
                              <span className="sr-only">
                                {fill(t("courseworkPage.yearPrefix"), { year })}
                              </span>
                              {t(`courseworkPage.semesters.${semester}`)}
                            </h4>
                            <div className="space-y-4">
                              {items.map((p) => (
                                <CourseworkCard
                                  key={p.slug}
                                  project={p}
                                  termLabel={termLabel(p)}
                                  t={t}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </ResumeSection>

          {/* 03 Skills matrix */}
          <ResumeSection id="skills" n="03" title={t("courseworkPage.sections.matrix")}>
            <div className="mb-6 max-w-[68ch] space-y-3">
              <p className="text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
                {t("courseworkPage.matrix.intro")}
              </p>
              {sharedCapabilities.length > 0 && (
                <p className="text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
                  <span className={STACK_LABEL}>{t("courseworkPage.matrix.everyProject")}</span>
                  {sharedCapabilities.join(" · ")}
                </p>
              )}
            </div>
            <SkillsMatrix
              t={t}
              locale={locale}
              groups={skillGroups}
              capabilities={capabilities}
              projects={projects}
              visible={visible}
              activeSkill={filters.skill}
              onSelectSkill={selectSkill}
            />
          </ResumeSection>

          {/* 04 Coming next: placeholders until each rebuild ships */}
          <ResumeSection id="coming-next" n="04" title={t("courseworkPage.sections.pipeline")}>
            <p className="mb-6 max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
              {t("courseworkPage.pipeline.intro")}
            </p>
            <PipelineList items={localisePipeline(COURSEWORK_PIPELINE, locale)} t={t} />
          </ResumeSection>

          {/* Go deeper */}
          <nav
            aria-label={t("courseworkPage.sections.goDeeper")}
            className="border-t border-[#F0F0F0] dark:border-[#1E1E1E] py-10"
          >
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#F0F0F0] dark:bg-[#1E1E1E] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
              {[
                { href: "/projects", key: "projects" },
                { href: "/skills", key: "skills" },
                { href: "/resume", key: "resume" },
              ].map((l) => (
                <li key={l.key} className="bg-white dark:bg-[#0A0A0A]">
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between gap-3 px-5 py-4 text-sm text-black dark:text-white hover:bg-[#FAFAFA] dark:hover:bg-[#111111] transition-colors duration-200 focus-visible:[outline-offset:-2px]"
                  >
                    {t(`courseworkPage.goDeeper.${l.key}`)}
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
        </div>
      </div>
    </>
  );
}
