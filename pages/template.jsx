import React from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "@/styles/globals.css";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth={isMobile ? "xs" : "lg"}
      style={{
        width: isMobile ? "100%" : "1100px",
        backgroundColor: "",
      }}
    >
      <Header />

      <DataArticle />

      <Footer />
    </Container>
  );
}

export const DataArticle = () => {
  return (
    <div>
      <h2>
        The Transformative Impact of Data Science on Business Efficiency and
        Growth
      </h2>
    </div>
  );
};
