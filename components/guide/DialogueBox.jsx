/**
 * DialogueBox: Pawsibly's RPG-style text box.
 *
 * Non-modal (aria-modal="false"), so the page stays usable behind it. Square
 * corners and a double rule (2px outer, 1px inner) instead of a shadow, which
 * keeps it inside the site's flat Nothing look. Each line types out within
 * 300ms (the site's motion budget); with reduced motion it appears at once and
 * the cat does not blink. Screen readers get the full line through a polite
 * live region; the typed copy is aria-hidden.
 *
 * Keys: buttons handle Enter and Space natively. Enter or Space elsewhere in the
 * box runs the main button, and Escape closes the box back to the launcher.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { nextUndoneIndex, stopIndexForPath } from "@/lib/guide-stops";
import { SIDE, TOUR, UI, fill, goToStop } from "@/lib/guide-tour";
import PixelCat from "./PixelCat";

const TYPE_MS = 300;
const BLINK_EVERY_MS = 4200;
const BLINK_MS = 140;
const LAST = TOUR.length - 1;

const pad = (n) => String(n).padStart(2, "0");

const BTN_BASE =
  "min-h-[44px] px-3 inline-flex items-center justify-center gap-1.5 text-[12px] tracking-wide transition-colors duration-150 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3C3C]";
const BTN_PRIMARY = `${BTN_BASE} px-4 font-display uppercase tracking-widest text-[11px] border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black hover:bg-[#3D3D3D] dark:hover:bg-[#E0E0E0]`;
const BTN_SECONDARY = `${BTN_BASE} border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white`;
const BTN_ICON = `${BTN_BASE} min-w-[44px] px-2 border border-transparent text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-[#E0E0E0] dark:hover:border-[#3D3D3D] hover:text-black dark:hover:text-white`;

/** The small red "more to read" marker, drawn in pixels. */
function MoreMark() {
  return (
    <svg
      viewBox="0 0 5 3"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="inline-block w-[10px] h-[6px] ml-2 align-middle fill-[#FF3C3C]"
    >
      <path d="M0 0h5v1H0zM1 1h3v1H1zM2 2h1v1H2z" />
    </svg>
  );
}

