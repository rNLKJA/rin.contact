/**
 * RegulatoryMapDemo: the concept demo on /projects/regulatory-analytics-map.
 * 24 synthetic areas on a tile map, with a measure (gaming venues or machines),
 * three ways to shade the map (count, rate per 10,000 adults, gap from the
 * trend line), a scatter with a straight trend line on an IRSD-style
 * disadvantage score, the same data asked three ways, and the full table.
 *
 * Every number is synthetic and generated in the browser from a seed
 * (./model.js). It says so on screen, nothing is fetched or stored, and it is
 * not the system Rin worked on at CBS. Copy is in
 * lib/demos/regulatory-analytics-map-data.js.
 *
 * Accessibility: the map is a radio group with a roving focus (see TileMap),
 * the controls are native radios and a checkbox, the fit sentence is a polite
 * live region, and reshuffles and list picks are read out by a status line.
 * The table holds every number the map and chart show.
 */
import { useId, useMemo, useState } from "react";
import { fill } from "@/lib/fill";
import { DEMO as D, REGIONS } from "@/lib/demos/regulatory-analytics-map-data";
import { DEFAULT_SEED, analyse, generateAreas, shadeClasses } from "./model";
import TileMap, { SHADE_STEPS } from "./TileMap";
import TrendScatter from "./TrendScatter";

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const PANEL = "border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg p-4";
const H3 = "text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const BTN = `inline-flex items-center justify-center min-h-[36px] rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-3.5 text-xs text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE] transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`;
const PILL =
  "flex min-h-[36px] items-center rounded-full border px-3 text-xs transition-colors duration-150 motion-reduce:transition-none border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE] peer-checked:border-[#1A1A1A] peer-checked:bg-[#1A1A1A] peer-checked:text-white dark:peer-checked:border-[#EEEEEE] dark:peer-checked:bg-[#EEEEEE] dark:peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#CC0000] dark:peer-focus-visible:outline-[#FF3C3C]";

const MEASURES = ["venues", "machines"];
const VIEWS = ["count", "rate", "gap"];
const TOP = 3;

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
            <span className={PILL}>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Index of the area furthest above the trend line, for the first selection. */
function initialActive() {
  const { rows } = analyse(generateAreas(DEFAULT_SEED), {
    measure: MEASURES[0],
    excludeSmall: false,
  });
  return rows.reduce((best, r, i) => (r.z > rows[best].z ? i : best), 0);
}

