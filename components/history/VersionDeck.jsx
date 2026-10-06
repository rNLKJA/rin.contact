/**
 * VersionDeck: one slide per version of the site, no carousel library.
 *
 * The track is a horizontal scroll-snap strip, so touch swiping is native. Prev
 * and Next scroll it (instantly under reduced motion), a scroll listener keeps
 * the active slide in sync with whatever the visitor swiped to, and the
 * version picker is a roving-tabindex row (hooks/useRovingFocus). Arrow keys
 * anywhere in the deck move between slides. A polite live region announces the
 * active slide. Images after the first load lazily.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useI18n } from "@/contexts/I18nContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRovingFocus } from "@/hooks/useRovingFocus";
import { fill } from "@/lib/fill";

const ArchiveFrame = dynamic(() => import("./ArchiveFrame"), { ssr: false });

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3C3C]";
const LINK = `min-h-[44px] inline-flex items-center text-[11px] font-mono tracking-widest uppercase text-[#3D3D3D] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors ${FOCUS_RING}`;

function formatDate(iso, locale) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    ...(d ? { day: "numeric" } : {}),
    timeZone: "UTC",
  }).format(date);
}

const tsToIso = (ts) => `${ts.slice(0, 4)}-${ts.slice(4, 6)}-${ts.slice(6, 8)}`;

const CAPTION_KEY = {
  readme: "readme",
  wayback: "wayback",
  "local-build": "localBuild",
  production: "production",
};

function Slide({ v, i, total, lang, locale, t, archiveOpen, onToggleArchive, slideRef }) {
  const copy = v[lang];
  const img = v.image;
  const frameId = `archive-${v.id}`;
  const caption = img
    ? fill(t(`infoHistory.captions.${CAPTION_KEY[img.source]}`), {
        date: formatDate(img.capturedAt, locale),
        version: v.version,
      })
    : null;

  return (
    <div
      ref={slideRef}
      role="group"
      aria-roledescription={t("infoHistory.slideRole")}
      aria-label={fill(t("infoHistory.slideOf"), { n: i + 1, total, version: v.version })}
      className="snap-start shrink-0 w-full min-w-0"
    >
      <figure>
        <div className="pixel-frame border-2 border-black dark:border-white bg-white dark:bg-[#0A0A0A] p-[3px]">
          <div className="border border-[#1A1A1A] dark:border-[#CCCCCC]">
            <div className="flex items-center gap-2 h-8 px-3 border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
              <span aria-hidden="true" className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#FF3C3C]" />
                <span className="w-1.5 h-1.5 border border-[#6B6B6B] dark:border-[#9A9A9A]" />
                <span className="w-1.5 h-1.5 border border-[#6B6B6B] dark:border-[#9A9A9A]" />
              </span>
              <span className="font-display text-[10px] tracking-widest text-[#6B6B6B] dark:text-[#9A9A9A]">
                rin.contact · {v.version}
              </span>
            </div>
            <div className="relative aspect-[16/10] bg-[#F5F5F5] dark:bg-[#141414] overflow-hidden">
              {img ? (
                <>
                  <Image
                    src={img.src}
                    alt={copy.alt}
                    fill
                    sizes="(min-width: 768px) 620px, 100vw"
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                    className={img.w / img.h === 1.6 ? "object-cover object-top" : "object-contain"}
                  />
                  {img.mobileSrc && (
                    <div className="hidden md:block absolute right-3 bottom-3 w-[84px] aspect-[390/844] border-2 border-black dark:border-white bg-white overflow-hidden">
                      <Image
                        src={img.mobileSrc}
                        alt={fill(t("infoHistory.mobileAlt"), { version: v.version })}
                        fill
                        sizes="84px"
                        loading="lazy"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="dot-matrix absolute inset-0 flex items-center justify-center p-6">
                  <p className="max-w-[36ch] text-center text-sm leading-relaxed text-[#3D3D3D] dark:text-[#CCCCCC] bg-white dark:bg-[#0A0A0A] border border-[#E0E0E0] dark:border-[#3D3D3D] px-4 py-3">
                    {t("infoHistory.noCapture")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {caption && (
          <figcaption className="mt-2 text-[11px] leading-relaxed text-ink-subtle">
            {caption}
          </figcaption>
        )}
      </figure>

      <div className="mt-6">
        <p className="font-display text-[11px] tracking-widest uppercase text-accent-ink">
          {v.version} · {copy.dates}
        </p>
        <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-[#1A1A1A] dark:text-white">
          {copy.title}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={t("infoHistory.stackLabel")}>
          {v.stack.map((s) => (
            <li
              key={s}
              className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-2 py-0.5 font-mono text-[11px] text-[#3D3D3D] dark:text-[#CCCCCC]"
            >
              {s}
            </li>
          ))}
        </ul>
        <dl className="mt-5 space-y-4">
          <div>
            <dt className="text-[10px] font-mono tracking-widest uppercase text-ink-subtle mb-1">
              {t("infoHistory.changedLabel")}
            </dt>
            <dd className="text-sm leading-relaxed text-[#3D3D3D] dark:text-[#CCCCCC]">
              {copy.changed}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-mono tracking-widest uppercase text-ink-subtle mb-1">
              {t("infoHistory.thinkingLabel")}
            </dt>
            <dd className="text-sm leading-relaxed text-[#3D3D3D] dark:text-[#CCCCCC]">
              {copy.thinking}
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
            {fill(t("infoHistory.source"), { version: v.version })}
            <span aria-hidden="true">&nbsp;↗</span>
          </a>
          {v.archive && (
            <>
              <button
                type="button"
                onClick={onToggleArchive}
                aria-expanded={archiveOpen}
                aria-controls={archiveOpen ? frameId : undefined}
                className={LINK}
              >
                {fill(t(archiveOpen ? "infoHistory.hideArchived" : "infoHistory.viewArchived"), {
                  date: formatDate(tsToIso(v.archive.ts), locale),
                })}
              </button>
              <a href={v.archive.url} target="_blank" rel="noopener noreferrer" className={LINK}>
                {t("infoHistory.openNewTab")}
                <span aria-hidden="true">&nbsp;↗</span>
              </a>
            </>
          )}
        </div>
        {v.archive && archiveOpen && (
          <ArchiveFrame
            id={frameId}
            archive={v.archive}
            title={fill(t("infoHistory.archiveTitle"), {
              version: v.version,
              date: formatDate(tsToIso(v.archive.ts), locale),
            })}
            newTabLabel={t("infoHistory.openNewTab")}
            closeLabel={t("infoHistory.closeArchive")}
            loadingLabel={t("infoHistory.archiveLoading")}
            onClose={onToggleArchive}
          />
        )}
      </div>
    </div>
  );
}

export default function VersionDeck({ versions }) {
  const { t, locale = "en-AU" } = useI18n();
  const lang = locale === "zh-Hans" ? "zh" : "en";
  const reduced = useReducedMotion();
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [openArchive, setOpenArchive] = useState(null);
  const total = versions.length;

  // While Prev/Next or the picker scrolls the track, the slides it passes on
  // the way must not become active (the height and the announcement would
  // flicker through them).
  const targetRef = useRef(null);
  const targetTimer = useRef(0);

  const goTo = useCallback(
    (i) => {
      const next = Math.max(0, Math.min(total - 1, i));
      const track = trackRef.current;
      const slide = slideRefs.current[next];
      setActive(next);
      if (track && slide && track.scrollLeft !== slide.offsetLeft) {
        targetRef.current = next;
        // If a swipe interrupts the scroll, stop waiting for the target.
        clearTimeout(targetTimer.current);
        targetTimer.current = setTimeout(() => {
          targetRef.current = null;
        }, 1200);
        track.scrollTo({ left: slide.offsetLeft, behavior: reduced ? "auto" : "smooth" });
      }
    },
    [total, reduced]
  );

  // Follow swipes: the slide nearest the track's scroll position is active.
  // Measured from scrollLeft rather than an IntersectionObserver ratio, which
  // drops below any threshold when a slide is taller than the track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const [first, second] = slideRefs.current;
        const step = first && second ? second.offsetLeft - first.offsetLeft : track.clientWidth;
        const nearest = Math.max(0, Math.min(total - 1, Math.round(track.scrollLeft / step)));
        if (targetRef.current !== null) {
          if (nearest !== targetRef.current) return;
          if (Math.abs(track.scrollLeft - slideRefs.current[nearest].offsetLeft) > 2) return;
          targetRef.current = null;
        }
        setActive(nearest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [total]);

  // The track takes the active slide's height, so a short slide does not sit
  // above the blank space of the longest one. Re-measured when a slide resizes
  // (fonts, images, the archive frame opening).
  const [height, setHeight] = useState(null);
  useEffect(() => {
    const slide = slideRefs.current[active];
    if (!slide || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => setHeight(slide.offsetHeight));
    ro.observe(slide);
    return () => ro.disconnect();
  }, [active]);

  const { getItemProps } = useRovingFocus({ count: total, activeIndex: active, onMove: goTo });

  const onKeyDown = (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const NAV_BTN = `min-h-[44px] min-w-[44px] inline-flex items-center justify-center border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#1A1A1A] dark:text-white hover:border-black dark:hover:border-white disabled:opacity-40 disabled:hover:border-[#E0E0E0] dark:disabled:hover:border-[#3D3D3D] transition-colors ${FOCUS_RING}`;

  return (
    <section
      aria-roledescription={t("infoHistory.deckRole")}
      aria-label={t("infoHistory.deckLabel")}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <div
          role="group"
          aria-label={t("infoHistory.pickLabel")}
          className="flex flex-wrap gap-0.5"
        >
          {versions.map((v, i) => (
            <button
              key={v.id}
              type="button"
              {...getItemProps(i)}
              onClick={() => goTo(i)}
              aria-current={i === active ? "true" : undefined}
              aria-label={fill(t("infoHistory.slideOf"), { n: i + 1, total, version: v.version })}
              className={`min-h-[44px] min-w-[44px] px-2 font-display text-[12px] tracking-widest uppercase border-2 transition-colors ${FOCUS_RING} ${
                i === active
                  ? "border-black dark:border-white bg-black text-white dark:bg-white dark:text-black"
                  : "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#CCCCCC] hover:border-black dark:hover:border-white"
              }`}
            >
              {v.version}
            </button>
          ))}
        </div>
        <div className="flex shrink-0">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label={t("infoHistory.prev")}
            className={NAV_BTN}
          >
            <span aria-hidden="true" className="font-display">
              ◂
            </span>
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            aria-label={t("infoHistory.next")}
            className={`${NAV_BTN} -ml-px`}
          >
            <span aria-hidden="true" className="font-display">
              ▸
            </span>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative flex items-start gap-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={height ? { height } : undefined}
      >
        {versions.map((v, i) => (
          <Slide
            key={v.id}
            v={v}
            i={i}
            total={total}
            lang={lang}
            locale={locale}
            t={t}
            archiveOpen={openArchive === v.id}
            onToggleArchive={() => setOpenArchive((cur) => (cur === v.id ? null : v.id))}
            slideRef={(el) => {
              slideRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {fill(t("infoHistory.slideOf"), {
          n: active + 1,
          total,
          version: versions[active].version,
        })}
        {`. ${versions[active][lang].title}`}
      </p>
    </section>
  );
}
