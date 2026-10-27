/**
 * Homepage layout primitives: one container, one section header, one title row,
 * one label row and one button rule.
 *
 * Every homepage section sits in SHELL (1100px, px-6 md:px-12, so content runs
 * x=218 to 1222 at 1440) and opens with the same header: a black square, the
 * section index, the label, then a hairline rule that runs to an optional note
 * or link on the right. Editorial sections follow it with a TitleRow on a
 * 12-column grid: the h2 on the left half, the intro on the right half, so no
 * row is half empty. Two spacing tokens: BAND for instrument bands, EDITORIAL
 * for everything else.
 *
 * tone="dark" is for the always-dark Contact surface (no dark: variants there).
 *
 * Buttons: square, never filled. Primary is outlined black (white in dark mode)
 * with a full invert on hover; secondary is a grey hairline that darkens on
 * hover. BTN_PRIMARY_ON_DARK is the primary for the always-dark Contact band.
 *
 * Font roles on the homepage: Bitcount for the h1, numeric readouts and the
 * career title; Playfair for h2 / h3 / the statement / quotes / the Signal
 * subtitle; DM Sans for body, eyebrows, buttons and inputs; mono for the
 * greeting, indexes, captions, focus areas, the Worked with / Status strip and
 * the stack. Squares everywhere except dots. Red only for what is live or
 * current.
 */

export const SHELL = "max-w-[1100px] mx-auto px-6 md:px-12";
export const BAND = "py-10 md:py-14";
export const EDITORIAL = "py-16 md:py-20";

export const BTN =
  "inline-flex items-center justify-center gap-2 h-11 px-6 border rounded-none text-xs font-medium tracking-widest uppercase whitespace-nowrap transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
export const BTN_PRIMARY =
  "border-black text-black hover:bg-black hover:text-white focus-visible:outline-black dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:focus-visible:outline-white";
export const BTN_SECONDARY =
  "border-[#D0D0D0] text-[#3D3D3D] hover:border-black hover:text-black focus-visible:outline-black dark:border-[#5C5C5C] dark:text-[#B4B4B4] dark:hover:border-white dark:hover:text-white dark:focus-visible:outline-white";
export const BTN_PRIMARY_ON_DARK =
  "border-white text-white hover:bg-white hover:text-black focus-visible:outline-white disabled:border-[#3D3D3D] disabled:text-[#9A9A9A] disabled:hover:bg-transparent";

const TONES = {
  light: {
    mark: "bg-black dark:bg-white",
    index: "text-black dark:text-white",
    label: "text-[#5A5A5A] dark:text-[#9A9A9A]",
    rule: "bg-[#E0E0E0] dark:bg-[#3D3D3D]",
    aside: "text-[#5A5A5A] dark:text-[#9A9A9A]",
  },
  dark: {
    mark: "bg-white",
    index: "text-white",
    label: "text-[#9A9A9A]",
    rule: "bg-[#3D3D3D]",
    aside: "text-[#9A9A9A]",
  },
};

export function SectionHeader({ index, label, aside = null, tone = "light", className = "" }) {
  const c = TONES[tone] || TONES.light;
  return (
    <div className={`mb-8 md:mb-10 ${className}`}>
      <div className="flex items-center gap-3 md:gap-4">
        <p className="m-0 flex items-center gap-2.5 text-xs leading-none tracking-widest uppercase whitespace-nowrap">
          <span className={`block w-2 h-2 ${c.mark}`} aria-hidden="true" />
          {index && <span className={`tabular-nums font-medium ${c.index}`}>{index}</span>}
          {index && (
            <span className={c.label} aria-hidden="true">
              —
            </span>
          )}
          <span className={c.label}>{label}</span>
        </p>
        <span className={`flex-1 h-px ${c.rule}`} aria-hidden="true" />
        {aside && (
          <div className={`hidden md:block shrink-0 text-xs leading-none ${c.aside}`}>{aside}</div>
        )}
      </div>
      {aside && <div className={`md:hidden mt-3 text-xs leading-snug ${c.aside}`}>{aside}</div>}
    </div>
  );
}

/**
 * h2 on the left six columns, the intro on the right six, bottoms aligned.
 * `tone="dark"` for the Contact surface.
 */
export function TitleRow({ title, intro, tone = "light", id, className = "" }) {
  const titleInk = tone === "dark" ? "text-white" : "text-black dark:text-white";
  const introInk = tone === "dark" ? "text-[#B4B4B4]" : "text-[#3D3D3D] dark:text-[#B4B4B4]";
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 md:items-start mb-10 md:mb-14 ${className}`}
    >
      <h2
        id={id}
        className={`md:col-span-6 m-0 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] ${titleInk}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`md:col-start-7 md:col-span-6 max-w-xl m-0 md:pt-1.5 text-base md:text-[17px] font-light leading-relaxed ${introInk}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/**
 * A mono label in a fixed 148px column on desktop, then its content: the
 * anatomy of the hero's focus areas and the Worked with / Status strip, so
 * every label row starts on the same line. Give the label an id (labelId) so
 * the list beside it can point at it with aria-labelledby.
 */
export function LabelRow({ label, labelId, className = "", children }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-[148px_1fr] gap-x-6 gap-y-2 ${className}`}>
      <p
        id={labelId}
        className="m-0 font-mono text-[12px] leading-6 font-medium uppercase tracking-widest text-black dark:text-white"
      >
        {label}
      </p>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
