/**
 * GameTreeLesson: the runnable lesson on /projects/teaching. Pick a synthetic
 * starting position or play moves on the board, and both searches run from it:
 * minimax, which visits every position to the end of the game, and alpha-beta,
 * which stops a branch once it cannot change the answer. Each root move gets a
 * row with what both searches visited under it, so the saving is visible move
 * by move, and Step through reveals the rows one at a time with running totals.
 *
 * Written from scratch for this page (engine.js). Positions are synthetic and
 * nothing is stored or sent: state lives in memory only.
 *
 * Accessibility: the board is one tab stop with a roving focus (arrow keys
 * move, Home and End jump within a row, Enter or Space plays). Every square has
 * a full text label. Start position and search order are native radio groups,
 * and the code panel is a tab list. A polite live region reads a one-line
 * summary after each change. Nothing moves on its own, and the only motion (a
 * short fade on new rows and the bar widths) is switched off when the visitor
 * prefers reduced motion. The search runs on a deferred value, so the board
 * updates at once and the numbers follow when the search is done.
 */
import { useDeferredValue, useId, useMemo, useRef, useState } from "react";
import { fill } from "@/lib/fill";
import { useRovingFocus } from "@/hooks/useRovingFocus";
import { CODE, DEMO as D, ORDER_OPTIONS, PRESETS } from "@/lib/demos/teaching-data";
import { analyse, finalScore, toMove, totals, winningLine } from "./engine";

