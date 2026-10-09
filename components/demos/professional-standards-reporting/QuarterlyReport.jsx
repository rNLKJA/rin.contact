/**
 * QuarterlyReport: the first half of the concept demo. Twelve quarters of
 * synthetic attendances and incident counts, a u-chart, a short report for one
 * quarter written from the numbers, and a table of every quarter.
 *
 * The visitor can draw a new synthetic data set, plant a change of a chosen
 * size in any quarter (to see whether the chart catches it), switch between
 * 95% and 99% intervals and pick the reporting quarter. The findings only say
 * what the intervals support: a rate ratio whose interval includes 1 is not
 * called a change. The report can be downloaded as Markdown. Nothing is stored
 * or sent.
 */
import { useId, useMemo, useState } from "react";
import { fill, joinNames } from "@/lib/fill";
import { DEMO } from "@/lib/demos/professional-standards-reporting-data";
import { makeQuarters, poissonInterval, rateRatio, uChart, QUARTER_COUNT } from "./stats";
import UChart, { UChartLegend } from "./UChart";
import { BTN, BTN_SOLID, META, RadioPills, Select } from "./ui";

const R = DEMO.report;
const DEFAULTS = { seed: 6, plantAt: 9, plantSize: 0.5, level: 0.95, reporting: QUARTER_COUNT - 1 };
const SIZES = [0.25, 0.5, 1];

