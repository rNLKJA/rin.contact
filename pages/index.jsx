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

const ScrollHint = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: rgba(0, 0, 0);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px #f8f8f8;
  font-size: 14px;
`;

const Home = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(undefined);
  const sectionsRef = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    // 延时隐藏滚动提示
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 10000); // 5秒后隐藏提示

    return () => clearTimeout(timer);
  }, []);

  const sections = [
    <HeroHeaderSection />,
    <AboutSection />,
    <GallerySection />,
    <CtaSection />,
    <ContactSection />,
  ];

  const infiniteSections = [
    ...sections.slice(-1),
    ...sections,
    ...sections.slice(0, 1),
  ];

  const renderSections = () => {
    return infiniteSections.map((SectionComponent, index) => (
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
      const scrollPosition = window.scrollY + window.innerHeight / 2;
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
        setCurrentSection(newCurrentSection % sections.length);
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
  }, [currentSection, isLargeScreen, sections.length]);

  const renderLargeScreenLayout = () => (
    <PageTransition>
      <HorizontalScrollContainer>{renderSections()}</HorizontalScrollContainer>
      {showScrollHint && (
        <ScrollHint>Scroll horizontally to see more &rarr;</ScrollHint>
      )}
    </PageTransition>
  );

  const renderSmallScreenLayout = () => (
    <PageTransition>
      <Fade triggerOnce duration={1500} direction="left">
        <div className="my-20">
          <HeroHeaderSection />
        </div>
      </Fade>
      <br />
      <Fade triggerOnce duration={1500} direction="left">
        <div className="my-20">
          <AboutSection />
        </div>
      </Fade>
      <br />
      <Fade triggerOnce duration={1500} direction="up">
        <div className="my-20">
          <CtaSection />
        </div>
      </Fade>
      <br />
      <Fade triggerOnce duration={1500} direction="right">
        <div className="my-20">
          <ContactSection />
        </div>
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
