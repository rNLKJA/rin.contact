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

// wttr.in weather codes → minimal emoji
const WEATHER_ICON = {
  113: "☀️", 116: "⛅", 119: "☁️", 122: "☁️",
  143: "🌫️", 176: "🌦️", 179: "🌨️", 182: "🌧️",
  185: "🌧️", 200: "⛈️", 227: "❄️", 230: "❄️",
  248: "🌫️", 260: "🌫️", 263: "🌦️", 266: "🌦️",
  281: "🌧️", 284: "🌧️", 293: "🌦️", 296: "🌦️",
  299: "🌧️", 302: "🌧️", 305: "🌧️", 308: "🌧️",
  311: "🌧️", 314: "🌧️", 317: "🌨️", 320: "🌨️",
  323: "🌨️", 326: "🌨️", 329: "❄️", 332: "❄️",
  335: "❄️", 338: "❄️", 350: "🌧️", 353: "🌦️",
  356: "🌧️", 359: "🌧️", 362: "🌨️", 365: "🌨️",
  368: "🌨️", 371: "❄️", 374: "🌨️", 377: "🌨️",
  386: "⛈️", 389: "⛈️", 392: "⛈️", 395: "❄️",
};

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
        const tempC   = current.temp_C;
        const code    = parseInt(current.weatherCode, 10);
        const icon    = WEATHER_ICON[code] ?? "🌡️";
        const desc    = current.weatherDesc?.[0]?.value ?? "";
        setWeather({ tempC, icon, desc });
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
      className="inline-flex flex-wrap items-center gap-x-4 gap-y-1.5 border border-[#E8E8E8]
                 px-4 py-2 font-mono text-[10px] tracking-wide text-[#595959]"
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
          {subKey && <span className="text-[#AAAAAA]">· {t(subKey)}</span>}
        </span>
      ))}
      {AVAILABLE_PILL && (
        <>
          <span className="text-[#DDDDDD]" aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5 text-[#FF3C3C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] animate-blink" aria-hidden="true" />
            {t("statusBadge.availableFor")} {AVAILABLE_PILL}
          </span>
        </>
      )}
      {time && (
        <>
          <span className="text-[#DDDDDD]" aria-hidden="true">·</span>
          <span className="text-[#AAAAAA]">{t("statusBadge.adl")} {time}</span>
        </>
      )}
      {weather && (
        <>
          <span className="text-[#DDDDDD]" aria-hidden="true">·</span>
          <span className="text-[#AAAAAA]" title={weather.desc}>
            {weather.icon} {weather.tempC}°C
          </span>
        </>
      )}
    </div>
  );
}
