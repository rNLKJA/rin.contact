/**
 * Small shared pieces for the professional standards reporting demo: class
 * strings in the site's Nothing-style greys (red is kept for problems and
 * focus), native radio pills, a native select and a code block. Every control
 * is a native element, so keyboard and screen reader support come for free.
 * The only motion is a colour change, switched off for reduced motion.
 */

export const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
export const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
export const BTN = `inline-flex items-center justify-center min-h-[36px] rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-3.5 text-xs text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`;
export const BTN_SOLID = `inline-flex items-center justify-center gap-2 min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const PILL =
  "flex min-h-[36px] items-center gap-2 rounded-full border px-3 text-xs transition-colors duration-150 motion-reduce:transition-none border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE] peer-checked:border-[#1A1A1A] peer-checked:bg-[#1A1A1A] peer-checked:text-white dark:peer-checked:border-[#EEEEEE] dark:peer-checked:bg-[#EEEEEE] dark:peer-checked:text-black peer-disabled:opacity-40 peer-disabled:cursor-not-allowed peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#CC0000] dark:peer-focus-visible:outline-[#FF3C3C]";
export const FIELD = `w-full min-h-[40px] rounded-md border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A] px-3 text-sm text-[#1A1A1A] dark:text-[#EEEEEE] aria-[invalid=true]:border-[#CC0000] dark:aria-[invalid=true]:border-[#FF3C3C] ${FOCUS}`;

export function RadioPills({ legend, name, options, value, onChange, disabled = false }) {
  return (
    <fieldset className="min-w-0" disabled={disabled}>
      <legend className={`${META} mb-2`}>{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <label key={o.value} className={`relative ${disabled ? "" : "cursor-pointer"}`}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className={PILL}>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Select({ id, label, value, onChange, options }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={`${META} block mb-2`}>
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={FIELD}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** A wrapped code block: long lines break instead of scrolling sideways. */
export function Code({ label, children }) {
  return (
    <div className="min-w-0">
      {label && <p className={`${META} mb-1.5`}>{label}</p>}
      <pre className="rounded-md bg-[#F5F5F5] dark:bg-[#141414] border border-[#F0F0F0] dark:border-[#262626] px-3 py-2.5 font-mono text-xs leading-relaxed text-[#1A1A1A] dark:text-[#EEEEEE] whitespace-pre-wrap break-all">
        <code>{children}</code>
      </pre>
    </div>
  );
}
