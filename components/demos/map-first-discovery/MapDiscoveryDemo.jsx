/**
 * MapDiscoveryDemo: a concept demo for /projects/map-first-discovery. A
 * sketch map of inner Melbourne with synthetic people and events, a search
 * radius around your pin, pins that group when they crowd together, a
 * "nearby now" list, and people's pins snapped to a fixed grid so their real
 * position never shows. Written fresh for this site. It shares no code with
 * the app, and nothing is stored or sent: state lives in memory only.
 *
 * Accessibility: the map is one tab stop (an application region). Arrow keys
 * move your pin, Shift moves it further, and + and - zoom. Every control is a
 * native input or button. The nearby list is a list of toggle buttons that
 * select a pin, so the map's content is also available as text, and a polite
 * live region reads a one-line summary after each change. Nothing animates.
 * The only transitions are colour fades, switched off for reduced motion.
 */
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { fill } from "@/lib/fill";
import { DEMO as D, JUMP_PLACES, PLACES, START_PLACE } from "@/lib/demos/map-first-discovery-data";
import ApiPreview from "./ApiPreview";
import MapCanvas from "./MapCanvas";
import { makeFormat } from "./format";
import { EVENT_ITEMS, PEOPLE, PLACE_XY, WORLD, blocked, dist, nearestPlace, snap } from "./geo";

/** Metres across the map's width at each zoom level. */
const SPANS = [12000, 6000, 3000, 1500];
const START = { level: 1, radius: 1500, show: "all", cell: 500, grouping: true, reveal: false };
const CELLS = [250, 500, 1000];
const GROUP_PX = 46;
const FEED_STEP = 8;
const PLACE_BY_ID = Object.fromEntries(PLACES.map((p) => [p.id, p]));

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const BTN = `inline-flex items-center justify-center min-h-[36px] min-w-[36px] rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-3 text-xs text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`;
const PILL =
  "flex min-h-[36px] items-center gap-2 rounded-full border px-3 text-xs transition-colors duration-150 motion-reduce:transition-none border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE] peer-checked:border-[#1A1A1A] peer-checked:bg-[#1A1A1A] peer-checked:text-white dark:peer-checked:border-[#EEEEEE] dark:peer-checked:bg-[#EEEEEE] dark:peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#CC0000] dark:peer-focus-visible:outline-[#FF3C3C]";
const CHECK = `mt-0.5 h-4 w-4 shrink-0 accent-[#1A1A1A] dark:accent-[#EEEEEE] ${FOCUS}`;

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

/** The small shapes used by the legend and the list: circle, square, ring. */
function Glyph({ kind, faint = false }) {
  const tone = faint ? "fill-[#BDBDBD] dark:fill-[#4A4A4A]" : "fill-[#1A1A1A] dark:fill-[#EEEEEE]";
  return (
    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      {kind === "event" && <rect x="1.5" y="1.5" width="11" height="11" className={tone} />}
      {kind === "person" && <circle cx="7" cy="7" r="5.5" className={tone} />}
      {kind === "group" && (
        <>
          <circle cx="7" cy="7" r="6.5" className={tone} />
          <text
            x="7"
            y="7.5"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="7"
            className="font-mono fill-white dark:fill-black"
          >
            3
          </text>
        </>
      )}
      {kind === "you" && (
        <circle cx="7" cy="7" r="5" className="fill-[#CC0000] dark:fill-[#FF3C3C]" />
      )}
      {kind === "truth" && (
        <circle
          cx="7"
          cy="7"
          r="3.5"
          strokeWidth="1.5"
          className="fill-white dark:fill-[#0A0A0A] stroke-[#CC0000] dark:stroke-[#FF3C3C]"
        />
      )}
    </svg>
  );
}

