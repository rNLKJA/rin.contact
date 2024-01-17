import React from "react";
import Button from "@mui/material/Button";
import { SiGithub, SiOverleaf } from "react-icons/si";
import { Fade } from "react-awesome-reveal";
import { CiShoppingTag } from "react-icons/ci";

export const ProjectContent = (project) => {
  return (
    <Fade triggerOnce duration={1500} direction="up">
      <div className="py-10">
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <h2 className="text-lg font-bold">{project.title}</h2>
          </div>
        </div>
        <br />
        <p className="leading-5">{project.date}</p>
        <br />

        <p className="leading-loose">{project.description}</p>
        <br />

        <div className="flex flex-wrap gap-1">
          {project.skills.map((skill) => (
            <div
              key={skill}
              onMouseOver={(e) => {
                e.target.style.fontWeight = "bold";
              }}
              onMouseOut={(e) => {
                e.target.style.fontWeight = "normal";
              }}
              className="flex flex-row items-center gap-2 rounded-full px-2 hover:bg-gray-200 text-gray-700"
            >
              <CiShoppingTag />
              {skill}
            </div>
          ))}
        </div>

        <br />
        <div className="flex flex-start gap-4">
          {project.github_link && (
            <Button
              href={project.github_link}
              variant="contained"
              style={{ backgroundColor: "black" }}
              className="flex flex-start gap-4"
              target="_blank"
            >
              <SiGithub />
              Github
            </Button>
          )}

          {project.overleaf_link && (
            <Button
              href={project.overleaf_link}
              variant="contained"
              style={{ backgroundColor: "black" }}
              className="flex flex-start gap-4"
              target="_blank"
            >
              <SiOverleaf />
              Overleaf
            </Button>
          )}
        </div>
      </div>
    </Fade>
  );
};
