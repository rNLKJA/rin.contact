import React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import { Zoom } from "react-awesome-reveal";

const HeroHeaderSection = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-5 pb-10 px-4 pb-10 items-center">
        <div>
          <h1>Inspring, Innovation & Unlock the Power of Data Analytics</h1>
        </div>

        <div>
          <p>
            Embrace the Meow-gic of Data and Modern Tech: Inspurr & Innovate
            with Expert Guidance with{" "}
            <a
              className="font-bold"
              href="https://www.linkedin.com/in/sunchuangyuhuang/"
            >
              Rin Huang
            </a>
            !
          </p>
          <br />
          <div className="flex flex-end items-center gap-4">
            <Button
              variant="contained"
              size="medium"
              style={{
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
              }}
              href="/about-me"
            >
              More about Rin
            </Button>
            <Button
              variant="outlined"
              size="medium"
              style={{ borderColor: "black", color: "black" }}
              href="/data/resume.pdf"
              download="resume.pdf"
            >
              Resume
            </Button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Zoom triggerOnce>
        <Image
          src="/heroSection.png"
          alt="hero section image"
          width={300}
          height={300}
          layout="responsive"
          quality={50}
        />
      </Zoom>
    </>
  );
};

export default HeroHeaderSection;
