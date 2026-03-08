import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 mt-auto">
      <hr className="mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="rNLKJA logo"
            width={36}
            height={36}
            quality={100}
          />
          <span className="font-semibold text-sm">rNLKJA</span>
        </div>

        <div className="flex gap-5 text-lg">
          <a
            href="https://www.linkedin.com/in/sunchuangyuhuang/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="link-hover"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/rNLKJA"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="link-hover"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.instagram.com/chuangyu_hscy/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="link-hover"
          >
            <FaInstagram />
          </a>
        </div>

        <p className="text-sm text-gray-500">
          © 2020–{year}{" "}
          <Link href="/" className="link-hover">
            rNLKJA
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
