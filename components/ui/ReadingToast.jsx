/**
 * ReadingToast — appears after the user scrolls past `threshold` (0–1) of the page.
 * Shown once per session; dismiss is permanent for that tab.
 */
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function ReadingToast({ threshold = 0.65 }) {
  const [shown,     setShown]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [visible,   setVisible]   = useState(false);

  const onScroll = useCallback(() => {
    if (shown || dismissed) return;
    const max  = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = max > 0 ? window.scrollY / max : 0;
    if (pct >= threshold) {
      setShown(true);
      setVisible(true);
    }
  }, [shown, dismissed, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => setDismissed(true), 250);
  }, []);

  if (dismissed || !shown) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-4 z-30 max-w-[220px] border border-[#E0E0E0] bg-white p-4
                  transition-all duration-250 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute top-2 right-2 text-[#CCCCCC] hover:text-black transition-colors text-xs leading-none"
      >
        ✕
      </button>
      <p className="text-xs text-[#3D3D3D] leading-relaxed pr-3">
        You&apos;ve read this far — why not say hello?
      </p>
      <Link
        href="/#contact"
        onClick={dismiss}
        className="inline-block mt-2.5 text-[10px] tracking-widest uppercase border-b border-black text-black
                   hover:text-[#FF3C3C] hover:border-[#FF3C3C] transition-colors"
      >
        Get in touch →
      </Link>
    </div>
  );
}
