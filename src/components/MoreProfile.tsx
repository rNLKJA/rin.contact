import React from "react";
// import profileImage from "../img/profileImage.jpg";
// import LinkContainer from "../links/Links";
// import Card from "@mui/material/Card";

import SkillIcons from "../components/SkillIcons";
import Certificates from "../components/Certificates";
import EducationTimeline from "../components/EducationTimeline";
import ProjectList from "../components/ProjectList";

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
