/**
 * PipelineList: compact placeholder cards for planned or in-progress work
 * (lib/pipeline-data.js). Used under the main lists on /projects and
 * /projects/coursework. A hollow red dot marks "not shipped yet", next to the
 * solid dot that live coursework cards use. A last card on its own spans both
 * columns, so the grid's grey gap colour never shows as an empty cell. An item
 * with an on-site demo (`demo`) links it as Live demo, in the same tab.
 */
import Link from "next/link";
import { fill } from "@/lib/fill";

export default function PipelineList({ items, t }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E0E0E0] dark:bg-[#2A2A2A] border border-[#E0E0E0] dark:border-[#2A2A2A]">
      {items.map((p) => (
        <li
          key={p.id}
          className="bg-white dark:bg-[#0A0A0A] p-5 md:p-6 flex flex-col gap-3 md:odd:last:col-span-2"
        >
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <h3 className="text-base font-medium text-black dark:text-white">{p.title}</h3>
            <p className="inline-flex items-center gap-1.5 border border-dashed border-[#BDBDBD] dark:border-[#4A4A4A] px-2 py-0.5 text-[10px] leading-normal tracking-widest uppercase tabular-nums text-[#3D3D3D] dark:text-[#CCCCCC]">
              <span
                className="w-1.5 h-1.5 rounded-full border border-[#CC0000] dark:border-[#FF3C3C]"
                aria-hidden="true"
              />
              {p.status}
            </p>
          </div>
          <p className="text-[11px] tracking-widest uppercase text-[#5C5C5C] dark:text-[#9A9A9A]">
            {p.meta}
          </p>
          <p className="max-w-[68ch] text-sm leading-relaxed text-[#3D3D3D] dark:text-[#AAAAAA]">
            {p.summary}
          </p>
          {p.demo && (
            <Link
              href={p.demo}
              aria-label={fill(t("projects.liveDemoPageLabel"), { title: p.title })}
              className="mt-auto self-start text-[11px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              {t("projects.liveDemo")} <span aria-hidden="true">→</span>
            </Link>
          )}
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={fill(t("projectsPage.pipeline.repoLabel"), { title: p.title })}
              className="mt-auto self-start text-[11px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              {t("projectsPage.pipeline.repo")} <span aria-hidden="true">↗</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
