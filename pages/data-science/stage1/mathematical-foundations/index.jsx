import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MathematicalFoundationsAgenda = () => {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    fetch("/data/data-science/mathematicalFoundationsAgenda.json")
      .then((response) => response.json())
      .then((data) => setAgenda(data));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1>Mathematical Foundations</h1>

      {agenda &&
        agenda.map((week, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{week.week}</Typography>
            </AccordionSummary>{" "}
            <AccordionDetails>
              <div>
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >
                  {week.details &&
                    week.details.map((detail, idx) => (
                      <TimelineItem key={idx} className="flex items-center">
                        <TimelineSeparator>
                          <TimelineDot color="primary" />
                          {idx < week.details.length - 1 && (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography component="span">
                            Day {idx + 1}:{" "}
                          </Typography>
                          {detail}
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                </Timeline>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}

      <StudyTips />
    </div>
  );
};

export default MathematicalFoundationsAgenda;

export const StudyTips = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2>Study Tips</h2>

      <div>
        <ul className="pl-8 list-disc">
          <li>
            <span className="font-bold">Study Consistent</span>: Dedicate
            specific hours each day to your study to maintain a steady pace.
          </li>
          <li>
            <span className="font-bold">Practice Regularly</span>: Work on
            problems and real-world applications to solidify your understanding.
          </li>
          <li>
            <span className="font-bold">Seek Resources</span>: Utilize books,
            online courses, and forums to enhance your learning.
          </li>
          <li>
            <span className="font-bold">Reflect and Adjust</span>: Regularly
            assess your understanding and adjust your study methods as needed.
          </li>
          <li>
            <span className="font-bold">Engage with Peers</span>: Discuss
            concepts and problems with peers or mentors to gain different
            perspectives.
          </li>
        </ul>
      </div>
    </div>
  );
};
