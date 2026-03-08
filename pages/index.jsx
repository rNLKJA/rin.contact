import React from "react";
import Head from "next/head";
import HeroSection from "@/components/sections/HeroSection";
import TimelineSection from "@/components/sections/TimelineSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rin Huang — Data Scientist, Engineer, Generalist</title>
        <meta
          name="description"
          content="Sunchuangyu (Rin) Huang — Senior Data Analyst at SAPOL, Research Software Engineer, Full-Stack Developer. Data science, web dev, mobile dev, and strategic intelligence."
        />
        <meta property="og:title" content="Rin Huang — Data Scientist & Engineer" />
        <meta
          property="og:description"
          content="At the intersection of data science, software engineering, and strategic intelligence."
        />
        <meta property="og:image" content="/images/meta-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="relative">
        {/* Dot-matrix background accent (top-right corner) */}
        <div
          className="dot-matrix fixed top-0 right-0 w-64 h-64 opacity-30 pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <HeroSection />

          {/* Section divider */}
          <hr className="border-[#E0E0E0]" />

          <TimelineSection />

          <hr className="border-[#E0E0E0]" />

          <ProjectsSection />

          <hr className="border-[#E0E0E0]" />

          <SkillsSection />

          <hr className="border-[#E0E0E0]" />

          <ContactSection />
        </div>
      </div>
    </>
  );
}
