import React, { useState } from "react";
import profileImage from "../img/profileImage.jpg";
import LinkContainer from "../links/Links.jsx";
import pythonIcon from "./img/python.png";
import reactIcon from "./img/react.png";
import jsIcon from "./img/javascript.png";
import sqlIcon from "./img/sql.png";
import rIcon from "./img/R.png";
import "./profile.css";
import { useTransition, animated } from "react-spring";

/* main component */
const Profile = () => {
  const [flip, setFlip] = useState(false);
  const transition = useTransition(flip, {
    from: { opacity: 0.5, config: { duration: 1000 } },
    enter: { opacity: 1, config: { duration: 1000 } },
    leave: { opacity: 0.5, config: { duration: 1000 } },
  });

  return (
    <React.Fragment>
      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            <BackCard flip={flip} setFlip={setFlip} />
          </animated.div>
        ) : (
          <animated.div style={style}>
            <FrontCard flip={flip} setFlip={setFlip} />
          </animated.div>
        ),
      )}
    </React.Fragment>
  );
};

export default Profile;

export const SkillIcons = () => {
  return (
    <div className="skill-container">
      <div className="skill-items">
        <img src={pythonIcon} alt="python" />
      </div>

      <VerticalLine />

      <div className="skill-items">
        <img src={jsIcon} alt="javascript" />
      </div>

      <div className="skill-items">
        <img src={reactIcon} alt="react" />
      </div>

      <div className="skill-items">
        <img src={sqlIcon} alt="sql" />
      </div>

      <div className="skill-items">
        <img src={rIcon} alt="R" />
      </div>
    </div>
  );
};

export const VerticalLine = () => {
  return <div className="verticalLine"></div>;
};

export const HorizontalLine = () => {
  return <div className="horizontalLine"></div>;
};

export const FrontCard = ({ flip, setFlip }) => {
  return (
    <div
      className="personal-profile front"
      onClick={() => {
        setFlip(!flip);
      }}
    >
      <div className="profileImage-container">
        <img
          className="profileImage"
          src={profileImage}
          alt="rin-huang profile"
        />
      </div>
      <h2 data-testid="author">Sunchuangyu Huang</h2>
      <LinkContainer />
    </div>
  );
};

export const BackCard = ({ flip, setFlip }) => {
  return (
    <div
      className="personal-profile back"
      onClick={() => {
        setFlip(!flip);
      }}
    >
      <HorizontalLine />
      <div style={{ textAlign: "left", width: "100%" }}>
        <p>
          <b>Hello there ~ {"(ฅ ' ω ' ฅ)"}</b>
        </p>

        <p>
          <b>This is Rin Huang !</b>
        </p>
      </div>

      <p>
        I am a Data Science student currently study in{" "}
        <a href="https://www.unimelb.edu.au/"> the University of Melbourne</a>.
        I'm interesting in data science industry and passionating in data.
      </p>

      <p>
        I want to use data to improve people's lives and bring more benefits in
        any industrial aspect {"♬ヽ(*・ω・)ﾉ"}
      </p>

      <div style={{ textAlign: "left", width: "100%" }}>
        <p>
          <b>Skills and Experience</b>
        </p>
      </div>
      <SkillIcons />

      <HorizontalLine />
    </div>
  );
};
