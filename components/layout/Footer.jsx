import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="pt-10 pb-10 pl-4 pr-4 ">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10 items-center text-center ">
        <div className="md:col-span-2">
          <div className="inline-block">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={200}
              height={200}
              quality={75}
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

        <div className="tablet:col-span-2 laptop: flex-col text-left">
          <h4>Follow me</h4>
          <br />
          <div className="flex flex-col md:flex-row flex-start gap-8 justify-center md:justify-start">
            {/* External links can remain as <a> tags */}
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
          © 2024 {/* Correct usage of Link component for internal navigation */}
          <Link href="/">rNLKJA</Link>. All rights reserved.
        </p>
        <div className="flex space-x-4 justify-center mt-4 md:mt-0">
          {/* Internal navigation should use Link component */}
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
