import React from "react";
const image = require("./rin.png");
const bg = require("./bg.png");

function Portrait() {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        maxHeight: "40vh",
        backgroundColor: "#D7D5D3",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        src={image}
        className="h-full w-full object-cover relative"
        alt="Rin Huang"
        style={{
          maxHeight: "100%",
          width: "auto",
        }}
      />
    </div>
  );
}

export default Portrait;
