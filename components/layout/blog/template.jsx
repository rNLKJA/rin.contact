import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

export default function BlogContent() {
  const [blogContent, setBlogContent] = useState([]);

  useEffect(() => {
    fetch("/data/blogs/new-year-milestone.json")
      .then((response) => response.json()) // directly parsing the JSON here
      .then((jsonData) => setBlogContent(jsonData))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Fade triggerOnce duration={1500} direction="left">
      <div>
        <h1>Blog Content</h1>
        <p></p>
      </div>
    </Fade>
  );
}
