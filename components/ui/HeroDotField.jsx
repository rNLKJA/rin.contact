/**
 * HeroDotField — a faint, still dot-matrix backdrop (Nothing-OS texture).
 *
 * Purely decorative and static: it no longer reacts to the cursor. Rin asked
 * (11 Oct 2026) for the red glow that followed the pointer to go, because it
 * changed the background under the content. Desktop only, pointer-events: none.
 */
export default function HeroDotField() {
  return (
    <div aria-hidden="true" className="hero-dotfield hidden md:block">
      <style jsx>{`
        .hero-dotfield {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          --dot: rgba(0, 0, 0, 0.11);
          background-size: 24px 24px;
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
        :global(.dark) .hero-dotfield {
          --dot: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
