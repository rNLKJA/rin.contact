import React from "react";

import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="pt-10 pb-10 pt-10 pb-10 pl-4 pr-4 ">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10 items-center text-center ">
        <div className="md:col-span-2">
          <div className="inline-block">
            <img src="/logo.svg" alt="Logo" style={{ height: "200px" }} />
          </div>
          <p className="text-pretty">
            Fueling the future with purr-cision and cutting-edge data science
            technology, I enthusiastically craft a trail of endless
            pawssibilities, unleashing extraordinary potential with each
            innovative leap.
          </p>
          <br />
        </div>

        <div className="tablet:col-span-2 laptop: flex-col text-left">
          <h4>Follow me</h4>
          <br />
          <div className="flex flex-col md:flex-row flex-start gap-8 justify-center md:justify-start">
            <div className="flex items-center gap-3">
              <BsTwitterX />
              <a href="https://twitter.com/rNLKJA" alt="Twitter">
                Twitter
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaInstagram />
              <a
                href="https://www.instagram.com/chuangyu_hscy/"
                alt="Instagram"
              >
                Instagram
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaLinkedin />
              <a
                href="https://www.linkedin.com/in/sunchuangyuhuang/"
                alt="LinkedIn"
              >
                LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FiGithub />
              <a href="https://github.com/rNLKJA" alt="GitHub">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col md:flex-row justify-between p-4">
        <p>
          © 2024 <a href="/">rNLKJA</a>. All rights reserved.
        </p>
        <div className="flex space-x-4 justify-center mt-4 md:mt-0">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
