/**
 * Daybook: a small daily habits check-in, Rin's own mini project, shown as a
 * concept demo on /projects/moodist. Three questions (rated 1 to 5) and a "Save
 * today" button fill the last square of a four-week dot grid of synthetic
 * history. Copy, questions and data live in lib/daybook-data.js. State lives in
 * memory only: nothing is stored or sent.
 *
 * Accessibility: each question is a native radio group (arrow keys move between
 * ratings), the grid has a text summary for screen readers, saves are announced
 * in a polite live region, and the one small pulse is skipped when the visitor
 * prefers reduced motion.
 */
import { Fragment, useMemo, useState } from "react";
import { fill } from "@/lib/fill";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  DAYBOOK as C,
  DAYBOOK_QUESTIONS as QUESTIONS,
  DAYBOOK_HISTORY as HISTORY,
} from "@/lib/daybook-data";

const RATINGS = [1, 2, 3, 4, 5];

// Grid: four weeks of seven days. 27 synthetic days plus today fill it.
const COLS = 7;
const SLOTS = HISTORY.length + 1;

// Dot diameter as a share of its square: 30% at a score of 1, 100% at 5.
const dot = (v) => `${Math.round(30 + ((v - 1) / 4) * 70)}%`;
const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const one = (n) => n.toFixed(1);

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";

