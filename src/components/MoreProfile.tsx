// import required libraries
import React, { FunctionComponent } from "react";
import SkillIcons from "../components/SkillIcons";
import Certificates from "../components/Certificates";
import EducationTimeline from "../components/EducationTimeline";
import ProjectList from "../components/ProjectList";

// import background images
import nwBg from "../img/nwBg.png";

/**
 * This component is the main container for more personal information page,
 * please edit the self-intro below
 * @returns MoreProfile<FunctionComponent>
 */
export const MoreProfile = () => {
  const selfIntro =
    "An international student who majoring in Data Science and passionate about data and building digital applications that intend to help people improve their life quality and maximize companies profits. Comfortable taking the initiative with working in both established and greenfield environments, whilst also keen on adapting to the latest technologies.";

  return (
    <div className="more-profile">
      {/* Define the background image */}
      <img src={nwBg} alt="background" className="more-Bg"></img>

      <h2 style={{ color: "#bd93f9" }}>More About Me</h2>
      <hr />

      {/* Edit self intro here! */}
      <p className="self-intro">{selfIntro}</p>

      <hr />

      {/* import different components  */}
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
