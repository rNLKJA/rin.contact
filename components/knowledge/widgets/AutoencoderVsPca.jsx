/**
 * AutoencoderVsPca: the "Try it" widget on /knowledge/notes/autoencoders-vs-pca.
 *
 * 80 seeded points along a bendable curve are squeezed to one number and
 * rebuilt two ways (./autoencoder-sim.js): one-component PCA, the dashed
 * line, and a small autoencoder trained in the browser, the red curve. The
 * table gives each method's reconstruction error on the training points and
 * on fresh points from the same process.
 *
 * Accessibility: native controls and the site's Segmented radiogroup, so it
 * all works from the keyboard. The chart's text label carries the numbers,
 * the table repeats them and a polite live region sums up each change.
 * Nothing animates, so there is nothing to switch off for reduced motion.
 *
 * Strings come in through `copy` from the note's content module.
 */
import { useId, useMemo, useState } from "react";
import Segmented from "@/components/ui/Segmented";
import ScrollRegion from "@/components/ui/ScrollRegion";
import { fill } from "@/lib/fill";
import { BTN, LABEL, SEED, SUMMARY, Slider } from "./controls";
import { N_POINTS, compare } from "./autoencoder-sim";

const DEFAULTS = { curve: 1, noise: 0.05, seed: 1, activation: "tanh", errors: "none" };
const W = 320;
const H = 230;
const PAD = 10;
const X0 = -1.45;
const X1 = 1.45;
const Y0 = -0.95;
const Y1 = 1.35;
const CELL = "!px-2 !py-2";

const px = (v) => PAD + ((v - X0) / (X1 - X0)) * (W - 2 * PAD);
const py = (v) => H - PAD - ((v - Y0) / (Y1 - Y0)) * (H - 2 * PAD);

/** The PCA line through the mean, clipped to the plot box. */
function pcaSegment(mean, dir) {
  const ts = [];
  if (Math.abs(dir[0]) > 1e-9) ts.push((X0 - mean[0]) / dir[0], (X1 - mean[0]) / dir[0]);
  if (Math.abs(dir[1]) > 1e-9) ts.push((Y0 - mean[1]) / dir[1], (Y1 - mean[1]) / dir[1]);
  const inside = ts
    .map((t) => [mean[0] + t * dir[0], mean[1] + t * dir[1], t])
    .filter(([x, y]) => x >= X0 - 1e-6 && x <= X1 + 1e-6 && y >= Y0 - 1e-6 && y <= Y1 + 1e-6)
    .sort((a, b) => a[2] - b[2]);
  if (inside.length < 2) return null;
  return [inside[0], inside[inside.length - 1]];
}

