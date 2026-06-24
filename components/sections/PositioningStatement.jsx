/**
 * PositioningStatement — the thesis band, placed right after the hero.
 *
 * States Rin's real LinkedIn positioning line as an oversized, authoritative
 * editorial statement: four clauses stacked and revealed line by line on scroll,
 * the final clause carrying the brand red. An asymmetric eyebrow row (red square
 * dot + label + hairline + the three parallel domains) and HUD corner-ticks frame
 * the block like an instrument readout, with a faint dot-matrix panel behind for
 * depth. Identity (hero) -> thesis (here) -> proof (Featured).
 *
 * Content is pulled verbatim from the career profile / LinkedIn line; nothing is
 * invented. Localised (en-AU + zh-Hans). Theme-aware, reduced-motion safe.
 */
import { useI18n } from "@/contexts/I18nContext";
import { useInView } from "@/hooks/useInView";

export default function PositioningStatement() {
  const { t } = useI18n();
  const eyebrow = t("positioning.eyebrow");
  const gloss = t("positioning.gloss");
  const lines = t("positioning.lines");
  const domains = t("positioning.domains");
  const safeLines = Array.isArray(lines) ? lines : [];
  const safeDomains = Array.isArray(domains) ? domains : [];

  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section aria-label="Positioning" className="relative py-24 md:py-32 overflow-hidden">
      {/* depth — faint dot-matrix panel bleeding off the right edge */}
      <div
        aria-hidden="true"
        className="dot-matrix pointer-events-none absolute right-[-60px] top-1/2 -translate-y-1/2 w-[440px] h-[440px] opacity-[0.05] md:opacity-[0.08]"
      />

      <div ref={ref} className={`relative ${inView ? "in" : ""}`}>
        {/* eyebrow row — asymmetric: label left, domains far right, hairline between */}
        <div className="flex items-center gap-3 mb-9 md:mb-12">
          <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B6B6B] dark:text-[#9A9A9A] whitespace-nowrap">
            {eyebrow}
          </span>
          <span className="hidden md:block flex-1 h-px bg-[#E5E5E5] dark:bg-[#262626]" aria-hidden="true" />
          <span className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
            {safeDomains.map((d, i) => (
              <span key={d} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#FF3C3C]" aria-hidden="true">·</span>}
                {d}
              </span>
            ))}
          </span>
        </div>

        {/* statement — HUD-framed, oversized, line-by-line reveal */}
        <div className="statement relative inline-block">
          <span className="hud-tick tl" aria-hidden="true" />
          <span className="hud-tick br" aria-hidden="true" />
          <h2
            className="font-semibold tracking-tight text-black dark:text-white"
            style={{ fontSize: "clamp(2.1rem, 6.4vw, 5rem)", lineHeight: 1.0 }}
          >
            {safeLines.map((ln, i) => (
              <span
                key={i}
                className={`line block ${i === safeLines.length - 1 ? "text-[#FF3C3C] dark:text-[#FF5C5C]" : ""}`}
                style={{ "--i": i }}
              >
                {ln}
              </span>
            ))}
          </h2>
        </div>

        {/* gloss — faithful operating-principle line */}
        <p
          className="gloss mt-9 md:mt-12 max-w-2xl text-base md:text-lg font-light leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]"
          style={{ "--i": safeLines.length }}
        >
          {gloss}
        </p>
      </div>

      <style jsx>{`
        .line,
        .gloss {
          opacity: 0;
          transform: translateY(18px);
        }
        .in .line,
        .in .gloss {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: calc(var(--i) * 110ms);
        }
        .hud-tick {
          position: absolute;
          width: 14px;
          height: 14px;
          opacity: 0;
        }
        .hud-tick.tl {
          top: -16px;
          left: -14px;
          border-top: 2px solid #ff3c3c;
          border-left: 2px solid #ff3c3c;
        }
        .hud-tick.br {
          bottom: -16px;
          right: -14px;
          border-bottom: 2px solid #ff3c3c;
          border-right: 2px solid #ff3c3c;
        }
        .in .hud-tick {
          opacity: 1;
          transition: opacity 0.5s ease 0.45s;
        }
        @media (prefers-reduced-motion: reduce) {
          .line,
          .gloss,
          .hud-tick {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
