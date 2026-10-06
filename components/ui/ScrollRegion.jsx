import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useI18n } from "@/contexts/I18nContext";
import { fill } from "@/lib/fill";

const FADE = "24px";

/**
 * Horizontally scrollable wrapper (charts, tab strips, formulas, wide tables).
 * While its content overflows it fades the clipped edge(s) with a mask, so the
 * cue works in both themes without colour, and (when `focusable`) becomes a
 * named, keyboard-focusable group so arrow keys can scroll it. When nothing
 * overflows it is a plain box: no tab stop, no role, no mask. The first render
 * carries none of these, so server and client markup match.
 *
 * `overlay` renders beside the scroller inside the `relative` wrapper, for
 * hover tooltips that must not be faded or scrolled away.
 *
 * Ported from the COMP90051 coursework ScrollRegion.
 */
export default function ScrollRegion({
  label,
  focusable = true,
  overlay,
  className,
  scrollerClassName,
  children,
}) {
  const { t } = useI18n();
  const ref = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const max = el.scrollWidth - el.clientWidth;
      const left = max > 1 && el.scrollLeft > 1;
      const right = max > 1 && el.scrollLeft < max - 1;
      setEdges((e) => (e.left === left && e.right === right ? e : { left, right }));
    };
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (observer) {
      observer.observe(el);
      for (const child of Array.from(el.children)) observer.observe(child);
    }
    return () => {
      el.removeEventListener("scroll", measure);
      observer?.disconnect();
    };
  }, []);

  const overflowing = edges.left || edges.right;
  const mask = overflowing
    ? `linear-gradient(to right, ${edges.left ? "transparent" : "#000"}, #000 ${
        edges.left ? FADE : "0px"
      }, #000 calc(100% - ${edges.right ? FADE : "0px"}), ${edges.right ? "transparent" : "#000"})`
    : undefined;
  const a11y =
    overflowing && focusable
      ? {
          role: "group",
          tabIndex: 0,
          "aria-label": fill(t("common.scrollsSideways"), { label }),
        }
      : {};

  return (
    <div className={clsx("scroll-region relative", className)}>
      <div
        ref={ref}
        data-scroller=""
        {...a11y}
        className={clsx("overflow-x-auto", scrollerClassName)}
        style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      >
        {children}
      </div>
      {overlay}
    </div>
  );
}
