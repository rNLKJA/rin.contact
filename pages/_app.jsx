// Import the necessary styles and components
import "../styles/globals.css";

import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Head from "next/head";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container
      maxWidth={isMobile ? "xs" : "lg"}
      style={{
        width: isMobile ? "100%" : "1100px",
        backgroundColor: "",
      }}
    >
      <SEOHead />

      <Header />

      <Component {...pageProps} />

      <Footer />
    </Container>
  );
}

export default MyApp;

const SEOHead = () => {
  return (
    <Head>
      <title>Pawsibly Rin</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Personal Profile website for Rin Huang"
      />
      <meta name="author-full-name" content="Sunchuangyu Huang" />
      <meta name="author-prefer-name" content="Rin Huang" />
      <meta name="author-chinese-name" content="黄孙创宇" />
      <meta name="author-email" content="huangsunchuangyu@gmail.com" />
      <meta name="author-github" content="https://github/rNLKJA" />
      <meta
        name="author-linkedin"
        content="https://www.linkedin.com/in/sunchuangyuhuang/"
      />
      <meta name="author-website" content="https://rin.contact" />
      <meta
        name="instagram"
        content="https://www.instagram.com/chuangyu_hscy"
      />
      <meta
        name="xiaohongshu"
        content="https://www.xiaohongshu.com/user/profile/5ddb3cf2000000000100bcab"
      />

      <link rel="icon" href="/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://rin.contact/" />
      <meta property="og:title" content="rNLKJA's Portfolio" />
      <meta
        property="og:description"
        content="Explore my data science projects and read my latest tech insights."
      />
      <meta property="og:image" content="https://rin.contact/meta-image.jpg" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Person",
            name: "rNLKJA",
            url: "https://rin.contact",
            sameAs: [
              "https://github.com/rNLKJA",
              "https://linkedin.com/in/sunchuangyuhuang",
              "https://www.instagram.com/chuangyu_hscy/",
            ],
            jobTitle: "Master of Data Science",
            worksFor: {
              "@type": "Organization",
              name: "University of Melbourne",
            },
            alumniOf: "University of Melbourne",
            description:
              "rNLKJA - Data Scientist, Programmer, and Tech Enthusiast. Explore my portfolio, blog posts, and data science projects.",
          }),
        }}
      />
    </Head>
  );
};
