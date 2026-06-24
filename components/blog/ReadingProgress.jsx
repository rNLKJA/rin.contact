import React, { useEffect, useRef } from "react";

/**
 * ReadingProgress — a thin accent line at the very top of the viewport that
 * fills left-to-right as the reader moves through a post. On a long analytical
 * piece it answers the unspoken "how much more is there?" and gives a quiet
 * sense of momentum, which keeps people reading to the end.
 *
 * Implementation follows the project's modern-web-guidance: the fill is a
 * CSS scroll-driven animation (animation-timeline: scroll()) animating only
 * transform: scaleX(), so it runs on the compositor with zero scroll-handler
 * cost in Chrome, Edge and Safari 26+. Firefox (no support) gets a small
 * rAF-throttled JS fallback. Both paths respect prefers-reduced-motion: a
 * reduced-motion reader simply sees no bar (it stays at scaleX(0)).
 *
 * The element is decorative (the post text is the real content), so it is
 * aria-hidden and adds nothing to the assistive-technology reading order.
 */
export default function ReadingProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    // Native CSS scroll-timeline handles supporting browsers — and already
    // respects reduced-motion via the @media guard below — so do nothing here.
    const supportsScrollTimeline =
      typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline", "scroll()");
    if (supportsScrollTimeline) return;

    // Firefox fallback. Stay consistent with the CSS path: no bar under
    // reduced-motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="reading-progress" aria-hidden="true" />
      <style jsx>{`
        .reading-progress {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 2.5px;
          z-index: 55; /* above the sticky header (z-50), below the mobile menu toggle (z-60) */
          background: linear-gradient(90deg, #ff3c3c, #ff5c5c);
          transform: scaleX(0);
          transform-origin: 0 50%;
          will-change: transform;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: no-preference) {
          @supports (animation-timeline: scroll()) {
            @keyframes reading-progress-grow {
              from {
                transform: scaleX(0);
              }
              to {
                transform: scaleX(1);
              }
            }
            .reading-progress {
              animation: reading-progress-grow auto linear;
              /* declared after the shorthand so it is not reset */
              animation-timeline: scroll(root block);
            }
          }
        }
      `}</style>
    </>
  );
}
