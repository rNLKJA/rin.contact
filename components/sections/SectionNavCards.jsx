/**
 * SectionNavCards — four magnetic cards on the homepage that route visitors
 * to Career, Projects, Lab, and About subpages.
 */
import Link from "next/link";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useInView } from "@/hooks/useInView";

const CARD_STRUCTURE = [
  { href: "/strategic", accent: "#FF3C3C", darkAccent: "#FF5C5C" },
  { href: "/career",    accent: "#686868", darkAccent: "#9A9A9A" },
  { href: "/projects",  accent: "#686868", darkAccent: "#9A9A9A" },
  { href: "/lab",       accent: "#AAAAAA", darkAccent: "#BBBBBB" },
  { href: "/about",     accent: "#3D3D3D", darkAccent: "#888888" },
  { href: "/resume",    accent: "#7A7A7A", darkAccent: "#9A9A9A" },
];

export default function SectionNavCards() {
  const { t } = useI18n();
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const [ref, inView] = useInView({ threshold: 0.12 });
  const cards = t("sectionNav.cards");
  const cardData = Array.isArray(cards)
    ? cards.map((c, i) => ({ ...c, ...CARD_STRUCTURE[i], accent: isDark ? CARD_STRUCTURE[i].darkAccent : CARD_STRUCTURE[i].accent }))
    : [];

  return (
    <section className="py-20" aria-label={t("sectionNav.label")} ref={ref}>
      {/* elevated header — matches the Certifications / Testimonials register */}
      <div
        className={`mb-12 transition-all duration-600 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-4 font-mono">{t("sectionNav.label")}</p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white">{t("sectionNav.heading")}</h2>
        <p className="text-base font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-xl leading-relaxed mt-3">{t("sectionNav.intro")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E0E0E0] dark:bg-[#262626]">
        {cardData.map((card, i) => (
          <MagneticWrapper key={card.title} strength={6}>
            <Link
              href={card.href}
              className="group relative block overflow-hidden bg-white dark:bg-[#141414] p-8 h-full hover:bg-[#FAFAFA] dark:hover:bg-[#1A1A1A] transition-colors duration-300"
            >
              {/* red dot-matrix wash — blooms from the corner on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,60,60,0.22) 1px, transparent 1.6px)",
                  backgroundSize: "18px 18px",
                  WebkitMaskImage: "radial-gradient(125% 110% at 100% 100%, #000 0%, transparent 68%)",
                  maskImage: "radial-gradient(125% 110% at 100% 100%, #000 0%, transparent 68%)",
                }}
              />
              {/* giant ghosted index number (Bitcount dot-matrix glyphs) */}
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute right-3 -bottom-7 leading-none select-none text-[120px] text-[#F1F1F1] dark:text-[#272727] group-hover:text-[#F8DEDE] dark:group-hover:text-[#3A1C1C] transition-colors duration-500"
              >
                {card.num}
              </span>
              {/* red accent — draws across the foot on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full bg-[#FF3C3C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              />

              <div
                className="relative z-10"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(18px)",
                  transition: "opacity 0.6s cubic-bezier(0.2,0.7,0.2,1), transform 0.6s cubic-bezier(0.2,0.7,0.2,1)",
                  transitionDelay: `${i * 80}ms`,
                }}
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
              <h2 className="text-3xl font-semibold tracking-tight mb-3 transition-colors duration-200 text-[#1A1A1A] dark:text-white">
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
              <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A] leading-relaxed mb-6 font-light">
                {card.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {card.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-[#E8E8E8] dark:border-[#333333] px-2 py-0.5 text-[10px] tracking-wide text-[#AAAAAA] dark:text-[#888888] font-mono"
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
              </div>
            </Link>
          </MagneticWrapper>
        ))}
      </div>
    </section>
  );
}
