/**
 * SyntheticGenerators: the "Try it" widget on /knowledge/notes/synthetic-data.
 *
 * One made-up "real" dataset (100 rows, three clusters) and three generators
 * that learn from it (./synthetic-sim.js). The scatter shows real rows as
 * rings and synthetic rows as dots. The table scores the synthetic rows and a
 * fresh real sample on the same three checks, so every score has a baseline.
 *
 * Accessibility: native controls and the site's Segmented radiogroup, so it
 * all works from the keyboard. The chart has a text label with the scores and
 * the table repeats them. A polite live region sums up each change. Nothing
 * moves, so there is nothing to switch off for reduced motion.
 *
 * Strings come in through `copy` from the note's content module.
 */
import { useId, useMemo, useState } from "react";
import Segmented from "@/components/ui/Segmented";
import ScrollRegion from "@/components/ui/ScrollRegion";
import { fill } from "@/lib/fill";
import { BTN, LABEL, SEED, SUMMARY, Slider } from "./controls";
import { GRID, METHODS, run } from "./synthetic-sim";

const DEFAULTS = { method: "normal", sigma: 0.05, seed: 1 };
const SIZE = 300;
const PAD = 12;
const LO = -1.15;
const HI = 1.15;
const CELL = "!px-2 !py-2";

const sx = (v) => PAD + ((v - LO) / (HI - LO)) * (SIZE - 2 * PAD);
const sy = (v) => SIZE - PAD - ((v - LO) / (HI - LO)) * (SIZE - 2 * PAD);

