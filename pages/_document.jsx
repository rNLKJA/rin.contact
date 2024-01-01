// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import SEOHead from "@/components/specific/SEOHead"; // Import the component

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <SEOHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
