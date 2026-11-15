/**
 * Guards for ProfilePage structured data. assertProfilePage() runs in
 * getStaticProps on / and /resume, so `next build` (and the Vercel deploy)
 * fails on the two faults Search Console reported for those pages in Nov 2026:
 *
 * - "Missing field 'name' (in 'mainEntity')": mainEntity was a bare
 *   { "@id": ".../#person" } with no Person on the page (/), or pointed at a
 *   partial Person with no name (/resume). It must be the full Person node
 *   from lib/person-schema.js.
 * - "Invalid datetime value for 'dateModified'": the value was a bare date
 *   ("2026-11-03"). Dates must be full ISO 8601 date-times with a UTC offset
 *   (schemaDateTime() in lib/career-format.js).
 */
const DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/;
const DATE_FIELDS = ["dateCreated", "dateModified", "datePublished"];
const MAIN_ENTITY_TYPES = ["Person", "Organization"];

const isText = (v) => typeof v === "string" && v.trim().length > 0;

/** Date.parse rolls 30 February over into March, so check the day exists. */
const isRealDay = (value) => {
  const [y, m, d] = value.slice(0, 10).split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
};

const isDateTime = (value) =>
  isText(value) && DATE_TIME.test(value) && !Number.isNaN(Date.parse(value)) && isRealDay(value);

/** Returns a list of problems; empty means the ProfilePage node is sound. */
export function profilePageProblems(page) {
  const problems = [];
  if (!page || page["@type"] !== "ProfilePage") return ["node is not a ProfilePage"];

  const entity = page.mainEntity;
  if (!entity || typeof entity !== "object" || Array.isArray(entity)) {
    problems.push("mainEntity must be a single Person or Organization node");
  } else {
    if (!MAIN_ENTITY_TYPES.includes(entity["@type"])) {
      problems.push(
        "mainEntity has no Person or Organization @type (a bare @id reference does not carry a name)"
      );
    }
    if (!isText(entity.name)) problems.push("mainEntity.name is missing");
  }

  for (const field of DATE_FIELDS) {
    const value = page[field];
    if (value === undefined) continue;
    if (!isDateTime(value)) {
      problems.push(
        `${field} must be an ISO 8601 date-time with a UTC offset, got ${JSON.stringify(value)}`
      );
    }
  }
  return problems;
}

/** Throws (failing the build) when a ProfilePage node has problems. */
export function assertProfilePage(page, where = "page") {
  const problems = profilePageProblems(page);
  if (problems.length) {
    throw new Error(
      `ProfilePage structured data on ${where} failed its checks:\n- ${problems.join("\n- ")}`
    );
  }
}
