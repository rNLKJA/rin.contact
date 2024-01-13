import Document, { Html, Main, NextScript } from "next/document";
import { MetaTags } from "../SEO/MetaTags";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {MetaTags()}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
