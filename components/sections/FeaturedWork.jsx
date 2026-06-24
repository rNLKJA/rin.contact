/**
 * FeaturedWork — homepage flagship spotlight.
 * Leads the marketing page with Signal (live, governed AI product): proof of
 * work up front, with case-study / live-demo / source CTAs. Nothing-OS styling,
 * dot-matrix accent, theme-aware.
 */
import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const LIVE = "https://rnlkja--signal-api-api.modal.run";
const REPO = "https://github.com/rNLKJA/signal";

const STATS = [
  { k: "Status", v: "Live · v1.14" },
  { k: "Tests", v: "128 green" },
  { k: "Jurisdictions", v: "SA + NYC" },
  { k: "Governance", v: "DTA + EU AI Act" },
];

const STACK = ["Python", "FastAPI", "LLM", "NumPy", "SciPy", "Modal", "Docker", "EU AI Act", "DTA v2.0"];

export default function FeaturedWork() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const cardRef = useRef(null);
  const sheenRef = useRef(null);
  const noTiltRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // No cursor tilt under reduced-motion, or on touch/coarse pointers.
    noTiltRef.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  // Subtle 3D tilt + red cursor sheen — premium feel on the flagship card.
  const onMove = useCallback((e) => {
    if (noTiltRef.current) return;
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    card.style.transform = `rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg)`;
    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(620px circle at ${px * 100}% ${py * 100}%, rgba(255,60,60,0.07), transparent 46%)`;
      sheenRef.current.style.opacity = "1";
    }
  }, []);

  const onLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (sheenRef.current) sheenRef.current.style.opacity = "0";
  }, []);

  return (
    <section id="featured" className="scroll-mt-24 py-20 md:py-24" aria-label="Featured work" ref={ref}>
      <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-8 font-mono flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] animate-pulse" aria-hidden="true" />
        Featured — Flagship
      </p>

      {/* perspective wrapper holds the scroll reveal; the inner card tilts */}
      <div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ perspective: "1500px" }}
      >
      <div
        ref={cardRef}
        className="relative border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg overflow-hidden bg-white dark:bg-[#0A0A0A]"
        style={{ transition: "transform 0.25s ease-out", willChange: "transform" }}
      >
        {/* cursor sheen — subtle red glow, never blocks clicks */}
        <span ref={sheenRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20" style={{ opacity: 0, transition: "opacity 0.3s ease" }} />
        {/* header bar */}
        <div className="px-6 md:px-8 py-3 border-b border-[#E0E0E0] dark:border-[#3D3D3D] bg-[#FAFAFA] dark:bg-[#141414] flex items-center justify-between gap-4">
          <span className="text-[10px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A] truncate">
            Independent Product · Jun 2026 – Present
          </span>
          <span className="text-[10px] tracking-widest uppercase text-[#FF3C3C] flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] animate-pulse" aria-hidden="true" />
            Live
          </span>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* main */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white">Signal</h2>
              <p className="text-sm text-[#595959] dark:text-[#AAAAAA] mt-1">
                Governance Layer for AI-Assisted Government Data
              </p>
            </div>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
              A governed data product that puts AI governance on the request path — tamper-evident hash-chained audit
              logs, auto-generated DTA and EU AI Act compliance artefacts, and faithfulness-checked LLM narratives. The
              live reference implementation analyses South Australian and NYC crime statistics with Mann-Kendall trend
              tests, Sen-slope forecasting, and z-score anomaly review.
            </p>
            <div className="p-4 bg-[#FFF5F5] dark:bg-[#1A1111] rounded-lg">
              <p className="text-sm text-[#1A1A1A] dark:text-white font-medium leading-relaxed">
                Live deployment · 128 tests · Tamper-evident audit + DTA v2.0 governance set · Open-core product
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link
                href="/projects/signal"
                className="inline-flex items-center gap-2 border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-white dark:text-[#0A0A0A] rounded-full hover:bg-black dark:hover:bg-white transition-colors duration-200"
              >
                Read case study →
              </Link>
              <a
                href={LIVE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-[#FF3C3C] bg-[#FF3C3C] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-white rounded-full hover:bg-[#E02020] hover:border-[#E02020] transition-colors duration-200"
              >
                Live demo ↗
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-1.5 text-xs tracking-widest uppercase
                           text-[#595959] dark:text-[#AAAAAA] rounded-full hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                View on GitHub ↗
              </a>
            </div>
          </div>

          {/* side: stats + stack */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-px border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
              {STATS.map(({ k, v }) => (
                <div key={k} className="bg-white dark:bg-[#0A0A0A] px-4 py-3.5">
                  <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mb-1">{k}</p>
                  <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#595959] dark:text-[#9A9A9A] mb-2">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2.5 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA] rounded-full
                               cursor-default hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
