import { useState } from "react";
import Link from "next/link";

// Numbers in a bullet (1,500+ / 24+ / ~$500) are set in medium weight so the
// impact reads on a skim.
const NUMBER = /(~?\$[\d,]+|\d{1,3}(?:,\d{3})+\+?|\d+\+)/g;

function Emphasise({ text }) {
  const parts = text.split(NUMBER);
  return parts.map((p, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium tabular-nums text-black dark:text-white">
        {p}
      </strong>
    ) : (
      p
    )
  );
}

function Bullet({ id, text }) {
  return (
    <li
      id={id}
      tabIndex={-1}
      className="scroll-mt-24 flex gap-2 text-[14px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA] -mx-2 px-2 py-0.5 rounded-sm target:bg-[#FFF1F1] dark:target:bg-[#1F0E0E] target:shadow-[inset_2px_0_0_#CC0000] dark:target:shadow-[inset_2px_0_0_#FF3C3C] target:animate-enter"
    >
      <span
        className="cv-accent text-[#CC0000] dark:text-[#FF3C3C] flex-shrink-0"
        aria-hidden="true"
      >
        ·
      </span>
      <span>
        <Emphasise text={text} />
      </span>
    </li>
  );
}

const CHIP = "inline-block border px-2 py-0.5 text-[10px] tracking-widest uppercase leading-normal";

export default function RoleEntry({ role, t }) {
  const [open, setOpen] = useState(false);
  const moreId = `more-${role.id}`;
  const showTeam = role.team && !role.org.includes(role.team);

  return (
    <article
      id={`role-${role.id}`}
      tabIndex={-1}
      aria-labelledby={`role-${role.id}-h`}
      className="scroll-mt-24 grid md:grid-cols-[136px_minmax(0,1fr)] gap-x-6 gap-y-2 py-6 border-t border-[#F0F0F0] dark:border-[#1E1E1E] first:border-t-0 first:pt-0"
    >
      {/* Date gutter: a single meta line on mobile, a column from md */}
      <div className="flex flex-wrap md:flex-col items-start gap-x-3 gap-y-1.5 text-[11px] uppercase tracking-widest tabular-nums text-[#6E6E6E] dark:text-[#9A9A9A]">
        <time dateTime={role.start}>{role.period}</time>
        {role.duration && <span>{role.duration}</span>}
        <span>{t(`resumePage.track.${role.track}`)}</span>
        {role.current && (
          <span
            className={`${CHIP} cv-accent border-[#CC0000] text-[#CC0000] dark:border-[#FF3C3C] dark:text-[#FF3C3C]`}
          >
            {t("resumePage.role.current")}
          </span>
        )}
        {role.note && (
          <span
            className={`${CHIP} border-[#E0E0E0] dark:border-[#3D3D3D] normal-case tracking-normal`}
          >
            {role.note}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h3
          id={`role-${role.id}-h`}
          className="text-lg md:text-xl font-semibold leading-snug text-black dark:text-white"
        >
          {role.role}
        </h3>
        <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] mt-1">
          {role.org}
          {showTeam && <span> · {role.team}</span>}
          <span className="text-[#6E6E6E] dark:text-[#9A9A9A]"> · {role.location}</span>
        </p>

        {role.summary && (
          <p className="text-[14px] leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA] mt-3 max-w-[68ch]">
            {role.summary}
          </p>
        )}

        <ul className="mt-3 space-y-1">
          {role.shown.map((b, i) => (
            <Bullet key={i} id={`b-${role.id}-${i}`} text={b} />
          ))}
        </ul>

        {role.more.length > 0 && (
          <>
            <ul id={moreId} hidden={!open} className="mt-1 space-y-1 animate-enter-up print:hidden">
              {role.more.map((b, i) => (
                <Bullet key={i} id={`b-${role.id}-${role.shown.length + i}`} text={b} />
              ))}
            </ul>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={moreId}
              onClick={() => setOpen((o) => !o)}
              className="print:hidden mt-2 text-[11px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              {open
                ? t("resumePage.role.showLess")
                : `${t("resumePage.role.showMorePrefix")}${role.more.length}${t("resumePage.role.showMoreSuffix")}`}
            </button>
          </>
        )}

        {role.tools?.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="sr-only">{t("resumePage.role.tools")}: </span>
            {role.tools.slice(0, 8).map((tool) => (
              <span
                key={tool}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-xs text-[#595959] dark:text-[#AAAAAA]"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs text-[#6E6E6E] dark:text-[#9A9A9A]">
          {role.links.map((l) =>
            l.href.startsWith("http") ? (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3D3D3D] dark:text-[#CCCCCC] underline decoration-[#E0E0E0] dark:decoration-[#3D3D3D] underline-offset-4 hover:decoration-current transition-colors duration-200"
              >
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#3D3D3D] dark:text-[#CCCCCC] underline decoration-[#E0E0E0] dark:decoration-[#3D3D3D] underline-offset-4 hover:decoration-current transition-colors duration-200"
              >
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            )
          )}
          {/* A plain link (full page load): /career lazy-loads its timeline, so a
              client-side jump would land before the target exists. */}
          <a
            href={`/career/#role-${role.id}`}
            className="print:hidden text-[#3D3D3D] dark:text-[#CCCCCC] underline decoration-[#E0E0E0] dark:decoration-[#3D3D3D] underline-offset-4 hover:decoration-current transition-colors duration-200"
          >
            {t("resumePage.role.onTimeline")} <span aria-hidden="true">→</span>
          </a>
          {role.evidence === "internal" && <span>{t("resumePage.evidence.internal")}</span>}
        </p>
      </div>
    </article>
  );
}
