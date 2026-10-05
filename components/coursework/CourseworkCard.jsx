import { useState } from "react";
import { fill, joinNames } from "@/components/coursework/fill";

const K = "courseworkPage.card";
const LABEL = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
// Highlights shown before "Show more" (the same pattern as /resume role entries).
const SHOWN = 2;

function Highlight({ text }) {
  return (
    <li className="flex gap-2 text-[14px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
      <span className="text-[#CC0000] dark:text-[#FF3C3C] flex-shrink-0" aria-hidden="true">
        ·
      </span>
      <span>{text}</span>
    </li>
  );
}

/**
 * One revived coursework project: subject, date at its recorded precision,
 * status, summary, role and team credits, original vs revived stack,
 * highlights, skills and links. GitHub appears only when the data layer passed
 * a repoUrl, which it does for public repositories alone.
 */
export default function CourseworkCard({ project: p, termLabel, t }) {
  const [open, setOpen] = useState(false);
  const shown = p.highlights.slice(0, SHOWN);
  const more = p.highlights.slice(SHOWN);
  const moreId = `${p.slug}-more`;
  const headingId = `${p.slug}-h`;
  const highlightsId = `${p.slug}-highlights`;
  const team = p.team.length
    ? joinNames(p.team, {
        separator: t(`${K}.listSeparator`),
        conjunction: t(`${K}.listConjunction`),
      })
    : t(`${K}.individual`);

  return (
    <article
      id={p.slug}
      tabIndex={-1}
      aria-labelledby={headingId}
      className="scroll-mt-24 rounded-lg border border-[#EBEBEB] dark:border-[#262626] bg-white dark:bg-[#0A0A0A] p-5 md:p-6 target:border-[#CC0000] dark:target:border-[#FF3C3C] target:animate-enter"
    >
      {/* Subject, date and status */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[11px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]">
          <span className="font-mono text-[#CC0000] dark:text-[#FF3C3C]">{p.subjectCode}</span>
          <span className="sr-only"> </span>
          <span>{p.subject}</span>
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] tracking-widest uppercase tabular-nums text-[#5C5C5C] dark:text-[#9A9A9A]">
          <p>
            <span className="sr-only">{t(`${K}.date`)}: </span>
            <time dateTime={p.dateTime}>{p.dateLabel ?? termLabel}</time>
          </p>
          <p className="inline-flex items-center gap-1.5 border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-[10px] leading-normal text-[#3D3D3D] dark:text-[#CCCCCC]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#CC0000] dark:bg-[#FF3C3C]"
              aria-hidden="true"
            />
            {t("courseworkPage.status.live")}
            {p.status === "live-upgrade-pending" && (
              <span className="normal-case tracking-normal text-[#5C5C5C] dark:text-[#9A9A9A]">
                · {t("courseworkPage.status.upgradePending")}
              </span>
            )}
          </p>
        </div>
      </div>

      <h5
        id={headingId}
        className="font-editorial mt-3 text-xl md:text-2xl font-semibold tracking-tight leading-snug text-black dark:text-white"
      >
        {p.title}
      </h5>
      <p className="mt-2 text-[15px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA] max-w-[68ch]">
        {p.summary}
      </p>

      {/* Role, team and stacks */}
      <dl className="mt-5 grid grid-cols-1 sm:grid-cols-[112px_minmax(0,1fr)] gap-x-4 text-[13px] leading-relaxed">
        <dt className={`${LABEL} sm:pt-1`}>{t(`${K}.myRole`)}</dt>
        <dd className="mb-3 text-[#1A1A1A] dark:text-[#DDDDDD]">{p.myRole}</dd>
        <dt className={`${LABEL} sm:pt-1`}>{t(`${K}.team`)}</dt>
        <dd className="mb-3 text-[#1A1A1A] dark:text-[#DDDDDD]">{team}</dd>
        <dt className={`${LABEL} sm:pt-1`}>{t(`${K}.original`)}</dt>
        <dd className="mb-3 text-[#5C5C5C] dark:text-[#9A9A9A]">{p.originalStack.join(" · ")}</dd>
        <dt className={`${LABEL} sm:pt-1`}>{t(`${K}.revival`)}</dt>
        <dd className="text-[#5C5C5C] dark:text-[#9A9A9A]">{p.revivedStack.join(" · ")}</dd>
      </dl>

      {/* Highlights */}
      <p id={highlightsId} className={`mt-5 mb-2 font-mono ${LABEL}`}>
        {t(`${K}.highlights`)}
      </p>
      <ul aria-labelledby={highlightsId} className="space-y-1.5 max-w-[72ch]">
        {shown.map((h) => (
          <Highlight key={h} text={h} />
        ))}
      </ul>
      {more.length > 0 && (
        <>
          <ul
            id={moreId}
            hidden={!open}
            aria-labelledby={highlightsId}
            className="mt-1.5 space-y-1.5 max-w-[72ch] animate-enter-up"
          >
            {more.map((h) => (
              <Highlight key={h} text={h} />
            ))}
          </ul>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={moreId}
            onClick={() => setOpen((o) => !o)}
            className="mt-2 min-h-[24px] text-[11px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            {open
              ? t(`${K}.showLess`)
              : `${t(`${K}.showMorePrefix`)}${more.length}${t(`${K}.showMoreSuffix`)}`}
          </button>
        </>
      )}

      {/* Skills */}
      <ul aria-label={t(`${K}.skills`)} className="mt-5 flex flex-wrap gap-1.5">
        {p.skills.map((s) => (
          <li
            key={s}
            className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA]"
          >
            {s}
          </li>
        ))}
      </ul>

      {/* Links: the live demo always; GitHub only for public repositories */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={fill(t(`${K}.liveDemoLabel`), { title: p.title })}
          className="inline-flex items-center gap-2 border border-[#CC0000] bg-[#CC0000] px-4 py-2 text-[11px] tracking-widest uppercase text-white hover:bg-[#A30000] hover:border-[#A30000] transition-colors duration-200"
        >
          {t(`${K}.liveDemo`)} <span aria-hidden="true">↗</span>
        </a>
        {p.repoUrl && (
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fill(t(`${K}.sourceLabel`), { title: p.title })}
            className="inline-flex items-center gap-2 border border-[#1A1A1A] dark:border-[#EEEEEE] px-4 py-2 text-[11px] tracking-widest uppercase text-black dark:text-white hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-[#EEEEEE] dark:hover:text-black transition-colors duration-200"
          >
            {t(`${K}.source`)} <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
