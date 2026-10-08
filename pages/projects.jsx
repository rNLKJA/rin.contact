import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import { useI18n } from "@/contexts/I18nContext";
import { PROJECTS } from "@/lib/projects-data";
import { getCoursework } from "@/lib/coursework-data";
import PipelineList from "@/components/sections/PipelineList";
import { PROJECT_PIPELINE, localisePipeline } from "@/lib/pipeline-data";

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  loading: () => <div className="min-h-[480px]" />,
});

// Count is derived from the PROJECTS data at build time so the share card and
// meta can never drift from the grid (previously hardcoded 20 / 17 vs 21 actual).
// getStaticProps-only imports are stripped from the client bundle by Next.
//
// Cards that grew out of a revived coursework lab (`coursework` in
// lib/projects-data.js) get the lab's live demo, its guided tour and a case-study
// link to the lab's card on /projects/coursework. Only those few URLs reach the
// page, so the coursework copy stays out of the client bundle.
export function getStaticProps() {
  const labs = new Map(getCoursework().projects.map((p) => [p.slug, p]));
  const courseworkLinks = {};
  for (const p of PROJECTS) {
    if (!p.coursework) continue;
    const lab = labs.get(p.coursework);
    if (!lab) throw new Error(`/projects: ${p.id} names an unknown coursework lab ${p.coursework}`);
    courseworkLinks[p.id] = {
      caseStudy: `/projects/coursework#${lab.slug}`,
      demo: lab.liveUrl,
      tour: lab.tourUrl,
    };
  }
  return { props: { count: PROJECTS.length, courseworkLinks } };
}

export default function ProjectsPage({ count = 0, courseworkLinks = {} }) {
  const { t, locale = "en-AU" } = useI18n();
  const ogImage = `https://rin.contact/api/og/?title=${count}%20Projects&subtitle=Data%20engineering%2C%20cloud%2C%20mobile%20%26%20open-source&section=projects`;
  return (
    <>
      <Head>
        <title>Projects — Rin Huang · rin.contact</title>
        <meta
          name="description"
          content="Rin Huang's projects, from coursework to production: data engineering, Python automation, React Native mobile apps, Next.js web apps, cloud infrastructure and open-source work."
        />
        <link rel="canonical" href="https://rin.contact/projects/" />
        <meta property="og:title" content="Projects — Sunchuangyu (Rin) Huang" />
        <meta
          property="og:description"
          content={`${count} projects across data engineering, cloud infrastructure, mobile apps and open source, from coursework to production.`}
        />
        <meta property="og:url" content="https://rin.contact/projects/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects — Sunchuangyu (Rin) Huang" />
        <meta
          name="twitter:description"
          content={`${count} projects, from coursework to production. Data engineering, cloud, mobile, open source.`}
        />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHero
          label={t("projectsPage.sectionLabel")}
          heading={t("projectsPage.heading")}
          description={t("projectsPage.description")}
          backLabel={t("about.back")}
        />
        <p className="-mt-10 mb-10 text-xs tracking-widest uppercase">
          <Link
            href="/projects/coursework"
            className="text-[#CC0000] dark:text-[#FF3C3C] hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {t("projectsPage.courseworkLink")} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>

      <div className="bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <ProjectsSection courseworkLinks={courseworkLinks} />
        </div>
      </div>

      {/* Planned and in-progress work: placeholders until each one ships */}
      <section
        aria-labelledby="pipeline-heading"
        className="bg-white dark:bg-[#0A0A0A] border-t border-[#F0F0F0] dark:border-[#1E1E1E]"
      >
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <p className="text-[11px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C]">
            <span aria-hidden="true">■ </span>
            {t("projectsPage.pipeline.label")}
          </p>
          <h2
            id="pipeline-heading"
            className="mt-3 text-2xl md:text-3xl font-medium text-black dark:text-white"
          >
            {t("projectsPage.pipeline.heading")}
          </h2>
          <p className="mt-3 mb-8 max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
            {t("projectsPage.pipeline.intro")}
          </p>
          <PipelineList items={localisePipeline(PROJECT_PIPELINE, locale)} t={t} />
        </div>
      </section>
    </>
  );
}
