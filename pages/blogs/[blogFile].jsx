// pages/blogs/[filename].js
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";
import DOMPurify from "dompurify";

const highlighterStyle = docco;

const BlogPost = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return;
      const blogFile = router.query.blogFile;

      if (!blogFile) {
        setError("No blog file specified");
        return;
      }

      const timeout = setTimeout(() => {
        setError("404: Data not found");
        setIsLoading(false);
      }, 15000);

      try {
        const response = await fetch(`/data/blogs/${blogFile}.json`);
        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`,
          );
        }
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, router.query.blogFile]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>404: Data not found</div>;
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
      <h1 className="text-left text-2xl font-bold">{title}</h1>
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
      return <ImageComponent content={item} />;
    case "content":
      return <Content content={item} />;
    case "image-content":
      return <ImageContent content={item} />;
    case "content-image":
      return <ContentImage content={item} />;
    case "code":
      return <Code content={item} />;
    case "reference":
      return <Reference content={item.content} />;
    case "list":
      return <List content={item.content} />;
    default:
      return null;
  }
};

const Code = ({ content }) => {
  return (
    <Box
      component="pre"
      sx={{ overflow: "auto", bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}
    >
      <SyntaxHighlighter language={content.lang} style={highlighterStyle}>
        {content.code}
      </SyntaxHighlighter>
    </Box>
  );
};

const ImageComponent = ({ content }) => {
  // Default responsive settings for the image
  const defaultWidth = 600; // Adjust as needed
  const defaultHeight = 400; // Adjust as needed
  const defaultLayout = "fixed"; // Adjust as needed
  const defaultObjectFit = "cover"; // Adjust as needed

  return (
    <div className="flex items-center justify-center w-full">
      <Image
        src={content.src}
        alt={content.alt}
        width={content.width || defaultWidth}
        height={content.height || defaultHeight}
        layout={content.layout || defaultLayout}
        priority={true}
        objectFit={content.objectFit || defaultObjectFit}
      />
    </div>
  );
};

const Content = ({ content }) => {
  // Sanitize the content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content.content);

  return (
    <div className="flex flex-col gap-2 my-2">
      {content.subTitle && (
        <h2 className="font-bold text-lg">{content.subTitle}</h2>
      )}

      {sanitizedContent && (
        <Typography
          paragraph
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></Typography>
      )}
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
