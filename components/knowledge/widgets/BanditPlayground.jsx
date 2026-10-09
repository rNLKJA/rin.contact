/**
 * BanditPlayground: the "Try it" widget on /knowledge/notes/exploration-vs-exploitation.
 *
 * Greedy, ε-greedy and UCB1 play the same four-armed bandit (made-up means,
 * 20 seeded runs, see ./bandit-sim.js). The chart shows mean cumulative
 * regret by round. The table underneath is the same result as numbers: each
 * algorithm's share of pulls per arm and its regret at the chosen round.
 *
 * Accessibility: every control is native (range inputs, buttons, a checkbox)
 * or the site's Segmented radiogroup, so it all works from the keyboard. The
 * "read at round" slider is the keyboard twin of hovering the chart. A polite
 * live region sums up the result in one or two sentences after each change.
 * Lines differ by dash and direct label as well as colour. Nothing animates
 * apart from 150ms colour and width transitions, which switch off under
 * prefers-reduced-motion.
 *
 * Strings come in through `copy` from the note's content module, so the
 * widget holds no language of its own.
 */
import { useEffect, useId, useMemo, useRef, useState } from "react";
import Segmented from "@/components/ui/Segmented";
import ScrollRegion from "@/components/ui/ScrollRegion";
import { fill } from "@/lib/fill";
import { ALGOS, ARMS, RUNS, simulate } from "./bandit-sim";

const DEFAULTS = { seed: 7, epsilon: 0.1, c: 0.5, horizon: 500 };
const HORIZONS = [100, 500, 2000];
const ARM_NAMES = ["A", "B", "C", "D"];
const HEIGHT = 260;
const M = { top: 24, right: 72, bottom: 34, left: 40 };

// Series styles: UCB1 is the highlighted series, ε-greedy the solid
// comparison and greedy the dashed baseline. Text labels use ink tokens
// that pass 4.5:1, so the red line's label is the darker accent ink.
const SERIES = {
  ucb: { line: "text-[#FF3C3C]", label: "fill-accent-ink", dash: undefined },
  eps: {
    line: "text-[#1A1A1A] dark:text-[#CFCFCF]",
    label: "fill-[#1A1A1A] dark:fill-[#E8E8E8]",
    dash: undefined,
  },
  greedy: {
    line: "text-[#8A8A8A] dark:text-[#7A7A7A]",
    label: "fill-[#6E6E6E] dark:fill-[#9A9A9A]",
    dash: "5 4",
  },
};

const LABEL = "font-mono text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const BTN =
  "inline-flex items-center justify-center min-h-[36px] px-3 border border-[#E0E0E0] dark:border-[#3D3D3D] font-mono text-[10px] tracking-widest uppercase text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-black dark:hover:border-white transition-colors duration-150 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
// The table sits inside .prose, so the site's table rules in globals.css give
// it the black header and footer rules, row dividers and row hover. These
// classes only tighten the padding and give the row headers the same lines.
const CELL = "!px-1.5 !py-2";
const ROW_HEAD =
  "text-left font-normal whitespace-nowrap text-[#1A1A1A] dark:text-white border-b border-[var(--divider)] group-last:border-[var(--black)] group-hover:bg-[var(--surface)]";
const RANGE =
  "w-full accent-[#FF3C3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";

/** Round to a "nice" tick step (1, 2 or 5 times a power of ten). */
function niceStep(raw) {
  const p = 10 ** Math.floor(Math.log10(raw || 1));
  const f = raw / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}

/** Push end labels apart so they never overlap (min gap in px). */
function spreadLabels(items, gap, min, max) {
  const sorted = [...items].sort((a, b) => a.y - b.y);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].y - sorted[i - 1].y < gap) sorted[i].y = sorted[i - 1].y + gap;
  }
  const overflow = sorted.length ? sorted[sorted.length - 1].y - max : 0;
  if (overflow > 0) sorted.forEach((s) => (s.y -= overflow));
  sorted.forEach((s) => (s.y = Math.max(min, s.y)));
  return sorted;
}

function Slider({ id, label, value, display, min, max, step, onChange }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <label htmlFor={id} className="text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]">
          {label}
        </label>
        <output
          htmlFor={id}
          className="font-mono text-[12px] tabular-nums text-black dark:text-white"
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={RANGE}
      />
    </div>
  );
}

function LegendSwatch({ algo }) {
  const s = SERIES[algo];
  return (
    <svg width="24" height="8" aria-hidden="true" className={s.line}>
      <line
        x1="0"
        y1="4"
        x2="24"
        y2="4"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={s.dash}
      />
    </svg>
  );
}

