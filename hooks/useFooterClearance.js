import { useEffect, useState } from "react";

/**
 * How far the site footer has scrolled up into the viewport, in px.
 *
 * Fixed bottom-corner widgets add this to their `bottom` offset so they stop at
 * the footer's top edge instead of floating over it. Returns 0 while the footer
 * is below the fold. Pass `deps` (such as the route) so it re-measures when the
 * page underneath changes.
 */
export function useFooterClearance(deps = []) {
  const [clearance, setClearance] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const footer = document.querySelector('footer[role="contentinfo"]');
      const next = footer
        ? Math.max(0, Math.round(window.innerHeight - footer.getBoundingClientRect().top))
        : 0;
      setClearance((prev) => (prev === next ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Late content (images, fonts, lazy sections) can move the footer without a scroll.
    const observer = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
    observer?.observe(document.body);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return clearance;
}
