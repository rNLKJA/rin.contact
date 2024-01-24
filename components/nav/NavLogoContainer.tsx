import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogoContainer } from "./LogoContainer";

export const NavLogoContainer: React.FC = () => {
  return (
    <LogoContainer>
      <Link
        href="/"
        className="flex flex-row items-center cursor-pointer gap-2"
      >
        <Image
          src="/images/logo.svg"
          alt="Pawibly Rin Logo"
          width={50}
          height={50}
        />
        <span className="font-bold text-lg text-gradient_blue-purple ">
          Pawibly Rin
        </span>
      </Link>
    </LogoContainer>
  );
};
