"use client";

import React, { useEffect, useRef, useState } from "react";
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

const ScrollDotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

const ScrollDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? "black" : "lightgrey")};
  margin: 0 5px;
  cursor: pointer;
`;

export default function Home() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
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
    // Infinite loop of sections
    let renderedSections = [];
    for (let i = 0; i < 10; i++) {
      // Repeat sections 10 times (adjust as needed)
      renderedSections = renderedSections.concat(
        sections.map((SectionComponent, index) => (
          <Section key={`section-${i}-${index}`}>{SectionComponent}</Section>
        )),
      );
    }
    return renderedSections;
  };

  useEffect(() => {
    // Define a function to update the screen size state
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call the function to set the initial state
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the center of the screen
      const centerOfScreen = window.scrollX + window.innerWidth / 2;
      // Find the section that should be centered
      const current = sectionsRef.current.findIndex(
        (section) =>
          section &&
          section.offsetLeft <= centerOfScreen &&
          section.offsetLeft + section.clientWidth >= centerOfScreen,
      );
      if (current !== -1) {
        setCurrentSection(current % sections.length); // Adjust for repeated sections
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (index) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  // Render for large screens
  const renderLargeScreenLayout = () => (
    <PageTransition>
      <HorizontalScrollContainer>{renderSections()}</HorizontalScrollContainer>
      <ScrollDotContainer className="hidden lg:flex">
        {sectionsRef.current.map((_, index) => (
          <ScrollDot
            key={index}
            isActive={currentSection === index}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </ScrollDotContainer>
    </PageTransition>
  );

  // Render for small and medium screens
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

  return isLargeScreen ? renderLargeScreenLayout() : renderSmallScreenLayout();
}
