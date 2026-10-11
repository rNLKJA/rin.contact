/**
 * MarqueeBand → EmployerBand — a calm static strip listing institutions.
 *
 * Plain flowing text: a mono-case label, then the organisations separated by a
 * light slash. Each name stays whole and lines wrap between names at any width.
 * No animation, no rounded corners, respects prefers-reduced-motion.
 * Mark with data-band="employers". Internationalised (EN + zh-Hans).
 */
import { Fragment } from "react";
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
        {/* Plain flowing text: each name stays whole (nowrap) with its separator,
            and lines wrap naturally between names at any width. */}
        <p className="font-mono text-[12px] md:text-[13px] tracking-normal leading-loose">
          <span className="font-medium text-black dark:text-white uppercase tracking-widest mr-4">
            {label}
          </span>
          {orgs.map((org, i) => (
            <Fragment key={org}>
              <span className="whitespace-nowrap text-[#6E6E6E] dark:text-[#9A9A9A]">
                {org}
                {i < orgs.length - 1 && (
                  <span aria-hidden="true" className="ml-2.5 text-[#D0D0D0] dark:text-[#3D3D3D]">
                    /
                  </span>
                )}
              </span>{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}