export default function AutoencoderVsPca({ copy, locale = "en-AU" }) {
  const uid = useId();
  const [curve, setCurve] = useState(DEFAULTS.curve);
  const [noise, setNoise] = useState(DEFAULTS.noise);
  const [seed, setSeed] = useState(DEFAULTS.seed);
  const [activation, setActivation] = useState(DEFAULTS.activation);
  const [errors, setErrors] = useState(DEFAULTS.errors);

  const res = useMemo(
    () => compare({ curve, noise, seed, activation }),
    [curve, noise, seed, activation]
  );
  const nf2 = useMemo(
    () => new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [locale]
  );
  const nf4 = useMemo(
    () => new Intl.NumberFormat(locale, { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
    [locale]
  );
  const pct = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }),
    [locale]
  );

  const seg = pcaSegment(res.pca.mean, res.pca.dir);
  const curvePath = res.ae.curve
    .map(([x, y], i) => `${i ? "L" : "M"}${px(x).toFixed(1)},${py(y).toFixed(1)}`)
    .join("");

  const vars = {
    n: N_POINTS,
    act: copy.activations[activation],
    share: pct.format(res.pca.share),
    pcaTrain: nf4.format(res.pca.trainErr),
    pcaFresh: nf4.format(res.pca.freshErr),
    aeTrain: nf4.format(res.ae.trainErr),
    aeFresh: nf4.format(res.ae.freshErr),
  };
  const ratio = res.ae.freshErr / (res.pca.freshErr || 1e-12);
  const verdict = ratio < 0.8 ? copy.aeWins : ratio > 1.2 ? copy.pcaWins : copy.tie;
  const overfit =
    res.ae.trainErr < res.pca.trainErr && res.ae.freshErr > res.pca.freshErr ? copy.overfit : "";
  const summary = [fill(copy.summary, vars), fill(verdict, vars), overfit]
    .filter(Boolean)
    .join(locale === "zh-Hans" ? "" : " ");

  const reset = () => {
    setCurve(DEFAULTS.curve);
    setNoise(DEFAULTS.noise);
    setSeed(DEFAULTS.seed);
    setActivation(DEFAULTS.activation);
    setErrors(DEFAULTS.errors);
  };

  const rows = [
    { key: "pca", label: copy.rowPca, train: res.pca.trainErr, fresh: res.pca.freshErr },
    {
      key: "ae",
      label: fill(copy.rowAe, vars),
      train: res.ae.trainErr,
      fresh: res.ae.freshErr,
    },
  ];

  return (
    <div data-widget className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Slider
          id={`${uid}-c`}
          label={copy.curve}
          value={curve}
          display={nf2.format(curve)}
          min={0}
          max={1.5}
          step={0.05}
          onChange={setCurve}
        />
        <Slider
          id={`${uid}-n`}
          label={copy.noise}
          value={noise}
          display={nf2.format(noise)}
          min={0}
          max={0.2}
          step={0.01}
          onChange={setNoise}
        />
      </div>

      <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
        <div>
          <p id={`${uid}-a`} className={`${LABEL} mb-1.5`}>
            {copy.layers}
          </p>
          <Segmented
            labelledBy={`${uid}-a`}
            options={["linear", "tanh"].map((a) => ({ value: a, label: copy.activations[a] }))}
            value={activation}
            onChange={setActivation}
            size="sm"
          />
        </div>
        <div>
          <p id={`${uid}-e`} className={`${LABEL} mb-1.5`}>
            {copy.showErrors}
          </p>
          <Segmented
            labelledBy={`${uid}-e`}
            options={["none", "pca", "ae"].map((e) => ({ value: e, label: copy.errorOptions[e] }))}
            value={errors}
            onChange={setErrors}
            size="sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={BTN} onClick={() => setSeed((s) => s + 1)}>
            {copy.newData}
          </button>
          <button type="button" className={BTN} onClick={reset}>
            {copy.reset}
          </button>
          <span className={SEED}>{fill(copy.seed, { seed })}</span>
        </div>
      </div>

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
            {copy.points}
          </li>
          <li className="flex items-center gap-2 text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]">
            <svg width="24" height="8" aria-hidden="true">
              <line
                x1="0"
                y1="4"
                x2="24"
                y2="4"
                strokeWidth="2"
                strokeDasharray="5 4"
                className="stroke-[#1A1A1A] dark:stroke-[#E8E8E8]"
              />
            </svg>
            {copy.pcaLine}
          </li>
          <li className="flex items-center gap-2 text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]">
            <svg width="24" height="8" aria-hidden="true">
              <line
                x1="0"
                y1="4"
                x2="24"
                y2="4"
                strokeWidth="2.5"
                className="stroke-[#CC0000] dark:stroke-[#FF3C3C]"
              />
            </svg>
            {copy.aeCurve}
          </li>
        </ul>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={fill(copy.chartLabel, vars)}
          className="block w-full max-w-[560px] h-auto"
        >
          <rect
            x={PAD}
            y={PAD}
            width={W - 2 * PAD}
            height={H - 2 * PAD}
            fill="none"
            className="stroke-[#EDEDED] dark:stroke-[#1F1F1F]"
          />
          {errors !== "none" &&
            res.train.map(([x, y], i) => {
              const [rx, ry] = errors === "pca" ? res.pca.rec[i] : res.ae.rec[i];
              return (
                <line
                  key={`e${i}`}
                  x1={px(x)}
                  y1={py(y)}
                  x2={px(rx)}
                  y2={py(ry)}
                  strokeWidth="1"
                  className={
                    errors === "pca"
                      ? "stroke-[#6E6E6E] dark:stroke-[#9A9A9A]"
                      : "stroke-[#CC0000] dark:stroke-[#FF3C3C]"
                  }
                />
              );
            })}
          {res.train.map(([x, y], i) => (
            <circle
              key={`p${i}`}
              cx={px(x)}
              cy={py(y)}
              r="3"
              fill="none"
              strokeWidth="1"
              className="stroke-[#8A8A8A] dark:stroke-[#7A7A7A]"
            />
          ))}
          {seg && (
            <line
              x1={px(seg[0][0])}
              y1={py(seg[0][1])}
              x2={px(seg[1][0])}
              y2={py(seg[1][1])}
              strokeWidth="2"
              strokeDasharray="5 4"
              className="stroke-[#1A1A1A] dark:stroke-[#E8E8E8]"
            />
          )}
          <path
            d={curvePath}
            fill="none"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            className="stroke-[#CC0000] dark:stroke-[#FF3C3C]"
          />
        </svg>
      </div>

      <div className="space-y-3">
        <p className="text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]">
          {fill(copy.shareLine, vars)}
        </p>
        <ScrollRegion label={copy.tableCaption} fade="16px">
          <table className="w-full min-w-[300px] border-collapse text-[12px]">
            <caption className="text-left mb-2 text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A] [text-wrap:pretty]">
              {fill(copy.tableCaption, vars)}
            </caption>
            <thead>
              <tr>
                <th scope="col" className={`${LABEL} ${CELL} !pl-0 text-left font-normal`}>
                  {copy.colMethod}
                </th>
                <th scope="col" className={`${LABEL} ${CELL} text-right font-normal`}>
                  {copy.colTrain}
                </th>
                <th scope="col" className={`${LABEL} ${CELL} !pr-0 text-right font-normal`}>
                  {copy.colFresh}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key}>
                  <th
                    scope="row"
                    className={`${CELL} !pl-0 text-left font-normal text-[#1A1A1A] dark:text-white`}
                  >
                    {r.label}
                  </th>
                  <td className={`${CELL} text-right font-mono tabular-nums`}>
                    {nf4.format(r.train)}
                  </td>
                  <td className={`${CELL} !pr-0 text-right font-mono tabular-nums`}>
                    {nf4.format(r.fresh)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollRegion>
        <p aria-live="polite" className={SUMMARY}>
          {summary}
        </p>
      </div>
    </div>
  );
}
