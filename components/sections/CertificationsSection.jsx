import { useInView } from "@/hooks/useInView";

/* ── Certifications data (subset of the 23 in JSON-LD — most impactful) ────── */

const CERTS = [
  { name: "Azure Data Fundamentals", issuer: "Microsoft", year: "2024" },
  { name: "Azure AI Fundamentals", issuer: "Microsoft", year: "2024" },
  { name: "Azure Fundamentals", issuer: "Microsoft", year: "2024" },
  { name: "Tableau Desktop Specialist", issuer: "Tableau", year: "2025" },
  { name: "Power BI Data Analyst", issuer: "Microsoft", year: "2025" },
  { name: "Neo4j Graph Data Science", issuer: "Neo4j", year: "2025" },
  { name: "Neo4j Graph Database Certified", issuer: "Neo4j", year: "2025" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
  { name: "AWS Solutions Architect Associate", issuer: "Amazon Web Services", year: "2024" },
  { name: "AWS Developer Associate", issuer: "Amazon Web Services", year: "2025" },
  { name: "AWS Data Engineer Associate", issuer: "Amazon Web Services", year: "2025" },
  { name: "AWS Machine Learning Specialty", issuer: "Amazon Web Services", year: "2025" },
  { name: "NAATI Certified Provisional", issuer: "NAATI", year: "2025" },
  { name: "IELTS Academic (8.5)", issuer: "IELTS Official", year: "2026" },
  { name: "Skills Assessment (Data Scientist)", issuer: "VETASSESS", year: "2026" },
  { name: "ICAgile Certified Professional", issuer: "ICAgile", year: "2024" },
  { name: "Professional Scrum Master I", issuer: "Scrum.org", year: "2024" },
  { name: "ITIL 4 Foundation", issuer: "AXELOS", year: "2024" },
  { name: "Google Data Analytics", issuer: "Google / Coursera", year: "2023" },
  { name: "Google Project Management", issuer: "Google / Coursera", year: "2024" },
  { name: "Google UX Design", issuer: "Google / Coursera", year: "2024" },
  { name: "Google Business Intelligence", issuer: "Google / Coursera", year: "2025" },
  { name: "Google Advanced Data Analytics", issuer: "Google / Coursera", year: "2025" },
];

export default function CertificationsSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* section header */}
        <div className="mb-14">
          <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-4 font-mono">
            ◈ — Certifications
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
            Credentials.
          </h2>
          <p className="text-sm text-[#7A7A7A] mt-2">
            23 professional certifications across cloud, analytics, AI, and agile.
          </p>
        </div>

        {/* cert grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CERTS.map((cert, i) => (
            <div
              key={cert.name}
              className={`flex items-center gap-3 border border-[#E8E8E8] dark:border-[#2A2A2A] px-4 py-3 transition-all duration-500 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-sm text-black dark:text-white truncate">{cert.name}</p>
                <p className="text-[11px] text-[#7A7A7A]">
                  {cert.issuer}
                  <span className="text-[#CCCCCC] dark:text-[#555] ml-1.5">{cert.year}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
