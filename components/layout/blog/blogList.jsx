import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function BlogList() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetch("/data/blog_list.json")
      .then((response) => response.json())
      .then((data) => setBlogList(data.reverse()))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Blog List</h2>
      <br />
      <div className="flex flex-col gap-8">
        {blogList &&
          blogList.map((blog) => (
            <div key={blog.title + blog.author + blog.date}>
              <Fade triggerOnce duration={1500} direction="up">
                <Link href={blog.link}>
                  <div key={blog.title}>
                    <h3 className="link-hover">{blog.title}</h3>
                    <div className="flex md:flex-row gap-4">
                      <p>{blog.author}</p>
                      <p className="italic">{blog.date}</p>
                    </div>
                    <p className="leading-5 text-hover">{blog.brief}</p>
                  </div>
                </Link>
              </Fade>
            </div>
          ))}
      </div>
    </div>
  );
}
