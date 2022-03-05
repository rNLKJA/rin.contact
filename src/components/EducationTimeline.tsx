// import required libraries
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import Typography from "@mui/material/Typography";

import { FunctionComponent } from "react";

// import education background / school, uni, college, institution logos
import unimelbIcon from "../img/unimelbLogo.png";
import trinityIcon from "../img/trinityCollegeLogo.jpeg";
import highSchoolIcon from "../img/anshunHighSchool.jpeg";

/**
 * This component contains information about your education background,
 * Please edit required information based on your needs, for @mui/Timeline component
 * please refer the @mui/lab official handbook
 * @returns EducationTimeline<FunctionComponent>
 */
const EducationTimeline: FunctionComponent = () => {
  // define education timeline div width
  const style = {
    width: "100%",
  };

  return (
    <div style={style}>
      <Timeline position="alternate">
        {/* Education background 3 */}
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

        {/* Education background 2 */}
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

        {/* Education background 1 */}
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

export default EducationTimeline;
