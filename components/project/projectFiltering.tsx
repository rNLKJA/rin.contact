"use client";
import { Project } from "../../app/project/page";

export function projectFiltering(projects: Project[], searchQuery: string) {
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
