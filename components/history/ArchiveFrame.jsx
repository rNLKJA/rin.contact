/**
 * ArchiveFrame: an archived version of rin.contact, live inside a small framed
 * "browser window". Only mounted after the visitor asks for it, so the Wayback
 * page never loads otherwise.
 *
 * The Wayback Machine allows framing (no X-Frame-Options, no frame-ancestors),
 * and next.config.js lists https://web.archive.org in frame-src. The sandbox
 * allows scripts so the old site can render, and nothing else: no popups, no
 * forms, no top-level navigation.
 *
 * On wide screens the page renders at a desktop width of 1280px and is scaled
 * down to fit the column, so it looks the way it did on a laptop. On narrow
 * screens it renders at the column's own width instead of shrinking to a blur.
 */
import { useEffect, useRef, useState } from "react";

const DESKTOP_W = 1280;
const DESKTOP_H = 800;
const SCALE_FROM = 560; // below this column width, show the page unscaled

export default function ArchiveFrame({
  id,
  archive,
  title,
  newTabLabel,
  closeLabel,
  loadingLabel,
  onClose,
}) {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaled = width >= SCALE_FROM;
  const scale = scaled ? width / DESKTOP_W : 1;

  return (
    <div
      id={id}
      className="pixel-frame mt-5 border-2 border-black dark:border-white bg-white dark:bg-[#0A0A0A] p-[3px]"
    >
      <div className="border border-[#1A1A1A] dark:border-[#CCCCCC]">
        <div className="flex items-center gap-2 min-h-[44px] pl-3 pr-1 border-b border-[#E0E0E0] dark:border-[#3D3D3D]">
          <span aria-hidden="true" className="inline-block w-1.5 h-1.5 shrink-0 bg-[#FF3C3C]" />
          <span className="flex-1 min-w-0 truncate font-display text-[10px] tracking-widest text-[#3D3D3D] dark:text-[#CCCCCC]">
            {archive.url.replace(/^https:\/\//, "")}
          </span>
          <a
            href={archive.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 min-h-[44px] inline-flex items-center px-2 text-[11px] tracking-widest uppercase text-[#6B6B6B] dark:text-[#9A9A9A] hover:text-black dark:hover:text-white
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3C3C]"
          >
            {newTabLabel} <span aria-hidden="true">&nbsp;↗</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="shrink-0 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#3D3D3D] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3C3C]"
          >
            <svg
              viewBox="0 0 7 7"
              shapeRendering="crispEdges"
              aria-hidden="true"
              className="w-3 h-3 fill-current"
            >
              <path d="M0 0h1v1H0zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 4h1v1H4zM5 5h1v1H5zM6 6h1v1H6zM6 0h1v1H6zM5 1h1v1H5zM4 2h1v1H4zM2 4h1v1H2zM1 5h1v1H1zM0 6h1v1H0z" />
            </svg>
          </button>
        </div>
        <div
          ref={boxRef}
          className="relative overflow-hidden bg-white"
          style={{ height: scaled ? Math.round(DESKTOP_H * scale) : "70vh" }}
        >
          {!loaded && (
            <p className="dot-matrix absolute inset-0 flex items-center justify-center p-6 text-center text-[12px] leading-relaxed text-[#6B6B6B]">
              {loadingLabel}
            </p>
          )}
          {width > 0 && (
            <iframe
              src={archive.frameUrl}
              title={title}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
              className="absolute top-0 left-0 border-0 bg-transparent"
              style={
                scaled
                  ? {
                      width: DESKTOP_W,
                      height: DESKTOP_H,
                      transform: `scale(${scale})`,
                      transformOrigin: "0 0",
                    }
                  : { width: "100%", height: "100%" }
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
