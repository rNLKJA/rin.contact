import Document, { Head, Html, Main, NextScript } from "next/document";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://rin.contact/#person",
  name: "Sunchuangyu (Rin) Huang",
  givenName: "Sunchuangyu",
  additionalName: "Rin",
  familyName: "Huang",
  url: "https://rin.contact",
  image: "https://rin.contact/images/meta-image.png",
  email: "huang@rin.contact",
  gender: "Male",
  nationality: { "@type": "Country", name: "Australia" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressRegion: "SA",
    addressCountry: "AU",
  },
  jobTitle: "Senior Data Analyst",
  worksFor: {
    "@type": "Organization",
    name: "South Australia Police",
    url: "https://www.police.sa.gov.au",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Melbourne",
      url: "https://www.unimelb.edu.au",
    },
  ],
  knowsAbout: [
    "Data Science",
    "Statistical Analysis",
    "Strategic Intelligence",
    "Python",
    "Machine Learning",
    "Full-Stack Web Development",
    "Mobile Development",
    "Cloud Infrastructure",
    "Government Analytics",
    "Research Software Engineering",
  ],
  sameAs: [
    "https://github.com/rNLKJA",
    "https://linkedin.com/in/sunchuangyuhuang",
    "https://www.instagram.com/chuangyu_hscy/",
  ],
  description:
    "Sunchuangyu (Rin) Huang is a Senior Data Analyst at South Australia Police, Research Software Engineer, and Full-Stack Developer specialising in data science, strategic intelligence, and continuous improvement.",
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://rin.contact/#website",
  url: "https://rin.contact",
  name: "Rin Huang — Portfolio",
  description:
    "Personal portfolio of Sunchuangyu (Rin) Huang — Senior Data Analyst, Research Software Engineer, and Full-Stack Developer based in Adelaide, Australia.",
  author: { "@id": "https://rin.contact/#person" },
  inLanguage: "en-AU",
  copyrightYear: 2025,
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-AU" suppressHydrationWarning>
        <Head>
          {/* ── Character set & viewport ── */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

          {/* ── Theme ── */}
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="color-scheme" content="light" />

          {/* ── Authorship ── */}
          <meta name="author" content="Sunchuangyu (Rin) Huang" />
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

          {/* ── Favicons & PWA ── */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* ── Canonical & hreflang ── */}
          <link rel="canonical" href="https://rin.contact/" />
          <link rel="alternate" hrefLang="en-AU" href="https://rin.contact/" />
          <link rel="alternate" hrefLang="x-default" href="https://rin.contact/" />

          {/* ── Font preconnect (performance → Core Web Vitals → ranking) ── */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          {/* Both fonts in one request — fewer round-trips, display=swap prevents FOIT */}
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@300..600&family=Space+Grotesk:wght@300;400;500;600&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@300..600&family=Space+Grotesk:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />

          {/* ── JSON-LD structured data ── */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
          />
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
