import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] mt-auto">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white flex items-center justify-center w-9 h-9 flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="rNLKJA logo"
                width={28}
                height={28}
                quality={100}
              />
            </div>
            <span className="font-semibold text-sm text-white">rNLKJA</span>
          </div>

          <div className="flex gap-5 text-lg">
            <a
              href="https://www.linkedin.com/in/sunchuangyuhuang/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-[#7A7A7A] hover:text-white transition-colors duration-200"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/rNLKJA"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-[#7A7A7A] hover:text-white transition-colors duration-200"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.instagram.com/chuangyu_hscy/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-[#7A7A7A] hover:text-white transition-colors duration-200"
            >
              <FaInstagram />
            </a>
          </div>

          <p className="text-sm text-[#7A7A7A]">
            © 2020–{year}{" "}
            <Link href="/" className="text-[#7A7A7A] hover:text-white transition-colors duration-200">
              rNLKJA
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
