/**
 * SectionNavCards — four magnetic cards on the homepage that route visitors
 * to Career, Projects, Lab, and About subpages.
 */
import Link from "next/link";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

const CARDS = [
  {
    num: "01",
    title: "Strategic",
    href: "/strategic",
    desc: "Strategic thinking + data science — problem-first, not model-first. How understanding the question and applying analytics strategically creates meaningful impact.",
    tags: ["Problem framing", "Government", "Policy"],
    stat: "Problem-first",
    accent: "#FF3C3C",
  },
  {
    num: "02",
    title: "Career",
    href: "/career",
    desc: "Three domain lines. Seven stations. One convergence point where Government, Research, and Engineering ran simultaneously.",
    tags: ["Government", "Research", "Engineering"],
    stat: "4 years · 7 stations",
    accent: "#686868",
  },
  {
    num: "03",
    title: "Projects",
    href: "/projects",
    desc: "Seventeen shipped to production across data engineering, cloud infrastructure, mobile, and web platforms.",
    tags: ["Python", "Next.js", "AWS", "React Native"],
    stat: "17 shipped",
    accent: "#686868",
  },
  {
    num: "04",
    title: "Lab",
    href: "/lab",
    desc: "The data playground. Career intelligence reports, dataset self-portrait, compound growth analysis.",
    tags: ["Intelligence", "Data Science", "Visualisation"],
    stat: "Interactive",
    accent: "#AAAAAA",
  },
  {
    num: "05",
    title: "About",
    href: "/about",
    desc: "Skills across seven technical domains, 23 professional credentials, and answers to the questions people actually ask.",
    tags: ["23 certs", "7 domains", "FAQ"],
    stat: "6 sectors",
    accent: "#3D3D3D",
  },
  {
    num: "06",
    title: "Resume",
    href: "/resume",
    desc: "Interactive CLI-style CV. Type commands, explore career data. Ping, open, ls — the terminal experience.",
    tags: ["CLI", "Interactive", "Terminal"],
    stat: "Type to explore",
    accent: "#7A7A7A",
  },
];

export default function SectionNavCards() {
  return (
    <section className="py-20" aria-label="Navigate to sections">
      <p className="text-xs tracking-widest uppercase text-[#7A7A7A] mb-10">◈ — Explore</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E0E0E0]">
        {CARDS.map((card) => (
          <MagneticWrapper key={card.title} strength={6}>
            <Link
              href={card.href}
              className="group block bg-white dark:bg-[#141414] p-8 h-full hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] transition-colors duration-200"
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] font-mono tracking-widest text-[#CCCCCC]">
                  {card.num}
                </span>
                <span
                  className="text-xs font-mono tracking-widest transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  style={{ color: card.accent }}
                >
                  → EXPLORE
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-3xl font-semibold tracking-tight mb-3 transition-colors duration-200"
                style={{ color: "#000" }}
              >
                {card.title}
                <span
                  className="inline-block ml-2 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1"
                  style={{ color: card.accent }}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </h2>

              {/* Description */}
              <p className="text-sm text-[#7A7A7A] leading-relaxed mb-6 font-light">
                {card.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {card.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-[#E8E8E8] px-2 py-0.5 text-[10px] tracking-wide text-[#AAAAAA] font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Stat */}
              <p
                className="text-[10px] font-mono tracking-widest uppercase mt-auto"
                style={{ color: card.accent }}
              >
                {card.stat}
              </p>
            </Link>
          </MagneticWrapper>
        ))}
      </div>
    </section>
  );
}
