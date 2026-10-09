/**
 * TrendScatter: each synthetic area's rate per 10,000 adults against its IRSD
 * score, as small square marks, with the straight trend line from the fit. The
 * selected area gets a frame and its code, and areas well above the line are
 * red with their code. Areas left out of the fit are hollow and dashed. The
 * chart is one labelled image with a text description, because the same
 * numbers are in the panel, the stats and the table next to it. No animation.
 */
import { useId } from "react";
import { niceTicks } from "./model";

const W = 320;
const H = 200;
const PAD = { l: 34, r: 10, t: 14, b: 22 };

export default function TrendScatter({ rows, fit, active, title, desc, formatY }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const clipId = `${uid}-clip`;

  const xs = rows.map((r) => r.irsd);
  const x = niceTicks(Math.min(...xs) - 5, Math.max(...xs) + 5, 5);
  const y = niceTicks(0, Math.max(...rows.map((r) => r.rate), 0.1), 4);
  const sx = (v) => PAD.l + ((v - x.lo) / (x.hi - x.lo)) * (W - PAD.l - PAD.r);
  const sy = (v) => H - PAD.b - ((v - y.lo) / (y.hi - y.lo)) * (H - PAD.t - PAD.b);
  const plot = { x: PAD.l, y: PAD.t, w: W - PAD.l - PAD.r, h: H - PAD.t - PAD.b };
  const sel = rows[active];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className="block w-full h-auto text-[#1A1A1A] dark:text-[#EEEEEE]"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      <defs>
        <clipPath id={clipId}>
          <rect x={plot.x} y={plot.y} width={plot.w} height={plot.h} />
        </clipPath>
      </defs>

      {/* Grid and y ticks */}
      {y.ticks.map((t) => (
        <g key={`y${t}`}>
          <line
            x1={plot.x}
            x2={plot.x + plot.w}
            y1={sy(t)}
            y2={sy(t)}
            className="stroke-[#F0F0F0] dark:stroke-[#262626]"
            strokeWidth="1"
          />
          <text
            x={plot.x - 5}
            y={sy(t) + 3}
            textAnchor="end"
            fontSize="9"
            className="font-mono fill-[#6E6E6E] dark:fill-[#9A9A9A]"
          >
            {formatY(t)}
          </text>
        </g>
      ))}

      {/* x ticks */}
      {x.ticks.map((t) => (
        <text
          key={`x${t}`}
          x={sx(t)}
          y={H - PAD.b + 13}
          textAnchor="middle"
          fontSize="9"
          className="font-mono fill-[#6E6E6E] dark:fill-[#9A9A9A]"
        >
          {t}
        </text>
      ))}
      <line
        x1={plot.x}
        x2={plot.x + plot.w}
        y1={plot.y + plot.h}
        y2={plot.y + plot.h}
        className="stroke-[#BDBDBD] dark:stroke-[#595959]"
        strokeWidth="1"
      />

      {/* Trend line */}
      {fit && (
        <line
          x1={sx(x.lo)}
          x2={sx(x.hi)}
          y1={sy(fit.intercept + fit.slope * x.lo)}
          y2={sy(fit.intercept + fit.slope * x.hi)}
          clipPath={`url(#${clipId})`}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      )}

      {/* Areas */}
      {rows.map((r) => {
        const cx = sx(r.irsd);
        const cy = sy(r.rate);
        if (!r.included) {
          return (
            <rect
              key={r.code}
              x={cx - 3}
              y={cy - 3}
              width="6"
              height="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 1"
              opacity="0.7"
            />
          );
        }
        return (
          <rect
            key={r.code}
            x={cx - 3}
            y={cy - 3}
            width="6"
            height="6"
            className={r.above ? "fill-[#CC0000] dark:fill-[#FF3C3C]" : ""}
            fill={r.above ? undefined : "currentColor"}
            opacity={r.above ? 1 : 0.75}
          />
        );
      })}

      {/* Codes for flagged areas and the selected one */}
      {rows.map((r, i) =>
        r.above || i === active ? (
          <text
            key={`l${r.code}`}
            x={sx(r.irsd) > W - 40 ? sx(r.irsd) - 7 : sx(r.irsd) + 7}
            y={sy(r.rate) - 6}
            textAnchor={sx(r.irsd) > W - 40 ? "end" : "start"}
            fontSize="9"
            className={`font-mono ${
              r.above ? "fill-[#CC0000] dark:fill-[#FF6B6B]" : "fill-[#1A1A1A] dark:fill-[#EEEEEE]"
            }`}
          >
            {r.code}
          </text>
        ) : null
      )}
      {sel && (
        <rect
          x={sx(sel.irsd) - 6}
          y={sy(sel.rate) - 6}
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      )}
    </svg>
  );
}
