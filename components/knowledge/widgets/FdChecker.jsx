/**
 * FdChecker: the "Try it" widget on /knowledge/notes/functional-dependencies.
 *
 * A seeded log of wing scans at a made-up museum (./fd-sim.js). The visitor
 * builds a dependency X → Y from toggle buttons and a select, and the widget
 * answers two different questions about it: does this sample of rows break
 * it, and does it follow from the rules the designer declared (the closure
 * of X). A switch shows what splitting the table along those rules saves.
 *
 * Accessibility: toggle buttons with aria-pressed, a native select, range
 * input and checkbox, so it all works from the keyboard. Rows that break the
 * dependency are marked with a text tag as well as a tint. A polite live
 * region states the verdict after each change. Nothing animates.
 *
 * Strings come in through `copy` from the note's content module.
 */
import { useId, useMemo, useState } from "react";
import ScrollRegion from "@/components/ui/ScrollRegion";
import { fill } from "@/lib/fill";
import { BTN, CHECK, LABEL, SEED, SUMMARY, Slider } from "./controls";
import {
  ATTRS,
  DECLARED,
  bcnfViolations,
  closure,
  keyStatus,
  makeScans,
  split,
  testDependency,
} from "./fd-sim";

const DEFAULTS = { lhs: ["ticket"], rhs: "wing", rows: 16, seed: 1, split: false };
const CELL = "!px-2 !py-1.5";
const TOGGLE =
  "inline-flex items-center justify-center min-h-[32px] px-2.5 border font-mono text-[11px] transition-colors duration-150 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const SELECT =
  "min-h-[36px] px-2 border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0D0D0D] font-mono text-[12px] text-[#1A1A1A] dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";

