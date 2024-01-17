import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Fade } from "react-awesome-reveal";
import { ClearButton } from "../../ui/ClearButton";
import { SearchInput } from "../../ui/SearchInput";
import { ProjectContent } from "./ProjectContentCurator";
import { ContentContainer } from "../../ui/ContentContainer";

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredProjects = projectFiltering(projects, searchQuery);

  return (
    <ContentContainer>
      {ProjectBrowsingWelcomeSection()}

      {ProjectSearchBar(searchQuery, handleSearchChange, clearSearch)}

      {filteredProjects.slice(0, displayCount).map((project) => (
        <ProjectContent {...project} key={project.title} />
      ))}

      {MoreProjectLoadingButton(displayCount, projects, handleViewMore)}
    </ContentContainer>
  );
}

function ProjectBrowsingWelcomeSection() {
  return (
    <Fade triggerOnce duration={2000} direction="left">
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
            🐾 Welcome to our cozy corner of creativity! 🎨 Here, each project
            is a paw-some adventure in innovation. From the initial sketch to
            the final touch, we pour love and imagination into every detail.
            Explore our gallery to see how we&apos;re making the digital world
            purr-fect, one pixel at a time!
          </p>
        </div>
      </div>
    </Fade>
  );
}

function ProjectSearchBar(searchQuery, handleSearchChange, clearSearch) {
  return (
    <Fade duration={1500} triggerOnce direction="right">
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
    </Fade>
  );
}

function MoreProjectLoadingButton(displayCount, projects, handleViewMore) {
  return (
    <Fade triggerOnce duration={3000} direction="up">
      <div className="flex justify-center items-center">
        <br />
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
  );
}

function projectFiltering(projects, searchQuery) {
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
