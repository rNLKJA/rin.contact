import React from "react";
import Image from "next/image";

export const Section4: React.FC = ({}) => {
  return (
    <div className="grid md:grid-cols-2 justify-center items-center gap-10">
      <div className="flex justify-center items-center">
        <Image
          src="/images/about-me/coffee.svg"
          width={250}
          height={250}
          quality={75}
          layout="fixed"
          alt="coffee"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold">
          🌈 Curiosity and Coffee: Beyond the Data
        </h2>
        <br />
        <p className="font-bold leading-8 text-pretty">
          I&apos;m not just any data kitty; I&apos;m a feline fanatic for new
          experiences and continuous learning.
        </p>
        <p className="leading-8 text-pretty">
          My journey is sprinkled with certifications and a love affair with
          Melbourne&apos;s coffee spots. Like a cat basking in the sun, I find
          joy in balancing analytical rigor with creative exploration.
        </p>
      </div>
    </div>
  );
};
