import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import { bitcount, dmSans, playfair } from "@/lib/fonts";

import "../public/styles/globals.css";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // ── Console easter egg — fires once per session ──────────────────────────
    if (typeof window !== "undefined" && !window.__rinConsoleShown) {
      window.__rinConsoleShown = true;

      const s = (color, extra = "") =>
        `color:${color};font-family:'Courier New',monospace;font-size:11px;${extra}`;

      console.log(
        "%c\n" +
        "%c  ██████╗ ██╗███╗   ██╗  \n" +
        "%c  ██╔══██╗██║████╗  ██║  \n" +
        "%c  ██████╔╝██║██╔██╗ ██║  \n" +
        "%c  ██╔══██╗██║██║╚██╗██║  \n" +
        "%c  ██║  ██║██║██║ ╚████║  \n" +
        "%c  ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝  \n" +
        "%c\n",
        s("#fff"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#fff"),
      );

      console.log(
        "%cHello, developer. You opened the console.\n\n" +
        "%cSince you're here, you're probably the kind of person Rin would enjoy working with.\n\n" +
        "%cStack:    %cNext.js 14 · Tailwind CSS · EmailJS · Vercel\n" +
        "%cDesign:   %cNothing OS aesthetic — stark, minimal, monochromatic\n" +
        "%cAuthor:   %cRin Huang  ·  rin.contact\n\n" +
        "%cHidden routes:\n" +
        "%c  /resume   →  interactive CLI\n" +
        "%c  /matrix   →  you'll know it when you see it\n" +
        "%c  /coffee   →  you know why\n" +
        "%c  /secret   →  morse code reveal\n" +
        "%c  /card     →  digital business card\n" +
        "%c  ↑↑↓↓←→←→BA  →  try it on the homepage\n\n" +
        "%cAPIs:\n" +
        "%c  GET /api/rin.json   →  structured profile\n" +
        "%c  GET /api/fortune    →  random wisdom\n\n" +
        "%cWant to hire Rin?  →  rin.contact/hire-me\n",
        s("#7A7A7A"),
        s("#CCCCCC"),
        s("#7A7A7A"), s("#CCCCCC"),
        s("#7A7A7A"), s("#CCCCCC"),
        s("#7A7A7A"), s("#CCCCCC"),
        s("#7A7A7A"),
        s("#3D3D3D"),s("#3D3D3D"),s("#3D3D3D"),s("#3D3D3D"),s("#3D3D3D"),s("#3D3D3D"),
        s("#7A7A7A"),
        s("#3D3D3D"),s("#3D3D3D"),
        s("#FF3C3C","font-weight:bold"),
      );
    }
  }, []);

  return (
    <div className={`${bitcount.variable} ${dmSans.variable} ${playfair.variable} flex flex-col min-h-screen`}>
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
