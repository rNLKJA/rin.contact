import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { BiLogoPython } from "react-icons/bi";
import { SiJupyter } from "react-icons/si";
import { SiPlotly } from "react-icons/si";
import { DiSpark } from "react-icons/di";
import { GiSpiderWeb } from "react-icons/gi";
import { SiGooglecloud } from "react-icons/si";
import { SiJfrogpipelines } from "react-icons/si";
import { BiMath } from "react-icons/bi";
import Image from "next/image";

export default function Biography() {
  return (
    <div className="flex flex-col py-10 px-4">
      <Section1 />
      <br />
      <Section2 />
      <br />
      <Section3 />
      <br />
      <Section4 />
      <br />
      <Section5 />
      <br />
    </div>
  );
}

export const Section1 = () => {
  return (
    <div className="grid md:grid-cols-2 gap-20 justify-center items-center px-4 pb-10">
      <div className="flex justify-center">
        <Card
          className="w-full max-w-md md:max-w-lg lg:max-w-xl"
          style={{ position: "relative" }}
        >
          <CardMedia
            component="img"
            image="/rin.svg"
            alt="rin"
            className="object-cover w-full"
            style={{ height: "100%" }}
          />
        </Card>
      </div>
      <div>
        <h2>🐾 Paws and Progress</h2>
        <h2>The Journey Begins</h2>
        <br />
        <p className="font-bold leading-10">
          Hello, I'm Rin, a curious kitty in the vast world of data science.
        </p>
        <p className="leading-10">
          Just like a cat exploring every nook of its territory, I hail from the
          cozy corners of{" "}
          <a href="https://en.wikipedia.org/wiki/Anshun" className="italic ">
            Anshun, China
          </a>
          , near the majestic{" "}
          <a
            className="italic"
            href="https://en.wikipedia.org/wiki/Huangguoshu_Waterfall"
          >
            Huangguoshu Waterfall
          </a>
          . My life took a pounce into the unknown when a simple chat with my
          mom led to a big leap across continents to Melbourne, where my
          adventure in education and data began.
        </p>
      </div>
    </div>
  );
};

export const Section2 = () => {
  return (
    <div className="flex flex-row justify-center items-center pb-10 px-4 ">
      <div></div>
      <div>
        <h2>🌟 Starry-Eyed Explorer: Education and Passion</h2>
        <p className="font-bold leading-10">
          Currently, I'm sharpening my claws in a rigorous Master's program
        </p>
        <p className="leading-10">
          expected to be a full-fledged data whisperer by mid-2024. My whiskers
          twitch at the thought of diving into data pools, extracting shiny
          insights like a cat fishing for its next meal. I've watched the tech
          world's luminaries, like Apple and Tesla, play with their big toys,
          sparking my own dreams of playing a part in this fascinating future.
        </p>
      </div>
    </div>
  );
};

export const Section3 = () => {
  const techStack = [
    { name: "Python", icon: <BiLogoPython style={{ fontSize: "2rem" }} /> },
    { name: "Jupyter", icon: <SiJupyter style={{ fontSize: "2rem" }} /> },
    { name: "Plotly", icon: <SiPlotly style={{ fontSize: "2rem" }} /> },
    { name: "PySpark", icon: <DiSpark style={{ fontSize: "2rem" }} /> },
    {
      name: "Web Scraping",
      icon: <GiSpiderWeb style={{ fontSize: "2rem" }} />,
    },
    {
      name: "Google Cloud",
      icon: <SiGooglecloud style={{ fontSize: "2rem" }} />,
    },
    {
      name: "Machine Learning",
      icon: <SiJfrogpipelines style={{ fontSize: "2rem" }} />,
    },
    { name: "Statistics", icon: <BiMath style={{ fontSize: "2rem" }} /> },
  ];

  return (
    <div className="flex flex-row justify-center items-center py-10 px-4">
      <div></div>
      <div>
        <h2>🛠️ Toolbox of Treats: Skills and Experience</h2>
        <br />
        <p className="font-bold leading-10">
          My toolbox is a treasure chest filled with the fanciest gadgets:
        </p>
        <br />
        <div className="grid grid-cols-4 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-row gap-4 justify-items center-items"
            >
              {tech.icon}
              <p>{tech.name}</p>
            </div>
          ))}
        </div>

        <br />

        <p className="leading-10">
          I've roamed the real-world jungles with{" "}
          <a className="italic" href="https://www.csiro.au/en/">
            CSIRO
          </a>{" "}
          and{" "}
          <a className="italic" href="https://www.csl.com/">
            CSL
          </a>
          , hunting down solutions and pouncing on problems. Even my time as a
          Barista was like being in a fast-paced game of catch-the-laser-dot,
          honing my skills in customer service and multitasking.
        </p>
      </div>
    </div>
  );
};

export const Section4 = () => {
  return (
    <div className="grid md:grid-cols-2 justify-center items-center py-10 px-4 gap-10">
      <div className="flex justify-center items-center">
        <Image
          src="/coffee.svg"
          alt="coffee"
          width={250}
          height={250}
          // layout="responsive"
          sizes="(max-width: 300px)"
        />
      </div>
      <div>
        <h2>🌈 Curiosity and Coffee: Beyond the Data</h2>
        <br />
        <p className="font-bold leading-10">
          I'm not just any data kitty; I'm a feline fanatic for new experiences
          and continuous learning.
        </p>
        <p className="leading-10">
          My journey is sprinkled with certifications and a love affair with
          Melbourne's coffee spots. Like a cat basking in the sun, I find joy in
          balancing analytical rigor with creative exploration.
        </p>
      </div>
    </div>
  );
};

export const Section5 = () => {
  return (
    <div className="flex flex-row justify-center items-center pt-10 px-4">
      <div></div>
      <div>
        <h2>🤝 Whisker Whispers: Team Contribution and Connection</h2>
        <br />
        <p className="font-bold leading-10">
          As you consider welcoming a new member to your pack,
        </p>
        <p className="leading-10">
          know that I bring more than just a sharp mind and nimble paws. I bring
          a heart full of curiosity and a spirit of adventure. Let's have a
          purr-fect coffee chat, and I'll show you how, together, we can make
          the data dance and the business purr with progress.
        </p>
      </div>
    </div>
  );
};
