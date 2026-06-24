import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import SeoHead from "@/components/seo/SeoHead";

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
X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/sunchuangyuhuang
NOTE:Data Scientist · Government Intelligence Analyst · Co-founder of Mapiva. Bilingual: English / Mandarin. Adelaide\\, SA\\, Australia.
END:VCARD`;

const QR_SRC =
  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Frin.contact&color=0A0A0A&bgcolor=FFFFFF&margin=0";

// Shared dot-matrix texture for the dark card faces.
const DOT_TEXTURE = {
  backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1.4px)",
  backgroundSize: "15px 15px",
};

// ── 3D tilt + flip card ───────────────────────────────────────────────────────
function TiltFlipCard() {
  const perspRef = useRef(null);
  const tiltRef = useRef(null);
  const sheenRef = useRef(null);
  const noTiltRef = useRef(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable the cursor tilt under reduced-motion or on touch/coarse pointers
    // (the flip still works via tap). pointermove on touch fires during scroll.
    noTiltRef.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const onMove = useCallback((e) => {
    if (noTiltRef.current) return;
    const wrap = perspRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;
    const r = wrap.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const ty = (px - 0.5) * 18; // rotateY
    const tx = (0.5 - py) * 18; // rotateX
    tilt.style.transform = `rotateX(${tx}deg) rotateY(${ty}deg)`;
    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 38%, transparent 60%)`;
      sheenRef.current.style.opacity = "1";
    }
  }, []);

  const onLeave = useCallback(() => {
    const tilt = tiltRef.current;
    if (tilt) tilt.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (sheenRef.current) sheenRef.current.style.opacity = "0";
  }, []);

  const flip = useCallback(() => setFlipped((f) => !f), []);
  const onKey = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        flip();
      }
    },
    [flip]
  );

  return (
    <div className="relative">
      <div
        ref={perspRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ perspective: "1100px", width: "min(380px, 90vw)" }}
      >
        <div
          ref={tiltRef}
          className="tilt"
          style={{ transformStyle: "preserve-3d", willChange: "transform", transform: "rotateX(0deg) rotateY(0deg)", transition: "transform 0.18s ease-out" }}
        >
          <div
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={
              flipped
                ? "Business card showing the QR side. Activate to flip back to the details."
                : "Business card showing the details. Activate to flip and reveal the QR code."
            }
            onClick={flip}
            onKeyDown={onKey}
            className="flipper cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FF3C3C]"
            style={{ position: "relative", width: "100%", transformStyle: "preserve-3d", aspectRatio: "1.7 / 1", minHeight: 214, transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transition: "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)" }}
          >
            {/* ── FRONT — identity ── */}
            <div
              className="face"
              style={{
                ...DOT_TEXTURE,
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
                background: "#0C0C0C",
                border: "1px solid #262626",
              }}
            >
              {/* HUD corner ticks */}
              <span style={{ position: "absolute", top: 10, right: 10, width: 16, height: 16, borderTop: "2px solid #FF3C3C", borderRight: "2px solid #FF3C3C" }} aria-hidden="true" />
              <span style={{ position: "absolute", bottom: 10, left: 10, width: 16, height: 16, borderBottom: "2px solid #FF3C3C", borderLeft: "2px solid #FF3C3C" }} aria-hidden="true" />
              {/* sheen */}
              <span ref={sheenRef} aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.25s ease", pointerEvents: "none" }} />

              <div className="relative h-full flex flex-col justify-between p-6" style={{ zIndex: 1 }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="w-10 h-10 bg-[#FF3C3C] flex items-center justify-center text-white text-base font-semibold mb-4" style={{ borderRadius: "22%" }} aria-hidden="true">
                      R
                    </div>
                    <p className="text-lg font-semibold tracking-tight leading-tight text-white">Sunchuangyu Huang</p>
                    <p className="text-xs text-[#9A9A9A] tracking-wider mt-0.5">Rin · 黄孙创宇</p>
                  </div>
                  <p className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#7A7A7A]">/card</p>
                </div>

                <div>
                  <div className="h-px w-full bg-[#262626] mb-3" />
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-white">ASO7 Senior Data Analyst</p>
                      <p className="text-[10px] text-[#9A9A9A] tracking-wide">South Australia Police</p>
                      <p className="text-[10px] text-[#7A7A7A] mt-1.5 tracking-wide">huang@rin.contact · rin.contact</p>
                    </div>
                    <div className="w-2.5 h-2.5 bg-[#FF3C3C]" style={{ transform: "rotate(45deg)" }} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── BACK — scan to connect ── */}
            <div
              className="face"
              style={{
                ...DOT_TEXTURE,
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "#0C0C0C",
                border: "1px solid #262626",
              }}
            >
              <span style={{ position: "absolute", top: 10, left: 10, width: 16, height: 16, borderTop: "2px solid #FF3C3C", borderLeft: "2px solid #FF3C3C" }} aria-hidden="true" />
              <span style={{ position: "absolute", bottom: 10, right: 10, width: 16, height: 16, borderBottom: "2px solid #FF3C3C", borderRight: "2px solid #FF3C3C" }} aria-hidden="true" />

              <div className="relative h-full flex items-center gap-5 p-6" style={{ zIndex: 1 }}>
                <div className="bg-white p-2 flex-shrink-0" style={{ borderRadius: 4 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={QR_SRC} alt="QR code linking to rin.contact" width={104} height={104} draggable="false" style={{ display: "block" }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#FF3C3C] mb-2">Scan to connect</p>
                  <p className="text-sm font-semibold text-white leading-snug">Point your camera here.</p>
                  <p className="text-[11px] text-[#9A9A9A] mt-1.5 leading-relaxed">The full profile, projects, and contact, on one tap.</p>
                  <p className="text-[10px] text-[#7A7A7A] mt-3 font-mono">rin.contact</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#6E6E6E] dark:text-[#9A9A9A] whitespace-nowrap pointer-events-none">
        tap to flip · hover to tilt
      </p>
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
      <SeoHead
        title="Card — Rin Huang · rin.contact"
        description="Digital business card for Sunchuangyu (Rin) Huang — Senior Data Analyst, Adelaide SA. Download contact card (VCF)."
        path="/tools/card"
        ogImage={{
          title: "Digital Business Card",
          subtitle: "rin.contact digital business card",
          section: "tools",
        }}
      />

      <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-20">

        <TiltFlipCard />

        {/* Actions */}
        <div className="mt-16 w-full space-y-3" style={{ maxWidth: "min(380px, 90vw)" }}>
          <button
            onClick={download}
            className="w-full border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 text-xs tracking-widest uppercase hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors duration-200 font-mono"
          >
            Download .vcf contact card
          </button>
          <div className="flex gap-3">
            <a href="mailto:huang@rin.contact" className="flex-1 border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#AAAAAA] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 font-mono text-center">
              Email
            </a>
            <a href="https://www.linkedin.com/in/sunchuangyuhuang" target="_blank" rel="noopener noreferrer" className="flex-1 border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#AAAAAA] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 font-mono text-center">
              LinkedIn
            </a>
            <a href="https://github.com/rNLKJA" target="_blank" rel="noopener noreferrer" className="flex-1 border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#AAAAAA] px-4 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 font-mono text-center">
              GitHub
            </a>
          </div>
          <Link href="/" className="block border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#7A7A7A] dark:text-[#9A9A9A] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 font-mono text-center">
            Full Profile
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono text-center">
          rin.contact/tools/card · Adelaide SA · UTC+9:30
        </p>
      </div>
    </>
  );
}
