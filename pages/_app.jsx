import React, { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { bitcount, dmSans, playfair } from "@/lib/fonts";

import "../public/styles/globals.css";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const BootOverlay = dynamic(() => import("@/components/ui/BootOverlay"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

// ── Idle toast ────────────────────────────────────────────────────────────────
const IDLE_MS   = 30_000;
const IDLE_MSGS = [
  "Still there?",
  "The model is still training.",
  "Coffee break?",
  "Waiting for input...",
  "⏳ idle detected",
  "Take your time. I'll be here.",
];

function IdleToast() {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg]         = useState(IDLE_MSGS[0]);
  const timerRef              = useRef(null);
  const msgIdxRef             = useRef(0);

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

// ── Secret word trigger — type "data" anywhere ────────────────────────────────
function SecretWordTrigger() {
  const bufRef = useRef("");
  const [burst, setBurst] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;
      bufRef.current = (bufRef.current + e.key).slice(-4).toLowerCase();
      if (bufRef.current === "data") {
        bufRef.current = "";
        // Spawn dots burst from a random point
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.1;
        setBurst({ id: Date.now(), x, y });
        setTimeout(() => setBurst(null), 1200);
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
        data!
      </span>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
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
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#FF3C3C","font-weight:bold"),
        s("#fff"),
      );

      console.log(
        "%cHello, developer. You opened the console.\n\n" +
        "%cSince you're here, you're probably the kind of person Rin would enjoy working with.\n\n" +
        "%cStack:    %cNext.js 14 · Tailwind CSS · EmailJS · Vercel\n" +
        "%cDesign:   %cNothing OS aesthetic — stark, minimal, monochromatic\n" +
        "%cAuthor:   %cRin Huang  ·  rin.contact\n\n" +
        "%cHidden routes:\n" +
        "%c  /resume   →  interactive CLI\n" +
        "%c  /fun/matrix   →  you'll know it when you see it\n" +
        "%c  /fun/coffee   →  you know why\n" +
        "%c  /fun/secret   →  morse code reveal\n" +
        "%c  /tools/card   →  digital business card\n" +
        "%c  ↑↑↓↓←→←→BA  →  try it on the homepage\n\n" +
        "%cAPIs:\n" +
        "%c  GET /api/rin.json   →  structured profile\n" +
        "%c  GET /api/fortune    →  random wisdom\n\n" +
        "%cWant to hire Rin?  →  rin.contact/hire-me\n",
        s("#7A7A7A"),
        s("#CCCCCC"),
        s("#7A7A7A"), s("#CCCCCC"),
        s("#7A7A7A"), s("#CCCCCC"),
        s("#7A7A7A"), s("#CCCCCC"),
        s("#7A7A7A"),
        s("#3D3D3D"),s("#3D3D3D"),s("#3D3D3D"),s("#3D3D3D"),s("#3D3D3D"),s("#3D3D3D"),
        s("#7A7A7A"),
        s("#3D3D3D"),s("#3D3D3D"),
        s("#FF3C3C","font-weight:bold"),
      );
    }
  }, []);

  return (
    <ThemeProvider>
      <div className={`${bitcount.variable} ${dmSans.variable} ${playfair.variable} flex flex-col min-h-screen bg-white dark:bg-[#0A0A0A]`}>
        <BootOverlay />
        <CustomCursor />
        <CopyUrlToast />
        <IdleToast />
        <CopyEmailConfetti />
        <SecretWordTrigger />
        <Header />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
