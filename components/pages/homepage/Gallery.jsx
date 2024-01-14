import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const GallerySection = () => {
  const [projects, setProjects] = useState([]);

  // Fetch projects from the local JSON file
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/data/projects.json");
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const recentProject = projects[projects.length - 1];

  return (
    <div className="grid py-20 px-4 justify-center items-center ">
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl">Latest Project</h2>
          <Button
            variant="contained"
            color="primary"
            href={"/projects"}
            style={{
              backgroundColor: "black",
            }}
          >
            See All Projects
          </Button>
        </div>
        {recentProject && (
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl">{recentProject.title}</p>
            <p className="text-lg text-pretty leading-8">
              {recentProject.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GallerySection;
