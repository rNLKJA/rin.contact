import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MathematicalFoundationsAgenda = () => {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    // Fetch the agenda from the public folder
    fetch("/data-science/mathematicalFoundationsAgenda.json")
      .then((response) => response.json())
      .then((data) => setAgenda(data));
  }, []);

  return (
    <div className="flex flex-col">
      <h1>Study Agenda for Mathematical Foundations</h1>
      {agenda.map((week, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{week.week}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Timeline position="alternate">
              {week.details.map((detail, idx) => (
                <TimelineItem key={idx}>
                  <TimelineSeparator>
                    <TimelineDot color="primary" />
                    {idx < week.details.length - 1 ? (
                      <TimelineConnector />
                    ) : null}
                  </TimelineSeparator>
                  <TimelineContent>{detail}</TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </AccordionDetails>
        </Accordion>
      ))}

      <StudyTips />
    </div>
  );
};

export default MathematicalFoundationsAgenda;

const StudyTips = () => {
  return (
    <div className="flex flex-col">
      <h2>Study Tips</h2>
    </div>
  );
};
