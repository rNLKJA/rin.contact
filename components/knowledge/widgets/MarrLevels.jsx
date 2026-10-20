/**
 * MarrLevels: the "Try it" widget on /knowledge/notes/marrs-levels.
 *
 * One problem, the median of a seeded list, solved four ways
 * (./median-sim.js). The table reads the same run at Marr's three levels:
 * what is computed (the median, the same in every row), how (the steps each
 * algorithm takes, fixed by the list) and with what (the time on this device,
 * measured only when the visitor asks, because it changes from run to run).
 *
 * Accessibility: native buttons and the site's Segmented radiogroup, so it
 * all works from the keyboard. The level switch marks its column with a
 * heading style and a text note, not colour alone. A polite live region sums
 * up each change. Nothing animates.
 *
 * Strings come in through `copy` from the note's content module.
 */
import { useId, useMemo, useState } from "react";
import Segmented from "@/components/ui/Segmented";
import ScrollRegion from "@/components/ui/ScrollRegion";
import { fill } from "@/lib/fill";
import { BTN, LABEL, SEED, SUMMARY } from "./controls";
import { ALGOS, makeList, runAlgo } from "./median-sim";

const SIZES = [15, 101, 1001, 5001];
const ORDERS = ["shuffled", "sorted", "reversed"];
const LEVELS = ["what", "how", "withWhat"];
const DEFAULTS = { n: 1001, order: "shuffled", seed: 1, level: "how" };
const CELL = "!px-2 !py-2";

/** Run each algorithm until about 25 ms have passed; ms per run. */
function timeAll(list, seed) {
  const out = {};
  for (const algo of ALGOS) {
    let reps = 0;
    const start = performance.now();
    let now = start;
    while (reps < 3 || (now - start < 25 && reps < 400)) {
      runAlgo(algo, list, seed);
      reps++;
      now = performance.now();
    }
    out[algo] = (now - start) / reps;
  }
  return out;
}

