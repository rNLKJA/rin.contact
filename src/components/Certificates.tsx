import React from "react";
import { List, ListItem } from "@mui/material";

const Certificates = () => {
  const certificateStyle = {
    justifyContent: "space-between",
    width: "95%",
    display: "flex",

    fontSize: 12,
    color: "#fff9",
  };

  const dateTimeStyle = {
    width: 100,
    // textAlign: "middle",
  };

  return (
    <React.Fragment>
      <List sx={{ width: "100%" }}>
        <ListItem key={6}>
          <div style={certificateStyle}>
            <a
              href=""
              style={{
                color: "#f8f8f2",
                fontWeight: "bold",
              }}
            >
              Google Project Management
            </a>{" "}
            <div style={dateTimeStyle}>
              <p className="dateTimeStyle">IN PROGRESS</p>
            </div>
          </div>
        </ListItem>

        <ListItem key={5}>
          <div style={certificateStyle}>
            <a href="" style={{ color: "#f8f8f2", fontWeight: "bold" }}>
              Artificial Intelligence Specialization
            </a>{" "}
            <div style={dateTimeStyle}>
              <p className="dateTimeStyle">IN PROGRESS</p>
            </div>
          </div>
        </ListItem>

        <ListItem key={4}>
          <div style={certificateStyle}>
            <a
              href="https://www.credly.com/badges/1574e63e-3bce-4b5e-9eaa-f5f85b0b4848?source=linked_in_profile"
              style={{ color: "#f8f8f2", fontWeight: "bold" }}
            >
              Google Data Analytics
            </a>{" "}
            <p style={dateTimeStyle} className="dateTimeStyle">
              {" "}
              2021 - 06
            </p>
          </div>
        </ListItem>

        <ListItem key={3}>
          <div style={certificateStyle}>
            <a
              href="https://www.coursera.org/account/accomplishments/certificate/M55XTFHKHJH4"
              style={{ color: "#f8f8f2", fontWeight: "bold" }}
            >
              Agile with Atlassian Jira
            </a>{" "}
            <div style={dateTimeStyle} className="dateTimeStyle">
              <p>2021 - 11</p>
            </div>
          </div>
        </ListItem>

        <ListItem key={2}>
          <div style={certificateStyle}>
            <a
              href="https://www.linkedin.com/in/chuangyu-hscy/details/certifications/"
              style={{ color: "#f8f8f2", fontWeight: "bold" }}
            >
              Probability and Statistics for Business and Data Science
            </a>{" "}
            <div style={dateTimeStyle} className="dateTimeStyle">
              <p>2020 - 11</p>
            </div>
          </div>
        </ListItem>

        <ListItem key={1}>
          <div style={certificateStyle}>
            <a
              href="https://www.linkedin.com/in/chuangyu-hscy/details/certifications/"
              style={{ color: "#f8f8f2", fontWeight: "bold" }}
            >
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

export default Certificates;
