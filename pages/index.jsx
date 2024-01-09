import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import HeroHeaderSection from "@/components/layout/index/Hero-Header";
import CtaSection from "@/components/layout/index/CTA";
import ContactSection from "@/components/layout/index/Contact";
import AboutSection from "@/components/layout/index/About";
import GallerySection from "@/components/layout/index/Gallery";
import PageTransition from "../components/PageTransition";

import { Fade } from "react-awesome-reveal";

const HorizontalScrollContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow-x: auto;
  scroll-snap-type: x mandatory; /* Enable snap scrolling */
  @media (max-width: 1024px) {
    /* lg breakpoint */
    overflow-x: hidden;
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: none;
  width: 100vw;
  max-width: 1150px; /* Fixed maximum width */
  height: 100vh;
  display: flex; /* Center content within section */
  justify-content: center;
  align-items: center;
  scroll-snap-align: center; // Ensure sections align to the center
  @media (max-width: 768) {
    /* lg breakpoint */
    width: 100%; /* Full width for smaller screens */
  }
`;

const ScrollDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "black" : "lightgrey")};
  margin: 0 5px;
  cursor: pointer;
`;

const ScrollDotContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const ScrollArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10; // Ensure it's clickable and above other content
  ${({ isLeft }) => (isLeft ? "left: 10px;" : "right: 10px;")}
`;

const Home = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(undefined);
  const sectionsRef = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    <HeroHeaderSection />,
    <AboutSection />,
    <GallerySection />,
    <CtaSection />,
    <ContactSection />,
  ];

  const renderSections = () => {
    return sections.map((SectionComponent, index) => (
      <Section
        key={`section-${index}`}
        ref={(el) => (sectionsRef.current[index] = el)}
      >
        {SectionComponent}
      </Section>
    ));
  };

  const scrollToSection = (index) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 1024);
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let newCurrentSection = currentSection;

      for (let i = 0; i < sectionsRef.current.length; i++) {
        const section = sectionsRef.current[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            newCurrentSection = i;
            break;
          }
        }
      }

      if (newCurrentSection !== currentSection) {
        setCurrentSection(newCurrentSection);
      }
    };

    if (isLargeScreen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (isLargeScreen) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentSection, isLargeScreen]);

  const renderLargeScreenLayout = () => (
    <PageTransition>
      <HorizontalScrollContainer>{renderSections()}</HorizontalScrollContainer>
      <ScrollDotContainer>
        {sections.map((_, index) => (
          <ScrollDot
            key={index}
            isActive={currentSection === index}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </ScrollDotContainer>
    </PageTransition>
  );

  const renderSmallScreenLayout = () => (
    <PageTransition>
      <Fade triggerOnce duration={1500} direction="left">
        <HeroHeaderSection />
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
    </PageTransition>
  );

  return isLargeScreen !== undefined
    ? isLargeScreen
      ? renderLargeScreenLayout()
      : renderSmallScreenLayout()
    : null;
};

export default Home;
