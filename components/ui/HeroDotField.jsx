/**
 * HeroDotField — interactive Nothing-OS dot-matrix backdrop for the hero.
 *
 * A faint dot grid sits behind the hero; a red copy of the grid is revealed only
 * under the cursor via a mask "spotlight", so the dots glow red where you point —
 * the same dot-matrix language as the boot screen. Desktop only (no hover on
 * touch, protects mobile LCP). Pointer position drives two CSS vars, throttled to
 * one update per frame; the glow layer is a single compositor-friendly mask.
 */
import { useEffect, useRef } from "react";

export default function HeroDotField() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = el.parentElement;
    if (!parent) return;

    let raf = null;
    let x = 0;
    let y = 0;

    const apply = () => {
      raf = null;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };

    const onMove = (e) => {
      const r = parent.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      el.style.setProperty("--active", "1");
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => el.style.setProperty("--active", "0");

    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="hero-dotfield hidden md:block">
      <div className="hero-dotfield-base" />
      <div className="hero-dotfield-glow" />
      <style jsx>{`
        .hero-dotfield {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          --mx: 50%;
          --my: 38%;
          --active: 0;
          --dot: rgba(0, 0, 0, 0.11);
        }
        :global(.dark) .hero-dotfield {
          --dot: rgba(255, 255, 255, 0.1);
        }
        .hero-dotfield-base,
        .hero-dotfield-glow {
          position: absolute;
          inset: 0;
          background-size: 24px 24px;
        }
        .hero-dotfield-base {
          background-image: radial-gradient(var(--dot) 1.3px, transparent 1.8px);
          -webkit-mask-image: radial-gradient(
            circle at 60% 40%,
            #000 0%,
            rgba(0, 0, 0, 0.55) 55%,
            transparent 85%
          );
          mask-image: radial-gradient(
            circle at 60% 40%,
            #000 0%,
            rgba(0, 0, 0, 0.55) 55%,
            transparent 85%
          );
        }
        .hero-dotfield-glow {
          background-color: rgba(255, 60, 60, 0.05);
          background-image: radial-gradient(#ff3c3c 1.7px, transparent 2.2px);
          -webkit-mask-image: radial-gradient(
            230px circle at var(--mx) var(--my),
            #000 0%,
            rgba(0, 0, 0, 0.55) 42%,
            transparent 72%
          );
          mask-image: radial-gradient(
            230px circle at var(--mx) var(--my),
            #000 0%,
            rgba(0, 0, 0, 0.55) 42%,
            transparent 72%
          );
          opacity: var(--active);
          transition: opacity 0.45s ease;
        }
      `}</style>
    </div>
  );
}
