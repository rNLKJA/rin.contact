/**
 * SectionDivider — a dot-matrix HUD rule between homepage sections.
 *
 * Connective tissue in the Nothing-OS register: twin dotted rules that grow
 * outward from a red brand diamond, bracketed by short HUD end-ticks. On scroll
 * into view the rules extend from the centre and the diamond snaps in — a
 * purposeful, CSS-first reveal that gives the long page editorial rhythm and a
 * sense of instrument framing without adding yet another numbered label.
 *
 * Decorative only (aria-hidden, no semantic weight). Theme-aware. Honours
 * prefers-reduced-motion by rendering the final state with no motion.
 */
import { useInView } from "@/hooks/useInView";

export default function SectionDivider() {
  const [ref, inView] = useInView({ threshold: 0.6 });

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-12">
      <div
        ref={ref}
        aria-hidden="true"
        className={`divider relative flex items-center justify-center py-9 md:py-12 ${inView ? "in" : ""}`}
      >
        <span className="endtick" />
        <span className="dline left" />
        <span className="diamond" />
        <span className="dline right" />
        <span className="endtick" />

        <style jsx>{`
          .dline {
            position: relative;
            flex: 1;
            height: 3px;
            background-image: radial-gradient(circle, #d4d4d4 1px, transparent 1.4px);
            background-size: 7px 3px;
            background-repeat: repeat-x;
            background-position: center;
            transform: scaleX(0);
            transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) 0.05s;
          }
          .dline.left {
            transform-origin: right center;
          }
          .dline.right {
            transform-origin: left center;
          }
          .in .dline {
            transform: scaleX(1);
          }

          .diamond {
            flex: 0 0 auto;
            width: 7px;
            height: 7px;
            margin: 0 14px;
            background: #ff3c3c;
            transform: rotate(45deg) scale(0);
            transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) 0.34s;
          }
          .in .diamond {
            transform: rotate(45deg) scale(1);
          }

          .endtick {
            flex: 0 0 auto;
            width: 1px;
            height: 9px;
            background: #cfcfcf;
            opacity: 0;
            transition: opacity 0.4s ease 0.5s;
          }
          .in .endtick {
            opacity: 1;
          }

          :global(.dark) .dline {
            background-image: radial-gradient(circle, #2e2e2e 1px, transparent 1.4px);
          }
          :global(.dark) .endtick {
            background: #3a3a3a;
          }

          @media (prefers-reduced-motion: reduce) {
            .dline,
            .diamond,
            .endtick {
              transition: none;
            }
            .dline {
              transform: scaleX(1);
            }
            .diamond {
              transform: rotate(45deg) scale(1);
            }
            .endtick {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
