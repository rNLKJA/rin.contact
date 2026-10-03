import { getRoles, getEducation } from "@/lib/career-data";

/**
 * Per-locale CV content for /cv, read from lib/career-data.js: the same entries
 * that power /career, /resume and the resume terminal. Each entry carries its own
 * en-AU and zh-Hans copy, so there is no separate translation to keep aligned.
 *
 * Called server-side from getStaticProps (no client weight).
 */

export function buildExperience(locale, { bulletsPerRole = 3 } = {}) {
  return getRoles(locale).map((r) => ({
    id: r.id,
    role: r.role,
    org: r.org,
    period: r.period,
    location: r.location || "",
    summary: r.summary || "",
    bullets: (r.bullets || []).slice(0, bulletsPerRole),
  }));
}

export function buildEducation(locale) {
  return getEducation(locale, { includeSecondary: false }).map((e) => ({
    role: e.role,
    org: e.org,
    period: e.period,
    location: e.location || "",
  }));
}
