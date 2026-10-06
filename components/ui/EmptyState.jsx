import React from "react";
import clsx from "clsx";

/**
 * Empty / no-results block: dashed hairline box, red square dot, the message,
 * and an optional recovery action styled like the coursework "Clear" link.
 * The message is a status live region by default; pass `role={null}` where a
 * nearby live region already announces the change.
 * Pattern from the COMP90042 status-message and INFO30005 empty-state.
 */
export default function EmptyState({ children, action, role = "status", className }) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-3 border border-dashed border-[#E0E0E0] dark:border-[#3D3D3D] px-6 py-10 text-center",
        className
      )}
    >
      <span aria-hidden="true" className="w-1.5 h-1.5 bg-[#FF3C3C]" />
      <p role={role || undefined} className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA]">
        {children}
      </p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="min-h-[24px] text-[11px] tracking-widest uppercase text-accent-ink underline decoration-transparent underline-offset-4 hover:decoration-current transition-colors duration-200"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
