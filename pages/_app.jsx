import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "../public/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
