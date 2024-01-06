import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const router = useRouter();

  const determineMaxWidth = () => {
    if (isXSmall) return "100%"; // Tailwind CSS's 'xs'
    if (isSmall) return "640px"; // Tailwind CSS's 'sm'
    if (isMedium) return "768px"; // Tailwind CSS's 'md'
    if (isLarge) return "1024px"; // Tailwind CSS's 'lg'
    return "1280px"; // Tailwind CSS's 'xl' and '2xl'
  };

  return (
    <Container
      maxWidth={false} // Disable the maxWidth of MUI Container
      style={{
        maxWidth: determineMaxWidth(),
        backgroundColor: "#ffffff",
      }}
      className="flex flex-col min-h-screen justify-between" // 'min-h-screen' to ensure the footer is at the bottom
    >
      <Head>
        <title>Pawsibly Rin</title>
        <meta
          name="description"
          content="Data Scientist Rin Huang: Explore my tech insights and data-driven solutions to real-world problems using modern tools"
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
        />{" "}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rin.contact/" />
        <meta property="og:title" content="rNLKJA's Portfolio" />
        <meta
          property="og:description"
          content="Explore Rin Huang's data science projects and read his latest thoughts on tech, data science and life."
        />
        <meta
          property="og:image"
          content="https://rin.contact/meta-image.png"
        />{" "}
        <meta property="highschool" content="安顺第二高级中学" />
        <meta property="高中" content="安顺第二高级中学" />
        <meta property="college" content="trinity college" />
        <meta property="姓名" content="Sunchuangyu Huang" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f5f5f5" />
      </Head>
      <Header />
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
      <Footer />
    </Container>
  );
}

export default MyApp;
