import React from "react";
import Button from "@mui/material/Button";

const CtaSection = () => {
  return (
    <div className="flex flex-col justify-center items-center border-solid border-2 hover:border-dashed h-svh px-4 mt-20 mb-20">
      <h2 className="font-bold text-center text-4xl text-pretty">
        Transforming Data into Actionable Insights
      </h2>
      <br />
      <p className="leading-loose text-pretty text-center">
        Unlock the power of your data with our expert consultation and project
        discussions.
      </p>

      <CtaButtons />
    </div>
  );
};

const CtaButtons = () => {
  return (
    <div className="flex flex-row">
      <ContactButton />
      <LearnMoreButton />
    </div>
  );
};

const ContactButton = () => {
  return (
    <Button
      variant="contained"
      size="large"
      style={{
        margin: "1rem",
        backgroundColor: "black",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}
      href="/contact"
    >
      Contact
    </Button>
  );
};

const LearnMoreButton = () => {
  return (
    <Button
      variant="outlined"
      size="large"
      style={{
        margin: "1rem",
        color: "black",
        borderColor: "black",
        "&:hover": {
          color: "rgba(0, 0, 0, 0.8)",
          borderColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
      href="/blogs/data/"
    >
      Learn More
    </Button>
  );
};

export default CtaSection;
