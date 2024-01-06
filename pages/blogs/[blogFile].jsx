// pages/blogs/[filename].js
import { ConstructionOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const BlogPost = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return;
      const blogFile = router.query.blogFile;

      if (!blogFile) {
        setError("No blog file specified");
        return;
      }

      try {
        const response = await fetch(`/${blogFile}.json`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`,
          );
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [router.isReady, router.query.filename]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <HeaderComponent
        title={data.title}
        author={data.author}
        date={data.date}
      />

      {data.content.map((item, index) => (
        <ContentComponent key={index} item={item} />
      ))}
    </div>
  );
};

export default BlogPost;

const HeaderComponent = ({ title, author, date }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-left">{title}</h1>
      <div className="flex flex-row space-x-4">
        <Typography>{author}</Typography>
        <Typography>{date}</Typography>
      </div>
    </div>
  );
};

const ContentComponent = ({ item }) => {
  switch (item.type) {
    case "image":
      return <img src={item.image} alt="Blog" className="w-full" />;
    case "content":
      return <Content content={item} />;
    case "image-content":
      return <ImageContent content={item} />;
    case "content-image":
      return <ContentImage content={item} />;
    case "code":
      return <pre>{item.content}</pre>;
    case "reference":
      return <Reference content={item.content} />;
    case "list":
      return <List content={item.content} />;
    default:
      return null;
  }
};
const Content = ({ content }) => {
  return (
    <div className="flex flex-col gap-2 my-2">
      {content.subTitle && <h2 className="font-bold">{content.subTitle}</h2>}
      <Typography paragraph>{content.content}</Typography>
    </div>
  );
};

const ImageContent = ({ content }) => {
  return (
    <div className="grid md:grid-cols-2 items-center my-4">
      <div className="flex items-center justify-center">
        <Image
          src={content.image}
          alt="content"
          width={300}
          height={300}
          priority={true}
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Render all content items */}
        {content.content.map((item, index) => (
          <ContentComponent key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

const ContentImage = ({ content }) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 items-center my-4">
      <div className="flex flex-col items-center justify-center">
        {/* Render all content items */}
        {content.content.map((item, index) => (
          <ContentComponent key={index} item={item} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={content.image}
          alt="content"
          width={300}
          height={300}
          priority={true}
        />
      </div>
    </div>
  );
};

const List = ({ content }) => {
  // Function to recursively render list items
  const renderListItem = (listItem, index) => {
    if (typeof listItem === "object" && listItem !== null) {
      // If listItem is an object, it might have nested content
      if (Array.isArray(listItem.content)) {
        // Render nested list if content is an array
        return (
          <li key={index}>
            {listItem.name && <strong>{listItem.name}: </strong>}
            <List content={listItem.content} /> {/* Recursive render */}
          </li>
        );
      } else {
        // Render simple content
        return (
          <li key={index}>
            {listItem.name && <strong>{listItem.name}: </strong>}
            {listItem.content}
          </li>
        );
      }
    } else {
      // If listItem is not an object, render its value directly
      return <li key={index}>{listItem}</li>;
    }
  };

  return (
    <div className="my-2">
      {content.subTitle && <h3 className="font-bold">{content.subTitle}</h3>}
      <ul className="list-disc pl-8">
        {/* Ensure content is an array before mapping */}
        {Array.isArray(content) ? content.map(renderListItem) : null}
      </ul>
    </div>
  );
};

const Reference = ({ content }) => {
  return (
    <div className="flex flex-col gap-2 my-2">
      <h2 className="font-bold">Reference</h2>
      <ul className="list-disc pl-8">
        {content.map((ref, index) => (
          <li key={index}>
            <a href={ref.link} target="_blank" rel="noreferrer">
              {ref.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
