import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import { bitcount, dmSans, playfair } from "@/lib/fonts";

import "../public/styles/globals.css";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
// Footer is below the fold — defer to improve LCP on mobile
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

function MyApp({ Component, pageProps }) {
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
