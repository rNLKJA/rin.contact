import React from "react";

import { Section1 } from "@/components/about/Section1";
import { Section2 } from "@/components/about/Section2";
import { Section3 } from "@/components/about/Section3";
import { Section4 } from "@/components/about/Section4";
import { Section5 } from "@/components/about/Section5";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="w-full flex flex-col gap-8">
        <h1 className="leading-20 text-xl font-bold text-pretty">
          🐾 Paws and Progress The Journey Begins
        </h1>

        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </section>
    </main>
  );
};

export default About;
