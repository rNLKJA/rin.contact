import React, { useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Button from "@mui/material/Button";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineContent,
  TimelineConnector,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { SearchBar } from "../../ui/SearchBar";
import { useQuery } from "@tanstack/react-query";

import styled from "styled-components";

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 0.5rem;
`;

const ClearButton = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

async function fetchBlogList() {
  const response = await fetch("/data/blog_list.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function BlogList() {
  const [displayCount, setDisplayCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: blogList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogList"],
    queryFn: fetchBlogList,
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  // Filtered blog list based on search query
  const filteredBlogs = blogList.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.tags &&
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <div className="flex md:flex-row xs:flex-col justify-between items-center">
        <h2 className="text-xl text-bold">Blog List</h2>
        <Fade duration={1500} triggerOnce direction="right">
          <div className="search-bar">
            <SearchInput
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <ClearButton onClick={clearSearch}>Clear</ClearButton>
          </div>
        </Fade>
      </div>
      <br />

      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
        className="flex flex-col gap-4"
      >
        {filteredBlogs.slice(0, displayCount).map((blog) => (
          <TimelineItem key={blog.title + blog.author + blog.date}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Fade triggerOnce duration={1500} direction="up">
                <Link href={blog.link}>
                  <div key={blog.title} className="flex flex-col">
                    <h3 className="link-hover font-bold">{blog.title}</h3>

                    <div className="flex flex-wrap justify-between items-center">
                      <div className="flex md:flex-row gap-4 py-2">
                        <p>{blog.author}</p>
                        <p className="italic">{blog.date}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pb-2">
                      {blog.tags.map((tag) => (
                        <p
                          className="px-2 rounded-full"
                          style={{ backgroundColor: "#f9d9a9" }}
                          key={Date.now() + Math.random()}
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                    <p className="leading-5 text-hover">{blog.brief}</p>
                  </div>
                </Link>
              </Fade>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {filteredBlogs.length > displayCount && (
        <div className="flex justify-center items-center">
          <Fade triggerOnce duration={1500}>
            <Button
              onClick={() =>
                setDisplayCount((prevCount) =>
                  Math.min(prevCount + 5, filteredBlogs.length),
                )
              }
              varient="contained"
              style={{ backgroundColor: "black", color: "white" }}
            >
              More
            </Button>
          </Fade>
        </div>
      )}
    </div>
  );
}
