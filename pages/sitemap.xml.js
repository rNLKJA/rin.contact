/**
 * Dynamic sitemap for rin.contact
 * Version: 5.18.9 — Sunchuangyu (Rin) Huang 黄孙创宇 | Huang Sunchuangyu | HUANGSUNCHUANGYU | 黄孙 Rin
 *
 * Sections documented:
 *   Profile · Career Map · Projects · Skills · Dataset Card · Intelligence · FAQ · Contact
 *   Pages: /card · /hire-me · /coffee · /roast · /secret · dark/light theme · boot overlay
 */

const BASE_URL = "https://rin.contact";
const VERSION  = "5.18.9";
const AUTHOR   = "Sunchuangyu (Rin) Huang | Huang Sunchuangyu | 黄孙创宇 | 黄孙 Rin | HUANGSUNCHUANGYU | HUANG SUN CHUANG YU | SUN CHUANG YU HUANG | Sunchuangyu Huang";

// ─── Images to register with Google Image Search ─────────────────────────────
// All logos / assets associated with this page (external CDN images are allowed)
const IMAGES = [
  // ── Site identity ──
  {
    loc:     `${BASE_URL}/images/meta-image.png`,
    title:   "Rin Huang — Portfolio",
    caption: "Rin Huang — Sunchuangyu Huang | Huang Sunchuangyu | 黄孙创宇 | 黄孙 Rin | HUANGSUNCHUANGYU — Senior Data Analyst & Research Software Engineer, Adelaide, Australia",
    license: `${BASE_URL}/`,
  },
  // ── Career ──
  {
    loc:     "https://upload.wikimedia.org/wikipedia/commons/e/e0/Coat_of_arms_of_the_South_Australia_Police.svg",
    title:   "South Australia Police",
    caption: "Rin Huang — ASO7 Senior Data Analyst at South Australia Police (SAPOL), Professional & Ethical Standards Branch, 23 Mar 2026–Present",
    license: "https://www.police.sa.gov.au",
  },
  {
    loc:     "https://media.licdn.com/dms/image/v2/C560BAQEbZveHn7HVCQ/company-logo_200_200/company-logo_200_200/0/1630651674988/attorney_generals_logo?e=2147483647&v=beta&t=V5cMKtM1QRUW0fqwpysEvD4iHxPO5FmaPoXIJpNQs5c",
    title:   "Attorney-General's Department SA — Consumer and Business Services",
    caption: "Rin Huang — ASO4 Intelligence & Coordination Officer at Consumer and Business Services (CBS), Attorney-General's Department SA, Jan 2025–20 Mar 2026",
    license: "https://www.agd.sa.gov.au",
  },
  {
    loc:     "https://yt3.googleusercontent.com/wD1YaCDSytQDbDcSAkR21j8IQTl9lyC6LDr3p5ZC2yGX-RzU1ayGmn6swOS_LLzMKpvyA--UJQY=s176-c-k-c0x00ffffff-no-rj-mo",
    title:   "University of Melbourne",
    caption: "Rin Huang — Research Assistant (MoodQ, Psychiatry Dept), Master of Data Science, Bachelor of Science, and STEM Mentor at the University of Melbourne",
    license: "https://www.unimelb.edu.au",
  },
  {
    loc:     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRIgIQHaq6ZhUDwJUqfFa5xZJ9Tn5f6YLBA&s",
    title:   "WEHI — Walter and Eliza Hall Institute of Biomedical Research",
    caption: "Rin Huang — Software Engineer Intern (Data Science) in Bioinformatics at WEHI, Feb–Jul 2024. Automated flow cytometry pipelines and contributed to open-source celseq2.",
    license: "https://www.wehi.edu.au",
  },
  {
    loc:     "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/CSIRO_Logo.svg/120px-CSIRO_Logo.svg.png?_=20210607115415",
    title:   "CSIRO — Australia's National Science Agency",
    caption: "Rin Huang — Data Science Industrial Consultant at CSIRO Climate & Earth Systems, Feb–Nov 2023. Built AR time series models for ENSO climate-economic research.",
    license: "https://www.csiro.au",
  },
  {
    loc:     "https://s3-symbol-logo.tradingview.com/csl--600.png",
    title:   "CSL (CSL Behring)",
    caption: "Rin Huang — Data Analyst & Agile Leader at CSL Behring R&D, Feb–Jun 2022. Applied Python automation and unsupervised clustering to HPLC medical research data.",
    license: "https://www.csl.com",
  },
  // ── Education ──
  {
    loc:     "https://media.licdn.com/dms/image/v2/C560BAQHbsXv7y0802A/company-logo_200_200/company-logo_200_200/0/1630627937392/trinityunimelb_logo?e=2147483647&v=beta&t=L-l1ISC0casA8uKqb1QYyFZWMyfe9n8A_tuT_MyOG_c",
    title:   "Trinity College, University of Melbourne",
    caption: "Rin Huang — Foundation Studies Programme at Trinity College, University of Melbourne, 2018–2019",
    license: "https://www.trinity.unimelb.edu.au",
  },
];

