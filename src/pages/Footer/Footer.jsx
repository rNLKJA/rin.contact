import React from "react";
import { BiCopyright } from "react-icons/bi";
import "./Footer.css";
import {
  RiLinkedinFill,
  RiInstagramLine,
  RiMessengerLine,
} from "react-icons/ri";
import { RxDiscordLogo } from "react-icons/rx";
import { VscGithubAlt } from "react-icons/vsc";
import Fab from "@mui/material/Fab";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex justify-between main-component-footer items-center">
      <p className="flex flex-start text-xm justify-center items-center">
        Copyright <BiCopyright size={18} /> 2022 S Huang
      </p>

      <div className="flex gap-2">
        <a href="https://www.linkedin.com/in/chuangyu-hscy">
          <Fab size="small" color="primary">
            <RiLinkedinFill />
          </Fab>
        </a>

        <a href="https://www.instagram.com/chuangyu_hscy/">
          <Fab size="small" color="primary">
            <RiInstagramLine />
          </Fab>
        </a>

        <a href="https://www.facebook.com/sunchuangyu.huang">
          <Fab size="small" color="primary">
            <RiMessengerLine />
          </Fab>
        </a>

        <a href="https://discord.gg/7YtmTTzVEf">
          <Fab size="small" color="primary">
            <RxDiscordLogo />
          </Fab>
        </a>

        <a href="https://github.com/rNLKJA">
          <Fab size="small" color="primary">
            <VscGithubAlt />
          </Fab>
        </a>
      </div>
    </div>
  );
}

export default Footer;
