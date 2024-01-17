"use client";
import React from "react";
import { DefaultSeo } from "next-seo";

export function NextSEO() {
  return (
    <DefaultSeo
      title="Pawsibly Rin"
      description="Explore the innovative portfolio of Sunchuangyu Huang, a seasoned Data Scientist and Full Stack Developer, showcasing expertise in data-driven solutions and modern web technologies."
      openGraph={{
        type: "website",
        url: "https://rin.contact/",
        title: "rNLKJA's Portfolio",
        description:
          "Explore Rin Huang's data science projects and read his latest thoughts on tech, data science and life.",
        images: [
          {
            url: "https://rin.contact/logo.svg",
            width: 300,
            height: 300,
            alt: "thumbnail image",
          },
        ],
        siteName: "Rin, Sunchuangyu Huang's Portfolio",
      }}
      additionalMetaTags={[
        { name: "author-full-name", content: "Sunchuangyu Huang" },
        { name: "author-prefer-name", content: "Rin Huang" },
        { name: "author-chinese-name", content: "黄孙创宇" },
        { name: "author-email", content: "huangsunchuangyu@gmail.com" },
        { name: "author-github", content: "https://github/rNLKJA" },
        {
          name: "author-linkedin",
          content: "https://www.linkedin.com/in/sunchuangyuhuang/",
        },
        { name: "author-website", content: "https://rin.contact" },
        {
          name: "instagram",
          content: "https://www.instagram.com/chuangyu_hscy",
        },
        {
          name: "xiaohongshu",
          content:
            "https://www.xiaohongshu.com/user/profile/5ddb3cf2000000000100bcab",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://rin.contact/" },
        { property: "og:title", content: "rNLKJA's Portfolio" },
        {
          property: "og:description",
          content:
            "Explore Rin Huang's data science projects and read his latest thoughts on tech, data science and life.",
        },
        {
          property: "og:image",
          content: "https://rin.contact/logo.svg",
        },
        { property: "highschool", content: "安顺第二高级中学" },
        { property: "高中", content: "安顺第二高级中学" },
        { property: "college", content: "trinity college" },
        { property: "姓名", content: "Sunchuangyu Huang" },
        {
          name: "education:university-bachelor",
          content: "University of Melbourne",
        },
        {
          name: "education:bachelor-degree",
          content: "Bachelor's Degree in Science (Data Science)",
        },
        { name: "education:field_of_study", content: "Data Science" },
        { name: "education:graduation_year", content: "2022" },
        {
          name: "education:university-master",
          content: "University of Melbourne",
        },
        {
          name: "education:degree-master",
          content: "Master in Data Science",
        },
        { name: "education:graduation_year", content: "2024" },
        { name: "education:alumni", content: "Sunchuangyu Huang" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#f5f5f5" },
      ]}
      additionalLinkTags={[
        {
          rel: "apple-touch-icon",
          href: "/logo.svg", // URL of Apple touch icon
          sizes: "76x76",
        },
      ]}
    />
  );
}
