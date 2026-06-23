/**
 * MarqueeBand — a two-row kinetic strip between the featured work and the
 * navigation grid. The top row scrolls Rin's domains in the dot-matrix display
 * font; a quieter second row counter-scrolls the institutions he has worked
 * across (real, from the career timeline) — institutional credibility a scanner
 * catches without leaving the homepage.
 *
 * Pure CSS motion (.animate-marquee / .animate-marquee-reverse, pause on hover,
 * disabled under prefers-reduced-motion via the global guard). Decorative →
 * aria-hidden (the same names are listed for assistive tech on /career).
 */
const DOMAINS = [
  "Data Science",
  "Strategic Intelligence",
  "Government Analytics",
  "Research Engineering",
  "Full-Stack",
  "Machine Learning",
  "Continuous Improvement",
];

const ORGS = [
  "CSIRO",
  "WEHI",
  "South Australia Police",
  "Attorney-General's Department",
  "University of Melbourne",
  "CSL",
  "Mapiva",
];

function DomainTrack() {
  return (
    <div className="flex items-center shrink-0">
      {DOMAINS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="font-display text-3xl md:text-5xl tracking-tight px-6 md:px-9 text-[#1A1A1A] dark:text-[#EDEDED]">
            {item}
          </span>
          <span className="text-[#FF3C3C] text-base md:text-xl select-none">&#9670;</span>
        </span>
      ))}
    </div>
  );
}

function OrgTrack() {
  return (
    <div className="flex items-center shrink-0">
      {ORGS.map((org) => (
        <span key={org} className="flex items-center">
          <span className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase px-5 md:px-7 text-[#7A7A7A] dark:text-[#9A9A9A]">
            {org}
          </span>
          <span className="text-[#FF3C3C] text-[7px] md:text-[9px] select-none">&#9632;</span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeBand() {
  return (
    <section
      aria-hidden="true"
      className="group relative overflow-hidden border-y border-[#EFEFEF] dark:border-[#1A1A1A] py-6 md:py-8 bg-white dark:bg-[#0A0A0A]"
    >
      {/* edge fades — span both rows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 z-10 bg-gradient-to-r from-white dark:from-[#0A0A0A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 z-10 bg-gradient-to-l from-white dark:from-[#0A0A0A] to-transparent" />

      {/* Row 1 — domains (scrolls left) */}
      <div className="flex whitespace-nowrap animate-marquee will-change-transform">
        <DomainTrack />
        <DomainTrack />
      </div>

      {/* Row 2 — institutions (counter-scrolls right) */}
      <div className="flex whitespace-nowrap animate-marquee-reverse will-change-transform mt-3 md:mt-4">
        <OrgTrack />
        <OrgTrack />
      </div>
    </section>
  );
}
