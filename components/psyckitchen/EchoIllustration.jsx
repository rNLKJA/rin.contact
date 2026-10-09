/**
 * An original illustration for the Echo write-up: a smiling teacup on a
 * saucer, with steam that curls up into a speech bubble. It was drawn for this
 * site in a warm, friendly style and is not Psyckitchen's logo or artwork.
 *
 * `label` makes it an image with that accessible name. Without one it is
 * decorative and hidden from screen readers. `compact` drops the bubble and
 * the heart, for small sizes such as the chat avatar.
 */
export default function EchoIllustration({ className = "", label, compact = false }) {
  const a11y = label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": "true", focusable: "false" };
  return (
    <svg viewBox="0 0 160 160" className={className} {...a11y}>
      <circle cx="80" cy="80" r="76" fill="#FFF6E3" stroke="#F2D3A0" strokeWidth="4" />
      {!compact && (
        <>
          {/* Steam curling up towards the bubble */}
          <path
            d="M66 62 C 58 52, 74 46, 66 34"
            fill="none"
            stroke="#E9B877"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M84 60 C 78 50, 94 46, 90 36"
            fill="none"
            stroke="#E9B877"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Speech bubble with three dots */}
          <path
            d="M100 18 h34 a14 14 0 0 1 14 14 v4 a14 14 0 0 1 -14 14 h-20 l-10 9 l1 -9 h-5 a14 14 0 0 1 -14 -14 v-4 a14 14 0 0 1 14 -14 z"
            fill="#F4AA4F"
          />
          <circle cx="107" cy="34" r="3.5" fill="#FFF6E3" />
          <circle cx="119" cy="34" r="3.5" fill="#FFF6E3" />
          <circle cx="131" cy="34" r="3.5" fill="#FFF6E3" />
          {/* A small heart */}
          <path
            d="M30 52 c -4 -6, -14 -2, -9 6 l 9 9 l 9 -9 c 5 -8, -5 -12, -9 -6 z"
            fill="#F7B9A0"
          />
        </>
      )}
      {/* Saucer */}
      <ellipse cx="78" cy="126" rx="48" ry="9" fill="#F4AA4F" />
      {/* Handle */}
      <path
        d="M114 84 c 16 -2, 18 22, 0 22"
        fill="none"
        stroke="#3B2A1A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Cup */}
      <path
        d="M38 70 h80 v18 a40 34 0 0 1 -40 34 a40 34 0 0 1 -40 -34 z"
        fill="#FFFFFF"
        stroke="#3B2A1A"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M44 74 h68" stroke="#F2D3A0" strokeWidth="5" strokeLinecap="round" />
      {/* Happy closed eyes, cheeks and a smile */}
      <path
        d="M60 92 q 5 -6, 10 0 M86 92 q 5 -6, 10 0"
        fill="none"
        stroke="#3B2A1A"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="56" cy="102" r="5" fill="#F7B9A0" />
      <circle cx="100" cy="102" r="5" fill="#F7B9A0" />
      <path
        d="M70 102 q 8 8, 16 0"
        fill="none"
        stroke="#3B2A1A"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