export default function DialogueBox({
  state,
  update,
  path,
  locale,
  autoFocus,
  onMinimise,
  onHide,
  onOpenLog,
}) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const ui = UI[lang];
  const primaryRef = useRef(null);
  const rafRef = useRef(0);

  const [lineState, setLineState] = useState({ key: "", i: 0 });
  const [typed, setTyped] = useState({ key: "", count: 0 });
  const [finishedOn, setFinishedOn] = useState(null);
  const [blink, setBlink] = useState(false);

  // ── Which view the box is showing ─────────────────────────────────────────
  const allDone = nextUndoneIndex(state.done) === -1;
  const pathStop = stopIndexForPath(path);
  let view;
  if (!state.started) view = { kind: "intro", idx: 0 };
  else if (path === SIDE.href) view = { kind: "side" };
  else if (finishedOn === path || (allDone && pathStop < 0)) view = { kind: "complete" };
  else if (pathStop >= 0) view = { kind: "stop", idx: pathStop };
  else view = { kind: "offroute", idx: nextUndoneIndex(state.done) };

  const stop = view.idx !== undefined ? TOUR[view.idx] : null;
  let lines;
  if (view.kind === "intro" || view.kind === "stop") lines = stop[lang].lines;
  else if (view.kind === "side") lines = [SIDE[lang].line];
  else if (view.kind === "complete") lines = [ui.complete];
  else lines = [fill(ui.offRoute, { stop: stop[lang].short })];

  const viewKey = `${view.kind}:${view.idx ?? ""}:${path}`;
  const li = lineState.key === viewKey ? Math.min(lineState.i, lines.length - 1) : 0;
  const text = lines[li];
  const isLast = li === lines.length - 1;
  const lineKey = `${viewKey}:${li}`;

  // ── Typewriter (300ms per line, skipped under reduced motion) ─────────────
  const full = text.length;
  const count = reduced ? full : typed.key === lineKey ? typed.count : 0;
  const revealing = count < full;

  useEffect(() => {
    if (reduced) return undefined;
    const start = performance.now();
    const tick = (now) => {
      const n = Math.min(full, Math.ceil(((now - start) / TYPE_MS) * full));
      setTyped({ key: lineKey, count: n });
      if (n < full) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [lineKey, full, reduced]);

  const completeLine = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTyped({ key: lineKey, count: full });
  }, [lineKey, full]);

  // ── Blink: an instant frame swap every few seconds, never under reduced motion
  useEffect(() => {
    if (reduced) return undefined;
    let off;
    const id = setInterval(() => {
      setBlink(true);
      off = setTimeout(() => setBlink(false), BLINK_MS);
    }, BLINK_EVERY_MS);
    return () => {
      clearInterval(id);
      clearTimeout(off);
    };
  }, [reduced]);

  // Focus the main button when the visitor opened the box themselves (not when
  // it reappears open after a reload, which would steal focus from the page).
  useEffect(() => {
    if (autoFocus) primaryRef.current?.focus();
  }, [autoFocus]);

  // ── Actions ───────────────────────────────────────────────────────────────
  const walkTo = useCallback(
    (idx) => {
      update((s) => ({ ...s, step: idx, minimised: false }));
      goToStop(router, TOUR[idx], reduced);
    },
    [router, reduced, update]
  );

  const nextLine = () => setLineState({ key: viewKey, i: li + 1 });
  const prevLine = () => setLineState({ key: viewKey, i: Math.max(0, li - 1) });

  let primary;
  const secondary = [];
  if (!isLast) {
    primary = { label: ui.next, run: nextLine, arrow: true };
  } else if (view.kind === "intro") {
    primary = {
      label: ui.start,
      run: () => {
        update((s) => ({
          ...s,
          started: true,
          done: [...new Set([...s.done, TOUR[0].id])],
        }));
        walkTo(1);
      },
      arrow: true,
    };
    secondary.push({ label: ui.notNow, run: onMinimise }, { label: ui.never, run: onHide });
  } else if (view.kind === "stop") {
    primary =
      view.idx < LAST
        ? {
            label: fill(ui.goTo, { stop: TOUR[view.idx + 1][lang].short }),
            run: () => walkTo(view.idx + 1),
            arrow: true,
          }
        : { label: ui.finish, run: () => setFinishedOn(path) };
  } else if (view.kind === "offroute") {
    primary = { label: ui.go, run: () => walkTo(view.idx), arrow: true };
    secondary.push({ label: ui.stay, run: onMinimise });
  } else if (view.kind === "side") {
    primary = allDone
      ? { label: ui.close, run: onMinimise }
      : {
          label: ui.backToTour,
          run: () => walkTo(nextUndoneIndex(state.done)),
          arrow: true,
        };
  } else {
    const sideDone = state.side.includes(SIDE.id);
    primary = sideDone
      ? { label: ui.close, run: onMinimise }
      : {
          label: ui.sideQuest,
          run: () => goToStop(router, SIDE, reduced),
          arrow: true,
        };
    if (!sideDone) secondary.push({ label: ui.close, run: onMinimise });
  }

  const runPrimary = () => {
    if (revealing) completeLine();
    else primary.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onMinimise();
      return;
    }
    if ((e.key === "Enter" || e.key === " ") && !e.target.closest("button, a, input, textarea")) {
      e.preventDefault();
      runPrimary();
    }
  };

  // ── Labels ────────────────────────────────────────────────────────────────
  const total = TOUR.length;
  let counter = null;
  if (view.kind === "side") counter = SIDE[lang].short;
  else if (view.kind === "complete") counter = `${pad(total)}/${pad(total)}`;
  else counter = `${pad(view.idx + 1)}/${pad(total)}`;
  const counterLabel =
    view.kind === "intro" || view.kind === "stop" || view.kind === "offroute"
      ? fill(ui.step, { n: view.idx + 1, total })
      : counter;

  const frame = view.kind === "complete" ? "happy" : blink ? "blink" : "idle";
  const showMore = !isLast && !revealing;

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="guide-nameplate"
      onKeyDown={onKeyDown}
      className="pixel-frame fixed left-1/2 -translate-x-1/2 z-40 print:hidden w-[min(560px,calc(100vw-24px))] max-h-[45vh] overflow-y-auto
                 border-2 border-black dark:border-white bg-white dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-white p-[3px] animate-enter-up"
      style={{ bottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="border border-[#1A1A1A] dark:border-[#CCCCCC] p-3 md:p-4">
        <div className="flex gap-3 md:gap-4">
          <div
            aria-hidden="true"
            className="dot-matrix shrink-0 w-10 h-10 md:w-14 md:h-14 border border-[#E0E0E0] dark:border-[#3D3D3D] flex items-center justify-center text-black dark:text-white"
          >
            <PixelCat frame={frame} className="w-7 h-7 md:w-10 md:h-10" />
          </div>
          <div className="min-w-0 flex-1">
            <p
              id="guide-nameplate"
              className="font-display text-[11px] leading-none tracking-widest uppercase flex items-center gap-2 mb-2"
            >
              <span aria-hidden="true" className="inline-block w-1.5 h-1.5 bg-[#FF3C3C]" />
              {ui.name}
              <span className="sr-only">, {ui.dialogLabel}</span>
            </p>
            <p aria-hidden="true" className="text-[15px] md:text-base leading-[1.6]">
              {text.slice(0, count)}
              <span className="opacity-0">{text.slice(count)}</span>
              {showMore && <MoreMark />}
            </p>
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {text}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
          <span className="mr-auto font-display text-[11px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A]">
            <span aria-hidden="true">{counter}</span>
            <span className="sr-only">{counterLabel}</span>
          </span>
          {li > 0 && (
            <button type="button" onClick={prevLine} className={BTN_SECONDARY}>
              {ui.back}
            </button>
          )}
          {secondary.map((b) => (
            <button key={b.label} type="button" onClick={b.run} className={BTN_SECONDARY}>
              {b.label}
            </button>
          ))}
          <button ref={primaryRef} type="button" onClick={runPrimary} className={BTN_PRIMARY}>
            {primary.label}
            {primary.arrow && <span aria-hidden="true">▸</span>}
          </button>
          <button
            type="button"
            onClick={onOpenLog}
            aria-label={ui.openLog}
            className={`${BTN_ICON} font-display uppercase tracking-widest text-[11px]`}
          >
            {ui.log}
          </button>
          <button type="button" onClick={onMinimise} aria-label={ui.minimise} className={BTN_ICON}>
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
      </div>
    </section>
  );
}
