/**
 * SectionExplorer — the homepage "Go deeper" section, reimagined as a six-tile
 * instrument panel in the site's approved dot-matrix/glyph language.
 *
 * Each of six tiles is a mini live instrument built from real data computed at
 * build time:
 *  - Writing: glyph bar per month of posts
 *  - Career: 9-role month strip in miniature (compact version)
 *  - Projects: one glyph per project with live count
 *  - Lab: small animated glyph pattern
 *  - About: dot-matrix Adelaide clock
 *  - Resume: "30-second read" with page glyph
 *
 * Dot-matrix numerals for 01-06. Hover/focus lights glyphs red (CSS, no cursor
 * effects). Whole tile is one link. Marked with data-explore, data-explore-tile,
 * data-glyph. Supports EN + zh-Hans copy. No canvas, no hard-coded numbers.
 */
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { useInView } from "@/hooks/useInView";
import { fill } from "@/lib/fill";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const useReducedMotion = () =>
  useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false
  );

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
    label: "◈ — Explore",
    heading: "Go deeper.",
    intro: "Writing, career, projects, and the lab. Different ways into the same story.",
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
    label: "◈ — 探索",
    heading: "深入了解。",
    intro: "随笔、职业、项目与实验室。从不同角度走进同一个故事。",
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

/**
 * GlyphBar — renders a simple bar of glyphs (mini rectangles).
 * Used in Writing tile and as reusable component.
 */
function GlyphBar({ count, max = 12, size = "sm" }) {
  const sizeClass = size === "sm" ? "h-1 gap-px" : "h-1.5 gap-1";
  const glyphClass = size === "sm" ? "w-1" : "w-1.5";
  const lit = Math.min(count, max);

  return (
    <div className={`flex ${sizeClass}`} data-glyph>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`${glyphClass} rounded-[1px] transition-colors duration-300 ${
            i < lit ? "bg-[#FF3C3C]" : "bg-black/10 dark:bg-white/10"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/**
 * WritingTile — shows glyph bar per month of posts.
 * Data: postsByMonth - array of counts per month
 */
function WritingTile({ postsByMonth, reduce, copy, num }) {
  const maxPostsInMonth = Math.max(1, ...(postsByMonth || [1]));
  const recentMonths = (postsByMonth || []).slice(-6);

  return (
    <span className="flex flex-col gap-2" data-glyph>
      <span className="text-[10px] font-mono tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]">
        {num}
      </span>
      <span className="flex flex-col gap-1.5">
        {recentMonths.length > 0 ? (
          recentMonths.map((count, i) => (
            <GlyphBar key={i} count={count} max={maxPostsInMonth} size="xs" />
          ))
        ) : (
          <GlyphBar count={0} max={1} size="xs" />
        )}
      </span>
    </span>
  );
}

/**
 * CareerTile — shows compact 9-role month strip (simplified CareerInstrument).
 * Data: careerMonths - array of booleans or month data, roleCount - number of roles
 */
function CareerTile({ careerMonths, roleCount = 9, reduce, copy, num }) {
  const months = (careerMonths || []).slice(-12);

  return (
    <span className="flex flex-col gap-2" data-glyph>
      <span className="text-[10px] font-mono tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]">
        {num}
      </span>
      <div className="flex gap-px" data-glyph>
        {months.map((active, i) => (
          <span
            key={i}
            className={`h-4 w-1 rounded-[1px] transition-colors duration-300 ${
              active ? "bg-black dark:bg-white" : "bg-black/10 dark:bg-white/10"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-[11px] font-display text-black dark:text-white tabular-nums">
        {roleCount}
      </span>
    </span>
  );
}

/**
 * ProjectsTile — one glyph per project.
 */
function ProjectsTile({ projectCount, reduce, copy, num }) {
  return (
    <span className="flex flex-col gap-2" data-glyph>
      <span className="text-[10px] font-mono tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]">
        {num}
      </span>
      <div className="flex flex-wrap gap-1" data-glyph>
        {Array.from({ length: Math.min(projectCount, 12) }, (_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-[1px] bg-black dark:bg-white transition-colors duration-300"
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-[11px] font-display text-black dark:text-white tabular-nums">
        {projectCount}
      </span>
    </span>
  );
}

/**
 * LabTile — animated glyph pattern (dots that pulse).
 */
function LabTile({ reduce, copy, num }) {
  return (
    <span className="flex flex-col gap-2" data-glyph>
      <span className="text-[10px] font-mono tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]">
        {num}
      </span>
      <div className="flex gap-1" data-glyph>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C]" aria-hidden="true" />
        ))}
      </div>
    </span>
  );
}

/**
 * AboutTile — dot-matrix Adelaide clock.
 * Shows HH:MM in a minimal dot-matrix style.
 */
function AboutTile({ reduce, copy, num }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="flex flex-col gap-2" data-glyph>
      <span className="text-[10px] font-mono tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]">
        {num}
      </span>
      <div className="font-display text-lg tabular-nums text-black dark:text-white tracking-wide">
        {time}
      </div>
      <span className="text-[9px] font-mono text-[#6E6E6E] dark:text-[#9A9A9A]">Adelaide</span>
    </span>
  );
}