// ─── Career timeline ──────────────────────────────────────────────────────────
const CAREER = [
  { role: "ASO7 Senior Data Analyst",                  org: "South Australia Police",                                     period: "23 Mar 2026–Present", location: "Adelaide, SA" },
  { role: "ASO4 Intelligence & Coordination Officer",  org: "Consumer and Business Services, Attorney-General's Dept SA", period: "Jan 2025–20 Mar 2026",location: "Adelaide, SA" },
  { role: "Research Assistant — MoodQ",                org: "University of Melbourne, Psychiatry Dept",                   period: "Aug 2024–Feb 2026",   location: "Parkville, VIC" },
  { role: "Software Engineer Intern (Data Science)",   org: "WEHI",                                                       period: "Feb 2024–Jul 2024",   location: "Parkville, VIC" },
  { role: "Data Science Industrial Consultant",        org: "CSIRO — Climate & Earth Systems",                            period: "Feb 2023–Nov 2023",   location: "Melbourne, VIC" },
  { role: "Data Analyst · Agile Leader",               org: "CSL (CSL Behring)",                                          period: "Feb 2022–Jun 2022",   location: "Melbourne, VIC" },
];

// ─── Education ────────────────────────────────────────────────────────────────
const EDUCATION = [
  { degree: "Master of Data Science",             org: "University of Melbourne", period: "Feb 2023–Jul 2024" },
  { degree: "Bachelor of Science — Data Science", org: "University of Melbourne", period: "Jun 2019–Jul 2022" },
  { degree: "Foundation Studies Programme",       org: "Trinity College, Unimelb", period: "Mar 2018–May 2019" },
  { degree: "Senior High School Certificate (Gaokao)", org: "Anshun No. 2 Senior High School", period: "Sep 2014–Jul 2017" },
];

// ─── Volunteer ────────────────────────────────────────────────────────────────
const VOLUNTEER = [
  { role: "STEM Industry Mentoring Program — Mentor",          org: "University of Melbourne",  period: "Jul–Dec 2025" },
  { role: "Data Science Peer-to-Peer Mentor",                  org: "University of Melbourne",  period: "Aug–Sep 2024" },
  { role: "FEIT Endeavour Exhibition — Volunteer Staff",       org: "University of Melbourne",  period: "Oct 2024"     },
  { role: "ANU CBE Analytics Plus Program — Mentor",           org: "Practera / BrandHook",     period: "Jul 2024"     },
  { role: "Event Executive & Staff",                           org: "Elite Talks Inc.",          period: "Nov 2017"     },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  { name: "Mapiva",                    domain: "Mobile · Startup",   stack: "React Native, Expo",                      status: "Active — MVP Jan 2027" },
  { name: "SA Address Generator",      domain: "Gov · Data Eng",     stack: "Python, Mapbox API, SEIFA, ABS",          status: "Delivered",            link: "https://github.com/rNLKJA/SA-Mock-Address-Generator" },
  { name: "US Political Data",         domain: "Research · OSS",     stack: "Python, web scraping, multi-threading",   status: "Open source",          link: "https://github.com/rNLKJA/Political-Data-Collection-System" },
  { name: "CBS Intelligence",          domain: "Gov · Analytics",    stack: "Power BI, Python, GIS/ArcGIS",            status: "In production" },
  { name: "MoodQ",                     domain: "Research · Mobile",  stack: "Expo, React Native, AWS, Node.js, CI/CD", status: "Handed to production team" },
  { name: "SAPOL Intelligence",        domain: "Gov · Analytics",    stack: "Power BI, Python, SQL, ArcGIS",           status: "In production" },
  { name: "Flow Cytometry Pipeline",   domain: "Biotech · OSS",      stack: "Python, Cloud HPC, celseq2",              status: "Open source contributor" },
  { name: "Climate Fact-Checker",      domain: "NLP · ML",           stack: "Python, TF-IDF, Transformers",            status: "Completed",            link: "https://github.com/rNLKJA" },
  { name: "AU Social Media Analytics", domain: "Cloud · Analytics",  stack: "Python, Twitter API, CouchDB, AWS",       status: "Completed",            link: "https://github.com/rNLKJA/Australia-Social-Media-Analytics-on-the-Cloud" },
  { name: "Twitter HPC Analysis",      domain: "HPC · Big Data",     stack: "Python, MPI, SPARTAN HPC",                status: "Completed",            link: "https://github.com/rNLKJA/Twitter-Data-Analysis-with-HPC" },
  { name: "ENSO Climate Risk",         domain: "Climate · ML",       stack: "Python, AR time series, stat modelling",  status: "Research published" },
  { name: "Cachex AI",                 domain: "AI · Algorithms",    stack: "Python, A* pathfinding, game theory",     status: "Completed",            link: "https://github.com/rNLKJA/Cachex-AI" },
  { name: "HPLC Pipeline",             domain: "Biotech · DS",       stack: "Python, Scikit-learn, T-SNE, DBSCAN",     status: "Delivered" },
  { name: "PCRM",                      domain: "Full Stack",         stack: "Node.js, React.js, Express.js, MongoDB",  status: "Completed",            link: "https://github.com/rNLKJA/Personal-Customer-Relation-Management-PCRM" },
  { name: "NYC Taxi Analysis",         domain: "Data Science",       stack: "Python, Spark",                           status: "Completed" },
  { name: "HEX",                       domain: "EdTech",             stack: "Content Design, LLMs, Market Research",   status: "Completed" },
  { name: "Self-Driving Databases",    domain: "AI / ML",            stack: "ML optimisation, query planning",         status: "Research published" },
];

