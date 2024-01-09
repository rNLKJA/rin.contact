import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));

  const determineMaxWidth = () => {
    if (isXSmall) return "100%";
    if (isSmall) return "640px";
    if (isMedium) return "768px";
    if (isLarge) return "1024px";
    return "1280px";
  };

  return (
    <Container
      maxWidth={false}
      style={{ maxWidth: determineMaxWidth(), backgroundColor: "#ffffff" }}
      className="flex flex-col min-h-screen justify-between"
    >
      <DefaultSeo
        title="Pawsibly Rin"
        description="Data Scientist Rin Huang: Explore my tech insights and data-driven solutions to real-world problems using modern tools"
        openGraph={{
          type: "website",
          url: "https://rin.contact/",
          title: "rNLKJA's Portfolio",
          description:
            "Explore Rin Huang's data science projects and read his latest thoughts on tech, data science and life.",
          images: [{ url: "https://rin.contact/images/meta-image.png" }],
        }}
        additionalMetaTags={[
          { name: "author-full-name", content: "Sunchuangyu Huang" },
          { name: "author-prefer-name", content: "Rin Huang" },
          { name: "author-chinese-name", content: "黄孙创宇" },
          { name: "author-email", content: "huangsunchuangyu@gmail.com" },
          { name: "author-github", content: "https://github/rNLKJA" },
          {
            name: "author-linkedin",
            content: "https://www.linkedin.com/in/sunchuangyuhuang/",
          },
          { name: "author-website", content: "https://rin.contact" },
          {
            name: "instagram",
            content: "https://www.instagram.com/chuangyu_hscy",
          },
          {
            name: "xiaohongshu",
            content:
              "https://www.xiaohongshu.com/user/profile/5ddb3cf2000000000100bcab",
          },
          { property: "og:type", content: "website" },
          { property: "og:url", content: "https://rin.contact/" },
          { property: "og:title", content: "rNLKJA's Portfolio" },
          {
            property: "og:description",
            content:
              "Explore Rin Huang's data science projects and read his latest thoughts on tech, data science and life.",
          },
          {
            property: "og:image",
            content: "https://rin.contact/images/meta-image.png",
          },
          { property: "highschool", content: "安顺第二高级中学" },
          { property: "高中", content: "安顺第二高级中学" },
          { property: "college", content: "trinity college" },
          { property: "姓名", content: "Sunchuangyu Huang" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { name: "theme-color", content: "#f5f5f5" },
        ]}
        additionalLinkTags={[
          { rel: "icon", href: "/favicon.ico" },
          // Add any additional link tags if needed
        ]}
      />
      <Header />
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
      <Footer />
    </Container>
  );
}

export default MyApp;
