/**
 * /skills, "Everything I've learned": every skill since 2019, each linked to
 * the subjects, coursework, projects, roles, credentials, notes and posts that
 * show it. getStaticProps builds the atlas from the site's existing data
 * (lib/skills-atlas.js) and fails the build if it breaks a site rule
 * (lib/skills-check.js): no marks, grades or self-rated levels, no SAPOL system
 * names. Client components get everything through props.
 *
 * Atlas filters live in the URL (?q=&domain=&kind=&sort=&skill=) so a view can
 * be shared, like /projects/coursework.
 */
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import PageHero from "@/components/layout/PageHero";
import BackToTop from "@/components/ui/BackToTop";
import ResumeSection from "@/components/resume/ResumeSection";
import SkillsGlance from "@/components/skills/SkillsGlance";
import LearningTimeline from "@/components/skills/LearningTimeline";
import SkillsAtlas, { MAX_QUERY } from "@/components/skills/SkillsAtlas";
import SubjectsList from "@/components/skills/SubjectsList";
import CredentialList from "@/components/skills/CredentialList";
import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";
import { getAllPosts } from "@/lib/posts";
import { buildSkillsAtlas } from "@/lib/skills-atlas";
import { assertSkillsData } from "@/lib/skills-check";
import en from "@/locales/en-AU.json";
import zh from "@/locales/zh-Hans.json";

const BASE = "https://rin.contact";
const PATH = "/skills";
const ALL = "all";
const SORTS = ["az", "first"];

export async function getStaticProps({ locale = "en-AU" }) {
  const posts = (await getAllPosts()).map(({ slug, title, date, tags }) => ({
    slug,
    title,
    date,
    tags,
  }));
  assertSkillsData({ dicts: { en, zh }, posts });
  const dict = locale === "zh-Hans" ? zh : en;
  const atlas = buildSkillsAtlas(locale, { dict, posts });
  const copy = dict.skillsPage;
  const prefix = locale === "zh-Hans" ? "/zh-Hans" : "";
  const pageUrl = `${BASE}${prefix}${PATH}/`;
  const vars = { skills: atlas.stats.skills, from: atlas.stats.from, to: atlas.stats.to };

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
        dateModified: atlas.asOf,
        isPartOf: { "@id": `${BASE}/#website` },
        about: { "@id": `${BASE}/#person` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
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
          { "@type": "ListItem", position: 2, name: copy.breadcrumb.skills, item: pageUrl },
        ],
      },
      {
        "@type": "Person",
        "@id": `${BASE}/#person`,
        knowsAbout: atlas.order.az.map((id) => atlas.skills.find((s) => s.id === id).label),
      },
    ],
  };

  // The OG image renderer ships Latin fonts only, so its text stays in English.
  const ogImage = {
    title: en.skillsPage.ogTitleShort,
    subtitle: fill(en.skillsPage.ogSubtitle, vars),
    section: "skills",
  };

  return { props: { atlas, jsonLd, ogImage } };
}

// False on the server and during hydration, true after: the URL filters are
// only applied once hydrated, so the first client render matches the HTML even
// when router.isReady is already true (an SSG page with no query string).
const subscribeNoop = () => () => {};
const onClient = () => true;
const onServer = () => false;

/** Read the atlas filters from the URL; unknown values fall back to defaults. */
function readFilters(query, atlas) {
  const pick = (v) => (typeof v === "string" ? v : "");
  const q = pick(query.q).trim().slice(0, MAX_QUERY);
  const domain = pick(query.domain);
  const kind = pick(query.kind);
  const sort = pick(query.sort);
  const skill = pick(query.skill);
  return {
    q,
    domain: atlas.domains.some((d) => d.id === domain) ? domain : ALL,
    kind: atlas.kinds.includes(kind) ? kind : ALL,
    sort: SORTS.includes(sort) ? sort : "az",
    skill: atlas.skills.some((s) => s.id === skill) ? skill : null,
  };
}

