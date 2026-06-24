/**
 * StatusBadge — live system status indicator for the hero section.
 * Shows current roles, Adelaide local time, and live weather via wttr.in.
 * Renders client-side only (clock + matchMedia + fetch).
 */
import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";

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

// wttr.in weather codes -> a short, monochrome condition word (no emoji, on-brand)
function weatherWord(code) {
  if (code === 113) return "Clear";
  if (code === 116) return "Part cloud";
  if (code === 119 || code === 122) return "Cloudy";
  if ([143, 248, 260].includes(code)) return "Fog";
  if ([200, 386, 389, 392, 395].includes(code)) return "Storm";
  if ([179, 227, 230, 320, 323, 326, 329, 332, 335, 338, 362, 365, 368, 371, 374, 377].includes(code)) return "Snow";
  if ([182, 185, 281, 284, 311, 314, 317, 350].includes(code)) return "Sleet";
  return "Rain"; // remaining drizzle / rain / shower codes
}

function useAdelaideWeather() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetch("https://wttr.in/Adelaide?format=j1")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const current = data?.current_condition?.[0];
        if (!current) return;
        const tempC = current.temp_C;
        const code  = parseInt(current.weatherCode, 10);
        const word  = weatherWord(code);
        const desc  = current.weatherDesc?.[0]?.value ?? word;
        setWeather({ tempC, word, desc });
      })
      .catch(() => { /* silently fail — weather is a bonus */ });
    return () => { cancelled = true; };
  }, []);
  return weather;
}

const STATUS_KEYS = [
  { dot: "green",  labelKey: "statusBadge.sapol",  subKey: "statusBadge.live" },
  { dot: "red",    labelKey: "statusBadge.mapiva", subKey: "statusBadge.building" },
  { dot: "white",  labelKey: "statusBadge.openToCollab" },
];

// Set NEXT_PUBLIC_AVAILABLE_FOR in .env.local to a comma-separated list
// e.g. NEXT_PUBLIC_AVAILABLE_FOR=Contract,Consulting,Full-time
// If not set, the availability pill does not render.
const AVAILABLE_PILL = process.env.NEXT_PUBLIC_AVAILABLE_FOR || null;

export default function StatusBadge() {
  const { t } = useI18n();
  const time    = useClock();
  const weather = useAdelaideWeather();

  return (
    <div
      className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 border border-[#E8E8E8] dark:border-[#2A2A2A]
                 px-4 py-2 font-mono text-[10px] tracking-wide text-[#595959] dark:text-[#9A9A9A]"
      aria-label={t("statusBadge.label")}
    >
      {STATUS_KEYS.map(({ dot, labelKey, subKey }) => (
        <span key={labelKey} className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              dot === "green" ? "bg-[#22C55E]" :
              dot === "red"   ? "bg-[#FF3C3C]" :
              "border border-[#AAAAAA]"
            }`}
            aria-hidden="true"
          />
          {t(labelKey)}
          {subKey && <span className="text-[#6E6E6E] dark:text-[#9A9A9A]">· {t(subKey)}</span>}
        </span>
      ))}
      {AVAILABLE_PILL && (
        <>
          <span className="text-[#DDDDDD] dark:text-[#3D3D3D]" aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5 text-[#FF3C3C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] animate-blink" aria-hidden="true" />
            {t("statusBadge.availableFor")} {AVAILABLE_PILL}
          </span>
        </>
      )}
      {time && (
        <>
          <span className="text-[#DDDDDD] dark:text-[#3D3D3D]" aria-hidden="true">·</span>
          <span className="text-[#6E6E6E] dark:text-[#9A9A9A]">{t("statusBadge.adl")} {time}</span>
        </>
      )}
      {weather && (
        <>
          <span className="text-[#DDDDDD] dark:text-[#3D3D3D]" aria-hidden="true">·</span>
          <span className="text-[#6E6E6E] dark:text-[#9A9A9A]" title={weather.desc}>
            {weather.tempC}°C {weather.word}
          </span>
        </>
      )}
    </div>
  );
}
