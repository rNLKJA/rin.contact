import React, { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "@/hooks/useInView";

/* ── Testimonial data ───────────────────────────────────────────────────────

   Replace these with real quotes from managers, colleagues, or collaborators.
   Each entry: name, title (role + org), quote, and optional linkedIn URL.

   Tips for strong testimonials:
   - Specific outcomes > generic praise (e.g. "reduced report time by 40%" > "great worker")
   - Cross-sector variety (gov, research, startup, engineering)
   - Keep quotes ~2-4 sentences for readability
   ────────────────────────────────────────────────────────────────────────── */

const TESTIMONIALS = [
  {
    name: "Name",
    title: "Title / Organisation",
    quote: "Replace with a real testimonial from a manager or colleague. A specific outcome or impact statement works best — for example, how the work changed a process, saved time, or influenced a decision.",
    linkedIn: "",
  },
  {
    name: "Name",
    title: "Title / Organisation",
    quote: "Second testimonial. Vary the source — government for one, research or startup for another — to show cross-sector credibility.",
    linkedIn: "",
  },
  {
    name: "Name",
    title: "Title / Organisation",
    quote: "Third testimonial. Three to five testimonials with specific, varied contexts create the strongest social proof section.",
    linkedIn: "",
  },
];

/* ── Auto-advancing carousel ──────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.2 });
  const timerRef = useRef(null);
  const total = TESTIMONIALS.length;

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 5000);
  }, [advance]);

  const select = useCallback(
    (idx) => {
      setCurrent(idx);
      startTimer();
    },
    [startTimer]
  );

  useEffect(() => {
    if (inView) startTimer();
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [inView, startTimer]);

  if (total === 0) return null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32 border-t border-[#F0F0F0] dark:border-[#1E1E1E]"
    >
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        {/* section header */}
        <div className="mb-14">
          <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-4 font-mono">
            ◈ — Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
            Trusted by.
          </h2>
          <p className="text-sm text-[#7A7A7A] mt-2">
            What people say about working with Rin.
          </p>
        </div>

        {/* quote card */}
        <div className="relative min-h-[200px] md:min-h-[160px]">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className={`absolute inset-0 transition-all duration-700 ${
                i === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="text-lg md:text-xl leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA] mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F5F5F5] dark:bg-[#1A1A1A] flex items-center justify-center text-[10px] font-mono text-[#7A7A7A]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#7A7A7A]">{t.title}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* dots + prev/next */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            {/* prev */}
            <button
              onClick={() =>
                select(current === 0 ? total - 1 : current - 1)
              }
              aria-label="Previous testimonial"
              className="w-8 h-8 flex items-center justify-center border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#7A7A7A] hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M10 4 L6 8 L10 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>

            {/* dots */}
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-[#FF3C3C] w-5"
                    : "bg-[#E0E0E0] dark:bg-[#3D3D3D] hover:bg-[#AAAAAA]"
                }`}
              />
            ))}

            {/* next */}
            <button
              onClick={() => select((current + 1) % total)}
              aria-label="Next testimonial"
              className="w-8 h-8 flex items-center justify-center border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#7A7A7A] hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M6 4 L10 8 L6 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
