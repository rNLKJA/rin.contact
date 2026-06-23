/**
 * SectionNavCards — the homepage "Explore" section, reimagined as a risograph
 * constellation (RNL-94).
 *
 * Two presentations from one set of links:
 *  - Constellation (≥1024px, fine pointer, motion OK): a halftone dot field that
 *    develops on load and reacts to the cursor like a brush; six destinations
 *    float as points on a self-drawing path that a wandering red dot travels;
 *    a single margin panel reads out the active destination (hover, or whichever
 *    point the dot is resting on). A ghost dot-matrix numeral sits behind it.
 *  - Vertical log (everything else — phones, tablets, touch, reduced-motion, the
 *    keyboard/screen-reader path): the constellation collapsed onto one red rail,
 *    each card developing in on scroll.
 *
 * Print identity: warm paper / darkroom-dark, grain, off-register red ink, crop
 * marks + registration swatch. Arrows are drawn SVG (never unicode ↗) so Safari
 * can't swap them for an emoji.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useInView } from "@/hooks/useInView";

const HREFS = ["/blog", "/career", "/projects", "/lab", "/about", "/resume"];

// Constellation point positions, as fractions of the field. `r` = label sits to
// the left of its marker (right-edge points), so text never runs off-canvas.
const POS = [
  { fx: 0.17, fy: 0.24 },
  { fx: 0.50, fy: 0.17 },
  { fx: 0.83, fy: 0.27, r: true },
  { fx: 0.81, fy: 0.56, r: true },
  { fx: 0.46, fy: 0.62 },
  { fx: 0.15, fy: 0.52 },
];

const SEQ = [0, 1, 2, 3, 4, 5, 0];
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.06'/></svg>\")";

function palette(isDark) {
  return isDark
    ? {
        paper: "#121212",
        ink: "226,222,214",
        red: "255,92,92",
        redHex: "#FF5C5C",
        muted: "#8A867C",
        title: "#F2EFE9",
        desc: "#B8B3A8",
        line: "226,222,214",
        ghostInk: "rgba(226,222,214,0.05)",
        ghostRed: "rgba(255,92,92,0.05)",
        chipBorder: "rgba(226,222,214,0.22)",
        chipText: "#A9A49A",
      }
    : {
        paper: "#F4F1EA",
        ink: "26,26,26",
        red: "255,60,60",
        redHex: "#FF3C3C",
        muted: "#6B665C",
        title: "#1A1A1A",
        desc: "#403C34",
        line: "26,26,26",
        ghostInk: "rgba(26,26,26,0.06)",
        ghostRed: "rgba(255,60,60,0.05)",
        chipBorder: "rgba(26,26,26,0.25)",
        chipText: "#5C574E",
      };
}

/* Drawn up-right arrow — strokes only, so Safari never renders it as an emoji. */
function Arrow({ size = 16, color }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" style={{ flex: "none" }}>
      <line x1="5" y1="19" x2="18" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <polyline points="9,6 18,6 18,15" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CropMarks({ color }) {
  const base = { position: "absolute", width: 12, height: 12, pointerEvents: "none" };
  const c = `1px solid ${color}`;
  return (
    <>
      <span aria-hidden="true" style={{ ...base, top: 10, left: 10, borderTop: c, borderLeft: c }} />
      <span aria-hidden="true" style={{ ...base, top: 10, right: 10, borderTop: c, borderRight: c }} />
      <span aria-hidden="true" style={{ ...base, bottom: 10, left: 10, borderBottom: c, borderLeft: c }} />
      <span aria-hidden="true" style={{ ...base, bottom: 10, right: 10, borderBottom: c, borderRight: c }} />
    </>
  );
}

function Swatch({ pal }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-6 flex items-center gap-1.5">
      <span className="font-mono text-[9px] tracking-widest" style={{ color: pal.muted }}>RISO</span>
      <span style={{ width: 7, height: 7, background: pal.redHex }} />
      <span style={{ width: 7, height: 7, background: `rgb(${pal.ink})` }} />
    </span>
  );
}

/* ───────────────────────── Constellation (desktop) ───────────────────────── */

