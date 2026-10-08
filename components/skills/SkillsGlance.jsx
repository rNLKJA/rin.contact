import { useI18n } from "@/contexts/I18nContext";
import { Marker } from "@/components/skills/SkillRow";

const K = "skillsPage";

/** In-page links, in page order. */
const ON_THIS_PAGE = ["now", "timeline", "atlas", "subjects", "credentials", "deeper"];

/**
 * At a glance: six static stat tiles, the "How to read the numbers" box (every
 * number counts artefacts, none is a level), the marker legend and the
 * "On this page" links.
 */
export default function SkillsGlance({ stats }) {
  const { t } = useI18n();
  const tiles = [
    { k: t(`${K}.glance.skills`), v: stats.skills },
    { k: t(`${K}.glance.subjects`), v: stats.subjects },
    { k: t(`${K}.glance.projects`), v: stats.projects },
    { k: t(`${K}.glance.labs`), v: stats.labs },
    { k: t(`${K}.glance.credentials`), v: stats.credentials },
    { k: t(`${K}.glance.years`), v: `${stats.from}–${stats.to}` },
  ];

  return (
    <div className="space-y-8">
      <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#F0F0F0] dark:bg-[#1E1E1E] border border-[#F0F0F0] dark:border-[#3D3D3D] rounded-lg overflow-hidden">
        {tiles.map((tile) => (
          <div key={tile.k} className="bg-white dark:bg-[#0A0A0A] px-4 py-3 min-w-0">
            <dt className="text-[10px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A] mb-1">
              {tile.k}
            </dt>
            <dd className="font-display text-2xl tabular-nums leading-none text-black dark:text-white whitespace-nowrap">
              {tile.v}
            </dd>
          </div>
        ))}
      </dl>

      <aside
        aria-labelledby="how-to-read-h"
        className="flex gap-4 items-start border border-[#E0E0E0] dark:border-[#3D3D3D] p-4 md:p-5"
      >
        <div
          aria-hidden="true"
          className="dot-matrix shrink-0 w-14 h-14 border border-[#E0E0E0] dark:border-[#3D3D3D] flex items-center justify-center font-display text-2xl leading-none text-black dark:text-white"
        >
          i
        </div>
        <div className="min-w-0">
          <h3
            id="how-to-read-h"
            className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A] dark:text-white"
          >
            {t(`${K}.howToRead.title`)}
          </h3>
          <p className="mt-2 max-w-[72ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#CCCCCC]">
            {t(`${K}.howToRead.body`)}
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] text-[#5C5C5C] dark:text-[#9A9A9A]">
            <span className="sr-only">{t(`${K}.howToRead.legend`)}: </span>
            <span className="inline-flex items-center gap-2">
              <Marker hands />
              {t(`${K}.howToRead.filled`)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Marker hands={false} />
              {t(`${K}.howToRead.hollow`)}
            </span>
          </p>
        </div>
      </aside>

      <nav aria-labelledby="on-this-page-h" className="print:hidden">
        <h3
          id="on-this-page-h"
          className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#5C5C5C] dark:text-[#9A9A9A] mb-3"
        >
          {t(`${K}.onThisPage`)}
        </h3>
        <ul className="flex flex-wrap gap-1.5">
          {ON_THIS_PAGE.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex min-h-[32px] items-center gap-2 border border-[#E0E0E0] dark:border-[#3D3D3D] px-3 text-[11px] tracking-widest uppercase text-[#3D3D3D] dark:text-[#AAAAAA] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white transition-colors duration-200"
              >
                {t(`${K}.sections.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
