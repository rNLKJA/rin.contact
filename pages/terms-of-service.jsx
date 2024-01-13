import React from "react";
import TermsComponent from "@/components/layout/index/Tos";
import PageTransition from "../components/framer-motion/PageTransition";

const TermsOfService = () => {
  return (
    <PageTransition>
      <TermsComponent />
    </PageTransition>
  );
};

export default TermsOfService;