export default function QuarterlyReport({ lang = "en" }) {
  const L = (o) => o[lang];
  const uid = useId();
  const numberLocale = lang === "zh" ? "zh-CN" : "en-AU";

  const [seed, setSeed] = useState(DEFAULTS.seed);
  const [plantAt, setPlantAt] = useState(DEFAULTS.plantAt);
  const [plantSize, setPlantSize] = useState(DEFAULTS.plantSize);
  const [level, setLevel] = useState(DEFAULTS.level);
  const [reporting, setReporting] = useState(DEFAULTS.reporting);
  const [saved, setSaved] = useState("");

  const rows = useMemo(
    () => makeQuarters({ seed, plantAt, plantSize }),
    [seed, plantAt, plantSize]
  );
  const chart = useMemo(
    () => uChart(rows.map((r) => ({ count: r.count, exposure: r.attendances / 1000 }))),
    [rows]
  );
  const intervals = useMemo(
    () =>
      rows.map((r) => {
        const [lo, hi] = poissonInterval(r.count, level);
        const k = r.attendances / 1000;
        return [lo / k, hi / k];
      }),
    [rows, level]
  );

  const qLabel = (r) => fill(L(DEMO.quarter), { y: r.year, q: r.quarter });
  const int = (n) => n.toLocaleString(numberLocale);
  const dec = (n) => (Number.isFinite(n) ? n.toFixed(2) : "∞");
  const pct = `${Math.round(level * 100)}%`;
  const sizeLabel = (s) => `+${Math.round(s * 100)}%`;
  const list = (items) =>
    joinNames(items, { separator: L(DEMO.separator), conjunction: L(DEMO.and) });

  const r = rows[reporting];
  const p = chart.points[reporting];
  const [lo, hi] = intervals[reporting];
  const flagged = rows.filter(
    (_, i) => chart.points[i].status === "above" || chart.points[i].status === "below"
  );

  const compare = (other, template) => {
    const rr = rateRatio(r.count, r.attendances, other.count, other.attendances, level);
    const verdict = rr.lower > 1 ? "up" : rr.upper < 1 ? "down" : "flat";
    return `${fill(L(template), {
      other: qLabel(other),
      otherRate: dec((other.count / other.attendances) * 1000),
      ratio: dec(rr.ratio),
      level: pct,
      lo: dec(rr.lower),
      hi: dec(rr.upper),
    })} ${L(R.verdict[verdict])}`;
  };

  const findings = [
    fill(L(R.headline), {
      quarter: qLabel(r),
      count: int(r.count),
      attendances: int(r.attendances),
      rate: dec(p.u),
      level: pct,
      lo: dec(lo),
      hi: dec(hi),
    }),
    L(R.chart[p.status]),
    reporting > 0 ? compare(rows[reporting - 1], R.prev) : L(R.noPrev),
    reporting > 3 ? compare(rows[reporting - 4], R.year) : L(R.noYear),
    flagged.length ? fill(L(R.flaggedSome), { list: list(flagged.map(qLabel)) }) : L(R.flaggedNone),
  ];
  const plantedRow = plantAt >= 0 ? rows[plantAt] : null;
  const plantedNote = plantedRow
    ? `${fill(L(R.planted), { size: sizeLabel(plantSize), quarter: qLabel(plantedRow) })} ${
        ["above", "below"].includes(chart.points[plantAt].status) ? L(R.caught) : L(R.missed)
      }`
    : null;

  const statusLabel = (s) => L(R.status[s]);
  const chartDesc = fill(L(R.chartDesc), {
    centre: dec(chart.centre),
    flagged: `${
      flagged.length
        ? fill(L(R.flaggedSome), { list: list(flagged.map(qLabel)) })
        : L(R.flaggedNone)
    }${lang === "zh" ? "" : " "}`,
  });

  const quarterOptions = rows.map((row) => ({ value: String(row.index), label: qLabel(row) }));
  const subtitle = fill(L(R.docSubtitle), { quarter: qLabel(r) });

  const download = () => {
    const th = R.th;
    const md = [
      `# ${L(R.docTitle)}`,
      "",
      subtitle,
      "",
      `> ${L(DEMO.synthetic)} · ${L(DEMO.conceptOnly)}`,
      "",
      `## ${L(R.findings)}`,
      "",
      ...findings.map((f) => `- ${f}`),
      ...(plantedNote ? [`- ${plantedNote}`] : []),
      "",
      `| ${[th.quarter, th.attendances, th.incidents, th.rate].map(L).join(" | ")} | ${fill(
        L(th.interval),
        { level: pct }
      )} | ${L(th.chart)} |`,
      "| --- | ---: | ---: | ---: | --- | --- |",
      ...rows.map(
        (row, i) =>
          `| ${qLabel(row)}${row.planted ? ` (${L(R.plantedTag)})` : ""} | ${int(
            row.attendances
          )} | ${int(row.count)} | ${dec(chart.points[i].u)} | ${dec(intervals[i][0])} to ${dec(
            intervals[i][1]
          )} | ${statusLabel(chart.points[i].status)} |`
      ),
      "",
      `## ${L(R.method)}`,
      "",
      L(R.methodNote),
      "",
    ].join("\n");
    const file = `quarterly-report-demo-set${seed}-y${r.year}q${r.quarter}.md`;
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    setSaved(fill(L(R.downloaded), { file }));
  };

  const touch = (fn) => (v) => {
    fn(v);
    setSaved("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
      {/* Controls first in reading order on mobile */}
      <div className="space-y-5 lg:order-2 min-w-0">
        <div>
          <p className={`${META} mb-2`}>{L(R.dataSet)}</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-2xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] mr-1">
              {fill(L(R.dataSetN), { n: seed })}
            </span>
            <button type="button" className={BTN} onClick={() => touch(setSeed)(seed + 1)}>
              {L(R.reseed)}
            </button>
          </div>
        </div>
        <Select
          id={`${uid}-plant`}
          label={L(R.plantAt)}
          value={String(plantAt)}
          onChange={touch((v) => setPlantAt(Number(v)))}
          options={[{ value: "-1", label: L(DEMO.none) }, ...quarterOptions]}
        />
        <RadioPills
          legend={L(R.plantSize)}
          name={`${uid}-size`}
          value={String(plantSize)}
          onChange={touch((v) => setPlantSize(Number(v)))}
          disabled={plantAt < 0}
          options={SIZES.map((s) => ({ value: String(s), label: sizeLabel(s) }))}
        />
        <RadioPills
          legend={L(R.level)}
          name={`${uid}-level`}
          value={String(level)}
          onChange={touch((v) => setLevel(Number(v)))}
          options={[0.95, 0.99].map((v) => ({
            value: String(v),
            label: `${Math.round(v * 100)}%`,
          }))}
        />
        <Select
          id={`${uid}-reporting`}
          label={L(R.reporting)}
          value={String(reporting)}
          onChange={touch((v) => setReporting(Number(v)))}
          options={quarterOptions}
        />
        <button
          type="button"
          className={BTN}
          onClick={() => {
            setSeed(DEFAULTS.seed);
            setPlantAt(DEFAULTS.plantAt);
            setPlantSize(DEFAULTS.plantSize);
            setLevel(DEFAULTS.level);
            setReporting(DEFAULTS.reporting);
            setSaved("");
          }}
        >
          {L(R.reset)}
        </button>
      </div>

      <div className="min-w-0 lg:order-1 space-y-6">
        {/* Chart */}
        <figure className="min-w-0">
          <figcaption className="text-sm font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-3">
            {L(R.chartTitle)}
          </figcaption>
          <UChart
            rows={rows}
            chart={chart}
            reporting={reporting}
            title={L(R.chartTitle)}
            desc={chartDesc}
            quarterLabel={(row) => `Q${row.quarter}`}
            yearLabel={(y) => fill(L(DEMO.yearShort), { y })}
          />
          <UChartLegend
            labels={{
              centre: L(R.legendCentre),
              limits: L(R.legendLimits),
              outside: L(R.legendOutside),
              watch: L(R.legendWatch),
              reporting: L(R.legendReporting),
            }}
          />
        </figure>

        {/* The report itself, framed like a printed page */}
        <article
          aria-labelledby={`${uid}-doc`}
          className="border border-[#BDBDBD] dark:border-[#595959] bg-white dark:bg-[#0A0A0A] p-4 sm:p-5 md:p-6 min-w-0"
        >
          <p className={`${META} font-mono mb-3 flex items-center gap-2`}>
            <span className="w-1.5 h-1.5 bg-[#FF3C3C]" aria-hidden="true" />
            {L(DEMO.synthetic)}
          </p>
          <h3
            id={`${uid}-doc`}
            className="text-lg md:text-xl font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE]"
          >
            {L(R.docTitle)}
          </h3>
          <p className="text-sm text-[#595959] dark:text-[#9A9A9A] mb-5">{subtitle}</p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-6 border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
            {[
              [L(R.kIncidents), int(r.count)],
              [L(R.kAttendances), int(r.attendances)],
              [L(R.kRate), dec(p.u)],
              [fill(L(R.kInterval), { level: pct }), `${dec(lo)}–${dec(hi)}`],
            ].map(([k, v]) => (
              <div key={k} className="bg-white dark:bg-[#0A0A0A] px-3 py-3 min-w-0">
                <dt className={`${META} mb-1`}>{k}</dt>
                <dd className="font-display text-xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] break-words">
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <h4 className={`${META} mb-2`}>{L(R.findings)}</h4>
          <ul className="space-y-2.5 mb-5">
            {findings.map((f, i) => (
              <li
                key={i}
                className={`flex gap-3 text-[15px] leading-relaxed ${
                  i === 1 && (p.status === "above" || p.status === "below")
                    ? "text-[#CC0000] dark:text-[#FF6B6B]"
                    : "text-[#1A1A1A] dark:text-[#EEEEEE]"
                }`}
              >
                <span className="mt-[0.6em] w-1.5 h-1.5 shrink-0 bg-current" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          {plantedNote && (
            <p className="border-l-2 border-[#E0E0E0] dark:border-[#3D3D3D] pl-3 text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-5">
              {plantedNote}
            </p>
          )}

          <h4 className={`${META} mb-2`}>{L(R.method)}</h4>
          <p className="text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed mb-5">
            {L(R.methodNote)}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className={BTN_SOLID} onClick={download}>
              {L(R.download)} (.md) ↓
            </button>
            <p role="status" className="text-xs text-[#1A1A1A] dark:text-[#EEEEEE] min-h-[1rem]">
              {saved}
            </p>
          </div>
        </article>
      </div>

      {/* Every quarter, as a table */}
      <div className="lg:col-span-2 lg:order-3 min-w-0">
        <div
          className="overflow-x-auto rounded-lg border border-[#F0F0F0] dark:border-[#3D3D3D]"
          role="region"
          aria-label={L(R.tableCaption)}
          tabIndex={0}
        >
          <table className="w-full font-mono text-xs text-left">
            <caption className="sr-only">{L(R.tableCaption)}</caption>
            <thead className="bg-[#F7F7F7] dark:bg-[#141414]">
              <tr>
                {[
                  L(R.th.quarter),
                  L(R.th.attendances),
                  L(R.th.incidents),
                  L(R.th.rate),
                  fill(L(R.th.interval), { level: pct }),
                  L(R.th.chart),
                ].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={`px-3 py-2 font-medium text-[#3D3D3D] dark:text-[#CCCCCC] whitespace-nowrap ${
                      i > 0 && i < 4 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const pt = chart.points[i];
                const outside = pt.status === "above" || pt.status === "below";
                return (
                  <tr
                    key={row.index}
                    className={`border-t border-[#F0F0F0] dark:border-[#3D3D3D] ${
                      i === reporting ? "bg-[#F5F5F5] dark:bg-[#161616]" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-3 py-1.5 font-normal whitespace-nowrap text-[#1A1A1A] dark:text-[#EEEEEE]"
                    >
                      {qLabel(row)}
                      {row.planted && (
                        <span className="ml-2 text-[10px] uppercase tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]">
                          {L(R.plantedTag)}
                        </span>
                      )}
                    </th>
                    <td className="px-3 py-1.5 text-right whitespace-nowrap text-[#1A1A1A] dark:text-[#EEEEEE]">
                      {int(row.attendances)}
                    </td>
                    <td className="px-3 py-1.5 text-right whitespace-nowrap text-[#1A1A1A] dark:text-[#EEEEEE]">
                      {int(row.count)}
                    </td>
                    <td className="px-3 py-1.5 text-right whitespace-nowrap text-[#1A1A1A] dark:text-[#EEEEEE]">
                      {dec(pt.u)}
                    </td>
                    <td className="px-3 py-1.5 whitespace-nowrap text-[#3D3D3D] dark:text-[#AAAAAA]">
                      {dec(intervals[i][0])}–{dec(intervals[i][1])}
                    </td>
                    <td
                      className={`px-3 py-1.5 whitespace-nowrap ${
                        outside
                          ? "text-[#CC0000] dark:text-[#FF6B6B]"
                          : "text-[#3D3D3D] dark:text-[#AAAAAA]"
                      }`}
                    >
                      {statusLabel(pt.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="sr-only" aria-live="polite">
          {fill(L(R.live), {
            quarter: qLabel(r),
            rate: dec(p.u),
            status: statusLabel(p.status),
          })}
        </p>
      </div>
    </div>
  );
}
