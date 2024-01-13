"use client";
import React from "react";
import Image from "next/image";

export function ErrorPageComponent() {
  return (
    <div className="flex md:flex-row w-full justify-center items-center gap-10">
      <div>
        <Image src="/images/404.png" alt="404.png" width={250} height={250} />
      </div>
      <div className="flex flex-col text-center gap-2">
        <h1>404</h1>
        <p>Oops! The page you're looking for was not found.</p>
      </div>
    </div>
  );
}
