/**
 * MapColouring: the "Try it" widget on /knowledge/notes/csp-map-colouring.
 *
 * A seeded made-up map (./csp-sim.js) is coloured by backtracking search.
 * The whole search is recorded first, so the visitor can step through it,
 * scrub with the step slider or play it. Two switches turn on the
 * most-constrained-first rule (MRV) and forward checking, and the totals show
 * what each saves.
 *
 * Accessibility: native buttons, checkboxes and range inputs, plus the site's
 * Segmented radiogroup, so it all works from the keyboard. Colours also carry
 * a pattern or a letter mark, so no state depends on colour alone. Each step
 * is described in a polite live region. Play advances one step at a time; it
 * is hidden when the visitor prefers reduced motion, and the step buttons do
 * the same job.
 *
 * Strings come in through `copy` from the note's content module.
 */
import { useEffect, useId, useMemo, useState } from "react";
import Segmented from "@/components/ui/Segmented";
import { fill } from "@/lib/fill";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BTN, CHECK, LABEL, SEED, SUMMARY, Slider } from "./controls";
import { COLS, LETTERS, ROWS, makeMap, solve } from "./csp-sim";

const DEFAULTS = { seed: 3, regions: 16, colours: 3, mrv: false, fc: false };
const CELL_PX = 20;
const W = COLS * CELL_PX;
const H = ROWS * CELL_PX;
const PLAY_MS = 220;

// Fill, text and mark for each colour. Colour 3 is a dotted pattern.
const SWATCH = [
  { fill: "fill-[#FF3C3C]", text: "fill-black", mark: "" },
  { fill: "fill-[#1A1A1A] dark:fill-[#E8E8E8]", text: "fill-white dark:fill-black", mark: "" },
  { fill: "fill-[#9A9A9A] dark:fill-[#6B6B6B]", text: "fill-black dark:fill-white", mark: "" },
  { fill: "", text: "fill-black dark:fill-white", mark: "dots" },
];
const EMPTY = "fill-[#F4F4F4] dark:fill-[#161616]";

function Chip({ colour, on }) {
  const s = SWATCH[colour];
  return (
    <svg width="12" height="12" aria-hidden="true">
      {s.mark === "dots" ? (
        <rect
          x="0.5"
          y="0.5"
          width="11"
          height="11"
          fill="url(#csp-dots)"
          className="stroke-[#6E6E6E] dark:stroke-[#9A9A9A]"
        />
      ) : (
        <rect
          x="0.5"
          y="0.5"
          width="11"
          height="11"
          className={`${s.fill} stroke-[#6E6E6E] dark:stroke-[#9A9A9A]`}
        />
      )}
      {!on && (
        <line
          x1="1"
          y1="11"
          x2="11"
          y2="1"
          strokeWidth="1.5"
          className="stroke-[#CC0000] dark:stroke-[#FF3C3C]"
        />
      )}
    </svg>
  );
}

