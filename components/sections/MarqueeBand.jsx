/**
 * MarqueeBand → EmployerBand — a calm static strip: who Rin has worked with,
 * and what is live right now.
 *
 * Two rows with one anatomy (LabelRow): a mono label in a fixed column, then a
 * SlashList whose "/" separators never start or end a line. Each item stays
 * whole and lines wrap between items at any width. No animation, no box, no
 * rounded corners. Mark with data-band="employers". Internationalised
 * (EN + zh-Hans).
 */
import { useRouter } from "next/router";
import StatusBadge from "@/components/ui/StatusBadge";
import SlashList from "@/components/home/SlashList";
import { SHELL, LabelRow } from "@/components/home/SectionHeader";

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

const LIST = "font-mono text-[12px] md:text-[13px] leading-6 text-[#5C5C5C] dark:text-[#9A9A9A]";

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
        <LabelRow label={copy.worked} labelId="band-worked-label">
          <SlashList items={orgs} labelledBy="band-worked-label" className={LIST} />
        </LabelRow>
        <LabelRow label={copy.status} labelId="band-status-label">
          <StatusBadge labelledBy="band-status-label" className={LIST} />
        </LabelRow>
      </div>
    </section>
  );
}
