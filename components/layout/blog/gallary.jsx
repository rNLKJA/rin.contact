import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function BlogBrowsing() {
  return (
    <Fade triggerOnce duration={1500} direction="left" fraction={0.5}>
      <div className="px-4">
        <h1>The Meow-nificent Blog for Digital Crafters 🧶</h1>

        <div className="grid md:grid-cols-2 py-10 px-4 gap-10">
          <div className="flex col-span-1 justify-center items-center">
            <ImageLoader
              src="/images/blog/melbourne-style.png"
              width={400}
              height={400}
              alt="melbourne style"
              quality={75}
              style={{ width: "100%", height: "auto", position: "relative" }}
            />
          </div>
          <div className="flex flex-col flex-start gap-10">
            <DailyQuotes />
            <StarredBlog />
            <LatestBlog />
          </div>
        </div>
      </div>
    </Fade>
  );
}

const ImageLoader = ({ src, width, height, alt, quality, style }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex justify-center items-center" style={style}>
      {isLoading && <div className="loading-animation">Loading...</div>}
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        layout="responsive"
        quality={quality}
        loading="lazy"
        onLoadingComplete={() => setIsLoading(false)}
        style={{ borderRadius: isLoading ? 0 : "20px" }}
      />
    </div>
  );
};

export const StarredBlog = () => {
  return (
    <div className="flex flex-col flex-start gap-5">
      <div className="flex justify-between">
        <h2>⭐ Starred</h2>
      </div>
      <Link href="/blogs/data/">
        <p className="link-hover">
          The Transformative Impact of Data Science on Business Efficiency and
          Growth
        </p>
        <div className="flex flex-row justify-between">
          <p>rNLKJA</p>
          <p>29th-Dec-2023</p>
        </div>
      </Link>
    </div>
  );
};

export const LatestBlog = () => {
  const [latestBlogData, setLatestBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/blog_list.json");
        const data = await response.json();
        setLatestBlogData(data[data.length - 1]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-start gap-5 ">
      <h2>📅 Latest Post</h2>

      {latestBlogData && latestBlogData.title && (
        <Link href={latestBlogData.link}>
          <p className="link-hover">{latestBlogData.title}</p>
          <div className="flex flex-row justify-between">
            <p>{latestBlogData.author}</p>
            <p>{latestBlogData.date}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

const DailyQuotes = () => {
  const [dailyQuote, setDailyQuote] = useState({ text: "", author: "" }); // New state variable for the daily quote

  useEffect(() => {
    const fetchDailyQuote = async () => {
      try {
        // Replace 'https://api.quotable.io/random' with the API you intend to use
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (data.content && data.author) {
          setDailyQuote({ text: data.content, author: data.author });
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchDailyQuote();
  }, []);

  return (
    <div>
      {" "}
      {dailyQuote.text && (
        <div className="daily-quote">
          <h2>Daily Inspiration</h2>
          <br />
          <p>
            "{dailyQuote.text}" - {dailyQuote.author}
          </p>
        </div>
      )}
    </div>
  );
};
