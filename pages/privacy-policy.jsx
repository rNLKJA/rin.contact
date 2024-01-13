import React from "react";
import PrivacyContent from "@/components/layout/index/PrivacyContent";
import PageTransition from "../components/framer-motion/PageTransition";
import "../styles/globals.css";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <PrivacyContent />
    </PageTransition>
  );
};

export default PrivacyPolicy;
