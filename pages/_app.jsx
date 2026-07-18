import React, { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/contexts/I18nContext";
import { bitcount, dmSans, playfair } from "@/lib/fonts";

import "../public/styles/globals.css";
// -swap variant: font-display:swap instead of the default's font-display:block,
// so the ~39 /knowledge pages that render <Formula>/<TeX> don't risk a FOIT
// while KaTeX's math fonts load. Same file size either way.
import "katex/dist/katex-swap.min.css";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
  { ssr: false }
);

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const BootOverlay = dynamic(() => import("@/components/ui/BootOverlay"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

// ── Idle toast ────────────────────────────────────────────────────────────────
const IDLE_MS = 30_000;
const IDLE_MSGS = [
  "Still there?",
  "The model is still training.",
  "Coffee break?",
  "Waiting for input...",
  "Idle detected.",
  "Take your time. I'll be here.",
];

function IdleToast() {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState(IDLE_MSGS[0]);
  const timerRef = useRef(null);
  const msgIdxRef = useRef(0);

  const reset = useCallback(() => {
    setVisible(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      msgIdxRef.current = (msgIdxRef.current + 1) % IDLE_MSGS.length;
      setMsg(IDLE_MSGS[msgIdxRef.current]);
      setVisible(true);
    }, IDLE_MS);
  }, []);

  useEffect(() => {
    reset();
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [reset]);

  if (!visible) return null;
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] font-mono text-[11px]
                 tracking-widest uppercase border border-[#E0E0E0] dark:border-[#3D3D3D]
                 bg-white dark:bg-[#1A1A1A] text-[#3D3D3D] dark:text-[#AAAAAA]
                 px-5 py-2.5 shadow-none pointer-events-none select-none"
      style={{ animation: "fade-in 0.4s ease-out both" }}
      aria-live="polite"
    >
      {msg}
    </div>
  );
}

// ── Copy URL toast — when user copies rin.contact URL (not email) ───────────────
function CopyUrlToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onCopy = () => {
      const sel = document.getSelection?.();
      const text = (sel?.toString() || "").trim();
      if (!text || !text.includes("rin.contact") || text.includes("huang@")) return;
      setShow(true);
      setTimeout(() => setShow(false), 2500);
    };
    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, []);

  if (!show) return null;
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] font-mono text-[10px]
                 tracking-widest uppercase border border-[#E0E0E0] dark:border-[#3D3D3D]
                 bg-white dark:bg-[#1A1A1A] text-[#3D3D3D] dark:text-[#AAAAAA]
                 px-4 py-2 pointer-events-none select-none"
      style={{ animation: "fade-in 0.3s ease-out both" }}
      aria-live="polite"
    >
      Link copied. Share responsibly.
    </div>
  );
}

// ── Copy email confetti — when user copies huang@rin.contact ───────────────────
const RIN_EMAIL = "huang@rin.contact";

function CopyEmailConfetti() {
  const [burst, setBurst] = useState(null);

  useEffect(() => {
    const onCopy = (e) => {
      const sel = document.getSelection?.();
      const text = (sel?.toString() || "").trim();
      if (!text || !text.includes(RIN_EMAIL)) return;
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * 120;
      const y = window.innerHeight / 2 + (Math.random() - 0.5) * 80;
      setBurst({ id: Date.now(), x, y });
      setTimeout(() => setBurst(null), 1000);
    };
    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, []);

  if (!burst) return null;
  const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <div
      key={burst.id}
      className="pointer-events-none fixed z-[9999]"
      style={{ left: burst.x, top: burst.y, transform: "translate(-50%,-50%)" }}
    >
      {angles.map((deg, i) => (
        <span
          key={deg}
          className="absolute block rounded-full bg-[#FF3C3C]"
          style={{
            width: i % 3 === 0 ? 4 : 3,
            height: i % 3 === 0 ? 4 : 3,
            animation: "dot-burst 1s ease-out forwards",
            animationDelay: `${i * 12}ms`,
            "--deg": `${deg}deg`,
            "--dist": `${18 + (i % 4) * 8}px`,
          }}
        />
      ))}
    </div>
  );
}

