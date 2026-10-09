/**
 * EchoDemo: a scripted concept demo for /projects/psyckitchen-echo. It plays a
 * made-up conversation across two evenings and fills a "What Echo keeps" panel
 * on the first, then lights up each note when Echo recalls it on the second.
 * Every line is in lib/psyckitchen-echo-data.js. There is no input box and no
 * network call: the demo only reveals the next scripted line on a timer.
 *
 * Accessibility: the conversation is a role="log" region, so new lines are read
 * politely as they appear. The typing dots are hidden from screen readers, and
 * an Echo line that recalls a note says which note in screen-reader text. The
 * Play button keeps its name while a day plays (it is aria-disabled, so a
 * second press does nothing), and Skip is its own button. A polite status line
 * says when a day ends. Every control is a native button. When the visitor
 * prefers reduced motion, Play reveals the whole evening at once and nothing
 * animates.
 *
 * Palette (warm and friendly, scoped to this page): cream #FFEAC1, soft orange
 * #F4AA4F for shapes only, #9C4A00 for orange text (5.2:1 on
 * cream), ink #3B2A1A. Dark theme: warm brown #241B12 with cream text.
 */
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DEMO as C, MEMORY, SCRIPT } from "@/lib/psyckitchen-echo-data";
import EchoIllustration from "@/components/psyckitchen/EchoIllustration";

const DAY_ENDS = [SCRIPT.filter((m) => m.day === 0).length, SCRIPT.length];
const STEP_MS = 1100;

const BTN =
  "min-h-[44px] rounded-full px-5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9C4A00] dark:focus-visible:outline-[#F4AA4F]";
const BTN_MAIN = `${BTN} bg-[#9C4A00] text-white hover:bg-[#7F3C00] dark:bg-[#F4AA4F] dark:text-[#241B12] dark:hover:bg-[#F7BE73] aria-disabled:cursor-default`;
const BTN_SOFT = `${BTN} border-2 border-[#F4AA4F] text-[#3B2A1A] hover:bg-[#FFEAC1] dark:text-[#FFEAC1] dark:hover:bg-[#3A2C1E]`;

function Avatar() {
  return <EchoIllustration compact className="h-8 w-8 shrink-0" />;
}

