import React, { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import Link from "next/link";

export const CourseStages = () => {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    fetch("/data/data-science/course_stages.json")
      .then((response) => response.json())
      .then((data) => setStages(data));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-4 p-4">
      {stages &&
        stages.map((stage, index) => (
          <div key={index} className="p-3">
            <Link
              href={stage.link}
              passHref
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="h6" component="h1" gutterBottom>
                {stage.title}
              </Typography>
            </Link>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              {stage.completion}
            </Typography>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {stage.details.map((detail, detailIndex) => (
                <Link
                  key={detail.link}
                  href={detail.link}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <TimelineItem key={detailIndex}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {detailIndex < stage.details.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body1" component="div">
                        {detail.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {detail.content}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Link>
              ))}
            </Timeline>
          </div>
        ))}
    </div>
  );
};
