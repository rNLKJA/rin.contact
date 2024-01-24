"use client";
import React from "react";
import Image from "next/image";

export function ProjectBrowsingWelcomeSection() {
  return (
    <div>
      <h1 className="text-xl font-bold">The Cat&apos;s Meow Projects</h1>

      <div className="grid md:grid-cols-2 gap-4 py-10 px-4 items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/images/project/working-cat.svg"
            width={280}
            height={280}
            layout="fixed"
            style={{ borderRadius: 20 }}
            quality={10}
            alt="working cat - its me :)"
          />
        </div>
        <p className="leading-10">
          🐾 Welcome to our cozy corner of creativity! 🎨 Here, each project is
          a paw-some adventure in innovation. From the initial sketch to the
          final touch, we pour love and imagination into every detail. Explore
          our gallery to see how we&apos;re making the digital world purr-fect,
          one pixel at a time!
        </p>
      </div>
    </div>
  );
}
