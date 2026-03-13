import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
N:Huang;Sunchuangyu;;;
FN:Sunchuangyu Huang (Rin)
NICKNAME:Rin
TITLE:ASO7 Senior Data Analyst
ORG:South Australia Police
EMAIL;TYPE=WORK,INTERNET:info@rin.contact
URL:https://rin.contact
X-SOCIALPROFILE;type=github:https://github.com/rNLKJA
X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/huangsunchuangyu
NOTE:Data Scientist · Government Intelligence Analyst · Co-founder of Mapiva. Bilingual: English / Mandarin. Adelaide\\, SA\\, Australia.
END:VCARD`;

// ── Draggable wrapper with inertia ────────────────────────────────────────────
function DraggableCard({ children }) {
  const wrapRef   = useRef(null);
  const stateRef  = useRef({
    dragging: false,
    startX: 0, startY: 0,
    posX: 0,   posY: 0,
    velX: 0,   velY: 0,
    lastX: 0,  lastY: 0,
    raf: null,
  });
  const [hint, setHint] = useState(true);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Apply CSS transform
  const apply = useCallback((x, y) => {
    const el = wrapRef.current;
    if (el) el.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const onPointerDown = useCallback((e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const s = stateRef.current;
    s.dragging = true;
    s.startX   = e.clientX - s.posX;
    s.startY   = e.clientY - s.posY;
    s.lastX    = e.clientX;
    s.lastY    = e.clientY;
    s.velX = 0; s.velY = 0;
    cancelAnimationFrame(s.raf);
    wrapRef.current?.setPointerCapture(e.pointerId);
    setHint(false);
  }, []);

  const onPointerMove = useCallback((e) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.velX = e.clientX - s.lastX;
    s.velY = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.posX = e.clientX - s.startX;
    s.posY = e.clientY - s.startY;
    apply(s.posX, s.posY);
  }, [apply]);

  const onPointerUp = useCallback(() => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.dragging = false;

    // Inertia glide with friction
    function glide() {
      s.velX *= 0.88;
      s.velY *= 0.88;
      s.posX += s.velX;
      s.posY += s.velY;
      apply(s.posX, s.posY);
      if (Math.abs(s.velX) > 0.3 || Math.abs(s.velY) > 0.3) {
        s.raf = requestAnimationFrame(glide);
      }
    }
    s.raf = requestAnimationFrame(glide);
  }, [apply]);

  // Double-click / double-tap to reset
  const onDoubleClick = useCallback(() => {
    const s = stateRef.current;
    cancelAnimationFrame(s.raf);
    s.velX = 0; s.velY = 0;
    s.posX = 0; s.posY = 0;
    const el = wrapRef.current;
    if (el) {
      el.style.transition = "transform 0.4s cubic-bezier(0.23,1,0.32,1)";
      apply(0, 0);
      setTimeout(() => { if (el) el.style.transition = ""; }, 420);
    }
  }, [apply]);

  useEffect(() => () => cancelAnimationFrame(stateRef.current.raf), []);

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
        className="cursor-grab active:cursor-grabbing touch-none select-none"
        style={{ willChange: "transform" }}
        aria-label="Draggable business card — drag to move, double-click to reset"
      >
        {children}
      </div>

      {/* Hint — fades after first drag */}
      {hint && !coarse && (
        <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#AAAAAA] whitespace-nowrap pointer-events-none"
           style={{ animation: "fade-in 0.8s 0.6s ease-out both" }}>
          drag me · double-click to reset
        </p>
      )}
      {hint && coarse && (
        <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#AAAAAA] whitespace-nowrap pointer-events-none"
           style={{ animation: "fade-in 0.8s 0.6s ease-out both" }}>
          drag me · double-tap to reset
        </p>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CardPage() {
  const download = useCallback(() => {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rin-huang.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <>
      <Head>
        <title>Card — Rin Huang · rin.contact</title>
        <meta name="description" content="Digital business card for Sunchuangyu (Rin) Huang — Senior Data Analyst, Adelaide SA. Download contact card (VCF)." />
        <link rel="canonical" href="https://rin.contact/tools/card" />
      </Head>

      <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center px-6 py-20">

        {/* Draggable card */}
        <DraggableCard>
          <div
            className="w-full max-w-sm bg-white border border-[#E0E0E0]"
            style={{ aspectRatio: "1.7 / 1", minHeight: 200, width: "min(360px, 88vw)" }}
            aria-label="Rin Huang business card"
          >
            <div className="h-full flex flex-col justify-between p-6">

              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <div
                    className="w-10 h-10 bg-black flex items-center justify-center text-white text-base font-semibold mb-4"
                    style={{ borderRadius: "22%" }}
                    aria-hidden="true"
                  >
                    R
                  </div>
                  <p className="text-lg font-semibold tracking-tight leading-tight">Sunchuangyu Huang</p>
                  <p className="text-xs text-[#7A7A7A] tracking-wider mt-0.5">Rin · 黄孙创宇</p>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=72x72&data=https%3A%2F%2Frin.contact&color=000000&bgcolor=FFFFFF&margin=0"
                  alt="QR code linking to rin.contact"
                  width={72}
                  height={72}
                  className="opacity-80"
                  draggable="false"
                />
              </div>

              {/* Bottom row */}
              <div>
                <div className="h-px w-full bg-[#F0F0F0] mb-3" />
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold tracking-wide">ASO7 Senior Data Analyst</p>
                    <p className="text-[10px] text-[#7A7A7A] tracking-wide">South Australia Police</p>
                    <p className="text-[10px] text-[#AAAAAA] mt-1.5 tracking-wide">huang@rin.contact · rin.contact</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#FF3C3C] opacity-70" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </DraggableCard>

        {/* Actions */}
        <div className="mt-14 w-full space-y-3" style={{ maxWidth: "min(360px, 88vw)" }}>
          <button
            onClick={download}
            className="w-full border border-black bg-black text-white px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200 font-mono"
          >
            ↓ Download .vcf contact card
          </button>
          <div className="flex gap-3">
            <a
              href="mailto:huang@rin.contact"
              className="flex-1 border border-[#E0E0E0] text-[#3D3D3D] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200 font-mono text-center"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/huangsunchuangyu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[#E0E0E0] text-[#3D3D3D] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200 font-mono text-center"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rNLKJA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[#E0E0E0] text-[#3D3D3D] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200 font-mono text-center"
            >
              GitHub
            </a>
          </div>
          <Link
            href="/"
            className="block border border-[#E0E0E0] text-[#7A7A7A] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black transition-colors duration-200 font-mono text-center"
          >
            ← Full Profile
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-[#AAAAAA] font-mono text-center">
          rin.contact/tools/card · Adelaide SA · UTC+9:30
        </p>
      </div>
    </>
  );
}
