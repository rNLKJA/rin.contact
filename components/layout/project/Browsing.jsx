import React from "react";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { SiGithub, SiOverleaf } from "react-icons/si";
import { Fade } from "react-awesome-reveal";
import { SearchBar } from "@/components/ui/SearchBar";

export default function ProjectsBrowsing() {
  const [projects, setProjects] = useState([]);
  const [displayCount, setDisplayCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 5);
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.skills &&
        project.skills.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  return (
    <div className="px-4">
      <Fade triggerOnce duration={2000} direction="left">
        <div>
          <h1>The Cat's Meow Projects</h1>
          <div className="grid md:grid-cols-2 gap-4 py-10 px-4 items-center">
            <div className="flex justify-center items-center">
              <Image
                src="/project/working-cat.png"
                width={280}
                height={280}
                layout="fixed"
                style={{ borderRadius: 20 }}
                quality={10}
                alt="working cat"
              />
            </div>
            <p className="leading-10">
              🐾 Welcome to our cozy corner of creativity! 🎨 Here, each project
              is a paw-some adventure in innovation. From the initial sketch to
              the final touch, we pour love and imagination into every detail.
              Explore our gallery to see how we're making the digital world
              purr-fect, one pixel at a time!
            </p>
          </div>
        </div>
      </Fade>

      <Fade duration={1500} triggerOnce direction="right">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Fade>

      {filteredProjects.slice(0, displayCount).map((project) => (
        <ProjectContent {...project} key={project.title} />
      ))}

      <Fade triggerOnce duration={3000} direction="up">
        <div className="flex justify-center items-center">
          {displayCount < projects.length && (
            <Button
              onClick={handleViewMore}
              varient="contained"
              style={{ backgroundColor: "black", color: "white" }}
            >
              More Projects
            </Button>
          )}
        </div>
      </Fade>
    </div>
  );
}

export const ProjectContent = (project) => {
  return (
    <Fade triggerOnce duration={1500} direction="up">
      <div className="py-10">
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <Image
              src={project.icon}
              width={35}
              height={35}
              alt="Project Icons"
              quality={50}
              layout="fixed"
            />
            <h2 className="link-hover-unclicable">{project.title}</h2>
          </div>
        </div>
        <br />
        <p className="leading-5">{project.date}</p>
        <br />

        <p className="leading-5">{project.description}</p>
        <br />
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <div
              key={skill}
              style={{
                fontWeight: "normal",
                transition: "font-weight 0.3s",
                backgroundColor: "#f9d9a9",
              }}
              onMouseOver={(e) => {
                e.target.style.fontWeight = "bold";
              }}
              onMouseOut={(e) => {
                e.target.style.fontWeight = "normal";
              }}
              className="flex rounded-full px-2"
            >
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
