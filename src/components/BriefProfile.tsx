// import React from "react";
import profileImage from "../img/profileImage.jpg";
import LinkContainer from "../Links/Links";
import Card from "@mui/material/Card";

export const BriefProfile = () => {
  return (
    <Card
      style={{
        width: 320,
        justifyContent: "justify",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        color: "#f8f8f2",
        backgroundColor: "#323442",
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
          <a style={{ color: "#4da0ff" }} href="https://www.unimelb.edu.au/">
            {" "}
            <b>the University of Melbourne</b>
          </a>
          {" &"} I'm interesting in data science industry and passionate in
          data. I want to use data to improve people's lives and bring more
          benefits in any industrial aspect {"♬ヽ(*・ω・)ﾉ"}
        </p>

        <p style={{ width: 290, textAlign: "justify" }}>
          Currently I'm working on a full stack project{" "}
          <b>[[ Project Cradle ]]</b>, which it will integral all knowledge that
          I learn into a one stop accessible place. For more information, please
          click <a href="https://github.com/chuangyu-hscy/-">[HERE]</a>!
        </p>

        <HorizontalLine />
      </div>
    </Card>
  );
};

export const VerticalLine = () => {
  return <div className="verticalLine"></div>;
};

export const HorizontalLine = () => {
  return <div className="horizontalLine"></div>;
};
