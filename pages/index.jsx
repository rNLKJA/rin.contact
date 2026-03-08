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
