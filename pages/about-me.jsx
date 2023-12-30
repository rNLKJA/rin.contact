import React from "react";
import Biography from "@/components/layout/about-me/biography";
import PageTransition from "../components/PageTransition";
import "../styles/globals.css";

export default function Home() {
  return (
    <PageTransition>
      <Biography />
    </PageTransition>
  );
}
