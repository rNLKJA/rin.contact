import React from "react";
import { Fade } from "react-awesome-reveal";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import { Section4 } from "./Section4";
import { Section5 } from "./Section5";

export default function Biography() {
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
