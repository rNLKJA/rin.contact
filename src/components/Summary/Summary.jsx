import React from "react";
// import Typography from "@mui/material/Typography";

import "./Summary.css";

function Summary() {
  return (
    <div className="flex flex-col justify-center align-center summary-container py-20">
      <h2
        className="text-left text-3xl text-bold tracking-widest"
        style={{ fontFamily: "DotGothic16" }}
      >
        About me
      </h2>

      <br />

      <p
        className="text-left text-2xl text-bold tracking-wide leading-loose"
        style={{ fontFamily: "Noto Sans" }}
      >
        I am an international student who recently graduated with a bachelor
        degree, from the University of Melbourne, majoring in Data Science. I
        passionate about data and building digital applications that intend to
        help people improve their life quality and maximise companies profits.
        Comfortable taking the initiative with working in both established and
        greenfield environments, whilst also keen on adapting to the latest
        technologies.{" "}
      </p>
    </div>
  );
}

export default Summary;
