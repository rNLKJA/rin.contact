/**
 * StatusBadge — the status line inside the "Worked with" band on the homepage.
 * Shows current roles, availability, Adelaide local time, and live weather via
 * wttr.in. The clock and weather are client-only and fill in after mount.
 */
import { Fragment, useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { AVAILABLE_FOR } from "@/lib/public-env";

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
  if (
    [179, 227, 230, 320, 323, 326, 329, 332, 335, 338, 362, 365, 368, 371, 374, 377].includes(code)
  )
    return "Snow";
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
        const code = parseInt(current.weatherCode, 10);
        const word = weatherWord(code);
        const desc = current.weatherDesc?.[0]?.value ?? word;
        setWeather({ tempC, word, desc });
      })
      .catch(() => {
        /* silently fail — weather is a bonus */
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return weather;
}

// Dot rule: a filled red dot means live or current; a hollow grey ring means
// anything else.
const STATUS_KEYS = [
  { live: true, labelKey: "statusBadge.sapol", subKey: "statusBadge.live" },
  { live: true, labelKey: "statusBadge.mapiva", subKey: "statusBadge.building" },
  { live: false, labelKey: "statusBadge.openToCollab" },
];

// NEXT_PUBLIC_AVAILABLE_FOR (comma-separated) is cleaned in lib/public-env, so a
// value pasted with its key ("NEXT_PUBLIC_AVAILABLE_FOR=...") never renders raw.
// If it is not set, the availability item does not render.

function Sep() {
  return (
    <span aria-hidden="true" className="mx-2.5 text-[#C8C8C8] dark:text-[#3D3D3D]">
      /
    </span>
  );
}

/**
 * One line of status in the same anatomy as the "Worked with" strip: mono text,
 * items separated by a light slash, no box. Safe to server-render: the clock and
 * the weather fill in after mount, at the end of the line.
 */
export default function StatusBadge() {
  const { t } = useI18n();
  const time = useClock();
  const weather = useAdelaideWeather();

  const items = [
    ...STATUS_KEYS.map(({ live, labelKey, subKey }) => (
      <>
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full align-middle mr-2 -mt-px ${
            live ? "bg-[#FF3C3C]" : "border border-[#8A8A8A]"
          }`}
          aria-hidden="true"
        />
        {t(labelKey)}
        {subKey && <> · {t(subKey)}</>}
      </>
    )),
    AVAILABLE_FOR.length > 0 && (
      <>
        {t("statusBadge.availableFor")} {AVAILABLE_FOR.join(", ")}
      </>
    ),
    time && (
      <>
        {t("statusBadge.adl")} {time}
      </>
    ),
    weather && (
      <span title={weather.desc}>
        {weather.tempC}°C {weather.word}
      </span>
    ),
  ].filter(Boolean);

  // Each item stays whole with its trailing slash; lines wrap between items.
  return (
    <span>
      {items.map((node, i) => (
        <Fragment key={i}>
          <span className="whitespace-nowrap">
            {node}
            {i < items.length - 1 && <Sep />}
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}
