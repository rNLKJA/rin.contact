/**
 * PlateDemo: a small in-browser concept demo for /projects/wehi-genomics.
 * Pick a 96- or 384-well plate, place synthetic samples in wells, edit the
 * made-up barcodes, then preview and download a sample-sheet CSV. Two checks
 * run on every change: barcodes used more than once (or malformed) and empty
 * wells. Written fresh in JavaScript for this page. It shares no code with GMM,
 * and nothing is stored or sent: state lives in memory only.
 *
 * Accessibility: the plate is one tab stop with a roving focus (arrow keys move,
 * Home and End jump within a row, Enter or Space places the chosen sample,
 * Delete or Backspace clears). Every well has a full text label. Plate size and
 * tool are native radio groups. A polite live region reads a one-line summary
 * after each change, and the only motion is a colour fade that is switched off
 * when the visitor prefers reduced motion.
 */
import { Fragment, useId, useMemo, useRef, useState } from "react";
import { fill, joinNames } from "@/lib/fill";
import {
  CSV_COLUMNS,
  DEMO as D,
  PLATE_FORMATS,
  PLATE_NAME,
  SAMPLES,
} from "@/lib/wehi-genomics-data";

const ROW_LETTERS = "ABCDEFGHIJKLMNOP";
const VALID = /^[ACGT]{6}$/;
const PREVIEW_ROWS = 8;

// Seeded shuffle of every six-letter barcode, so the synthetic set is unique,
// the same on every visit and the same on server and client.
function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BARCODES = (() => {
  const all = Array.from({ length: 4096 }, (_, n) => {
    let s = "";
    for (let k = 0; k < 6; k++) s = "ACGT"[(n >> (2 * k)) & 3] + s;
    return s;
  });
  const rand = mulberry32(2024);
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, 384);
})();

const SAMPLE_BY_ID = Object.fromEntries(SAMPLES.map((s) => [s.id, s]));

const wellId = (i, cols) => `${ROW_LETTERS[Math.floor(i / cols)]}${(i % cols) + 1}`;

/**
 * A plate as it might arrive by hand: samples in blocks of columns, the last
 * columns left empty, and one barcode pasted twice (A1's code reused in row D).
 */
function example(size) {
  const { rows, cols } = PLATE_FORMATS[size];
  const blocks = size === 96 ? [3, 3, 3, 2] : [6, 6, 6, 4];
  const assign = Array.from({ length: rows * cols }, (_, i) => {
    let c = i % cols;
    for (let b = 0; b < blocks.length; b++) {
      if (c < blocks[b]) return SAMPLES[b].id;
      c -= blocks[b];
    }
    return null;
  });
  const dup = 3 * cols + blocks[0] + blocks[1] + blocks[2] - 1;
  return { assign, overrides: { [dup]: BARCODES[0] } };
}

