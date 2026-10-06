/**
 * GuideStage: where Pawsibly stands during the tour, and how the page around
 * the current stop fades back so the eye lands on it.
 *
 * Focus is three tiers of grey. The stop's key element keeps full colour and a
 * red outline. Its section is lightly desaturated (about 60% greyscale). The
 * rest of the page goes fully grey and dimmer. Two fixed layers do this with
 * backdrop-filter, each masked by rounded-rect cut-outs built from gradient
 * tiles (seven disjoint pieces per rect, combined with mask-composite: exclude,
 * so "page minus section" and "section minus target" need no SVG and never
 * flicker). Browsers without backdrop-filter get a plain dim instead.
 *
 * The cat walks: a two-frame paw swap while it travels an L-shaped path along
 * the margin to sit beside the target, and the dialogue box anchors above or
 * below it, flipping to stay on screen. Under 640px the box stays docked to the
 * bottom edge and the cat sits on its corner. Everything moves by transform (the
 * cut-out by mask position) inside one requestAnimationFrame loop that reads
 * rects first and writes styles after, and scroll or resize just re-runs it.
 * With reduced motion nothing walks or slides; things appear in place.
 *
 * The layers never take clicks. A separate transparent blocker sits under the
 * dialogue box and stops stray clicks on the greyed page (a click there lifts
 * the focus for this line); on steps that invite interaction it has a hole
 * over the target. Scrolling still works through it.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import PixelCat from "./PixelCat";

const DOCK_BELOW = 640; // narrower than this, the box docks to the bottom edge
const PAD = 8; // cut-out padding around the target
const CTX_PAD = 16; // and around its section
const R_TARGET = 8;
const R_CONTEXT = 18;
const GAP = 16; // between the target and the box
const MOVE_MS = 260; // cut-out, outline and box
const WALK_PX_PER_MS = 1.1;
const WALK_MIN_MS = 280;
const WALK_MAX_MS = 820;
const STEP_MS = 130; // walk-cycle frame swap
const FIND_MS = 2000; // how long to wait for a target after a route change

// ── Mask geometry ───────────────────────────────────────────────────────────
const SOLID = "linear-gradient(#000,#000)";
const corner = (at) =>
  `radial-gradient(circle farthest-side at ${at}, #000 calc(100% - 0.75px), transparent 100%)`;
// A rounded rect as seven pieces that never overlap: a top strip between the
// top corners, a full-width middle band, a bottom strip between the bottom
// corners, and four quarter circles. Top and bottom radii can differ, so a
// rect cut off by the viewport edge keeps square corners there.
const PIECES = [
  SOLID,
  SOLID,
  SOLID,
  corner("100% 100%"),
  corner("0 100%"),
  corner("100% 0"),
  corner("0 0"),
];
const OUTER_IMAGES = [SOLID, ...PIECES].join(",");
const CONTEXT_IMAGES = [...PIECES, ...PIECES].join(",");

function pieces({ x, y, w, h, rt, rb }) {
  const a = Math.max(0, Math.floor(Math.min(rt, w / 2, h / 2)));
  const b = Math.max(0, Math.floor(Math.min(rb, w / 2, h / 2)));
  return [
    [x + a, y, w - 2 * a, a],
    [x, y + a, w, h - a - b],
    [x + b, y + h - b, w - 2 * b, b],
    [x, y, a, a],
    [x + w - a, y, a, a],
    [x, y + h - b, b, b],
    [x + w - b, y + h - b, b, b],
  ];
}

function setMask(el, tiles) {
  const pos = tiles.map((t) => (t ? `${t[0]}px ${t[1]}px` : "0px 0px")).join(",");
  const size = tiles.map((t) => (t ? `${t[2]}px ${t[3]}px` : "100% 100%")).join(",");
  el.style.setProperty("-webkit-mask-position", pos);
  el.style.setProperty("mask-position", pos);
  el.style.setProperty("-webkit-mask-size", size);
  el.style.setProperty("mask-size", size);
}

// ── Small rect and point helpers ────────────────────────────────────────────
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), Math.max(lo, hi));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function inflate(r, by) {
  return { x: r.left - by, y: r.top - by, w: r.width + 2 * by, h: r.height + 2 * by };
}
function union(a, b) {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return { x, y, w: Math.max(a.x + a.w, b.x + b.w) - x, h: Math.max(a.y + a.h, b.y + b.h) - y };
}
// Mask tiles must stay inside the viewport (Chrome wraps tiles that hang off
// the edge back in on the far side), so rects are clamped to it, below the
// sticky header so the header always reads as "the rest of the page", and a
// clamped edge gets square corners. Clamping keeps "context contains target",
// which the masks rely on.
function fit(r, vw, vh, radius, top) {
  const x = Math.round(clamp(r.x, 0, vw));
  const y = Math.round(clamp(r.y, top, vh));
  const right = Math.round(clamp(r.x + r.w, 0, vw));
  const bottom = Math.round(clamp(r.y + r.h, 0, vh));
  const sides = x > r.x + 0.5 || right < r.x + r.w - 0.5;
  return {
    x,
    y,
    w: Math.max(0, right - x),
    h: Math.max(0, bottom - y),
    rt: sides || y > r.y + 0.5 ? 0 : radius,
    rb: sides || bottom < r.y + r.h - 0.5 ? 0 : radius,
  };
}
const lerpRect = (a, b, t) =>
  a && b
    ? { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), w: lerp(a.w, b.w, t), h: lerp(a.h, b.h, t) }
    : b;
const lerpPoint = (a, b, t) => (a && b ? { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) } : b);

/** L-shaped route between two points, turning at the corner nearer an edge. */
function walkPoint(from, to, t, vw, vh, size) {
  const edge = (p) => Math.min(p.x, vw - p.x - size, p.y, vh - p.y - size);
  const a = { x: to.x, y: from.y };
  const b = { x: from.x, y: to.y };
  const turn = edge(a) <= edge(b) ? a : b;
  const d1 = Math.abs(turn.x - from.x) + Math.abs(turn.y - from.y);
  const d2 = Math.abs(to.x - turn.x) + Math.abs(to.y - turn.y);
  const total = d1 + d2;
  if (total < 1) return to;
  const d = t * total;
  return d <= d1 ? lerpPoint(from, turn, d / (d1 || 1)) : lerpPoint(turn, to, (d - d1) / (d2 || 1));
}

