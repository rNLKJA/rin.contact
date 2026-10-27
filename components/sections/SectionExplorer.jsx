/**
 * SectionExplorer — the homepage "Go deeper" section: six joined hairline cells,
 * each a small instrument built from real data computed at build time.
 *
 *  - Writing: post count, then one bar per month for the last six months
 *  - Career: role count, then a month strip for the last twelve months
 *  - Projects: project count, one glyph per project (up to twelve)
 *  - Lab: a still dot trace (decorative; no count, the lab has no list to count)
 *  - About: Adelaide clock in Adelaide time, with a red dot because it is live
 *  - Resume: roles + degrees, then a year strip of role / degree starts
 *
 * Every readout sits in a slot of the same height, so the index and title share
 * a baseline across each row. The whole cell is one keyboard-reachable link.
 * Square corners, hairlines, no cursor effects. Hrefs stay unprefixed on purpose
 * (see the acceptance notes): next/link would localise them on /zh-Hans/.
 * Supports EN + zh-Hans copy.
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fill } from "@/lib/fill";
import { SectionHeader, TitleRow, EDITORIAL } from "@/components/home/SectionHeader";

const TILES = [
  { id: "writing", href: "/blog", num: "01" },
  { id: "career", href: "/career", num: "02" },
  { id: "projects", href: "/projects", num: "03" },
  { id: "lab", href: "/lab", num: "04" },
  { id: "about", href: "/about", num: "05" },
  { id: "resume", href: "/resume", num: "06" },
];

const COPY = {
  en: {
    label: "Explore",
    heading: "Go deeper.",
    intro: "Writing, career, projects, and the lab. Different ways into the same story.",
    adelaide: "Adelaide",
    tiles: {
      writing: { title: "Writing", desc: "Long-form essays on data and decisions" },
      career: { title: "Career", desc: "Nine roles across three domains since 2023" },
      projects: { title: "Projects", desc: "{projects} built across platforms" },
      lab: { title: "Lab", desc: "Interactive data experiments & intelligence" },
      about: { title: "About", desc: "Skills, certifications, and honest answers" },
      resume: { title: "Resume", desc: "30-second read, PDF, or CLI version" },
    },
  },
  zh: {
    label: "探索",
    heading: "深入了解。",
    intro: "随笔、职业、项目与实验室。从不同角度走进同一个故事。",
    adelaide: "阿德莱德",
    tiles: {
      writing: { title: "随笔", desc: "关于数据与决策的长文随笔" },
      career: { title: "职业经历", desc: "2023年起九个角色跨越三个领域" },
      projects: { title: "项目", desc: "{projects}个覆盖多平台的作品" },
      lab: { title: "实验室", desc: "交互式数据实验与情报分析" },
      about: { title: "关于我", desc: "技能、认证与诚实回答" },
      resume: { title: "简历", desc: "30秒读完、PDF或命令行版本" },
    },
  },
};

const ON = "bg-black dark:bg-white";
const OFF = "bg-black/10 dark:bg-white/15";

function Numeral({ children }) {
  return (
    <span className="font-display text-3xl font-semibold leading-none tabular-nums text-black dark:text-white">
      {children}
    </span>
  );
}

function WritingReadout({ postsByMonth = [], totalPosts = 0 }) {
  const months = postsByMonth.slice(-6);
  const max = Math.max(1, ...months);
  return (
    <>
      <Numeral>{String(totalPosts).padStart(2, "0")}</Numeral>
      {/* one level meter per month: a light track, filled from the bottom */}
      <span className="flex items-end gap-1 h-4" data-glyph>
        {months.map((n, i) => (
          <span key={i} className={`relative w-2 h-4 ${OFF}`} aria-hidden="true">
            {n > 0 && (
              <span
                className={`absolute inset-x-0 bottom-0 ${ON}`}
                style={{ height: `${Math.max(4, Math.round((n / max) * 16))}px` }}
              />
            )}
          </span>
        ))}
      </span>
    </>
  );
}

function CareerReadout({ careerMonths = [], roleCount = 0 }) {
  return (
    <>
      <Numeral>{String(roleCount).padStart(2, "0")}</Numeral>
      <span className="flex gap-[3px] h-4" data-glyph>
        {careerMonths.slice(-12).map((active, i) => (
          <span key={i} className={`w-1 h-4 ${active ? ON : OFF}`} aria-hidden="true" />
        ))}
      </span>
    </>
  );
}

function ProjectsReadout({ projectCount = 0 }) {
  return (
    <>
      <Numeral>{String(projectCount).padStart(2, "0")}</Numeral>
      <span className="flex flex-wrap gap-1 h-4 items-end" data-glyph>
        {Array.from({ length: Math.min(projectCount, 12) }, (_, i) => (
          <span key={i} className={`w-1.5 h-1.5 ${ON}`} aria-hidden="true" />
        ))}
      </span>
    </>
  );
}

