/**
 * BootOverlay — Nothing-OS "dot-matrix power-on" for first load.
 *
 * Shows once per session. The Bitcount variable font's glyph-dots illuminate by
 * animating font weight (130 → 760) while a red scanline sweeps the wordmark and
 * a red thread fills the progress track. Monochrome + #FF3C3C, theme-aware.
 *
 * Performance: entry/exit use opacity + transform (compositor); the progress fill
 * uses transform: scaleX. The one weight/blur animation is a single small element,
 * one-shot, first-load only. Honours prefers-reduced-motion with a calm fallback.
 */
import { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/contexts/I18nContext";

const LS_KEY = "rin_boot_seen";

// Timeline (ms). ~1.85s of visible animation + a ~0.46s fade ≈ 2.3s total —
// longer and more deliberate than a flash, but safely under the ~2.5s point
// where an intro starts to read as "frozen". (UX research: 1.5–2.5s sweet spot.)
const STEP_AT = [0, 380, 780, 1220]; // status line reveal times
const DONE_AT = 1850;                // sequence settles → fade
const HIDE_AT = DONE_AT + 460;       // unmount

export default function BootOverlay() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);
  const [dark, setDark] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [step, setStep] = useState(0);

  const finish = useCallback(() => {
    setStep(STEP_AT.length - 1);
    setDone(true);
    setTimeout(() => setVisible(false), 460);
  }, []);

  // Lift the pre-paint cover (set by the inline script in _document) once the
  // animation finishes, so the page is revealed in sync with the boot fade-out.
  useEffect(() => {
    if (done && typeof document !== "undefined") {
      document.documentElement.classList.remove("boot-cover");
    }
  }, [done]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(LS_KEY)) return;
    sessionStorage.setItem(LS_KEY, "1");

    // The pre-paint cover (in _document) has a safety timer that lifts it if the
    // boot never loads. Now that the boot HAS mounted, cancel it so the cover
    // stays put until the animation finishes — even when hydration is slow.
    if (window.__bootCoverTimer) { clearTimeout(window.__bootCoverTimer); window.__bootCoverTimer = null; }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    // Read the theme from the same source of truth as ThemeProvider (localStorage),
    // not the <html> class, which ThemeProvider may not have applied yet on mount.
    let storedTheme = null;
    try { storedTheme = localStorage.getItem("rin_theme"); } catch { /* ignore */ }
    setDark(storedTheme === "dark");
    setVisible(true);

    const timers = [];
    if (prefersReduced) {
      // Same ~2.3s duration as the full motion path, just calm visuals (the
      // CSS reduced-motion rules drop the flicker / scanline / weight morph).
      setStep(STEP_AT.length - 1);
      timers.push(setTimeout(() => setDone(true), DONE_AT));
      timers.push(setTimeout(() => setVisible(false), HIDE_AT));
    } else {
      STEP_AT.forEach((delay, i) => {
        if (i === 0) return;
        timers.push(setTimeout(() => setStep(i), delay));
      });
      timers.push(setTimeout(() => setDone(true), DONE_AT));
      timers.push(setTimeout(() => setVisible(false), HIDE_AT));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  // Let the curious skip ahead — any key or click finishes the sequence.
  useEffect(() => {
    if (!visible || done) return;
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [visible, done, finish]);

  if (!visible) return null;

  const vars = {
    "--fg": dark ? "#EEEEEE" : "#1A1A1A",
    "--bg": dark ? "#0A0A0A" : "#FFFFFF",
    "--dim": dark ? "#4A4A4A" : "#C8C8C8",
    "--accent": "#FF3C3C",
    "--dot": dark ? "rgba(255,255,255,0.11)" : "rgba(0,0,0,0.07)",
  };

  return (
    <div
      onClick={finish}
      aria-hidden="true"
      className={`boot-root ${done ? "is-done" : ""} ${reduced ? "is-reduced" : ""}`}
      style={vars}
    >
      {/* Dot-matrix field */}
      <div className="boot-grid" />

      <div className="boot-stack">
        {/* System label */}
        <div className="boot-label">
          <span className="boot-led" />
          rin.contact
        </div>

        {/* Wordmark — the dots illuminate via variable-font weight */}
        <div className="boot-wordwrap">
          <span className="boot-word">
            rin<span className="boot-dot">.</span>
          </span>
          <span className="boot-scan" />
        </div>

        {/* Progress thread */}
        <div className="boot-track">
          <span className="boot-fill" />
        </div>

        {/* Status line */}
        <div className="boot-status">
          <span className="boot-status-text">{t(`bootOverlay.line${step + 1}`)}</span>
          <span className="boot-caret" />
        </div>
      </div>

      <style jsx>{`
        .boot-root {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          color: var(--fg);
          font-family: var(--font-dm-sans), system-ui, sans-serif;
          opacity: 1;
          transition: opacity 0.45s ease, transform 0.45s ease;
          will-change: opacity, transform;
        }
        .boot-root.is-done {
          opacity: 0;
          transform: scale(1.02);
          pointer-events: none;
        }

        .boot-grid {
          position: absolute;
          inset: -10%;
          background-image: radial-gradient(var(--dot) 1px, transparent 1.6px);
          background-size: 22px 22px;
          -webkit-mask-image: radial-gradient(circle at center, #000 0%, #000 38%, transparent 74%);
          mask-image: radial-gradient(circle at center, #000 0%, #000 38%, transparent 74%);
          opacity: 0;
          animation: boot-grid-in 0.6s ease-out 0.05s both;
        }
        .is-done .boot-grid {
          animation: boot-grid-out 0.45s ease-in both;
        }

        .boot-stack {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.4rem;
          padding: 0 1.5rem;
        }

        .boot-label {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--dim);
          opacity: 0;
          animation: boot-soft-in 0.5s ease-out 0.1s both;
        }
        .boot-led {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: var(--accent);
          box-shadow: 0 0 10px 1px var(--accent);
          animation: boot-led-pulse 1.1s ease-in-out infinite;
        }

        .boot-wordwrap {
          position: relative;
          overflow: hidden;
          padding: 0.1em 0.15em;
        }
        .boot-word {
          display: block;
          font-family: var(--font-bitcount), "Courier New", monospace;
          font-size: clamp(4.5rem, 18vw, 9rem);
          line-height: 0.9;
          letter-spacing: 0;
          color: var(--fg);
          font-variation-settings: "wght" 760;
          animation: boot-charge 1.05s cubic-bezier(0.22, 0.7, 0.2, 1) both;
        }
        .is-done .boot-word {
          animation: boot-word-flash 0.4s ease-out both;
        }
        .boot-dot {
          color: var(--accent);
        }

        /* Red scanline sweeping the wordmark once */
        .boot-scan {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 14%;
          background: linear-gradient(
            to bottom,
            transparent,
            color-mix(in srgb, var(--accent) 65%, transparent),
            transparent
          );
          mix-blend-mode: screen;
          transform: translateY(-120%);
          animation: boot-scan 1s ease-in-out 0.1s 1 both;
        }

        .boot-track {
          position: relative;
          width: 220px;
          max-width: 60vw;
          height: 2px;
          background: var(--dim);
          overflow: hidden;
          opacity: 0;
          animation: boot-soft-in 0.4s ease-out 0.15s both;
        }
        .boot-fill {
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform-origin: left center;
          transform: scaleX(0);
          animation: boot-fill ${DONE_AT}ms cubic-bezier(0.3, 0.6, 0.2, 1) both;
        }

        .boot-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-dm-sans), monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--dim);
          min-height: 14px;
        }
        .boot-status-text {
          animation: boot-soft-in 0.25s ease-out both;
        }
        .boot-caret {
          width: 7px;
          height: 12px;
          background: var(--accent);
          animation: boot-caret 0.7s steps(1) infinite;
        }

        @keyframes boot-charge {
          0% {
            opacity: 0;
            filter: blur(7px);
            letter-spacing: 0.18em;
            font-variation-settings: "wght" 130;
          }
          55% {
            opacity: 1;
            filter: blur(0);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            letter-spacing: 0;
            font-variation-settings: "wght" 760;
          }
        }
        @keyframes boot-word-flash {
          0% { color: var(--fg); }
          40% { color: var(--accent); }
          100% { color: var(--fg); opacity: 0.92; }
        }
        @keyframes boot-scan {
          0% { transform: translateY(-120%); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateY(840%); opacity: 0; }
        }
        @keyframes boot-fill {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes boot-grid-in {
          from { opacity: 0; transform: scale(1.04); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes boot-grid-out {
          from { opacity: 1; }
          to { opacity: 0; transform: scale(1.06); }
        }
        @keyframes boot-soft-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes boot-led-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes boot-caret {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }

        /* Calm fallback — no flicker, sweep, or weight morph */
        .boot-root.is-reduced .boot-word {
          animation: boot-soft-in 0.4s ease-out both;
          font-variation-settings: "wght" 700;
        }
        .is-reduced .boot-scan,
        .is-reduced .boot-led {
          animation: none;
        }
        .is-reduced .boot-fill {
          animation: boot-fill 0.5s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .boot-word { animation: boot-soft-in 0.4s ease-out both; font-variation-settings: "wght" 700; }
          .boot-scan, .boot-led { animation: none; }
          .boot-caret { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
