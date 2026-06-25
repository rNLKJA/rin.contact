import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

/* ── Certifications data (subset of the 23 in JSON-LD — most impactful) ────── */

export const CERTS = [
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

// Roll each issuer up to a provider bucket so the breadth reads at a glance.
const groupOf = (issuer) => {
  if (issuer.includes("Amazon")) return "AWS";
  if (issuer.includes("Google")) return "Google";
  if (issuer.includes("Microsoft")) return "Microsoft";
  if (issuer.includes("Neo4j")) return "Neo4j";
  if (issuer.includes("Tableau")) return "Tableau";
  if (["ICAgile", "Scrum.org", "AXELOS"].some((a) => issuer.includes(a))) return "Agile";
  return "Professional"; // NAATI, IELTS, VETASSESS
};

// Provider breakdown, most-certified first; drives both the chips and the grid order.
const BREAKDOWN = (() => {
  const counts = {};
  CERTS.forEach((c) => {
    const g = groupOf(c.issuer);
    counts[g] = (counts[g] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
})();
const ORDER = BREAKDOWN.map(([g]) => g);
const SORTED_CERTS = [...CERTS].sort(
  (a, b) => ORDER.indexOf(groupOf(a.issuer)) - ORDER.indexOf(groupOf(b.issuer))
);

function CountUp({ target, started, duration = 1100 }) {
  const [n, setN] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!started) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [started, target, duration]);
  return <>{n}</>;
}

export default function CertificationsSection() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        {/* section header — oversized count anchors the scale, breakdown shows the breadth */}
        <div className="mb-12">
          <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-6 font-mono">
            ◈ — Certifications
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-10 gap-y-4 md:items-end">
            <span
              className="font-display leading-[0.8] text-[84px] md:text-[120px] text-black dark:text-white tabular-nums"
              aria-hidden="true"
            >
              <CountUp target={CERTS.length} started={inView} />
            </span>
            <div className="md:pb-3">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
                Credentials.
              </h2>
              <p className="text-sm text-[#7A7A7A] dark:text-[#9A9A9A] mt-2 max-w-md leading-relaxed">
                {CERTS.length} professional certifications across cloud, data, AI, and agile
                delivery — kept current and verifiable.
              </p>
            </div>
          </div>

          {/* provider breakdown — concentration of expertise at a glance */}
          <div className="flex flex-wrap gap-2 mt-8" aria-label="Certifications by provider">
            {BREAKDOWN.map(([g, n]) => (
              <span
                key={g}
                className="inline-flex items-center gap-2 border border-[#E8E8E8] dark:border-[#2A2A2A] px-3 py-1 text-[11px] tracking-wide"
              >
                <span className="text-black dark:text-white">{g}</span>
                <span className="text-[#FF3C3C] font-mono tabular-nums">{n}</span>
              </span>
            ))}
          </div>
        </div>

        {/* cert grid — grouped by provider so concentrations cluster */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {SORTED_CERTS.map((cert, i) => (
            <div
              key={cert.name}
              className={`flex items-center gap-3 border border-[#E8E8E8] dark:border-[#2A2A2A] px-4 py-3 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0"
                aria-hidden="true"
              />
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
