import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import PageHero from "@/components/layout/PageHero";
import { useI18n } from "@/contexts/I18nContext";
import { CATEGORIES } from "@/components/sections/FAQSection";

import AboutIntro from "@/components/sections/AboutIntro";
import AboutOpener from "@/components/sections/AboutOpener";
import ReadingProgress from "@/components/blog/ReadingProgress";
import BackToTop from "@/components/ui/BackToTop";
import { ogImageUrl } from "@/lib/og";

// PERSON_SCHEMA — moved from _document.jsx to only appear on homepage and /about
// to reduce false positives in Search Console. See pages/index.jsx and _document.jsx.
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://rin.contact/#person",
  name: "Sunchuangyu (Rin) Huang",
  alternateName: [
    "Rin Huang",
    "黄孙创宇",
    "黄孙 Rin",
    "Sunchuangyu Huang",
    "Huang Sunchuangyu",
    "HUANG SUNCHUANGYU",
    "HUANGSUNCHUANGYU",
    "HUANG SUN CHUANG YU",
    "Huang Sun Chuang Yu",
    "Sun Chuang Yu Huang",
  ],
  givenName: "Sunchuangyu",
  additionalName: "Rin",
  familyName: "Huang",
  url: "https://rin.contact",
  image: ogImageUrl({
    title: "Rin Huang",
    subtitle: "Senior Data Analyst @ SAPOL",
    section: "home",
    path: "/",
  }),
  email: "huang@rin.contact",
  gender: "Male",
  nationality: { "@type": "Country", name: "Australia" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressRegion: "SA",
    addressCountry: "AU",
  },
  homeLocation: [
    {
      "@type": "Place",
      name: "Adelaide, South Australia, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -34.9285, longitude: 138.6007 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Adelaide",
        addressRegion: "SA",
        addressCountry: "AU",
      },
    },
    {
      "@type": "Place",
      name: "Melbourne, Victoria, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -37.8136, longitude: 144.9631 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressRegion: "VIC",
        addressCountry: "AU",
      },
    },
    {
      "@type": "Place",
      name: "Sydney, New South Wales, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -33.8688, longitude: 151.2093 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sydney",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
    },
    {
      "@type": "Place",
      name: "Anshun, Guizhou, China",
      geo: { "@type": "GeoCoordinates", latitude: 26.2457, longitude: 105.9468 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Anshun",
        addressRegion: "Guizhou",
        addressCountry: "CN",
      },
    },
  ],
  workLocation: {
    "@type": "Place",
    name: "Adelaide, South Australia, Australia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adelaide",
      addressRegion: "SA",
      addressCountry: "AU",
    },
  },
  jobTitle: "ASO7 Senior Data Analyst",
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Data Analyst",
    description:
      "Produces statistical reports, workflow reviews and analytics tooling for the Ethical and Professional Standards Branch of South Australia Police, including the quarterly Use of Force and Vehicle Pursuit reports.",
    occupationLocation: { "@type": "City", name: "Adelaide" },
    skills:
      "Python, R, SQL, Power BI, Statistical Modelling, Strategic Intelligence, GIS, Machine Learning",
  },
  knowsLanguage: [
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Mandarin Chinese", alternateName: "zh" },
  ],
  worksFor: [
    {
      "@type": "GovernmentOrganization",
      name: "South Australia Police",
      alternateName: "SAPOL",
      url: "https://www.police.sa.gov.au",
      department: {
        "@type": "GovernmentOrganization",
        name: "Ethical and Professional Standards Branch",
        alternateName: "EPSB",
      },
    },
    {
      "@type": "Organization",
      name: "Mapiva",
      description:
        "Melbourne startup building a map-first social discovery app. Rin is Co-Founder & Dev Lead.",
    },
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Melbourne",
      url: "https://www.unimelb.edu.au",
    },
  ],
  knowsAbout: [
    "Data Science",
    "Statistical Analysis",
    "Strategic Intelligence",
    "Python",
    "Machine Learning",
    "Full-Stack Web Development",
    "Mobile Development",
    "Cloud Infrastructure",
    "Government Analytics",
    "Research Software Engineering",
  ],
  sameAs: [
    "https://github.com/rNLKJA",
    "https://linkedin.com/in/sunchuangyuhuang",
    "https://www.instagram.com/chuangyu_hscy/",
    "https://twitter.com/rNLKJA",
    "https://buymeacoffee.com/rNLKJA",
  ],
  mainEntityOfPage: { "@id": "https://rin.contact/#profilepage" },
  subjectOf: { "@id": "https://rin.contact/#profilepage" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "huang@rin.contact",
    contactType: "professional enquiries",
    availableLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Mandarin Chinese" },
    ],
  },
  description:
    "Sunchuangyu (Rin) Huang, also known as 黄孙创宇 (黄孙 Rin), Huang Sunchuangyu, HUANG SUNCHUANGYU and HUANGSUNCHUANGYU, is an ASO7 Senior Data Analyst at South Australia Police and Co-Founder & Dev Lead of Mapiva, working across data science, strategic intelligence and research software engineering.",
};

const CertificationsSection = dynamic(() => import("@/components/sections/CertificationsSection"), {
  loading: () => <div className="min-h-[320px]" />,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  loading: () => <div className="min-h-[320px]" />,
});
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  loading: () => <div className="min-h-[200px]" />,
});

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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
          />
        </Head>
      )}

      <SeoHead
        title={isZh ? "关于我 — Rin Huang · rin.contact" : "About — Rin Huang · rin.contact"}
        description={
          isZh
            ? "Rin Huang（黄孙创宇）的技能专长、七个技术领域、23项专业认证和常见问题解答。"
            : "Rin Huang's skills, technical domains, 23 professional certifications, and FAQ."
        }
        path="/about"
        ogImage={{
          title: isZh ? "关于 Rin Huang" : "About Rin Huang",
          subtitle: isZh ? "技能 · 认证 · 问答" : "Skills, certifications & FAQ",
          section: "about",
        }}
        locale={locale}
      />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHero
          label={t("about.sectionLabel")}
          heading={t("about.heading")}
          description={t("about.description")}
          backLabel={t("about.back")}
        />
      </div>

      <AboutOpener />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <AboutIntro />
        <div className="mt-8 mb-12">
          <p className="text-[15px] text-[#3D3D3D] dark:text-[#9A9A9A] leading-relaxed">
            {t("about.skillsLinkIntro")}{" "}
            <Link
              href="/skills"
              className="text-black dark:text-white underline decoration-black/30 dark:decoration-white/40 underline-offset-4 hover:decoration-current dark:hover:decoration-current font-medium"
            >
              {t("about.skillsLinkText")}
            </Link>
            .
          </p>
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
