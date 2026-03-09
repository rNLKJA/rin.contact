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
  const animRef   = useRef(null);
  const nodesRef  = useRef([]);
  const [inViewRef, inView] = useInView({ threshold: 0.05 });

  /* ── Initialise nodes once ─────────────────────────────────────────── */
  const initNodes = (w, h) => {
    nodesRef.current = Array.from({ length: nodeCount }, () => {
      const isMajor = Math.random() < 0.25; // ~25% are "hub" nodes (larger)
      return {
        x:  Math.random() * w,
        y:  Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35 * speed,
        vy: (Math.random() - 0.5) * 0.35 * speed,
        r:  isMajor ? Math.random() * 2.5 + 3 : Math.random() * 1.5 + 1.5,
        pulse: Math.random() * Math.PI * 2, // phase offset for breathing
      };
    });
  };

  /* ── Keep inView fresh inside animation closure via ref ───────────── */
  const inViewRef2 = useRef(inView);
  useEffect(() => { inViewRef2.current = inView; }, [inView]);

  /* ── Canvas setup & animation loop ────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      // Use offsetParent size; fall back to window if not yet laid out
      const parent = canvas.parentElement;
      const w = parent?.offsetWidth  || window.innerWidth;
      const h = parent?.offsetHeight || window.innerHeight;
      if (w === 0 || h === 0) {
        // Parent not visible yet — try again next frame
        requestAnimationFrame(resize);
        return;
      }
      canvas.width  = w;
      canvas.height = h;
      initNodes(w, h);
    };

    // Delay one frame so the layout is committed
    requestAnimationFrame(resize);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    let tick = 0;

    const draw = () => {
      if (!inViewRef2.current) { animRef.current = requestAnimationFrame(draw); return; }

      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      tick++;

      const nodes = nodesRef.current;

      if (!reduced) {
        nodes.forEach((n) => {
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.012;
          // Bounce off walls with a little damping
          if (n.x < 0)  { n.x = 0;  n.vx =  Math.abs(n.vx); }
          if (n.x > W)  { n.x = W;  n.vx = -Math.abs(n.vx); }
          if (n.y < 0)  { n.y = 0;  n.vy =  Math.abs(n.vy); }
          if (n.y > H)  { n.y = H;  n.vy = -Math.abs(n.vy); }
        });
      }

      /* ── Edges ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const t = 1 - dist / maxDist;         // 0 → 1 as nodes approach
            const alpha = t * t * edgeAlpha;      // quadratic fade
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth = t * 1.2;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* ── Nodes ── */
      nodes.forEach((n) => {
        // Subtle breathing: ±10% radius
        const r = reduced ? n.r : n.r * (1 + 0.1 * Math.sin(n.pulse));
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${nodeAlpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCount, maxDist, nodeAlpha, edgeAlpha, speed, color]);

  /* ── Pause / resume when scrolled out of view ─────────────────────── */
  // (handled inside draw loop via inView check)

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
