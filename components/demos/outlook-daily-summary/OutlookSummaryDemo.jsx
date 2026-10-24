/**
 * The live demo on /projects/outlook-daily-summary: run outlook_daily_summary.py's
 * counting rules (./summary.js) on a synthetic mailbox at 10:00, 14:00 and
 * 17:00, and watch the console, the Daily Log row, the Detail sheet and the
 * tracking file update. Running twice at the same time counts nothing new.
 *
 * Everything stays in the browser. Square corners, ink on paper, dots for
 * counts; the only red is the "runs in your browser" dot, the live part.
 */
import { useState } from "react";
import ScrollRegion from "@/components/ui/ScrollRegion";
import Tabs, { tabPanelProps } from "@/components/ui/Tabs";
import { fill } from "@/lib/fill";
import { DAY, DEMO_COPY as C, MAILBOX, RUN_TIMES } from "@/lib/demos/outlook-daily-summary-data";
import { LOG_COLUMNS, detailSections, initialState, logRow, runScript } from "./summary";

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const PANEL = "border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A]";
const META = "text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]";
const MUTED = "text-[#5C5C5C] dark:text-[#9A9A9A]";
const INK = "text-[#1A1A1A] dark:text-[#EEEEEE]";

const toMinutes = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));

/** Status of one email at the current clock: counted, waiting or later. */
function mailStatus(item, counted, clock) {
  if (counted.has(item.id)) return "counted";
  return clock && toMinutes(item.time) <= toMinutes(clock) ? "waiting" : "later";
}

function Glyph({ status }) {
  if (status === "counted")
    return <span className="inline-block w-2 h-2 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]" />;
  if (status === "waiting")
    return (
      <span className="inline-block w-2 h-2 rounded-full border border-[#1A1A1A] dark:border-[#EEEEEE]" />
    );
  return <span className="inline-block w-1 h-1 mx-0.5 rounded-full bg-[#8A8A8A]" />;
}

