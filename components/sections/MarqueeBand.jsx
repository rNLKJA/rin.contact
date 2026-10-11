/**
 * MarqueeBand → EmployerBand — a calm static strip listing institutions.
 *
 * Single-line layout at 1280px+, wraps gracefully on phones.
 * Static mono-case label followed by organisations separated by hairline (|).
 * No animation, no rounded corners, respects prefers-reduced-motion.
 * Mark with data-band="employers". Internationalised (EN + zh-Hans).
 */
import { useRouter } from "next/router";

const ORGS_EN = [
  "South Australia Police",
  "Attorney-General's Department",
  "University of Melbourne",
  "Mapiva",
  "CSIRO",
  "WEHI",
];

const ORGS_ZH = ["南澳警察局", "总检察署", "墨尔本大学", "Mapiva", "CSIRO", "WEHI"];

const COPY = {
  en: "Worked with",
  zh: "合作过",
};

export default function MarqueeBand() {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const label = COPY[lang];
  const orgs = lang === "zh" ? ORGS_ZH : ORGS_EN;

  return (
    <section
      data-band="employers"
      className="border-y border-[#EFEFEF] dark:border-[#1A1A1A] bg-white dark:bg-[#0A0A0A]"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-4 md:py-5">
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 md:gap-3 lg:gap-4 text-[12px] md:text-sm font-mono tracking-widest">
          <span className="font-medium text-black dark:text-white flex-shrink-0 uppercase">
            {label}
          </span>
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 md:gap-3 lg:gap-4 w-full lg:w-auto">
            {orgs.map((org, i) => (
              <div key={org} className="flex items-center gap-2 md:gap-3 lg:gap-4">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-[#D0D0D0] dark:text-[#3D3D3D] flex-shrink-0"
                  >
                    |
                  </span>
                )}
                <span className="text-[#6E6E6E] dark:text-[#9A9A9A] flex-shrink-0">{org}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
