import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>404 — Page Not Found · Rin Huang</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-8 px-6">
        <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-80 select-none" aria-hidden="true">
          <Image
            src="/images/404.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-xs tracking-widest uppercase text-[#FF3C3C]">404</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-[#7A7A7A] max-w-xs leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="border border-black px-6 py-2.5 text-xs tracking-widest uppercase
                     hover:bg-black hover:text-white transition-colors duration-200"
        >
          Return home
        </Link>
      </section>
    </>
  );
}
