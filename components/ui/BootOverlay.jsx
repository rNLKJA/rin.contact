/**
 * BootOverlay — Terminal-style boot sequence for first load
 * Shows on first visit per session; ~0.8s sequence then fades out.
 * Reduced from 2.2s for better LCP/TTI. FibonacciFlower skipped on mobile.
 */
import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import FibonacciFlower from "./FibonacciFlower";

const LS_KEY = "rin_boot_seen";

export default function BootOverlay() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const BOOT_LINES = [
    { delay: 0, text: `[ 0.0s] ${t("bootOverlay.line1")}` },
    { delay: 120, text: `[ 0.1s] ${t("bootOverlay.line2")}` },
    { delay: 280, text: `[ 0.3s] ${t("bootOverlay.line3")}` },
    { delay: 480, text: `[ 0.5s] ${t("bootOverlay.line4")}` },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(LS_KEY);
    if (seen) return;

    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    setVisible(true);
    const timers = BOOT_LINES.map(({ delay, text }) =>
      setTimeout(() => setLines((prev) => [...prev, text]), delay)
    );

    const doneTimer = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem(LS_KEY, "1");
      setTimeout(() => setVisible(false), 400);
    }, 800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black flex flex-col justify-end px-6 pb-12 font-mono
                 transition-opacity duration-500 ${done ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ fontFamily: "'Courier New', monospace" }}
      aria-hidden="true"
    >
      {/* Fibonacci flower — top centre, desktop only to save GPU */}
      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#22C55E] opacity-20">
          <FibonacciFlower size={140} animate />
        </div>
      )}

      <div className="max-w-md relative z-10">
        {lines.map((text, i) => (
          <p
            key={i}
            className="text-[11px] text-[#22C55E] leading-relaxed"
            style={{
              animation: "boot-line 0.15s ease-out both",
            }}
          >
            {text}
          </p>
        ))}
        {done && (
          <p
            className="text-[10px] text-[#555] mt-4"
            style={{ animation: "fade-in 0.3s ease-out both" }}
          >
            {t("bootOverlay.prompt")}
          </p>
        )}
      </div>
      <style jsx>{`
        @keyframes boot-line {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
