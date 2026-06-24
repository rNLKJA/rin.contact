import React from "react";
import { useInView } from "@/hooks/useInView";
import { useI18n } from "@/contexts/I18nContext";

/**
 * AboutIntro — the narrative opener for the About page.
 *
 * The About page used to jump straight from its header into the Skills grid, so
 * the page people visit to learn *who* Rin is never actually said it. This adds a
 * short, first-person profile: where the work has happened (cross-sector) and the
 * one habit that runs through all of it (problem-first, not model-first). The copy
 * is the same authentic story told on the homepage hero and the operating-principle
 * band, so there is one consistent voice across the site.
 *
 * The three domains reuse the positioning band's data (Government / Research /
 * Engineering) rather than redeclaring them, so the labels can never drift apart.
 */
export default function AboutIntro() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ threshold: 0.15 });
  const domains = t("positioning.domains");

  return (
    <section ref={ref} aria-label={t("about.intro.eyebrow")} className="py-20 md:py-24">
      <div
        className={`transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="flex items-center gap-2.5 text-[11px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-6">
          <span className="block w-2 h-2 bg-[#FF3C3C]" aria-hidden="true" />
          {t("about.intro.eyebrow")}
        </p>

        <h2 className="font-editorial text-2xl md:text-[34px] leading-[1.2] tracking-tight text-black dark:text-white max-w-3xl mb-9">
          {t("about.intro.heading")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Narrative */}
          <div className="md:col-span-2 space-y-5 max-w-2xl">
            <p className="text-base md:text-lg font-light text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
              {t("about.intro.body1")}
            </p>
            <p className="text-base md:text-lg font-light text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
              {t("about.intro.body2")}
            </p>
          </div>

          {/* Domains — visual anchor, reuses the positioning band's three lines */}
          <div className="md:pt-1">
            <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] mb-4">
              {t("about.intro.domainsLabel")}
            </p>
            <ul className="space-y-3.5">
              {(Array.isArray(domains) ? domains : []).map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-3 text-sm tracking-wide text-black dark:text-white"
                >
                  <span className="block w-6 h-px bg-[#FF3C3C] flex-shrink-0" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