const keyOf = (board, order) => `${board.map((c) => c || ".").join("")}|${order}`;
const parseKey = (key) => {
  const [cells, order] = key.split("|");
  return { board: cells.split("").map((c) => (c === "." ? null : c)), order };
};

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const BTN = `inline-flex items-center justify-center min-h-[40px] rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 text-xs text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE] aria-disabled:opacity-40 aria-disabled:cursor-not-allowed aria-disabled:hover:border-[#E0E0E0] dark:aria-disabled:hover:border-[#3D3D3D] transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`;
const BTN_SOLID = `inline-flex items-center justify-center min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] aria-disabled:opacity-40 aria-disabled:cursor-not-allowed aria-disabled:hover:bg-[#1A1A1A] dark:aria-disabled:hover:bg-[#EEEEEE] transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const PILL = `flex min-h-[36px] items-center rounded-full border px-3 text-xs transition-colors duration-150 motion-reduce:transition-none border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE] peer-checked:border-[#1A1A1A] peer-checked:bg-[#1A1A1A] peer-checked:text-white dark:peer-checked:border-[#EEEEEE] dark:peer-checked:bg-[#EEEEEE] dark:peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#CC0000] dark:peer-focus-visible:outline-[#FF3C3C]`;

/** A button that stays focusable when it has nothing to do, so focus is never dropped. */
function Btn({ inactive = false, onClick, className = BTN, children, ...rest }) {
  return (
    <button
      type="button"
      aria-disabled={inactive || undefined}
      onClick={inactive ? undefined : onClick}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

function RadioPills({ legend, name, options, value, onChange, note }) {
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
      {note && (
        <p className="mt-2 text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed">{note}</p>
      )}
    </fieldset>
  );
}

/** A 3 by 3 pixel map of the position with one square picked out. */
function Glyph({ board, cell }) {
  return (
    <span aria-hidden="true" className="mt-0.5 grid grid-cols-3 gap-px w-[26px] h-[26px] shrink-0">
      {board.map((mark, i) => (
        <span
          key={i}
          className={
            i === cell
              ? "bg-[#CC0000] dark:bg-[#FF3C3C]"
              : mark
                ? "bg-[#6E6E6E] dark:bg-[#9A9A9A]"
                : "border border-[#E0E0E0] dark:border-[#3D3D3D]"
          }
        />
      ))}
    </span>
  );
}

function Bar({ label, value, max, solid, format }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="grid grid-cols-[72px_minmax(0,1fr)_52px] sm:grid-cols-[84px_minmax(0,1fr)_64px] items-center gap-2">
      <span className="text-[11px] text-[#595959] dark:text-[#9A9A9A]">{label}</span>
      <span aria-hidden="true" className="h-2 bg-[#F0F0F0] dark:bg-[#1F1F1F] overflow-hidden">
        <span
          className={`block h-full transition-[width] duration-200 motion-reduce:transition-none ${
            solid ? "bg-[#1A1A1A] dark:bg-[#EEEEEE]" : "bg-[#BDBDBD] dark:bg-[#595959]"
          }`}
          style={{ width: `${Math.max(pct, 0.6)}%` }}
        />
      </span>
      <span className="font-mono text-[11px] text-right tabular-nums text-[#1A1A1A] dark:text-[#EEEEEE]">
        {format(value)}
      </span>
    </div>
  );
}

export default function GameTreeLesson({ lang = "en" }) {
  const L = (o) => o[lang];
  const uid = useId();
  const helpId = `${uid}-help`;
  const nf = useMemo(() => new Intl.NumberFormat(lang === "zh" ? "zh-Hans" : "en-AU"), [lang]);
  const num = (n) => nf.format(n);
  const cellName = (i) => L(D.cells)[i];
  const cap = (s) => (lang === "en" && s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [history, setHistory] = useState(() => [PRESETS[0].board]);
  const [order, setOrder] = useState(ORDER_OPTIONS[0].id);
  const [step, setStep] = useState(null);
  const [action, setAction] = useState("");
  const [focusCell, setFocusCell] = useState(0);
  const [codeTab, setCodeTab] = useState(0);
  const cellRefs = useRef([]);
  const stepRef = useRef(null);

  const preset = PRESETS.find((p) => p.id === presetId) || PRESETS[0];
  const board = history[history.length - 1];
  const score = finalScore(board);
  const over = score !== null;
  const line = winningLine(board);
  const player = toMove(board);

  // The search runs on the deferred key: the board answers at once, and the
  // numbers follow (dimmed and marked as searching) when the search is done.
  const key = keyOf(board, order);
  const deferredKey = useDeferredValue(key);
  const stale = deferredKey !== key;
  const searched = useMemo(() => {
    const { board: b, order: o } = parseKey(deferredKey);
    return { board: b, result: analyse(b, o) };
  }, [deferredKey]);
  const result = searched.result;
  const rows = result?.rows ?? [];

  const stepping = step && step.key === deferredKey;
  const visible = stepping ? Math.min(step.n, rows.length) : rows.length;
  const shownTotals = totals(rows, visible);
  const allTotals = totals(rows);
  const maxNodes = rows.reduce((m, r) => Math.max(m, r.minimaxNodes), 0);
  const ready = result && !stale && !over;

  const play = (cell) => {
    if (over || board[cell]) return;
    const next = [...board];
    next[cell] = player;
    setHistory((h) => [...h, next]);
    setAction(fill(L(D.played), { player, cell: cellName(cell) }));
    setStep(null);
  };

  const playBest = () => {
    if (ready && result.bestCell !== null) {
      setFocusCell(result.bestCell);
      play(result.bestCell);
    }
  };

  const undo = () => {
    setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
    setAction("");
    setStep(null);
  };

  const restart = (p = preset) => {
    setHistory([p.board]);
    setAction("");
    setStep(null);
  };

  const choosePreset = (id) => {
    const p = PRESETS.find((x) => x.id === id) || PRESETS[0];
    setPresetId(p.id);
    restart(p);
  };

  const onStep = () => {
    if (!ready) return;
    if (!stepping) setStep({ key: deferredKey, n: 1 });
    else if (step.n < rows.length) setStep({ key: deferredKey, n: step.n + 1 });
  };

  const showAll = () => {
    setStep(null);
    stepRef.current?.focus();
  };

  const onCellKey = (e, i) => {
    const r = Math.floor(i / 3);
    const c = i % 3;
    const to = {
      ArrowRight: c < 2 ? i + 1 : i,
      ArrowLeft: c > 0 ? i - 1 : i,
      ArrowDown: r < 2 ? i + 3 : i,
      ArrowUp: r > 0 ? i - 3 : i,
      Home: e.ctrlKey ? 0 : r * 3,
      End: e.ctrlKey ? 8 : r * 3 + 2,
    }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    setFocusCell(to);
    cellRefs.current[to]?.focus();
  };

  const outcomeOf = (v) => L(D.outcome[v]);
  const overText = over
    ? `${score === 0 ? L(D.draw) : fill(L(D.won), { player: score > 0 ? "X" : "O" })} ${L(D.overHelp)}`
    : "";
  const summary = ready
    ? fill(L(D.summary), {
        player: result.player,
        cell: cellName(result.bestCell),
        outcome: outcomeOf(result.value),
        mm: num(allTotals.minimaxNodes),
        ab: num(allTotals.alphaBetaNodes),
        saved: allTotals.saved,
      })
    : "";
  const live = over ? `${action} ${overText}`.trim() : stale ? "" : `${action} ${summary}`.trim();

  const { getItemProps } = useRovingFocus({
    count: 2,
    activeIndex: codeTab,
    onMove: setCodeTab,
  });
  const codeKeys = ["minimax", "alphaBeta"];
  const codeKey = codeKeys[codeTab];

  return (
    <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg p-4 md:p-6">
      <p className={`${META} font-mono mb-5 flex items-center gap-2`}>
        <span className="w-1.5 h-1.5 bg-[#FF3C3C]" aria-hidden="true" />
        {L(D.synthetic)}
      </p>

      <div className="grid gap-6 md:grid-cols-[minmax(0,264px)_minmax(0,1fr)] md:gap-8">
        {/* Board and its actions */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE] mb-1 min-h-[1.25rem]">
            {over ? overText : fill(L(D.turn), { player })}
          </p>
          <p
            id={helpId}
            className="text-xs text-[#595959] dark:text-[#9A9A9A] mb-3 leading-relaxed"
          >
            {L(D.boardHelp)}
          </p>
          <div
            role="group"
            aria-label={over ? L(D.boardLabelOver) : fill(L(D.boardLabel), { player })}
            aria-describedby={helpId}
            className="grid grid-cols-3 gap-1.5 w-full max-w-[264px]"
          >
            {board.map((mark, i) => {
              const isBest = ready && result.bestCell === i;
              const inLine = Boolean(line && line.includes(i));
              const name = cap(cellName(i));
              const label =
                (mark
                  ? fill(L(D.cellMark), { cell: name, mark })
                  : fill(L(D.cellEmpty), { cell: name })) +
                (isBest ? L(D.cellBest) : "") +
                (inLine ? L(D.cellWin) : "");
              return (
                <button
                  key={i}
                  type="button"
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                  tabIndex={i === focusCell ? 0 : -1}
                  aria-label={label}
                  aria-disabled={Boolean(mark) || over || undefined}
                  onClick={() => {
                    setFocusCell(i);
                    play(i);
                  }}
                  onKeyDown={(e) => onCellKey(e, i)}
                  className={`relative aspect-square w-full rounded-md border flex items-center justify-center select-none transition-colors duration-150 motion-reduce:transition-none ${FOCUS} ${
                    inLine
                      ? "border-[#CC0000] dark:border-[#FF3C3C] text-[#CC0000] dark:text-[#FF3C3C]"
                      : "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#1A1A1A] dark:text-[#EEEEEE]"
                  } ${
                    mark || over
                      ? "cursor-default"
                      : "hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE] hover:bg-[#F7F7F7] dark:hover:bg-[#141414]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-4xl sm:text-5xl leading-none"
                  >
                    {mark}
                  </span>
                  {isBest && (
                    <span
                      aria-hidden="true"
                      className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#CC0000] dark:bg-[#FF3C3C]"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-2 flex items-center gap-2 text-[11px] text-[#595959] dark:text-[#9A9A9A]">
            <span aria-hidden="true" className="w-2 h-2 bg-[#CC0000] dark:bg-[#FF3C3C]" />
            {L(D.bestMarker)}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Btn className={BTN_SOLID} inactive={!ready} onClick={playBest}>
              {L(D.playBest)}
            </Btn>
            <Btn inactive={history.length < 2} onClick={undo}>
              {L(D.undo)}
            </Btn>
            <Btn inactive={history.length < 2} onClick={() => restart()}>
              {L(D.reset)}
            </Btn>
          </div>
        </div>

        {/* Start position, search order and the totals */}
        <div className="min-w-0 space-y-5">
          <RadioPills
            legend={L(D.start)}
            name={`${uid}-preset`}
            value={presetId}
            onChange={choosePreset}
            options={PRESETS.map((p) => ({ value: p.id, label: L(p.label) }))}
            note={L(preset.note)}
          />
          <RadioPills
            legend={L(D.order)}
            name={`${uid}-order`}
            value={order}
            onChange={setOrder}
            options={ORDER_OPTIONS.map((o) => ({ value: o.id, label: L(o.label) }))}
            note={L(ORDER_OPTIONS.find((o) => o.id === order).note)}
          />

          {!over && result && (
            <div
              aria-busy={stale || undefined}
              className={`transition-opacity duration-150 motion-reduce:transition-none ${stale ? "opacity-50" : ""}`}
            >
              <p className={`${META} mb-2 flex flex-wrap items-center gap-x-3`}>
                {stepping && visible < rows.length ? L(D.statsTitleSoFar) : L(D.statsTitle)}
                {stale && (
                  <span className="text-[#CC0000] dark:text-[#FF6B6B]">{L(D.searching)}</span>
                )}
              </p>
              <dl className="grid grid-cols-2 gap-px border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
                {[
                  [L(D.stats.minimax), num(shownTotals.minimaxNodes)],
                  [L(D.stats.alphaBeta), num(shownTotals.alphaBetaNodes)],
                  [L(D.stats.saved), `${shownTotals.saved}%`],
                  [L(D.stats.cuts), num(shownTotals.cuts)],
                ].map(([k, v]) => (
                  <div key={k} className="bg-white dark:bg-[#0A0A0A] px-3 py-3 min-w-0">
                    <dt className={META}>{k}</dt>
                    <dd className="font-display text-2xl leading-tight tabular-nums text-[#1A1A1A] dark:text-[#EEEEEE] break-all">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
                <span className={`${META} mr-2`}>{L(D.best)}</span>
                {fill(L(D.bestLine), {
                  cell: cap(cellName(result.bestCell)),
                  outcome: outcomeOf(result.value),
                })}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Move by move: one row per legal move from the searched position */}
      {!over && result && (
        <div
          className={`mt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-5 transition-opacity duration-150 motion-reduce:transition-none ${stale ? "opacity-50" : ""}`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE]">
              {L(D.movesTitle)}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <Btn
                ref={stepRef}
                inactive={!ready || (stepping && visible >= rows.length)}
                onClick={onStep}
              >
                {stepping ? L(D.next) : L(D.step)}
              </Btn>
              {stepping && <Btn onClick={showAll}>{L(D.all)}</Btn>}
            </div>
          </div>
          <p className="text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed mb-3 max-w-[640px]">
            {L(D.movesHelp)}
          </p>
          <ol className="divide-y divide-[#F0F0F0] dark:divide-[#3D3D3D] border-y border-[#F0F0F0] dark:border-[#3D3D3D]">
            {rows.slice(0, visible).map((r) => (
              <li
                key={r.cell}
                className="py-3 flex gap-3 animate-enter-up motion-reduce:animate-none"
              >
                <Glyph board={searched.board} cell={r.cell} />
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">
                      {cap(cellName(r.cell))}
                    </span>
                    <span className="font-mono text-[11px] text-[#3D3D3D] dark:text-[#AAAAAA]">
                      {L(D.value[r.value])}
                    </span>
                  </p>
                  <Bar
                    label={L(D.stats.minimax)}
                    value={r.minimaxNodes}
                    max={maxNodes}
                    format={num}
                  />
                  <Bar
                    label={L(D.stats.alphaBeta)}
                    value={r.alphaBetaNodes}
                    max={maxNodes}
                    format={num}
                    solid
                  />
                  <p
                    className={`text-xs leading-relaxed ${
                      r.exact
                        ? "text-[#CC0000] dark:text-[#FF6B6B]"
                        : "text-[#595959] dark:text-[#9A9A9A]"
                    }`}
                  >
                    {r.exact ? L(D.newBest) : fill(L(D.cannotBeat), { cell: cellName(r.beatenBy) })}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {stepping && (
            <p className="mt-2 text-xs text-[#595959] dark:text-[#9A9A9A]">
              {fill(L(D.showing), { n: visible, total: rows.length })}
            </p>
          )}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {live}
      </p>

      {/* The code: the two functions the engine runs */}
      <div className="mt-8 border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE]">
            {L(D.code.title)}
          </h3>
          <div role="tablist" aria-label={L(D.code.tabs)} className="flex gap-1.5">
            {codeKeys.map((k, i) => (
              <button
                key={k}
                type="button"
                role="tab"
                id={`${uid}-tab-${k}`}
                aria-selected={codeTab === i}
                aria-controls={`${uid}-code`}
                onClick={() => setCodeTab(i)}
                {...getItemProps(i)}
                className={`min-h-[36px] rounded-full border px-3 text-xs transition-colors duration-150 motion-reduce:transition-none ${FOCUS} ${
                  codeTab === i
                    ? "border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-black"
                    : "border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE]"
                }`}
              >
                {L(D.code.names[k])}
              </button>
            ))}
          </div>
        </div>
        <div
          role="tabpanel"
          id={`${uid}-code`}
          aria-labelledby={`${uid}-tab-${codeKey}`}
          tabIndex={0}
          className={`overflow-x-auto rounded-lg border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#FAFAFA] dark:bg-[#111111] py-3 ${FOCUS}`}
        >
          <pre className="font-mono text-xs leading-relaxed text-[#1A1A1A] dark:text-[#EEEEEE]">
            <code>
              {CODE[codeKey].map((ln, i) => (
                <span
                  key={i}
                  className={`block pl-3 pr-4 border-l-2 ${
                    ln.mark
                      ? "border-[#CC0000] dark:border-[#FF3C3C] bg-[#CC0000]/[0.06] dark:bg-[#FF3C3C]/10"
                      : "border-transparent"
                  }`}
                >
                  {ln.mark && <span className="sr-only">{L(D.code.changed)}</span>}
                  {ln.text}
                </span>
              ))}
            </code>
          </pre>
        </div>
        <p className="mt-2 text-xs text-[#595959] dark:text-[#9A9A9A]">{L(D.code.note)}</p>
      </div>
    </div>
  );
}
