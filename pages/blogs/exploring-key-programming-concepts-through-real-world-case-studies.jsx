import React, { useState, useEffect, use } from "react";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export default function BlogContent() {
  const [blogContent, setBlogContent] = useState([]);

  useEffect(() => {
    fetch(
      "/data/blogs/exploring-key-programming-concepts-through-real-world-case-study.json",
    )
      .then((response) => response.json()) // directly parsing the JSON here
      .then((jsonData) => setBlogContent(jsonData))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Fade triggerOnce duration={1500} direction="left">
      <div className="flex flex-col flex-start gap-10 text-justify leading-8">
        {blogContent.header && (
          <div>
            <h1 className="text-left">{blogContent.header.title}</h1>
            <div className="flex flex-row gap-5 py-5">
              <p>@{blogContent.header.author}</p>
              <p>{blogContent.header.date}</p>
            </div>

            <Typography>{blogContent.header.description}</Typography>
          </div>
        )}

        {blogContent.body &&
          blogContent.body.map((paragraph) => (
            <div key={paragraph.subTitle}>
              <h3>{paragraph.subTitle}</h3>
              <br />
              <Typography>{paragraph.description}</Typography>
            </div>
          ))}

        {blogContent.summary && <Typography>{blogContent.summary}</Typography>}
      </div>

      <br />

      <h3>References</h3>
      <ul className="list-disc pl-8">
        {blogContent.references &&
          blogContent.references.map((reference) => (
            <Link
              key={reference.name}
              href={reference.link}
              target="_blank"
              alt={reference.link}
              className="link-hover"
            >
              <li>{reference.name}</li>
            </Link>
          ))}
      </ul>
    </Fade>
  );
}
