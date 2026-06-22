/**
 * ReadingToast — appears after the user scrolls past `threshold` (0–1) of the page.
 * Shown once per session; dismiss is permanent for that tab.
 */
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/contexts/I18nContext";

export default function ReadingToast({ threshold = 0.65 }) {
  const { t } = useI18n();
  const [shown,     setShown]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [visible,   setVisible]   = useState(false);

  const dismissNow = useCallback(() => {
    setVisible(false);
    setTimeout(() => setDismissed(true), 250);
  }, []);

  const onScroll = useCallback(() => {
    if (dismissed) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    if (!shown && pct >= threshold) {
      setShown(true);
      setVisible(true);
    }
    // Once the contact/footer is reached the nudge is redundant and would
    // overlap the footer — retire it.
    if (shown && pct >= 0.93) dismissNow();
  }, [shown, dismissed, threshold, dismissNow]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  if (dismissed || !shown) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-4 z-[999] max-w-[220px] border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#1A1A1A] p-4
                  transition-all duration-250 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <button
        onClick={dismissNow}
        aria-label={t("readingToast.dismiss")}
        className="absolute top-2 right-2 text-[#CCCCCC] hover:text-black dark:hover:text-white transition-colors text-xs leading-none"
      >
        ✕
      </button>
      <p className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed pr-3">
        {t("readingToast.message")}
      </p>
      <Link
        href="/#contact"
        onClick={dismissNow}
        className="inline-block mt-2.5 text-[10px] tracking-widest uppercase border-b border-black dark:border-white text-black dark:text-white
                   hover:text-[#FF3C3C] hover:border-[#FF3C3C] dark:hover:text-[#FF3C3C] dark:hover:border-[#FF3C3C] transition-colors"
      >
        Get in touch →
      </Link>
    </div>
  );
}