export default function RegulatoryMapDemo({ lang = "en" }) {
  const L = (o) => o[lang];
  const uid = useId();
  const helpId = `${uid}-help`;
  const smallHintId = `${uid}-small-hint`;

  const [seed, setSeed] = useState(DEFAULT_SEED);
  const [measure, setMeasure] = useState(MEASURES[0]);
  const [view, setView] = useState(VIEWS[0]);
  const [excludeSmall, setExcludeSmall] = useState(false);
  const [active, setActive] = useState(initialActive);
  const [status, setStatus] = useState("");

  const fmt = useMemo(() => {
    const locale = lang === "zh" ? "zh-Hans" : "en-AU";
    const whole = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const one = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const plain = (v) => (v < 0 ? `−${one.format(-v)}` : one.format(v));
    return {
      whole: (v) => whole.format(v),
      one: (v) => one.format(v),
      plain,
      signed: (v) => (v < 0 ? `−${one.format(-v)}` : `+${one.format(v)}`),
      axis: (v) => (Number.isInteger(v) ? whole.format(v) : one.format(v)),
    };
  }, [lang]);

  const areas = useMemo(() => generateAreas(seed), [seed]);
  const { rows, fit } = useMemo(
    () => analyse(areas, { measure, excludeSmall }),
    [areas, measure, excludeSmall]
  );

  const areaName = (r) => fill(L(D.areaName), { region: L(REGIONS[r.region]), n: r.n });
  const valueText = (r, v = view) => {
    if (v === "count") return fill(L(D.count[measure]), { n: fmt.whole(r.count) });
    if (v === "rate") return fill(L(D.rate[measure]), { r: fmt.one(r.rate) });
    return fill(L(D.gapValue), { z: fmt.signed(r.z) });
  };

  // Shading: count and rate over every area, the gap only over areas in the fit.
  const shadeValues = rows.map((r) =>
    view === "count" ? r.count : view === "rate" ? r.rate : r.z
  );
  const shadeUse = rows.map((r) => view !== "gap" || r.included);
  const shades = shadeClasses(shadeValues, shadeUse);
  const shown = shadeValues.filter((_, i) => shadeUse[i]);
  const legendFormat = (v) =>
    view === "count" ? fmt.whole(v) : view === "rate" ? fmt.one(v) : fmt.signed(v);

  const labelFor = (i) => {
    const r = rows[i];
    const flag = r.above ? L(D.tileAbove) : !r.included ? L(D.tileExcluded) : "";
    return fill(L(D.tileLabel), { name: areaName(r), value: valueText(r), irsd: r.irsd }) + flag;
  };

  // The fit, read per 100-point drop in IRSD (more disadvantage).
  const fitText = (() => {
    if (!fit) return "";
    const effect = -fit.slope * 100;
    const lo = -fit.hi * 100;
    const hi = -fit.lo * 100;
    const more = effect >= 0;
    return fill(L(more ? D.fitMore : D.fitFewer), {
      b: fmt.one(Math.abs(effect)),
      lo: fmt.plain(more ? lo : -hi),
      hi: fmt.plain(more ? hi : -lo),
      measure: L(D.measureLower[measure]),
      r2: `${Math.round(fit.r2 * 100)}%`,
    });
  })();

  const sel = rows[active];
  const verdict = !sel.included
    ? L(D.verdict.excluded)
    : sel.above
      ? L(D.verdict.above)
      : sel.z <= -1.5
        ? L(D.verdict.below)
        : L(D.verdict.near);

  // The same data asked three ways.
  const byDesc = (key, list) =>
    list
      .map((r) => ({ r, i: rows.indexOf(r) }))
      .sort((a, b) => b.r[key] - a.r[key])
      .slice(0, TOP);
  const inFit = rows.filter((r) => r.included);
  const compare = [
    { id: "count", items: byDesc("count", rows) },
    { id: "rate", items: byDesc("rate", inFit) },
    {
      id: "gap",
      items: byDesc(
        "z",
        inFit.filter((r) => r.z > 0)
      ),
    },
  ];

  const select = (i) => {
    setActive(i);
    setStatus(fill(L(D.selectedStatus), { name: areaName(rows[i]) }));
  };
  const reseed = (next) => {
    setSeed(next);
    setStatus(fill(L(D.reshuffled), { seed: next }));
  };

  return (
    <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className={`${META} font-mono flex items-center gap-2`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
          {fill(L(D.synthetic), { seed })}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" className={BTN} onClick={() => reseed(seed + 1)}>
            {L(D.reshuffle)}
          </button>
          {seed !== DEFAULT_SEED && (
            <button type="button" className={BTN} onClick={() => reseed(DEFAULT_SEED)}>
              {fill(L(D.reset), { seed: DEFAULT_SEED })}
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-5 sm:grid-cols-2 mb-6">
        <RadioPills
          legend={L(D.measure)}
          name={`${uid}-measure`}
          value={measure}
          onChange={(v) => {
            setMeasure(v);
            setStatus("");
          }}
          options={MEASURES.map((m) => ({ value: m, label: L(D.measures[m]) }))}
        />
        <RadioPills
          legend={L(D.view)}
          name={`${uid}-view`}
          value={view}
          onChange={(v) => {
            setView(v);
            setStatus("");
          }}
          options={VIEWS.map((v) => ({ value: v, label: L(D.views[v]) }))}
        />
        <div className="sm:col-span-2">
          <label className="inline-flex min-h-[36px] items-center gap-2.5 cursor-pointer text-sm text-[#1A1A1A] dark:text-[#EEEEEE]">
            <input
              type="checkbox"
              checked={excludeSmall}
              onChange={(e) => {
                setExcludeSmall(e.target.checked);
                setStatus("");
              }}
              aria-describedby={smallHintId}
              className={`h-4 w-4 shrink-0 accent-[#1A1A1A] dark:accent-[#EEEEEE] ${FOCUS}`}
            />
            {L(D.small)}
          </label>
          <p id={smallHintId} className="text-xs text-[#595959] dark:text-[#9A9A9A]">
            {L(D.smallHint)}
          </p>
        </div>
      </div>

      {/* Map and the selected area */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <p id={helpId} className="text-xs text-[#595959] dark:text-[#9A9A9A] mb-4 max-w-[360px]">
            {L(D.mapHelp)}
          </p>
          <TileMap
            rows={rows}
            shades={shades}
            active={active}
            onSelect={(i) => {
              setActive(i);
              setStatus("");
            }}
            labelFor={labelFor}
            label={fill(L(D.mapLabel), {
              measure: L(D.measures[measure]),
              view: L(D.views[view]),
            })}
            describedBy={helpId}
          />

          {/* Legend */}
          <div className="mt-5 max-w-[360px] space-y-2 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
            <div className="flex items-center gap-2">
              <span className="font-mono shrink-0">
                {view === "gap" ? L(D.legendBelow) : L(D.legendLow)}
              </span>
              <span className="flex flex-1 gap-0.5" aria-hidden="true">
                {SHADE_STEPS.map((cls, k) => (
                  <span
                    key={k}
                    className={`h-3 flex-1 rounded-[2px] border border-[#BDBDBD] dark:border-[#595959] ${cls}`}
                  />
                ))}
              </span>
              <span className="font-mono shrink-0">
                {view === "gap" ? L(D.legendAbove) : L(D.legendHigh)}
              </span>
            </div>
            {shown.length > 0 && (
              <p className="font-mono text-[11px] text-[#595959] dark:text-[#9A9A9A]">
                {legendFormat(Math.min(...shown))} … {legendFormat(Math.max(...shown))}
              </p>
            )}
            <p className="flex items-center gap-2">
              <span
                className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[2px] ring-2 ring-[#CC0000] dark:ring-[#FF3C3C] text-[7px] leading-none"
                aria-hidden="true"
              >
                ▲
              </span>
              {L(D.legendFlag)}
            </p>
            {excludeSmall && (
              <p className="flex items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 rounded-[2px] border border-dashed border-[#6E6E6E] dark:border-[#9A9A9A]"
                  aria-hidden="true"
                />
                {L(D.legendExcluded)}
              </p>
            )}
          </div>
        </div>

        <div className={`${PANEL} self-start`}>
          <p className={META}>{L(D.selected)}</p>
          <p className="mt-1 mb-4 flex items-baseline gap-3">
            <span className="font-display text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE]">
              {sel.code}
            </span>
            <span className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA]">{areaName(sel)}</span>
          </p>
          <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1.5 text-sm">
            {[
              [L(D.fields.adults), fmt.whole(sel.adults)],
              [L(D.fields.irsd), sel.irsd],
              [L(D.fields.venues), fmt.whole(sel.venues)],
              [L(D.fields.machines), fmt.whole(sel.machines)],
              [L(D.yAxis[measure]), fmt.one(sel.rate)],
              [L(D.fields.expected), sel.expected == null ? "–" : fmt.one(sel.expected)],
              [L(D.fields.gap), fill(L(D.gapShort), { z: fmt.signed(sel.z) })],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-[#595959] dark:text-[#9A9A9A]">{k}</dt>
                <dd className="font-mono text-right text-[#1A1A1A] dark:text-[#EEEEEE]">{v}</dd>
              </div>
            ))}
          </dl>
          <p
            className={`mt-4 flex gap-2 text-sm leading-relaxed ${
              sel.above
                ? "text-[#CC0000] dark:text-[#FF6B6B]"
                : "text-[#3D3D3D] dark:text-[#AAAAAA]"
            }`}
          >
            <span aria-hidden="true">{sel.above ? "▲" : "·"}</span>
            {verdict}
          </p>
        </div>
      </div>

      {/* Trend line */}
      <div className="mt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <h3 className={`${H3} mb-3`}>{L(D.scatter)}</h3>
          <p className={`${META} mb-1`}>{L(D.yAxis[measure])}</p>
          <TrendScatter
            rows={rows}
            fit={fit}
            active={active}
            title={L(D.scatter)}
            desc={fill(L(D.scatterDesc), {
              n: fit ? fit.n : 0,
              measure: L(D.measureLower[measure]),
              fit: fitText,
              name: areaName(sel),
            })}
            formatY={fmt.axis}
          />
          <p className={`${META} mt-1 text-right normal-case tracking-normal text-xs`}>
            {L(D.xAxis)}
          </p>
        </div>
        <div className="min-w-0 space-y-4">
          <dl className="grid grid-cols-2 gap-px border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
            {[
              [L(D.stats.n), fit ? fit.n : "–"],
              [L(D.stats.effect), fit ? fmt.signed(-fit.slope * 100) : "–"],
              [L(D.stats.r2), fit ? fit.r2.toFixed(2) : "–"],
              [L(D.stats.flagged), rows.filter((r) => r.above).length],
            ].map(([k, v]) => (
              <div key={k} className="bg-white dark:bg-[#0A0A0A] px-3 py-2.5">
                <dt className={META}>{k}</dt>
                <dd className="font-mono text-sm text-[#1A1A1A] dark:text-[#EEEEEE]">{v}</dd>
              </div>
            ))}
          </dl>
          <p
            aria-live="polite"
            className="text-sm text-[#1A1A1A] dark:text-[#EEEEEE] leading-relaxed"
          >
            {fitText}
          </p>
          <p className="text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed">
            {L(D.caveat)}
          </p>
        </div>
      </div>

      {/* Same data, three questions */}
      <div className="mt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-6">
        <h3 className={`${H3} mb-4`}>{L(D.compare)}</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {compare.map(({ id, items }) => (
            <div key={id} className={PANEL}>
              <h4 className={`${META} mb-3`}>{L(D.compareCols[id])}</h4>
              <ol className="space-y-1.5">
                {items.map(({ r, i }, k) => (
                  <li key={r.code}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-label={fill(L(D.compareSelect), {
                        name: areaName(r),
                        value: valueText(r, id),
                      })}
                      aria-pressed={i === active}
                      className={`w-full min-h-[36px] flex items-center gap-3 rounded-md px-2 text-left text-sm transition-colors duration-150 motion-reduce:transition-none hover:bg-[#F7F7F7] dark:hover:bg-[#141414] ${FOCUS} ${
                        i === active
                          ? "bg-[#F0F0F0] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#EEEEEE]"
                          : "text-[#3D3D3D] dark:text-[#AAAAAA]"
                      }`}
                    >
                      <span className="font-mono text-xs text-[#6E6E6E] dark:text-[#9A9A9A]">
                        {k + 1}
                      </span>
                      <span className="font-mono font-medium">{r.code}</span>
                      <span className="ml-auto font-mono text-xs">
                        {id === "count"
                          ? fmt.whole(r.count)
                          : id === "rate"
                            ? fmt.one(r.rate)
                            : fmt.signed(r.z)}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed max-w-[680px]">
          {L(D.compareNote)}
        </p>
      </div>

      {/* Every number, as a table */}
      <details className="mt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-5">
        <summary
          className={`cursor-pointer select-none rounded-sm text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE] ${FOCUS}`}
        >
          {L(D.table)}
        </summary>
        <div
          className={`mt-4 overflow-x-auto rounded-lg border border-[#F0F0F0] dark:border-[#3D3D3D] ${FOCUS}`}
          role="region"
          aria-label={L(D.tableCaption)}
          tabIndex={0}
        >
          <table className="w-full font-mono text-xs text-left">
            <caption className="sr-only">{L(D.tableCaption)}</caption>
            <thead className="bg-[#F7F7F7] dark:bg-[#141414]">
              <tr>
                {["area", "adults", "irsd", "count", "rate", "expected", "gap"].map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className={`px-3 py-2 font-medium text-[#3D3D3D] dark:text-[#CCCCCC] whitespace-nowrap ${
                      c === "area" ? "" : "text-right"
                    }`}
                  >
                    {L(D.columns[c])}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.code}
                  className={`border-t border-[#F0F0F0] dark:border-[#3D3D3D] ${
                    i === active ? "bg-[#F7F7F7] dark:bg-[#141414]" : ""
                  }`}
                >
                  <th
                    scope="row"
                    className="px-3 py-1.5 font-normal whitespace-nowrap text-[#1A1A1A] dark:text-[#EEEEEE]"
                  >
                    {r.code} · {areaName(r)}
                    {!r.included && (
                      <span className="text-[#6E6E6E] dark:text-[#9A9A9A]"> · {L(D.notInFit)}</span>
                    )}
                  </th>
                  {[
                    fmt.whole(r.adults),
                    r.irsd,
                    fmt.whole(r.count),
                    fmt.one(r.rate),
                    r.expected == null ? "–" : fmt.one(r.expected),
                    fmt.signed(r.z),
                  ].map((v, j) => (
                    <td
                      key={j}
                      className={`px-3 py-1.5 text-right whitespace-nowrap ${
                        j === 5 && r.above
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
      </details>

      <p role="status" className="mt-4 text-xs text-[#1A1A1A] dark:text-[#EEEEEE] min-h-[1rem]">
        {status}
      </p>
      <p className="mt-2 text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed">
        {L(D.helpline)}
      </p>
    </div>
  );
}
