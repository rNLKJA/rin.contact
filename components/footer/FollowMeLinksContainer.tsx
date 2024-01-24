"use client";
import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SiVirginmedia } from "react-icons/si";
import { FooterIconLink } from "./FooterIconLink";

export const FollowMeLinksContainer = (
  <div className="text-left flex flex-col h-full gap-2">
    <p className="font-bold text-lg text-gradient_blue-purple">Follow me</p>

    <div className="flex flex-col tablet:flex-wrap justify-center gap-2">
      <FooterIconLink
        IconComponent={SiVirginmedia}
        href="https://www.xiaohongshu.com/user/profile/5ddb3cf2000000000100bcab"
        content="Xiaohongshu"
      />
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
);
