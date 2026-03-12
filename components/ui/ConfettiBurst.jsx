/**
 * ConfettiBurst — Nothing-style dot burst (uses dot-burst keyframe from globals.css)
 * Renders when trigger is truthy; fires once per trigger change.
 */
import { useEffect, useState, useRef } from "react";

const ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

export default function ConfettiBurst({
  trigger,
  x,
  y,
  size = "default",
  color = "#FF3C3C",
}) {
  const [burst, setBurst] = useState(null);
  const prevRef = useRef(null);

  useEffect(() => {
    if (!trigger || trigger === prevRef.current) return;
    prevRef.current = trigger;
    const cx = x ?? window.innerWidth / 2 + (Math.random() - 0.5) * 80;
    const cy = y ?? window.innerHeight / 2 + (Math.random() - 0.5) * 60;
    setBurst({ id: Date.now(), x: cx, y: cy });
    const t = setTimeout(() => setBurst(null), 1200);
    return () => clearTimeout(t);
  }, [trigger, x, y]);

  if (!burst) return null;

  const isBig = size === "big";
  const dotSize = isBig ? (i) => (i % 3 === 0 ? 6 : 5) : (i) => (i % 3 === 0 ? 4 : 3);
  const dist = isBig ? (i) => 28 + (i % 4) * 12 : (i) => 18 + (i % 4) * 8;
  const delay = isBig ? (i) => i * 10 : (i) => i * 12;

  return (
    <div
      key={burst.id}
      className="pointer-events-none fixed z-[9999]"
      style={{ left: burst.x, top: burst.y, transform: "translate(-50%,-50%)" }}
      aria-hidden="true"
    >
      {ANGLES.map((deg, i) => (
        <span
          key={deg}
          className="absolute block rounded-full"
          style={{
            backgroundColor: color,
            width: dotSize(i),
            height: dotSize(i),
            animation: "dot-burst 1s ease-out forwards",
            animationDelay: `${delay(i)}ms`,
            "--deg": `${deg}deg`,
            "--dist": `${dist(i)}px`,
          }}
        />
      ))}
    </div>
  );
}
