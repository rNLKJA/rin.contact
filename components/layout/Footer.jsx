import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import NavigationIcon from "@mui/icons-material/Navigation";
import Button from "@mui/material/Button";
import { CiCoffeeBean, CiCalendar } from "react-icons/ci";
import { SiVirginmedia } from "react-icons/si";

const Footer = () => {
  const year = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCoffeeCalendlyClick = (e) => {
    e.preventDefault();

    window.Calendly.initPopupWidget({
      url: "https://calendly.com/huangsunchuangyu/coffee-chat",
    });
  };

  const handleBusinessCalendlyClick = (e) => {
    e.preventDefault();
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/huangsunchuangyu/coffee-chat",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-10 ">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10 items-center text-center ">
        <div className="md:col-span-2">
          <div className="inline-block">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={150}
              quality={100}
              layout="fixed"
            />
          </div>

          <br />
        </div>

        <div className="text-left flex flex-col h-full gap-2">
          <p className="font-bold text-lg text-pretty">Schedule </p>
          <div className="flex flex-start space-x-4 items-center p-1">
            <CiCoffeeBean className="text-xl" />
            <p
              onClick={handleCoffeeCalendlyClick}
              className="text-sm link-hover"
            >
              Coffee Chat?
            </p>
          </div>
          <div className="flex space-x-4 items-center p-1">
            <CiCalendar className="text-xl" />
            <p
              onClick={handleBusinessCalendlyClick}
              className="text-sm link-hover"
            >
              Business Talk?
            </p>
          </div>
        </div>

        <div className="text-left flex flex-col h-full gap-2">
          <p className="font-bold text-lg">Follow me</p>

          <div className="flex flex-col tablet:flex-wrap justify-center">
            <FooterIconLink
              IconComponent={SiVirginmedia}
              href="https://www.xiaohongshu.com/user/profile/5ddb3cf2000000000100bcab"
              content="Xiaohongshu"
              styleClasses="p-3 text-2xl text-lg "
            />
            <FooterIconLink
              href="https://www.instagram.com/chuangyu_hscy/"
              IconComponent={FaInstagram}
              content="Instagram"
              styleClasses="p-3 text-2xl text-lg "
            />
            <FooterIconLink
              href="https://www.linkedin.com/in/sunchuangyuhuang/"
              IconComponent={FaLinkedin}
              content="LinkedIn"
              styleClasses="p-3 text-2xl text-lg "
            />
            <FooterIconLink
              href="https://github.com/rNLKJA"
              IconComponent={FiGithub}
              content="GitHub"
              styleClasses="p-3 text-2xl text-lg "
            />
          </div>
        </div>
      </div>
      <br />
      <p className="text-wrap text-pretty">
        Fueling the future with purr-cision and cutting-edge data science
        technology, I enthusiastically craft a trail of endless pawssibilities,
        unleashing extraordinary potential with each innovative leap.
      </p>

      <hr className="my-4" />

      <div className="flex flex-col items-center justify-center md:flex-col lg:flex-row lg:justify-between">
        <p>
          © 2020-{year}{" "}
          <Link className="link-hover mx-2" href="/">
            rNLKJA
          </Link>
          . All rights reserved.
        </p>
        <div className="flex space-x-4 justify-center ">
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>

          <FooterLink href="/terms-of-service">Terms of Services</FooterLink>
        </div>
      </div>

      {typeof window !== "undefined" &&
        window.innerWidth > 1100 &&
        showScrollButton && (
          <Button
            className="flex flex-start"
            style={{
              position: "fixed",
              bottom: "150px",
              right: "20px",
              backgroundColor: isHovered ? "black" : "white",
              color: isHovered ? "white" : "black",
              transition: "all 0.5s ease",
              borderRadius: "20px",
              padding: "10px 20px",
              width: isHovered ? "100px" : "60px",

              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={scrollToTop}
          >
            {" "}
            <Fade duration={1000} direction="right">
              <NavigationIcon />
              {isHovered && <p style={{ marginLeft: "10px" }}>Top</p>}{" "}
            </Fade>
          </Button>
        )}
    </footer>
  );
};

export default Footer;

function FooterLink({ href, children }) {
  return (
    <Link className="link-hover" href={href}>
      {children}
    </Link>
  );
}

function FooterIconLink({ href, IconComponent, content }) {
  return (
    <div className="flex space-x-4 items-center p-1">
      <IconComponent className="text-xl" />
      <a
        className="link-hover text-sm link-hover"
        href={href}
        alt={content}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    </div>
  );
}
