// import required libraries
import React, { FunctionComponent } from "react";
import { List, ListItem } from "@mui/material";

/**
 * This component will contain all project that you involved as part of your
 * skill showcase! please edit it based on your needs, here I write as a normal
 * JSX.Element since I may have one or two project in the same subject, so you
 * have to adjust it based on your needs
 * @returns ProjectList<FunctionComponent>
 */
const ProjectList = () => {
  return (
    <React.Fragment>
      <List sx={{ width: "100%", m: "auto 0" }}>
        <ListItem>
          <h5 className="project-heading-h5">
            2022 S1{" "}
            <a href="https://handbook.unimelb.edu.au/2022/subjects/comp30022">
              COMP30022
            </a>
            <br />
            Artificial Intelligence
          </h5>
          <p className="roles">
            Group Project <br /> Team Leader
          </p>

          <p className="project-p" style={{ paddingLeft: 20 }}>
            Build and artificial intelligence game agent with python and
            tensorflow API to compete with other students in real time.
          </p>
        </ListItem>
        <hr />
        <ListItem>
          <h5 className="project-heading-h5">
            2021 S2{" "}
            <a href="https://handbook.unimelb.edu.au/2021/subjects/mast30034">
              MAST30034
            </a>
            <br />
            Applied Data Science
          </h5>{" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <p className="roles">Individual Project</p>
            <p className="roles">
              Group Project
              <br /> Team Leader
              <br />
              Scrum Master
            </p>
          </div>
          <List>
            <ListItem>
              <span
                style={{
                  width: 565,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 12,
                }}
              >
                <b>Project 1: </b> New York Taxi travel fee modelling and
                analysis
                <p className="project-p" style={{ width: 620 }}>
                  Use modern big data analysis tools folium, plotly to analysis
                  the relationship between geolocation and taxi fees based on
                  2015 taxi data, use PySpark to construct a linear relation
                  statistic model to predict the travel fee with given travel
                  coordinates and travel time.
                </p>
              </span>
            </ListItem>
            <hr className="project-divider" />

            <ListItem>
              <span
                style={{
                  width: 500,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 12,
                }}
              >
                <b>Project 2: </b> Applied Industrial Data Science Project
                <p className="project-p" style={{ width: 620 }}>
                  Make CSL company historical data satisfy FAIR principles, that
                  data can be collaborated and used across different labs and
                  research departments. Find potential labels among different
                  experiment results using unsupervised learning techniques.
                </p>
              </span>
            </ListItem>
          </List>
        </ListItem>
        <hr />
        <ListItem>
          <h5 className="project-heading-h5">
            2021 S2{" "}
            <a href="https://handbook.unimelb.edu.au/2021/subjects/comp30024">
              COMP30024
            </a>
            <br />
            IT Project
          </h5>{" "}
          <p className="roles">
            Group Project
            <br />
            Team Leader
            <br />
            Scrum Master
            <br />
            Front End Dev
          </p>
          <p className="project-p" style={{ paddingLeft: 20, width: 620 }}>
            Build a Customer Relationship Management (CRM) application from
            scratch strictly following the Agile development cycle, using the
            modern IT technology including Node.js, express for back-end server
            and MongoDB, react for the front-end application.
          </p>
        </ListItem>
        <hr />
        <ListItem>
          <h5 className="project-heading-h5">
            2021 S1{" "}
            <a href="https://handbook.unimelb.edu.au/2021/subjects/comp30027">
              COMP30027
            </a>{" "}
            <br />
            Machine Learning
          </h5>
          <p className="roles">Individual Project</p>
          <p className="project-p" style={{ paddingLeft: 20, width: 620 }}>
            Build and critically analyse supervised Machine Learning methods to
            predict the cooking time for recipes based on their steps,
            ingredients and other features using python, Word2Vec, bag of words,
            feature engineer to optimise the machine learning model performance.
          </p>
        </ListItem>
        <hr />
        <ListItem>
          <h5 style={{ width: 150 }}>
            2021 S1{" "}
            <a href="https://handbook.unimelb.edu.au/2021/subjects/mast30013">
              MAST30013
            </a>
            <br />
            Techniques in Operational Research
          </h5>{" "}
          <p className="roles">
            Group Project
            <br />
            Team member
          </p>
          <p className="project-p" style={{ paddingLeft: 20 }}>
            Use log-barrier penalty method and lagrange multiplier to solve
            power optimisation problem in wireless sensor networks. The team
            also come out a mathematical model which could solve the problem
            with direcct computation.
          </p>
        </ListItem>
        <hr />
        <ListItem>
          <h5 className="project-heading-h5">
            2021 S1{" "}
            <a href="https://handbook.unimelb.edu.au/2021/subjects/info30005">
              INFO30005
            </a>
            <br />
            Web Information Technology
          </h5>{" "}
          <p className="roles">
            Group Project
            <br />
            Team Leader
            <br />
            Full Stack Dev
          </p>
          <p className="project-p" style={{ paddingLeft: 20, width: 620 }}>
            Design, build and deploy a web app for a fictitious food company
            that contains an order system and deliver system. The app was from
            scratch by adapting modern IT technologies using Node.js, Express,
            Heroku, MongoDB and express-handlebar.
          </p>
        </ListItem>
        <hr />
        <ListItem>
          <h5 className="project-heading-h5">
            2020 S2{" "}
            <a href="https://handbook.unimelb.edu.au/2020/subjects/comp20008">
              COMP30022
            </a>{" "}
            <br />
            Element of Data Processing
          </h5>
          <p className="roles">Individual Projects</p>
          <List>
            <ListItem>
              <span
                style={{
                  width: 500,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 12,
                }}
              >
                <b>Project 1: </b> Web Scraping and analysis of Rugby Game
                <p className="project-p" style={{ width: 620 }}>
                  Use modern web scraping libraries in python to extract the
                  ruby game score from xml based articles. After processing game
                  score data to calculate average game difference.
                </p>
              </span>
            </ListItem>
            <hr className="project-divider" />
            <ListItem>
              <span
                style={{
                  width: 500,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 12,
                }}
              >
                <b>Project 2: </b> Data linkage and classification of product
                life expectancy
                <p className="project-p" style={{ width: 620 }}>
                  Processing and linking 6 shopping datasets on electric
                  products which data are stored in different format into a
                  single file based on text distance. Then construct
                  classification machine learning model to predict class feature
                  life expectancy at birth (years).
                </p>
              </span>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

// return React.Component
export default ProjectList;
