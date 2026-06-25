import Link from "next/link";

/**
 * PageHero — the shared, elevated header for content sub-pages (about, career,
 * lab, projects). Brings each page into the homepage's editorial / HUD register:
 * a back link, a red square-dot eyebrow, an oversized Bitcount h1 (global h1
 * font), and a light description, over a faint dot-matrix depth panel, with a
 * staggered page-load reveal.
 *
 * Sub-page surfaces are theme-tracking (white / #0A0A0A), so text uses the normal
 * `text-black dark:text-white` pattern. Reveal uses `animate-fade-up` + delay
 * helpers; the global prefers-reduced-motion guard disables those animations, so
 * the content renders fully visible for reduced-motion users.
 */
export default function PageHero({
  label,
  heading,
  description,
  backLabel = "Home",
  backHref = "/",
}) {
  return (
    <header className="relative py-20 border-b border-[#F0F0F0] dark:border-[#1E1E1E] overflow-hidden">
      {/* depth — faint dot-matrix panel bleeding off the right edge */}
      <div
        aria-hidden="true"
        className="dot-matrix pointer-events-none absolute right-[-80px] top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.05] md:opacity-[0.08]"
      />

      <div className="relative">
        <Link
          href={backHref}
          className="animate-fade-up inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors mb-7"
        >
          <span aria-hidden="true">&larr;</span> {backLabel}
        </Link>

        <p className="animate-fade-up delay-100 flex items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-5">
          <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
          {label}
        </p>

        <h1 className="animate-fade-up delay-200 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-5 text-black dark:text-white">
          {heading}
        </h1>

        {description && (
          <p className="animate-fade-up delay-300 text-base md:text-lg font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
