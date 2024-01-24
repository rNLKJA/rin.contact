import React from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AboutSectionContainer = styled.div`
  ${cn}
`;

interface AboutSectionProps {
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  return (
    <AboutSectionContainer
      className={`grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-20 px-4 ${className}`}
    >
      <div>
        <div className="flex flex-col justify-between">
          <h2 className="font-bold text-4xl text-pretty leading-normal">
            The Data Cat-alytic Converter: Unlocking the Power of Data to Drive
            Business Success
          </h2>

          <br />

          <p className="leading-loose text-lg text-pretty">
            I am a purr-fessional data whisperer, weaving intricate tales from
            numbers with the stealth and grace of a night-prowling cat. In the
            vast, shadowy realm of analytics, I illuminate complex mysteries
            with a glint of insight as sharp as a cat&apos;s gaze.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Image
          src="/images/index/about-curious-cat.svg"
          alt="about image"
          width={350}
          height={350}
          quality={50}
          priority
        />
      </div>
    </AboutSectionContainer>
  );
};
