"use client";
import React from "react";
import Button from "@mui/material/Button";
import { Project } from "../../app/project/page";

export function MoreProjectLoadingButton(
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
