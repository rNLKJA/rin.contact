"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import { ClearButton } from "@/components/ui/ClearButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { SiGithub, SiOverleaf } from "react-icons/si";
import { CiShoppingTag } from "react-icons/ci";

interface Project {
  title: string;
  date: string;
  description: string;
  skills: string[];
  github_link?: string;
  overleaf_link?: string;
}

export default function ProjectsBrowsing() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredProjects = projectFiltering(projects, searchQuery);

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="w-full">
        <ContentContainer>
          {ProjectBrowsingWelcomeSection()}

          {ProjectSearchBar(searchQuery, handleSearchChange, clearSearch)}

          {filteredProjects.slice(0, displayCount).map((project) => (
            <ProjectContent {...project} key={project.title} />
          ))}

          {MoreProjectLoadingButton(displayCount, projects, handleViewMore)}
        </ContentContainer>{" "}
      </section>
    </main>
  );
}

function ProjectBrowsingWelcomeSection() {
  return (
    <div>
      <h1 className="text-xl font-bold">The Cat&apos;s Meow Projects</h1>

      <div className="grid md:grid-cols-2 gap-4 py-10 px-4 items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/images/project/working-cat.svg"
            width={280}
            height={280}
            layout="fixed"
            style={{ borderRadius: 20 }}
            quality={10}
            alt="working cat - its me :)"
          />
        </div>
        <p className="leading-10">
          🐾 Welcome to our cozy corner of creativity! 🎨 Here, each project is
          a paw-some adventure in innovation. From the initial sketch to the
          final touch, we pour love and imagination into every detail. Explore
          our gallery to see how we&apos;re making the digital world purr-fect,
          one pixel at a time!
        </p>
      </div>
    </div>
  );
}

function ProjectSearchBar(
  searchQuery: string,
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  clearSearch: () => void,
) {
  return (
    <div className="flex flex-col justify-center md:flex-row  md:justify-between items-center gap-2">
      <SearchInput
        className="flex "
        type="text"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ClearButton className="flex " onClick={clearSearch}>
        Clear
      </ClearButton>
    </div>
  );
}

function MoreProjectLoadingButton(
  displayCount: number,
  projects: Project[],
  handleViewMore: () => void,
) {
  return (
    <div className="flex justify-center items-center">
      <br />
      {displayCount < projects.length && (
        <Button
          onClick={handleViewMore}
          variant="contained"
          style={{ backgroundColor: "black", color: "white" }}
        >
          More Projects
        </Button>
      )}
    </div>
  );
}

function projectFiltering(projects: Project[], searchQuery: string) {
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.skills &&
        project.skills.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );
}

const ProjectContent: React.FC<Project> = (project) => {
  return (
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
              const target = e.target as HTMLElement;
              target.style.fontWeight = "bold";
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLElement;
              target.style.fontWeight = "normal";
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
  );
};
