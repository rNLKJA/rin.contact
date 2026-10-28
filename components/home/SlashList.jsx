import { Fragment } from "react";

/** Inline list whose "/" separators never start or end a line: each item carries
 *  its separator on the left, the list is pulled left one separator width inside
 *  a clipping wrapper, so the separator at the start of every line is cut off.
 *  Items must be plain text (no links), so clipping never hides a focus ring.
 *
 *  `balance` lays the items out as inline blocks with text-wrap: balance, so the
 *  lines come out even and the last line never holds a lone item. A space between
 *  items gives the line its break points; each item pulls itself back over that
 *  space (-1ch, mono lists only) and the list starts 1ch later to match, so the
 *  spacing is the same as the flex layout. */
export default function SlashList({
  items,
  labelledBy,
  label,
  className = "",
  sepClassName = "text-[#C8C8C8] dark:text-[#4A4A4A]",
  balance = false,
}) {
  const layout = balance ? "ml-[calc(1ch_-_1.5rem)] text-balance" : "flex flex-wrap -ml-6";
  return (
    <div className="overflow-hidden">
      <ul
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : label}
        className={`m-0 p-0 list-none ${layout} ${className}`}
      >
        {items.map((it, i) => {
          const o = typeof it === "string" ? { key: it, content: it } : it;
          return (
            <Fragment key={o.key ?? i}>
              {balance && i > 0 && " "}
              <li
                className={`relative pl-6 ${balance ? "inline-block -ml-[1ch]" : ""} ${
                  o.wrap ? "" : "whitespace-nowrap"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 w-6 text-center select-none ${sepClassName}`}
                >
                  /
                </span>
                {o.content}
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
}