export default function FdChecker({ copy, locale = "en-AU" }) {
  const uid = useId();
  const [lhs, setLhs] = useState(DEFAULTS.lhs);
  const [rhs, setRhs] = useState(DEFAULTS.rhs);
  const [rowCount, setRowCount] = useState(DEFAULTS.rows);
  const [seed, setSeed] = useState(DEFAULTS.seed);
  const [showSplit, setShowSplit] = useState(DEFAULTS.split);

  const rows = useMemo(() => makeScans(rowCount, seed), [rowCount, seed]);
  const test = useMemo(() => testDependency(rows, lhs, rhs), [rows, lhs, rhs]);
  const clo = useMemo(() => closure(lhs), [lhs]);
  const status = keyStatus(lhs);
  const parts = useMemo(() => split(rows), [rows]);
  const violations = bcnfViolations();

  const sep = locale === "zh-Hans" ? "、" : ", ";
  const set = (attrs) => attrs.map((a) => copy.attrs[a]).join(sep);
  const fdText = (fd) => `${fd.lhs.map((a) => copy.attrs[a]).join(", ")} → ${copy.attrs[fd.rhs]}`;
  const trivial = lhs.includes(rhs);
  const follows = clo.attrs.includes(rhs);
  const [w1, w2] = test.witness || [];

  const vars = {
    lhs: set(lhs),
    rhs: copy.attrs[rhs],
    rows: rows.length,
    groups: test.groups,
    broken: test.broken,
    r1: w1 + 1,
    r2: w2 + 1,
    same: test.witness ? lhs.map((a) => rows[w1][a]).join(sep) : "",
    v1: test.witness ? rows[w1][rhs] : "",
    v2: test.witness ? rows[w2][rhs] : "",
    closure: set(clo.attrs),
  };

  let dataVerdict;
  if (lhs.length === 0) dataVerdict = copy.pickLeft;
  else if (trivial) dataVerdict = fill(copy.trivial, vars);
  else if (test.broken) dataVerdict = fill(copy.dataBreaks, vars);
  else dataVerdict = fill(copy.dataHolds, vars);

  const ruleVerdict = lhs.length === 0 ? "" : fill(follows ? copy.ruleFollows : copy.ruleNot, vars);
  const keyLine = lhs.length === 0 ? "" : fill(copy.keyStatus[status], vars);
  const summary = [dataVerdict, ruleVerdict].filter(Boolean).join(locale === "zh-Hans" ? "" : " ");

  const toggle = (a) =>
    setLhs((cur) =>
      cur.includes(a) ? cur.filter((b) => b !== a) : ATTRS.filter((b) => cur.includes(b) || b === a)
    );

  const reset = () => {
    setLhs(DEFAULTS.lhs);
    setRhs(DEFAULTS.rhs);
    setRowCount(DEFAULTS.rows);
    setSeed(DEFAULTS.seed);
    setShowSplit(DEFAULTS.split);
  };

  const flagged = new Set(test.witness && !trivial ? test.witness : []);

  return (
    <div data-widget className="space-y-6">
      <div>
        <p className={`${LABEL} mb-2`}>{copy.declared}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[12px] text-[#1A1A1A] dark:text-white">
          {DECLARED.map((fd) => (
            <li key={fdText(fd)}>{fdText(fd)}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <p id={`${uid}-l`} className={`${LABEL} mb-1.5`}>
            {copy.left}
          </p>
          <div role="group" aria-labelledby={`${uid}-l`} className="flex flex-wrap gap-1.5">
            {ATTRS.map((a) => {
              const on = lhs.includes(a);
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(a)}
                  className={`${TOGGLE} ${
                    on
                      ? "bg-[#1A1A1A] text-white border-[#1A1A1A] dark:bg-[#EEEEEE] dark:text-black dark:border-[#EEEEEE]"
                      : "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#CFCFCF] hover:border-black dark:hover:border-white"
                  }`}
                >
                  {copy.attrs[a]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
          <div>
            <label htmlFor={`${uid}-r`} className={`${LABEL} block mb-1.5`}>
              {copy.right}
            </label>
            <select
              id={`${uid}-r`}
              value={rhs}
              onChange={(e) => setRhs(e.target.value)}
              className={SELECT}
            >
              {ATTRS.map((a) => (
                <option key={a} value={a}>
                  {copy.attrs[a]}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[200px] flex-1">
            <Slider
              id={`${uid}-n`}
              label={copy.rowsLabel}
              value={rowCount}
              display={rowCount}
              min={6}
              max={40}
              step={2}
              onChange={setRowCount}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={BTN} onClick={() => setSeed((s) => s + 1)}>
            {copy.newSample}
          </button>
          <button type="button" className={BTN} onClick={reset}>
            {copy.reset}
          </button>
          <span className={SEED}>{fill(copy.seed, { seed })}</span>
        </div>
      </div>

      <div className="border border-[#E0E0E0] dark:border-[#2A2A2A] p-4 space-y-3">
        <p className="font-mono text-[13px] text-[#1A1A1A] dark:text-white">
          {lhs.length ? `${set(lhs)} → ${copy.attrs[rhs]}` : `? → ${copy.attrs[rhs]}`}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className={`${LABEL} mb-1`}>{copy.inData}</p>
            <p className="text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#CFCFCF]">
              {dataVerdict}
            </p>
          </div>
          <div>
            <p className={`${LABEL} mb-1`}>{copy.inRules}</p>
            <p className="text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#CFCFCF]">
              {lhs.length ? (
                <>
                  <span className="font-mono">{fill(copy.closureLine, vars)}</span> {ruleVerdict}{" "}
                  {keyLine}
                </>
              ) : (
                copy.pickLeft
              )}
            </p>
            {clo.trail.length > 0 && (
              <p className="mt-1 text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A]">
                {fill(copy.via, {
                  steps: clo.trail.map(fdText).join(locale === "zh-Hans" ? "，再 " : ", then "),
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      <ScrollRegion label={copy.tableCaption} fade="16px">
        <table className="w-full min-w-[380px] border-collapse text-[12px]">
          <caption className="text-left mb-2 text-[12px] text-[#6B6B6B] dark:text-[#9A9A9A] [text-wrap:pretty]">
            {fill(copy.tableCaption, { rows: rows.length })}
          </caption>
          <thead>
            <tr>
              <th scope="col" className={`${LABEL} ${CELL} !pl-0 text-left font-normal`}>
                #
              </th>
              {ATTRS.map((a) => (
                <th
                  key={a}
                  scope="col"
                  className={`${LABEL} ${CELL} text-left font-normal ${
                    a === rhs
                      ? "!text-accent-ink"
                      : lhs.includes(a)
                        ? "!text-[#1A1A1A] dark:!text-white"
                        : ""
                  }`}
                >
                  {copy.attrs[a]}
                  {a === rhs ? " (Y)" : lhs.includes(a) ? " (X)" : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const hit = flagged.has(idx);
              return (
                <tr key={idx} className={hit ? "bg-[#FFF0F0] dark:bg-[#2A1212]" : undefined}>
                  <td
                    className={`${CELL} !pl-0 font-mono tabular-nums text-[#6B6B6B] dark:text-[#9A9A9A]`}
                  >
                    {idx + 1}
                    {hit && <span className="ml-1 text-accent-ink">{copy.clash}</span>}
                  </td>
                  {ATTRS.map((a) => (
                    <td
                      key={a}
                      className={`${CELL} font-mono tabular-nums ${
                        hit && (a === rhs || lhs.includes(a))
                          ? "!text-[#1A1A1A] dark:!text-white font-semibold"
                          : ""
                      }`}
                    >
                      {row[a]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </ScrollRegion>

      <div className="space-y-3">
        <label className={CHECK}>
          <input
            type="checkbox"
            checked={showSplit}
            onChange={(e) => setShowSplit(e.target.checked)}
            className="h-4 w-4 accent-[#FF3C3C]"
          />
          {copy.showSplit}
        </label>
        {showSplit && (
          <div className="space-y-2 text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#CFCFCF]">
            <p>
              {fill(copy.violations, {
                list: violations.map(fdText).join(" · "),
              })}
            </p>
            <ul className="font-mono text-[12px] space-y-1">
              {parts.tables.map((t) => (
                <li key={t.name}>
                  {fill(copy.tableLine, {
                    name: copy.tableNames[t.name],
                    cols: t.cols.map((c) => copy.attrs[c]).join(", "),
                    rows: t.rows,
                  })}
                </li>
              ))}
            </ul>
            <p>
              {fill(copy.splitSummary, {
                wide: parts.wideCells,
                cells: parts.cells,
                adult: parts.adultRows,
              })}
            </p>
          </div>
        )}
      </div>

      <p aria-live="polite" className={SUMMARY}>
        {summary}
      </p>
    </div>
  );
}
