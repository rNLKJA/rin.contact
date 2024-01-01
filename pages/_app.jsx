import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container
      maxWidth={isMobile ? "xs" : "lg"}
      style={{
        width: isMobile ? "100%" : "1100px",
        backgroundColor: "#ffffff",
      }}
    >
      <Head>
        <title>Pawsibly Rin</title>
      </Head>
      <Header className="sticky  top-0" />
      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
      <Footer className="sticky  bottom-0" />
    </Container>
  );
}

export default MyApp;
