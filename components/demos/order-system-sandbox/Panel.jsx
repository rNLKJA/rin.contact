/**
 * One numbered step of the sandbox. The step number is a small pixel-font
 * figure (Bitcount), and screen readers hear "Step n" before the title.
 */
import { fill } from "@/lib/fill";
import { DEMO as D } from "@/lib/demos/order-system-sandbox-data";
import { PANEL } from "./ui";

export default function Panel({ n, id, title, lang, className = "", children }) {
  return (
    <section aria-labelledby={id} className={`${PANEL} ${className}`}>
      <h3
        id={id}
        className="mb-4 flex items-baseline gap-2.5 text-base font-semibold text-[#1A1A1A] dark:text-[#EEEEEE]"
      >
        <span
          aria-hidden="true"
          className="font-display text-2xl leading-none text-[#CC0000] dark:text-[#FF3C3C]"
        >
          {n}
        </span>
        <span className="sr-only">{fill(D.step[lang], { n })}: </span>
        {title}
      </h3>
      {children}
    </section>
  );
}
