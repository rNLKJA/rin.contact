/**
 * PositioningStatement — the thesis band, placed right after the hero.
 *
 * States Rin's real LinkedIn positioning line as one editorial statement: four
 * clauses stacked and revealed line by line on scroll, the first three in grey
 * and the last in full ink. The shared section header carries the three domains
 * on its right; the gloss sits on the right half of the 12-column grid.
 * Identity (hero) -> thesis (here) -> proof (Featured). No red: nothing here is
 * live.
 *
 * Content is pulled verbatim from the career profile / LinkedIn line; nothing is
 * invented. Localised (en-AU + zh-Hans). Theme-aware, reduced-motion safe.
 */
import { useI18n } from "@/contexts/I18nContext";
import { useInView } from "@/hooks/useInView";
import { SectionHeader, EDITORIAL } from "@/components/home/SectionHeader";

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
    <section aria-label="Positioning" className={`relative ${EDITORIAL}`}>
      <div ref={ref} className={`relative ${inView ? "in" : ""}`}>
        <SectionHeader
          index="02"
          label={eyebrow}
          aside={
            <span className="flex items-center gap-2 tracking-widest uppercase">
              {safeDomains.map((d, i) => (
                <span key={d} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {d}
                </span>
              ))}
            </span>
          }
        />

        {/* statement — full measure; the earlier clauses recede, the last one lands */}
        <h2
          className="statement m-0 font-semibold tracking-tight text-black dark:text-white"
          style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.5rem)", lineHeight: 1.06 }}
        >
          {safeLines.map((ln, i) => (
            <span
              key={i}
              className={`line block ${
                i === safeLines.length - 1
                  ? "text-black dark:text-white"
                  : "text-[#6B6B6B] dark:text-[#8A8A8A]"
              }`}
              style={{ "--i": i }}
            >
              {ln}
            </span>
          ))}
        </h2>

        {/* gloss — on the right half of the 12-column grid, so the band reads as
            one composition rather than a left column with an empty right. */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-8 mt-8 md:mt-10">
          <p
            className="gloss md:col-start-7 md:col-span-6 max-w-xl m-0 text-base md:text-lg font-light leading-relaxed text-[#333333] dark:text-[#B4B4B4]"
            style={{ "--i": safeLines.length }}
          >
            {gloss}
          </p>
        </div>
      </div>

      <style jsx>{`
        /* Motion rules: a 5px settle that finishes within 300ms of the reveal
           (200ms + a stagger capped at 100ms). Opacity stays at 1 so the grey
           clauses keep their contrast before the band scrolls into view. */
        .line,
        .gloss {
          transform: translateY(5px);
        }
        .in .line,
        .in .gloss {
          transform: translateY(0);
          transition: transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1);
          transition-delay: min(calc(var(--i) * 30ms), 100ms);
        }
        @media (prefers-reduced-motion: reduce) {
          .line,
          .gloss {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
