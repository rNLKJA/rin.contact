/**
 * Homepage layout primitives: one container, one section header, one title row.
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
 * Font roles on the homepage: Bitcount for the h1 and numeric readouts only;
 * Playfair for h2 / h3 / the statement / quotes; DM Sans for body, eyebrows,
 * buttons and inputs; mono for data micro-labels (indexes, captions, the
 * Worked with / Status strip). Squares everywhere except dots and the status
 * pill. Red only for what is live or current.
 */

export const SHELL = "max-w-[1100px] mx-auto px-6 md:px-12";
export const BAND = "py-10 md:py-14";
export const EDITORIAL = "py-16 md:py-20";

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
