/**
 * ReportingDemo: the concept demo on /projects/professional-standards-reporting.
 * Two parts behind a tablist: a quarterly report built from synthetic counts
 * (QuarterlyReport) and a toy API client over a synthetic catalogue
 * (ApiClient). Both run entirely in the browser on seeded synthetic data, and
 * the frame says so on screen, together with a line saying it is a concept
 * illustration and not the real system.
 *
 * Tabs follow the WAI-ARIA pattern: one tab stop, arrow keys and Home/End move
 * between tabs, and both panels stay mounted (the hidden one with `hidden`), so
 * switching parts keeps what the visitor set up. Nothing animates.
 */
import { useId, useRef, useState } from "react";
import { DEMO } from "@/lib/demos/professional-standards-reporting-data";
import ApiClient from "./ApiClient";
import QuarterlyReport from "./QuarterlyReport";
import { FOCUS, META } from "./ui";

const TABS = ["report", "api"];

export default function ReportingDemo({ lang = "en" }) {
  const L = (o) => o[lang];
  const uid = useId();
  const [active, setActive] = useState("report");
  const refs = useRef({});

  const onKeyDown = (e) => {
    const i = TABS.indexOf(active);
    const next = {
      ArrowRight: (i + 1) % TABS.length,
      ArrowLeft: (i - 1 + TABS.length) % TABS.length,
      Home: 0,
      End: TABS.length - 1,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(TABS[next]);
    refs.current[TABS[next]]?.focus();
  };

  return (
    <div className="pixel-frame border-2 border-[#1A1A1A] dark:border-[#EEEEEE] bg-white dark:bg-[#0A0A0A] min-w-0">
      {/* Frame bar: what this is, on screen at all times */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-2 border-[#1A1A1A] dark:border-[#EEEEEE] px-4 py-3">
        <p className={`${META} font-mono flex items-center gap-2`}>
          <span className="w-1.5 h-1.5 bg-[#FF3C3C]" aria-hidden="true" />
          {L(DEMO.synthetic)}
        </p>
        <p className={`${META} font-mono`}>{L(DEMO.conceptOnly)}</p>
      </div>

      <div className="px-4 pt-4 md:px-6 md:pt-5">
        <div
          role="tablist"
          aria-label={L(DEMO.tabsLabel)}
          className="flex flex-wrap gap-1.5"
          onKeyDown={onKeyDown}
        >
          {TABS.map((id, i) => {
            const on = id === active;
            return (
              <button
                key={id}
                ref={(el) => {
                  refs.current[id] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${id}`}
                aria-selected={on}
                aria-controls={`${uid}-panel-${id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(id)}
                className={`inline-flex items-center gap-2 min-h-[40px] rounded-full border px-4 text-xs tracking-widest uppercase transition-colors duration-150 motion-reduce:transition-none ${FOCUS} ${
                  on
                    ? "border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-black"
                    : "border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE]"
                }`}
              >
                <span className="font-mono" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {L(DEMO.tabs[id])}
              </button>
            );
          })}
        </div>
      </div>

      {TABS.map((id) => (
        <div
          key={id}
          role="tabpanel"
          id={`${uid}-panel-${id}`}
          aria-labelledby={`${uid}-tab-${id}`}
          hidden={id !== active}
          className="px-4 py-5 md:px-6 md:py-6 min-w-0"
        >
          {id === "report" ? <QuarterlyReport lang={lang} /> : <ApiClient lang={lang} />}
        </div>
      ))}
    </div>
  );
}