function findContext(target, selector) {
  if (selector) {
    const el = document.querySelector(selector);
    if (el?.contains(target)) return el;
  }
  return target.parentElement?.closest("section, header, article") || target.parentElement;
}

function findTarget(selector) {
  const el = selector ? document.querySelector(selector) : null;
  return el && el.getClientRects().length > 0 ? el : null;
}

function safeTopNow() {
  const header = document.querySelector('header[role="banner"]');
  return Math.max(0, header ? header.getBoundingClientRect().bottom : 0) + 8;
}

/**
 * The stage engine. Created once per dialogue box; holds its own mutable state
 * and reads the latest props through `io.live`. One rAF loop: measure (reads
 * only), then paint (writes only).
 */
function createStage(io) {
  const { boxRef, live, refs, setStep, setHasTarget } = io;
  const target = { el: null, ctx: null, pending: false };
  let cur = { box: { x: 0, y: 0 }, cat: null, T: null, C: null, place: "dock" };
  let anim = null;
  let raf = 0;
  // While the page smooth-scrolls to a new target, the cut-out follows it but
  // the box and the cat wait, then move once the scroll settles.
  let holding = false;
  let releaseHold = null;
  let findTimer = 0;

  // ── Measure: where everything should be right now ────────────────────────
  function measure() {
    const box = boxRef.current;
    if (!box) return null;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const mobile = vw < DOCK_BELOW;
    const size = mobile ? 36 : 40;
    const safeTop = safeTopNow();
    const { anchored, focus } = live.current;

    const bw = box.offsetWidth;
    const bh = box.offsetHeight;
    const br = box.getBoundingClientRect();
    const dock = { x: br.left - cur.box.x, y: br.top - cur.box.y };

    let T = null;
    let C = null;
    if (target.el?.isConnected) {
      const tr = target.el.getBoundingClientRect();
      if (tr.width && tr.height) {
        T = inflate(tr, PAD);
        const cr = target.ctx?.isConnected ? target.ctx.getBoundingClientRect() : tr;
        C = union(inflate(cr, CTX_PAD), { x: T.x - 10, y: T.y - 10, w: T.w + 20, h: T.h + 20 });
      }
    }

    let place = "dock";
    let boxPos = dock;
    let cat = null;
    const onScreen = T && T.y + T.h > safeTop && T.y < vh;
    if (anchored && onScreen && !mobile) {
      const roomLeft = T.x - size - 6 >= 8;
      const roomRight = T.x + T.w + 6 + size <= vw - 8;
      const side = roomLeft ? "left" : roomRight ? "right" : null;
      const gap = side ? GAP : size + 8;
      const below = T.y + T.h + gap;
      const above = T.y - gap - bh;
      const fits = { below: below + bh <= vh - 12, above: above >= safeTop };
      const prefer = focus?.place === "above" ? ["above", "below"] : ["below", "above"];
      if (cur.place !== "dock" && fits[cur.place]) place = cur.place;
      else place = prefer.find((p) => fits[p]) || "dock";

      if (place !== "dock") {
        const catX = side === "right" ? T.x + T.w + 6 : T.x - size - 6;
        const left = side === "right" ? catX + size - bw : side === "left" ? catX : T.x;
        boxPos = { x: clamp(left, 12, vw - bw - 12), y: place === "below" ? below : above };
        if (side) {
          const y = place === "below" ? T.y + T.h - size : T.y;
          cat = { x: catX, y: clamp(y, safeTop, vh - size - 4) };
        } else {
          // No margin beside the target: sit on the box, in the gap left for it.
          cat = {
            x: boxPos.x + 12,
            y: place === "below" ? boxPos.y - size + 3 : boxPos.y + bh - 3,
          };
        }
      }
    }
    if (!cat) cat = { x: boxPos.x + 12, y: boxPos.y - size + 3 };
    // Docked under a tall target (phones, mostly): highlight only the part
    // above the cat and the box, so neither sits on the highlighted area.
    if (T && place === "dock" && anchored) {
      const limit = cat.y - 6;
      if (T.y < limit - 24 && T.y + T.h > limit) T = { ...T, h: limit - T.y };
    }

    return {
      vw,
      vh,
      size,
      place,
      top: safeTop - 8,
      box: { x: boxPos.x - dock.x, y: boxPos.y - dock.y },
      cat,
      T,
      C,
    };
  }

  // ── Paint: write transforms and masks (no reads) ─────────────────────────
  function paint(L) {
    const { outer, context, ring, block, cat } = refs;
    if (boxRef.current) {
      boxRef.current.style.transform =
        L.box.x || L.box.y
          ? `translate3d(${Math.round(L.box.x)}px, ${Math.round(L.box.y)}px, 0)`
          : "";
    }
    if (cat.current && L.cat) {
      cat.current.style.transform = `translate3d(${Math.round(L.cat.x)}px, ${Math.round(L.cat.y)}px, 0)`;
      cat.current.style.visibility = "visible";
    }
    const { T, C } = L;
    if (T && C) {
      const t = fit(T, L.vw, L.vh, R_TARGET, L.top);
      const c = fit(C, L.vw, L.vh, R_CONTEXT, L.top);
      if (outer.current) setMask(outer.current, [null, ...pieces(c)]);
      if (context.current) setMask(context.current, [...pieces(c), ...pieces(t)]);
      if (ring.current) {
        // The outline uses the real rect: it may run past the viewport edge.
        const s = ring.current.style;
        s.width = `${Math.round(T.w)}px`;
        s.height = `${Math.round(T.h)}px`;
        s.transform = `translate3d(${Math.round(T.x)}px, ${Math.round(T.y)}px, 0)`;
      }
      if (block.current) {
        block.current.style.clipPath = live.current.focus?.interactive
          ? `path(evenodd, "M0 0H${L.vw}V${L.vh}H0Z M${t.x} ${t.y}H${t.x + t.w}V${t.y + t.h}H${t.x}Z")`
          : "";
      }
    }
    cur = { box: L.box, cat: L.cat, T, C, place: L.place };
  }

  // ── The loop ──────────────────────────────────────────────────────────────
  function tick(now) {
    raf = 0;
    if (target.pending) return;
    const L = measure();
    if (!L) return;
    if (holding) {
      paint({ ...L, box: cur.box, cat: cur.cat, place: cur.place });
      return;
    }
    if (!anim) {
      // Scrolling flipped the box or sent it to the dock: walk there too.
      if (L.place !== cur.place && !live.current.reduced) move();
      else paint(L);
      return;
    }
    if (anim.catMs === undefined) {
      const from = anim.from.cat;
      const d = from ? Math.abs(L.cat.x - from.x) + Math.abs(L.cat.y - from.y) : 0;
      anim.catMs = d < 3 ? 0 : clamp(d / WALK_PX_PER_MS, WALK_MIN_MS, WALK_MAX_MS);
    }
    const p = Math.min(1, (now - anim.t0) / MOVE_MS);
    const q = anim.catMs ? Math.min(1, (now - anim.t0) / anim.catMs) : 1;
    const e = ease(p);
    const walking = q < 1;
    paint({
      ...L,
      box: lerpPoint(anim.from.box, L.box, e),
      T: lerpRect(anim.from.T, L.T, e),
      C: lerpRect(anim.from.C, L.C, e),
      cat:
        anim.from.cat && walking ? walkPoint(anim.from.cat, L.cat, q, L.vw, L.vh, L.size) : L.cat,
    });
    setStep(walking ? (Math.floor((now - anim.t0) / STEP_MS) % 2 ? "walkB" : "walkA") : null);
    if (p < 1 || walking) raf = requestAnimationFrame(tick);
    else anim = null;
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function move() {
    if (live.current.reduced) {
      anim = null;
      setStep(null);
    } else {
      anim = { t0: performance.now(), from: { box: cur.box, cat: cur.cat, T: cur.T, C: cur.C } };
    }
    schedule();
  }

  function endHold() {
    if (releaseHold) releaseHold();
  }

  // Bring the target into view with room for the box (above the docked box on
  // phones). Returns true when it started a smooth scroll.
  function reveal(el) {
    const r = el.getBoundingClientRect();
    const mobile = document.documentElement.clientWidth < DOCK_BELOW;
    const top = safeTopNow() + 16;
    const boxH = boxRef.current?.offsetHeight || 0;
    const limit = window.innerHeight - (mobile ? boxH + 56 : 16);
    if (r.top >= top && r.bottom <= limit) return false;
    const smooth = !live.current.reduced;
    window.scrollTo({ top: window.scrollY + r.top - top, behavior: smooth ? "smooth" : "auto" });
    return smooth;
  }

  function settle(el, focus) {
    target.el = el;
    target.ctx = el ? findContext(el, focus?.context) : null;
    target.pending = false;
    // A new line picks its own side of the target; only scrolling keeps the old one.
    cur.place = "dock";
    setHasTarget(Boolean(el));
    if (el && live.current.anchored && reveal(el)) {
      holding = true;
      let timer = 0;
      const release = () => {
        window.removeEventListener("scrollend", release);
        clearTimeout(timer);
        releaseHold = null;
        holding = false;
        move();
      };
      releaseHold = release;
      window.addEventListener("scrollend", release);
      timer = setTimeout(release, 1200);
      schedule();
      return;
    }
    move();
  }

  return {
    measure,
    paint,
    schedule,
    move,
    /** Start looking for this line's target; holds the layout while it waits. */
    find(focus) {
      clearTimeout(findTimer);
      if (holding && releaseHold) {
        // A new line arrived mid-scroll: drop the old hold without moving yet.
        const r = releaseHold;
        releaseHold = null;
        holding = false;
        window.removeEventListener("scrollend", r);
      }
      const started = performance.now();
      target.pending = Boolean(focus);
      const look = () => {
        const el = findTarget(focus?.target);
        if (el || !focus || performance.now() - started > FIND_MS) settle(el, focus);
        else findTimer = setTimeout(look, 100);
      };
      look();
    },
    /** The cat starts at the launcher corner and walks to its spot. */
    hopFromLauncher() {
      cur.cat = { x: 22, y: window.innerHeight - 52 };
      move();
    },
    pending: () => target.pending,
    animating: () => Boolean(anim),
    dispose() {
      cancelAnimationFrame(raf);
      raf = 0;
      clearTimeout(findTimer);
      endHold();
    },
  };
}

export default function GuideStage({
  focus,
  focusKey,
  anchored,
  spotOn,
  reduced,
  frame,
  boxRef,
  fromLauncher,
  onLift,
}) {
  const outer = useRef(null);
  const context = useRef(null);
  const ring = useRef(null);
  const block = useRef(null);
  const cat = useRef(null);

  // Latest props for the rAF loop, which outlives any one render.
  const live = useRef({ focus, anchored, spotOn, reduced });
  useLayoutEffect(() => {
    live.current = { focus, anchored, spotOn, reduced };
  });

  const [hasTarget, setHasTarget] = useState(false);
  const [step, setStep] = useState(null);
  // The engine is made on first use, outside render.
  const engine = useRef(null);
  const getStage = useCallback(() => {
    if (!engine.current) {
      engine.current = createStage({
        boxRef,
        live,
        refs: { outer, context, ring, block, cat },
        setStep,
        setHasTarget,
      });
    }
    return engine.current;
  }, [boxRef]);

  // First placement: the cat hops out of the launcher corner, or just appears.
  useLayoutEffect(() => {
    const stage = getStage();
    if (fromLauncher && !live.current.reduced) stage.hopFromLauncher();
    else {
      const L = stage.measure();
      if (L) stage.paint(L);
    }
    return () => stage.dispose();
    // Mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStage]);

  // Find the target for this line (it may arrive a moment after a route change).
  useEffect(() => {
    getStage().find(focus);
    // focusKey identifies the line; focus is derived from it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, getStage]);

  // Anchoring switches on when the visitor engages and off when the log opens.
  useEffect(() => {
    getStage().move();
  }, [anchored, getStage]);

  // Follow the page.
  useEffect(() => {
    const stage = getStage();
    const opts = { passive: true };
    const onChange = () => stage.schedule();
    window.addEventListener("scroll", onChange, opts);
    window.addEventListener("resize", onChange, opts);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onChange) : null;
    if (ro && boxRef.current) ro.observe(boxRef.current);
    return () => {
      window.removeEventListener("scroll", onChange, opts);
      window.removeEventListener("resize", onChange, opts);
      ro?.disconnect();
    };
  }, [getStage, boxRef]);

  // Paint the masks before the layers show, so they never flash uncut.
  const showSpot = spotOn && hasTarget;
  useLayoutEffect(() => {
    const stage = getStage();
    if (!showSpot || stage.pending() || stage.animating()) return;
    const L = stage.measure();
    if (L) stage.paint(L);
  }, [showSpot, getStage]);

  return (
    <>
      <div aria-hidden="true" className={showSpot ? "print:hidden" : "hidden"}>
        <div
          ref={outer}
          className="guide-spot guide-spot-outer animate-enter"
          style={{ WebkitMaskImage: OUTER_IMAGES, maskImage: OUTER_IMAGES }}
        />
        <div
          ref={context}
          className="guide-spot guide-spot-context animate-enter"
          style={{ WebkitMaskImage: CONTEXT_IMAGES, maskImage: CONTEXT_IMAGES }}
        />
        <div ref={ring} className="guide-spot-ring" />
      </div>
      <div
        ref={block}
        aria-hidden="true"
        onClick={onLift}
        className={showSpot ? "fixed inset-0 z-[55] print:hidden" : "hidden"}
      />
      <div
        ref={cat}
        aria-hidden="true"
        className={`fixed left-0 top-0 ${spotOn ? "z-[57]" : "z-[41]"} pointer-events-none print:hidden text-black dark:text-white`}
        style={{ visibility: "hidden", willChange: "transform" }}
      >
        <PixelCat frame={step || frame} className="w-9 h-9 sm:w-10 sm:h-10" />
      </div>
    </>
  );
}
