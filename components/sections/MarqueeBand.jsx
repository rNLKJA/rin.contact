/**
 * MarqueeBand → EmployerBand — a calm static strip listing institutions.
 *
 * Replaced the animated two-row marquee with a simple, static mono-case label
 * followed by six organisations separated by ■. Hairline borders, wraps on phone,
 * font <= 14px, no animation. Mark with data-band="employers".
 *
 * Text is internationalised (EN + zh-Hans).
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
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[12px] md:text-sm font-mono tracking-widest">
          <span className="font-medium text-black dark:text-white flex-shrink-0 uppercase">
            {label}
          </span>
          {orgs.map((org, i) => (
            <span
              key={org}
              className="flex items-center gap-2 md:gap-3 text-[#6E6E6E] dark:text-[#9A9A9A]"
            >
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="text-[#B71C1C] dark:text-[#FF3C3C] flex-shrink-0"
                >
                  ■
                </span>
              )}
              <span className="text-black dark:text-white">{org}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
