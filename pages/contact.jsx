import React from "react";
import "../styles/globals.css";

import { Zoom } from "react-awesome-reveal";
import { ContactForm } from "../components/pages/contact/ContactForm";

export default function ContactPage() {
  return (
    <Zoom triggerOnce cascade duration={1000} damping={0.5}>
      <ContactForm />;
    </Zoom>
  );
}