/** A still dot trace: one lit dot per column along a slow wave. Decorative. */
function LabReadout() {
  const cols = 14;
  const rows = 5;
  return (
    <span
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${cols}, 6px)` }}
      data-glyph
    >
      {Array.from({ length: rows * cols }, (_, k) => {
        const r = Math.floor(k / cols);
        const c = k % cols;
        const lit = Math.round(2 - 2 * Math.sin((c / (cols - 1)) * Math.PI * 1.5)) === r;
        return (
          <span
            key={k}
            className={`w-1.5 h-1.5 rounded-full ${lit ? ON : OFF}`}
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}

function AboutReadout({ label }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-AU", {
          timeZone: "Australia/Adelaide",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <Numeral>{time}</Numeral>
      <span className="flex items-center gap-2 h-4 font-mono text-[11px] tracking-widest uppercase text-[#5A5A5A] dark:text-[#9A9A9A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
        {label}
      </span>
    </>
  );
}

function ResumeReadout({ resumeYears = [], resumeCount = 0 }) {
  return (
    <>
      <Numeral>{String(resumeCount).padStart(2, "0")}</Numeral>
      <span className="flex gap-[3px] h-4" data-glyph>
        {resumeYears.slice(0, 8).map((y) => (
          <span
            key={y.year}
            className={`w-1 h-4 ${y.hasEntry ? ON : OFF}`}
            aria-hidden="true"
            title={y.year}
          />
        ))}
      </span>
    </>
  );
}

/** One cell: the whole cell is the link. */
function ExploreTile({ href, num, title, desc, children }) {
  return (
    <a
      href={href}
      data-explore-tile
      className="group relative flex flex-col bg-white dark:bg-[#0A0A0A] p-4 md:p-6 transition-colors duration-200 hover:bg-[#FAFAFA] dark:hover:bg-[#141414] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#FF3C3C]"
    >
      <span
        aria-hidden="true"
        className="absolute top-4 right-4 md:top-5 md:right-6 text-sm text-[#9A9A9A] dark:text-[#5C5C5C] group-hover:text-black dark:group-hover:text-white transition-colors duration-200"
      >
        →
      </span>
      <div className="h-[72px] md:h-[84px] flex flex-col justify-end gap-2.5" aria-hidden="true">
        {children}
      </div>
      <div className="mt-5 md:mt-6 flex items-baseline gap-2">
        <span className="font-mono text-[11px] tracking-widest text-[#5A5A5A] dark:text-[#9A9A9A]">
          {num}
        </span>
        <h3 className="m-0 font-editorial text-lg md:text-xl font-semibold leading-tight text-black dark:text-white">
          {title}
        </h3>
      </div>
      <p className="m-0 mt-1.5 text-xs md:text-sm leading-snug text-[#5A5A5A] dark:text-[#9A9A9A]">
        {desc}
      </p>
    </a>
  );
}

export default function SectionExplorer({
  postsByMonth = [],
  totalPosts = 0,
  careerMonths = [],
  projectCount = 0,
  roleCount = 9,
  resumeYears = [],
  resumeCount = 0,
}) {
  const { locale = "en-AU" } = useRouter();
  const copy = COPY[locale === "zh-Hans" ? "zh" : "en"];
  const tiles = {
    ...copy.tiles,
    projects: {
      ...copy.tiles.projects,
      desc: fill(copy.tiles.projects.desc, { projects: projectCount }),
    },
  };
  const readouts = {
    writing: <WritingReadout postsByMonth={postsByMonth} totalPosts={totalPosts} />,
    career: <CareerReadout careerMonths={careerMonths} roleCount={roleCount} />,
    projects: <ProjectsReadout projectCount={projectCount} />,
    lab: <LabReadout />,
    about: <AboutReadout label={copy.adelaide} />,
    resume: <ResumeReadout resumeYears={resumeYears} resumeCount={resumeCount} />,
  };

  return (
    <section
      id="explore"
      data-explore
      className={`scroll-mt-24 ${EDITORIAL}`}
      aria-label={copy.label}
    >
      <SectionHeader index="05" label={copy.label} />
      <TitleRow title={copy.heading} intro={copy.intro} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-[#E0E0E0] dark:bg-[#3D3D3D] border border-[#E0E0E0] dark:border-[#3D3D3D]">
        {TILES.map(({ id, href, num }) => (
          <ExploreTile key={id} href={href} num={num} title={tiles[id].title} desc={tiles[id].desc}>
            {readouts[id]}
          </ExploreTile>
        ))}
      </div>
    </section>
  );
}
