import React from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "@/components/layout/Header";
import HeroHeaderSection from "@/components/layout/index/Hero-Header";
import CtaSection from "@/components/layout/index/CTA";
import ContactSection from "@/components/layout/index/Contact";
import AboutSection from "@/components/layout/index/About";
import Footer from "@/components/layout/Footer";
import GallerySection from "@/components/layout/index/Gallery";

import "../styles/globals.css";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth={isMobile ? "xs" : "lg"}>
      <Header />
      <br />

      <Fade triggerOnce duration={1500} direction="left">
        <HeroHeaderSection />
      </Fade>
      <br />

      <Fade triggerOnce duration={1500} direction="right">
        <GallerySection />
      </Fade>
      <br />

      <Fade triggerOnce duration={1500} direction="left">
        <AboutSection />
      </Fade>
      <br />

      <Fade triggerOnce duration={1500} direction="up">
        <CtaSection />
      </Fade>
      <br />

      <Fade triggerOnce duration={1500} direction="right">
        <ContactSection />
      </Fade>
      <br />

      <Footer />
    </Container>
  );
}
