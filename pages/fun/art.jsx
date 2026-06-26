import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";

// Phyllotaxis spiral — Fibonacci-based sunflower arrangement.
// Each dot placed at angle i * golden_angle, radius ∝ sqrt(i).
// Slowly morphs the golden angle ±ε to create organic drift.
// Nothing OS palette: white bg, monochrome dots, occasional red accent.

const PHI = (1 + Math.sqrt(5)) / 2;
const GOLDEN_ANGLE = Math.PI * 2 * (2 - PHI); // ≈ 137.508°
const N_DOTS = 600;
const DRIFT_SPEED = 0.00008;
const DRIFT_AMP = 0.018;

function drawFrame(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const scale = Math.min(w, h) * 0.44;
  const angle = GOLDEN_ANGLE + Math.sin(t * DRIFT_SPEED) * DRIFT_AMP;

  for (let i = 0; i < N_DOTS; i++) {
    const r = (Math.sqrt(i) / Math.sqrt(N_DOTS)) * scale;
    const a = i * angle;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);

    // Progress 0–1 from centre to edge
    const prog = i / N_DOTS;

    // Size: larger at edge, smaller at centre
    const size = 1.2 + prog * 2.4;

    // Every 89th dot (a Fibonacci number) gets the red accent
    const isAccent = i % 89 === 0;
    // Innermost dots dimmer
    const alpha = 0.15 + prog * 0.75;

    if (isAccent && i > 0) {
      ctx.fillStyle = `rgba(255,60,60,${alpha * 0.9})`;
    } else {
      const grey = Math.round(30 + (1 - prog) * 60);
      ctx.fillStyle = `rgba(${grey},${grey},${grey},${alpha})`;
    }

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function ArtPage() {
  const { t, locale = "en-AU" } = useI18n();
  const labels = t("fun.art.labels") || [];
  const labelCount = labels.length;
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const [labelIdx, setLabelIdx] = useState(0);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let t = 0;

    function resize() {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();
    window.addEventListener("resize", resize);

    function loop() {
      t++;
      drawFrame(ctx, canvas.offsetWidth, canvas.offsetHeight, t);
      frameRef.current = requestAnimationFrame(loop);
    }

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Cycling label (index-based so it follows the localised labels array)
  useEffect(() => {
    if (labelCount < 2) return;
    const id = setInterval(() => {
      setLabelIdx((prev) => (prev + 1) % labelCount);
    }, 2800);
    return () => clearInterval(id);
  }, [labelCount]);

  return (
    <>
      <Head>
        <title>{t("fun.art.metaTitle")}</title>
        <meta name="description" content={t("fun.art.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/fun/art" />
      </Head>

      <SeoHead
        title={t("fun.art.metaTitle")}
        description={t("fun.art.metaDescription")}
        path="/fun/art"
        ogImage={{
          title: t("fun.art.ogTitle"),
          subtitle: t("fun.art.ogSubtitle"),
          section: "fun",
        }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        {/* Canvas — fills available space */}
        <div className="flex-1 relative" style={{ minHeight: "70vh" }}>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-label={t("fun.art.ariaLabel")}
          />

          {/* Floating label */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <p
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#AAAAAA]"
              key={labelIdx}
              style={{ animation: "fade-in 0.6s ease-out both" }}
            >
              {labels[labelIdx] || ""}
            </p>
          </div>
        </div>

        {/* Info strip */}
        <div className="border-t border-[#F0F0F0] px-6 md:px-12 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-[1100px] mx-auto w-full">
          <div>
            <p className="text-xs font-medium text-[#1A1A1A] mb-0.5">{t("fun.art.infoTitle")}</p>
            <p className="text-[11px] text-[#7A7A7A] leading-relaxed max-w-sm">
              {t("fun.art.infoBody")}
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              ← {t("nav.home")}
            </Link>
            <Link
              href="/fun/matrix"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              /fun/matrix →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
