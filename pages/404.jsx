import React from "react";
import Link from "next/link";

export default function Custom404() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-gray-500 text-lg">This page could not be found.</p>
      <Link href="/" className="text-sm underline link-hover">
        Return home
      </Link>
    </section>
  );
}
