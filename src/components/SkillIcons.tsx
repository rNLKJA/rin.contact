import pythonIcon from "../img/python.png";
import reactIcon from "../img/react.png";
import jsIcon from "../img/javascript.png";
import sqlIcon from "../img/sql.png";
import rIcon from "../img/R.png";
import mongodbIcon from "../img/mongodb.png";
import sparkIcon from "../img/spark-logo-reverse.png";
import tfIcon from "../img/tf.png";
import jupyterIcon from "../img/jupyter.png";
import statIcon from "../img/statistic.png";
import agileIcon from "../img/agile.png";
import "../profile/Styles/Profile.css";

const SkillIcons = () => {
  return (
    <div className="skill-container">
      <div className="skill-items">
        <img src={pythonIcon} alt="python" />
        <p>Python</p>
      </div>

      <div className="skill-items">
        <img src={rIcon} alt="R" />
        <p>R</p>
      </div>

      <VerticalLine />

      <div className="skill-items">
        <img src={statIcon} alt="mongodb" />
        <p>Statistic</p>
      </div>

      <div className="skill-items">
        <img src={jupyterIcon} alt="mongodb" style={{ width: 35 }} />
        <p>Jupyter</p>
      </div>

      <div className="skill-items">
        <img src={tfIcon} alt="mongodb" />
        <p>TensorFlow</p>
      </div>

      <div className="skill-items">
        <img src={sparkIcon} alt="mongodb" style={{ width: 75 }} />
        <p>PySpark</p>
      </div>

      <div className="skill-items">
        <img src={agileIcon} alt="mongodb" />
        <p>Agile</p>
      </div>

      <div className="skill-items">
        <img src={sqlIcon} alt="sql" />
        <p>SQL</p>
      </div>

      <div className="skill-items">
        <img src={mongodbIcon} alt="mongodb" />
        <p>NoSQL</p>
      </div>

      <div className="skill-items">
        <img src={jsIcon} alt="javascript" />
        <p>JavaScript</p>
      </div>

      <div className="skill-items">
        <img src={reactIcon} alt="react" />
        <p>React</p>
      </div>
    </div>
  );
};

export default SkillIcons;

export const VerticalLine = () => {
  return <div className="verticalLine"></div>;
};
