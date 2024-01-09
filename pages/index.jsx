"use client";

import React from "react";

import HeroHeaderSection from "@/components/layout/index/Hero-Header";
import CtaSection from "@/components/layout/index/CTA";
import ContactSection from "@/components/layout/index/Contact";
import AboutSection from "@/components/layout/index/About";
import GallerySection from "@/components/layout/index/Gallery";
import PageTransition from "../components/PageTransition";

import { Fade } from "react-awesome-reveal";

export default function Home() {
  return (
    <PageTransition>
      <Fade triggerOnce duration={1500} direction="left">
        <HeroHeaderSection />
      </Fade>
      <br />

      <Fade triggerOnce duration={1500} direction="right">
        <GallerySection />
      </Fade>
      <br />

      <Fade triggerOnce duration={1500} direction="left">
        <AboutSection />
      </Fade>
      <br />

      <Fade triggerOnce duration={1500} direction="up">
        <CtaSection />
      </Fade>
      <br />

      <Fade triggerOnce duration={1500} direction="right">
        <ContactSection />
      </Fade>
    </PageTransition>
  );
}
