import katex from "katex";

/*
 * Split out from KnowledgeLayout.jsx so pages that never render maths don't
 * pull the katex JS (and its CSS, imported alongside these components) into
 * their bundle. Only the ~39 knowledge topics that use <Formula>/<TeX> import
 * from this module.
 */

/**
 * Centred display formula, rendered with KaTeX.
 * `children` is a LaTeX string (use a template literal; `\\` starts a new line,
 * and `\begin{aligned}…\end{aligned}` lays out a multi-step derivation).
 * `label` is the accessible description read by screen readers.
 * `caption` optionally annotates the formula beneath it.
 */
export function Formula({ children, label, caption }) {
  const tex = typeof children === "string" ? children : String(children ?? "");
  const html = katex.renderToString(tex, {
    displayMode: true,
    throwOnError: false,
    strict: false,
  });
  return (
    <div className="not-prose my-7">
      <div
        className="px-5 py-5 bg-[#F7F7F7] dark:bg-[#0D0D0D] border border-[#E0E0E0] dark:border-[#2A2A2A] overflow-x-auto text-[#1A1A1A] dark:text-[#E8E8E8]"
        role="math"
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {caption && (
        <p className="mt-2 text-[12px] text-[#7A7A7A] dark:text-[#6E6E6E] [text-wrap:pretty]">
          {caption}
        </p>
      )}
    </div>
  );
}

/** Inline maths, rendered with KaTeX. `children` is a LaTeX string. */
export function TeX({ children, label }) {
  const tex = typeof children === "string" ? children : String(children ?? "");
  const html = katex.renderToString(tex, {
    displayMode: false,
    throwOnError: false,
    strict: false,
  });
  return <span role="math" aria-label={label || tex} dangerouslySetInnerHTML={{ __html: html }} />;
}
