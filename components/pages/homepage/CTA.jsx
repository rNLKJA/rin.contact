import React from "react";
import Button from "@mui/material/Button";

const CtaSection = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h2 className="font-bold text-center text-4xl text-pretty">
        Transforming Data into Actionable Insights
      </h2>
      <p className="leading-10 text-pretty text-center">
        Unlock the power of your data with our expert consultation and project
        discussions.
      </p>

      <div className="flex flex-row">
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
      </div>
    </div>
  );
};

export default CtaSection;