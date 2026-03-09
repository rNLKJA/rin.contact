import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { bitcount, dmSans, playfair } from "@/lib/fonts";

import "../public/styles/globals.css";

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
