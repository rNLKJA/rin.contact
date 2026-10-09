/**
 * The activity log under the four steps, newest first. It is a plain list, not
 * a live region: each panel already announces its own result, so the log does
 * not repeat it to screen readers.
 */
import { DEMO as D } from "@/lib/demos/order-system-sandbox-data";
import { describe } from "./rules";
import { META, PANEL } from "./ui";

export default function ActivityLog({ log, lang, uid }) {
  const L = (o) => o[lang];
  const T = D.log;

  return (
    <section aria-labelledby={`${uid}-log`} className={PANEL}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
        <h3 id={`${uid}-log`} className={`${META} font-mono`}>
          {L(T.title)}
        </h3>
        <p className="text-xs text-[#595959] dark:text-[#9A9A9A]">{L(T.hint)}</p>
      </div>
      {log.length === 0 ? (
        <p className="text-sm text-[#595959] dark:text-[#9A9A9A]">{L(T.empty)}</p>
      ) : (
        <ol className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A] border-y border-[#F0F0F0] dark:border-[#2A2A2A]">
          {log.map((ev, i) => (
            <li key={ev.id} className="flex items-start gap-3 py-2 text-sm leading-relaxed">
              <span
                aria-hidden="true"
                className={`mt-[0.55em] h-1.5 w-1.5 shrink-0 ${
                  i === 0 ? "bg-[#CC0000] dark:bg-[#FF3C3C]" : "bg-[#BDBDBD] dark:bg-[#595959]"
                }`}
              />
              <span className="min-w-0 break-words text-[#1A1A1A] dark:text-[#EEEEEE]">
                {describe(ev, lang)}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
