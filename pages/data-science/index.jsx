import React from "react";
import { Considerations } from "@/components/pages/ds/Considerations";
import { CourseDescription } from "@/components/pages/ds/CourseDescription";
import { CourseStages } from "@/components/pages/ds/CourseStages";
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
