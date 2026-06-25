/**
 * DatasetCard — "If I were a dataset"
 *
 * Renders Rin's professional profile in the style of pandas df.info()
 * and df.describe() — a tongue-in-cheek data scientist self-portrait.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";

const LINE = "─".repeat(64);

const INFO_ROWS = [
  { col: "name", dtype: "object", value: `'Sunchuangyu Huang'  # Rin · 黄孙创宇` },
  { col: "location", dtype: "object", value: `'Adelaide, SA, Australia'` },
  { col: "age", dtype: "int64", value: `26` },
  { col: "languages", dtype: "object", value: `['Mandarin', 'English']   # NAATI credentialled` },
  { col: "education", dtype: "object", value: `'MDS + BSc (Data Science), Uni Melbourne'` },
  {
    col: "sectors_worked",
    dtype: "int64",
    value: `6  # gov · research · biotech · climate · health-tech · startup`,
  },
  { col: "certifications", dtype: "int64", value: `23  # cloud, analytics, agile, language` },
  { col: "current_role", dtype: "object", value: `'ASO7 Senior Data Analyst, SAPOL'` },
  { col: "is_founder", dtype: "bool", value: `True   # Mapiva, Aug 2025–present` },
  { col: "open_to_collab", dtype: "bool", value: `True` },
  { col: "outlier", dtype: "bool", value: `True   # confirmed ≥ 3σ · see Signal vs Noise below` },
];

const DESCRIBE_ROWS = [
  { metric: "years_experience", val: "4.0", note: "since Feb 2022 · no null years" },
  { metric: "career_growth_idx", val: "5.37×", note: "vs 2020 baseline (CAGR 32.7%)" },
  { metric: "domain_breadth", val: "7", note: "distinct technical skill domains" },
  { metric: "sectors", val: "6", note: "unique industry contexts" },
  { metric: "null_values", val: "0", note: "no unexplained gaps in the record" },
  { metric: "outlier_flag", val: "True", note: "seniority ≥ 3 grades ahead of cohort median" },
  { metric: "growth_trajectory", val: "∞", note: "strategic thinking has no upper bound" },
];

const TABS = ["info", "describe"];

export default function DatasetCard() {
  const [tab, setTab] = useState("info");
  // Stream the output rows in like a live REPL: reset on mount and on every tab
  // switch, then reveal on the next frames so the staggered transition replays.
  // Rows are visible by default (fail-safe: SSR / no-JS / reduced-motion all show the
  // data). On a TAB SWITCH we briefly hide then reveal so the staggered "print"
  // transition replays — the interactive payoff, never required to see the content.
  const [shown, setShown] = useState(true);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setShown(false);
    const id = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(id);
  }, [tab]);

  // Scroll-shadow state. The dataframe is wider than a phone screen, so the witty
  // Value column scrolls off-screen on mobile. Subtle edge fades (matching the
  // terminal background) cue that there is more to read; both auto-hide on desktop
  // where it fits, and once scrolled to the end.
  const scrollRef = useRef(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: true, scrollable: false });
  const updateEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setEdges({
      scrollable: el.scrollWidth > el.clientWidth + 2,
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2,
    });
  }, []);
  useEffect(() => {
    updateEdges();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges, tab]);

  return (
    <section className="py-20" aria-label="Profile in data terms">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-1 font-mono">
            ◈ — If I were a dataset
          </p>
          <p className="text-[10px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
            What does a data scientist look like as data?
          </p>
        </div>
        {/* Tab switcher */}
        <div className="flex border border-[#E0E0E0] dark:border-[#3D3D3D] overflow-hidden font-mono ml-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 text-[10px] tracking-widest uppercase transition-colors ${
                tab === t
                  ? "bg-black text-white"
                  : "text-[#7A7A7A] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A]"
              }`}
            >
              .{t}()
            </button>
          ))}
        </div>
      </div>

      {/* Terminal card */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="bg-[#F5F5F5] dark:bg-[#0C0C0C] border border-[#E0E0E0] dark:border-[#232323] overflow-x-auto"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#E0E0E0] dark:border-[#181818]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3C3C] opacity-60" aria-hidden="true" />
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#DDD] dark:bg-[#222]"
              aria-hidden="true"
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#DDD] dark:bg-[#222]"
              aria-hidden="true"
            />
            <span className="ml-3 text-[10px] font-mono text-[#999] dark:text-[#3A3A3A]">
              rin@universe:~$ python3
            </span>
          </div>

          <div className="p-5 font-mono text-xs leading-relaxed">
            <p className="text-[#888] dark:text-[#555] mb-0.5">&gt;&gt;&gt; import rin</p>
            <p className="text-[#888] dark:text-[#555] mb-4">&gt;&gt;&gt; rin.{tab}()</p>

            {/* ── .info() view ──────────────────────────────────────────────── */}
            {tab === "info" && (
              <>
                <p className="text-[#777] dark:text-[#888]">
                  RinDataFrame — 1 row × {INFO_ROWS.length} columns
                </p>
                <p className="text-[#CCC] dark:text-[#2E2E2E] mb-3">{LINE}</p>

                {/* Column headers */}
                <div className="flex gap-4 text-[#777] dark:text-[#454545] mb-1.5 text-[10px]">
                  <span className="w-5 flex-shrink-0">#</span>
                  <span className="w-36 flex-shrink-0">Column</span>
                  <span className="w-14 flex-shrink-0">Dtype</span>
                  <span>Value</span>
                </div>
                <p className="text-[#DDD] dark:text-[#252525] mb-2">{LINE}</p>

                {INFO_ROWS.map((r, i) => (
                  <div
                    key={r.col}
                    className="flex gap-4 group hover:bg-[#E8E8E8] dark:hover:bg-[#111] px-1 -mx-1"
                    style={{
                      opacity: shown ? 1 : 0,
                      transform: shown ? "none" : "translateY(3px)",
                      transition: `opacity 0.3s ease ${i * 30}ms, transform 0.3s ease ${i * 30}ms, background-color 0.15s`,
                    }}
                  >
                    <span className="w-5 flex-shrink-0 text-[#AAA] dark:text-[#2E2E2E] select-none">
                      {i}
                    </span>
                    <span className="w-36 flex-shrink-0 text-[#888] dark:text-[#686868]">
                      {r.col}
                    </span>
                    <span className="w-14 flex-shrink-0 text-[#888] dark:text-[#494949]">
                      {r.dtype}
                    </span>
                    <span className="flex-shrink-0 whitespace-nowrap text-[#333] dark:text-[#CCCCCC] group-hover:text-black dark:group-hover:text-white transition-colors">
                      {r.value}
                    </span>
                  </div>
                ))}

                <p className="text-[#DDD] dark:text-[#252525] mt-2 mb-1">{LINE}</p>
                <p className="text-[#888] dark:text-[#444]">dtypes: bool(3), int64(3), object(5)</p>
                <p className="text-[#999] dark:text-[#333]">
                  memory_usage:{" "}
                  <span className="text-[#777] dark:text-[#555]">
                    not applicable — experience doesn&apos;t compress
                  </span>
                </p>
              </>
            )}

            {/* ── .describe() view ──────────────────────────────────────────── */}
            {tab === "describe" && (
              <>
                <p className="text-[#777] dark:text-[#888]">
                  Statistical summary of career metrics:
                </p>
                <p className="text-[#CCC] dark:text-[#2E2E2E] mb-3">{LINE}</p>

                <div className="flex gap-4 text-[#777] dark:text-[#454545] mb-1.5 text-[10px]">
                  <span className="w-40 flex-shrink-0">metric</span>
                  <span className="w-14 flex-shrink-0">value</span>
                  <span>note</span>
                </div>
                <p className="text-[#DDD] dark:text-[#252525] mb-2">{LINE}</p>

                {DESCRIBE_ROWS.map((r, i) => (
                  <div
                    key={r.metric}
                    className="flex gap-4 group hover:bg-[#E8E8E8] dark:hover:bg-[#111] px-1 -mx-1"
                    style={{
                      opacity: shown ? 1 : 0,
                      transform: shown ? "none" : "translateY(3px)",
                      transition: `opacity 0.3s ease ${i * 36}ms, transform 0.3s ease ${i * 36}ms, background-color 0.15s`,
                    }}
                  >
                    <span className="w-40 flex-shrink-0 text-[#888] dark:text-[#686868]">
                      {r.metric}
                    </span>
                    <span className="w-14 flex-shrink-0 text-[#FF3C3C]">{r.val}</span>
                    <span className="flex-shrink-0 whitespace-nowrap text-[#777] dark:text-[#444] group-hover:text-[#999] dark:group-hover:text-[#666] transition-colors">
                      # {r.note}
                    </span>
                  </div>
                ))}

                <p className="text-[#DDD] dark:text-[#252525] mt-2 mb-1">{LINE}</p>
                <p className="text-[#999] dark:text-[#333]">
                  distribution:{" "}
                  <span className="text-[#777] dark:text-[#555]">right-skewed · </span>
                  outliers: <span className="text-[#777] dark:text-[#555]">1 confirmed · </span>
                  missing_values: <span className="text-[#777] dark:text-[#555]">0</span>
                </p>
              </>
            )}

            {/* Blinking cursor */}
            <p className="text-[#888] dark:text-[#555] mt-4">
              &gt;&gt;&gt;{" "}
              <span
                className="inline-block w-1.5 h-3 bg-[#999] dark:bg-[#555] animate-pulse align-middle"
                aria-hidden="true"
              />
            </p>
          </div>
        </div>

        {/* Edge fades — cue that the dataframe scrolls to reveal the Value column.
           Matched to the terminal background so they read as a soft mask. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F5F5F5] dark:from-[#0C0C0C] to-transparent transition-opacity duration-300 ${
            edges.scrollable && !edges.atStart ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#F5F5F5] dark:from-[#0C0C0C] to-transparent transition-opacity duration-300 ${
            edges.scrollable && !edges.atEnd ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <p className="text-[10px] text-[#6E6E6E] dark:text-[#9A9A9A] mt-2 font-mono leading-relaxed">
        For reference only · self-assessed metrics calibrated against role deliverables · generated
        with the assistance of an AI tool (Claude · Anthropic)
      </p>
    </section>
  );
}
