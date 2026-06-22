/**
 * MarqueeBand — a kinetic strip of Rin's domains in the dot-matrix display font,
 * scrolling horizontally with red diamond separators. A motion breather between
 * the featured work and the navigation grid.
 *
 * Pure CSS motion (.animate-marquee, pauses on hover, disabled under
 * prefers-reduced-motion via globals). Decorative → aria-hidden.
 */
const ITEMS = [
  "Data Science",
  "Strategic Intelligence",
  "Government Analytics",
  "Research Engineering",
  "Full-Stack",
  "Machine Learning",
  "Continuous Improvement",
];

function Track() {
  return (
    <div className="flex items-center shrink-0">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="font-display text-3xl md:text-5xl tracking-tight px-6 md:px-9 text-[#1A1A1A] dark:text-[#EDEDED]">
            {item}
          </span>
          <span className="text-[#FF3C3C] text-base md:text-xl select-none">◆</span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeBand() {
  return (
    <section
      aria-hidden="true"
      className="group relative overflow-hidden border-y border-[#EFEFEF] dark:border-[#1A1A1A] py-7 md:py-9 bg-white dark:bg-[#0A0A0A]"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 z-10 bg-gradient-to-r from-white dark:from-[#0A0A0A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 z-10 bg-gradient-to-l from-white dark:from-[#0A0A0A] to-transparent" />

      <div className="flex whitespace-nowrap animate-marquee will-change-transform">
        <Track />
        <Track />
      </div>
    </section>
  );
}
