/**
 * ScrollCue — a fixed "scroll" affordance anchored to the viewport bottom.
 *
 * Signals there is more below (counters the false-bottom problem) and doubles as
 * a jump-to-content link. Fades out the moment the visitor starts scrolling — its
 * job is done once they are moving. Desktop only; honours prefers-reduced-motion
 * by holding the dot still.
 */
import { useEffect, useState } from "react";

export default function ScrollCue() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#featured"
      aria-label="Scroll to featured work"
      className={`hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex-col items-center gap-2 group
                  transition-opacity duration-500 ${hidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <span className="text-[9px] tracking-[0.3em] uppercase text-[#6E6E6E] dark:text-[#9A9A9A] group-hover:text-[#FF3C3C] transition-colors duration-200">
        Scroll
      </span>
      <span className="relative block w-px h-10 bg-[#D8D8D8] dark:bg-[#3D3D3D] overflow-hidden">
        <span className="scroll-cue-dot absolute left-1/2 top-0 w-1 h-1 rounded-full bg-[#FF3C3C]" />
      </span>
      <style jsx>{`
        .scroll-cue-dot {
          animation: scroll-cue 1.9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes scroll-cue {
          0% { transform: translate(-50%, -3px); opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: translate(-50%, 38px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-cue-dot { animation: none; transform: translate(-50%, 17px); opacity: 1; }
        }
      `}</style>
    </a>
  );
}
