/**
 * QuestLog: the guide's progress list, as a modal dialog. useDialog provides
 * the focus trap, Escape, focus return and scroll lock. Stops are an ordered
 * list; the next stop to visit carries aria-current="step".
 */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDialog } from "@/hooks/useDialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GUIDE_DEFAULT } from "@/hooks/useGuideProgress";
import { nextUndoneIndex } from "@/lib/guide-stops";
import { SIDE, TOUR, UI, fill, goToStop } from "@/lib/guide-tour";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3C3C]";
const BTN = `min-h-[44px] px-3 inline-flex items-center justify-center text-[12px] tracking-wide transition-colors duration-150 ${FOCUS_RING}`;
const BTN_PRIMARY = `${BTN} px-4 font-display uppercase tracking-widest text-[11px] border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black hover:bg-[#3D3D3D] dark:hover:bg-[#E0E0E0]`;
const BTN_SECONDARY = `${BTN} border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white`;

function Check({ done }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-3 h-3 shrink-0 border-2 ${
        done ? "border-[#FF3C3C] bg-[#FF3C3C]" : "border-[#6B6B6B] dark:border-[#9A9A9A]"
      }`}
    />
  );
}

export default function QuestLog({ state, update, path, locale, onClose, onHide }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const ui = UI[lang];
  const panelRef = useRef(null);
  const [confirmReset, setConfirmReset] = useState(false);
  // The reset button swaps for an inline confirm; keep focus on the swapped-in
  // control instead of dropping it to <body>.
  const resetRef = useRef(null);
  const cancelRef = useRef(null);
  const swapped = useRef(false);
  useEffect(() => {
    if (!swapped.current) return;
    (confirmReset ? cancelRef : resetRef).current?.focus();
  }, [confirmReset]);
  const askReset = (value) => {
    swapped.current = true;
    setConfirmReset(value);
  };

  useDialog({ open: true, onClose, containerRef: panelRef });

  const total = TOUR.length;
  const visited = TOUR.filter((s) => state.done.includes(s.id)).length;
  const current = state.started ? nextUndoneIndex(state.done) : 0;
  const sideDone = state.side.includes(SIDE.id);

  const go = (stop, idx) => {
    update((s) => ({
      ...s,
      started: true,
      minimised: false,
      step: idx ?? s.step,
      done: [...new Set([...s.done, TOUR[0].id])],
    }));
    onClose();
    goToStop(router, stop, reduced);
  };

  const resume = () => {
    onClose();
    if (!state.started) return;
    const next = nextUndoneIndex(state.done);
    if (next !== -1 && TOUR[next].href !== path) go(TOUR[next], next);
  };

  const reset = () => {
    update({ ...GUIDE_DEFAULT, minimised: false });
    askReset(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-3 print:hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-log-title"
        className="pixel-frame relative w-[min(480px,100%)] max-h-[85vh] overflow-y-auto border-2 border-black dark:border-white
                   bg-white dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-white p-[3px] animate-enter-scale"
      >
        <div className="border border-[#1A1A1A] dark:border-[#CCCCCC] p-4 md:p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2
                id="quest-log-title"
                className="font-display text-[13px] leading-none tracking-widest uppercase flex items-center gap-2"
              >
                <span aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-[#FF3C3C]" />
                {ui.logTitle}
                <span aria-hidden="true" className="text-[#6B6B6B] dark:text-[#9A9A9A]">
                  {visited}/{total}
                </span>
              </h2>
              <div
                role="img"
                aria-label={fill(ui.logProgress, { n: visited, total })}
                className="mt-3 flex gap-1"
              >
                {TOUR.map((s) => (
                  <span
                    key={s.id}
                    className={`w-5 h-2 ${
                      state.done.includes(s.id)
                        ? "bg-[#FF3C3C]"
                        : "border border-[#6B6B6B] dark:border-[#9A9A9A]"
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={ui.logClose}
              className={`${BTN} min-w-[44px] -mr-2 -mt-2 border border-transparent hover:border-[#E0E0E0] dark:hover:border-[#3D3D3D]`}
            >
              <svg
                viewBox="0 0 7 7"
                shapeRendering="crispEdges"
                aria-hidden="true"
                className="w-3 h-3 fill-current"
              >
                <path d="M0 0h1v1H0zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 4h1v1H4zM5 5h1v1H5zM6 6h1v1H6zM6 0h1v1H6zM5 1h1v1H5zM4 2h1v1H4zM2 4h1v1H2zM1 5h1v1H1zM0 6h1v1H0z" />
              </svg>
            </button>
          </div>

          <ol className="divide-y divide-[#E0E0E0] dark:divide-[#3D3D3D] border-y border-[#E0E0E0] dark:border-[#3D3D3D]">
            {TOUR.map((stop, i) => {
              const done = state.done.includes(stop.id);
              return (
                <li
                  key={stop.id}
                  aria-current={i === current ? "step" : undefined}
                  className="flex items-center gap-3 py-1.5"
                >
                  <Check done={done} />
                  <span className="font-display text-[11px] tracking-widest text-[#6B6B6B] dark:text-[#9A9A9A] w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 min-w-0 text-sm ${i === current ? "font-semibold" : ""}`}
                  >
                    {stop[lang].quest}
                    <span className="sr-only">, {done ? ui.logDone : ui.logTodo}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => go(stop, i)}
                    aria-label={fill(ui.logGoLabel, { stop: stop[lang].short })}
                    className={`${BTN} min-w-[44px] text-[11px] font-display uppercase tracking-widest text-[#3D3D3D] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white`}
                  >
                    {ui.logGo} <span aria-hidden="true">▸</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <p className="mt-5 mb-1 font-display text-[11px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A]">
            {ui.logSide}
          </p>
          <div className="flex items-center gap-3 py-1.5 border-y border-[#E0E0E0] dark:border-[#3D3D3D]">
            <Check done={sideDone} />
            <span className="flex-1 min-w-0 text-sm">
              {SIDE[lang].quest}
              <span className="sr-only">, {sideDone ? ui.logDone : ui.logTodo}</span>
            </span>
            <button
              type="button"
              onClick={() => go(SIDE)}
              aria-label={fill(ui.logGoLabel, { stop: SIDE[lang].short })}
              className={`${BTN} min-w-[44px] text-[11px] font-display uppercase tracking-widest text-[#3D3D3D] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white`}
            >
              {ui.logGo} <span aria-hidden="true">▸</span>
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={resume} className={BTN_PRIMARY}>
              {ui.resume} <span aria-hidden="true">&nbsp;▸</span>
            </button>
            {confirmReset ? (
              <span className="inline-flex flex-wrap items-center gap-2" role="group">
                <span className="text-[12px] text-[#3D3D3D] dark:text-[#CCCCCC]">
                  {ui.resetConfirm}
                </span>
                <button type="button" onClick={reset} className={BTN_SECONDARY}>
                  {ui.resetYes}
                </button>
                <button
                  ref={cancelRef}
                  type="button"
                  onClick={() => askReset(false)}
                  className={BTN_SECONDARY}
                >
                  {ui.cancel}
                </button>
              </span>
            ) : (
              <button
                ref={resetRef}
                type="button"
                onClick={() => askReset(true)}
                className={BTN_SECONDARY}
              >
                {ui.reset}
              </button>
            )}
            <button type="button" onClick={onHide} className={BTN_SECONDARY}>
              {ui.hide}
            </button>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-[#6B6B6B] dark:text-[#9A9A9A]">
            {ui.hideNote}
          </p>
        </div>
      </div>
    </div>
  );
}
