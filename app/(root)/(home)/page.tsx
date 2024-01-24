"use client";

import React from "react";
import { ContactSection } from "@/components/home/ContactSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { LatestProjectSection } from "@/components/home/LatestProjectSection";
import { AboutSection } from "@/components/home/AboutSection";

import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="w-full">
        <HeroSection />
        <AboutSection />
        <LatestProjectSection />
        <CallToActionSection />
        <ContactSection />
      </section>
    </main>
  );
}
