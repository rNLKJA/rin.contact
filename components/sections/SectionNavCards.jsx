/**
 * SectionNavCards — four magnetic cards on the homepage that route visitors
 * to Career, Projects, Lab, and About subpages.
 */
import Link from "next/link";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";

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
  const cards = t("sectionNav.cards");
  const cardData = Array.isArray(cards)
    ? cards.map((c, i) => ({ ...c, ...CARD_STRUCTURE[i], accent: isDark ? CARD_STRUCTURE[i].darkAccent : CARD_STRUCTURE[i].accent }))
    : [];

  return (
    <section className="py-20" aria-label={t("sectionNav.label")}>
      <p className="text-xs tracking-widest uppercase text-[#7A7A7A] mb-10">{t("sectionNav.label")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E0E0E0] dark:bg-[#262626]">
        {cardData.map((card) => (
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
            </Link>
          </MagneticWrapper>
        ))}
      </div>
    </section>
  );
}