const csvCell = (v) => {
  const s = String(v);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const PANEL = "border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg p-4";
const BTN =
  "inline-flex items-center justify-center min-h-[36px] rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-3.5 text-xs text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const PILL =
  "flex min-h-[36px] items-center gap-2 rounded-full border px-3 text-xs transition-colors duration-150 motion-reduce:transition-none border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE] peer-checked:border-[#1A1A1A] peer-checked:bg-[#1A1A1A] peer-checked:text-white dark:peer-checked:border-[#EEEEEE] dark:peer-checked:bg-[#EEEEEE] dark:peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#CC0000] dark:peer-focus-visible:outline-[#FF3C3C]";

// Wells: greys and outlines, so red is kept for problems and focus.
const FILL = {
  sample_1:
    "bg-[#1A1A1A] border-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:border-[#EEEEEE] dark:text-black",
  sample_2:
    "bg-[#6E6E6E] border-[#6E6E6E] text-white dark:bg-[#9A9A9A] dark:border-[#9A9A9A] dark:text-black",
  sample_3:
    "bg-[#D6D6D6] border-[#D6D6D6] text-[#1A1A1A] dark:bg-[#4A4A4A] dark:border-[#4A4A4A] dark:text-white",
  control:
    "bg-white border-[#1A1A1A] text-[#1A1A1A] dark:bg-[#0A0A0A] dark:border-[#EEEEEE] dark:text-[#EEEEEE]",
  empty: "bg-transparent border-dashed border-[#BDBDBD] dark:border-[#595959]",
};

function Swatch({ id }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-3 w-3 shrink-0 rounded-full border ${FILL[id] || FILL.empty}`}
    />
  );
}

function RadioPills({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="min-w-0">
      <legend className={`${META} mb-2`}>{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className={PILL}>
              {o.swatch && <Swatch id={o.swatch} />}
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function PlateDemo({ lang = "en" }) {
  const L = (o) => o[lang];
  const uid = useId();
  const helpId = `${uid}-help`;
  const barcodeId = `${uid}-barcode`;
  const barcodeHelpId = `${uid}-barcode-help`;
  const blockedId = `${uid}-blocked`;

  const [size, setSize] = useState(96);
  const [plate, setPlate] = useState(() => example(96));
  const [active, setActive] = useState(0);
  const [tool, setTool] = useState(SAMPLES[0].id);
  const [status, setStatus] = useState("");
  const refs = useRef([]);

  const { rows, cols } = PLATE_FORMATS[size];
  const total = rows * cols;
  const { assign, overrides } = plate;
  const codeAt = (i) => overrides[i] ?? BARCODES[i];
  const nameOf = (id) => (id ? L(SAMPLE_BY_ID[id].name) : L(D.emptyName));
  const list = (ids) =>
    joinNames(ids, { separator: lang === "zh" ? "、" : ", ", conjunction: L(D.and) });

  // Checks and sheet rows, recomputed on every change.
  const report = useMemo(() => {
    const byCode = new Map();
    const invalid = [];
    const sheet = [];
    assign.forEach((sample, i) => {
      if (!sample) return;
      const code = overrides[i] ?? BARCODES[i];
      const id = wellId(i, cols);
      sheet.push([PLATE_NAME, id, id[0], (i % cols) + 1, sample, code]);
      if (!VALID.test(code)) invalid.push(i);
      else byCode.set(code, [...(byCode.get(code) || []), i]);
    });
    const dups = [...byCode.entries()].filter(([, wells]) => wells.length > 1);
    const flagged = new Set([...invalid, ...dups.flatMap(([, wells]) => wells)]);
    return {
      sheet,
      dups,
      invalid,
      flagged,
      filled: sheet.length,
      empty: assign.length - sheet.length,
      problems: dups.length + invalid.length,
    };
  }, [assign, overrides, cols]);

  const summary = fill(L(D.summary), {
    n: size,
    filled: report.filled,
    total,
    empty: report.empty,
    problems: report.problems,
  });

  const paint = (indices, value) => {
    setPlate((p) => {
      const next = [...p.assign];
      indices.forEach((i) => {
        next[i] = value;
      });
      return { ...p, assign: next };
    });
    setStatus("");
  };
  const toolValue = tool === "empty" ? null : tool;

  const move = (to) => {
    setActive(to);
    refs.current[to]?.focus();
  };

  const onWellClick = (i) => {
    setActive(i);
    if (tool !== "select") paint([i], toolValue);
  };

  const onWellKey = (e, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const to = {
      ArrowRight: c < cols - 1 ? i + 1 : i,
      ArrowLeft: c > 0 ? i - 1 : i,
      ArrowDown: r < rows - 1 ? i + cols : i,
      ArrowUp: r > 0 ? i - cols : i,
      Home: e.ctrlKey ? 0 : r * cols,
      End: e.ctrlKey ? total - 1 : r * cols + cols - 1,
    }[e.key];
    if (to !== undefined) {
      e.preventDefault();
      move(to);
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault();
      paint([i], null);
    }
  };

  const changeSize = (next) => {
    const n = Number(next);
    setSize(n);
    setPlate(example(n));
    setActive(0);
    setStatus(L(D.loaded));
  };

  const activeId = wellId(active, cols);
  const activeRow = Math.floor(active / cols);
  const activeCol = active % cols;
  const activeCode = codeAt(active);
  const activeInvalid = !VALID.test(activeCode);
  const activeFlagged = report.flagged.has(active);

  const setBarcode = (raw) => {
    const code = raw
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 6);
    setPlate((p) => ({ ...p, overrides: { ...p.overrides, [active]: code } }));
    setStatus("");
  };

  const fileName = `sample-sheet-demo-${size}.csv`;
  const download = () => {
    const csv = `${[CSV_COLUMNS, ...report.sheet].map((r) => r.map(csvCell).join(",")).join("\r\n")}\r\n`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    setStatus(fill(L(D.downloaded), { file: fileName }));
  };

  const small = size === 384;
  const toolOptions = [
    { value: "select", label: L(D.select) },
    ...SAMPLES.map((s) => ({ value: s.id, label: L(s.name), swatch: s.id })),
    { value: "empty", label: L(D.empty), swatch: "empty" },
  ];

  return (
    <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg p-4 md:p-6">
      <p className={`${META} font-mono mb-5 flex items-center gap-2`}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
        {L(D.synthetic)}
      </p>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Controls first in reading order on mobile: size, then tool */}
        <div className="space-y-5 lg:order-2">
          <RadioPills
            legend={L(D.plateSize)}
            name={`${uid}-size`}
            value={String(size)}
            onChange={changeSize}
            options={["96", "384"].map((n) => ({ value: n, label: fill(L(D.wells), { n }) }))}
          />
          <RadioPills
            legend={L(D.tool)}
            name={`${uid}-tool`}
            value={tool}
            onChange={setTool}
            options={toolOptions}
          />
        </div>

        {/* Plate */}
        <div className="min-w-0 lg:order-1 lg:row-span-3">
          <p id={helpId} className="text-xs text-[#595959] dark:text-[#9A9A9A] mb-3">
            {L(D.plateHelp)}
          </p>
          <div
            role="group"
            aria-label={fill(L(D.plateLabel), { n: size })}
            aria-describedby={helpId}
            className={`grid ${small ? "gap-px sm:gap-[3px]" : "gap-1 sm:gap-1.5 max-w-[540px]"}`}
            style={{ gridTemplateColumns: `repeat(${cols + 1}, minmax(0, 1fr))` }}
          >
            <span aria-hidden="true" />
            {Array.from({ length: cols }, (_, c) => (
              <span
                key={c}
                aria-hidden="true"
                className={`text-center font-mono text-[#6E6E6E] dark:text-[#9A9A9A] ${small ? "text-[7px] sm:text-[9px]" : "text-[10px]"}`}
              >
                {c + 1}
              </span>
            ))}
            {Array.from({ length: rows }, (_, r) => (
              <Fragment key={r}>
                <span
                  aria-hidden="true"
                  className={`flex items-center justify-center font-mono text-[#6E6E6E] dark:text-[#9A9A9A] ${small ? "text-[7px] sm:text-[9px]" : "text-[10px]"}`}
                >
                  {ROW_LETTERS[r]}
                </span>
                {Array.from({ length: cols }, (_, c) => {
                  const i = r * cols + c;
                  const sample = assign[i];
                  const id = wellId(i, cols);
                  const flagged = report.flagged.has(i);
                  const label = sample
                    ? fill(L(D.wellFilled), {
                        well: id,
                        sample: nameOf(sample),
                        barcode: codeAt(i) || "-",
                      }) + (flagged ? L(D.wellProblem) : "")
                    : fill(L(D.wellEmpty), { well: id });
                  return (
                    <button
                      key={c}
                      type="button"
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      tabIndex={i === active ? 0 : -1}
                      aria-label={label}
                      onClick={() => onWellClick(i)}
                      onKeyDown={(e) => onWellKey(e, i)}
                      className={`relative aspect-square w-full rounded-full border font-mono leading-none flex items-center justify-center select-none transition-colors duration-150 motion-reduce:transition-none ${small ? "text-[0px]" : "text-[10px] sm:text-xs"} ${FILL[sample || "empty"]} ${
                        flagged ? "ring-2 ring-[#CC0000] dark:ring-[#FF3C3C]" : ""
                      } ${
                        i === active
                          ? "outline outline-2 outline-offset-1 outline-[#1A1A1A] dark:outline-[#EEEEEE] focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]"
                          : "focus-visible:outline-none"
                      }`}
                    >
                      <span aria-hidden="true">
                        {sample && !small ? SAMPLE_BY_ID[sample].mark : ""}
                      </span>
                    </button>
                  );
                })}
              </Fragment>
            ))}
          </div>

          {/* Visible stats; the same numbers are read out by the live summary */}
          <dl className="mt-4 grid grid-cols-3 gap-px border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden max-w-[540px]">
            {[
              [L(D.stats.filled), `${report.filled}/${total}`],
              [L(D.stats.empty), report.empty],
              [L(D.stats.problems), report.problems],
            ].map(([k, v]) => (
              <div key={k} className="bg-white dark:bg-[#0A0A0A] px-3 py-2.5">
                <dt className={META}>{k}</dt>
                <dd className="font-mono text-sm text-[#1A1A1A] dark:text-[#EEEEEE]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="sr-only" aria-live="polite">
            {summary}
          </p>
        </div>

        {/* Selected well */}
        <div className={`${PANEL} lg:order-3`}>
          <p className={META}>{L(D.selected)}</p>
          <p className="mt-1 mb-3 flex items-baseline gap-3">
            <span className="font-display text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE]">
              {activeId}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#3D3D3D] dark:text-[#AAAAAA]">
              <Swatch id={assign[active] || "empty"} />
              {nameOf(assign[active])}
            </span>
          </p>
          <label htmlFor={barcodeId} className={`${META} block mb-1`}>
            {fill(L(D.barcodeFor), { well: activeId })}
          </label>
          <input
            id={barcodeId}
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            maxLength={6}
            value={activeCode}
            onChange={(e) => setBarcode(e.target.value)}
            aria-invalid={activeInvalid || activeFlagged}
            aria-describedby={barcodeHelpId}
            className="w-full rounded-md border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A] px-3 py-2 font-mono text-base tracking-[0.2em] text-[#1A1A1A] dark:text-[#EEEEEE] aria-[invalid=true]:border-[#CC0000] dark:aria-[invalid=true]:border-[#FF3C3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]"
          />
          <p id={barcodeHelpId} className="mt-1 text-xs text-[#595959] dark:text-[#9A9A9A]">
            {L(D.barcodeHint)}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              className={BTN}
              disabled={tool === "select"}
              onClick={() =>
                paint(
                  Array.from({ length: cols }, (_, c) => activeRow * cols + c),
                  toolValue
                )
              }
            >
              {fill(L(D.fillRow), { row: ROW_LETTERS[activeRow] })}
            </button>
            <button
              type="button"
              className={BTN}
              disabled={tool === "select"}
              onClick={() =>
                paint(
                  Array.from({ length: rows }, (_, r) => r * cols + activeCol),
                  toolValue
                )
              }
            >
              {fill(L(D.fillCol), { col: activeCol + 1 })}
            </button>
          </div>
        </div>

        {/* Checks */}
        <div className={`${PANEL} lg:order-4`}>
          <h3 className={`${META} mb-2`}>{L(D.checks)}</h3>
          <ul className="space-y-1.5 text-sm leading-relaxed">
            {report.problems === 0 && report.empty === 0 && (
              <li className="text-[#1A1A1A] dark:text-[#EEEEEE]">{L(D.ok)}</li>
            )}
            {report.dups.map(([code, wells]) => (
              <li key={code} className="flex gap-2 text-[#CC0000] dark:text-[#FF6B6B]">
                <span aria-hidden="true">!</span>
                {fill(L(D.dup), { barcode: code, wells: list(wells.map((i) => wellId(i, cols))) })}
              </li>
            ))}
            {report.invalid.map((i) => (
              <li key={i} className="flex gap-2 text-[#CC0000] dark:text-[#FF6B6B]">
                <span aria-hidden="true">!</span>
                {fill(L(D.invalid), { well: wellId(i, cols) })}
              </li>
            ))}
            {report.empty > 0 && (
              <li className="flex gap-2 text-[#3D3D3D] dark:text-[#AAAAAA]">
                <span aria-hidden="true">·</span>
                {report.empty === 1 ? L(D.emptyOne) : fill(L(D.emptyMany), { n: report.empty })}
              </li>
            )}
          </ul>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <button
              type="button"
              className={BTN}
              onClick={() => {
                setPlate(example(size));
                setStatus(L(D.loaded));
              }}
            >
              {L(D.example)}
            </button>
            <button
              type="button"
              className={BTN}
              onClick={() => {
                setPlate((p) => ({ ...p, assign: Array(total).fill(null) }));
                setStatus(L(D.cleared));
              }}
            >
              {L(D.clear)}
            </button>
            <button
              type="button"
              className={BTN}
              onClick={() => setPlate((p) => ({ ...p, overrides: {} }))}
            >
              {L(D.resetBarcodes)}
            </button>
          </div>
        </div>
      </div>

      {/* Sample sheet preview and download */}
      <div className="mt-6 border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE]">
            {L(D.preview)}
          </h3>
          <button
            type="button"
            onClick={download}
            disabled={report.filled === 0 || report.problems > 0}
            aria-describedby={report.problems > 0 ? blockedId : undefined}
            className="inline-flex items-center gap-2 min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1A1A1A] dark:disabled:hover:bg-[#EEEEEE] transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]"
          >
            {L(D.download)} ↓
          </button>
        </div>
        {report.problems > 0 && (
          <p id={blockedId} className="text-xs text-[#CC0000] dark:text-[#FF6B6B] mb-3">
            {L(D.blocked)}
          </p>
        )}
        {report.filled === 0 ? (
          <p className="text-sm text-[#595959] dark:text-[#9A9A9A]">{L(D.noRows)}</p>
        ) : (
          <>
            <div
              className="overflow-x-auto rounded-lg border border-[#F0F0F0] dark:border-[#3D3D3D]"
              role="region"
              aria-label={L(D.preview)}
              tabIndex={0}
            >
              <table className="w-full font-mono text-xs text-left">
                <caption className="sr-only">{L(D.preview)}</caption>
                <thead className="bg-[#F7F7F7] dark:bg-[#141414]">
                  <tr>
                    {CSV_COLUMNS.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-3 py-2 font-medium text-[#3D3D3D] dark:text-[#CCCCCC] whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.sheet.slice(0, PREVIEW_ROWS).map((row) => (
                    <tr key={row[1]} className="border-t border-[#F0F0F0] dark:border-[#3D3D3D]">
                      {row.map((v, j) => (
                        <td
                          key={j}
                          className={`px-3 py-1.5 whitespace-nowrap ${
                            j === 5 &&
                            report.flagged.has(ROW_LETTERS.indexOf(row[2]) * cols + row[3] - 1)
                              ? "text-[#CC0000] dark:text-[#FF6B6B]"
                              : "text-[#1A1A1A] dark:text-[#EEEEEE]"
                          }`}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-[#595959] dark:text-[#9A9A9A]">
              {fill(L(D.showing), {
                n: Math.min(PREVIEW_ROWS, report.sheet.length),
                total: report.sheet.length,
              })}
            </p>
          </>
        )}
        <p role="status" className="mt-2 text-xs text-[#1A1A1A] dark:text-[#EEEEEE] min-h-[1rem]">
          {status}
        </p>
      </div>
    </div>
  );
}
