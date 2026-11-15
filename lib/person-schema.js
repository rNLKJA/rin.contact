/**
 * The one Person entity behind the site's structured data (rin.contact/#person).
 *
 * A ProfilePage must build its mainEntity from this node, so the entity always
 * carries its name. Google reads structured data page by page: a bare
 * { "@id": ".../#person" } reference only resolves when the full node is on
 * the same page, and a second Person node that repeats the @id without a name
 * is what Search Console reports as "Missing field 'name' (in 'mainEntity')".
 * So nest PERSON_NODE, or personWithout() the fields a page should not carry,
 * rather than writing a partial Person by hand. /, /resume and /about use it.
 */
import { ogImageUrl } from "./og";

export const PERSON_ID = "https://rin.contact/#person";

/** The Person node without @context: for mainEntity, or as an @graph member. */
export const PERSON_NODE = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Sunchuangyu (Rin) Huang",
  alternateName: [
    "Rin Huang",
    "黄孙创宇",
    "黄孙 Rin",
    "Sunchuangyu Huang",
    "Huang Sunchuangyu",
    "HUANG SUNCHUANGYU",
    "HUANGSUNCHUANGYU",
    "HUANG SUN CHUANG YU",
    "Huang Sun Chuang Yu",
    "Sun Chuang Yu Huang",
  ],
  givenName: "Sunchuangyu",
  additionalName: "Rin",
  familyName: "Huang",
  url: "https://rin.contact",
  image: ogImageUrl({
    title: "Rin Huang",
    subtitle: "Senior Data Analyst @ SAPOL",
    section: "home",
    path: "/",
  }),
  email: "huang@rin.contact",
  gender: "Male",
  nationality: { "@type": "Country", name: "Australia" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressRegion: "SA",
    addressCountry: "AU",
  },
  homeLocation: [
    {
      "@type": "Place",
      name: "Adelaide, South Australia, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -34.9285, longitude: 138.6007 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Adelaide",
        addressRegion: "SA",
        addressCountry: "AU",
      },
    },
    {
      "@type": "Place",
      name: "Melbourne, Victoria, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -37.8136, longitude: 144.9631 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Melbourne",
        addressRegion: "VIC",
        addressCountry: "AU",
      },
    },
    {
      "@type": "Place",
      name: "Sydney, New South Wales, Australia",
      geo: { "@type": "GeoCoordinates", latitude: -33.8688, longitude: 151.2093 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sydney",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
    },
    {
      "@type": "Place",
      name: "Anshun, Guizhou, China",
      geo: { "@type": "GeoCoordinates", latitude: 26.2457, longitude: 105.9468 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Anshun",
        addressRegion: "Guizhou",
        addressCountry: "CN",
      },
    },
  ],
  workLocation: {
    "@type": "Place",
    name: "Adelaide, South Australia, Australia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adelaide",
      addressRegion: "SA",
      addressCountry: "AU",
    },
  },
  jobTitle: "ASO7 Senior Data Analyst",
  hasOccupation: {
    "@type": "Occupation",
    name: "Senior Data Analyst",
    description:
      "Produces statistical reports, workflow reviews and analytics tooling for the Ethical and Professional Standards Branch of South Australia Police, including the quarterly Use of Force and Vehicle Pursuit reports.",
    occupationLocation: { "@type": "City", name: "Adelaide" },
    skills:
      "Python, R, SQL, Power BI, Statistical Modelling, Strategic Intelligence, GIS, Machine Learning",
  },
  knowsLanguage: [
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Mandarin Chinese", alternateName: "zh" },
  ],
  worksFor: [
    {
      "@type": "GovernmentOrganization",
      name: "South Australia Police",
      alternateName: "SAPOL",
      url: "https://www.police.sa.gov.au",
      department: {
        "@type": "GovernmentOrganization",
        name: "Ethical and Professional Standards Branch",
        alternateName: "EPSB",
      },
    },
  ],
  // Past roles sit in alumniOf as an OrganizationRole with start and end dates,
  // so worksFor lists current employers only. Mapiva's development wrapped in
  // October 2026 with a working alpha test build.
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Melbourne",
      url: "https://www.unimelb.edu.au",
    },
    {
      "@type": "OrganizationRole",
      roleName: "Co-Founder & Dev Lead",
      startDate: "2025-08",
      endDate: "2026-10",
      alumniOf: {
        "@type": "Organization",
        name: "Mapiva",
        description:
          "Melbourne startup behind a map-first social discovery app, co-founded by Rin. Development wrapped in October 2026 with a working alpha test build.",
        founder: { "@id": PERSON_ID },
      },
    },
  ],
  knowsAbout: [
    "Data Science",
    "Statistical Analysis",
    "Strategic Intelligence",
    "Python",
    "Machine Learning",
    "Full-Stack Web Development",
    "Mobile Development",
    "Cloud Infrastructure",
    "Government Analytics",
    "Research Software Engineering",
  ],
  sameAs: [
    "https://github.com/rNLKJA",
    "https://linkedin.com/in/sunchuangyuhuang",
    "https://www.instagram.com/chuangyu_hscy/",
    "https://twitter.com/rNLKJA",
    "https://buymeacoffee.com/rNLKJA",
  ],
  // mainEntityOfPage declares rin.contact as THE primary web page for this person entity.
  // This is the key signal that lets Google favour rin.contact over LinkedIn in name searches.
  mainEntityOfPage: { "@id": "https://rin.contact/#profilepage" },
  subjectOf: { "@id": "https://rin.contact/#profilepage" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "huang@rin.contact",
    contactType: "professional enquiries",
    availableLanguage: [
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "Mandarin Chinese" },
    ],
  },
  description:
    "Sunchuangyu (Rin) Huang, also known as 黄孙创宇 (黄孙 Rin), Huang Sunchuangyu, HUANG SUNCHUANGYU and HUANGSUNCHUANGYU, is an ASO7 Senior Data Analyst at South Australia Police working across data science, strategic intelligence and research software engineering, and co-founded the Melbourne startup Mapiva.",
};

/**
 * PERSON_NODE without the named properties, for a page where they do not apply.
 * A ProfilePage leaves out "image": the only image is the generated share card
 * under /api/og/, which robots.txt blocks and which is not a profile photo, and
 * Google's ProfilePage guide says to omit the field rather than supply a
 * stand-in. Put it back once there is a real photo at a crawlable URL.
 */
export function personWithout(...keys) {
  return Object.fromEntries(Object.entries(PERSON_NODE).filter(([key]) => !keys.includes(key)));
}

/** A standalone JSON-LD document, for a page that carries the Person on its own. */
export const PERSON_SCHEMA = { "@context": "https://schema.org", ...PERSON_NODE };
