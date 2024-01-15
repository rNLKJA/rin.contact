import React from "react";
import Image from "next/image";

export const Section4 = () => {
  return (
    <div className="grid md:grid-cols-2 justify-center items-center gap-10">
      <div className="flex justify-center items-center">
        <Image
          src="/images/about-me/coffee.svg"
          alt="coffee"
          width={250}
          height={250}
          // layout="responsive"
          // sizes="(max-width: 300px)"
          quality={30}
          layout="fixed"
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
