import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import PageHero from "@/components/layout/PageHero";
import { useI18n } from "@/contexts/I18nContext";
import { CATEGORIES } from "@/components/sections/FAQSection";

import AboutIntro from "@/components/sections/AboutIntro";
import ReadingProgress from "@/components/blog/ReadingProgress";
import BackToTop from "@/components/ui/BackToTop";

const SkillsSection           = dynamic(() => import("@/components/sections/SkillsSection"),           { loading: () => <div className="min-h-[480px]" /> });
const CertificationsSection  = dynamic(() => import("@/components/sections/CertificationsSection"), { loading: () => <div className="min-h-[320px]" /> });
const FAQSection              = dynamic(() => import("@/components/sections/FAQSection"),              { loading: () => <div className="min-h-[320px]" /> });
const TestimonialsSection     = dynamic(() => import("@/components/sections/TestimonialsSection"),    { loading: () => <div className="min-h-[200px]" /> });

// FAQPage structured data is generated from the same FAQSection data at build time,
// so the schema can never drift from the rendered Q&A. getStaticProps-only imports are
// stripped from the client bundle by Next. The /about page renders 17 expert Q&A that
// were previously invisible to search engines as structured data.
export function getStaticProps() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CATEGORIES.flatMap((c) => c.items).map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return { props: { faqJsonLd } };
}

export default function AboutPage({ faqJsonLd }) {
  const { locale = "en-AU" } = useRouter();
  const isZh = locale === "zh-Hans";
  const { t } = useI18n();

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      {faqJsonLd && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        </Head>
      )}

      <SeoHead
        title={isZh ? "关于我 — Rin Huang · rin.contact" : "About — Rin Huang · rin.contact"}
        description={isZh ? "Rin Huang（黄孙创宇）的技能专长、七个技术领域、23项专业认证和常见问题解答。" : "Rin Huang's skills, technical domains, 23 professional certifications, and FAQ."}
        path="/about"
        ogImage={{ title: isZh ? "关于 Rin Huang" : "About Rin Huang", subtitle: isZh ? "技能 · 认证 · 问答" : "Skills, certifications & FAQ", section: "about" }}
        locale={locale}
      />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHero
          label={t("about.sectionLabel")}
          heading={t("about.heading")}
          description={t("about.description")}
          backLabel={t("about.back")}
        />
        <AboutIntro />
      </div>

      <div className="bg-[#F5F5F5] dark:bg-[#141414] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SkillsSection />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <CertificationsSection />
        </div>
      </div>

      <div className="bg-[#F5F5F5] dark:bg-[#141414] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <FAQSection />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <TestimonialsSection />
        </div>
      </div>
    </>
  );
}
