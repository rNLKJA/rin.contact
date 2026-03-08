import React from "react";
import Head from "next/head";
import HeroSection from "@/components/sections/HeroSection";
import TimelineSection from "@/components/sections/TimelineSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionProgress from "@/components/layout/SectionProgress";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rin Huang | Strategic Thinking & Continuous Improvement, Senior Data Analyst</title>
        <meta
          name="description"
          content="Sunchuangyu (Rin) Huang — Senior Data Analyst at SAPOL, Research Software Engineer, Full-Stack Developer. Strategic thinking and continuous improvement."
        />
        <meta property="og:title" content="Rin Huang — Strategic Thinking & Continuous Improvement, Senior Data Analyst" />
        <meta
          property="og:description"
          content="At the intersection of data science, software engineering, and strategic intelligence."
        />
        <meta property="og:image" content="/images/meta-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
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
