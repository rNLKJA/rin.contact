import { DM_Sans, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

// Pixel display — hero h1 brand name
// Variable font: single file covers all weights (100–900) and axes. Served as
// WOFF2 (lossless brotli-compressed container) — 264KB TTF -> 36KB, identical
// glyphs and axes.
// preload: false — only the homepage hero (HeroSection.jsx) needs this above
// the fold; everywhere else it's a 0.025-opacity Footer watermark and a
// once-per-session boot animation. display:swap already avoids FOIT, so
// lazy-loading it saves ~35KB of render-priority preload on every other page.
export const bitcount = localFont({
  src: "./Bitcount_Prop_Double/BitcountPropDouble-VariableFont.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-bitcount",
});

// Humanist sans — body, nav, buttons, labels
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-sans",
});

// Editorial serif — section headings
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});
