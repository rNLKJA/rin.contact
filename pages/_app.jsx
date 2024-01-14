"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import Container from "@mui/material/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextSEO } from "../SEO/NextSEO";
import Head from "next/head";

import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <Container className="flex flex-col min-h-screen justify-between">
      <Head>
        {" "}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {NextSEO()}

      <Header />

      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          <Component {...pageProps} />
        </AnimatePresence>
      </QueryClientProvider>

      <Footer />
    </Container>
  );
}

export default MyApp;
