/**
 * Shared class strings for the order system sandbox. Nothing-OS base: white or
 * near-black panels, hairline borders, greys for state, and red kept for focus,
 * problems and the small step numbers. Colour fades are the only motion, and
 * they switch off when the visitor prefers reduced motion.
 */

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";

export const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";

export const PANEL =
  "min-w-0 border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg p-4 bg-white dark:bg-[#0A0A0A]";

export const BTN = `inline-flex items-center justify-center min-h-[36px] rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-3.5 text-xs text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE] aria-disabled:opacity-40 aria-disabled:cursor-not-allowed aria-disabled:hover:border-[#E0E0E0] dark:aria-disabled:hover:border-[#3D3D3D] transition-colors duration-150 motion-reduce:transition-none ${FOCUS}`;

export const BTN_PRIMARY = `inline-flex items-center justify-center gap-2 min-h-[40px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] aria-disabled:opacity-40 aria-disabled:cursor-not-allowed aria-disabled:hover:bg-[#1A1A1A] dark:aria-disabled:hover:bg-[#EEEEEE] transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;

export const PILL = `flex min-h-[36px] items-center gap-2 rounded-full border px-3 text-xs transition-colors duration-150 motion-reduce:transition-none border-[#E0E0E0] text-[#3D3D3D] hover:border-[#1A1A1A] dark:border-[#3D3D3D] dark:text-[#CCCCCC] dark:hover:border-[#EEEEEE] peer-checked:border-[#1A1A1A] peer-checked:bg-[#1A1A1A] peer-checked:text-white dark:peer-checked:border-[#EEEEEE] dark:peer-checked:bg-[#EEEEEE] dark:peer-checked:text-black peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#CC0000] dark:peer-focus-visible:outline-[#FF3C3C]`;

export const INPUT =
  "w-full min-w-0 rounded-md border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A] px-3 py-2 text-base sm:text-sm text-[#1A1A1A] dark:text-[#EEEEEE] aria-[invalid=true]:border-[#CC0000] dark:aria-[invalid=true]:border-[#FF3C3C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";

export const NOTICE =
  "mt-3 min-h-[1rem] break-words text-xs leading-relaxed text-[#1A1A1A] dark:text-[#EEEEEE]";

export const ERROR = "break-words text-xs leading-relaxed text-[#CC0000] dark:text-[#FF6B6B]";
