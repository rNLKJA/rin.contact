import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";

const data = [
  {
    skill: "Interpersonal Skills",
    value: [
      "Communication",
      "Teamwork",
      "Team Management",
      "Positive Leadershiop",
      "Self-Learning",
      "Negotiation",
      "Emotional Intelligence",
      "Listening",
    ],
  },
  {
    skill: "Programming Lang.",
    value: ["Python", "R", "SQL", "JavaScript", "HTML", "CSS", "React.js"],
  },
  {
    skill: "Data Science Skills",
    value: [
      "Pandas",
      "Numpy",
      "Polars",
      "SpreadSheet",
      "PySpark",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "Folium",
    ],
  },
  {
    skill: "Machine Learning",
    value: [
      "Statistical Modelling",
      "statsmodel",
      "Sci-kit Learn",
      "PyTorch",
      "Spark ML",
    ],
  },
];

const certifications = [
  "Google Data Analytic Certificate",
  "Google IT Automation with Python",
];

const education = [
  "2019-22 University of Melbourne Bachelor of Science",
  "2023-24 University of Melbourne Master of Data Science",
];

function Skills() {
  return (
    <div className="flex items-center justify-center h-auto w-full">
      <Box sx={{ maxWidth: "xs", py: 5, px: 1 }} className="w-full">
        {" "}
        <Grid container spacing={2} className="w-full">
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.skill}>
              <Typography
                fontFamily="Times New Roman"
                paragraph
                color="#201D30"
                fontWeight={"bold"}
              >
                {item.skill}
              </Typography>

              {item.value.map((value) => (
                <Typography
                  component="li"
                  variant="body"
                  fontSize={14}
                  fontFamily="Times New Roman"
                  lineHeight={1.88}
                >
                  {value}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <br />
        <Grid container spacing={2} className="w-full">
          <Grid item xs={12} sm={6}>
            <Typography paragraph fontWeight={"bold"}>
              Certifications
            </Typography>
            {certifications.map((cert) => (
              <Typography
                component={"li"}
                variant="body"
                fontSize={14}
                fontFamily="Times New Roman"
                lineHeight={2}
              >
                {cert}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography paragraph fontWeight={"bold"}>
              Education
            </Typography>
            {education.map((edu) => (
              <Typography
                component={"li"}
                variant="body"
                fontSize={14}
                fontFamily="Times New Roman"
                lineHeight={2}
              >
                {edu}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Skills;
