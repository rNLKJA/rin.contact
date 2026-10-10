/**
 * EvidenceField — the hero's right-hand illustration.
 *
 * About seven hundred dots spell the name in the site's dot-matrix display font,
 * then regroup into a trend line (evidence), then into clustered sites with the
 * riskiest few lit red (decision), and loop. Dots shy away from the cursor and a
 * click skips to the next stage. The points are generated, not real data, and the
 * caption says so.
 *
 * Reduced motion holds the name frame and only changes stage on click, without
 * the tween. Drawing pauses when the hero is off-screen or the tab is hidden.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const RED = "#FF3C3C";
const HOLD = 2.4; // seconds each stage rests
const MOVE = 1.5; // seconds for a regroup, including the stagger
const STAGGER = 0.4; // share of MOVE spent staggering dots left to right
const REPEL = 70; // cursor radius in CSS px
const STAGE_KEYS = ["identity", "evidence", "decision"];
const LABELS = {
  en: ["Identity", "Evidence", "Decision"],
  zh: ["身份", "证据", "决策"],
};
const CAPTION = {
  en: "Illustration: from one name, to the evidence, to a decision.",
  zh: "示意图：从一个名字，到证据，再到决策。",
};

/** Deterministic PRNG so the layout is the same on every visit. */
function prng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function gauss(rand) {
  const u = Math.max(rand(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Sample the name into points, using the same display font as the h1. */
function sampleName(w, h, family) {
  const off = document.createElement("canvas");
  off.width = Math.ceil(w);
  off.height = Math.ceil(h);
  const g = off.getContext("2d");
  const text = "RIN HUANG";
  let size = Math.min(h * 0.34, 120);
  g.font = `700 ${size}px ${family}`;
  const fit = (w * 0.9) / g.measureText(text).width;
  if (fit < 1) size *= fit;
  g.font = `700 ${size}px ${family}`;
  g.fillStyle = "#fff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(text, w / 2, h / 2);
  const data = g.getImageData(0, 0, off.width, off.height).data;
  const step = Math.max(3, Math.round(size / 18));
  const pts = [];
  for (let y = 0; y < off.height; y += step) {
    for (let x = 0; x < off.width; x += step) {
      if (data[(y * off.width + x) * 4 + 3] > 140) pts.push([x, y]);
    }
  }
  // Keep the count in a range that animates smoothly on modest laptops.
  const max = 760;
  if (pts.length > max) {
    const stride = pts.length / max;
    return Array.from({ length: max }, (_, i) => pts[Math.floor(i * stride)]);
  }
  return pts;
}

/** Build the three target layouts for n points inside a w×h box. */
function layouts(namePts, w, h) {
  const n = namePts.length;
  const rand = prng(1500);
  const pad = Math.max(16, w * 0.06);

  // Evidence: a rising series with a seasonal wiggle; most dots sit on the
  // line, the rest are scattered observations around it.
  const evidence = new Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const base = h * 0.8 - t * h * 0.52 - Math.sin(t * 15) * h * 0.035;
    const onLine = rand() < 0.72;
    const spread = onLine ? h * 0.012 : h * 0.11;
    evidence[i] = [pad + t * (w - 2 * pad), base + gauss(rand) * spread];
  }

  // Decision: five clusters of sites; roughly one in twelve is flagged.
  const centres = [
    [0.22, 0.38],
    [0.46, 0.66],
    [0.7, 0.34],
    [0.82, 0.72],
    [0.36, 0.2],
  ];
  const decision = new Array(n);
  const risk = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const c = centres[i % centres.length];
    const r = Math.min(w, h) * (0.07 + (i % 3) * 0.018);
    decision[i] = [c[0] * w + gauss(rand) * r * 1.3, c[1] * h + gauss(rand) * r];
    risk[i] = rand() < 0.085 ? 1 : 0;
  }

  // Stagger dots left to right in every regroup.
  const delay = new Float32Array(n);
  for (let i = 0; i < n; i++) delay[i] = (namePts[i][0] / w) * STAGGER;

  return { stages: [namePts, evidence, decision], risk, delay };
}

export default function EvidenceField() {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const skipRef = useRef(() => {});
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let model = null;
    let ox = null; // cursor offsets, eased per dot
    let oy = null;
    let cur = 0; // stage index being shown / left
    let t0 = performance.now();
    let moving = false;
    let raf = null;
    let visible = true;
    let mx = -9999;
    let my = -9999;
    let cancelled = false;

    const family =
      getComputedStyle(document.querySelector(".hero-name") || document.body).fontFamily ||
      "monospace";

    const build = () => {
      const r = wrap.getBoundingClientRect();
      w = r.width;
      h = r.height;
      if (w < 10 || h < 10) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pts = sampleName(w, h, family);
      if (pts.length < 20) return;
      model = layouts(pts, w, h);
      ox = new Float32Array(pts.length);
      oy = new Float32Array(pts.length);
    };

    const draw = (now) => {
      raf = null;
      if (!model || cancelled) return;
      const dark = document.documentElement.classList.contains("dark");
      const ink = dark ? "rgba(237,237,237,0.9)" : "rgba(26,26,26,0.82)";
      const faint = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
      const { stages, risk, delay } = model;
      const n = stages[0].length;

      const T = (now - t0) / 1000;
      let k = 0; // regroup progress 0..1
      if (!reduce) {
        if (T > HOLD) k = Math.min(1, (T - HOLD) / MOVE);
        moving = T > HOLD && k < 1;
        if (T > HOLD + MOVE) {
          cur = (cur + 1) % 3;
          t0 = now;
          k = 0;
          moving = false;
          setStage(cur);
        }
      }
      const from = stages[cur];
      const to = stages[(cur + 1) % 3];
      const nextIsDecision = (cur + 1) % 3 === 2;

      ctx.clearRect(0, 0, w, h);

      // Faint axes while the evidence stage is on screen.
      const axisAlpha = cur === 1 ? 1 - easeInOut(k) : (cur + 1) % 3 === 1 ? easeInOut(k) : 0;
      if (axisAlpha > 0.01) {
        ctx.globalAlpha = axisAlpha;
        ctx.strokeStyle = faint;
        ctx.lineWidth = 1;
        const pad = Math.max(16, w * 0.06);
        ctx.beginPath();
        ctx.moveTo(pad, h * 0.12);
        ctx.lineTo(pad, h * 0.88);
        ctx.lineTo(w - pad, h * 0.88);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < n; i++) {
        const local = Math.min(1, Math.max(0, (k * (1 + STAGGER) - delay[i]) / 1));
        const e = easeInOut(local);
        let x = from[i][0] + (to[i][0] - from[i][0]) * e;
        let y = from[i][1] + (to[i][1] - from[i][1]) * e;

        // Cursor repulsion with easing so dots drift rather than jump.
        const dx = x - mx;
        const dy = y - my;
        const d = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (d < REPEL && d > 0.01) {
          const push = ((REPEL - d) / REPEL) * 18;
          tx = (dx / d) * push;
          ty = (dy / d) * push;
        }
        ox[i] += (tx - ox[i]) * 0.18;
        oy[i] += (ty - oy[i]) * 0.18;
        x += ox[i];
        y += oy[i];

        const lit = risk[i] && ((cur === 2 && local < 0.5) || (nextIsDecision && local > 0.5));
        ctx.fillStyle = lit ? RED : ink;
        ctx.beginPath();
        ctx.arc(x, y, lit ? 2.6 : 1.55, 0, Math.PI * 2);
        ctx.fill();
        if (lit && cur === 2 && k === 0) {
          const pulse = 4 + ((now / 900 + i) % 1) * 7;
          ctx.strokeStyle = "rgba(255,60,60,0.35)";
          ctx.beginPath();
          ctx.arc(x, y, pulse, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (visible && !document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };

    const kick = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw);
    };

    skipRef.current = () => {
      if (!model) return;
      if (reduce) {
        cur = (cur + 1) % 3;
        setStage(cur);
        t0 = performance.now();
        draw(t0);
        return;
      }
      // Jump straight into the next regroup.
      if (!moving) t0 = performance.now() - HOLD * 1000;
      kick();
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (reduce) return;
      kick();
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(performance.now());
      else kick();
    });
    const onVis = () => {
      if (!document.hidden) {
        t0 = performance.now();
        kick();
      }
    };

    const start = async () => {
      try {
        await document.fonts.ready;
      } catch {
        /* sample with whatever font is ready */
      }
      if (cancelled) return;
      build();
      if (reduce) draw(performance.now());
      else kick();
      io.observe(wrap);
      ro.observe(wrap);
    };
    start();

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const onClick = useCallback((e) => {
    // Don't let the hero's dot-burst handler fire for this click.
    e.stopPropagation();
    skipRef.current();
  }, []);

  return (
    <figure className="m-0 select-none" data-guide="hero-evidence">
      <div
        ref={wrapRef}
        onClick={onClick}
        className="relative w-full aspect-[16/11] md:aspect-[5/4] cursor-pointer"
        title={lang === "zh" ? "点击进入下一阶段" : "Click for the next stage"}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label={
            lang === "zh"
              ? "动画示意：圆点拼出我的名字，再变成一条趋势线，最后变成按风险排序、少数标红的站点。"
              : "Animation: dots spell my name, regroup into a trend line, then into clusters of sites with the riskiest few in red."
          }
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono text-[11px] tracking-widest uppercase">
        <ol className="flex gap-4 m-0 p-0 list-none" aria-label={lang === "zh" ? "阶段" : "Stages"}>
          {LABELS[lang].map((label, i) => (
            <li
              key={STAGE_KEYS[i]}
              aria-current={stage === i ? "step" : undefined}
              className={
                stage === i
                  ? "text-[#B71C1C] dark:text-[#FF3C3C]"
                  : "text-[#6E6E6E] dark:text-[#9A9A9A]"
              }
            >
              {String(i + 1).padStart(2, "0")} {label}
            </li>
          ))}
        </ol>
        <span className="normal-case tracking-normal text-[#6E6E6E] dark:text-[#9A9A9A]">
          {CAPTION[lang]}
        </span>
      </figcaption>
    </figure>
  );
}
