"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LatestProjectContainer = styled.div`
  ${cn}
`;
export const LatestProjectSection = () => {
  const router = useRouter();
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
    <LatestProjectContainer className="grid md:grid-cols-2 justify-center my-20 gap-5">
      <div className="flex flex-col gap-10">
        <h2 className="font-bold text-3xl">Latest Project</h2>
        <p className="font-bold text-xl">{recentProject.title}</p>
        <Button
          onClick={() => {
            router.push("/projects");
          }}
          className="w-1/2 bg-black text-white rounded hover:text-black border-2 border-black border-grey-100"
        >
          See All Projects
        </Button>
      </div>

      <div className="text-lg text-pretty leading-loose">
        {recentProject.description}
      </div>
    </LatestProjectContainer>
  );
};