export default function MarrLevels({ copy, locale = "en-AU" }) {
  const uid = useId();
  const [n, setN] = useState(DEFAULTS.n);
  const [order, setOrder] = useState(DEFAULTS.order);
  const [seed, setSeed] = useState(DEFAULTS.seed);
  const [level, setLevel] = useState(DEFAULTS.level);
  const [timing, setTiming] = useState(null);

  const key = `${n}-${order}-${seed}`;
  const list = useMemo(() => makeList(n, order, seed), [n, order, seed]);
  const results = useMemo(
    () => Object.fromEntries(ALGOS.map((a) => [a, runAlgo(a, list, seed)])),
    [list, seed]
  );
  const times = timing && timing.key === key ? timing.ms : null;

  const nf0 = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const msFmt = useMemo(
    () => new Intl.NumberFormat(locale, { maximumSignificantDigits: 3 }),
    [locale]
  );

  const maxSteps = Math.max(...ALGOS.map((a) => results[a].steps));
  const fewest = ALGOS.reduce((b, a) => (results[a].steps < results[b].steps ? a : b));
  const most = ALGOS.reduce((b, a) => (results[a].steps > results[b].steps ? a : b));
  const fastest = times && ALGOS.reduce((b, a) => (times[a] < times[b] ? a : b));

  const vars = {
    n: nf0.format(n),
    order: copy.ordersInline[order],
    median: results.counting.median,
    fewest: copy.algos[fewest],
    fewestSteps: nf0.format(results[fewest].steps),
    most: copy.algos[most],
    mostSteps: nf0.format(results[most].steps),
    fastest: fastest ? copy.algos[fastest] : "",
  };
  const summary = [
    fill(copy.summary, vars),
    times ? fill(copy.summaryTimed, vars) : copy.summaryUntimed,
  ].join(locale === "zh-Hans" ? "" : " ");

  const head = (lv) =>
    `${LABEL} ${CELL} text-right font-normal ${
      level === lv ? "!text-accent-ink underline underline-offset-4" : ""
    }`;
  const cell = (lv) =>
    `${CELL} text-right font-mono tabular-nums ${
      level === lv ? "!text-[#1A1A1A] dark:!text-white" : ""
    }`;

  return (
    <div data-widget className="space-y-6">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
        <div>
          <p id={`${uid}-n`} className={`${LABEL} mb-1.5`}>
            {copy.size}
          </p>
          <Segmented
            labelledBy={`${uid}-n`}
            options={SIZES.map((s) => ({ value: s, label: nf0.format(s) }))}
            value={n}
            onChange={setN}
            size="sm"
          />
        </div>
        <div>
          <p id={`${uid}-o`} className={`${LABEL} mb-1.5`}>
            {copy.order}
          </p>
          <Segmented
            labelledBy={`${uid}-o`}
            options={ORDERS.map((o) => ({ value: o, label: copy.orders[o] }))}
            value={order}
            onChange={setOrder}
            size="sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={BTN} onClick={() => setSeed((s) => s + 1)}>
            {copy.newList}
          </button>
          <button
            type="button"
            className={BTN}
            onClick={() => setTiming({ key, ms: timeAll(list, seed) })}
          >
            {copy.time}
          </button>
          <span className={SEED}>{fill(copy.seed, { seed })}</span>
        </div>
      </div>

      <div>
        <p id={`${uid}-l`} className={`${LABEL} mb-1.5`}>
          {copy.readAt}
        </p>
        <Segmented
          labelledBy={`${uid}-l`}
          options={LEVELS.map((lv) => ({ value: lv, label: copy.levels[lv] }))}
          value={level}
          onChange={setLevel}
          size="sm"
        />
        <p className="mt-3 text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#CFCFCF] [text-wrap:pretty]">
          {fill(copy.levelNotes[level], vars)}
        </p>
      </div>

      <ScrollRegion label={copy.tableCaption} fade="16px">
        <table className="w-full min-w-[300px] border-collapse text-[12px]">
          <caption className="text-left mb-2 text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A] [text-wrap:pretty]">
            {fill(copy.tableCaption, vars)}
          </caption>
          <thead>
            <tr>
              <th scope="col" className={`${LABEL} ${CELL} !pl-0 text-left font-normal`}>
                {copy.colAlgo}
              </th>
              <th scope="col" className={head("what")}>
                {copy.colMedian}
              </th>
              <th scope="col" className={head("how")}>
                {copy.colSteps}
              </th>
              <th scope="col" className={`${head("withWhat")} !pr-0`}>
                {copy.colTime}
              </th>
            </tr>
          </thead>
          <tbody>
            {ALGOS.map((a) => (
              <tr key={a}>
                <th
                  scope="row"
                  className={`${CELL} !pl-0 text-left font-normal text-[#1A1A1A] dark:text-white`}
                >
                  {copy.algos[a]}
                  <span className="block text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A]">
                    {copy.algoNotes[a]}
                  </span>
                </th>
                <td className={cell("what")}>{results[a].median}</td>
                <td className={cell("how")}>
                  {nf0.format(results[a].steps)}
                  <span
                    aria-hidden="true"
                    className="mt-1 ml-auto block h-1 bg-[#F0F0F0] dark:bg-[#1F1F1F]"
                  >
                    <span
                      className="block h-1 bg-[#3D3D3D] dark:bg-[#AAAAAA] transition-[width] duration-150 motion-reduce:transition-none"
                      style={{
                        width: `${Math.max(
                          2,
                          Math.round(
                            (Math.log10(results[a].steps + 1) / Math.log10(maxSteps + 1)) * 100
                          )
                        )}%`,
                      }}
                    />
                  </span>
                </td>
                <td className={`${cell("withWhat")} !pr-0`}>
                  {times ? fill(copy.ms, { ms: msFmt.format(times[a]) }) : copy.notTimed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollRegion>
      <p className="text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A]">{copy.barNote}</p>

      <p aria-live="polite" className={SUMMARY}>
        {summary}
      </p>
    </div>
  );
}
