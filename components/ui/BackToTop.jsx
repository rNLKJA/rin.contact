import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "@/contexts/I18nContext";

/**
 * BackToTop — a small button that appears once the reader has scrolled down a
 * long page and jumps them back to the top. Pairs with the reading-progress bar:
 * the bar says how far you are, this lets you get back. Bottom-right, which is
 * free on the content sub-pages (the homepage's corner toasts/hints live
 * elsewhere, so this is only used on sub-pages).
 *
 * Visibility is toggled by a passive scroll listener that writes opacity/pointer
 * state directly to the node (no React re-render on scroll). Smooth scroll is
 * skipped under prefers-reduced-motion.
 */
export default function BackToTop() {
  const { t } = useI18n();
  const ref = useRef(null);
  const shownRef = useRef(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

    const onScroll = () => {
      const show = window.scrollY > 600;
      if (show === shownRef.current) return;
      shownRef.current = show;
      const el = ref.current;
      if (!el) return;
      el.style.opacity = show ? "1" : "0";
      el.style.transform = show ? "translateY(0)" : "translateY(8px)";
      el.style.pointerEvents = show ? "auto" : "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toTop}
      aria-label={t("common.backToTop")}
      title={t("common.backToTop")}
      style={{ opacity: 0, transform: "translateY(8px)", pointerEvents: "none", transition: "opacity 0.25s ease, transform 0.25s ease, color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease" }}
      className="fixed bottom-6 right-6 z-40 hidden md:flex print:!hidden items-center justify-center w-10 h-10 rounded-full
                 border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#1A1A1A]
                 text-[#595959] dark:text-[#9A9A9A] hover:border-[#FF3C3C] hover:text-[#FF3C3C] shadow-sm"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 11.5V2.5M7 2.5L3 6.5M7 2.5L11 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
