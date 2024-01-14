import React from "react";
import Image from "next/legacy/image";
import { Zoom } from "react-awesome-reveal";
import { AboutContent } from "./AboutContent";

export const AboutLayout = () => {
  return (
    <div
      className="grid md:grid-cols-2 items-center justify-center gap-20 px-4"
      style={{ height: 900 }}
    >
      <AboutContent />
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
