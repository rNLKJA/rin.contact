import React from "react";
import clsx from "clsx";
import { useRovingFocus } from "@/hooks/useRovingFocus";

/**
 * WAI-ARIA APG tabs on the shared roving-focus hook. One tab stop; arrows move
 * between tabs (Home/End jump). `activation="auto"` selects as focus moves;
 * `"manual"` only moves focus and Enter/Space selects (native button).
 * Styling stays with the caller: `tabClassName(selected, index)` and
 * `renderTab(item, selected, index)` keep each site's own look.
 * Pair with `tabPanelProps(idBase, value)` on the panel.
 */
export default function Tabs({
  idBase,
  label,
  items,
  value,
  onChange,
  activation = "auto",
  className,
  tabClassName,
  tabStyle,
  renderTab,
}) {
  const activeIndex = items.findIndex((it) => it.id === value);
  const { getItemProps } = useRovingFocus({
    count: items.length,
    activeIndex,
    onMove: activation === "auto" ? (next) => onChange(items[next].id) : undefined,
  });

  return (
    <div role="tablist" aria-label={label} className={className}>
      {items.map((it, i) => {
        const selected = it.id === value;
        return (
          <button
            key={it.id}
            type="button"
            role="tab"
            id={`${idBase}-tab-${it.id}`}
            aria-selected={selected}
            aria-controls={`${idBase}-panel`}
            {...getItemProps(i)}
            onClick={() => onChange(it.id)}
            className={clsx(
              typeof tabClassName === "function" ? tabClassName(selected, i) : tabClassName
            )}
            style={typeof tabStyle === "function" ? tabStyle(selected, i) : tabStyle}
          >
            {renderTab ? renderTab(it, selected, i) : it.label}
          </button>
        );
      })}
    </div>
  );
}

/** Props for the panel a <Tabs> strip controls. */
export function tabPanelProps(idBase, value) {
  return {
    role: "tabpanel",
    id: `${idBase}-panel`,
    "aria-labelledby": `${idBase}-tab-${value}`,
    tabIndex: 0,
  };
}
