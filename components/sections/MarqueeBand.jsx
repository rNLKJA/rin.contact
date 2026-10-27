/**
 * MarqueeBand → EmployerBand — a calm static strip: who Rin has worked with,
 * and what is live right now.
 *
 * Two rows with one anatomy: a mono label, then items separated by a light
 * slash. Each item stays whole and lines wrap between items at any width. The
 * labels share a fixed column on desktop so both rows start on the same line.
 * No animation, no box, no rounded corners. Mark with data-band="employers".
 * Internationalised (EN + zh-Hans).
 */
import { Fragment } from "react";
import { useRouter } from "next/router";
import StatusBadge from "@/components/ui/StatusBadge";
import { SHELL } from "@/components/home/SectionHeader";

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
  en: { worked: "Worked with", status: "Status" },
  zh: { worked: "合作过", status: "当前状态" },
};

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[148px_1fr] gap-x-6 gap-y-1">
      <p className="m-0 font-mono text-[11px] md:text-[12px] leading-6 font-medium uppercase tracking-widest text-black dark:text-white">
        {label}
      </p>
      <p className="m-0 font-mono text-[12px] md:text-[13px] leading-6 text-[#5C5C5C] dark:text-[#9A9A9A]">
        {children}
      </p>
    </div>
  );
}

export default function MarqueeBand() {
  const { locale = "en-AU" } = useRouter();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const copy = COPY[lang];
  const orgs = lang === "zh" ? ORGS_ZH : ORGS_EN;

  return (
    <section
      data-band="employers"
      aria-label={copy.worked}
      className="border-b border-[#E0E0E0] dark:border-[#3D3D3D]"
    >
      <div className={`${SHELL} py-6 md:py-7 flex flex-col gap-3`}>
        <Row label={copy.worked}>
          {orgs.map((org, i) => (
            <Fragment key={org}>
              <span className="whitespace-nowrap">
                {org}
                {i < orgs.length - 1 && (
                  <span aria-hidden="true" className="mx-2.5 text-[#C8C8C8] dark:text-[#3D3D3D]">
                    /
                  </span>
                )}
              </span>{" "}
            </Fragment>
          ))}
        </Row>
        <Row label={copy.status}>
          <StatusBadge />
        </Row>
      </div>
    </section>
  );
}
