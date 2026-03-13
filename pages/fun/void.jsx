import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VoidPage() {
  const [blink, setBlink]     = useState(true);
  const [clicked, setClicked] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 1400);
    return () => clearInterval(t);
  }, []);

  // After 7 clicks in the void, something responds
  const handleClick = () => {
    setClicked((n) => n + 1);
  };

  return (
    <>
      <Head>
        <title>void — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div
        className="min-h-screen bg-black flex items-center justify-center cursor-crosshair"
        onClick={handleClick}
      >
        {/* The blinking red dot */}
        {clicked < 7 && (
          <div
            className="w-2 h-2 rounded-full bg-[#FF3C3C]"
            style={{ opacity: blink ? 0.9 : 0.1, transition: "opacity 0.6s ease" }}
            aria-hidden="true"
          />
        )}

        {/* After 7 clicks, the void responds */}
        {clicked >= 7 && clicked < 14 && (
          <div className="text-center font-mono pointer-events-none">
            <p
              className="text-[11px] tracking-widest uppercase text-[#333]"
              style={{ animation: "fade-in 1s ease-out both" }}
            >
              you clicked the void {clicked} times.
            </p>
            <p
              className="text-[11px] tracking-widest uppercase text-[#1F1F1F] mt-2"
              style={{ animation: "fade-in 1s 0.3s ease-out both" }}
            >
              the void is impressed.
            </p>
          </div>
        )}

        {clicked >= 14 && (
          <div className="text-center font-mono">
            <p
              className="text-[11px] tracking-widest uppercase text-[#FF3C3C] mb-6"
              style={{ animation: "fade-in 0.8s ease-out both" }}
            >
              ok. you win. here&apos;s the exit.
            </p>
            <Link
              href="/"
              className="text-[11px] tracking-widest uppercase border border-[#333] text-[#333]
                         px-5 py-2 hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              ← surface
            </Link>
          </div>
        )}

        {/* Tiny escape hint at very bottom — barely visible */}
        {clicked < 7 && (
          <Link
            href="/"
            className="fixed bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#111] hover:text-[#333] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            esc
          </Link>
        )}
      </div>
    </>
  );
}
