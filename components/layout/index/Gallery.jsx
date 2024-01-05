import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import { Zoom } from "react-awesome-reveal";

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

  // Get the most recent project (assuming the last one in the array is the most recent)
  const recentProject = projects[projects.length - 1];

  return (
    <div className="grid md:grid-cols-2 py-10 px-4 justify-center items-center">
      <div className="flex justify-center items-center">
        <Zoom triggerOnce>
          <Image
            src="/index/project_thumbnail.svg"
            width={300}
            height={300}
            quality={25}
            alt="thumbnail"
            layout="responsive"
          />
        </Zoom>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <h2 className="">My Recent Project</h2>
        </div>
        {recentProject && (
          <div className="flex flex-col gap-4">
            <h2>{recentProject.title}</h2>
            <p>{recentProject.description}</p>

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
        )}
      </div>
    </div>
  );
};

export default GallerySection;
