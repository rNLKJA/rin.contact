import Head from "next/head";
import dynamic from "next/dynamic";
import PageHero from "@/components/layout/PageHero";
import { useI18n } from "@/contexts/I18nContext";
import { PROJECTS } from "@/components/sections/ProjectsSection";

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { loading: () => <div className="min-h-[480px]" /> });

// Count is derived from the PROJECTS data at build time so the share card and
// meta can never drift from the grid (previously hardcoded 20 / 17 vs 21 actual).
// getStaticProps-only imports are stripped from the client bundle by Next.
export function getStaticProps() {
  return { props: { count: PROJECTS.length } };
}

export default function ProjectsPage({ count = 0 }) {
  const { t } = useI18n();
  const ogImage = `https://rin.contact/api/og?title=${count}%20Projects&subtitle=Data%20engineering%2C%20cloud%2C%20mobile%20%26%20open-source&section=projects`;
  return (
    <>
      <Head>
        <title>Projects — Rin Huang · rin.contact</title>
        <meta name="description" content="Rin Huang's shipped projects — data engineering, Python automation, React Native mobile apps, Next.js web apps, cloud infrastructure, and open-source work." />
        <link rel="canonical" href="https://rin.contact/projects/" />
        <meta property="og:title" content="Projects — Sunchuangyu (Rin) Huang" />
        <meta property="og:description" content={`${count} projects shipped to production. Data engineering, cloud infrastructure, mobile apps, open-source.`} />
        <meta property="og:url" content="https://rin.contact/projects/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects — Sunchuangyu (Rin) Huang" />
        <meta name="twitter:description" content={`${count} projects shipped. Data engineering, cloud, mobile, open-source.`} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHero
          label={t("projectsPage.sectionLabel")}
          heading={t("projectsPage.heading")}
          description={t("projectsPage.description")}
          backLabel={t("about.back")}
        />
      </div>

      <div className="bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <ProjectsSection />
        </div>
      </div>
    </>
  );
}
