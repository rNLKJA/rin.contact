"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Container from "@mui/material/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextSEO } from "../SEO/NextSEO";
import { LoadingBarComponent } from "../components/ui/loading/LoadingBarComponent";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <Container className="flex flex-col min-h-screen justify-between">
      {NextSEO()}

      <Header />

      {Body(isLoading, Component, pageProps)}

      <Footer />
    </Container>
  );
}

export default MyApp;

function Body(isLoading, Component, pageProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingBarComponent isLoading={isLoading} />
        ) : (
          <Component {...pageProps} />
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}
