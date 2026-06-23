import Head from "next/head";
import dynamic from "next/dynamic";
import PageHero from "@/components/layout/PageHero";
import { useI18n } from "@/contexts/I18nContext";

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { loading: () => <div className="min-h-[480px]" /> });

export default function ProjectsPage() {
  const { t } = useI18n();
  return (
    <>
      <Head>
        <title>Projects — Rin Huang · rin.contact</title>
        <meta name="description" content="Rin Huang's shipped projects — data engineering, Python automation, React Native mobile apps, Next.js web apps, cloud infrastructure, and open-source work." />
        <link rel="canonical" href="https://rin.contact/projects" />
        <meta property="og:title" content="Projects — Sunchuangyu (Rin) Huang" />
        <meta property="og:description" content="20 projects shipped to production. Data engineering, cloud infrastructure, mobile apps, open-source." />
        <meta property="og:url" content="https://rin.contact/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=20%20Projects&subtitle=Data%20engineering%2C%20cloud%2C%20mobile%20%26%20open-source&section=projects" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects — Sunchuangyu (Rin) Huang" />
        <meta name="twitter:description" content="20 projects shipped. Data engineering, cloud, mobile, open-source." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=17%20Projects&subtitle=Data%20engineering%2C%20cloud%2C%20mobile%20%26%20open-source&section=projects" />
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
