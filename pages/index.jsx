import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// Hero is above the fold — load immediately
import HeroSection from "@/components/sections/HeroSection";
import SectionProgress from "@/components/layout/SectionProgress";

// Below-fold sections — code-split so they don't inflate the initial JS bundle.
// SSR is kept (default) so content is still in the HTML for SEO crawlers.
const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection"), {
  loading: () => <div className="bg-[#F5F5F5] min-h-[480px]" aria-hidden="true" />,
});
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), {
  loading: () => <div className="bg-white min-h-[480px]" aria-hidden="true" />,
});
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <div className="bg-[#F5F5F5] min-h-[480px]" aria-hidden="true" />,
});
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), {
  loading: () => <div className="bg-white min-h-[320px]" aria-hidden="true" />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <div className="bg-[#1A1A1A] min-h-[320px]" aria-hidden="true" />,
});

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* ── Primary meta ── */}
        <title>Rin Huang | Senior Data Analyst · Research Software Engineer · Adelaide</title>
        <meta
          name="description"
          content="Sunchuangyu (Rin) Huang — Senior Data Analyst at South Australia Police, Research Software Engineer at WEHI & CSIRO, and Full-Stack Developer. Data science, strategic intelligence, and continuous improvement in Adelaide & Melbourne, Australia."
        />
        <meta
          name="keywords"
          content="Rin Huang, Sunchuangyu Huang, Senior Data Analyst, Data Science, Research Software Engineer, Full-Stack Developer, Adelaide, South Australia Police, SAPOL, WEHI, CSIRO, Python, Machine Learning, Statistical Analysis, Government Analytics, Strategic Intelligence"
        />

        {/* ── Geo (local SEO) ── */}
        <meta name="geo.region" content="AU-SA" />
        <meta name="geo.placename" content="Adelaide, South Australia" />
        <meta name="geo.position" content="-34.9285;138.6007" />
        <meta name="ICBM" content="-34.9285, 138.6007" />

        {/* ── Open Graph ── */}
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Rin Huang" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:url" content="https://rin.contact/" />
        <meta property="og:title" content="Rin Huang — Senior Data Analyst · Research Software Engineer" />
        <meta
          property="og:description"
          content="At the intersection of data science, software engineering, and strategic intelligence. Based in Adelaide & Melbourne, Australia."
        />
        <meta property="og:image" content="https://rin.contact/images/meta-image.png" />
        <meta property="og:image:alt" content="Rin Huang — portfolio preview" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="profile:first_name" content="Sunchuangyu" />
        <meta property="profile:last_name" content="Huang" />
        <meta property="profile:username" content="rNLKJA" />

        {/* ── Twitter / X Card ── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rNLKJA" />
        <meta name="twitter:creator" content="@rNLKJA" />
        <meta name="twitter:title" content="Rin Huang — Senior Data Analyst · Research Software Engineer" />
        <meta
          name="twitter:description"
          content="At the intersection of data science, software engineering, and strategic intelligence. Based in Adelaide & Melbourne, Australia."
        />
        <meta name="twitter:image" content="https://rin.contact/images/meta-image.png" />
        <meta name="twitter:image:alt" content="Rin Huang — portfolio preview" />

        {/* ── FAQPage structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What does a Senior Data Analyst do at South Australia Police?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "As an ASO7 Senior Data Analyst in SAPOL's Professional and Ethical Standards Branch (PESB), I develop analytical models and statistical frameworks that translate complex policing data into decision-ready intelligence. This includes strategic planning, parliamentary reporting, and governance of end-to-end analytics solutions across IAPro and connected systems.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is strategic intelligence analytics and how does it differ from standard data analysis?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Standard data analysis answers 'what happened'. Strategic intelligence analytics answers 'what should we do about it' — it frames data within operational context, risk tolerance, and organisational objectives, producing intelligence products that directly inform executive and ministerial decision-making.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What programming languages and tools do you use professionally?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Python is my primary language for data engineering, statistical modelling, and automation. I also use R for advanced statistical analysis, SQL for structured queries, Power BI and Tableau for dashboards, ArcGIS and Mapbox for geospatial work, and Next.js, React Native, and AWS for software development.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are you available for consulting, contract, or advisory work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — I am open to strategic data consulting, government analytics advisory, and research data engineering engagements. You can reach me at huang@rin.contact.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is your educational background?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "I hold two degrees from the University of Melbourne: a Bachelor of Science (Computing and Software Systems) and a Master of Data Science, along with 23 professional certifications across cloud, analytics, and project management.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      <SectionProgress />
      <div className="relative">
        {/* Dot-matrix background accent (top-right corner) */}
        <div
          className="dot-matrix fixed top-0 right-0 w-64 h-64 opacity-30 pointer-events-none z-0"
          aria-hidden="true"
        />

      <div className="relative z-10">
          {/* Hero — white */}
          <div className="bg-white">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <HeroSection />
            </div>
          </div>

          {/* Timeline — light surface */}
          <div className="bg-[#F5F5F5]">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <TimelineSection />
            </div>
          </div>

          {/* Projects — white */}
          <div className="bg-white">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <ProjectsSection />
            </div>
          </div>

          {/* Skills — light surface */}
          <div className="bg-[#F5F5F5]">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <SkillsSection />
            </div>
          </div>

          {/* FAQ — white */}
          <div className="bg-white">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <FAQSection />
            </div>
          </div>

          {/* Contact — dark */}
          <div className="bg-[#1A1A1A]">
            <div className="max-w-[1100px] mx-auto px-6 md:px-12">
              <ContactSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
