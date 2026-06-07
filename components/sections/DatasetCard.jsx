/**
 * DatasetCard — "If I were a dataset"
 *
 * Renders Rin's professional profile in the style of pandas df.info()
 * and df.describe() — a tongue-in-cheek data scientist self-portrait.
 */

import React, { useState } from "react";

const LINE = "─".repeat(64);

const INFO_ROWS = [
  { col: "name",           dtype: "object",  value: `'Sunchuangyu Huang'  # Rin · 黄孙创宇` },
  { col: "location",       dtype: "object",  value: `'Adelaide, SA, Australia'` },
  { col: "age",            dtype: "int64",   value: `26` },
  { col: "languages",      dtype: "object",  value: `['Mandarin', 'English']   # NAATI credentialled` },
  { col: "education",      dtype: "object",  value: `'MDS + BSc (Data Science), Uni Melbourne'` },
  { col: "sectors_worked", dtype: "int64",   value: `6  # gov · research · biotech · climate · health-tech · startup` },
  { col: "certifications", dtype: "int64",   value: `23  # cloud, analytics, agile, language` },
  { col: "current_role",   dtype: "object",  value: `'ASO7 Senior Data Analyst, SAPOL'` },
  { col: "is_founder",     dtype: "bool",    value: `True   # Mapiva, Aug 2025–present` },
  { col: "open_to_collab", dtype: "bool",    value: `True` },
  { col: "outlier",        dtype: "bool",    value: `True   # confirmed ≥ 3σ · see Signal vs Noise below` },
];

const DESCRIBE_ROWS = [
  { metric: "years_experience",   val: "4.0",    note: "since Feb 2022 · no null years" },
  { metric: "career_growth_idx",  val: "5.37×",  note: "vs 2020 baseline (CAGR 32.7%)" },
  { metric: "domain_breadth",     val: "7",      note: "distinct technical skill domains" },
  { metric: "sectors",            val: "6",      note: "unique industry contexts" },
  { metric: "null_values",        val: "0",      note: "no unexplained gaps in the record" },
  { metric: "outlier_flag",       val: "True",   note: "seniority ≥ 3 grades ahead of cohort median" },
  { metric: "growth_trajectory",  val: "∞",      note: "strategic thinking has no upper bound" },
];

const TABS = ["info", "describe"];

export default function DatasetCard() {
  const [tab, setTab] = useState("info");

  return (
    <section className="py-20" aria-label="Profile in data terms">

      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <p className="text-xs tracking-widest uppercase text-[#7A7A7A] mb-1">◈ — If I were a dataset</p>
          <p className="text-[10px] text-[#AAAAAA] font-mono">
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
      <div className="bg-[#0C0C0C] border border-[#232323] overflow-x-auto">

        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#181818]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3C3C] opacity-60" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#222]" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#222]" aria-hidden="true" />
          <span className="ml-3 text-[10px] font-mono text-[#3A3A3A]">
            rin@universe:~$ python3
          </span>
        </div>

        <div className="p-5 font-mono text-xs leading-relaxed">
          <p className="text-[#555] mb-0.5">&gt;&gt;&gt; import rin</p>
          <p className="text-[#555] mb-4">&gt;&gt;&gt; rin.{tab}()</p>

          {/* ── .info() view ──────────────────────────────────────────────── */}
          {tab === "info" && (
            <>
              <p className="text-[#888]">
                RinDataFrame — 1 row × {INFO_ROWS.length} columns
              </p>
              <p className="text-[#2E2E2E] mb-3">{LINE}</p>

              {/* Column headers */}
              <div className="flex gap-4 text-[#454545] mb-1.5 text-[10px]">
                <span className="w-5 flex-shrink-0">#</span>
                <span className="w-36 flex-shrink-0">Column</span>
                <span className="w-14 flex-shrink-0">Dtype</span>
                <span>Value</span>
              </div>
              <p className="text-[#252525] mb-2">{LINE}</p>

              {INFO_ROWS.map((r, i) => (
                <div key={r.col} className="flex gap-4 group hover:bg-[#111] transition-colors px-1 -mx-1">
                  <span className="w-5 flex-shrink-0 text-[#2E2E2E] select-none">{i}</span>
                  <span className="w-36 flex-shrink-0 text-[#686868]">{r.col}</span>
                  <span className="w-14 flex-shrink-0 text-[#494949]">{r.dtype}</span>
                  <span className="text-[#CCCCCC] group-hover:text-white transition-colors">
                    {r.value}
                  </span>
                </div>
              ))}

              <p className="text-[#252525] mt-2 mb-1">{LINE}</p>
              <p className="text-[#444]">dtypes: bool(3), int64(3), object(5)</p>
              <p className="text-[#333]">
                memory_usage:{" "}
                <span className="text-[#555]">
                  not applicable — experience doesn&apos;t compress
                </span>
              </p>
            </>
          )}

          {/* ── .describe() view ──────────────────────────────────────────── */}
          {tab === "describe" && (
            <>
              <p className="text-[#888]">Statistical summary of career metrics:</p>
              <p className="text-[#2E2E2E] mb-3">{LINE}</p>

              <div className="flex gap-4 text-[#454545] mb-1.5 text-[10px]">
                <span className="w-40 flex-shrink-0">metric</span>
                <span className="w-14 flex-shrink-0">value</span>
                <span>note</span>
              </div>
              <p className="text-[#252525] mb-2">{LINE}</p>

              {DESCRIBE_ROWS.map((r) => (
                <div key={r.metric} className="flex gap-4 group hover:bg-[#111] transition-colors px-1 -mx-1">
                  <span className="w-40 flex-shrink-0 text-[#686868]">{r.metric}</span>
                  <span className="w-14 flex-shrink-0 text-[#FF3C3C]">{r.val}</span>
                  <span className="text-[#444] group-hover:text-[#666] transition-colors">
                    # {r.note}
                  </span>
                </div>
              ))}

              <p className="text-[#252525] mt-2 mb-1">{LINE}</p>
              <p className="text-[#333]">
                distribution:{" "}
                <span className="text-[#555]">right-skewed · </span>
                outliers:{" "}
                <span className="text-[#555]">1 confirmed · </span>
                missing_values:{" "}
                <span className="text-[#555]">0</span>
              </p>
            </>
          )}

          {/* Blinking cursor */}
          <p className="text-[#555] mt-4">
            &gt;&gt;&gt; <span className="inline-block w-1.5 h-3 bg-[#555] animate-pulse align-middle" aria-hidden="true" />
          </p>
        </div>
      </div>

      <p className="text-[10px] text-[#B0B0B0] dark:text-[#7A7A7A] mt-2 font-mono leading-relaxed">
        For reference only · self-assessed metrics calibrated against role deliverables ·
        generated with the assistance of an AI tool (Claude · Anthropic)
      </p>
    </section>
  );
}
