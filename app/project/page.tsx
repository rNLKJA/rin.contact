"use client";

import React, { useEffect, useState } from "react";
import { ContentContainer } from "@/components/ui/ContentContainer";
import { ProjectContent } from "../../components/project/ProjectContent";
import { projectFiltering } from "../../components/project/projectFiltering";
import { MoreProjectLoadingButton } from "../../components/project/MoreProjectLoadingButton";
import { ProjectSearchBar } from "../../components/project/ProjectSearchBar";
import { ProjectBrowsingWelcomeSection } from "../../components/project/ProjectBrowsingWelcomeSection";

export interface Project {
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
