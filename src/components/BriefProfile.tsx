// import required components
import { FunctionComponent } from "react";
import Card from "@mui/material/Card";
import LinkContainer from "../links/Links";

// import required images
import profileImage from "../img/profileImage.jpg"; // this is the alias for your own photo
import gearBg from "../img/gearBg.png";

/**
 * This ReactFunctionComponent will contain the brief introduction about yourself,
 * I suggest you upload your image and change the required information.
 *
 * You could modify the links information ins ./src/data/ folder
 * @returns BriefProfile<ReactFunctionComponent>
 */
export const BriefProfile: FunctionComponent = () => {
  return (
    // Define the main card container
    <Card
      style={{
        color: "#f8f8f2",
        backgroundColor: "#323442",
      }}
      className="brief-profile"
    >
      <div className="brief">
        {/* Define the background image  */}
        <img src={gearBg} alt="gear background" className="briefBg" />

        {/* Change profile image at here */}
        <div className="profileImage-container">
          <img
            className="profileImage"
            src={profileImage} // change this variable source path to your profile path
            alt="rin-huang profile"
          />
        </div>

        {/* Change it to your name, data-testid attribute could be removed */}
        <h2 data-testid="author">Rin / Sunchuangyu Huang</h2>
        <LinkContainer />

        <HorizontalLine />

        {/* Modify your brief at here! */}

        <p className="brief-text" style={{ textAlign: "justify" }}>
          I am an 🇨🇳 international student study Data Science at{" "}
          <a style={{ color: "#4da0ff" }} href="https://www.unimelb.edu.au/">
            {" "}
            <b>{"🇦🇺"} the University of Melbourne</b>
          </a>
          {" &"} I'm interesting in data science industry and passionate in
          data. I want to use data to improve people's lives and bring more
          benefits in any industrial aspect {"♬ヽ(*・ω・)ﾉ"}
        </p>

        <p className="brief-text" style={{ textAlign: "justify" }}>
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

/**
 * @returns ReactComponent, a Vertical BreakLine
 */
export const VerticalLine = () => {
  return <div className="verticalLine"></div>;
};

/**
 * @returns ReactComponent, a Horizontal BreakLine
 */
export const HorizontalLine = () => {
  return <div className="horizontalLine"></div>;
};
