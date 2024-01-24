import React from "react";
import Narbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Narbar />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default layout;
