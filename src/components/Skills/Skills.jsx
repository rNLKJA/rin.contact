import React from "react";
import skill_data from "../../data/skill";
// import { IconContext } from "react-icons";
import { useInView } from "react-intersection-observer";
// import { motion, AnimatePresence } from "framer-motion";
// import autoAnimate from "@formkit/auto-animate";

import bgImage from "./nwBg.png";
import "./Skills.css";

const SkillIcons = ({ title, data }) => {
  const { ref, inView } = useInView();

  return (
    <div className="py-4 skill-container">
      <p
        className="text-left text-3xl text-bold text-wrap tracking-widest"
        style={{ fontFamily: "DotGothic16" }}
      >
        {title}
      </p>

      <br />

      <div
        ref={ref}
        className={`w-full h-auto flex flex-wrap ${inView ? "showIcon" : ""}`}
      >
        {data.map((data, index) => {
          return (
            <section
              key={data.name + index}
              className="flex flex-col justify-center items-center skill-icons"
            >
              <div
                className="flex flex-col justify-center items-center "
                style={{ width: 150, height: 150 }}
              >
                {data.img}

                <br />

                <p
                  className="text-center text-xl text-bold"
                  style={{ fontFamily: "Prompt" }}
                >
                  {data.name}
                </p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

function Skills() {
  return (
    <div className="h-auto py-16 flex flex-col justify-center items-center">
      <img src={bgImage} alt="background" className="skill-background" />
      <div className="w-4/5 h-auto grid">
        <SkillIcons title="Core Skills" data={skill_data.core_skills} />
        <SkillIcons title="Data Related" data={skill_data.ds_skills} />
        <SkillIcons title="Database Skills" data={skill_data.db_skills} />
        <SkillIcons title="Full Stack Skills" data={skill_data.fs_skills} />
        <SkillIcons title="Programming" data={skill_data.program_skills} />
        <SkillIcons
          title="PM & Soft Sklls"
          data={skill_data.project_soft_skills}
        />
      </div>
    </div>
  );
}

export default Skills;
