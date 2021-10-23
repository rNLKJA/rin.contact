import React from "react";

import twitterImage from "../img/twitter.png";
import githubImage from "../img/github.png";
import linkedInImage from "../img/linkedIn.png";
import instagram from "../img/instagram.png";

const LinkContainer = () => {
  return (
    <div className="link-container">
      <div className="link-item">
        <a href="https://github.com/chuangyu-hscy" alt="github">
          <img src={githubImage} alt="github" className="github" />
        </a>
      </div>

      <div className="link-item">
        <a href="https://www.linkedin.com/in/chuangyu-hscy" alt="linkedIn">
          <img src={linkedInImage} alt="linkedIn" />
        </a>
      </div>

      <div className="link-item">
        <a href="https://www.instagram.com/chuangyu_hscy/" alt="instagram">
          <img src={instagram} alt="instagram" />
        </a>
      </div>

      <div className="link-item">
        <a href="https://twitter.com/chuangyu_hscy" alt="instagram">
          <img src={twitterImage} alt="instagram" />
        </a>
      </div>
    </div>
  );
};

export default LinkContainer;
