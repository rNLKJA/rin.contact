import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Notion-style animated knowledge graph.
 * Canvas-based particle network: nodes drift gently, edges appear when nodes
 * are close. Pauses when out of viewport. Respects prefers-reduced-motion.
 *
 * Props:
 *   nodeCount  — number of nodes  (default 40)
 *   maxDist    — edge draw distance in px (default 130)
 *   nodeAlpha  — node opacity 0–1 (default 0.18)
 *   edgeAlpha  — max edge opacity 0–1 (default 0.10)
 *   speed      — drift speed multiplier (default 1)
 *   color      — rgb string, e.g. "26,26,26" (default black)
 *   className  — extra Tailwind classes on the wrapper div
 */
export default function NotionGraph({
  nodeCount = 40,
  maxDist = 130,
  nodeAlpha = 0.18,
  edgeAlpha = 0.10,
  speed = 1,
  color = "26,26,26",
  className = "",
}) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);   // RAF handle
  const nodesRef  = useRef([]);
  const drawRef   = useRef(null);   // stable ref to the draw fn, used by inView effect

  const [inViewRef, inView] = useInView({ threshold: 0.05 });

  // Mirror latest inView into a ref so the setup effect can read it synchronously
  const inViewStateRef = useRef(inView);
  useEffect(() => { inViewStateRef.current = inView; }, [inView]);

  /* ── Canvas setup & draw function ──────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxDistSq = maxDist * maxDist; // pre-compute for O(n²) squared-distance check

    const initNodes = (w, h) => {
      nodesRef.current = Array.from({ length: nodeCount }, () => {
        const isMajor = Math.random() < 0.25;
        return {
          x:     Math.random() * w,
          y:     Math.random() * h,
          vx:    (Math.random() - 0.5) * 0.35 * speed,
          vy:    (Math.random() - 0.5) * 0.35 * speed,
          r:     isMajor ? Math.random() * 2.5 + 3 : Math.random() * 1.5 + 1.5,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.offsetWidth  || window.innerWidth;
      const h = parent?.offsetHeight || window.innerHeight;
      if (w === 0 || h === 0) { requestAnimationFrame(resize); return; }
      canvas.width  = w;
      canvas.height = h;
      initNodes(w, h);
    };

    requestAnimationFrame(resize);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;

      if (!reduced) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.012;
          if (n.x < 0) { n.x = 0; n.vx =  Math.abs(n.vx); }
          if (n.x > W) { n.x = W; n.vx = -Math.abs(n.vx); }
          if (n.y < 0) { n.y = 0; n.vy =  Math.abs(n.vy); }
          if (n.y > H) { n.y = H; n.vy = -Math.abs(n.vy); }
        }
      }

      /* ── Edges — squared-distance check avoids Math.sqrt on rejected pairs ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const dist  = Math.sqrt(distSq); // only computed for visible edges
            const t     = 1 - dist / maxDist;
            const alpha = t * t * edgeAlpha;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth   = t * 1.2;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* ── Nodes ── */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const r = reduced ? n.r : n.r * (1 + 0.1 * Math.sin(n.pulse));
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${nodeAlpha})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    // Expose draw so the inView effect can start/stop it
    drawRef.current = draw;

    // Start immediately if already in viewport (handles prop-change re-runs)
    if (inViewStateRef.current) {
      animRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
      drawRef.current = null;
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCount, maxDist, nodeAlpha, edgeAlpha, speed, color]);

  /* ── Pause / resume RAF when scrolled in / out of viewport ─────────── */
  useEffect(() => {
    if (inView) {
      // Only start if the loop isn't already running
      if (!animRef.current && drawRef.current) {
        animRef.current = requestAnimationFrame(drawRef.current);
      }
    } else {
      // Fully cancel — no more wakeups until back in view
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }, [inView]);

  return (
    <div
      ref={inViewRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
