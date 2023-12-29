import React from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ProjectsBrowsing from "../../components/layout/project/Browsing";
import { Fade } from "react-awesome-reveal";

import "../../styles/globals.css";

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

      <ProjectsBrowsing />

      <Footer />
    </Container>
  );
}
