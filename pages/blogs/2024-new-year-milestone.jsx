import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Typography from "@mui/material/Typography";
import BlogAuthor from "@/components/specific/blogAuthor";

export default function Home() {
  const [blogContent, setBlogContent] = useState(null);

  useEffect(() => {
    fetch("/data/blogs/new-year-milestone.json")
      .then((response) => response.json()) // directly parsing the JSON here
      .then((jsonData) => setBlogContent(jsonData))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {blogContent && (
        <Fade triggerOnce duration={1500} direction="up">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{blogContent.title}</h1>

            <BlogAuthor author={blogContent.author} date={blogContent.date} />

            <div className="mt-4 flex flex-col gap-2">
              {blogContent.content.map((paragraph, index) => (
                <Typography key={index} className="my-2 text-justify leading-8">
                  {paragraph}
                </Typography>
              ))}
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
}
