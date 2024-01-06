// pages/blogs/[filename].js
import { ConstructionOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const BlogPost = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const { blogFile } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/blogs/${blogFile}.json`);
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
      }
    };

    if (blogFile) {
      fetchData();
    } else {
      console.log("No blog file specified");
    }
  }, [blogFile, data]);

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
      return <ImageContent content={item} />;
    case "code":
      return <pre>{item.content}</pre>; // You might want to use a syntax highlighter here
    case "reference":
      return <Reference content={item.content} />;
    case "list":
      return <List item={item.content} />;
    default:
      return null;
  }
};

const ImageContent = ({ content }) => {
  return (
    <div className="grid md:grid-cols-2 items-center">
      <div className="flex items-center justify-center">
        <Image
          src={content.image}
          alt={content.image}
          width={300}
          height={300}
          layout="fixed"
          priority={true}
          quality={75}
        />
      </div>
      <div>
        <ContentComponent item={content} />
      </div>
    </div>
  );
};

const Content = ({ content }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2>{content.subTitle}</h2>
      <Typography paragraph>{content.content}</Typography>
    </div>
  );
};

const Reference = ({ content }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2>Reference</h2>
      <ul className="list-disc pl-8">
        {content.map((ref) => (
          <li key={ref.name} href={ref.link}>
            {ref.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const List = ({ item }) => {
  return (
    <div>
      <h2></h2>
      <ul>
        {items.map((listItem, index) => (
          <li key={index}>
            {listItem.name && <strong>{listItem.name}: </strong>}
            {listItem.content}
            {listItem.content && listItem.content.type === "list" ? (
              <List items={listItem.content.content} />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};