/** The day's mail in one list, oldest first, received and sent together. */
function MailTimeline({ counted, clock, L }) {
  const items = [...MAILBOX.inbox, ...MAILBOX.sent].sort(
    (a, b) => toMinutes(a.time) - toMinutes(b.time) || (a.folder === "inbox" ? -1 : 1)
  );
  const tally = (list) => `${list.filter((it) => counted.has(it.id)).length}/${list.length}`;
  return (
    <div className="min-w-0">
      <h4 className={`${META} mb-2 flex flex-wrap items-baseline justify-between gap-2`}>
        <span>{L(C.mailList)}</span>
        <span className="font-mono normal-case tracking-normal">
          {L(C.inbox)} {tally(MAILBOX.inbox)} · {L(C.sent)} {tally(MAILBOX.sent)}
        </span>
      </h4>
      <div
        role="region"
        aria-label={L(C.mailList)}
        tabIndex={0}
        className={`max-h-[460px] overflow-y-auto border-y border-[#E0E0E0] dark:border-[#3D3D3D] ${FOCUS}`}
      >
        <ul className="divide-y divide-[#F0F0F0] dark:divide-[#1E1E1E]">
          {items.map((it) => {
            const status = mailStatus(it, counted, clock);
            const sent = it.folder === "sent";
            return (
              <li
                key={it.id}
                className={`grid grid-cols-[12px_40px_30px_minmax(0,1fr)] gap-x-2 py-1.5 pr-2 text-xs ${
                  status === "later" ? MUTED : INK
                }`}
              >
                <span className="pt-1" aria-hidden="true">
                  <Glyph status={status} />
                </span>
                <span className="font-mono tabular-nums">{it.time}</span>
                <span className={`font-mono text-[10px] uppercase pt-px ${MUTED}`}>
                  {sent ? L(C.out) : L(C.in)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate">
                    {sent ? `${L(C.to)}: ${it.to}` : it.senderName}
                  </span>
                  <span className={`block truncate ${MUTED}`}>
                    {it.subject}
                    {it.attachments > 0 &&
                      ` · ${fill(L(C.attachments[it.attachments === 1 ? "one" : "many"]), { n: it.attachments })}`}
                    {!sent && it.repliedAt && ` · ${fill(L(C.replied), { time: it.repliedAt })}`}
                  </span>
                  <span className="sr-only"> · {L(C.legend[status])}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const cell = (v) => (typeof v === "number" ? String(v) : v);

function DailyLog({ stats }) {
  return (
    <ScrollRegion label="Daily Log" scrollerClassName="pb-2">
      <table className="min-w-max border-collapse text-xs font-mono tabular-nums">
        <thead>
          <tr>
            {LOG_COLUMNS.map((h) => (
              <th
                key={h}
                scope="col"
                className="bg-[#1A1A1A] dark:bg-[#EEEEEE] text-white dark:text-[#0A0A0A] font-medium px-3 py-2 text-center whitespace-nowrap border border-[#1A1A1A] dark:border-[#EEEEEE]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {logRow(stats).map((v, i) => (
              <td
                key={LOG_COLUMNS[i]}
                className={`px-3 py-2 text-center whitespace-nowrap border border-[#E0E0E0] dark:border-[#3D3D3D] ${INK}`}
              >
                {cell(v)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </ScrollRegion>
  );
}

/** A count as a row of dots, one per email (the hourly sections). */
function Dots({ n }) {
  return (
    <span className="inline-flex gap-[3px] align-middle" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]" />
      ))}
    </span>
  );
}

function DetailSheet({ stats, isRerun }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {detailSections(stats, isRerun).map((s) => (
        <table
          key={s.title}
          className="w-full border-collapse text-xs self-start border border-[#E0E0E0] dark:border-[#3D3D3D]"
        >
          <caption
            className={`text-left font-semibold px-3 py-2 bg-[#F5F5F5] dark:bg-[#1A1A1A] border border-b-0 border-[#E0E0E0] dark:border-[#3D3D3D] ${INK}`}
          >
            {s.title}
          </caption>
          <thead>
            <tr>
              {s.headers.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="bg-[#1A1A1A] dark:bg-[#EEEEEE] text-white dark:text-[#0A0A0A] font-medium px-3 py-1.5 text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((row) => (
              <tr key={row.join("|")} className="border-t border-[#F0F0F0] dark:border-[#1E1E1E]">
                {row.map((v, i) => (
                  <td
                    key={i}
                    className={`px-3 py-1.5 ${i === row.length - 1 ? "font-mono tabular-nums" : ""} ${INK}`}
                  >
                    {s.hourly && i === 1 ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 text-right">{v}</span>
                        <Dots n={v} />
                      </span>
                    ) : (
                      cell(v)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

/** email_tracking.json, with long lists shortened. */
function trackingJson(acc) {
  const show = (v) => {
    if (v instanceof Map) return Object.fromEntries(v);
    if (Array.isArray(v) && v.length > 4) return [...v.slice(0, 4), `… ${v.length - 4} more`];
    return v;
  };
  const day = Object.fromEntries(Object.entries(acc).map(([k, v]) => [k, show(v)]));
  return JSON.stringify({ [DAY.iso]: day }, null, 2);
}

export default function OutlookSummaryDemo({ lang = "en" }) {
  const L = (o) => o[lang];
  const [clock, setClock] = useState(RUN_TIMES[0]);
  const [state, setState] = useState(initialState);
  const [lines, setLines] = useState([]);
  const [sheet, setSheet] = useState("log");

  const counted = new Set(state.tracking?.counted_entryids || []);
  const run = () => {
    const r = runScript(state, MAILBOX, DAY, clock);
    setState(r.state);
    setLines(r.lines);
  };
  const reset = () => {
    setState(initialState());
    setLines([]);
    setClock(RUN_TIMES[0]);
    setSheet("log");
  };
  const sheets = [
    { id: "log", label: "Daily Log" },
    { id: "detail", label: `Detail ${DAY.iso}` },
    { id: "tracking", label: "email_tracking.json" },
  ];
  const btn = `inline-flex items-center justify-center min-h-[40px] px-4 text-xs tracking-widest uppercase transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;

  return (
    <div className={`${PANEL} p-4 md:p-6`}>
      {/* Header and controls */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <p className={`${META} mb-1`}>{L(C.mailbox)}</p>
          <p className={`text-sm font-medium ${INK}`}>{L(C.day)}</p>
        </div>
        <p className={`${META} inline-flex items-center gap-2`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
          {L(C.inBrowser)}
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3 mb-2">
        <fieldset>
          <legend className={`${META} mb-1.5`}>{L(C.runTime)}</legend>
          <div className="flex">
            {RUN_TIMES.map((t) => {
              const past = state.clock && toMinutes(t) < toMinutes(state.clock);
              const on = clock === t;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  disabled={past}
                  onClick={() => setClock(t)}
                  className={`${btn} font-mono -ml-px first:ml-0 border ${
                    on
                      ? "border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] text-white dark:text-[#0A0A0A]"
                      : "border-[#BDBDBD] dark:border-[#4A4A4A] text-[#1A1A1A] dark:text-[#EEEEEE] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE]"
                  } disabled:cursor-not-allowed disabled:text-[#8A8A8A] disabled:border-[#E0E0E0] dark:disabled:border-[#2A2A2A] disabled:line-through`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </fieldset>
        <button
          type="button"
          onClick={run}
          className={`${btn} border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#1A1A1A] dark:bg-[#EEEEEE] text-white dark:text-[#0A0A0A] hover:bg-black dark:hover:bg-white`}
        >
          {L(C.run)} <span aria-hidden="true">&nbsp;→</span>
        </button>
        <button
          type="button"
          onClick={reset}
          className={`${btn} border border-[#BDBDBD] dark:border-[#4A4A4A] ${INK} hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE]`}
        >
          {L(C.reset)}
        </button>
      </div>
      <p className={`text-xs mb-6 ${MUTED}`}>
        {L(C.earlier)} {fill(L(C.runCount), { n: state.runs })}
      </p>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Mailbox */}
        <div className="min-w-0">
          <ul className={`flex flex-wrap gap-x-4 gap-y-1 mb-3 text-xs ${MUTED}`}>
            {["counted", "waiting", "later"].map((s) => (
              <li key={s} className="inline-flex items-center gap-1.5">
                <span aria-hidden="true">
                  <Glyph status={s} />
                </span>
                {L(C.legend[s])}
              </li>
            ))}
          </ul>
          <MailTimeline counted={counted} clock={state.clock} L={L} />
        </div>

        {/* Console */}
        <div className="min-w-0">
          <h4 className={`${META} mb-2`}>{L(C.console)}</h4>
          <div
            role="log"
            aria-live="polite"
            aria-label={L(C.console)}
            className="border border-[#1A1A1A] dark:border-[#3D3D3D] bg-[#0A0A0A] text-[#E0E0E0] p-4 font-mono text-[11px] leading-relaxed min-h-[260px]"
          >
            {lines.length === 0 ? (
              <p className="text-[#B4B4B4]">{L(C.consoleEmpty)}</p>
            ) : (
              <>
                <p className="text-[#B4B4B4]">&gt; python outlook_daily_summary.py</p>
                {lines.map((l, i) =>
                  l.tone === "rule" ? (
                    <p key={i} className="my-1.5 border-t border-dashed border-[#5C5C5C]" />
                  ) : (
                    <p
                      key={i}
                      className={`whitespace-pre-wrap break-words ${
                        l.tone === "strong"
                          ? "text-white font-semibold"
                          : l.tone === "dim"
                            ? "text-[#A0A0A0]"
                            : ""
                      }`}
                    >
                      {l.text}
                    </p>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Workbook */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h4 className={META}>{L(C.workbook)} · DailyEmailSummary.xlsx</h4>
          <p className={`text-xs ${MUTED}`}>{L(C.workbookNote)}</p>
        </div>
        {!state.stats ? (
          <p
            className={`border border-dashed border-[#BDBDBD] dark:border-[#4A4A4A] p-6 text-sm ${MUTED}`}
          >
            {L(C.workbookEmpty)}
          </p>
        ) : (
          <>
            <ScrollRegion label={L(C.sheets)} focusable={false}>
              <Tabs
                idBase="ods-sheets"
                label={L(C.sheets)}
                items={sheets}
                value={sheet}
                onChange={setSheet}
                className="flex"
                tabClassName={(selected) =>
                  `${FOCUS} shrink-0 -mb-px px-3 py-2 text-xs font-mono whitespace-nowrap border ${
                    selected
                      ? "border-[#1A1A1A] dark:border-[#EEEEEE] border-b-white dark:border-b-[#0A0A0A] text-[#1A1A1A] dark:text-[#EEEEEE] bg-white dark:bg-[#0A0A0A]"
                      : "border-transparent text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white"
                  }`
                }
              />
            </ScrollRegion>
            <div
              {...tabPanelProps("ods-sheets", sheet)}
              className={`border border-[#1A1A1A] dark:border-[#EEEEEE] p-3 md:p-4 ${FOCUS}`}
            >
              {sheet === "log" && <DailyLog stats={state.stats} />}
              {sheet === "detail" && <DetailSheet stats={state.stats} isRerun={state.isRerun} />}
              {sheet === "tracking" && (
                <>
                  <p className={`text-xs mb-3 ${MUTED}`}>
                    {fill(L(C.tracking), {
                      n: state.tracking.counted_entryids.length,
                      date: DAY.iso,
                    })}
                  </p>
                  <ScrollRegion label="email_tracking.json">
                    <pre className={`text-[11px] leading-relaxed font-mono ${INK}`}>
                      {trackingJson(state.tracking)}
                    </pre>
                  </ScrollRegion>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
