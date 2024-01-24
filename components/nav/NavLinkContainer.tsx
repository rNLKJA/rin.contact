import React from "react";
import Link from "next/link";
import { LinkContainer } from "./LinkContainer";
import { navLinks } from "./navLinks";

export const NavLinkContainer: React.FC = () => (
  <LinkContainer className="text-lg lg:items-center flex flex-col lg:flex-row gap-8 font-normal">
    {navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="hover:underline flex flex-row gap-4 items-center cursor-pointer"
      >
        {link.icon}
        <span className="font-normal">{link.label}</span>
      </Link>
    ))}
  </LinkContainer>
);
