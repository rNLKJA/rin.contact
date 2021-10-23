// import required libraries
import "./App.css";
import profileImage from "./img/profileImage.jpg";
import twitterImage from "./img/twitter.png";
import githubImage from "./img/github.png";
import linkedInImage from "./img/linkedIn.png";
import instagram from "./img/instagram.png";

function App() {
  return (
    <div className="App">
      <div className="personal-profile">
        <div className="profileImage-container">
          <img
            className="profileImage"
            src={profileImage}
            alt="rin-huang profile"
          />
        </div>
        <h1>Sunchuangyu Huang</h1>
        <LinkContainer />
      </div>
    </div>
  );
}

export default App;

export const LinkContainer = () => {
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
      {/* <div className="link-item"><img src={discordImage} alt="discord" /></div> */}
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
