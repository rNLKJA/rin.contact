/**
 * Date formatting for career data. Fixed month tables rather than Intl, so the
 * server and the browser always render the same text (no ICU differences such
 * as "Sept") and nothing depends on the visitor's locale settings.
 */

const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parts(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

const isZh = (locale) => locale === "zh-Hans";

/** "3 Oct 2026" / "2026年10月3日" */
export function formatAsOf(iso, locale = "en-AU") {
  const { y, m, d } = parts(iso);
  return isZh(locale) ? `${y}年${m}月${d}日` : `${d} ${MONTHS_EN[m - 1]} ${y}`;
}

/** "Mar 2026" / "2026年3月" */
export function formatMonth(iso, locale = "en-AU") {
  const { y, m } = parts(iso);
  return isZh(locale) ? `${y}年${m}月` : `${MONTHS_EN[m - 1]} ${y}`;
}

/** Inclusive months between two ISO dates (Feb–Jun = 5). */
export function monthsBetween(start, end) {
  const a = parts(start);
  const b = parts(end);
  return (b.y - a.y) * 12 + (b.m - a.m) + 1;
}

/** "1 yr 3 mos" / "1年3个月". Only used for finished roles, so it never goes stale. */
export function durationLabel(start, end, locale = "en-AU") {
  const total = monthsBetween(start, end);
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  if (isZh(locale)) return `${yrs ? `${yrs}年` : ""}${mos ? `${mos}个月` : ""}`;
  const y = yrs ? `${yrs} yr${yrs > 1 ? "s" : ""}` : "";
  const mo = mos ? `${mos} mo${mos > 1 ? "s" : ""}` : "";
  return [y, mo].filter(Boolean).join(" ");
}

/** Decimal year for plotting, e.g. 2026-03-23 -> 2026.22 */
export function yearFraction(iso) {
  const { y, m, d } = parts(iso);
  return y + (m - 1) / 12 + (d - 1) / 365;
}
