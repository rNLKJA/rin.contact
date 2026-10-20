/**
 * Shared controls for the concept-note widgets added in batch 3 (synthetic
 * data, autoencoders vs PCA, Marr's levels, map colouring, functional
 * dependencies). Native inputs and buttons only, so everything works from the
 * keyboard, with the site's focus ring. Transitions switch off under
 * prefers-reduced-motion.
 */

export const LABEL =
  "font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A]";

export const BTN =
  "inline-flex items-center justify-center min-h-[36px] px-3 border border-[#E0E0E0] dark:border-[#3D3D3D] font-mono text-[10px] tracking-widest uppercase text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-black dark:hover:border-white disabled:opacity-40 disabled:hover:border-[#E0E0E0] dark:disabled:hover:border-[#3D3D3D] transition-colors duration-150 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";

export const RANGE =
  "w-full accent-[#FF3C3C] disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";

export const SEED = "font-mono text-[11px] text-[#6B6B6B] dark:text-[#9A9A9A] tabular-nums";

export const SUMMARY =
  "text-[13px] leading-relaxed text-[#3D3D3D] dark:text-[#CFCFCF] [text-wrap:pretty]";

export const CHECK =
  "flex items-center gap-2 min-h-[36px] text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF] cursor-pointer";

/** A labelled range input with its value shown beside the label. */
export function Slider({ id, label, value, display, min, max, step, onChange, disabled }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <label htmlFor={id} className="text-[12px] text-[#3D3D3D] dark:text-[#CFCFCF]">
          {label}
        </label>
        <output
          htmlFor={id}
          className="font-mono text-[12px] tabular-nums text-black dark:text-white"
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className={RANGE}
      />
    </div>
  );
}
