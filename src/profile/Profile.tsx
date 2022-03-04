import React, { FC } from "react";
import profileImage from "../img/profileImage.jpg";
import LinkContainer from "../Links/Links";
import SkillIcons from "../components/SkillIcons";
import { List, ListItem, Card } from "@mui/material";

import "./Styles/Profile.css";
// import { useTransition, animated } from "react-spring";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import Typography from "@mui/material/Typography";

import unimelbIcon from "../img/unimelbLogo.png";
import trinityIcon from "../img/trinityCollegeLogo.jpeg";
import highSchoolIcon from "../img/anshunHighSchool.jpeg";

/* main component */
const Profile: FC = () => {
  return (
    <React.Fragment>
      <Card
        className="profile-grid"
        style={{ backgroundColor: "transparent", gridGap: 5 }}
      >
        <div className="briefProfile">
          <BriefProfile />
        </div>

        <div className="moreInfo">
          <div className="moreInfoContainer">
            <MoreProfile />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default Profile;

export const VerticalLine = () => {
  return <div className="verticalLine"></div>;
};

export const HorizontalLine = () => {
  return <div className="horizontalLine"></div>;
};

export const BriefProfile = () => {
  return (
    <Card
      style={{
        width: 320,
        backgroundColor: "#44475a",
        // padding: 10,
        justifyContent: "justify",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        color: "#f8f8f2",
      }}
      className="brief-profile"
    >
      <div className="brief">
        <div className="profileImage-container">
          <img
            className="profileImage"
            src={profileImage}
            alt="rin-huang profile"
          />
        </div>
        <h2 data-testid="author">Rin / Sunchuangyu Huang</h2>
        <LinkContainer />

        <HorizontalLine />

        <p style={{ width: 290, textAlign: "justify" }}>
          I am a Data Science student currently study in{" "}
          <a href="https://www.unimelb.edu.au/"> the University of Melbourne</a>
          {" &"} I'm interesting in data science industry and passionate in
          data. I want to use data to improve people's lives and bring more
          benefits in any industrial aspect {"♬ヽ(*・ω・)ﾉ"}
        </p>

        <p style={{ width: 290, textAlign: "justify" }}>
          Currently I'm working on my IT project <b>[[ Project Cradle ]]</b>,
          which is a website and it will integral all knowledge that I have into
          one. For more information, please click{" "}
          <a href="https://github.com/chuangyu-hscy/-">[HERE]</a>!
        </p>

        <HorizontalLine />
      </div>
    </Card>
  );
};

export const MoreProfile = () => {
  return (
    <div className="more-profile">
      <h2 style={{ color: "#bd93f9" }}>More About Me</h2>

      <hr />
      <p style={{ width: 900, wordWrap: "break-word", textAlign: "justify" }}>
        An international student who majoring in Data Science and passionate
        about data and building digital applications that intend to help people
        improve their life quality and maximise companies profits. Comfortable
        taking the initiative with working in both established and greenfield
        environments, whilst also keen on adapting to the latest technologies.
      </p>

      <hr />

      <div style={{ textAlign: "left", width: "100%" }}>
        <h4 style={{ color: "#f1fa8c" }}>Programming skills that I have</h4>
      </div>
      {/* <hr /> */}
      <SkillIcons />
      <hr />

      <h4 style={{ color: "#50fa7b" }}>Education Backgrounds</h4>
      {/* <hr /> */}
      <EducationTimeline />
      <hr />

      <h4 style={{ color: "#8be9fd" }}>Undergraduate Subject Projects</h4>
      <hr />
      <ProjectList />
      <hr />

      <h4 style={{ color: "#ffb86c" }}>Certificates</h4>
      <hr />
      <Certificates />
      <hr />
    </div>
  );
};

export const EducationTimeline = () => {
  const style = {
    width: "100%",
  };

  return (
    <div style={style}>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="right"
            variant="body2"
            color="#f8f8f2"
          >
            <p>
              <b>2019 - 2022</b>
            </p>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <img
                style={{ width: 45, height: 45, borderRadius: 50 }}
                src={unimelbIcon}
                alt="unimelb logo"
              />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "5px" }}>
            <Typography>
              <div className="eduContent">
                <p className="unimelb" style={{ fontSize: 14 }}>
                  <a
                    style={{ color: "#4da0ff" }}
                    href="https://study.unimelb.edu.au/find/courses/major/data-science/"
                  >
                    <b>
                      Bachelor of Science (Data Science) <br></br> The
                      University of Melbourne
                    </b>
                  </a>
                </p>
                <p style={{ fontSize: 12, color: "#ff79c6" }}>
                  <b>
                    <i>Achievements</i>
                  </b>
                </p>
                <p style={{ fontSize: 12 }}>
                  Achieved 49.5/50 for the Data Science CSL Industrial Capstone
                  Subject (MAST30034)
                </p>
              </div>
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="f8f8f2"
          >
            <p>
              <b>2018 - 2019</b>
            </p>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <img
                style={{ width: 45, height: 45, borderRadius: 50 }}
                src={trinityIcon}
                alt="trinity logo"
              />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "15px" }}>
            <div className="eduContent">
              <p className="trinity" style={{ fontSize: 14 }}>
                <a
                  style={{ color: "#b8022b" }}
                  href="https://www.trinity.unimelb.edu.au/pathways-school"
                >
                  <b>
                    Trinity College Foundation Study<br></br> The University of
                    Melbourne
                  </b>
                </a>
              </p>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="f8f8f2"
          >
            <p>
              <b>2014 - 2018</b>
            </p>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <img
                style={{ width: 45, height: 45, borderRadius: 50 }}
                src={highSchoolIcon}
                alt="anshun high school logo"
              />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "15px" }}>
            <div className="eduContent">
              <p className="trinity" style={{ fontSize: 14 }}>
                <a style={{ color: "#0076a2" }} href="https://www.asez1957.cn">
                  <b>No. 2 High School of Anshun, Guizhou, China</b>
                </a>
              </p>
            </div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export const Certificates = () => {
  const certificateStyle = {
    justifyContent: "space-between",
    width: "95%",
    display: "flex",
    // flexDirection: "row",
    fontSize: 12,
    color: "#6272a4",
  };

  const dateTimeStyle = {
    width: 100,
    // textAlign: "middle",
  };

  return (
    <React.Fragment>
      <List sx={{ width: "100%" }}>
        <ListItem key={2}>
          <div style={certificateStyle}>
            <a href="">Google Project Management</a>{" "}
            <div style={dateTimeStyle}>
              <p className="dateTimeStyle">IN PROGRESS</p>
            </div>
          </div>
        </ListItem>

        <ListItem key={2}>
          <div style={certificateStyle}>
            <a href="">Artificial Intelligence Specialization</a>{" "}
            <div style={dateTimeStyle}>
              <p className="dateTimeStyle">IN PROGRESS</p>
            </div>
          </div>
        </ListItem>

        <ListItem key={1}>
          <div style={certificateStyle}>
            <a href="https://www.credly.com/badges/1574e63e-3bce-4b5e-9eaa-f5f85b0b4848?source=linked_in_profile">
              Google Data Analytics
            </a>{" "}
            <p style={dateTimeStyle} className="dateTimeStyle">
              {" "}
              2021 - 06
            </p>
          </div>
        </ListItem>

        <ListItem key={2}>
          <div style={certificateStyle}>
            <a href="https://www.coursera.org/account/accomplishments/certificate/M55XTFHKHJH4">
              Agile with Atlassian Jira
            </a>{" "}
            <div style={dateTimeStyle} className="dateTimeStyle">
              <p>2021 - 11</p>
            </div>
          </div>
        </ListItem>

        <ListItem key={3}>
          <div style={certificateStyle}>
            <a href="https://www.linkedin.com/in/chuangyu-hscy/details/certifications/">
              Probability and Statistics for Business and Data Science
            </a>{" "}
            <div style={dateTimeStyle} className="dateTimeStyle">
              <p>2020 - 11</p>
            </div>
          </div>
        </ListItem>

        <ListItem key={3}>
          <div style={certificateStyle}>
            <a href="https://www.linkedin.com/in/chuangyu-hscy/details/certifications/">
              Mental Health First Aid for Tertiary Students Blended Course
            </a>{" "}
            <div style={dateTimeStyle} className="dateTimeStyle">
              <p>2019 - 11</p>
            </div>
          </div>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export const ProjectList = () => {
  return (
    <React.Fragment>
      <List sx={{ width: "100%", m: "auto 0" }}>
        <ListItem>
          <h5 style={{ width: 150 }}>
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
          <h5 style={{ width: 150 }}>
            2021 S2{" "}
            <a href="https://handbook.unimelb.edu.au/2021/subjects/mast30034">
              MAST30034
            </a>
            <br />
            Applied Data Science
          </h5>{" "}
          <p className="roles">
            Group Project
            <br />
            Team Leader
            <br />
            Scrum Master
          </p>
          <p className="project-p" style={{ paddingLeft: 20 }}>
            Make CSL company historical data satisfy FAIR principles, that data
            can be collaborated and used across different labs and research
            departments. Find potential labels among different experiment
            results using unsupervised learning techniques.
          </p>
        </ListItem>
        <hr />
        <ListItem>
          <h5 style={{ width: 150 }}>
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
            Front-End Developer
          </p>
          <p className="project-p" style={{ paddingLeft: 20 }}>
            Build a Customer Relationship Management (CRM) application from
            scratch strictly following the Agile development cycle, using the
            modern IT technology including Node.js, express for back-end server
            and MongoDB, react for the front-end application.
          </p>
        </ListItem>
        <hr />
        <ListItem>
          <h5 style={{ width: 150 }}>
            2021 S1{" "}
            <a href="https://handbook.unimelb.edu.au/2021/subjects/comp30027">
              COMP30027
            </a>{" "}
            <br />
            Machine Learning
          </h5>
          <p className="roles">Individual Project</p>
          <p className="project-p" style={{ paddingLeft: 20 }}>
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
          <h5 style={{ width: 150 }}>
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
            Full Stack Developer
          </p>
          <p className="project-p" style={{ paddingLeft: 20 }}>
            Design, build and deploy a web app for a fictitious food company
            that contains an order system and deliver system. The app was from
            scratch by adapting modern IT technologies using Node.js, Express,
            Heroku, MongoDB and express-handlebar.
          </p>
        </ListItem>
        <hr />
        <ListItem>
          <h5 style={{ width: 150 }}>
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
                  width: 600,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 12,
                }}
              >
                <b>Project 1: </b> Web Scraping and analysis of Rugby Game
                <p className="project-p" style={{ width: 600 }}>
                  Use modern web scraping libraries in python to extract the
                  ruby game score from xml based articles. After processing game
                  score data to calculate average game difference.
                </p>
              </span>
            </ListItem>

            <ListItem>
              <span
                style={{
                  width: 600,
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 12,
                }}
              >
                <b>Project 2: </b> Data linkage and classification of product
                life expectancy
                <p className="project-p" style={{ width: 600 }}>
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
