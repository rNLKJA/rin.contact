import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Considerations = () => {
  return (
    <div>
      <h3>Considerations</h3>
      <br />
      <div className="px-4">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-bold">Personal Pace</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Adjust according to your speed of learning. Some may grasp
              concepts quickly, while others might need more time to delve deep.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-bold">Quality over Quantity</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              It's more important to understand concepts deeply than to rush
              through material. Adjust your daily hours accordingly.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-bold">Breaks and Health</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Regular breaks and maintaining good health are crucial for
              effective learning. Make sure to schedule downtime.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="font-bold">Practical Application</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Allocate extra time for hands-on practice, projects, or
              discussions. Applying what you learn is essential for deep
              understanding.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
