import React from "react";
import clsx from "clsx";
import { useRovingFocus } from "@/hooks/useRovingFocus";

/**
 * Single-choice segmented switch: a radiogroup with one tab stop, where the
 * arrow keys select and wrap. Square hairline segments with 1px dividers;
 * the checked segment uses the site's inverted selected state.
 * Pass `value` undefined until it is known (e.g. before mount) so server and
 * client markup match: nothing is checked and the first option is tabbable.
 * Ported from the COMP20008 coursework Segmented control.
 */
export default function Segmented({
  label,
  labelledBy,
  options,
  value,
  onChange,
  size = "md",
  className,
}) {
  const activeIndex = options.findIndex((o) => o.value === value);
  const { getItemProps } = useRovingFocus({
    count: options.length,
    activeIndex,
    onMove: (next) => onChange(options[next].value),
    vertical: true,
  });

  return (
    <div
      role="radiogroup"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
      className={clsx(
        "inline-flex border border-[#E0E0E0] dark:border-[#3D3D3D] divide-x divide-[#E0E0E0] dark:divide-[#3D3D3D]",
        className
      )}
    >
      {options.map((o, i) => {
        const checked = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={o.ariaLabel}
            lang={o.lang}
            {...getItemProps(i)}
            onClick={() => onChange(o.value)}
            className={clsx(
              "inline-flex items-center justify-center text-[10px] tracking-widest uppercase whitespace-nowrap transition-colors duration-150",
              size === "sm" ? "min-h-[32px] px-2.5" : "min-h-[36px] px-3",
              checked
                ? "bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black"
                : "text-[#3D3D3D] dark:text-[#AAAAAA] hover:text-black dark:hover:text-white"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
