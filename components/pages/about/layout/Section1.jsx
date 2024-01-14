import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Zoom } from "react-awesome-reveal";

export const Section1 = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5 justify-center items-center ">
      <div className="flex col-span-1 ">
        <Zoom triggerOnce>
          <Card
            className="w-full max-w-md md:max-w-lg lg:max-w-xl "
            style={{ position: "relative", height: "350px", width: "350px" }}
          >
            <CardMedia
              component="img"
              image="/images/about-me/rin.svg"
              alt="rin"
              className="object-cover justify-center items-center"
            />
          </Card>
        </Zoom>
      </div>
      <div className="col-span-2">
        <p className="font-bold leading-8 text-pretty">
          Hello, I&apos;m Rin, a curious kitty in the vast world of data
          science.
        </p>
        <p className="leading-8 text-pretty">
          Just like a cat exploring every nook of its territory, I hail from the
          cozy corners of{" "}
          <a href="https://en.wikipedia.org/wiki/Anshun" className="italic ">
            Anshun, China
          </a>
          , near the majestic{" "}
          <a
            className="italic"
            href="https://en.wikipedia.org/wiki/Huangguoshu_Waterfall"
          >
            Huangguoshu Waterfall
          </a>
          . My life took a pounce into the unknown when a simple chat with my
          mom led to a big leap across continents to Melbourne, where my
          adventure in education and data began.
        </p>
      </div>
    </div>
  );
};