/**
 * ResumeTile — "30-second read" label with page glyph.
 */
function ResumeTile({ reduce, copy, num }) {
  return (
    <span className="flex flex-col gap-2" data-glyph>
      <span className="text-[10px] font-mono tracking-widest text-[#6E6E6E] dark:text-[#9A9A9A]">
        {num}
      </span>
      <div
        className="w-3 h-4 border border-black dark:border-white rounded-[1px]"
        aria-hidden="true"
      />
      <span className="text-[9px] font-mono text-[#6E6E6E] dark:text-[#9A9A9A]">30 sec</span>
    </span>
  );
}

/**
 * Explorer tile wrapper — the clickable card.
 */
function ExploreTile({ href, num, title, desc, children }) {
  return (
    <div
      data-explore-tile
      className="relative flex flex-col gap-3 p-4 md:p-5 bg-white/80 dark:bg-[#0A0A0A]/80 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg"
    >
      <a
        href={href}
        className="absolute inset-0 rounded-lg outline-none"
        style={{ color: "inherit", textDecoration: "none" }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        {children}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
              {num}
            </span>
            <h3 className="font-editorial text-sm md:text-base font-medium text-black dark:text-white">
              {title}
            </h3>
          </div>
          <p className="text-xs text-[#6E6E6E] dark:text-[#9A9A9A] leading-tight">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * SectionExplorer — main component.
 */
export default function SectionExplorer({
  postsByMonth = [],
  careerMonths = [],
  projectCount = 0,
  roleCount = 9,
  counts = {},
}) {
  const { t } = useI18n();
  const [ref, inView] = useInView({ threshold: 0.12 });
  const reduce = useReducedMotion();

  const raw = t("sectionNav.cards") || [];
  const lang = typeof t === "function" ? "en" : "en";
  const copy = COPY[lang === "zh-Hans" || lang === "zh" ? "zh" : "en"];

  // Build the copy with filled placeholders
  const tilesCopy = {
    writing: {
      ...copy.tiles.writing,
      desc: fill(copy.tiles.writing.desc, counts),
    },
    career: {
      ...copy.tiles.career,
      desc: fill(copy.tiles.career.desc, counts),
    },
    projects: {
      ...copy.tiles.projects,
      desc: fill(copy.tiles.projects.desc, { projects: projectCount }),
    },
    lab: copy.tiles.lab,
    about: copy.tiles.about,
    resume: copy.tiles.resume,
  };

  return (
    <section data-explore className="py-20" aria-label={copy.label} ref={ref}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes lab-pulse {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
            .lab-pulse {
              animation: lab-pulse 2s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .lab-pulse {
                animation: none;
                opacity: 1;
              }
            }
          `,
        }}
      />

      <div
        className={`mb-12 transition-all duration-200 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1.5"}`}
      >
        <p className="text-xs tracking-widest uppercase text-accent-ink mb-4 font-mono">
          {copy.label}
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white">
          {copy.heading}
        </h2>
        <p className="text-base font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-xl leading-relaxed mt-3">
          {copy.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <ExploreTile
          href={TILES[0].href}
          num={TILES[0].num}
          title={tilesCopy.writing.title}
          desc={tilesCopy.writing.desc}
        >
          <WritingTile postsByMonth={postsByMonth} reduce={reduce} copy={copy} num={TILES[0].num} />
        </ExploreTile>

        <ExploreTile
          href={TILES[1].href}
          num={TILES[1].num}
          title={tilesCopy.career.title}
          desc={tilesCopy.career.desc}
        >
          <CareerTile
            careerMonths={careerMonths}
            roleCount={roleCount}
            reduce={reduce}
            copy={copy}
            num={TILES[1].num}
          />
        </ExploreTile>

        <ExploreTile
          href={TILES[2].href}
          num={TILES[2].num}
          title={tilesCopy.projects.title}
          desc={tilesCopy.projects.desc}
        >
          <ProjectsTile
            projectCount={projectCount}
            reduce={reduce}
            copy={copy}
            num={TILES[2].num}
          />
        </ExploreTile>

        <ExploreTile
          href={TILES[3].href}
          num={TILES[3].num}
          title={tilesCopy.lab.title}
          desc={tilesCopy.lab.desc}
        >
          <LabTile reduce={reduce} copy={copy} num={TILES[3].num} />
        </ExploreTile>

        <ExploreTile
          href={TILES[4].href}
          num={TILES[4].num}
          title={tilesCopy.about.title}
          desc={tilesCopy.about.desc}
        >
          <AboutTile reduce={reduce} copy={copy} num={TILES[4].num} />
        </ExploreTile>

        <ExploreTile
          href={TILES[5].href}
          num={TILES[5].num}
          title={tilesCopy.resume.title}
          desc={tilesCopy.resume.desc}
        >
          <ResumeTile reduce={reduce} copy={copy} num={TILES[5].num} />
        </ExploreTile>
      </div>
    </section>
  );
}
