/**
 * HeroDotCanvas — the signature interactive surface behind the hero.
 *
 * A dot-matrix grid rendered on <canvas>. At rest the dots are faint and still.
 * Near the cursor they grow, glow toward the brand red, and are gently pushed
 * outward — a tactile "living panel" in the Nothing-OS language.
 *
 * Performance: the rAF loop runs ONLY while the pointer is active (and a short
 * decay after it leaves); it idles to a single static frame otherwise. Desktop
 * only (no hover on touch, protects mobile LCP). Honours prefers-reduced-motion
 * by drawing one static frame and never animating. pointer-events: none.
 */
import { useEffect, useRef } from "react";

const GAP = 28; // grid spacing (px)
const BASE_R = 1.15; // dot radius at rest
const INFLUENCE = 175; // cursor influence radius
const MAX_SCALE = 3.6; // peak dot growth near cursor
const MAX_PUSH = 9; // peak outward displacement
const DECAY_MS = 1500; // keep animating this long after the last move

export default function HeroDotCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas && canvas.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let dots = [];
    let raf = null;
    let lastMove = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const isDark = () => document.documentElement.classList.contains("dark");

    function build() {
      const r = parent.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      const offX = (w - (cols - 1) * GAP) / 2;
      const offY = (h - (rows - 1) * GAP) / 2;
      dots = [];
      for (let yi = 0; yi < rows; yi++) {
        for (let xi = 0; xi < cols; xi++) {
          dots.push({ x: offX + xi * GAP, y: offY + yi * GAP });
        }
      }
    }

    function draw() {
      raf = null;
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();
      const baseAlpha = dark ? 0.12 : 0.1;
      const bR = dark ? 255 : 0;
      const bG = dark ? 255 : 0;
      const bB = dark ? 255 : 0;

      const active = mouse.active;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let scale = 1;
        let glow = 0;
        let ox = 0;
        let oy = 0;
        let alpha = baseAlpha;

        if (active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < INFLUENCE) {
            const f = 1 - dist / INFLUENCE; // 0..1
            const e = f * f; // centred ramp (size + push)
            const c = Math.sqrt(f); // wide ramp (colour + alpha) so dots
            // read as a red glow, not dark specks
            scale = 1 + e * (MAX_SCALE - 1);
            glow = c;
            const nd = dist || 1;
            const push = e * MAX_PUSH;
            ox = (dx / nd) * push;
            oy = (dy / nd) * push;
            alpha = baseAlpha + c * (1 - baseAlpha);
          }
        }

        // lerp base colour -> brand red (#FF3C3C)
        const r = Math.round(bR + (255 - bR) * glow);
        const g = Math.round(bG + (60 - bG) * glow);
        const b = Math.round(bB + (60 - bB) * glow);

        ctx.beginPath();
        ctx.arc(d.x + ox, d.y + oy, BASE_R * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      if (active && performance.now() - lastMove < DECAY_MS) {
        raf = requestAnimationFrame(draw);
      } else {
        mouse.active = false;
        // one settled rest frame is already drawn
      }
    }

    function kick() {
      if (raf == null && !reduced) raf = requestAnimationFrame(draw);
    }

    function onMove(e) {
      const r = parent.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
      lastMove = performance.now();
      kick();
    }
    function onLeave() {
      lastMove = performance.now() - DECAY_MS; // let it settle on the next frame
      kick();
    }

    build();
    draw(); // initial rest frame

    if (!reduced) {
      parent.addEventListener("pointermove", onMove, { passive: true });
      parent.addEventListener("pointerleave", onLeave);
    }

    let resizeRaf = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        build();
        draw();
      });
    };
    window.addEventListener("resize", onResize);

    // redraw the rest frame when the theme flips so colours stay in sync
    const themeObs = new MutationObserver(() => {
      if (raf == null) draw();
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      themeObs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hidden md:block absolute inset-0 z-0 pointer-events-none"
    />
  );
}
