/**
 * BootOverlay — Terminal-style boot sequence for first load
 * Shows on first visit per session; ~2s sequence then fades out.
 */
import { useState, useEffect } from "react";

const BOOT_LINES = [
  { t: 0, text: "[ 0.0s] Booting rin.contact..." },
  { t: 300, text: "[ 0.3s] Loading Bitcount font..." },
  { t: 600, text: "[ 0.6s] Initialising components..." },
  { t: 900, text: "[ 0.9s] Mounting layout..." },
  { t: 1200, text: "[ 1.2s] Parsing career data..." },
  { t: 1500, text: "[ 1.5s] Ready." },
];

const LS_KEY = "rin_boot_seen";

export default function BootOverlay() {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(LS_KEY);
    if (seen) return;

    setVisible(true);
    const timers = BOOT_LINES.map(({ t, text }) =>
      setTimeout(() => setLines((prev) => [...prev, text]), t)
    );

    const doneTimer = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem(LS_KEY, "1");
      setTimeout(() => setVisible(false), 500);
    }, 2200);

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
      <div className="max-w-md">
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
            Press any key to continue... (or just wait)
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
