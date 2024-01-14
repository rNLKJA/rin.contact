import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const GallerySection = () => {
  const [projects, setProjects] = useState([
    {
      title: "Project",
      description: "Description",
    },
  ]);

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
    <div className="grid md:grid-cols-2 justify-center my-20 gap-5">
      <div className="flex flex-col gap-10">
        <h2 className="font-bold text-3xl">Latest Project</h2>
        <p className="font-bold text-xl">{recentProject.title}</p>
        <Button
          variant="contained"
          color="primary"
          href={"/projects"}
          style={{
            backgroundColor: "black",
          }}
          className="w-1/2"
        >
          See All Projects
        </Button>
      </div>

      <div className="text-lg text-pretty leading-loose">
        {recentProject.description}
      </div>
    </div>
  );
};

export default GallerySection;