export default function SyntheticGenerators({ copy, locale = "en-AU" }) {
  const uid = useId();
  const [method, setMethod] = useState(DEFAULTS.method);
  const [sigma, setSigma] = useState(DEFAULTS.sigma);
  const [seed, setSeed] = useState(DEFAULTS.seed);

  const res = useMemo(() => run({ method, sigma, seed }), [method, sigma, seed]);
  const nf2 = useMemo(
    () => new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [locale]
  );
  const nf3 = useMemo(
    () => new Intl.NumberFormat(locale, { minimumFractionDigits: 3, maximumFractionDigits: 3 }),
    [locale]
  );

  const { holdout, synth } = res;
  const gapVerdict = synth.gap <= holdout.gap * 1.25 + 0.03 ? copy.gapClose : copy.gapFar;
  const nearVerdict =
    synth.nearest < holdout.nearest * 0.75
      ? copy.nearTooClose
      : synth.nearest > holdout.nearest * 1.5
        ? copy.nearFar
        : copy.nearSame;
  const vars = {
    method: copy.methods[method],
    r: nf2.format(synth.r),
    realR: nf2.format(res.realR),
    gap: nf2.format(synth.gap),
    baseGap: nf2.format(holdout.gap),
    near: nf3.format(synth.nearest),
    baseNear: nf3.format(holdout.nearest),
    copies: synth.copies,
  };
  const summary = [
    fill(copy.summary, vars),
    fill(gapVerdict, vars),
    fill(nearVerdict, vars),
    synth.copies > 0 ? fill(copy.copiesNote, vars) : "",
  ]
    .filter(Boolean)
    .join(locale === "zh-Hans" ? "" : " ");

  const gridLines = Array.from({ length: GRID + 1 }, (_, i) => -1 + (2 * i) / GRID);

  const rows = [
    { key: "holdout", label: copy.rowHoldout, s: holdout },
    { key: "synth", label: fill(copy.rowSynth, vars), s: synth },
  ];

  return (
    <div data-widget className="space-y-6">
      <div className="space-y-4">
        <div>
          <p id={`${uid}-m`} className={`${LABEL} mb-1.5`}>
            {copy.generator}
          </p>
          <Segmented
            labelledBy={`${uid}-m`}
            options={METHODS.map((m) => ({ value: m, label: copy.methods[m] }))}
            value={method}
            onChange={setMethod}
            size="sm"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
          <Slider
            id={`${uid}-s`}
            label={copy.sigma}
            value={sigma}
            display={nf2.format(sigma)}
            min={0}
            max={0.3}
            step={0.01}
            onChange={setSigma}
            disabled={method !== "copy"}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={BTN} onClick={() => setSeed((s) => s + 1)}>
              {copy.newData}
            </button>
            <button
              type="button"
              className={BTN}
              onClick={() => {
                setMethod(DEFAULTS.method);
                setSigma(DEFAULTS.sigma);
                setSeed(DEFAULTS.seed);
              }}
            >
              {copy.reset}
            </button>
            <span className={SEED}>{fill(copy.seed, { seed })}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:items-start">
        <div>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 mb-2" aria-label={copy.legend}>
            <li className="flex items-center gap-2 text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]">
              <svg width="10" height="10" aria-hidden="true">
                <circle
                  cx="5"
                  cy="5"
                  r="3.5"
                  fill="none"
                  strokeWidth="1.2"
                  className="stroke-[#6E6E6E] dark:stroke-[#9A9A9A]"
                />
              </svg>
              {copy.realRows}
            </li>
            <li className="flex items-center gap-2 text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]">
              <svg width="10" height="10" aria-hidden="true">
                <circle cx="5" cy="5" r="3" className="fill-[#CC0000] dark:fill-[#FF3C3C]" />
              </svg>
              {copy.synthRows}
            </li>
          </ul>
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            role="img"
            aria-label={fill(copy.chartLabel, vars)}
            className="block w-full max-w-[300px] h-auto"
          >
            {gridLines.map((g) => (
              <g key={g}>
                <line
                  x1={sx(g)}
                  x2={sx(g)}
                  y1={sy(-1)}
                  y2={sy(1)}
                  className="stroke-[#EDEDED] dark:stroke-[#1F1F1F]"
                />
                <line
                  x1={sx(-1)}
                  x2={sx(1)}
                  y1={sy(g)}
                  y2={sy(g)}
                  className="stroke-[#EDEDED] dark:stroke-[#1F1F1F]"
                />
              </g>
            ))}
            {res.real.map(([x, y], i) => (
              <circle
                key={`r${i}`}
                cx={sx(x)}
                cy={sy(y)}
                r="3.6"
                fill="none"
                strokeWidth="1"
                className="stroke-[#8A8A8A] dark:stroke-[#7A7A7A]"
              />
            ))}
            {res.synthetic.map(([x, y], i) => (
              <circle
                key={`s${i}`}
                cx={sx(x)}
                cy={sy(y)}
                r="2.4"
                className="fill-[#CC0000] dark:fill-[#FF3C3C]"
              />
            ))}
          </svg>
          <p className="mt-2 text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A]">
            {fill(copy.gridNote, { grid: GRID })}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]">
            {fill(copy.realLine, vars)}
          </p>
          <p aria-live="polite" className={SUMMARY}>
            {summary}
          </p>
        </div>
      </div>

      <ScrollRegion label={copy.tableCaption} fade="16px">
        <table className="w-full min-w-[300px] border-collapse text-[12px]">
          <caption className="text-left mb-2 text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A] [text-wrap:pretty]">
            {copy.tableCaption}
          </caption>
          <thead>
            <tr>
              <th scope="col" className={`${LABEL} ${CELL} !pl-0 text-left font-normal`}>
                {copy.colRows}
              </th>
              <th scope="col" className={`${LABEL} ${CELL} text-right font-normal`}>
                {copy.colR}
              </th>
              <th scope="col" className={`${LABEL} ${CELL} text-right font-normal`}>
                {copy.colGap}
              </th>
              <th scope="col" className={`${LABEL} ${CELL} text-right font-normal`}>
                {copy.colNear}
              </th>
              <th scope="col" className={`${LABEL} ${CELL} !pr-0 text-right font-normal`}>
                {copy.colCopies}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, label, s }) => (
              <tr key={key}>
                <th
                  scope="row"
                  className={`${CELL} !pl-0 text-left font-normal text-[#1A1A1A] dark:text-white`}
                >
                  {label}
                </th>
                <td className={`${CELL} text-right font-mono tabular-nums`}>{nf2.format(s.r)}</td>
                <td className={`${CELL} text-right font-mono tabular-nums`}>{nf2.format(s.gap)}</td>
                <td className={`${CELL} text-right font-mono tabular-nums`}>
                  {nf3.format(s.nearest)}
                </td>
                <td className={`${CELL} !pr-0 text-right font-mono tabular-nums`}>{s.copies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>
    </div>
  );
}
