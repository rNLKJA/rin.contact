import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />

          {/* SEO & Metadata */}
          <meta charSet="utf-8" />

          <link rel="canonical" href="https://rin.contact" />
          <link
            rel="alternate"
            hrefLang="x-default"
            href="https://rin.contact/"
          />
          <link rel="alternate" hrefLang="x" href="https://x.rin.contact/" />

          {/* External CSS and Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@100..900&display=swap"
            rel="stylesheet"
          />

          {/* Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "http://schema.org",
                "@type": "Person",
                name: "Sunchuangyu (Rin) Huang",
                url: "https://rin.contact",
                sameAs: [
                  "https://github.com/rNLKJA",
                  "https://linkedin.com/in/sunchuangyuhuang",
                  "https://www.instagram.com/chuangyu_hscy/",
                ],
                jobTitle: "Senior Data Analyst",
                worksFor: {
                  "@type": "Organization",
                  name: "South Australia Police",
                },
                alumniOf: "University of Melbourne",
                description:
                  "Sunchuangyu (Rin) Huang — Senior Data Analyst at SAPOL, Research Software Engineer, and Full-Stack Developer specialising in data science, strategic intelligence, and continuous improvement.",
              }),
            }}
          />

          {/* Google Analytics — using next/script to satisfy the ESLint rule */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-7W1VX9PH20"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7W1VX9PH20');
            `}
          </Script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
