import React from "react";
import HeroHeaderSection from "@/components/pages/homepage/HeroSection";
import AboutSection from "@/components/pages/homepage/About";
import GallerySection from "@/components/pages/homepage/Gallery";
import CtaSection from "@/components/pages/homepage/CTA";
import ContactSection from "@/components/pages/homepage/Contact";

const Home = () => {
  return (
    <React.Fragment>
      <HeroHeaderSection />
      <br />
      <AboutSection />
      <br />
      <GallerySection />
      <br />
      <CtaSection />
      <br />
      <ContactSection />
    </React.Fragment>
  );
};

export default Home;
