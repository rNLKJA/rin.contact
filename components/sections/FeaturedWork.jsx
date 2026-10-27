/**
 * FeaturedWork — homepage flagship spotlight.
 * Leads the marketing page with Signal (live, governed AI product): proof of
 * work up front, with case-study / live-demo / source CTAs.
 *
 * Same anatomy as the /projects spotlight: a square hairline card with a header
 * bar (label left, live status right), the copy on the left eight columns and
 * the dot-matrix cover, readouts and stack on the right four. No tilt, no
 * cursor sheen. Red only marks what is live. Facts come from lib/projects-data
 * and are unchanged; UI labels are localised.
 */
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "@/hooks/useInView";
import { PROJECTS } from "@/lib/projects-data";
import ProjectCover from "@/components/covers/ProjectCover";
import {
  SectionHeader,
  EDITORIAL,
  BTN,
  BTN_PRIMARY,
  BTN_SECONDARY,
} from "@/components/home/SectionHeader";
import SlashList from "@/components/home/SlashList";

const SIGNAL = PROJECTS.find((p) => p.id === "signal") || {};
const LIVE = SIGNAL.demo || "https://rnlkja--signal-api-api.modal.run";
const REPO = SIGNAL.link || "https://github.com/rNLKJA/signal";

const STATS = [
  { k: "status", v: "Live · v1.14" },
  { k: "tests", v: "128 green" },
  { k: "jurisdictions", v: "SA + NYC" },
  { k: "governance", v: "DTA + EU AI Act" },
];

const STACK = [
  "Python",
  "FastAPI",
  "LLM",
  "NumPy",
  "SciPy",
  "Modal",
  "Docker",
  "EU AI Act",
  "DTA v2.0",
];

const COPY = {
  en: {
    section: "Flagship",
    aside: "Featured work",
    kindLabel: "Independent Product",
    period: "Jun 2026 – Present",
    live: "Live",
    subtitle: SIGNAL.subtitle,
    labels: {
      status: "Status",
      tests: "Tests",
      jurisdictions: "Jurisdictions",
      governance: "Governance",
      stack: "Stack",
    },
    caseStudy: "Read case study",
    liveDemo: "Live demo",
    github: "View on GitHub",
  },
  zh: {
    section: "旗舰项目",
    aside: "精选作品",
    kindLabel: "独立产品",
    period: "Jun 2026 – Present",
    live: "在线",
    subtitle: SIGNAL.zh?.subtitle || SIGNAL.subtitle,
    labels: {
      status: "状态",
      tests: "测试",
      jurisdictions: "辖区",
      governance: "治理",
      stack: "技术栈",
    },
    caseStudy: "阅读案例",
    liveDemo: "在线演示",
    github: "在 GitHub 上查看",
  },
};

// Full width on phones, so the three buttons stack evenly.
const CTA = `${BTN} w-full sm:w-auto`;

export default function FeaturedWork() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const { locale = "en-AU" } = useRouter();
  const copy = COPY[locale === "zh-Hans" ? "zh" : "en"];

  return (
    <section
      id="featured"
      className={`scroll-mt-24 ${EDITORIAL}`}
      aria-label="Featured work"
      ref={ref}
    >
      <SectionHeader index="03" label={copy.section} />

      <article
        className={`border border-[#E0E0E0] dark:border-[#3D3D3D] bg-white dark:bg-[#0A0A0A] transition-transform duration-200 ease-out ${
          inView ? "translate-y-0" : "translate-y-1.5"
        }`}
      >
        {/* header bar — label left, live status right */}
        <div className="px-5 md:px-8 min-h-11 py-2.5 md:py-0 md:h-11 border-b border-[#E0E0E0] dark:border-[#3D3D3D] bg-[#FAFAFA] dark:bg-[#141414] flex items-center justify-between gap-4">
          <span className="text-[11px] tracking-widest uppercase text-[#3D3D3D] dark:text-[#B4B4B4]">
            <span className="block sm:inline">{copy.kindLabel}</span>
            <span className="hidden sm:inline" aria-hidden="true">
              {" · "}
            </span>
            <span className="block sm:inline">{copy.period}</span>
          </span>
          <span className="text-[11px] tracking-widest uppercase text-black dark:text-white flex items-center gap-2 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
            {copy.live}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* main */}
          <div className="md:col-span-8 p-5 md:p-8 md:border-r border-[#E0E0E0] dark:border-[#3D3D3D] flex flex-col gap-6">
            <div>
              <h2 className="m-0 text-4xl md:text-5xl font-semibold tracking-tight leading-none text-black dark:text-white">
                {SIGNAL.title || "Signal"}
              </h2>
              <p className="m-0 mt-3 font-editorial italic text-lg md:text-2xl leading-snug text-[#3D3D3D] dark:text-[#C8C8C8]">
                {copy.subtitle}
              </p>
            </div>
            <p className="m-0 max-w-[62ch] text-[15px] text-[#3D3D3D] dark:text-[#B4B4B4] leading-relaxed">
              {SIGNAL.summary}
            </p>
            <p className="m-0 border-l-2 border-black dark:border-white pl-4 text-sm text-[#1A1A1A] dark:text-white font-medium leading-relaxed">
              {SIGNAL.impact}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              <Link href="/projects/signal" className={`${CTA} ${BTN_PRIMARY}`}>
                {copy.caseStudy} <span aria-hidden="true">→</span>
              </Link>
              <a href={LIVE} target="_blank" rel="noreferrer" className={`${CTA} ${BTN_SECONDARY}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
                {copy.liveDemo} <span aria-hidden="true">↗</span>
              </a>
              <a href={REPO} target="_blank" rel="noreferrer" className={`${CTA} ${BTN_SECONDARY}`}>
                {copy.github} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* side: cover, readouts, stack */}
          <div className="md:col-span-4 flex flex-col border-t md:border-t-0 border-[#E0E0E0] dark:border-[#3D3D3D]">
            <div className="p-5 md:p-6 border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
              <ProjectCover id="signal" />
            </div>
            <dl className="m-0 grid grid-cols-2 gap-px bg-[#E0E0E0] dark:bg-[#3D3D3D] border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
              {STATS.map(({ k, v }) => (
                <div key={k} className="bg-white dark:bg-[#0A0A0A] px-5 py-3.5 md:px-6">
                  <dt className="font-mono text-[11px] tracking-widest uppercase text-[#5A5A5A] dark:text-[#9A9A9A] mb-1">
                    {copy.labels[k]}
                  </dt>
                  <dd className="m-0 text-sm font-medium text-[#1A1A1A] dark:text-[#EEEEEE]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="px-5 py-4 md:px-6">
              <p
                id="featured-stack-label"
                className="font-mono text-[11px] tracking-widest uppercase text-[#5A5A5A] dark:text-[#9A9A9A] mb-2 m-0"
              >
                {copy.labels.stack}
              </p>
              <SlashList
                items={STACK}
                labelledBy="featured-stack-label"
                balance
                className="font-mono text-xs leading-6 text-[#3D3D3D] dark:text-[#B4B4B4]"
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