// ── Secret word trigger — type "data" or "iddqd" anywhere ──────────────────────
function SecretWordTrigger() {
  const bufRef = useRef("");
  const [burst, setBurst] = useState(null);
  const [label, setLabel] = useState("data!");

  useEffect(() => {
    const onKey = (e) => {
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      )
        return;
      bufRef.current = (bufRef.current + e.key).slice(-5).toLowerCase();
      if (bufRef.current === "data") {
        bufRef.current = "";
        setLabel("data!");
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.1;
        setBurst({ id: Date.now(), x, y });
        setTimeout(() => setBurst(null), 1200);
      } else if (bufRef.current === "iddqd") {
        bufRef.current = "";
        setLabel("GOD MODE");
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.1;
        setBurst({ id: Date.now(), x, y });
        setTimeout(() => setBurst(null), 1500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!burst) return null;
  const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <div
      key={burst.id}
      className="pointer-events-none fixed z-[9999]"
      style={{ left: burst.x, top: burst.y, transform: "translate(-50%,-50%)" }}
    >
      {angles.map((deg, i) => (
        <span
          key={deg}
          className="absolute block rounded-full bg-[#FF3C3C]"
          style={{
            width: i % 3 === 0 ? 4 : 3,
            height: i % 3 === 0 ? 4 : 3,
            animation: "dot-burst 1s ease-out forwards",
            animationDelay: `${i * 15}ms`,
            "--deg": `${deg}deg`,
            "--dist": `${22 + (i % 4) * 10}px`,
          }}
        />
      ))}
      <span
        className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[10px]
                   text-[#FF3C3C] whitespace-nowrap tracking-widest"
        style={{ animation: "fade-in 0.3s ease-out both" }}
      >
        {label}
      </span>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  // ── Register service worker + capture install prompt ───────────────────────
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    // Capture beforeinstallprompt so we can show a custom install button
    const handler = (e) => {
      e.preventDefault();
      window.__deferredPrompt = e;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    // ── Console easter egg — fires once per session ──────────────────────────
    if (typeof window !== "undefined" && !window.__rinConsoleShown) {
      window.__rinConsoleShown = true;

      const s = (color, extra = "") =>
        `color:${color};font-family:'Courier New',monospace;font-size:11px;${extra}`;

      console.log(
        "%c\n" +
          "%c  ██████╗ ██╗███╗   ██╗  \n" +
          "%c  ██╔══██╗██║████╗  ██║  \n" +
          "%c  ██████╔╝██║██╔██╗ ██║  \n" +
          "%c  ██╔══██╗██║██║╚██╗██║  \n" +
          "%c  ██║  ██║██║██║ ╚████║  \n" +
          "%c  ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝  \n" +
          "%c\n",
        s("#fff"),
        s("#FF3C3C", "font-weight:bold"),
        s("#FF3C3C", "font-weight:bold"),
        s("#FF3C3C", "font-weight:bold"),
        s("#FF3C3C", "font-weight:bold"),
        s("#FF3C3C", "font-weight:bold"),
        s("#FF3C3C", "font-weight:bold"),
        s("#fff")
      );

      console.log(
        "%cHello, developer. You opened the console.\n\n" +
          "%cSince you're here, you're probably the kind of person Rin would enjoy working with.\n\n" +
          "%cStack:    %cNext.js 16 · Tailwind CSS · EmailJS · Vercel\n" +
          "%cDesign:   %cNothing OS aesthetic — stark, minimal, monochromatic\n" +
          "%cAuthor:   %cRin Huang  ·  rin.contact\n\n" +
          "%cHidden routes:\n" +
          "%c  /resume   →  interactive CLI\n" +
          "%c  /fun/matrix   →  you'll know it when you see it\n" +
          "%c  /fun/coffee   →  you know why\n" +
          "%c  /fun/secret   →  morse code reveal\n" +
          "%c  /fun/vault    →  achievement tracker\n" +
          "%c  /tools/card   →  digital business card\n" +
          "%c  /ds           →  Rin as data science\n" +
          "%c  ↑↑↓↓←→←→BA  →  try it on the homepage\n" +
          "%c  Type 'data' or 'iddqd'  →  anywhere (not in inputs)\n\n" +
          "%cAPIs:\n" +
          "%c  GET /api/rin.json   →  structured profile\n" +
          "%c  GET /api/fortune    →  random wisdom\n\n" +
          "%cWant to hire Rin?  →  rin.contact/hire-me\n",
        s("#7A7A7A"),
        s("#CCCCCC"),
        s("#7A7A7A"),
        s("#CCCCCC"),
        s("#7A7A7A"),
        s("#CCCCCC"),
        s("#7A7A7A"),
        s("#CCCCCC"),
        s("#7A7A7A"),
        s("#3D3D3D"),
        s("#3D3D3D"),
        s("#3D3D3D"),
        s("#3D3D3D"),
        s("#3D3D3D"),
        s("#3D3D3D"),
        s("#3D3D3D"),
        s("#3D3D3D"),
        s("#7A7A7A"),
        s("#3D3D3D"),
        s("#3D3D3D"),
        s("#FF3C3C", "font-weight:bold")
      );

      const DS_JOKES = [
        "Correlation ≠ causation. But it's a great conversation starter.",
        "All models are wrong, but some are useful. — George Box",
        "In God we trust. All others must bring data. — Deming",
        "Torture the data, and it will confess to anything. — Ronald Coase",
        "p < 0.05. Science is not a slot machine.",
      ];
      const joke = DS_JOKES[Math.floor(Math.random() * DS_JOKES.length)];
      console.log("%c" + joke, s("#555555", "font-style:italic"));
    }
  }, []);

  return (
    <ThemeProvider>
      <I18nProvider>
        {/* Global viewport — every page gets initial-scale + viewport-fit=cover
            (edge-to-edge on notched devices), not just Next's minimal default. */}
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        </Head>
        <div
          className={`${bitcount.variable} ${dmSans.variable} ${playfair.variable} flex flex-col min-h-screen bg-white dark:bg-[#0A0A0A]`}
        >
          {/* Skip-to-content link — WCAG 2.4.1: first focusable element */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999]
                       focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-[#1A1A1A]
                       focus:text-black dark:focus:text-white focus:border focus:border-black
                       dark:focus:border-white focus:text-xs focus:tracking-widest focus:uppercase
                       focus:outline-none transition-none"
          >
            Skip to content
          </a>
          <BootOverlay />
          <CustomCursor />
          <CopyUrlToast />
          <IdleToast />
          <CopyEmailConfetti />
          <SecretWordTrigger />
          <Header />
          <main className="flex-1" id="main-content">
            <Component {...pageProps} />
          </main>
          <Footer />
          <Analytics debug={false} />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default MyApp;

// ── Web Vitals reporting — logs to Vercel Analytics and console (dev) ─────────
export function reportWebVitals(metric) {
  if (process.env.NODE_ENV === "development") {
    console.log("[Web Vitals]", metric.name, Math.round(metric.value), metric.id);
  }
  // Vercel Analytics automatically captures Web Vitals when both are present.
  // This function exists so you can also pipe metrics to a custom endpoint if needed.
}
