import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useInView } from "@/hooks/useInView";
import { SectionHeader, EDITORIAL } from "@/components/home/SectionHeader";

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

/* ── UI copy (the quotes, names and titles stay in the words they were given) ── */

const COPY = {
  en: {
    label: "Testimonials",
    heading: "Trusted by.",
    sub: "What people say about working with Rin.",
    pause: "Pause testimonials",
    play: "Play testimonials",
    show: (name) => `Show testimonial from ${name}`,
  },
  zh: {
    label: "推荐",
    heading: "同事评价。",
    sub: "与 Rin 共事过的人怎么说。",
    pause: "暂停轮播",
    play: "继续轮播",
    show: (name) => `查看 ${name} 的推荐`,
  },
};

/* ── Auto-advancing carousel ──────────────────────────────────────────────── */

// `index` is the homepage's section number ("06"); /about shares this section
// and numbers its own sections, so it passes none and the header shows no index.
export default function TestimonialsSection({ index } = {}) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true); // user's explicit play/pause intent
  const [interacting, setInteracting] = useState(false); // transient pause on hover/focus
  const [reduced, setReduced] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.2 });
  const timerRef = useRef(null);
  const total = TESTIMONIALS.length;
  const { locale = "en-AU" } = useRouter();
  const isZh = locale === "zh-Hans";
  const copy = COPY[isZh ? "zh" : "en"];
  // On /zh-Hans/ the quotes, names and titles stay in English; mark them so.
  const en = isZh ? "en" : undefined;

  // Honour prefers-reduced-motion: no auto-advance, manual controls only.
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setAutoPlay(false);
    }
  }, []);

  // Chained timeout: re-arms after each slide (current in deps), and only while
  // visible, playing, not being read (hover/focus), and motion is allowed. This is
  // the WCAG 2.2.2 pause mechanism, plus a longer dwell so the quotes are readable.
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (inView && autoPlay && !interacting && !reduced && total > 1) {
      timerRef.current = setTimeout(() => setCurrent((c) => (c + 1) % total), 6500);
    }
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [inView, autoPlay, interacting, reduced, total, current]);

  const select = (idx) => setCurrent(idx);

  if (total === 0) return null;

  return (
    <section
      ref={ref}
      id="testimonials"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
      aria-label={copy.label}
      className={`relative scroll-mt-24 ${EDITORIAL}`}
    >
      <SectionHeader index={index} label={copy.label} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-10 md:gap-x-8">
        {/* title — first on every width; five columns below lg so the 48px
            heading stays on one line at tablet widths */}
        <div className="md:col-span-5 lg:col-span-4 md:row-start-1">
          <h2 className="m-0 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-black dark:text-white">
            {copy.heading}
          </h2>
          <p className="text-sm text-[#5A5A5A] dark:text-[#9A9A9A] mt-3 m-0">{copy.sub}</p>
        </div>

        {/* right: the quote, in the editorial face */}
        <div className="md:col-start-6 md:col-span-7 md:row-start-1 md:row-span-2 relative">
          <div className="grid relative z-10">
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={i}
                lang={en}
                className={`[grid-area:1/1] m-0 ${
                  i === current ? "opacity-100 animate-enter-up" : "invisible"
                }`}
              >
                <p className="font-editorial text-xl md:text-2xl font-normal leading-relaxed text-[#1A1A1A] dark:text-[#E0E0E0] m-0 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-5">
                  <div className="w-8 h-8 border border-[#E0E0E0] dark:border-[#3D3D3D] flex items-center justify-center text-[11px] font-mono text-[#5A5A5A] dark:text-[#9A9A9A]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white m-0">
                      {t.linkedIn ? (
                        <a
                          href={t.linkedIn}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-[#C8C8C8] dark:decoration-[#5C5C5C] underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-colors duration-200"
                        >
                          {t.name}
                        </a>
                      ) : (
                        t.name
                      )}
                    </p>
                    <p className="text-xs text-[#3A3A3A] dark:text-[#B4B4B4] m-0">{t.title}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
        {/* named endorsers + play/pause — after the quote on phones, bottom-left on desktop */}
        <div className="md:col-span-5 lg:col-span-4 md:row-start-2 md:self-end">
          {total > 1 && (
            <div>
              {/* named endorser selectors — direct, keyboard-accessible navigation */}
              <ul className="m-0 p-0 list-none border-t border-[#E0E0E0] dark:border-[#3D3D3D]">
                {TESTIMONIALS.map((t, i) => (
                  <li key={i} className="border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
                    <button
                      onClick={() => select(i)}
                      aria-label={copy.show(t.name)}
                      aria-pressed={i === current}
                      className={`w-full flex items-center gap-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                        i === current
                          ? "text-black dark:text-white font-medium"
                          : "text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-[11px] tracking-widest tabular-nums text-[#5A5A5A] dark:text-[#9A9A9A]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span lang={en} className="flex-1">
                        {t.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`w-1.5 h-1.5 ${i === current ? "bg-black dark:bg-white" : "bg-transparent"}`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              {/* counter + play/pause (WCAG 2.2.2: pausable auto-advance) */}
              <div className="flex items-center gap-2 mt-4 font-mono text-[11px] tracking-[0.3em]">
                <span className="text-black dark:text-white">
                  {String(current + 1).padStart(2, "0")}
                </span>
                <span className="text-[#5A5A5A] dark:text-[#9A9A9A]">/</span>
                <span className="text-[#5A5A5A] dark:text-[#9A9A9A]">
                  {String(total).padStart(2, "0")}
                </span>
                {!reduced && (
                  <button
                    onClick={() => setAutoPlay((p) => !p)}
                    aria-label={autoPlay ? copy.pause : copy.play}
                    aria-pressed={!autoPlay}
                    className="group relative ml-3 w-7 h-7 flex items-center justify-center border border-[#D0D0D0] dark:border-[#5C5C5C] text-[#3D3D3D] dark:text-[#B4B4B4] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 before:absolute before:-inset-[9px] before:content-['']"
                  >
                    {autoPlay ? (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <rect x="1.5" y="1" width="2.5" height="8" />
                        <rect x="6" y="1" width="2.5" height="8" />
                      </svg>
                    ) : (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M2 1 L9 5 L2 9 Z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
