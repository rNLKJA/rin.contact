import React from "react";

import Greeting from "./Greeting";
import PhotoCard from "./PhotoCard";
import "./Home.css";

// import bgImage from "./images/bg1.jpg";

function Home() {
  return (
    <>
      {window.innerWidth > 912 ? (
        <div className="flex component-container justify-center items-center greeting-container">
          <div className="grid grid-cols-2 gap-48 header-container">
            <Greeting />
            <PhotoCard />
          </div>
        </div>
      ) : (
        <div className="flex component-container justify-center items-center">
          <div className="grid grid-rows-2 gap-2 header-container">
            <Greeting />
            <PhotoCard />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
