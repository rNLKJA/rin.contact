/**
 * A numbered resume section: hairline rule, then a mono micro-label with the
 * red square, number and title. Shared by /resume and /cv so the two read as
 * one document family. The h2 overrides the global Playfair heading font.
 */
export default function ResumeSection({ id, n, title, children, className = "" }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={`scroll-mt-24 py-8 border-t border-[#F0F0F0] dark:border-[#1E1E1E] ${className}`}
    >
      <h2
        id={`${id}-h`}
        className="cv-accent flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] uppercase text-[#CC0000] dark:text-[#FF3C3C] mb-5 break-after-avoid"
      >
        <span className="block w-1.5 h-1.5 bg-current print-keep-bg" aria-hidden="true" />
        {n && <span className="cv-accent tabular-nums">{n}</span>}
        <span className="cv-accent">{title}</span>
      </h2>
      {children}
    </section>
  );
}