export default function MapDiscoveryDemo({ lang = "en" }) {
  const L = (o) => o[lang];
  const fmt = useMemo(() => makeFormat(lang), [lang]);
  const raw = useId();
  const uid = `mfd${raw.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const helpId = `${uid}-help`;
  const apiId = `${uid}-api`;
  const feedId = `${uid}-feed`;

  const [you, setYou] = useState(PLACE_XY[START_PLACE]);
  const [centre, setCentre] = useState(PLACE_XY[START_PLACE]);
  const [level, setLevel] = useState(START.level);
  const [radius, setRadius] = useState(START.radius);
  const [show, setShow] = useState(START.show);
  const [cell, setCell] = useState(START.cell);
  const [grouping, setGrouping] = useState(START.grouping);
  const [reveal, setReveal] = useState(START.reveal);
  const [selectedId, setSelectedId] = useState(null);
  const [limit, setLimit] = useState(FEED_STEP);
  const [message, setMessage] = useState("");
  const [size, setSize] = useState({ w: 600, h: 480 });
  const boxRef = useRef(null);

  // Draw the map at its real pixel size, so pins and labels stay crisp and
  // the same size on a phone and a desktop.
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const measure = () => {
      const w = Math.max(240, Math.round(el.clientWidth));
      const h = Math.round(Math.min(520, Math.max(300, w * 0.9)));
      setSize((s) => (s.w === w && s.h === h ? s : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const mpp = SPANS[level] / w;

  // The view's centre, kept inside the map wherever the map is big enough.
  const view = useMemo(() => {
    const hw = (w * mpp) / 2;
    const hh = (h * mpp) / 2;
    const clampAxis = (v, min, max, half) =>
      max - min <= half * 2 ? (min + max) / 2 : Math.min(Math.max(v, min + half), max - half);
    return {
      x: clampAxis(centre.x, WORLD.minX, WORLD.maxX, hw),
      y: clampAxis(centre.y, WORLD.minY, WORLD.maxY, hh),
      mpp,
    };
  }, [centre, w, h, mpp]);

  const inView = (p, margin = 24) =>
    Math.abs(p.x - view.x) <= (w / 2 - margin) * mpp &&
    Math.abs(p.y - view.y) <= (h / 2 - margin) * mpp;

  // Every item with where it is drawn and how far it is from you. People are
  // drawn at their square's centre and their distance is measured from there.
  const items = useMemo(() => {
    const people = PEOPLE.map((p) => {
      const shown = snap(p.xy, cell);
      return { ...p, shown, d: dist(you, shown) };
    });
    const events = EVENT_ITEMS.map((e) => ({ ...e, shown: e.xy, d: dist(you, e.xy) }));
    const visible = [...(show === "events" ? [] : people), ...(show === "people" ? [] : events)];
    return visible.map((it) => ({ ...it, inRange: it.d <= radius }));
  }, [you, cell, show, radius]);

  const nearby = useMemo(
    () => items.filter((it) => it.inRange).sort((a, b) => a.d - b.d || a.id.localeCompare(b.id)),
    [items]
  );
  const counts = {
    people: nearby.filter((it) => it.kind === "person").length,
    events: nearby.filter((it) => it.kind === "event").length,
  };

  // Group pins: by screen cell when grouping is on, otherwise only the people
  // who share a square (they sit on exactly the same spot).
  const groups = useMemo(() => {
    const buckets = new Map();
    const span = GROUP_PX * mpp;
    for (const it of items) {
      const key = grouping
        ? `g${Math.floor(it.shown.x / span)}:${Math.floor(it.shown.y / span)}`
        : it.kind === "person"
          ? `p${it.shown.x}:${it.shown.y}`
          : it.id;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(it);
    }
    return [...buckets.entries()].map(([key, members]) => {
      const x = members.reduce((s, m) => s + m.shown.x, 0) / members.length;
      const y = members.reduce((s, m) => s + m.shown.y, 0) / members.length;
      const sameSquare =
        members.every((m) => m.kind === "person") &&
        members.every((m) => m.shown.x === members[0].shown.x && m.shown.y === members[0].shown.y);
      return { key, members, x, y, sameSquare, inRange: members.some((m) => m.inRange) };
    });
  }, [items, grouping, mpp]);

  const place = nearestPlace(you);
  const placeName = place[lang];
  const count = (forms, n) => fill(L(n === 1 ? forms.one : forms.other), { n });
  const summary = fill(L(D.summary), {
    people: count(D.peopleCount, counts.people),
    events: count(D.eventCount, counts.events),
    radius: fmt.distance(radius),
    place: placeName,
    cell: fmt.distance(cell),
  });

  const selected = items.find((it) => it.id === selectedId) || null;

  const moveTo = (p, { recentre = false } = {}) => {
    const why = blocked(p);
    if (why) {
      setMessage(L(why === "water" ? D.inBay : D.edge));
      return;
    }
    setYou(p);
    setMessage("");
    if (recentre || !inView(p)) setCentre(p);
  };

  const zoom = (step) => {
    setLevel((l) => Math.min(SPANS.length - 1, Math.max(0, l + step)));
  };

  const select = (item) => {
    setSelectedId(item.id);
    const index = nearby.findIndex((it) => it.id === item.id);
    if (index >= limit) setLimit(index + 1);
    if (!inView(item.shown)) setCentre(item.shown);
  };

  const onGroupClick = (grp) => {
    if (grp.members.length > 1 && !grp.sameSquare && level < SPANS.length - 1) {
      setCentre({ x: grp.x, y: grp.y });
      setLevel(level + 1);
      return;
    }
    select(grp.members[0]);
  };

  const onMapKey = (e) => {
    const step = e.shiftKey ? 1000 : 200;
    const move = {
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
    }[e.key];
    if (move) {
      e.preventDefault();
      moveTo({ x: you.x + move[0], y: you.y + move[1] });
    } else if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      zoom(1);
    } else if (e.key === "-" || e.key === "_") {
      e.preventDefault();
      zoom(-1);
    }
  };

  const reset = () => {
    setYou(PLACE_XY[START_PLACE]);
    setCentre(PLACE_XY[START_PLACE]);
    setLevel(START.level);
    setRadius(START.radius);
    setShow(START.show);
    setCell(START.cell);
    setGrouping(START.grouping);
    setReveal(START.reveal);
    setSelectedId(null);
    setLimit(FEED_STEP);
    setMessage("");
  };

  const jumpValue = JUMP_PLACES.includes(place.id) ? place.id : "";

  return (
    <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mb-5">
        <p className={`${META} font-mono flex items-center gap-2`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
          {L(D.synthetic)}
        </p>
        <p className={`${META} font-mono`}>{L(D.clock)}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* Map, with its own zoom and jump controls above it */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <div className="min-w-0">
              <label htmlFor={`${uid}-jump`} className={`${META} block mb-1.5`}>
                {L(D.startNear)}
              </label>
              <select
                id={`${uid}-jump`}
                value={jumpValue}
                onChange={(e) => {
                  if (!e.target.value) return;
                  setSelectedId(null);
                  moveTo(PLACE_XY[e.target.value], { recentre: true });
                }}
                className={`min-h-[36px] max-w-full rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A] px-3 pr-8 text-xs text-[#1A1A1A] dark:text-[#EEEEEE] ${FOCUS}`}
              >
                {!jumpValue && <option value="">{placeName}</option>}
                {JUMP_PLACES.map((id) => (
                  <option key={id} value={id}>
                    {(PLACE_BY_ID[id].label || PLACE_BY_ID[id])[lang]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className={BTN}
                onClick={() => zoom(-1)}
                disabled={level === 0}
                aria-label={L(D.zoomOut)}
              >
                <span aria-hidden="true">−</span>
              </button>
              <span className="font-mono text-[11px] text-[#595959] dark:text-[#9A9A9A] tabular-nums px-1">
                {fill(L(D.zoomLevel), { n: level + 1, total: SPANS.length })}
              </span>
              <button
                type="button"
                className={BTN}
                onClick={() => zoom(1)}
                disabled={level === SPANS.length - 1}
                aria-label={L(D.zoomIn)}
              >
                <span aria-hidden="true">+</span>
              </button>
              <button
                type="button"
                className={BTN}
                onClick={() => setCentre(you)}
                disabled={
                  inView(you, 60) && Math.abs(view.x - you.x) < 1 && Math.abs(view.y - you.y) < 1
                }
              >
                {L(D.centre)}
              </button>
            </div>
          </div>

          <p id={helpId} className="text-xs text-[#595959] dark:text-[#9A9A9A] mb-2">
            {L(D.mapHelp)}
          </p>
          <div
            ref={boxRef}
            role="application"
            tabIndex={0}
            aria-roledescription={L(D.mapRole)}
            aria-label={L(D.mapName)}
            aria-describedby={helpId}
            onKeyDown={onMapKey}
            className={`overflow-hidden rounded-lg border border-[#E0E0E0] dark:border-[#3D3D3D] ${FOCUS}`}
          >
            <MapCanvas
              w={w}
              h={h}
              view={view}
              level={level}
              you={you}
              radius={radius}
              groups={groups}
              reveal={reveal}
              revealPeople={items.filter((it) => it.kind === "person")}
              cell={cell}
              selectedId={selectedId}
              lang={lang}
              uid={uid}
              onBackgroundClick={(p) => moveTo(p)}
              onGroupClick={onGroupClick}
            />
          </div>

          {/* Legend */}
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]">
            {["you", "person", "event", "group", ...(reveal ? ["truth"] : [])].map((k) => (
              <li key={k} className="flex items-center gap-1.5">
                <Glyph kind={k} />
                {L(D.legend[k])}
              </li>
            ))}
          </ul>

          {/* Visible stats; the same numbers are read out by the live summary */}
          <dl className="mt-4 grid grid-cols-3 gap-px border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
            {[
              [L(D.stats.people), counts.people],
              [L(D.stats.events), counts.events],
              [L(D.stats.precision), fmt.distance(cell)],
            ].map(([k, v]) => (
              <div key={k} className="bg-white dark:bg-[#0A0A0A] px-3 py-2.5 min-w-0">
                <dt className={META}>{k}</dt>
                <dd className="font-mono text-sm text-[#1A1A1A] dark:text-[#EEEEEE]">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="sr-only" aria-live="polite">
            {summary}
          </p>
          <p role="status" className="mt-2 text-xs text-[#1A1A1A] dark:text-[#EEEEEE] min-h-[1rem]">
            {message ||
              (selected ? (
                <>
                  <span className="font-medium">
                    {selected.kind === "event" ? selected.title[lang] : selected.name}
                  </span>
                  {` · ${fmt.describe(selected, cell)}`}
                </>
              ) : (
                ""
              ))}
          </p>
        </div>

        {/* Controls, then the nearby list */}
        <div className="min-w-0 space-y-5">
          <div>
            <label htmlFor={`${uid}-radius`} className={`${META} flex justify-between mb-1.5`}>
              <span>{L(D.radius)}</span>
              <span className="font-mono normal-case tracking-normal text-[#1A1A1A] dark:text-[#EEEEEE]">
                {fmt.distance(radius)}
              </span>
            </label>
            <input
              id={`${uid}-radius`}
              type="range"
              min="500"
              max="5000"
              step="250"
              value={radius}
              aria-valuetext={fmt.distance(radius)}
              onChange={(e) => setRadius(Number(e.target.value))}
              className={`w-full accent-[#CC0000] dark:accent-[#FF3C3C] ${FOCUS}`}
            />
          </div>
          <RadioPills
            legend={L(D.show)}
            name={`${uid}-show`}
            value={show}
            onChange={(v) => {
              setShow(v);
              setSelectedId(null);
            }}
            options={[
              { value: "all", label: L(D.showAll) },
              { value: "people", label: L(D.showPeople) },
              { value: "events", label: L(D.showEvents) },
            ]}
          />
          <RadioPills
            legend={L(D.precision)}
            name={`${uid}-cell`}
            value={String(cell)}
            onChange={(v) => setCell(Number(v))}
            options={CELLS.map((c) => ({ value: String(c), label: fmt.distance(c) }))}
          />
          <div className="space-y-2.5">
            <label className="flex items-start gap-2.5 text-sm text-[#1A1A1A] dark:text-[#EEEEEE] cursor-pointer">
              <input
                type="checkbox"
                checked={grouping}
                onChange={(e) => setGrouping(e.target.checked)}
                className={CHECK}
              />
              {L(D.group)}
            </label>
            <label className="flex items-start gap-2.5 text-sm text-[#1A1A1A] dark:text-[#EEEEEE] cursor-pointer">
              <input
                type="checkbox"
                checked={reveal}
                onChange={(e) => setReveal(e.target.checked)}
                className={CHECK}
              />
              {L(D.reveal)}
            </label>
          </div>
          <button type="button" className={BTN} onClick={reset}>
            {L(D.reset)}
          </button>

          <div className="border-t border-[#F0F0F0] dark:border-[#3D3D3D] pt-5">
            <h3
              id={feedId}
              className="text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE] mb-1 flex items-baseline justify-between gap-3"
            >
              {L(D.feedTitle)}
              <span className="font-mono text-xs font-normal text-[#595959] dark:text-[#9A9A9A]">
                {nearby.length}
              </span>
            </h3>
            <p className="text-xs text-[#595959] dark:text-[#9A9A9A] mb-3">
              {fill(L(D.near), { place: placeName })} · {fmt.distance(radius)}
            </p>
            {nearby.length === 0 ? (
              <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA]">
                {fill(L(D.feedEmpty), { radius: fmt.distance(radius) })}
              </p>
            ) : (
              <>
                <ul
                  aria-labelledby={feedId}
                  className="border-y border-[#F0F0F0] dark:border-[#3D3D3D] divide-y divide-[#F0F0F0] dark:divide-[#3D3D3D]"
                >
                  {nearby.slice(0, limit).map((it) => {
                    const on = it.id === selectedId;
                    return (
                      <li key={it.id}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => (on ? setSelectedId(null) : select(it))}
                          className={`w-full text-left flex gap-2.5 py-2.5 px-2 -mx-2 rounded-md transition-colors duration-150 motion-reduce:transition-none hover:bg-[#F7F7F7] dark:hover:bg-[#141414] ${
                            on
                              ? "bg-[#F7F7F7] dark:bg-[#141414] shadow-[inset_2px_0_0_#CC0000] dark:shadow-[inset_2px_0_0_#FF3C3C]"
                              : ""
                          } ${FOCUS}`}
                        >
                          <span className="mt-1">
                            <Glyph kind={it.kind} />
                          </span>
                          <span className="min-w-0">
                            <span className="sr-only">
                              {L(it.kind === "event" ? D.kindEvent : D.kindPerson)}:{" "}
                            </span>
                            <span className="block text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE] break-words">
                              {it.kind === "event" ? it.title[lang] : it.name}
                            </span>
                            <span className="block text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed break-words">
                              {fmt.describe(it, cell)}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {nearby.length > limit && (
                  <button
                    type="button"
                    className={`${BTN} mt-3`}
                    onClick={() => setLimit((n) => n + FEED_STEP)}
                  >
                    {fill(L(D.showMore), { n: Math.min(FEED_STEP, nearby.length - limit) })}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <ApiPreview
        you={you}
        radius={radius}
        show={show}
        cell={cell}
        items={nearby}
        lang={lang}
        id={apiId}
      />
    </div>
  );
}