export default function MapColouring({ copy, locale = "en-AU" }) {
  const uid = useId();
  const reduced = useReducedMotion();
  const [seed, setSeed] = useState(DEFAULTS.seed);
  const [regions, setRegions] = useState(DEFAULTS.regions);
  const [colours, setColours] = useState(DEFAULTS.colours);
  const [mrv, setMrv] = useState(DEFAULTS.mrv);
  const [fc, setFc] = useState(DEFAULTS.fc);
  const [stepState, setStepState] = useState({ key: "", i: 0 });
  const [playing, setPlaying] = useState(false);

  const map = useMemo(() => makeMap(seed, regions), [seed, regions]);
  const result = useMemo(() => solve(map, { colours, mrv, fc }), [map, colours, mrv, fc]);
  const key = `${seed}-${regions}-${colours}-${mrv}-${fc}`;
  const last = result.steps.length - 1;
  // A new setting starts again at step 1.
  const i = stepState.key === key ? Math.min(stepState.i, last) : 0;
  const step = result.steps[i];
  const goTo = (v) => setStepState({ key, i: Math.max(0, Math.min(last, v)) });

  // Play stops by itself at the last step, or when motion is reduced.
  const running = playing && !reduced && i < last;
  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => {
      setStepState((s) => ({ key, i: Math.min(last, (s.key === key ? s.i : 0) + 1) }));
    }, PLAY_MS);
    return () => clearInterval(id);
  }, [running, key, last]);

  const nf0 = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const name = (v) => LETTERS[v];
  const colourName = (c) => copy.colourNames[c];

  // Placements and backtracks up to and including this step.
  const sofar = result.steps.slice(0, i + 1).reduce(
    (t, s) => ({
      placed: t.placed + (s.kind === "assign" ? 1 : 0),
      back: t.back + (s.kind === "backtrack" ? 1 : 0),
    }),
    { placed: 0, back: 0 }
  );

  const narrate = () => {
    const v = {
      region: name(step.region),
      colour: step.colour >= 0 ? colourName(step.colour) : "",
      pruned: step.pruned?.map(name).join(locale === "zh-Hans" ? "、" : ", "),
    };
    if (step.kind === "assign") {
      return [fill(copy.stepAssign, v), step.pruned?.length ? fill(copy.stepPruned, v) : ""]
        .filter(Boolean)
        .join(locale === "zh-Hans" ? "" : " ");
    }
    return fill(copy.steps[step.kind], v);
  };

  const outcome = result.capped
    ? fill(copy.outcomeCapped, { steps: nf0.format(result.steps.length) })
    : result.solved
      ? copy.outcomeSolved
      : copy.outcomeFailed;
  const totals = fill(copy.totals, {
    placed: nf0.format(result.assignments),
    back: nf0.format(result.backtracks),
    outcome,
  });

  const borders = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const a = map.cells[y * COLS + x];
      if (x + 1 < COLS && map.cells[y * COLS + x + 1] !== a) {
        borders.push(`M${(x + 1) * CELL_PX},${y * CELL_PX}v${CELL_PX}`);
      }
      if (y + 1 < ROWS && map.cells[(y + 1) * COLS + x] !== a) {
        borders.push(`M${x * CELL_PX},${(y + 1) * CELL_PX}h${CELL_PX}`);
      }
    }
  }

  const reset = () => {
    setSeed(DEFAULTS.seed);
    setRegions(DEFAULTS.regions);
    setColours(DEFAULTS.colours);
    setMrv(DEFAULTS.mrv);
    setFc(DEFAULTS.fc);
    setPlaying(false);
    setStepState({ key: "", i: 0 });
  };

  const assignedCount = Array.from(step.assign).filter((c) => c >= 0).length;

  return (
    <div data-widget className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Slider
          id={`${uid}-r`}
          label={copy.regions}
          value={regions}
          display={regions}
          min={6}
          max={16}
          step={1}
          onChange={(v) => {
            setRegions(v);
            setPlaying(false);
          }}
        />
        <div>
          <p id={`${uid}-k`} className={`${LABEL} mb-1.5`}>
            {copy.colours}
          </p>
          <Segmented
            labelledBy={`${uid}-k`}
            options={[2, 3, 4].map((k) => ({ value: k, label: String(k) }))}
            value={colours}
            onChange={(k) => {
              setColours(k);
              setPlaying(false);
            }}
            size="sm"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <label className={CHECK}>
          <input
            type="checkbox"
            checked={mrv}
            onChange={(e) => {
              setMrv(e.target.checked);
              setPlaying(false);
            }}
            className="h-4 w-4 accent-[#FF3C3C]"
          />
          {copy.mrv}
        </label>
        <label className={CHECK}>
          <input
            type="checkbox"
            checked={fc}
            onChange={(e) => {
              setFc(e.target.checked);
              setPlaying(false);
            }}
            className="h-4 w-4 accent-[#FF3C3C]"
          />
          {copy.fc}
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={BTN}
            onClick={() => {
              setSeed((s) => s + 1);
              setPlaying(false);
            }}
          >
            {copy.newMap}
          </button>
          <button type="button" className={BTN} onClick={reset}>
            {copy.reset}
          </button>
          <span className={SEED}>{fill(copy.seed, { seed })}</span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={fill(copy.mapLabel, {
          n: map.n,
          edges: map.edges,
          step: nf0.format(i + 1),
          coloured: assignedCount,
        })}
        className="block w-full h-auto"
      >
        <defs>
          <pattern id="csp-dots" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" className="fill-white dark:fill-[#0D0D0D]" />
            <circle cx="2.5" cy="2.5" r="1.1" className="fill-[#1A1A1A] dark:fill-[#E8E8E8]" />
          </pattern>
        </defs>
        {Array.from(map.cells).map((k, idx) => {
          const c = step.assign[k];
          const x = (idx % COLS) * CELL_PX;
          const y = Math.floor(idx / COLS) * CELL_PX;
          if (c === 3) {
            return (
              <rect
                key={idx}
                x={x}
                y={y}
                width={CELL_PX}
                height={CELL_PX}
                fill="url(#csp-dots)"
                shapeRendering="crispEdges"
              />
            );
          }
          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width={CELL_PX}
              height={CELL_PX}
              shapeRendering="crispEdges"
              className={c >= 0 ? SWATCH[c].fill : EMPTY}
            />
          );
        })}
        <path
          d={borders.join("")}
          fill="none"
          strokeWidth="2"
          strokeLinecap="square"
          className="stroke-[#0D0D0D] dark:stroke-[#CFCFCF]"
        />
        <rect
          x="1"
          y="1"
          width={W - 2}
          height={H - 2}
          fill="none"
          strokeWidth="2"
          className="stroke-[#0D0D0D] dark:stroke-[#CFCFCF]"
        />
        {map.labels.map(([lx, ly], k) => {
          const c = step.assign[k];
          const current = step.region === k;
          return (
            <g key={k}>
              {current && (
                <rect
                  x={lx * CELL_PX - 13}
                  y={ly * CELL_PX - 13}
                  width="26"
                  height="26"
                  fill="none"
                  strokeWidth="2.5"
                  className="stroke-[#CC0000] dark:stroke-[#FF3C3C]"
                />
              )}
              <text
                x={lx * CELL_PX}
                y={ly * CELL_PX + 5}
                textAnchor="middle"
                className={`font-mono text-[15px] font-semibold ${
                  c >= 0 ? SWATCH[c].text : "fill-[#3D3D3D] dark:fill-[#CFCFCF]"
                }`}
              >
                {name(k)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="space-y-3">
        <Slider
          id={`${uid}-t`}
          label={copy.step}
          value={i + 1}
          display={fill(copy.stepOf, { i: nf0.format(i + 1), n: nf0.format(last + 1) })}
          min={1}
          max={last + 1}
          step={1}
          onChange={(v) => {
            setPlaying(false);
            goTo(v - 1);
          }}
        />
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={BTN}
            disabled={i === 0}
            onClick={() => {
              setPlaying(false);
              goTo(i - 1);
            }}
          >
            {copy.back}
          </button>
          <button
            type="button"
            className={BTN}
            disabled={i === last}
            onClick={() => {
              setPlaying(false);
              goTo(i + 1);
            }}
          >
            {copy.next}
          </button>
          {!reduced && (
            <button
              type="button"
              className={BTN}
              disabled={i === last}
              onClick={() => setPlaying(!running)}
            >
              {running ? copy.pause : copy.play}
            </button>
          )}
          <button
            type="button"
            className={BTN}
            disabled={i === last}
            onClick={() => {
              setPlaying(false);
              goTo(last);
            }}
          >
            {copy.end}
          </button>
        </div>
      </div>

      <div>
        <p className={`${LABEL} mb-2`}>{copy.domains}</p>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
          {Array.from({ length: map.n }, (_, v) => (
            <li
              key={v}
              className="flex items-center gap-1.5 text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]"
            >
              <span className="font-mono w-3">{name(v)}</span>
              {Array.from({ length: colours }, (_, c) => {
                const on =
                  step.assign[v] >= 0 ? step.assign[v] === c : (step.domains[v] & (1 << c)) !== 0;
                return <Chip key={c} colour={c} on={on} />;
              })}
              <span className="sr-only">
                {step.assign[v] >= 0
                  ? fill(copy.srColoured, { colour: colourName(step.assign[v]) })
                  : fill(copy.srLeft, {
                      left: Array.from({ length: colours }, (_, c) => c)
                        .filter((c) => step.domains[v] & (1 << c))
                        .map(colourName)
                        .join(locale === "zh-Hans" ? "、" : ", "),
                    })}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A]">{copy.domainNote}</p>
      </div>

      <div className="space-y-2">
        <p aria-live="polite" className={SUMMARY}>
          {fill(copy.stepLine, { i: nf0.format(i + 1) })} {narrate()}{" "}
          {fill(copy.sofar, { placed: nf0.format(sofar.placed), back: nf0.format(sofar.back) })}
        </p>
        <p className={SUMMARY}>{totals}</p>
      </div>
    </div>
  );
}