// ─── XML helpers ──────────────────────────────────────────────────────────────
function escapeXml(str) {
  return String(str)
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&apos;");
}

function imageTag({ loc, title, caption, license }) {
  return `
    <image:image>
      <image:loc>${escapeXml(loc)}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
      <image:caption>${escapeXml(caption)}</image:caption>
      <image:license>${escapeXml(license)}</image:license>
    </image:image>`;
}

// ─── Sitemap generator ────────────────────────────────────────────────────────
function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];

  const careerComment = CAREER.map(
    c => `      · ${c.role} — ${c.org} (${c.period}, ${c.location})`
  ).join("\n");

  const educationComment = EDUCATION.map(
    e => `      · ${e.degree} — ${e.org} (${e.period})`
  ).join("\n");

  const volunteerComment = VOLUNTEER.map(
    v => `      · ${v.role} — ${v.org} (${v.period})`
  ).join("\n");

  const projectsComment = PROJECTS.map(
    p => `      · ${p.name} [${p.domain}] — ${p.stack}${p.link ? ` — ${p.link}` : ""}`
  ).join("\n");

  const allImages = IMAGES.map(imageTag).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  ┌────────────────────────────────────────────────────────────────────────────┐
  │  rin.contact — sitemap                                                     │
  │  Version:   ${VERSION}                                                        │
  │  Author:    ${AUTHOR}                              │
  │  Updated:   ${today}                                                  │
  │  Domain:    https://rin.contact                                            │
  ├────────────────────────────────────────────────────────────────────────────┤
  │  SECTIONS                                                                  │
  │    · Profile / Hero        rin.contact/                                    │
  │    · Career Timeline       rin.contact/#timeline                           │
  │    · Projects              rin.contact/#projects                           │
  │    · Skills & Credentials  rin.contact/#skills                             │
  │    · FAQ                   rin.contact/#faq                                │
  │    · Contact               rin.contact/#contact                            │
  ├────────────────────────────────────────────────────────────────────────────┤
  │  CAREER (${CAREER.length} roles)                                                        │
${careerComment}
  ├────────────────────────────────────────────────────────────────────────────┤
  │  EDUCATION (${EDUCATION.length} qualifications)                                             │
${educationComment}
  ├────────────────────────────────────────────────────────────────────────────┤
  │  VOLUNTEER (${VOLUNTEER.length} roles)                                                      │
${volunteerComment}
  ├────────────────────────────────────────────────────────────────────────────┤
  │  PROJECTS (${PROJECTS.length} projects)                                                     │
${projectsComment}
  └────────────────────────────────────────────────────────────────────────────┘
-->
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en-AU"     href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="zh-Hans"   href="${BASE_URL}/" />
    <xhtml:link rel="alternate" hreflang="x-default"  href="${BASE_URL}/" />${allImages}
  </url>
  <url>
    <loc>${BASE_URL}/career</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/projects</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/lab</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/resume</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}/tools/card</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}/hire-me</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fun</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/info</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/tools</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/ds</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fun/matrix</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${BASE_URL}/info/now</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${BASE_URL}/info/uses</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fun/art</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${BASE_URL}/info/colophon</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fun/sudo</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fun/loading</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fun/error</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fun/void</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  <url>
    <loc>${BASE_URL}/fun/inception</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  <url>
    <loc>${BASE_URL}/info/roadmap</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${BASE_URL}/info/accessibility</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );
  res.write(generateSitemap());
  res.end();
  return { props: {} };
}
