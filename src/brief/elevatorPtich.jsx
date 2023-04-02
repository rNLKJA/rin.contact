import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ElevatorPitch() {
  return (
    <div className="flex items-center justify-center">
      <Box sx={{ maxWidth: "sm", mx: "auto", py: 5, px: 1 }}>
        <Typography
          variant="body1"
          align="justify"
          fontFamily="Times New Roman"
          fontSize={14}
          paragraph
        >
          This is Rin Huang, I'm a current Master's of Data Science Student
          study at the University of Melbourne. <br />
          <br />
          From the first day at unimelb, I have been passionate about data and
          set my sights on a career as a data engineer. I drove by a critical
          mind to find insights from complex data, build powerful products and
          provide data-driven solutions to clients. <br />
          <br />I achieve this via:
          <Typography
            component="li"
            variant="body1"
            align="justify"
            fontFamily="Times New Roman"
            fontSize={14}
          >
            learn essential knowledge for instance statistical modelling,
            machine learning, etc.{" "}
          </Typography>
          <Typography
            component="li"
            variant="body1"
            align="justify"
            fontFamily="Times New Roman"
            fontSize={14}
          >
            apply the knowledge in the real-world setting to see the impact in
            action.{" "}
          </Typography>
          <br />
          Before pursuing my master's degree, I had the opportunity to
          participate in several industrial projects. One project involved
          working with the CSL lab to drive digital transformation. To succeed
          in this endeavour, our team drew upon our collective knowledge and
          skills, conducting thorough exploratory data analyses and creating
          effective visualizations. What's more, we were able to stay agile and
          adapt to new machine-learning methods as needed. <br />
          <br />
          Based on my past experience, I am confident that the skills and
          knowledge I have developed, make me a strong asset for any data-driven
          endeavour. I am excited to work and create value with you!
        </Typography>
      </Box>
    </div>
  );
}

export default ElevatorPitch;