export default function EchoDemo({ lang = "en" }) {
  const L = (o) => o[lang];
  const reduced = useReducedMotion();
  const logRef = useRef(null);
  const mainRef = useRef(null);
  const skipRef = useRef(null);
  // Set when the day ends while Skip has focus, so focus can move to Play
  // instead of dropping to the page when Skip disappears.
  const refocusMain = useRef(false);

  // `shown` lines are on screen. While `shown` < `target`, a timer reveals the next.
  const [shown, setShown] = useState(0);
  const [target, setTarget] = useState(0);
  const playing = shown < target;
  const done = shown === SCRIPT.length;
  const nextIsEcho = playing && SCRIPT[shown]?.from === "echo";

  useEffect(() => {
    if (shown >= target) return undefined;
    const id = setTimeout(() => {
      if (shown + 1 >= target && document.activeElement === skipRef.current) {
        refocusMain.current = true;
      }
      setShown((s) => Math.min(s + 1, target));
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [shown, target]);

  useEffect(() => {
    if (!refocusMain.current) return;
    refocusMain.current = false;
    mainRef.current?.focus();
  });

  // Keep the newest line in view inside the log, without moving the page.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, nextIsEcho]);

  const play = (end) => {
    setTarget(end);
    if (reduced) setShown(end);
    else setShown((s) => s + 1);
  };
  // "Skip", "Show the whole script" and "Start again" can vanish once pressed,
  // so focus moves to the main button instead of dropping to the page.
  const skip = () => {
    setShown(target);
    mainRef.current?.focus();
  };
  const showAll = () => {
    setTarget(SCRIPT.length);
    setShown(SCRIPT.length);
    mainRef.current?.focus();
  };
  const restart = () => {
    setTarget(0);
    setShown(0);
    mainRef.current?.focus();
  };

  // While a day plays, the main button keeps its "Play day N" name and is
  // aria-disabled, so a double press cannot skip the day by accident.
  const day = shown < DAY_ENDS[0] ? 0 : 1;
  const playingDay = target <= DAY_ENDS[0] ? 0 : 1;
  let main;
  if (playing) main = { label: L(C.play[playingDay]), onClick: undefined };
  else if (done) main = { label: L(C.restart), onClick: restart };
  else main = { label: L(C.play[day]), onClick: () => play(DAY_ENDS[day]) };

  let status = "";
  if (!playing && done) status = L(C.status[1]);
  else if (!playing && shown === DAY_ENDS[0]) status = L(C.status[0]);

  const visible = SCRIPT.slice(0, shown);
  const recalled = new Set(visible.map((m) => m.recalls).filter(Boolean));
  const notes = MEMORY.filter((n) => shown > n.at);
  const noteText = (id) => L(MEMORY.find((n) => n.id === id).text);
  const enter = reduced ? "" : "animate-enter-up";

  return (
    <div className="rounded-[2rem] border-2 border-[#F2D3A0] dark:border-[#4A3826] bg-[#FFEAC1] dark:bg-[#241B12] overflow-hidden">
      {/* Label strip: what this is, stated before anything else. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 md:px-6 py-3 border-b-2 border-[#F2D3A0] dark:border-[#4A3826]">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[#9C4A00] dark:text-[#F4AA4F]">
          <span className="h-2 w-2 bg-[#F4AA4F]" aria-hidden="true" />
          {L(C.kicker)}
        </p>
        <p className="text-xs text-[#6B5440] dark:text-[#E9D3AE]">{L(C.label)}</p>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_240px]">
        {/* Conversation */}
        <div className="p-4 md:p-6 md:border-r-2 border-[#F2D3A0] dark:border-[#4A3826]">
          <div
            ref={logRef}
            role="log"
            aria-label={L(C.logLabel)}
            tabIndex={0}
            className="h-[380px] md:h-[420px] overflow-y-auto rounded-3xl bg-[#FFF6E3] dark:bg-[#2E2318] p-4 space-y-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9C4A00] dark:focus-visible:outline-[#F4AA4F]"
          >
            {shown === 0 && (
              <p className="h-full flex items-center justify-center text-center text-sm text-[#6B5440] dark:text-[#E9D3AE] px-6">
                {L(C.empty)}
              </p>
            )}
            {visible.map((m, i) => {
              const firstOfDay = i === 0 || visible[i - 1].day !== m.day;
              const echo = m.from === "echo";
              return (
                <div key={i} className={enter}>
                  {firstOfDay && (
                    <p className="flex items-center gap-3 py-2 text-[11px] font-semibold tracking-wide uppercase text-[#9C4A00] dark:text-[#F4AA4F]">
                      <span
                        className="h-px flex-1 bg-[#F2D3A0] dark:bg-[#4A3826]"
                        aria-hidden="true"
                      />
                      {L(C.days[m.day])}
                      <span
                        className="h-px flex-1 bg-[#F2D3A0] dark:bg-[#4A3826]"
                        aria-hidden="true"
                      />
                    </p>
                  )}
                  <div className={`flex items-end gap-2 ${echo ? "" : "justify-end"}`}>
                    {echo && <Avatar />}
                    <p
                      className={`max-w-[80%] px-4 py-2.5 text-[15px] leading-snug ${
                        echo
                          ? "rounded-3xl rounded-bl-md bg-white text-[#3B2A1A] dark:bg-[#3A2C1E] dark:text-[#FFEAC1]"
                          : "rounded-3xl rounded-br-md bg-[#F4AA4F] text-[#3B2A1A] dark:text-[#241B12]"
                      }`}
                    >
                      <span className="sr-only">{echo ? L(C.echo) : L(C.user)}: </span>
                      {L(m.text)}
                      {m.recalls && (
                        <span className="sr-only">
                          {" "}
                          {L(C.recallsNote).replace("{note}", noteText(m.recalls))}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* Visual only: inside the log, a spoken "Echo is typing" would be
                read before every Echo line. */}
            {nextIsEcho && (
              <div className="flex items-end gap-2" aria-hidden="true">
                <Avatar />
                <p className="flex items-center gap-1.5 rounded-3xl rounded-bl-md bg-white dark:bg-[#3A2C1E] px-4 py-3.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 bg-[#F4AA4F]" />
                  ))}
                </p>
              </div>
            )}
          </div>

          <p className="sr-only" role="status">
            {status}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              ref={mainRef}
              type="button"
              onClick={main.onClick}
              aria-disabled={playing || undefined}
              className={BTN_MAIN}
            >
              {main.label}
            </button>
            {playing && (
              <button ref={skipRef} type="button" onClick={skip} className={BTN_SOFT}>
                {L(C.skip)}
              </button>
            )}
            {!done && (
              <button type="button" onClick={showAll} className={BTN_SOFT}>
                {L(C.showAll)}
              </button>
            )}
            {shown > 0 && !done && (
              <button type="button" onClick={restart} className={BTN_SOFT}>
                {L(C.restart)}
              </button>
            )}
          </div>
        </div>

        {/* Memory panel */}
        <div className="p-4 md:p-6 border-t-2 md:border-t-0 border-[#F2D3A0] dark:border-[#4A3826]">
          <h3 className="text-sm font-semibold text-[#3B2A1A] dark:text-[#FFEAC1] mb-3">
            {L(C.memoryTitle)}
          </h3>
          {notes.length === 0 ? (
            <p className="text-sm text-[#6B5440] dark:text-[#E9D3AE]">{L(C.memoryEmpty)}</p>
          ) : (
            <ul className="space-y-2">
              {notes.map((n) => {
                const hit = recalled.has(n.id);
                return (
                  <li
                    key={n.id}
                    className={`${enter} rounded-2xl border-2 px-3 py-2.5 text-sm leading-snug transition-colors duration-200 motion-reduce:transition-none ${
                      hit
                        ? "border-[#F4AA4F] bg-[#F4AA4F] text-[#3B2A1A] dark:text-[#241B12]"
                        : "border-[#F2D3A0] bg-[#FFF6E3] text-[#3B2A1A] dark:border-[#4A3826] dark:bg-[#2E2318] dark:text-[#FFEAC1]"
                    }`}
                  >
                    {L(n.text)}
                    {hit && (
                      <span className="mt-1 block text-[11px] font-semibold tracking-wide uppercase">
                        {L(C.recalled)}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-4 text-xs leading-relaxed text-[#6B5440] dark:text-[#E9D3AE]">
            {L(C.memoryNote)}
          </p>
        </div>
      </div>
    </div>
  );
}
