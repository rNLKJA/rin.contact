import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";
import Image from "next/legacy/image";
import { Fade } from "react-awesome-reveal";
import NavigationIcon from "@mui/icons-material/Navigation";
import Button from "@mui/material/Button";

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="pt-10 pb-10 ">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10 items-center text-center ">
        <div className="md:col-span-2">
          <div className="inline-block">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={200}
              height={200}
              quality={25}
              layout="fixed"
              priority
            />
          </div>
          <p className="text-pretty">
            Fueling the future with purr-cision and cutting-edge data science
            technology, I enthusiastically craft a trail of endless
            pawssibilities, unleashing extraordinary potential with each
            innovative leap.
          </p>
          <br />
        </div>

        <Fade triggerOnce direction="right" duration={1500}>
          <div className="tablet:col-span-2 laptop: flex-col text-left">
            <h4>Follow me</h4>
            <br />
            <div className="flex flex-col md:flex-row flex-start gap-8 justify-center md:justify-start">
              <div className="flex items-center gap-3">
                <Image
                  src="/footer/redbook.svg"
                  width={20}
                  height={20}
                  alt="litteredbook"
                  layout="fixed"
                />
                <a
                  className="link-hover"
                  href="https://www.xiaohongshu.com/user/profile/5ddb3cf2000000000100bcab"
                  alt="little red book"
                  target="_blank"
                >
                  Xiaohongshu
                </a>
              </div>
              <FooterIconLink
                href="https://www.instagram.com/chuangyu_hscy/"
                IconComponent={FaInstagram}
                content="Instagram"
              />
              <FooterIconLink
                href="https://www.linkedin.com/in/sunchuangyuhuang/"
                IconComponent={FaLinkedin}
                content="LinkedIn"
              />
              <FooterIconLink
                href="https://github.com/rNLKJA"
                IconComponent={FiGithub}
                content="GitHub"
              />
            </div>
          </div>
        </Fade>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col md:flex-row justify-between p-4">
        <p>
          © {year}{" "}
          <Link className="link-hover" href="/">
            rNLKJA
          </Link>
          . All rights reserved.
        </p>
        <div className="flex space-x-4 justify-center mt-4 md:mt-0">
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
              bottom: "20px",
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
    <div className="flex items-center gap-3">
      <IconComponent />
      <a className="link-hover" href={href} alt={content} target="_blank">
        {content}
      </a>
    </div>
  );
}
