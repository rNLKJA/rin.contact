import { useEffect, useRef } from "react";

const TRAIL_COUNT = 3;
// Reduced from 6 to 3 dots — halves RAF workload, lowers GPU pressure
const LERP_RATES  = [0.22, 0.14, 0.08];
const TRAIL_SIZES = [6.5,  4.0,  2.2];
const TRAIL_ALPHA = [0.55, 0.30, 0.10];

export default function CustomCursor() {
  const dotRef      = useRef(null);
  const dotInnerRef = useRef(null);
  const trailRefs   = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only activate on pointer-capable (non-touch) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Hide native cursor globally
    const style = document.createElement("style");
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    const mouse  = { x: -300, y: -300 };
    const trails = Array.from({ length: TRAIL_COUNT }, () => ({ x: -300, y: -300 }));
    let visible  = false;
    let clicking = false;
    let hovering = false;
    let rafId    = null;

    const lerp = (a, b, t) => a + (b - a) * t;

    // ── Apply current state to dot inner element ──────────────────────
    const applyDotState = () => {
      const inner = dotInnerRef.current;
      if (!inner) return;
      const size = clicking ? 7 : hovering ? 14 : 10;
      inner.style.width        = `${size}px`;
      inner.style.height       = `${size}px`;
      inner.style.marginLeft   = `${-size / 2}px`;
      inner.style.marginTop    = `${-size / 2}px`;
      inner.style.boxShadow    = clicking
        ? "0 0 14px rgba(255,60,60,1)"
        : hovering
        ? "0 0 10px rgba(255,60,60,0.8)"
        : "0 0 8px rgba(255,60,60,0.5)";
    };

    // ── RAF loop — only runs when cursor visible; stops when mouse leaves ──
    const tick = () => {
      if (!visible) return; // stop scheduling when hidden
      let prev = mouse;
      for (let i = 0; i < TRAIL_COUNT; i++) {
        trails[i].x = lerp(trails[i].x, prev.x, LERP_RATES[i]);
        trails[i].y = lerp(trails[i].y, prev.y, LERP_RATES[i]);
        prev = trails[i];
      }

      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouse.x}px,${mouse.y}px)`;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate(${trails[i].x}px,${trails[i].y}px)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const startTick = () => {
      if (rafId == null) rafId = requestAnimationFrame(tick);
    };
    const stopTick = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // ── Event handlers ────────────────────────────────────────────────
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        trailRefs.current.forEach((el, i) => {
          if (el) el.style.opacity = String(TRAIL_ALPHA[i]);
        });
        startTick();
      }
    };

    const onLeave = () => {
      visible = false;
      stopTick();
      if (dotRef.current) dotRef.current.style.opacity = "0";
      trailRefs.current.forEach((el) => { if (el) el.style.opacity = "0"; });
    };

    const onDown = () => { clicking = true;  applyDotState(); };
    const onUp   = () => { clicking = false; applyDotState(); };

    const onOver = (e) => {
      const wasHovering = hovering;
      hovering = !!e.target.closest(
        "a, button, [role='button'], input, textarea, select, label, [tabindex]"
      );
      if (hovering !== wasHovering) applyDotState();
    };

    window.addEventListener("mousemove", onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("mouseover",  onOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.head.removeChild(style);
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mouseover",  onOver);
    };
  }, []);

  return (
    <>
      {/* ── Comet tail — trail dots ─────────────────────────── */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          aria-hidden="true"
          style={{
            position:      "fixed",
            top:           0,
            left:          0,
            width:         TRAIL_SIZES[i],
            height:        TRAIL_SIZES[i],
            marginLeft:    -TRAIL_SIZES[i] / 2,
            marginTop:     -TRAIL_SIZES[i] / 2,
            borderRadius:  "50%",
            background:    "radial-gradient(circle at 38% 30%, #ffffff, #ff6b6b 50%, #FF3C3C)",
            boxShadow:     `0 0 ${TRAIL_SIZES[i] * 2.5}px rgba(255,60,60,0.6)`,
            pointerEvents: "none",
            zIndex:        10001,
            opacity:       0,
            willChange:    "transform",
            transition:    "opacity 0.25s",
          }}
        />
      ))}


      {/* ── Main dot (positioned by transform; inner handles size) ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        10003,
          opacity:       0,
          willChange:    "transform",
          transition:    "opacity 0.2s",
        }}
      >
        {/* Inner element — size & glow animated via applyDotState */}
        <div
          ref={dotInnerRef}
          style={{
            width:        10,
            height:       10,
            marginLeft:   -5,
            marginTop:    -5,
            borderRadius: "50%",
            background:   "radial-gradient(circle at 35% 28%, #ffffff 0%, #ff7070 40%, #FF3C3C 100%)",
            boxShadow:    "0 0 0 2px rgba(255,60,60,0.15), 0 0 10px rgba(255,60,60,0.75), 0 0 22px rgba(255,60,60,0.3)",
            transition:   "width 0.15s ease, height 0.15s ease, margin 0.15s ease, box-shadow 0.15s ease",
          }}
        />
      </div>
    </>
  );
}
