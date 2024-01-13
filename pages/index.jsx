import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import HeroHeaderSection from "@/components/layout/index/Hero-Header";
import CtaSection from "@/components/layout/index/CTA";
import ContactSection from "@/components/layout/index/Contact";
import AboutSection from "@/components/layout/index/About";
import GallerySection from "@/components/layout/index/Gallery";

import { Fade } from "react-awesome-reveal";

const Home = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(undefined);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickOnSection = (e, index) => {
    const rect = e.target.getBoundingClientRect();
    const isLeftHalf = e.clientX < rect.left + rect.width / 2;

    if (isLeftHalf) {
      setCurrentSection(index === 0 ? 4 : index - 1);
    } else {
      setCurrentSection(index === 4 ? 0 : index + 1);
    }
  };
  const handleMouseMoveOnSection = (e) => {
    const rect = e.target.getBoundingClientRect();
    const isLeftHalf = e.clientX < rect.left + rect.width / 2;
    e.target.style.cursor = isLeftHalf ? "👈" : "👉";
  };

  const renderSections = () => {
    const sections = [
      <HeroHeaderSection />,
      <AboutSection />,
      <GallerySection />,
      <CtaSection />,
      <ContactSection />,
    ];

    return sections.map((SectionComponent, index) => (
      <Section
        key={`section-${index}`}
        isActive={currentSection === index}
        onClick={(e) => handleClickOnSection(e, index)}
        onMouseMove={(e) => handleMouseMoveOnSection(e)}
      >
        {SectionComponent}
      </Section>
    ));
  };
  const renderDotNavigation = () => {
    return (
      <ScrollDotContainer>
        {new Array(5).fill(null).map((_, index) => (
          <ScrollDot
            key={`dot-${index}`}
            isActive={currentSection === index}
            onClick={() => setCurrentSection(index)}
          />
        ))}
      </ScrollDotContainer>
    );
  };

  const renderLargeScreenLayout = () => (
    <div>
      <HorizontalScrollContainer>{renderSections()}</HorizontalScrollContainer>

      {renderDotNavigation()}
    </div>
  );

  const renderSmallScreenLayout = () => (
    <div>
      <Fade triggerOnce duration={1500} direction="left">
        <div className="my-20">
          <HeroHeaderSection />
        </div>
      </Fade>
      <br />
      <Fade triggerOnce duration={1500} direction="left">
        <div className="my-20">
          <GallerySection />
        </div>
      </Fade>
      <br />
      <Fade triggerOnce duration={1500} direction="up">
        <div className="my-20">
          {" "}
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
    </div>
  );

  return isLargeScreen !== undefined
    ? isLargeScreen
      ? renderLargeScreenLayout()
      : renderSmallScreenLayout()
    : null;
};

export default Home;

const Section = styled.div`
  flex: none;
  width: 100vw;
  max-width: 1150px;
  height: 100vh;
  display: ${({ isActive }) => (isActive ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: url("/ui/left_index.png") 16 16, auto;

  &:hover {
    cursor: url("/ui/right_index.png") 16 16, auto;
  }
`;

const HorizontalScrollContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
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
