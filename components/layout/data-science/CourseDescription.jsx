import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const CourseDescription = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1>Professional Data Science Technology Director</h1>

      <Typography>
        This curriculum is designed to transform a Ph.D. level student into a
        data science technology director. It covers fundamental to advanced data
        science skills, mathematical foundations, critical analysis, and the
        latest technologies. This comprehensive study path is tailored for those
        aiming to excel in the most challenging data science roles, start their
        data business, or contribute to cutting-edge research.
      </Typography>

      <ul className="pl-8 list-disc">
        <li>
          <span className="font-bold">Total Duration</span>: Approximately 5
          months (about 150 days)
        </li>
        <li>
          <span className="font-bold">Total Stages</span>: 3 major stages
        </li>
        <li>
          <span className="font-bold">Number of Topics</span>: 13 topics
        </li>
      </ul>

      <br />

      <Typography>
        Given the depth and breadth of the material, you'll need to dedicate a
        significant amount of time each day. Here's how you might structure it:
      </Typography>

      <br />

      {/* Stage 1 Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-bold">
            Stage 1 (Foundational Knowledge): 50 days
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Allocate around 2-3 hours daily. These topics are foundational and
            might require less time if you already have some understanding of
            them.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Stage 2 Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-bold">
            Stage 2 (Intermediate Skills & Specializations): 50 days
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Allocate around 3-4 hours daily. These topics begin to increase in
            complexity and depth.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Stage 3 Accordion */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="font-bold">
            Stage 3 (Advanced Techniques & Emerging Technologies): 50 days
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Allocate around 4-5 hours daily. These are advanced topics and might
            require additional time for practice and deep understanding.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Typography>
        Given these estimates, you'll be spending approximately 2-5 hours daily,
        depending on the current stage and topic complexity. This is a rigorous
        schedule, but necessary to cover all the material by the end of May.
      </Typography>
    </div>
  );
};
