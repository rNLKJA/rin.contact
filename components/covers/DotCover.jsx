/**
 * DotCover — one generated dot-matrix cover (scripts/generate-covers.mjs).
 *
 * The cover is a static SVG drawn in ink (#1A1A1A); the dark theme inverts it
 * so the dots read light on black. Red lives in a separate overlay that is
 * never inverted, so it stays #FF3C3C in both themes; `red={false}` leaves it
 * off where something else already carries the red (the arch frame). Lazy by
 * default: the /projects list holds one cover per card. SVGs are served as
 * they are (unoptimized), there is nothing for the image optimiser to do.
 *
 * Extra props (data-cover, data-title, lang, ...) land on the ink <img>, the
 * element that carries the picture.
 */
import Image from "next/image";

export default function DotCover({
  src,
  redSrc = null,
  red = true,
  alt,
  width = 400,
  height = 220,
  eager = false,
  className = "",
  ...data
}) {
  const loading = eager ? "eager" : "lazy";
  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        loading={loading}
        className="absolute inset-0 h-full w-full dark:invert"
        {...data}
      />
      {red && redSrc && (
        <Image
          src={redSrc}
          alt=""
          aria-hidden="true"
          width={width}
          height={height}
          unoptimized
          loading={loading}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </span>
  );
}