function RatingGroup({ question, value, onChange, lang }) {
  const L = (o) => o[lang];
  const name = `daybook-${question.id}`;
  return (
    <fieldset className="bg-white dark:bg-[#0A0A0A] p-5 min-w-0">
      <legend className="sr-only">{L(question.q)}</legend>
      <p
        aria-hidden="true"
        className="text-[15px] leading-snug text-[#1A1A1A] dark:text-[#EEEEEE] mb-4 md:min-h-[2.75rem]"
      >
        {L(question.q)}
      </p>
      <div className="flex items-center gap-2">
        {RATINGS.map((n) => {
          const end = n === 1 ? L(question.low) : n === 5 ? L(question.high) : null;
          return (
            <label key={n} className="relative cursor-pointer">
              <input
                type="radio"
                name={name}
                value={n}
                checked={value === n}
                onChange={() => onChange(question.id, n)}
                aria-label={end ? `${n}, ${end}` : String(n)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm transition-colors duration-150 motion-reduce:transition-none border-[#E0E0E0] text-[#595959] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#AAAAAA] dark:hover:border-[#EEEEEE] peer-checked:border-[#1A1A1A] peer-checked:bg-[#1A1A1A] peer-checked:text-white dark:peer-checked:border-[#EEEEEE] dark:peer-checked:bg-[#EEEEEE] dark:peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#CC0000] dark:peer-focus-visible:outline-[#FF3C3C]"
              >
                {n}
              </span>
            </label>
          );
        })}
      </div>
      <div aria-hidden="true" className={`${META} mt-2 flex justify-between w-[232px]`}>
        <span>{L(question.low)}</span>
        <span>{L(question.high)}</span>
      </div>
    </fieldset>
  );
}

export default function Daybook({ lang = "en" }) {
  const L = (o) => o[lang];
  const reduced = useReducedMotion();

  const [answers, setAnswers] = useState({});
  const [today, setToday] = useState(null); // saved score for today, or null
  const [saves, setSaves] = useState(0); // replays the pulse on each save
  const [message, setMessage] = useState("");

  const answered = QUESTIONS.filter((q) => answers[q.id]).length;
  const complete = answered === QUESTIONS.length;

  const series = useMemo(() => (today == null ? HISTORY : [...HISTORY, today]), [today]);
  const week = one(mean(series.slice(-7)));

  // Rows of seven. Today's square holds null until it is saved.
  const weeks = useMemo(() => {
    const slots = [...HISTORY, today];
    return Array.from({ length: SLOTS / COLS }, (_, w) => slots.slice(w * COLS, w * COLS + COLS));
  }, [today]);
  const weekAvg = (w) => one(mean(weeks[w]));

  const setAnswer = (id, n) => {
    setAnswers((a) => ({ ...a, [id]: n }));
    setMessage("");
  };

  const save = () => {
    if (!complete) {
      setMessage(L(C.needAll));
      return;
    }
    const score = Math.round(mean(QUESTIONS.map((q) => answers[q.id])) * 10) / 10;
    const nextWeek = one(mean([...HISTORY, score].slice(-7)));
    setToday(score);
    setSaves((s) => s + 1);
    setMessage(fill(L(C.saved), { today: one(score), week: nextWeek }));
  };

  const reset = () => {
    setAnswers({});
    setToday(null);
    setMessage("");
  };

  const summary = fill(L(C.summary), {
    w1: weekAvg(0),
    w2: weekAvg(1),
    w3: weekAvg(2),
    week,
    todayText: today == null ? L(C.todayUnsaved) : fill(L(C.todaySaved), { today: one(today) }),
  });

  return (
    <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
      {/* Label strip: what this is, stated before anything else. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 border-b border-[#E0E0E0] dark:border-[#3D3D3D] bg-[#FAFAFA] dark:bg-[#111111]">
        <p
          className={`${META} font-mono flex items-center gap-2 text-[#CC0000] dark:text-[#FF3C3C]`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
          {L(C.kicker)}
        </p>
        <p className="text-xs text-[#595959] dark:text-[#AAAAAA]">{L(C.label)}</p>
      </div>

      {/* Questions */}
      <div className="grid md:grid-cols-3 gap-px bg-[#E0E0E0] dark:bg-[#3D3D3D] border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
        {QUESTIONS.map((q) => (
          <RatingGroup
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={setAnswer}
            lang={lang}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
        <button
          type="button"
          onClick={save}
          className="min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] dark:hover:text-black transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]"
        >
          {today == null ? L(C.save) : L(C.update)}
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-[40px] rounded-full px-4 text-xs tracking-widest uppercase border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#595959] dark:text-[#AAAAAA] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]"
        >
          {L(C.reset)}
        </button>
        <p className={`${META} font-mono`} aria-hidden="true">
          {answered}/{QUESTIONS.length}
        </p>
        <p
          role="status"
          aria-live="polite"
          className="basis-full text-sm text-[#3D3D3D] dark:text-[#AAAAAA] min-h-[1.25rem]"
        >
          {message}
        </p>
      </div>

      {/* Habit grid: four weeks, one square a day */}
      <div className="relative px-5 pt-5 pb-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-[#EDEDED] dark:text-[#1C1C1C]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1.3px)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <p className={`${META} font-mono`}>{L(C.chartTitle)}</p>
            <dl className="flex gap-6">
              <div>
                <dt className={META}>{L(C.today)}</dt>
                <dd
                  className={`font-display text-2xl leading-none mt-1 ${
                    today == null
                      ? "text-[#9A9A9A] dark:text-[#6E6E6E]"
                      : "text-[#CC0000] dark:text-[#FF3C3C]"
                  }`}
                >
                  {today == null ? (
                    <span className="text-xs tracking-widest uppercase font-sans">
                      {L(C.notSaved)}
                    </span>
                  ) : (
                    one(today)
                  )}
                </dd>
              </div>
              <div>
                <dt className={META}>{L(C.average7)}</dt>
                <dd className="font-display text-2xl leading-none mt-1 text-[#1A1A1A] dark:text-[#EEEEEE]">
                  {week}
                </dd>
              </div>
            </dl>
          </div>

          {/* Screen readers get this summary. The grid itself is visual only. */}
          <p className="sr-only">{summary}</p>

          <div
            aria-hidden="true"
            className="grid max-w-[460px] grid-cols-[auto_repeat(7,minmax(0,1fr))_auto] items-center gap-1.5 font-mono"
          >
            <span />
            {Array.from({ length: COLS }, (_, d) => (
              <span key={d} />
            ))}
            <span className={`${META} text-right pl-1`}>{L(C.avg)}</span>

            {weeks.map((days, w) => (
              <Fragment key={w}>
                <span className="whitespace-nowrap pr-1 text-[10px] text-[#6E6E6E] dark:text-[#9A9A9A]">
                  {L(C.weeks[w])}
                </span>
                {days.map((v, d) => {
                  const isToday = w * COLS + d === SLOTS - 1;
                  return (
                    <span
                      key={d}
                      className="relative flex aspect-square items-center justify-center rounded-full bg-[#F0F0F0] dark:bg-[#1A1A1A]"
                    >
                      {v == null ? (
                        <span className="absolute inset-0 rounded-full border border-dashed border-[#9A9A9A] dark:border-[#6E6E6E]" />
                      ) : (
                        <span
                          className={`block rounded-full transition-[width,height] duration-300 motion-reduce:transition-none ${
                            isToday
                              ? "bg-[#CC0000] dark:bg-[#FF3C3C]"
                              : "bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                          }`}
                          style={{ width: dot(v), height: dot(v) }}
                        />
                      )}
                      {isToday && v != null && !reduced && (
                        <svg
                          key={saves}
                          viewBox="0 0 40 40"
                          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="16"
                            fill="none"
                            className="stroke-[#CC0000] dark:stroke-[#FF3C3C]"
                            strokeWidth="1.5"
                          >
                            <animate attributeName="r" from="16" to="28" dur="0.9s" fill="freeze" />
                            <animate
                              attributeName="opacity"
                              from="0.8"
                              to="0"
                              dur="0.9s"
                              fill="freeze"
                            />
                          </circle>
                        </svg>
                      )}
                    </span>
                  );
                })}
                <span className="pl-1 text-right text-[11px] tabular-nums text-[#1A1A1A] dark:text-[#EEEEEE]">
                  {one(mean(days.filter((v) => v != null)))}
                </span>
              </Fragment>
            ))}

            <span />
            {Array.from({ length: COLS - 1 }, (_, d) => (
              <span key={d} />
            ))}
            <span className="whitespace-nowrap text-center text-[10px] text-[#CC0000] dark:text-[#FF3C3C]">
              {L(C.today)}
            </span>
            <span />
          </div>

          <div
            aria-hidden="true"
            className="mt-4 flex items-center gap-2 text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A]"
          >
            <span className="flex items-center gap-1">
              {RATINGS.map((n) => (
                <span key={n} className="flex h-3.5 w-3.5 items-center justify-center">
                  <span
                    className="block rounded-full bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                    style={{ width: dot(n), height: dot(n) }}
                  />
                </span>
              ))}
            </span>
            {L(C.legend)}
          </div>
        </div>
      </div>

      <p className="px-5 py-3 border-t border-[#E0E0E0] dark:border-[#3D3D3D] text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed">
        {L(C.privacy)}
      </p>
    </div>
  );
}
