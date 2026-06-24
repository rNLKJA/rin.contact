/**
 * HeroInteractHint — a first-visit signifier for the reactive hero canvas.
 *
 * The hero's dot-matrix surface responds to the cursor, but an interactive
 * surface with no signifier is invisible to most visitors. This is a small,
 * once-per-session onboarding cue: a miniature 3x3 dot grid that pulses red from
 * its centre — a literal small-scale preview of the field reacting — beside a
 * one-line prompt. It reveals after the boot settles and dismisses the instant
 * the visitor moves their cursor (the exact interaction it is teaching), or after
 * a short timeout. Desktop only; honours prefers-reduced-motion by holding the
 * grid still. pointer-events: none — purely a cue, never blocks interaction.
 */
import { useEffect, useState } from "react";

const SEEN_KEY = "rin_hero_hint_seen";
const REVEAL_MS = 1400;   // let the boot overlay clear first
const GRACE_MS = 700;     // guarantee a brief moment on screen before move-dismiss
const AUTO_MS = 7000;     // fall back to auto-dismiss if the cursor never moves

// 3x3 grid; Chebyshev distance from centre drives the ripple delay (centre first).
const DOTS = [
  [0, 0], [1, 0], [2, 0],
  [0, 1], [1, 1], [2, 1],
  [0, 2], [1, 2], [2, 2],
];

export default function HeroInteractHint() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    // Skip on touch / no-hover devices and when reduced data isn't the issue —
    // the cue only makes sense where a cursor exists.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let revealedAt = 0;
    const revealTimer = setTimeout(() => {
      if (window.scrollY > 60) return; // already past the hero — cue is moot
      revealedAt = performance.now();
      setShown(true);
    }, REVEAL_MS);

    let dismissed = false;
    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      setShown(false);
    };
    const onMove = () => {
      if (!revealedAt || performance.now() - revealedAt < GRACE_MS) return;
      dismiss();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    const autoTimer = setTimeout(dismiss, REVEAL_MS + AUTO_MS);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(autoTimer);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-3 pointer-events-none
                  transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}
    >
      <span className="hint-grid" role="presentation">
        {DOTS.map(([cx, cy], i) => {
          const ring = Math.max(Math.abs(cx - 1), Math.abs(cy - 1)); // 0 centre, 1 outer
          return <span key={i} className="hint-dot" style={{ "--ring": ring }} />;
        })}
      </span>
      <span className="text-[10px] tracking-[0.25em] uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
        Move your cursor
        <span className="text-[#FF3C3C]"> — the field reacts</span>
      </span>

      <style jsx>{`
        .hint-grid {
          display: grid;
          grid-template-columns: repeat(3, 4px);
          grid-template-rows: repeat(3, 4px);
          gap: 4px;
        }
        .hint-dot {
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #c8c8c8;
          transform: scale(1);
          animation: hint-pulse 2.4s ease-in-out infinite;
          animation-delay: calc(var(--ring) * 0.22s);
        }
        :global(.dark) .hint-dot {
          background: #3d3d3d;
        }
        @keyframes hint-pulse {
          0%, 100% {
            transform: scale(1);
            background: #c8c8c8;
          }
          28% {
            transform: scale(1.9);
            background: #ff3c3c;
          }
          60% {
            transform: scale(1);
            background: #c8c8c8;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hint-dot {
            animation: none;
          }
          .hint-dot:nth-child(5) {
            background: #ff3c3c;
          }
        }
      `}</style>
    </div>
  );
}