export default function SkillsPage({ atlas, jsonLd, ogImage }) {
  const { t, locale = "en-AU" } = useI18n();
  const router = useRouter();
  const statusRef = useRef(null);
  const [jump, setJump] = useState(null);
  const { stats } = atlas;
  const vars = { skills: stats.skills, from: stats.from, to: stats.to };
  const hydrated = useSyncExternalStore(subscribeNoop, onClient, onServer);
  const ready = router.isReady && hydrated;
  const filters = readFilters(ready ? router.query : {}, atlas);

  const setFilters = useCallback(
    (patch) => {
      const query = { ...router.query, ...patch };
      for (const [key, value] of Object.entries(patch)) {
        if (!value || value === ALL || (key === "sort" && value === "az")) delete query[key];
      }
      return router.replace({ pathname: router.pathname, query }, undefined, {
        shallow: true,
        scroll: false,
      });
    },
    [router]
  );

  // A skill chosen anywhere on the page (timeline, subjects, credentials):
  // clear the filters that could hide it, put it in the URL, then open its row
  // and jump to it once the list has re-rendered.
  const selectSkill = useCallback(
    async (id) => {
      await setFilters({ q: "", domain: ALL, kind: ALL, skill: id }).catch(() => false);
      setJump((prev) => ({ id, seq: (prev?.seq || 0) + 1 }));
    },
    [setFilters]
  );

  const clearFilters = useCallback(async () => {
    await setFilters({ q: "", domain: ALL, kind: ALL }).catch(() => false);
    statusRef.current?.focus({ preventScroll: true });
  }, [setFilters]);

  return (
    <>
      <SeoHead
        title={t("skillsPage.metaTitle")}
        description={fill(t("skillsPage.metaDescription"), vars)}
        ogTitle={t("skillsPage.ogTitle")}
        path={PATH}
        ogImage={ogImage}
        ogImageAlt={t("skillsPage.ogTitle")}
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
            label={t("skillsPage.sectionLabel")}
            heading={t("skillsPage.heading")}
            description={fill(t("skillsPage.description"), vars)}
            backLabel={t("skillsPage.back")}
            backHref="/about"
          />

          <ResumeSection
            id="glance"
            n="01"
            title={t("skillsPage.sections.glance")}
            className="border-t-0 pt-10"
          >
            <SkillsGlance stats={stats} />
          </ResumeSection>

          <ResumeSection id="timeline" n="02" title={t("skillsPage.sections.timeline")}>
            <LearningTimeline atlas={atlas} onSelectSkill={selectSkill} />
          </ResumeSection>

          <ResumeSection id="atlas" n="03" title={t("skillsPage.sections.atlas")}>
            <SkillsAtlas
              atlas={atlas}
              filters={filters}
              ready={ready}
              onChange={setFilters}
              onClear={clearFilters}
              statusRef={statusRef}
              jump={jump}
            />
          </ResumeSection>

          <ResumeSection id="subjects" n="04" title={t("skillsPage.sections.subjects")}>
            <SubjectsList
              subjects={atlas.subjects}
              evidence={atlas.evidence}
              skills={atlas.skills}
              onSelectSkill={selectSkill}
              count={stats.subjects}
            />
          </ResumeSection>

          <ResumeSection id="credentials" n="05" title={t("skillsPage.sections.credentials")}>
            <CredentialList
              credentials={atlas.credentials}
              skills={atlas.skills}
              onSelectSkill={selectSkill}
              count={stats.credentials}
            />
          </ResumeSection>

          {/* Where to go deeper */}
          <nav
            id="deeper"
            aria-label={t("skillsPage.sections.deeper")}
            className="scroll-mt-24 border-t border-[#F0F0F0] dark:border-[#1E1E1E] py-10"
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F0F0F0] dark:bg-[#1E1E1E] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
              {atlas.deeper.map((l) => (
                <li key={l.key} className="bg-white dark:bg-[#0A0A0A]">
                  <Link
                    href={l.href}
                    className="group flex h-full items-center justify-between gap-3 px-5 py-4 text-sm text-black dark:text-white hover:bg-[#FAFAFA] dark:hover:bg-[#111111] transition-colors duration-200"
                  >
                    {fill(t(`skillsPage.deeper.${l.key}`), { count: l.count })}
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
