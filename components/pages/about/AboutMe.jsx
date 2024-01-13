import React from "react";
import { Fade } from "react-awesome-reveal";
import { Section1 } from "./layout/Section1";
import { Section2 } from "./layout/Section2";
import { Section3 } from "./layout/Section3";
import { Section4 } from "./layout/Section4";
import { Section5 } from "./layout/Section5";

export default function About() {
  return (
    <div className="flex flex-col px-4 gap-10">
      <h1 className="leading-20 text-xl font-bold text-pretty">
        🐾 Paws and Progress The Journey Begins
      </h1>

      <Fade triggerOnce duration={2000} direction="up">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
      </Fade>
    </div>
  );
}
