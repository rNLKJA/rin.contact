"use client";
import React from "react";
import Image from "next/image";

export const FooterLogo = (
  <div className="md:col-span-2">
    <div className="inline-block">
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={150}
        height={150}
        quality={100}
        layout="fixed"
      />
    </div>

    <br />
  </div>
);
