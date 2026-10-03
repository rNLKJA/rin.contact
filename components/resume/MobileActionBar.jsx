/**
 * Phone-sized action bar: Save as PDF and Email stay one tap away while reading.
 * Static (no entrance or scroll show/hide), hidden from lg up and in print.
 */
export default function MobileActionBar({ t, onPrint, mailto }) {
  return (
    <div className="lg:hidden print:hidden fixed inset-x-0 bottom-0 z-40 border-t border-[#E0E0E0] dark:border-[#262626] bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-2">
      <button
        type="button"
        onClick={onPrint}
        className="flex-1 border border-[#CC0000] bg-[#CC0000] px-4 py-2.5 text-[11px] tracking-widest uppercase text-white hover:bg-[#A30000] transition-colors duration-200"
      >
        {t("resumePage.actions.savePdf")}
      </button>
      <a
        href={mailto}
        className="flex-1 text-center border border-[#1A1A1A] dark:border-[#EEEEEE] px-4 py-2.5 text-[11px] tracking-widest uppercase text-black dark:text-white hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-[#EEEEEE] dark:hover:text-black transition-colors duration-200"
      >
        {t("resumePage.actions.email")}
      </a>
    </div>
  );
}
