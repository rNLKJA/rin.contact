/**
 * VersionTimeline: the longer list of dates under the version deck, on the
 * site's existing .timeline-line rule. Square markers; the current period gets
 * the red one.
 */
export default function VersionTimeline({ milestones, lang }) {
  const last = milestones.length - 1;
  return (
    <div className="relative pl-6">
      <span className="timeline-line" style={{ left: 3 }} aria-hidden="true" />
      <ol>
        {milestones.map((m, i) => (
          <li key={`${m.date}-${i}`} className="relative pb-5 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-6 top-[5px] w-[7px] h-[7px] ${
                i === last
                  ? "bg-[#FF3C3C]"
                  : "bg-white dark:bg-[#0A0A0A] border border-[#6B6B6B] dark:border-[#9A9A9A]"
              }`}
            />
            <p className="font-display text-[11px] tracking-widest text-ink-subtle">
              {m.date}
              {m.to ? ` → ${m.to}` : ""}
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-[#3D3D3D] dark:text-[#CCCCCC]">
              {m[lang]}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
