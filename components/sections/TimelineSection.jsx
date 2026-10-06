import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { useI18n } from "@/contexts/I18nContext";
import { getRoles, getEducation, getVolunteer } from "@/lib/career-data";

// Career, education and volunteering data live in lib/career-data.js, shared with
// /resume, /cv and the resume terminal. Each entry carries en-AU and zh-Hans copy.

function TimelineItem({ item, index }) {
  const { t } = useI18n();
  const [ref, inView] = useInView();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      id={item.anchor}
      className={`relative pl-8 pb-12 scroll-mt-24 transition-all duration-200 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1.5"
      }`}
      style={{ transitionDelay: `${Math.min(index * 30, 100)}ms` }}
    >
      {/* Timeline dot — centred on the 1px track line */}
      <div
        className={`absolute left-0 md:-left-5 top-1.5 w-2 h-2 rounded-full border ${
          item.current
            ? "bg-[#FF3C3C] border-[#FF3C3C]"
            : "bg-white dark:bg-[#0A0A0A] border-[#3D3D3D] dark:border-[#7A7A7A]"
        }`}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start gap-4">
        {item.logo ? (
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={`relative w-9 h-9 overflow-hidden flex items-center justify-center bg-white dark:bg-[#0A0A0A] ${
                item.noBorder || (item.org && item.org.includes("CSIRO"))
                  ? ""
                  : "border border-[#E0E0E0] dark:border-[#3D3D3D]"
              }`}
              style={{ borderRadius: "22%" }}
            >
              <Image
                src={item.logo}
                alt={`${item.org} logo`}
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          /* No logo yet (e.g. Mapiva): a monogram tile keeps the rows aligned */
          <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
            <div
              className="w-9 h-9 flex items-center justify-center border border-[#E0E0E0] dark:border-[#3D3D3D] font-display text-base text-accent-ink"
              style={{ borderRadius: "22%" }}
            >
              {(item.orgShort || item.org).slice(0, 1)}
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
              {item.period}
            </span>
            {item.tag && (
              <span className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-xs tracking-wider uppercase text-[#6E6E6E] dark:text-[#9A9A9A]">
                {item.tag}
              </span>
            )}
            {item.current && (
              <span className="border border-[#FF3C3C] px-2 py-0.5 text-xs tracking-wider uppercase text-accent-ink">
                {t("timeline.badgeCurrent")}
              </span>
            )}
            {item.future && (
              <span className="border border-[#7A7A7A] px-2 py-0.5 text-xs tracking-wider uppercase text-[#6E6E6E]">
                Future
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold leading-tight">{item.role}</h3>
          <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] mb-1">{item.org}</p>
          {item.orgDesc && (
            <p className="text-xs text-[#6E6E6E] dark:text-[#9A9A9A] mb-3 italic">{item.orgDesc}</p>
          )}

          <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-3">
            {item.summary}
          </p>

          {/* Expandable detail */}
          {item.bullets && (
            <>
              <button
                onClick={() => setExpanded((e) => !e)}
                className="text-xs tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white
                           transition-colors duration-200 flex items-center gap-1 mb-3"
                aria-expanded={expanded}
              >
                {expanded ? t("timeline.detailsLess") : t("timeline.detailsMore")}
              </button>

              {expanded && (
                <div className="animate-fade-in">
                  <ul className="space-y-1.5 mb-3">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[#3D3D3D] dark:text-[#AAAAAA]">
                        <span className="text-[#FF3C3C] flex-shrink-0 mt-0.5" aria-hidden="true">
                          ·
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {item.tools && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((t) => (
                        <span
                          key={t}
                          className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 text-xs text-[#6E6E6E] dark:text-[#9A9A9A]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const { t, locale = "en-AU" } = useI18n();
  const [ref, inView] = useInView();
  const [tab, setTab] = useState("career");
  const timelineRef = useRef(null);
  const lineElRef = useRef(null); // direct DOM ref — no React state on scroll
  const sectionDocTop = useRef(0); // absolute document-top (doesn't change on scroll)
  const sectionHeight = useRef(0); // cached height

  useEffect(() => {
    const handler = (e) => setTab(e.detail.tab);
    window.addEventListener("timeline-tab", handler);
    return () => window.removeEventListener("timeline-tab", handler);
  }, []);

  // Animate the timeline line drawing down as user scrolls through it
  useEffect(() => {
    const el = timelineRef.current;
    const lineEl = lineElRef.current;
    if (!el || !lineEl) return;

    lineEl.style.height = "0%"; // reset when tab changes

    const update = () => {
      const windowH = window.innerHeight;
      const rectTop = sectionDocTop.current - window.scrollY;
      const progress = Math.min(
        Math.max((windowH - rectTop) / (sectionHeight.current + windowH * 0.3), 0),
        1
      );
      lineEl.style.height = `${progress * 100}%`;
    };

    // Defer getBCR to rAF — avoids forced reflow when layout may be invalid.
    let rafScheduled = false;
    const measure = () => {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        const currentEl = timelineRef.current;
        if (!currentEl || !lineElRef.current) return;
        const rect = currentEl.getBoundingClientRect();
        sectionDocTop.current = rect.top + window.scrollY;
        sectionHeight.current = rect.height;
        update();
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [tab]); // re-run when tab changes so line resets

  // Localised data; a role is current when it has no end date. Career items get
  // an anchor (#role-<id>) so /resume can link straight to them.
  const CAREER = getRoles(locale).map((r) => ({ ...r, anchor: `role-${r.id}` }));
  const EDUCATION = getEducation(locale);
  const VOLUNTEER = getVolunteer(locale);

  const items = tab === "career" ? CAREER : tab === "education" ? EDUCATION : VOLUNTEER;

  return (
    <section id="timeline" className="py-24 relative" aria-label={t("timeline.sectionLabel")}>
      {/* Section header */}
      <div
        ref={ref}
        className={`mb-16 transition-all duration-200 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-70 translate-y-1.5"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] mb-3">
          {t("timeline.sectionLabel")}
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          {t("timeline.heading")}
        </h2>
        <p className="text-base font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-xl leading-relaxed">
          {t("timeline.intro")}
        </p>

        {/* Tab switcher */}
        <div className="flex gap-0 mt-8 border border-[#E0E0E0] dark:border-[#3D3D3D] w-fit">
          {["career", "education", "volunteer"].map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`px-6 py-2 text-xs tracking-widest uppercase transition-colors duration-200 ${
                tab === tabKey
                  ? "bg-[#CC0000] text-white border-[#CC0000]"
                  : "bg-white dark:bg-[#0A0A0A] text-[#6E6E6E] dark:text-[#9A9A9A] hover:text-[#FF3C3C]"
              }`}
            >
              {t(
                tabKey === "career"
                  ? "timeline.tabCareer"
                  : tabKey === "education"
                    ? "timeline.tabEducation"
                    : "timeline.tabVolunteer"
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative" ref={timelineRef}>
        {/* Static track — offset right on desktop to make room for year labels */}
        <div className="timeline-line md:left-16" aria-hidden="true" />
        {/* Animated fill — height written directly via lineElRef, no React state */}
        <div
          ref={lineElRef}
          aria-hidden="true"
          className="absolute left-0 md:left-16 top-0 w-px bg-[#FF3C3C] pointer-events-none"
          style={{ transition: "height 0.1s linear" }}
        />
        <div className="md:pl-20 pl-0">
          {items.map((item, i) => {
            const prevItem = items[i - 1];
            const showYearLabel = i === 0 || item.year !== prevItem?.year;
            return (
              <div key={`${tab}-${i}`} className="relative">
                {/* Year label on the left rail — desktop only */}
                {showYearLabel && (
                  <div
                    className="hidden md:block absolute -left-20 top-2 w-14 text-right"
                    aria-hidden="true"
                  >
                    <span className="text-[10px] tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] font-medium">
                      {item.year}
                    </span>
                  </div>
                )}
                <TimelineItem item={item} index={i} isEdu={tab === "education"} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
