import React from "react";
import Helmet from "react-helmet";

const Font = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Londrina+Outline&family=Noto+Sans:wght@300&family=Prompt:wght@200&family=Raleway+Dots&family=Zen+Dots&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

const AuthorInfo = () => {
  return (
    <>
      <meta name="author" content="@rNLKJA" />
      <meta name="author" content="Sunchuangyu Huang" />
      <meta name="GitHub" url="https://github.com/rNLKJA" />
      <meta name="links" url="https://rin.contact" />
    </>
  );
};

export default function Meta() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Rin Huang Portfolio Website" />

        <title>Rin Huang</title>
        <meta name="project start date" content="2022-12-18" />

        <AuthorInfo />

        <Font />
      </Helmet>
    </>
  );
}
