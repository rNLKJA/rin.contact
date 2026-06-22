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
    name: "Rowland Mosbergen",
    title: "Data, AI & Digital Transformation Leader | DEI Innovator",
    quote:
      "Sunchuangyu learns technical concepts very quickly, understands domain concepts and communicates them regularly. He is highly collaborative, has a high tolerance for ambiguity and complexity, and is highly adaptable. He was extremely impressive and I would highly recommend him. It is my opinion that he could be placed in an elite team and quickly contribute and continue to improve.",
    linkedIn: "https://www.linkedin.com/in/rowlandmosbergen/",
  },
  {
    name: "Jalal Hobbs",
    title: "Software Engineer",
    quote:
      "I worked with Rin at CBS/AGD and he made a strong impact on the team. He's direct, thoughtful and has a sharp eye for what's really going on in a problem. When something didn't add up, he asked clear, simple questions that helped everyone understand the issue. Rin has a steady way of working — he takes the time to understand the situation properly, then focuses on what will actually move things forward.",
    linkedIn: "https://www.linkedin.com/in/jalal-hobbs/",
  },
  {
    name: "Dr Vassili Kitsios",
    title: "Climate AI / ML Researcher — CSIRO",
    quote:
      "Rin was a leading student in his final year project of his Masters of Data Science, delivered to the CSIRO Environment department. The focus was on developing machine learning solutions for forecasting the role of climate variability on agricultural crop affordability and food security. He is a very competent programmer, project manager and communicator. I would highly recommend him for any data science role.",
    linkedIn: "https://www.linkedin.com/in/vkitsios/",
  },
  {
    name: "Sandy Pan",
    title: "Program Coordinator — University of Melbourne",
    quote:
      "I highly recommend Rin. He dedicated his time, experience and knowledge to junior Data Science students in the Faculty of Science's Peer to Peer Mentoring Program. Rin was amazing at reaching out and connecting with students to assist with their transition to graduate studies. He took the initiative to collaborate with other mentors for creative catch-ups, and went out of his way to ensure his mentees got the most out of the program.",
    linkedIn: "https://www.linkedin.com/in/sandypan-/",
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
        <div className="relative">
          {/* giant ghosted quotation mark — editorial flourish */}
          <span
            aria-hidden="true"
            className="font-editorial pointer-events-none absolute -top-24 -left-2 md:-left-10 leading-none select-none text-[160px] md:text-[230px] text-[#F2F2F2] dark:text-[#181818]"
          >
            &ldquo;
          </span>
          <div className="grid relative z-10">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className={`[grid-area:1/1] transition-all duration-700 ${
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
                    {t.linkedIn ? (
                      <a href={t.linkedIn} target="_blank" rel="noreferrer" className="hover:text-[#FF3C3C] transition-colors">
                        {t.name}
                      </a>
                    ) : (
                      t.name
                    )}
                  </p>
                  <p className="text-xs text-[#7A7A7A]">{t.title}</p>
                </div>
              </footer>
            </blockquote>
          ))}
          </div>
        </div>

        {/* editorial counter */}
        {total > 1 && (
          <div className="flex items-center gap-2 mt-10 font-mono text-[11px] tracking-[0.3em]">
            <span className="text-[#FF3C3C]">{String(current + 1).padStart(2, "0")}</span>
            <span className="text-[#D0D0D0] dark:text-[#3D3D3D]">/</span>
            <span className="text-[#9A9A9A]">{String(total).padStart(2, "0")}</span>
          </div>
        )}

        {/* dots + prev/next */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
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
