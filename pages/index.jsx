import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import HeroHeaderSection from "@/components/pages/homepage/HeroSection";
import CtaSection from "@/components/pages/homepage/CTA";
import ContactSection from "@/components/pages/homepage/Contact";
import AboutSection from "@/components/pages/homepage/About";
import GallerySection from "@/components/pages/homepage/Gallery";

const Home = () => {
  return (
    <div>
      <HeroHeaderSection />,
      <AboutSection />,
      <GallerySection />,
      <CtaSection />,
      <ContactSection />,
    </div>
  );
};

export default Home;
