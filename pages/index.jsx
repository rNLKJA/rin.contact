import React from "react";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "@/components/layout/Header";
import HeroHeaderSection from "@/components/layout/index/Hero-Header";
import CtaSection from "@/components/layout/index/CTA";
import ContactSection from "@/components/layout/index/Contact";
import AboutSection from "@/components/layout/index/About";
import FeaturedTestimonials from "@/components/layout/index/textmonials";
import Footer from "@/components/layout/Footer";

import "../styles/globals.css";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth={isMobile ? "xs" : "lg"}>
      <Header />
      <br />
      <HeroHeaderSection />
      <br />
      {/* 
      
      <GallerySection />
      <br />
      
       */}
      <AboutSection />
      <br />
      {/* <FeaturedTestimonials />
      <br /> */}
      <CtaSection />
      <br />
      <ContactSection />
      <br />
      <Footer />
    </Container>
  );
}
