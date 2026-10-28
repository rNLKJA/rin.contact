/**
 * Public (NEXT_PUBLIC_*) env values, cleaned before they reach the page.
 *
 * Values pasted into the Vercel dashboard sometimes carry the key itself
 * ("NEXT_PUBLIC_AVAILABLE_FOR=Contract,...") or a trailing newline, and those
 * strings used to render verbatim. cleanEnv strips a leading "KEY=" (the named
 * key or any upper-case env-style key), surrounding quotes and whitespace.
 *
 * Next only inlines literal `process.env.NEXT_PUBLIC_X` member access, so each
 * value is read with a literal expression below, never process.env[key].
 */

const KEY_PREFIX = /^\s*[A-Z][A-Z0-9_]*\s*=\s*/;

export function cleanEnv(value, key = "") {
  if (typeof value !== "string") return "";
  let v = value.trim();
  if (key && v.startsWith(key)) v = v.slice(key.length).replace(/^\s*=\s*/, "");
  v = v.replace(KEY_PREFIX, "");
  v = v.replace(/^(["'])(.*)\1$/s, "$2");
  return v.trim();
}

/** Returns the URL's href when it is a valid http(s) URL, otherwise null. */
export function httpUrl(value) {
  if (!value) return null;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:" ? u.href : null;
  } catch {
    return null;
  }
}

/** Comma-separated list -> trimmed, non-empty items. */
export function envList(value) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const AVAILABLE_FOR = envList(
  cleanEnv(process.env.NEXT_PUBLIC_AVAILABLE_FOR, "NEXT_PUBLIC_AVAILABLE_FOR")
);

export const CALENDLY_URL = httpUrl(
  cleanEnv(process.env.NEXT_PUBLIC_CALENDLY_URL, "NEXT_PUBLIC_CALENDLY_URL")
);
