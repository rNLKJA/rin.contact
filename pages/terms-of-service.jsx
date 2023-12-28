import React from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TermsComponent from "@/components/layout/index/Tos";

import "../styles/globals.css";

// Functional Component
const TermsOfService = () => {
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
      <TermsComponent />

      <br />
      <Footer />
    </Container>
  );
};

export default TermsOfService;
