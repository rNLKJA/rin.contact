import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function BlogBrowsing() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Fade triggerOnce duration={1500} direction="left" fraction={0.5}>
      <div>
        <h2>The Meow-nificent Blog for Digital Crafters 🧶</h2>

        <div className="grid md:grid-cols-2 py-10 px-4 gap-5">
          <div className="flex col-span-1 justify-center items-center">
            <Image
              src="/melbourne-style.png"
              width={400}
              height={400}
              alt="melbourne style"
              responsive
              quality={50}
              style={{ borderRadius: 20 }}
            />
          </div>
          <div className="flex flex-col flex-start gap-5">
            <StarredBlog />
            <LatestBlog />
          </div>
        </div>
      </div>
    </Fade>
  );
}

export const StarredBlog = () => {
  return (
    <div className="flex flex-col flex-start gap-5">
      <div className="flex justify-between">
        <h3>⭐ Starred</h3>
      </div>
      <Link href="/blogs/data/">
        <h4 className="link-hover">
          The Transformative Impact of Data Science on Business Efficiency and
          Growth
        </h4>
      </Link>
    </div>
  );
};

export const LatestBlog = () => {
  return (
    <div className="flex flex-col flex-start gap-5 ">
      <h3>📅 Latest Post</h3>

      <Link href="/blogs/data/">
        <h4 className="link-hover">Lorem Ipsum</h4>
      </Link>
    </div>
  );
};
