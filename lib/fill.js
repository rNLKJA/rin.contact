/** Fill "{name}" placeholders in a localised string: fill("{a} of {b}", { a: 1, b: 2 }). */
export function fill(template, vars = {}) {
  return String(template ?? "").replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match
  );
}

/**
 * Join names the way the locale reads them ("A, B and C" / "A、B 和 C"). The
 * separator and the final conjunction come from the locale files.
 */
export function joinNames(names, { separator, conjunction }) {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(separator)}${conjunction}${names[names.length - 1]}`;
}
