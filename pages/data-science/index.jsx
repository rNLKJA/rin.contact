import React from "react";
import { Considerations } from "@/components/layout/data-science/Considerations";
import { CourseDescription } from "@/components/layout/data-science/CourseDescription";
import { CourseStages } from "@/components/layout/data-science/CourseStages";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  return (
    <div>
      <Fade duration={1500} triggerOnce direction="left">
        <CourseDescription />
      </Fade>
      <br />
      <Fade duration={1500} triggerOnce direction="ri">
        <Considerations />
      </Fade>
      <br />
      <Fade duration={1500} triggerOnce direction="up">
        <CourseStages />
      </Fade>
    </div>
  );
}
