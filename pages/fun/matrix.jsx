import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

// ── Symbols pulled from data science / maths / code ──────────────────────────
const CHARS =
  "∑∇λσμ∫παβγεθ∞≈≤≥∂Δφρτω" +
  "xynktp01" +
  "defifforeturnnonetruefalseimport" +
  "fitpredicttraintestlossprintclassmodel" +
  "→←↑↓≠∈∉⊂⊃∪∩";

const CHAR_ARRAY = Array.from(CHARS);

// Nothing palette
const COLOURS = {
  head:    "#FF3C3C",   // bright red — leading char
  bright:  "#CCCCCC",   // near-white
  mid:     "#555555",   // mid grey
  dim:     "#1F1F1F",   // barely visible
};

// ── Main ─────────────────────────────────────────────────────────────────────
export default function MatrixPage() {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const FONT_SIZE = 13;
    let cols, drops, colTick;

    function init() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols    = Math.floor(canvas.width / FONT_SIZE);
      drops   = Array.from({ length: cols }, () => Math.floor(Math.random() * -40));
      colTick = Array.from({ length: cols }, () => Math.floor(Math.random() * 3) + 1);
    }

    init();

    let frame;
    let tick = 0;

    function draw() {
      tick++;
      // Subtle trail fade — dark semi-transparent bg
      ctx.fillStyle = "rgba(0,0,0,0.045)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;

      for (let i = 0; i < cols; i++) {
        if (tick % colTick[i] !== 0) continue;

        const y = drops[i] * FONT_SIZE;
        const char = CHAR_ARRAY[Math.floor(Math.random() * CHAR_ARRAY.length)];

        // Leading character — brightest / red
        ctx.fillStyle = COLOURS.head;
        ctx.fillText(char, i * FONT_SIZE, y);

        // Body gradient — dimmer as you go up
        for (let j = 1; j < 6; j++) {
          const prev = (drops[i] - j) * FONT_SIZE;
          if (prev < 0) continue;
          const prevChar = CHAR_ARRAY[Math.floor(Math.random() * CHAR_ARRAY.length)];
          ctx.fillStyle = j === 1 ? COLOURS.bright : j < 3 ? COLOURS.mid : COLOURS.dim;
          ctx.fillText(prevChar, i * FONT_SIZE, prev);
        }

        // Reset column when it exits the screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
          colTick[i] = Math.floor(Math.random() * 3) + 1;
        }
        drops[i]++;
      }

      frame = requestAnimationFrame(draw);
    }

    draw();

    // Reveal overlay after a short delay
    const revealTimer = setTimeout(() => setRevealed(true), 2200);

    const onResize = () => { init(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(revealTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>matrix — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SeoHead
        title="matrix — rin.contact"
        description=""
        path="/fun/matrix"
        ogImage={{ title: "matrix", subtitle: "", section: "fun" }}
        noindex={true}
      />

      {/* Full-screen canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full bg-black"
        aria-hidden="true"
      />

      {/* Overlay — fades in */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
        style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity 1.2s ease-in",
        }}
      >
        <div className="text-center px-6 max-w-lg pointer-events-auto">
          <p
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-6"
            style={{ textShadow: "0 0 12px rgba(255,60,60,0.6)" }}
          >
            you found /matrix
          </p>

          <h1
            className="font-mono text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            style={{ textShadow: "0 0 24px rgba(255,255,255,0.25)" }}
          >
            The data never stops.
          </h1>

          <p className="font-mono text-xs text-[#555555] leading-relaxed mb-10">
            Every symbol you see is borrowed from the language of data science.<br />
            ∑ σ λ ∇ ∫ — beneath every model, it all comes down to maths.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="font-mono text-[11px] tracking-widest uppercase border border-[#3D3D3D] text-[#7A7A7A]
                         px-6 py-2.5 hover:border-white hover:text-white transition-colors duration-200"
            >
              ← back to surface
            </Link>
            <Link
              href="/resume"
              className="font-mono text-[11px] tracking-widest uppercase border border-[#FF3C3C] text-[#FF3C3C]
                         px-6 py-2.5 hover:bg-[#FF3C3C] hover:text-black transition-colors duration-200"
            >
              open CLI resume
            </Link>
          </div>

          <p className="font-mono text-[9px] text-[#2A2A2A] mt-10 tracking-widest">
            ↑↑↓↓←→←→BA if you haven't already
          </p>
        </div>
      </div>
    </>
  );
}