function Constellation({ cards, pal, isDark }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1e4, y: -1e4 });
  const hoverRef = useRef(-1);
  const lastSetRef = useRef(-1);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    if (!wrap || !cv) return;
    const ctx = cv.getContext("2d");
    let raf, W, H, dpr, dots = [], t0 = null, last = 0, trail = [];
    let running = true;

    function build() {
      dpr = window.devicePixelRatio || 1;
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const sp = 20;
      for (let y = sp / 2; y < H; y += sp)
        for (let x = sp / 2; x < W; x += sp) dots.push({ x, y, delay: Math.random() * 850 });
    }
    build();

    const pts = () => POS.map((p) => ({ x: p.fx * W, y: p.fy * H }));

    function frame(ts) {
      if (!running) return;
      if (t0 === null) { t0 = ts; last = ts; }
      const el = ts - t0;
      const dt = Math.min(50, ts - last);
      last = ts;
      ctx.clearRect(0, 0, W, H);

      const P = pts();
      const seg = [];
      let per = 0;
      for (let k = 1; k < SEQ.length; k++) {
        const a = P[SEQ[k - 1]], b = P[SEQ[k]];
        const L = Math.hypot(b.x - a.x, b.y - a.y);
        seg.push({ a, b, L, s: per });
        per += L;
      }

      // self-drawing dotted path
      const dprog = Math.max(0, Math.min(1, (el - 200) / 1600));
      const drawLen = per * dprog;
      ctx.strokeStyle = `rgba(${pal.line},0.16)`;
      ctx.lineWidth = 0.6;
      ctx.setLineDash([1, 5]);
      ctx.beginPath();
      for (let k = 0; k < seg.length; k++) {
        const s = seg[k];
        if (s.s > drawLen) break;
        const fr = Math.min(1, (drawLen - s.s) / s.L);
        ctx.moveTo(s.a.x, s.a.y);
        ctx.lineTo(s.a.x + (s.b.x - s.a.x) * fr, s.a.y + (s.b.y - s.a.y) * fr);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // halftone dot field — develops in, blooms red near the cursor (the brush)
      const BR = 130;
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dev = Math.max(0, Math.min(1, (el - d.delay) / 1300));
        if (dev <= 0) continue;
        const ease = 1 - Math.pow(1 - dev, 3);
        const dist = Math.hypot(mx - d.x, my - d.y);
        const inf = Math.max(0, 1 - dist / BR);
        const r = (0.8 + inf * 2.7) * ease;
        const off = 1.3 + inf * 4;
        const ia = (0.13 + inf * 0.45) * ease;
        const ra = (0.07 + inf * 0.46) * ease;
        ctx.fillStyle = `rgba(${pal.red},${ra})`;
        ctx.beginPath();
        ctx.arc(d.x + off, d.y + off * 0.8, r, 0, 6.2832);
        ctx.fill();
        ctx.fillStyle = `rgba(${pal.ink},${ia})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, 6.2832);
        ctx.fill();
      }

      // wandering red dot + fading trail
      const trav = (el * 0.05) % per;
      let cur = seg[seg.length - 1];
      for (let k = 0; k < seg.length; k++)
        if (trav >= seg[k].s && trav < seg[k].s + seg[k].L) { cur = seg[k]; break; }
      const f = (trav - cur.s) / cur.L;
      const wx = cur.a.x + (cur.b.x - cur.a.x) * f;
      const wy = cur.a.y + (cur.b.y - cur.a.y) * f;
      if (dprog >= 1) { trail.push([wx, wy]); if (trail.length > 22) trail.shift(); }
      for (let i = 0; i < trail.length; i++) {
        const aN = i / trail.length;
        ctx.fillStyle = `rgba(${pal.red},${aN * 0.25})`;
        ctx.beginPath();
        ctx.arc(trail[i][0], trail[i][1], aN * 3.2, 0, 6.2832);
        ctx.fill();
      }
      ctx.fillStyle = `rgba(${pal.red},0.14)`;
      ctx.beginPath();
      ctx.arc(wx, wy, 11, 0, 6.2832);
      ctx.fill();
      ctx.fillStyle = pal.redHex;
      ctx.save();
      ctx.translate(wx, wy);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-3.5, -3.5, 7, 7);
      ctx.restore();

      // panel/ghost follow the wandering dot unless a point is hovered
      let want = hoverRef.current;
      if (want < 0) {
        let best = 0, bd = 1e9;
        for (let j = 0; j < P.length; j++) {
          const q = Math.hypot(P[j].x - wx, P[j].y - wy);
          if (q < bd) { bd = q; best = j; }
        }
        want = best;
      }
      if (want !== lastSetRef.current) { lastSetRef.current = want; setActive(want); }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", build);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, [isDark]); // eslint-disable-line react-hooks/exhaustive-deps

  const onMove = useCallback((e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);
  const onLeaveField = useCallback(() => {
    mouseRef.current = { x: -1e4, y: -1e4 };
  }, []);

  const ac = cards[active] || cards[0];

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeaveField}
      className="relative w-full h-[600px] overflow-hidden rounded-xl"
      style={{ background: pal.paper, border: `1px solid rgba(${pal.ink},0.10)` }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-50 rounded-xl" style={{ backgroundImage: GRAIN }} aria-hidden="true" />
      <CropMarks color={`rgba(${pal.ink},0.4)`} />
      <Swatch pal={pal} />

      {/* ghost dot-matrix numeral behind the active point */}
      <div key={`g${active}`} className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 select-none" aria-hidden="true" style={{ animation: "rinoFade .5s ease both" }}>
        <span className="font-display leading-none" style={{ fontSize: 200, color: pal.ghostInk, position: "relative" }}>
          {ac.num}
          <span className="font-display absolute left-[3px] top-[2px] leading-none" style={{ fontSize: 200, color: pal.ghostRed }}>{ac.num}</span>
        </span>
      </div>

      {/* destination points — real links */}
      {cards.map((card, i) => {
        const p = POS[i];
        const on = active === i;
        return (
          <Link
            key={card.title}
            href={HREFS[i]}
            aria-label={`${card.title} — ${card.desc}`}
            onMouseEnter={() => { hoverRef.current = i; lastSetRef.current = i; setActive(i); }}
            onMouseLeave={() => { hoverRef.current = -1; }}
            onFocus={() => { hoverRef.current = i; lastSetRef.current = i; setActive(i); }}
            onBlur={() => { hoverRef.current = -1; }}
            className="group absolute z-10 flex items-center gap-2.5 rounded-md p-2 -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:ring-2"
            style={{ left: `${p.fx * 100}%`, top: `${p.fy * 100}%`, flexDirection: p.r ? "row-reverse" : "row", textAlign: p.r ? "right" : "left" }}
          >
            <span
              aria-hidden="true"
              className="rounded-full transition-all duration-200"
              style={{
                width: on ? 12 : 9,
                height: on ? 12 : 9,
                background: on ? pal.redHex : `rgb(${pal.ink})`,
                boxShadow: on ? `0 0 0 5px rgba(${pal.red},0.14)` : "none",
                flex: "none",
              }}
            />
            <span>
              <span className="block font-mono text-[10px] tracking-widest" style={{ color: pal.muted }}>{card.num}</span>
              <span className="flex items-center gap-1.5 font-editorial text-[19px] font-medium" style={{ color: pal.title, flexDirection: p.r ? "row-reverse" : "row" }}>
                {card.title}
                <span className="transition-opacity duration-200" style={{ opacity: on ? 1 : 0 }}>
                  <Arrow size={16} color={pal.redHex} />
                </span>
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-widest" style={{ color: pal.redHex, opacity: 0.85 }}>{card.stat}</span>
            </span>
          </Link>
        );
      })}

      {/* margin reading panel */}
      <div className="absolute bottom-[7%] left-[4%] z-10 w-[52%] max-w-[440px] pl-4" style={{ borderLeft: `2px solid ${pal.redHex}` }}>
        <div key={active} style={{ animation: "rinoFade .4s ease both" }}>
          <div className="mb-1 font-mono text-[10px] tracking-[0.2em]" style={{ color: pal.redHex }}>{ac.num} · {String(ac.stat).toUpperCase()}</div>
          <div className="mb-1.5 font-editorial text-[22px] font-medium" style={{ color: pal.title }}>{ac.title}</div>
          <p className="mb-2.5 text-[13px] leading-relaxed font-light" style={{ color: pal.desc }}>{ac.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {ac.tags.map((tg) => (
              <span key={tg} className="font-mono text-[10px] tracking-wide" style={{ color: pal.chipText, border: `1px solid ${pal.chipBorder}`, padding: "3px 8px", borderRadius: 3 }}>{tg}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Vertical log (mobile / fallback) ─────────────────── */

function LogCard({ card, index, href, pal, reduced }) {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const show = reduced || inView;
  return (
    <Link
      ref={ref}
      href={href}
      aria-label={`${card.title} — ${card.desc}`}
      className="group relative flex outline-none focus-visible:ring-2 rounded-md"
    >
      {/* rail gutter — dotted line + node, stacks into one continuous rail */}
      <span aria-hidden="true" className="relative flex-none" style={{ width: 38 }}>
        <span className="absolute top-0 bottom-0" style={{ left: 18, borderLeft: `1px dotted rgba(${pal.line},0.35)` }} />
        <span
          className="absolute transition-all duration-300"
          style={{
            left: show ? 12 : 13,
            top: 8,
            width: show ? 12 : 10,
            height: show ? 12 : 10,
            transform: "rotate(45deg)",
            background: show ? pal.redHex : `rgb(${pal.ink})`,
            boxShadow: show ? `0 0 0 5px rgba(${pal.red},0.14)` : "none",
          }}
        />
      </span>

      <span
        className="relative block min-w-0 flex-1 pb-7 pl-1.5 pr-1"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "none" : "translateY(14px)",
          transition: reduced ? "none" : "opacity .6s ease, transform .6s ease",
          transitionDelay: reduced ? "0ms" : `${index * 80}ms`,
        }}
      >
        <span aria-hidden="true" className="font-display pointer-events-none absolute right-0 -top-3 leading-none select-none" style={{ fontSize: 78, color: pal.ghostInk }}>{card.num}</span>
        <span className="relative block font-mono text-[10px] tracking-[0.15em]" style={{ color: pal.redHex }}>{card.num} · {String(card.stat).toUpperCase()}</span>
        <span className="relative my-1 flex items-center gap-1.5 font-editorial text-[23px] font-medium" style={{ color: pal.title }}>
          {card.title}
          <Arrow size={16} color={pal.redHex} />
        </span>
        <span className="relative mb-2.5 block text-[13px] leading-relaxed font-light" style={{ color: pal.desc }}>{card.desc}</span>
        <span className="relative flex flex-wrap gap-1.5">
          {card.tags.map((tg) => (
            <span key={tg} className="font-mono text-[10px] tracking-wide" style={{ color: pal.chipText, border: `1px solid ${pal.chipBorder}`, padding: "3px 7px", borderRadius: 3 }}>{tg}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}

function VerticalLog({ cards, pal, reduced }) {
  return (
    <div className="relative overflow-hidden rounded-xl px-5 pt-6 pb-3" style={{ background: pal.paper, border: `1px solid rgba(${pal.ink},0.10)` }}>
      <div className="pointer-events-none absolute inset-0 opacity-50 rounded-xl" style={{ backgroundImage: GRAIN }} aria-hidden="true" />
      <CropMarks color={`rgba(${pal.ink},0.4)`} />
      <div className="relative">
        {cards.map((card, i) => (
          <LogCard key={card.title} card={card} index={i} href={HREFS[i]} pal={pal} reduced={reduced} />
        ))}
      </div>
      <div className="relative mt-1 flex items-center justify-between border-t pt-3" style={{ borderColor: `rgba(${pal.ink},0.18)` }}>
        <span className="font-mono text-[10px] tracking-widest" style={{ color: pal.muted }}>◆ rin.contact</span>
        <span aria-hidden="true" className="flex gap-1">
          <span style={{ width: 8, height: 8, background: pal.redHex }} />
          <span style={{ width: 8, height: 8, background: `rgb(${pal.ink})` }} />
        </span>
      </div>
    </div>
  );
}

/* ───────────────────────────────── Section ────────────────────────────────── */

export default function SectionNavCards() {
  const { t } = useI18n();
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const pal = palette(isDark);
  const [ref, inView] = useInView({ threshold: 0.12 });

  // 'log' on the server and everywhere touch/reduced-motion; upgrade to the
  // constellation only on large screens with a fine pointer and motion allowed.
  const [mode, setMode] = useState("log");
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const big = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(rm.matches);
      setMode(big.matches && !rm.matches ? "constellation" : "log");
    };
    update();
    big.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      big.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  const raw = t("sectionNav.cards");
  const cards = Array.isArray(raw) ? raw : [];
  if (!cards.length) return null;

  return (
    <section className="py-20" aria-label={t("sectionNav.label")} ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: "@keyframes rinoFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}" }} />

      <div className={`mb-12 transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-4 font-mono">{t("sectionNav.label")}</p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white">{t("sectionNav.heading")}</h2>
        <p className="text-base font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-xl leading-relaxed mt-3">{t("sectionNav.intro")}</p>
      </div>

      {mode === "constellation" ? (
        <Constellation cards={cards} pal={pal} isDark={isDark} />
      ) : (
        <VerticalLog cards={cards} pal={pal} reduced={reduced} />
      )}
    </section>
  );
}
