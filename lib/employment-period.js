/**
 * Employment period detection — AGD vs SAPOL transition.
 * Before 23 Mar 2026: AGD (ASO4) is current.
 * On or after 23 Mar 2026: SAPOL (ASO7) is current.
 */
const SAPOL_START = new Date("2026-03-23");

export function isSAPOLPeriod() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const cutoff = new Date(SAPOL_START);
  cutoff.setHours(0, 0, 0, 0);
  return now >= cutoff;
}
