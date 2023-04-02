import React from "react";
import { Typography } from "@material-ui/core";
import Box from "@mui/material/Box";

const projects = [
  {
    title:
      "Unimelb Coursework MAST30034 Applied Data Science Industrial Project",
    type: "Group Work, Team Leader, Agile Scrum Maste",
    brief:
      "Make CSL company historical data satisfy FAIR principles, that data can be collaborated and used across different labs and research departments. Find potential labels among different experiment results using unsupervised clustering methods such as t-sne and umap. Moreover, using visualisation tools to generate better statistical descriptive plots for lab results.",
  },
  {
    title: "Unimelb Coursework COMP30027 Machine Learning Project",
    type: "Individual Work",
    brief:
      "Build and critically analyse supervised Machine Learning methods to predict the cooking time for recipes based on their steps, ingredients and other features using python, Word2Vec, bag of words, feature engineer to optimise the machine learning model performance.",
  },
  {
    title: "Unimelb Coursework Web Information Technology",
    type: "Group Work, Team Leader, Full Stack Developer",
    brief:
      "Design, build and deploy a full stack web app for a fictitious food company that contains an order system and deliver system. The app was from scratch by adapting modern IT technologies using Node.js, Express, Heroku, MongoDB and express-handlebar.",
  },
  {
    title: "Unimelb Coursework COMP30022 IT Project",
    type: "Group Work, Team Leader, Agile Scrum Master, Front-end Developer",
    brief:
      "Build a Customer Relationship Management (CRM) application from scratch strictly following the Agile development cycle, using the modern IT technology including Node.js, express for back-end server and MongoDB, React.js for the front-end application.",
  },
];

function Projects() {
  return (
    <Box sx={{ textAlign: "left" }} style={{ width: "85vw" }}>
      {projects.map((project) => (
        <div key={project.title}>
          <Typography
            fontFamily="Times New Roman"
            color="#201D30"
            fontWeight={"bold"}
          >
            {project.title}
          </Typography>
          <Typography
            variant="body"
            fontSize={14}
            fontFamily="Times New Roman"
            lineHeight={1.88}
          >
            {project.type}
          </Typography>
          <Typography paragraph>{project.brief}</Typography>
        </div>
      ))}
    </Box>
  );
}

export default Projects;
