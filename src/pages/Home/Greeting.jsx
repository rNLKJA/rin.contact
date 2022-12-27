import React from "react";
import "../../locales/core/i18n";

import { TypeAnimation } from "react-type-animation";

function Greeting() {
  return (
    <div className="flex flex-col justify-center items-center home-div">
      <div className="w-4/5 flex flex-col justify-center">
        <h1
          className="text-5xl text-left text-bold"
          style={{ fontFamily: "Londrina ", fontWeight: 50 }}
        >
          <span style={{ color: "#1976D2" }}>Hello!</span> This is Rin
        </h1>

        <br />

        <AnimatedHello />
      </div>
    </div>
  );
}

const AnimatedHello = () => {
  return (
    <TypeAnimation
      sequence={strings}
      wrapper="div"
      cursor={true}
      speed={50}
      repeat={Infinity}
      className="w-4/5 text-3xl text-bold"
      style={{ fontFamily: "Noto Sans" }}
    />
  );
};

const strings = [
  "I'm an university student studying at Unimelb",
  5000,
  "I'm an university student majoring in Data Science",
  5000,
  "I'm a future Data Scientist",
  5000,
  "I'm a Full-Stack Developer",
  5000,
  "I'm a Barista",
  5000,
  "I'm a coffee appreciator",
  5000,
];

export default Greeting;
