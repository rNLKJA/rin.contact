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
