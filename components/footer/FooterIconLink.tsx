"use client";
import React from "react";

interface FooterIconLinkProps {
  href: string;
  IconComponent: React.ElementType;
  content: string;
}
export function FooterIconLink({
  href,
  IconComponent,
  content,
}: FooterIconLinkProps) {
  return (
    <div className="flex space-x-4 items-center p-1">
      <IconComponent className="text-xl" />
      <a
        className="link-hover text-sm link-hover"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    </div>
  );
}
