import React from "react";
import Image from "next/legacy/image";
import { Zoom } from "react-awesome-reveal";

const AboutSection = () => {
  return (
    <div
      className="grid md:grid-cols-2 items-center justify-center gap-20 px-4"
      style={{ height: 900 }}
    >
      <div className="flex flex-col justify-between">
        <h2 className="font-bold text-4xl text-pretty">
          The Data Cat-alytic Converter: Unlocking the Power of Data to Drive
          Business Success
        </h2>
        <br />
        <p className="leading-8 text-lg text-pretty">
          I am a purr-fessional data whisperer, weaving intricate tales from
          numbers with the stealth and grace of a night-prowling cat. In the
          vast, shadowy realm of analytics, I illuminate complex mysteries with
          a glint of insight as sharp as a cat's gaze.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Zoom triggerOnce>
          <Image
            src="/images/index/about-curious-cat.svg"
            alt="about image"
            width={400}
            height={400}
            quality={50}
            responsive
          />
        </Zoom>
      </div>
    </div>
  );
};

export default AboutSection;
