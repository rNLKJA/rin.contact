import React from "react";
import { BiLogoPython } from "react-icons/bi";
import { SiJupyter } from "react-icons/si";
import { SiPlotly } from "react-icons/si";
import { DiSpark } from "react-icons/di";
import { GiSpiderWeb } from "react-icons/gi";
import { SiGooglecloud } from "react-icons/si";
import { SiJfrogpipelines } from "react-icons/si";
import { BiMath } from "react-icons/bi";
import { FaGitAlt, FaLinux, FaBusinessTime } from "react-icons/fa6";
import { TbBrandNextjs } from "react-icons/tb";

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
      name: "Cloud Computing",
      icon: <SiGooglecloud style={{ fontSize: "2rem" }} />,
    },
    {
      name: "Machine Learning",
      icon: <SiJfrogpipelines style={{ fontSize: "2rem" }} />,
    },
    { name: "Statistics", icon: <BiMath style={{ fontSize: "2rem" }} /> },
    {
      name: "Git",
      icon: <FaGitAlt style={{ fontSize: "2rem" }} />,
    },
    {
      name: "Linux",
      icon: <FaLinux style={{ fontSize: "2rem" }} />,
    },
    {
      name: "Full Stack Development",
      icon: <TbBrandNextjs style={{ fontSize: "2rem" }} />,
    },
    {
      name: "Agile Project Management",
      icon: <FaBusinessTime style={{ fontSize: "2rem" }} />,
    },
  ];

  // Sort the techStack array based on skill priority
  techStack.sort((a, b) => {
    const dataScienceSkills = [
      "Python",
      "Jupyter",
      "Plotly",
      "PySpark",
      "Web Scraping",
      "Machine Learning",
      "Statistics",
    ];
    const aIsDataScienceSkill = dataScienceSkills.includes(a.name);
    const bIsDataScienceSkill = dataScienceSkills.includes(b.name);

    if (aIsDataScienceSkill && !bIsDataScienceSkill) {
      return -1; // a comes before b
    } else if (!aIsDataScienceSkill && bIsDataScienceSkill) {
      return 1; // b comes before a
    } else {
      return 0; // maintain the original order
    }
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <div></div>
      <div>
        <h2 className="text-xl font-bold">
          🛠️ Toolbox of Treats: Skills and Experience
        </h2>
        <br />
        <p className="font-bold leading-8">
          My toolbox is a treasure chest filled with the fanciest gadgets:
        </p>
        <br />
        <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-2">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-row gap-4 justify-items center-items py-2 "
            >
              {tech.icon}
              <p className="toolbox-hover">{tech.name}</p>
            </div>
          ))}
        </div>

        <br />

        <p className="leading-normal">
          I&apos;ve roamed the real-world jungles with{" "}
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
