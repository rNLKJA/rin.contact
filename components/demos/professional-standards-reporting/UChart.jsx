/**
 * UChart: the u-chart for the quarterly report demo, drawn as an inline SVG.
 * Square points (a quiet pixel touch), a solid centre line, stepped dashed
 * control limits and red only for quarters outside the limits. The reporting
 * quarter sits on a light band.
 *
 * The SVG is measured with a ResizeObserver and redrawn at its real width, so
 * labels stay legible at 390px instead of shrinking with a fixed viewBox. Until
 * it is measured it scales to fit, so it never overflows. It is one image with
 * a title and a description, and the table under the report lists every value.
 * Nothing in it moves.
 */
import { useEffect, useId, useRef, useState } from "react";

const PAD = { top: 14, right: 12, bottom: 40, left: 38 };

function niceStep(span) {
  const raw = span / 5;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * pow;
}

function useWidth(initial) {
  const ref = useRef(null);
  const [width, setWidth] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

export default function UChart({ rows, chart, reporting, title, desc, quarterLabel, yearLabel }) {
  const uid = useId();
  const [ref, width] = useWidth(640);
  const height = width < 480 ? 230 : 260;
  const plotW = width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  const n = rows.length;
  const band = plotW / n;

  const top = Math.max(...chart.points.map((p) => Math.max(p.u, p.ucl)), chart.centre * 1.5);
  const step = niceStep(top);
  const yMax = Math.ceil((top * 1.05) / step) * step;
  const ticks = Array.from({ length: Math.round(yMax / step) + 1 }, (_, i) => i * step);

  const x = (i) => PAD.left + (i + 0.5) * band;
  const y = (v) => PAD.top + plotH - (v / yMax) * plotH;

  // Stepped limit lines: flat across each quarter's band.
  const stepped = (key) =>
    chart.points
      .map((p, i) => {
        const x0 = PAD.left + i * band;
        const x1 = x0 + band;
        return `${i === 0 ? "M" : "L"}${x0.toFixed(1)},${y(p[key]).toFixed(1)} L${x1.toFixed(1)},${y(p[key]).toFixed(1)}`;
      })
      .join(" ");
  const line = chart.points
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.u).toFixed(1)}`)
    .join(" ");

  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const size = width < 480 ? 7 : 8;

  return (
    <div ref={ref} className="w-full">
      <svg
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="block w-full h-auto max-w-full"
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>{desc}</desc>

        {/* Reporting quarter band */}
        <rect
          x={PAD.left + reporting * band}
          y={PAD.top}
          width={band}
          height={plotH}
          className="fill-[#F5F5F5] dark:fill-[#161616]"
        />

        {/* Grid and y axis */}
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD.left}
              x2={width - PAD.right}
              y1={y(t)}
              y2={y(t)}
              className="stroke-[#EDEDED] dark:stroke-[#262626]"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 6}
              y={y(t)}
              dy="0.32em"
              textAnchor="end"
              className="fill-[#6E6E6E] dark:fill-[#9A9A9A] font-mono"
              fontSize="10"
            >
              {t.toFixed(step < 1 ? 1 : 0)}
            </text>
          </g>
        ))}

        {/* Control limits, centre line, data line */}
        <path
          d={stepped("ucl")}
          fill="none"
          strokeWidth="1.25"
          strokeDasharray="4 3"
          className="stroke-[#6E6E6E] dark:stroke-[#9A9A9A]"
        />
        <path
          d={stepped("lcl")}
          fill="none"
          strokeWidth="1.25"
          strokeDasharray="4 3"
          className="stroke-[#6E6E6E] dark:stroke-[#9A9A9A]"
        />
        <line
          x1={PAD.left}
          x2={width - PAD.right}
          y1={y(chart.centre)}
          y2={y(chart.centre)}
          strokeWidth="1.25"
          className="stroke-[#1A1A1A] dark:stroke-[#EEEEEE]"
        />
        <path
          d={line}
          fill="none"
          strokeWidth="1"
          className="stroke-[#BDBDBD] dark:stroke-[#595959]"
        />

        {/* Points: squares, red only outside the limits, hollow when worth watching */}
        {chart.points.map((p, i) => {
          const outside = p.status === "above" || p.status === "below";
          const watch = p.status === "watch";
          const cls = outside
            ? "fill-[#CC0000] stroke-[#CC0000] dark:fill-[#FF3C3C] dark:stroke-[#FF3C3C]"
            : watch
              ? "fill-white stroke-[#1A1A1A] dark:fill-[#0A0A0A] dark:stroke-[#EEEEEE]"
              : "fill-[#1A1A1A] stroke-[#1A1A1A] dark:fill-[#EEEEEE] dark:stroke-[#EEEEEE]";
          return (
            <g key={i}>
              {i === reporting && (
                <rect
                  x={x(i) - size}
                  y={y(p.u) - size}
                  width={size * 2}
                  height={size * 2}
                  fill="none"
                  strokeWidth="1.25"
                  className="stroke-[#1A1A1A] dark:stroke-[#EEEEEE]"
                />
              )}
              <rect
                x={x(i) - size / 2}
                y={y(p.u) - size / 2}
                width={size}
                height={size}
                strokeWidth="1.5"
                className={cls}
              />
            </g>
          );
        })}

        {/* x axis: quarter, then year under each block of four */}
        <line
          x1={PAD.left}
          x2={width - PAD.right}
          y1={PAD.top + plotH}
          y2={PAD.top + plotH}
          strokeWidth="1"
          className="stroke-[#BDBDBD] dark:stroke-[#595959]"
        />
        {rows.map((r, i) => (
          <text
            key={i}
            x={x(i)}
            y={PAD.top + plotH + 14}
            textAnchor="middle"
            fontSize="10"
            className={`font-mono ${
              i === reporting
                ? "fill-[#1A1A1A] dark:fill-[#EEEEEE] font-semibold"
                : "fill-[#6E6E6E] dark:fill-[#9A9A9A]"
            }`}
          >
            {quarterLabel(r)}
          </text>
        ))}
        {Array.from({ length: Math.ceil(n / 4) }, (_, k) => {
          const x0 = PAD.left + k * 4 * band;
          return (
            <g key={k}>
              {k > 0 && (
                <line
                  x1={x0}
                  x2={x0}
                  y1={PAD.top + plotH}
                  y2={PAD.top + plotH + 34}
                  strokeWidth="1"
                  className="stroke-[#E0E0E0] dark:stroke-[#3D3D3D]"
                />
              )}
              <text
                x={x0 + 2 * band}
                y={PAD.top + plotH + 31}
                textAnchor="middle"
                fontSize="10"
                className="fill-[#3D3D3D] dark:fill-[#AAAAAA] font-mono"
              >
                {yearLabel(k + 1)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** The legend under the chart, in HTML so it wraps on narrow screens. */
export function UChartLegend({ labels }) {
  const item = "flex items-center gap-2";
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#595959] dark:text-[#9A9A9A]">
      <li className={item}>
        <span aria-hidden="true" className="inline-block w-5 h-px bg-[#1A1A1A] dark:bg-[#EEEEEE]" />
        {labels.centre}
      </li>
      <li className={item}>
        <span
          aria-hidden="true"
          className="inline-block w-5 border-t border-dashed border-[#6E6E6E] dark:border-[#9A9A9A]"
        />
        {labels.limits}
      </li>
      <li className={item}>
        <span aria-hidden="true" className="inline-block w-2 h-2 bg-[#CC0000] dark:bg-[#FF3C3C]" />
        {labels.outside}
      </li>
      <li className={item}>
        <span
          aria-hidden="true"
          className="inline-block w-2 h-2 border-[1.5px] border-[#1A1A1A] dark:border-[#EEEEEE]"
        />
        {labels.watch}
      </li>
      <li className={item}>
        <span
          aria-hidden="true"
          className="inline-block w-3.5 h-3.5 border border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#F5F5F5] dark:bg-[#161616]"
        />
        {labels.reporting}
      </li>
    </ul>
  );
}
