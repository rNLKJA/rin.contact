/**
 * TileMap: the 24 synthetic areas as equal squares on a stylised grid, shaded
 * in five greys. It is one radio group with a roving focus: the arrow keys move
 * to the nearest area in that direction, Home and End jump to the first and
 * last, and the focused area is the selected one. Red outlines and a ▲ mark
 * areas well above the trend line, and a dashed border marks areas left out of
 * it, so no state relies on colour alone. The only motion is a colour fade that
 * is switched off when the visitor prefers reduced motion.
 */
import { useRef } from "react";
import { GRID_COLS, neighbour } from "./model";

// Greys only, so red stays for flags and focus. Index 0 is lightest.
const SHADE = {
  "-1": "bg-transparent text-[#3D3D3D] dark:text-[#AAAAAA]",
  0: "bg-[#F5F5F5] text-[#1A1A1A] dark:bg-[#141414] dark:text-[#EEEEEE]",
  1: "bg-[#D6D6D6] text-[#1A1A1A] dark:bg-[#3D3D3D] dark:text-[#EEEEEE]",
  2: "bg-[#A3A3A3] text-[#1A1A1A] dark:bg-[#6E6E6E] dark:text-white",
  3: "bg-[#5C5C5C] text-white dark:bg-[#A3A3A3] dark:text-black",
  4: "bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black",
};

export const SHADE_STEPS = [0, 1, 2, 3, 4].map((k) => SHADE[k]);

export default function TileMap({ rows, shades, active, onSelect, labelFor, label, describedBy }) {
  const refs = useRef([]);

  const onKey = (e, i) => {
    let to;
    if (e.key === "Home") to = 0;
    else if (e.key === "End") to = rows.length - 1;
    else if (e.key.startsWith("Arrow")) to = neighbour(i, e.key);
    if (to === undefined) return;
    e.preventDefault();
    onSelect(to);
    refs.current[to]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-describedby={describedBy}
      className="grid gap-1.5 sm:gap-2 max-w-[360px]"
      style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
    >
      {rows.map((r, i) => (
        <button
          key={r.code}
          type="button"
          role="radio"
          aria-checked={i === active}
          tabIndex={i === active ? 0 : -1}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-label={labelFor(i)}
          onClick={() => onSelect(i)}
          onKeyDown={(e) => onKey(e, i)}
          style={{ gridColumn: r.col + 1, gridRow: r.row + 1 }}
          className={`relative aspect-square w-full rounded-[4px] border font-mono text-[10px] sm:text-xs leading-none flex flex-col items-center justify-center gap-0.5 select-none transition-colors duration-150 motion-reduce:transition-none ${
            SHADE[shades[i]] || SHADE["-1"]
          } ${
            r.included
              ? "border-solid border-[#BDBDBD] dark:border-[#595959]"
              : "border-dashed border-[#6E6E6E] dark:border-[#9A9A9A]"
          } ${r.above ? "ring-2 ring-[#CC0000] dark:ring-[#FF3C3C]" : ""} ${
            i === active
              ? "outline outline-2 outline-offset-[3px] outline-[#1A1A1A] dark:outline-[#EEEEEE] focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]"
              : "focus-visible:outline-none"
          }`}
        >
          <span aria-hidden="true">{r.code}</span>
          {r.above && (
            <span aria-hidden="true" className="text-[8px] leading-none">
              ▲
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