export default function BanditPlayground({ copy, locale = "en-AU" }) {
  const uid = useId();
  const [seed, setSeed] = useState(DEFAULTS.seed);
  const [epsilon, setEpsilon] = useState(DEFAULTS.epsilon);
  const [c, setC] = useState(DEFAULTS.c);
  const [horizon, setHorizon] = useState(DEFAULTS.horizon);
  const [round, setRound] = useState(DEFAULTS.horizon);
  const [hoverRound, setHoverRound] = useState(null);
  const [reveal, setReveal] = useState(false);
  const [width, setWidth] = useState(600);
  const boxRef = useRef(null);

  // Fit the chart to its column so the 10px labels stay 10px on a phone.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const measure = () => {
      const w = Math.round(el.getBoundingClientRect().width);
      if (w > 0) setWidth(w);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sim = useMemo(() => simulate({ seed, epsilon, c, horizon }), [seed, epsilon, c, horizon]);
  const t = Math.min(round, horizon);
  const shownT = hoverRound ?? t;
  const nf1 = useMemo(
    () => new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    [locale]
  );
  const nf0 = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  // ── Geometry ──────────────────────────────────────────────────────────────
  const plotW = Math.max(120, width - M.left - M.right);
  const plotH = HEIGHT - M.top - M.bottom;
  const yTop = Math.max(...ALGOS.map((a) => sim.results[a].regret[horizon]), 1);
  const yStep = niceStep(yTop / 4);
  const yMax = Math.ceil((yTop * 1.05) / yStep) * yStep;
  const x = (r) => M.left + (r / horizon) * plotW;
  const y = (v) => M.top + plotH - (v / yMax) * plotH;
  const xStep = niceStep(horizon / 4);
  const xTicks = [];
  for (let r = 0; r <= horizon; r += xStep) xTicks.push(r);
  const yTicks = [];
  for (let v = 0; v <= yMax + 1e-9; v += yStep) yTicks.push(v);

  // At most about 320 points per line, so a 2,000-round run stays light.
  const stride = Math.max(1, Math.floor(horizon / 320));
  const paths = {};
  for (const algo of ALGOS) {
    const reg = sim.results[algo].regret;
    let d = `M${x(0).toFixed(1)},${y(0).toFixed(1)}`;
    for (let r = stride; r <= horizon; r += stride) {
      d += `L${x(r).toFixed(1)},${y(reg[r]).toFixed(1)}`;
    }
    if (horizon % stride) d += `L${x(horizon).toFixed(1)},${y(reg[horizon]).toFixed(1)}`;
    paths[algo] = d;
  }

  const endLabels = spreadLabels(
    ALGOS.map((algo) => ({ algo, y: y(sim.results[algo].regret[horizon]) + 3.5 })),
    13,
    M.top + 4,
    M.top + plotH + 3.5
  );

  const onPointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    const r = Math.round(((px - M.left) / plotW) * horizon);
    setHoverRound(Math.max(1, Math.min(horizon, r)));
  };

  // ── Numbers for the table, tooltip and summary ───────────────────────────
  const regretAt = (algo, r) => sim.results[algo].regret[r];
  const shareAt = (algo, arm, r) => (r > 0 ? sim.results[algo].pulls[r * ARMS + arm] / r : 0);
  const pct = (v) => `${nf0.format(Math.round(v * 100))}%`;

  const summaryVars = {
    t: nf0.format(t),
    runs: RUNS,
    ucb: nf1.format(regretAt("ucb", t)),
    eps: nf1.format(regretAt("eps", t)),
    greedy: nf1.format(regretAt("greedy", t)),
    best: ARM_NAMES[sim.best],
    ucbShare: pct(shareAt("ucb", sim.best, t)),
    epsShare: pct(shareAt("eps", sim.best, t)),
    greedyShare: pct(shareAt("greedy", sim.best, t)),
  };
  // Chinese sentences run on without a space.
  const summary = [
    fill(copy.summary, summaryVars),
    fill(reveal ? copy.summaryBest : copy.summaryHidden, summaryVars),
  ].join(locale === "zh-Hans" ? "" : " ");

  const tipW = 128;
  const tipH = 70;
  const tipX = x(shownT) + 10 + tipW > width - 4 ? x(shownT) - 10 - tipW : x(shownT) + 10;

  const reset = () => {
    setSeed(DEFAULTS.seed);
    setEpsilon(DEFAULTS.epsilon);
    setC(DEFAULTS.c);
    setHorizon(DEFAULTS.horizon);
    setRound(DEFAULTS.horizon);
    setReveal(false);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Slider
          id={`${uid}-eps`}
          label={copy.epsilon}
          value={epsilon}
          display={epsilon.toFixed(2)}
          min={0}
          max={0.3}
          step={0.01}
          onChange={setEpsilon}
        />
        <Slider
          id={`${uid}-c`}
          label={copy.c}
          value={c}
          display={c.toFixed(1)}
          min={0}
          max={3}
          step={0.1}
          onChange={setC}
        />
      </div>

      <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
        <div>
          <p id={`${uid}-h`} className={`${LABEL} mb-1.5`}>
            {copy.rounds}
          </p>
          <Segmented
            labelledBy={`${uid}-h`}
            options={HORIZONS.map((h) => ({ value: h, label: nf0.format(h) }))}
            value={horizon}
            onChange={(h) => {
              setHorizon(h);
              setRound(h);
            }}
            size="sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={BTN} onClick={() => setSeed((s) => s + 1)}>
            {copy.newArms}
          </button>
          <button type="button" className={BTN} onClick={reset}>
            {copy.reset}
          </button>
          <span className="font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] tabular-nums">
            {fill(copy.seed, { seed })}
          </span>
        </div>
        <label className="flex items-center gap-2 min-h-[36px] text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF] cursor-pointer">
          <input
            type="checkbox"
            checked={reveal}
            onChange={(e) => setReveal(e.target.checked)}
            className="h-4 w-4 accent-[#FF3C3C]"
          />
          {copy.reveal}
        </label>
      </div>

      {/* Chart */}
      <div>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 mb-2" aria-label={copy.legend}>
          {ALGOS.map((algo) => (
            <li
              key={algo}
              className="flex items-center gap-2 text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]"
            >
              <LegendSwatch algo={algo} />
              {copy.algos[algo]}
            </li>
          ))}
        </ul>
        <div ref={boxRef} className="w-full" style={{ minHeight: HEIGHT }}>
          <svg
            width={width}
            height={HEIGHT}
            viewBox={`0 0 ${width} ${HEIGHT}`}
            role="img"
            aria-label={fill(copy.chartLabel, summaryVars)}
            className="block max-w-full touch-pan-y select-none"
            onPointerMove={onPointer}
            onPointerDown={onPointer}
            onPointerLeave={() => setHoverRound(null)}
          >
            {/* grid + y ticks */}
            {yTicks.map((v) => (
              <g key={`y${v}`}>
                <line
                  x1={M.left}
                  x2={M.left + plotW}
                  y1={y(v)}
                  y2={y(v)}
                  className="stroke-[#EDEDED] dark:stroke-[#1F1F1F]"
                />
                <text
                  x={M.left - 6}
                  y={y(v) + 3.5}
                  textAnchor="end"
                  className="font-mono text-[10px] fill-[#6E6E6E] dark:fill-[#9A9A9A] tabular-nums"
                >
                  {nf0.format(v)}
                </text>
              </g>
            ))}
            {/* x ticks */}
            {xTicks.map((r) => (
              <text
                key={`x${r}`}
                x={x(r)}
                y={M.top + plotH + 16}
                textAnchor={r === 0 ? "start" : "middle"}
                className="font-mono text-[10px] fill-[#6E6E6E] dark:fill-[#9A9A9A] tabular-nums"
              >
                {nf0.format(r)}
              </text>
            ))}
            <line
              x1={M.left}
              x2={M.left + plotW}
              y1={M.top + plotH}
              y2={M.top + plotH}
              className="stroke-[#BDBDBD] dark:stroke-[#3D3D3D]"
            />
            <text
              x={M.left}
              y={12}
              className="font-mono text-[10px] tracking-widest uppercase fill-[#6E6E6E] dark:fill-[#9A9A9A]"
            >
              {copy.yAxis}
            </text>
            <text
              x={M.left + plotW}
              y={HEIGHT - 4}
              textAnchor="end"
              className="font-mono text-[10px] tracking-widest uppercase fill-[#6E6E6E] dark:fill-[#9A9A9A]"
            >
              {copy.xAxis}
            </text>

            {/* series, baseline first so UCB1 draws on top */}
            {[...ALGOS].reverse().map((algo) => (
              <path
                key={algo}
                d={paths[algo]}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={SERIES[algo].dash}
                className={SERIES[algo].line}
              />
            ))}

            {/* direct labels at the line ends */}
            {endLabels.map(({ algo, y: ly }) => (
              <text
                key={`l${algo}`}
                x={M.left + plotW + 6}
                y={ly}
                className={`font-mono text-[10px] ${SERIES[algo].label}`}
              >
                {copy.algos[algo]}
              </text>
            ))}

            {/* crosshair at the round being read */}
            <line
              x1={x(shownT)}
              x2={x(shownT)}
              y1={M.top}
              y2={M.top + plotH}
              className="stroke-[#9A9A9A] dark:stroke-[#6E6E6E]"
              strokeDasharray="2 3"
            />
            {ALGOS.map((algo) => (
              <circle
                key={`d${algo}`}
                cx={x(shownT)}
                cy={y(regretAt(algo, shownT))}
                r="4"
                fill="currentColor"
                strokeWidth="2"
                className={`${SERIES[algo].line} stroke-white dark:stroke-[#0D0D0D]`}
              />
            ))}
            {hoverRound !== null && (
              <g aria-hidden="true">
                <rect
                  x={tipX}
                  y={M.top}
                  width={tipW}
                  height={tipH}
                  className="fill-white dark:fill-[#141414] stroke-[#E0E0E0] dark:stroke-[#3D3D3D]"
                />
                <text
                  x={tipX + 8}
                  y={M.top + 15}
                  className="font-mono text-[10px] fill-[#3D3D3D] dark:fill-[#CFCFCF]"
                >
                  {fill(copy.tipRound, { t: nf0.format(shownT) })}
                </text>
                {ALGOS.map((algo, i) => (
                  <text
                    key={`t${algo}`}
                    x={tipX + 8}
                    y={M.top + 31 + i * 13}
                    className={`font-mono text-[10px] ${SERIES[algo].label}`}
                  >
                    {copy.algos[algo]} {nf1.format(regretAt(algo, shownT))}
                  </text>
                ))}
              </g>
            )}
          </svg>
        </div>
      </div>

      <Slider
        id={`${uid}-t`}
        label={copy.readAt}
        value={t}
        display={nf0.format(t)}
        min={1}
        max={horizon}
        step={1}
        onChange={(v) => {
          setRound(v);
          setHoverRound(null);
        }}
      />

      {/* The same result as a table */}
      <ScrollRegion label={copy.tableCaption} fade="16px">
        <table className="w-full min-w-[300px] border-collapse text-[12px]">
          <caption className="text-left mb-2 text-[12px] text-[#6E6E6E] dark:text-[#9A9A9A] [text-wrap:pretty]">
            {fill(copy.tableCaption, { t: nf0.format(shownT), runs: RUNS })}
          </caption>
          <thead>
            <tr>
              <th scope="col" className={`${LABEL} ${CELL} !pl-0 text-left font-normal`}>
                {copy.colAlgo}
              </th>
              {ARM_NAMES.map((name, a) => (
                <th
                  key={name}
                  scope="col"
                  className={`${LABEL} ${CELL} text-left font-normal align-bottom`}
                >
                  {fill(copy.colArm, { arm: name })}
                  <span className="block normal-case tracking-normal tabular-nums text-[11px] text-[#3D3D3D] dark:text-[#CFCFCF]">
                    {reveal ? `μ ${sim.means[a].toFixed(2)}` : "μ ?"}
                    {reveal && a === sim.best && (
                      <span className="ml-1 text-accent-ink">{copy.bestTag}</span>
                    )}
                  </span>
                </th>
              ))}
              <th scope="col" className={`${LABEL} ${CELL} !pr-0 text-right font-normal`}>
                {copy.colRegret}
              </th>
            </tr>
          </thead>
          <tbody>
            {ALGOS.map((algo) => (
              <tr key={algo} className="group">
                <th scope="row" className={`${ROW_HEAD} ${CELL} !pl-0`}>
                  {copy.algos[algo]}
                </th>
                {ARM_NAMES.map((name, a) => {
                  const share = shareAt(algo, a, shownT);
                  return (
                    <td key={name} className={`${CELL} align-top`}>
                      <span className="block font-mono tabular-nums text-[#3D3D3D] dark:text-[#CFCFCF]">
                        {pct(share)}
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 block h-1 bg-[#F0F0F0] dark:bg-[#1F1F1F]"
                      >
                        <span
                          className={`block h-1 transition-[width] duration-150 motion-reduce:transition-none ${
                            reveal && a === sim.best
                              ? "bg-[#FF3C3C]"
                              : "bg-[#3D3D3D] dark:bg-[#AAAAAA]"
                          }`}
                          style={{ width: `${Math.round(share * 100)}%` }}
                        />
                      </span>
                    </td>
                  );
                })}
                <td
                  className={`${CELL} !pr-0 text-right font-mono tabular-nums !text-[#1A1A1A] dark:!text-white`}
                >
                  {nf1.format(regretAt(algo, shownT))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>

      <p
        aria-live="polite"
        className="text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#CFCFCF] [text-wrap:pretty]"
      >
        {summary}
      </p>
    </div>
  );
}
