/**
 * EngagementDashboard: the analysis side of the HEX concept demo. A synthetic
 * cohort (./synthetic.js) taking a made-up four-module course, shown as four
 * headline numbers, a completion funnel, time per module and the spread of
 * quiz scores. When the visitor finishes the sample module, they join the
 * cohort as You. "New synthetic cohort" draws a fresh seed. Nothing is stored
 * or sent.
 *
 * Accessibility: each chart is one image with a full text summary, and "Show
 * the numbers" opens the same figures as tables. The module picker is a native
 * radio group. A polite live region reads out a new cohort. Bars ease to new
 * widths and heights, and that motion is switched off for visitors who prefer
 * reduced motion.
 */
import { useId, useMemo, useState } from "react";
import { fill } from "@/lib/fill";
import { COURSE, DASH as D } from "@/lib/demos/hex-micro-course-data";
import { FIRST_SEED, makeCohort, mulberry32, summarise } from "./synthetic";

const AXIS_MAX = 30; // minutes
const AXIS_TICKS = [0, 10, 20, 30];

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const BTN = `inline-flex items-center justify-center min-h-[44px] rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const PILL =
  "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border px-3 font-mono text-xs transition-colors duration-150 motion-reduce:transition-none border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE] peer-checked:border-[#1A1A1A] peer-checked:bg-[#1A1A1A] peer-checked:text-white dark:peer-checked:border-[#EEEEEE] dark:peer-checked:bg-[#EEEEEE] dark:peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#CC0000] dark:peer-focus-visible:outline-[#FF3C3C]";
const EASE = "transition-all duration-300 ease-out motion-reduce:transition-none";
const TH = "py-1.5 pr-3 text-left font-normal text-[#6E6E6E] dark:text-[#9A9A9A]";
const TD = "py-1.5 pr-3 tabular-nums text-[#1A1A1A] dark:text-[#EEEEEE]";

const nextSeed = (seed) => 1000 + Math.floor(mulberry32(seed)() * 9000);
const pos = (min) => `${(Math.min(min, AXIS_MAX) / AXIS_MAX) * 100}%`;

function ChartTitle({ title, note }) {
  return (
    <figcaption className="mb-3">
      <span className="block text-sm font-semibold text-[#1A1A1A] dark:text-[#EEEEEE]">
        {title}
      </span>
      <span className="block text-xs text-[#595959] dark:text-[#AAAAAA] leading-relaxed mt-0.5">
        {note}
      </span>
    </figcaption>
  );
}

export default function EngagementDashboard({ lang = "en", visitor = null }) {
  const L = (o) => o[lang];
  const uid = useId();
  const [seed, setSeed] = useState(FIRST_SEED);
  const [mod, setMod] = useState(0);
  const [message, setMessage] = useState("");

  const cohort = useMemo(() => makeCohort(seed), [seed]);
  const s = useMemo(() => summarise(cohort, visitor), [cohort, visitor]);

  const stage = (i) => L(D.funnel.stages[i]);
  const funnelList = (stats) =>
    stats.funnel
      .map((count, i) => fill(L(D.funnel.item), { stage: stage(i), count, pct: stats.pct(count) }))
      .join(lang === "zh" ? "，" : ", ");
  const funnelSummary = fill(L(D.funnel.summary), { list: funnelList(s) });

  const timeSummary = [
    fill(L(D.time.summary), {
      list: s.times
        .map((t, m) => fill(L(D.time.item), { m: m + 1, ...t }))
        .join(lang === "zh" ? "。" : ". "),
    }),
    visitor ? fill(L(D.time.you), { min: visitor.minutes.toFixed(1) }) : "",
  ]
    .filter(Boolean)
    .join(" ");

  const bins = s.scores[mod];
  const maxBin = Math.max(1, ...s.scores.flat());
  const youBin = visitor && mod === 0 ? visitor.score : null;
  const scoreSummary = [
    fill(L(D.score.summary), {
      m: mod + 1,
      list: bins
        .map((count, score) => fill(L(D.score.item), { score, count }))
        .join(lang === "zh" ? "，" : ", "),
    }),
    youBin != null ? fill(L(D.score.youIn), { score: youBin }) : "",
  ]
    .filter(Boolean)
    .join(" ");

  const reseed = () => {
    const next = nextSeed(seed);
    setSeed(next);
    const stats = summarise(makeCohort(next), visitor);
    setMessage(
      fill(L(D.reseeded), {
        seed: next,
        funnel: fill(L(D.funnel.summary), { list: funnelList(stats) }),
      })
    );
  };

  const kpis = [
    {
      k: L(D.kpi.learners),
      v: s.n,
      note: visitor ? L(D.kpi.learnersYou) : L(D.kpi.learnersNote),
    },
    {
      k: L(D.kpi.finished),
      v: `${s.pct(s.finished)}%`,
      note: fill(L(D.kpi.finishedNote), { count: s.finished, n: s.n }),
    },
    {
      k: L(D.kpi.drop),
      v: fill(L(D.kpi.dropValue), { m: s.drop.m }),
      note: fill(L(D.kpi.dropNote), { pct: s.drop.pct, m: s.drop.m }),
    },
    { k: L(D.kpi.score), v: s.avgScore.toFixed(1), note: L(D.kpi.scoreNote) },
  ];

  return (
    <section
      aria-labelledby={`${uid}-title`}
      className="min-w-0 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg overflow-hidden bg-white dark:bg-[#0A0A0A]"
    >
      {/* Label strip: synthetic, said before anything else */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 sm:px-5 py-3 border-b border-[#E0E0E0] dark:border-[#3D3D3D] bg-[#FAFAFA] dark:bg-[#111111]">
        <h3
          id={`${uid}-title`}
          className={`${META} font-mono flex items-center gap-2 text-[#CC0000] dark:text-[#FF3C3C]`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
          {L(D.kicker)}
        </h3>
        <p className="text-xs text-[#595959] dark:text-[#AAAAAA]">
          {fill(L(D.label), { n: s.n, seed })}
        </p>
      </div>

      <div className="px-4 sm:px-5 py-5 space-y-8">
        {/* Headline numbers and the reseed button */}
        <div>
          <dl className="grid grid-cols-2 gap-px bg-[#E0E0E0] dark:bg-[#3D3D3D] border border-[#E0E0E0] dark:border-[#3D3D3D] mb-3">
            {kpis.map(({ k, v, note }) => (
              <div key={k} className="bg-white dark:bg-[#0A0A0A] p-3 sm:p-4 min-w-0">
                <dt className={`${META} mb-1.5`}>{k}</dt>
                <dd className="font-display text-2xl sm:text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE] tabular-nums">
                  {v}
                </dd>
                <dd className="mt-1.5 text-[11px] text-[#595959] dark:text-[#AAAAAA] leading-snug">
                  {note}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={reseed} className={BTN}>
              {L(D.reseed)}
            </button>
            {visitor && <p className="text-xs text-[#595959] dark:text-[#AAAAAA]">{L(D.joined)}</p>}
          </div>
        </div>

        {/* Completion funnel */}
        <figure>
          <ChartTitle title={L(D.funnel.title)} note={L(D.funnel.note)} />
          <div
            role="img"
            aria-label={funnelSummary}
            className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2"
          >
            {s.funnel.map((count, i) => {
              const isDrop = i === s.drop.m;
              return (
                <div key={i} className="contents">
                  <span className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA] truncate">
                    {stage(i)}
                  </span>
                  <span className="relative h-4 bg-[#F0F0F0] dark:bg-[#1A1A1A]">
                    <span
                      className={`absolute inset-y-0 left-0 bg-[#1A1A1A] dark:bg-[#EEEEEE] ${EASE}`}
                      style={{ width: `${s.pct(count)}%` }}
                    />
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-right text-[#1A1A1A] dark:text-[#EEEEEE] whitespace-nowrap">
                    {count}
                    <span className="text-[#6E6E6E] dark:text-[#9A9A9A]"> · {s.pct(count)}%</span>
                    {isDrop && (
                      <span className="ml-1 text-[#CC0000] dark:text-[#FF3C3C]">
                        −{s.drop.pct}%
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </figure>

        {/* Time per module */}
        <figure>
          <ChartTitle title={L(D.time.title)} note={L(D.time.note)} />
          <div role="img" aria-label={timeSummary}>
            <div className="grid grid-cols-[2rem_minmax(0,1fr)_2.75rem] items-center gap-x-3 gap-y-3">
              {s.times.map((t, m) => {
                const you = visitor && m === 0;
                return (
                  <div key={m} className="contents">
                    <span className="font-mono text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
                      M{m + 1}
                    </span>
                    <span className="relative h-5">
                      <span className="absolute inset-x-0 top-1/2 h-px bg-[#E0E0E0] dark:bg-[#3D3D3D]" />
                      <span
                        className={`absolute top-1 bottom-1 bg-[#BDBDBD] dark:bg-[#595959] ${EASE}`}
                        style={{ left: pos(t.p25), width: `calc(${pos(t.p75)} - ${pos(t.p25)})` }}
                      />
                      <span
                        className={`absolute inset-y-0 w-0.5 -ml-px bg-[#1A1A1A] dark:bg-[#EEEEEE] ${EASE}`}
                        style={{ left: pos(t.median) }}
                      />
                      {you && (
                        <span
                          className="absolute top-1/2 w-2.5 h-2.5 -mt-[5px] -ml-[5px] bg-[#CC0000] dark:bg-[#FF3C3C] ring-2 ring-white dark:ring-[#0A0A0A]"
                          style={{ left: pos(visitor.minutes) }}
                        />
                      )}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-right text-[#1A1A1A] dark:text-[#EEEEEE]">
                      {t.median.toFixed(1)}
                    </span>
                  </div>
                );
              })}
              {/* Axis */}
              <span />
              <span className="relative h-4 font-mono text-[10px] text-[#6E6E6E] dark:text-[#9A9A9A]">
                {AXIS_TICKS.map((tick) => (
                  <span
                    key={tick}
                    className={`absolute top-0 ${
                      tick === 0 ? "" : tick === AXIS_MAX ? "-translate-x-full" : "-translate-x-1/2"
                    }`}
                    style={{ left: pos(tick) }}
                  >
                    {tick === AXIS_MAX ? `${tick}+` : tick}
                  </span>
                ))}
              </span>
              <span className={`${META} text-right`}>{L(D.time.unit)}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#595959] dark:text-[#AAAAAA]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-4 h-2.5 bg-[#BDBDBD] dark:bg-[#595959]" />
                {L(D.time.legendRange)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-0.5 h-3 bg-[#1A1A1A] dark:bg-[#EEEEEE]" />
                {L(D.time.legendMedian)}
              </span>
              {visitor && (
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 bg-[#CC0000] dark:bg-[#FF3C3C]" />
                  {L(D.you)} · {visitor.minutes.toFixed(1)} {L(D.time.unit)}
                </span>
              )}
            </div>
          </div>
        </figure>

        {/* Score distribution */}
        <figure>
          <ChartTitle title={L(D.score.title)} note={L(D.score.note)} />
          <fieldset className="min-w-0 mb-4">
            <legend className={`${META} mb-2`}>{L(D.score.pick)}</legend>
            <div className="flex flex-wrap gap-1.5">
              {COURSE.map((name, m) => (
                <label key={name.en} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name={`${uid}-module`}
                    value={m}
                    checked={mod === m}
                    onChange={() => setMod(m)}
                    aria-label={`${fill(L(D.score.pillLabel), { m: m + 1 })}, ${L(name)}`}
                    className="peer sr-only"
                  />
                  <span className={PILL} aria-hidden="true">
                    {fill(L(D.score.pill), { m: m + 1 })}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="text-xs text-[#3D3D3D] dark:text-[#AAAAAA] mb-3">
            {fill(L(D.score.pillLabel), { m: mod + 1 })} · {L(COURSE[mod])}
          </p>
          <div
            role="img"
            aria-label={scoreSummary}
            className="grid grid-cols-4 gap-2 sm:gap-3 items-end h-[148px]"
          >
            {bins.map((count, score) => {
              const you = youBin === score;
              return (
                <div key={score} className="flex flex-col items-center justify-end h-full min-w-0">
                  <span
                    className={`font-mono text-[11px] tabular-nums mb-1 ${
                      you
                        ? "text-[#CC0000] dark:text-[#FF3C3C]"
                        : "text-[#1A1A1A] dark:text-[#EEEEEE]"
                    }`}
                  >
                    {you ? `${count} · ${L(D.you)}` : count}
                  </span>
                  <span
                    className={`block w-full max-w-[56px] ${EASE} ${
                      you
                        ? "bg-[#1A1A1A] dark:bg-[#EEEEEE] outline outline-2 outline-offset-2 outline-[#CC0000] dark:outline-[#FF3C3C]"
                        : "bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                    }`}
                    style={{ height: `${Math.max(2, (count / maxBin) * 100)}px` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-2 border-t border-[#E0E0E0] dark:border-[#3D3D3D] pt-1.5">
            {bins.map((_, score) => (
              <span
                key={score}
                className="text-center font-mono text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A]"
              >
                {fill(L(D.score.bar), { score })}
              </span>
            ))}
          </div>
        </figure>

        {/* The same figures as tables */}
        <details className="group border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-4">
          <summary
            className={`cursor-pointer list-none [&::-webkit-details-marker]:hidden inline-flex items-center gap-2 min-h-[44px] text-xs tracking-widest uppercase text-[#595959] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white ${FOCUS}`}
          >
            <span
              aria-hidden="true"
              className="font-mono transition-transform duration-150 motion-reduce:transition-none group-open:rotate-90"
            >
              ▸
            </span>
            {L(D.numbers)}
          </summary>
          <div className="mt-3 space-y-6 text-xs">
            <div className="overflow-x-auto">
              <table className="w-full">
                <caption className={`${META} text-left mb-2`}>{L(D.table.funnel.caption)}</caption>
                <thead>
                  <tr>
                    {D.table.funnel.head.map((h) => (
                      <th key={h.en} scope="col" className={TH}>
                        {L(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.funnel.map((count, i) => (
                    <tr key={i} className="border-t border-[#F0F0F0] dark:border-[#1A1A1A]">
                      <th scope="row" className={TH}>
                        {stage(i)}
                      </th>
                      <td className={TD}>{count}</td>
                      <td className={TD}>{s.pct(count)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <caption className={`${META} text-left mb-2`}>{L(D.table.time.caption)}</caption>
                <thead>
                  <tr>
                    {D.table.time.head.map((h) => (
                      <th key={h.en} scope="col" className={TH}>
                        {L(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.times.map((t, m) => (
                    <tr key={m} className="border-t border-[#F0F0F0] dark:border-[#1A1A1A]">
                      <th scope="row" className={TH}>
                        {L(COURSE[m])}
                      </th>
                      <td className={TD}>{t.p25.toFixed(1)}</td>
                      <td className={TD}>{t.median.toFixed(1)}</td>
                      <td className={TD}>{t.p75.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <caption className={`${META} text-left mb-2`}>{L(D.table.score.caption)}</caption>
                <thead>
                  <tr>
                    {D.table.score.head.map((h) => (
                      <th key={h.en} scope="col" className={TH}>
                        {L(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.scores.map((row, m) => (
                    <tr key={m} className="border-t border-[#F0F0F0] dark:border-[#1A1A1A]">
                      <th scope="row" className={TH}>
                        {L(COURSE[m])}
                      </th>
                      {row.map((count, score) => (
                        <td key={score} className={TD}>
                          {count}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      </div>

      <p className="px-4 sm:px-5 py-3 border-t border-[#E0E0E0] dark:border-[#3D3D3D] text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed">
        {L(D.footer)}
      </p>

      <p role="status" aria-live="polite" className="sr-only">
        {message}
      </p>
    </section>
  );
}
