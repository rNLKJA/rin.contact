/**
 * FibonacciFlower — Sunflower-style spiral (golden angle 137.5°)
 * Dots arranged at angle = n × 137.5°, radius ∝ √n
 */
const GOLDEN_ANGLE = (2 * Math.PI) / (1 + Math.sqrt(5) / 2); // ~137.5° in rad
const N = 34; // fibonacci-ish count

function getPoint(i) {
  const r = 4 + Math.sqrt(i) * 6;
  const a = i * GOLDEN_ANGLE;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
}

export default function FibonacciFlower({ size = 80, className = "", animate = true }) {
  const points = Array.from({ length: N }, (_, i) => getPoint(i));

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i < 3 ? 2.5 : 1.5}
          fill="currentColor"
          className={animate ? "fib-dot" : ""}
          style={animate ? { animationDelay: `${(i * 35) % 1000}ms` } : {}}
        />
      ))}
      <style jsx>{`
        .fib-dot {
          opacity: 0.5;
          animation: fib-pulse 1.4s ease-in-out infinite;
        }
        .fib-dot:nth-child(1),
        .fib-dot:nth-child(2),
        .fib-dot:nth-child(3) {
          opacity: 0.9;
        }
        @keyframes fib-pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </svg>
  );
}
