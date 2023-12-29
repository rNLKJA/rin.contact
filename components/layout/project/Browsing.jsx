import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { SiGithub, SiOverleaf } from "react-icons/si";
import { Fade } from "react-awesome-reveal";

export default function ProjectsBrowsing() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h4>The Cat's Meow Projects</h4>
      <div className="grid md:grid-cols-2 gap-4 py-10 px-4 items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/working-cat.png"
            width={280}
            height={280}
            responsive
            style={{ borderRadius: 20 }}
            quality={50}
          />
        </div>
        <p className="leading-10">
          🐾 Welcome to our cozy corner of creativity! 🎨 Here, each project is
          a paw-some adventure in innovation. From the initial sketch to the
          final touch, we pour love and imagination into every detail. Explore
          our gallery to see how we're making the digital world purr-fect, one
          pixel at a time!
        </p>
      </div>

      {projects &&
        projects
          .reverse()
          .map((project) => (
            <ProjectContent {...project} key={project.title} />
          ))}
    </div>
  );
}

export const ProjectContent = (project) => {
  return (
    <Fade triggerOnce duration={1500} direction="up">
      <div className="py-10">
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-4">
            <Image
              src={project.icon}
              width={35}
              height={35}
              alt="Project Icons"
              quality={50}
              responsive
            />
            <h4>{project.title}</h4>
          </div>
        </div>
        <br />
        <p className="leading-5">{project.date}</p>
        <br />

        <p className="leading-10">{project.description}</p>
        <br />
        <ul className="flex flex-wrap gap-4">
          {project.skills.map((skill) => (
            <li
              key={skill}
              style={{
                color: "grey",
                fontWeight: "normal",
                transition: "font-weight 0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.fontWeight = "bold";
              }}
              onMouseOut={(e) => {
                e.target.style.fontWeight = "normal";
              }}
            >
              {skill}
            </li>
          ))}
        </ul>

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
