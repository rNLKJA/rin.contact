/**
 * StatusBadge — live system status indicator for the hero section.
 * Shows current roles, build status, and Adelaide local time.
 * Renders client-side only (clock + matchMedia).
 */
import { useState, useEffect } from "react";

const ADL_TZ = "Australia/Adelaide";

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-AU", {
        timeZone: ADL_TZ,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const STATUSES = [
  { dot: "green",  label: "SAPOL ASO7",  sub: "Live" },
  { dot: "red",    label: "Mapiva",      sub: "Building" },
  { dot: "white",  label: "Open to collab" },
];

export default function StatusBadge() {
  const time = useClock();

  return (
    <div
      className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 border border-[#E8E8E8]
                 px-4 py-2 font-mono text-[10px] tracking-wide text-[#595959]"
      aria-label="Current status"
    >
      {STATUSES.map(({ dot, label, sub }) => (
        <span key={label} className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              dot === "green" ? "bg-[#22C55E]" :
              dot === "red"   ? "bg-[#FF3C3C]" :
              "border border-[#AAAAAA]"
            }`}
            aria-hidden="true"
          />
          {label}
          {sub && <span className="text-[#AAAAAA]">· {sub}</span>}
        </span>
      ))}
      {time && (
        <>
          <span className="text-[#DDDDDD]" aria-hidden="true">·</span>
          <span className="text-[#AAAAAA]">ADL {time}</span>
        </>
      )}
    </div>
  );
}
