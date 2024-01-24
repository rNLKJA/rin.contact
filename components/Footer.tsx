"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { MiddleTextSection } from "./footer/MiddleTextSection";
import { FooterLogo } from "./footer/FooterLogo";
import { FollowMeLinksContainer } from "./footer/FollowMeLinksContainer";
import { ScheduleSection } from "./footer/ScheduleSection";

declare global {
  interface Window {
    Calendly: any;
  }
}

const Footer = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCoffeeCalendlyClick = (event: React.MouseEvent) => {
    event.preventDefault();

    window.Calendly.initPopupWidget({
      url: "https://calendly.com/huangsunchuangyu/coffee-chat",
    });
  };

  const handleBusinessCalendlyClick = (event: React.MouseEvent) => {
    event.preventDefault();
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/huangsunchuangyu/coffee-chat",
    });
  };

  return (
    <footer className="py-10">
      <div className="flex-col mx-auto w-full max-w-screen-2xl px-10">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-10 items-center text-center">
          {FooterLogo}

          {ScheduleSection(
            handleCoffeeCalendlyClick,
            handleBusinessCalendlyClick,
          )}

          {FollowMeLinksContainer}
        </div>
        <br />
        {MiddleTextSection}
        <br />
        <hr className="my-4" />

        <div className="flex flex-col items-center justify-center md:flex-col lg:flex-row lg:justify-between">
          <p>
            Copy Right © 2020-{year}{" "}
            <Link className="link-hover mx-2" href="/">
              rNLKJA
            </Link>
            . All rights reserved.
          </p>
          <div className="flex space-x-4 justify-center ">
            <Link href="/doc/privacy-policy">Privacy Policy</Link>

            <Link href="/doc/terms-of-service">Terms of Services</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
