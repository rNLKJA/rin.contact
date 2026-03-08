import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";

const DOMAINS = [
  {
    label: "Strategic Thinking & Leadership",
    color: "#FF3C3C",
    description:
      "First-principles thinking is the foundation — breaking complex problems down to their core before rebuilding solutions from the ground up. Across government intelligence, regulatory compliance, and startup contexts, this means designing analytical roadmaps, intelligence frameworks, and decision structures that hold up under scrutiny. Strategic thinking here includes systems thinking, risk-based prioritisation, stakeholder alignment, and translating ambiguous briefs into structured, actionable plans.",
    skills: [
      "First-principles thinking",
      "Systems thinking",
      "Risk-based frameworks",
      "Intelligence framework design",
      "Strategic roadmapping",
      "Agile / Scrum",
      "SOP development",
      "Stakeholder management",
      "MOUs / data-sharing agreements",
      "Cross-agency collaboration",
      "Organisational development",
      "Project management",
    ],
  },
  {
    label: "Continuous Improvement",
    color: "#F59E0B",
    description:
      "Shaped by mentorship at WEHI under Rowland Mosbergen and reinforced across every role since — continuous improvement is not a process, it is a disposition. It means staying functional when problems are ill-defined, asking better questions rather than accepting the first answer, and building systems that improve themselves over time.",
    skills: [
      "Tolerance of complexity",
      "Tolerance of ambiguity",
      "Critical thinking",
      "Learnability",
      "Adaptability",
      "Communication & collaboration by default",
    ],
  },
  {
    label: "Data Science & Intelligence",
    color: "#3B82F6",
    description:
      "Statistical modelling, time series analysis, regression, clustering, GIS mapping, Power BI dashboards, and regulatory intelligence built for government and research contexts.",
    skills: [
      "Python", "R", "SQL", "Power BI", "Time Series", "Regression",
      "Clustering", "GIS / ArcGIS", "Multivariate Statistics", "Tableau",
    ],
  },
  {
    label: "Web Development",
    color: "#22C55E",
    description:
      "Full-stack web applications from frontend to backend, with a strong leaning toward minimal, performant React and Next.js architectures.",
    skills: [
      "Next.js", "React", "Node.js", "REST API", "Tailwind CSS",
      "MongoDB", "AWS", "Netlify", "Git", "UI/UX Design",
    ],
  },
  {
    label: "Mobile Development",
    color: "#8B5CF6",
    description:
      "Cross-platform mobile applications built with Expo and React Native, with production-grade infrastructure on AWS and CI/CD pipelines.",
    skills: [
      "Expo", "React Native", "AWS RDS", "AWS LightSail",
      "CI/CD", "GDPR compliance", "iOS", "Android",
    ],
  },
  {
    label: "Research Engineering",
    color: "#14B8A6",
    description:
      "Cloud and HPC-based bioinformatics pipelines, test infrastructure for reproducibility, and open-source contributions in genomics and medical research.",
    skills: [
      "Cloud HPC", "Bioinformatics pipelines", "celseq2",
      "Flow cytometry automation", "Reproducibility frameworks",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    color: "#F97316",
    description:
      "Cloud infrastructure management across AWS and Azure, with practical experience deploying scalable, cost-optimised services for research and community applications.",
    skills: [
      "AWS (RDS, LightSail, EC2)", "Azure Web Services",
      "CI/CD", "Docker", "Infrastructure cost optimisation",
    ],
  },
];

const CERT_GROUPS = [
  {
    group: "Professional Assessment",
    items: [
      { label: "VETASSESS — Statistician (ANZSCO 224113)", issuer: "Australian Skills Assessment · Feb 2026" },
      { label: "IELTS General Training — Band 8", issuer: "IELTS Official · Feb 2026" },
      { label: "Credentialed Community Language — Mandarin", issuer: "NAATI · Dec 2025" },
    ],
  },
  {
    group: "Cloud & Technical",
    items: [
      { label: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft · Jul 2024" },
      { label: "Neo4j Certified Professional", issuer: "Neo4j · Aug 2025" },
      { label: "Neo4j Graph Data Science Certification", issuer: "Neo4j · Aug 2025" },
    ],
  },
  {
    group: "Google Specialisations",
    items: [
      { label: "UX Design Specialisation", issuer: "Google · Dec 2025" },
      { label: "Business Intelligence Specialisation", issuer: "Google · Dec 2025" },
      { label: "Project Management Specialisation", issuer: "Google · Dec 2025" },
      { label: "IT Automation with Python", issuer: "Google · May 2022" },
      { label: "Data Analytics Specialisation", issuer: "Google · Jun 2021" },
    ],
  },
  {
    group: "Analytics & Intelligence",
    items: [
      { label: "Open-Source Intelligence (OSINT) Fundamentals", issuer: "TCM Security · Oct 2025" },
      { label: "Advanced Google Analytics", issuer: "Liontech · Jun 2024" },
      { label: "Google Analytics Individual Qualification (GAIQ)", issuer: "Google · May 2024" },
      { label: "Advanced SQL for Data Scientists", issuer: "LinkedIn · Jan 2024" },
      { label: "AI-Powered Productivity for Tech Roles", issuer: "Maven · Jul 2024" },
    ],
  },
  {
    group: "Agile & Engineering",
    items: [
      { label: "Atlassian Agile Project Management Professional Certificate", issuer: "Atlassian · Apr 2024" },
      { label: "Agile with Atlassian Jira", issuer: "Atlassian · Nov 2021" },
      { label: "Career Essentials in GitHub Professional Certificate", issuer: "GitHub · Jan 2024" },
    ],
  },
  {
    group: "Leadership & Community",
    items: [
      { label: "Melbourne Plus: Innovation", issuer: "University of Melbourne · May 2024" },
      { label: "Melbourne Plus: People Leadership", issuer: "University of Melbourne · Oct 2024" },
      { label: "ANU CBE Analytics Plus Program Mentor", issuer: "Practera · Jul 2024" },
      { label: "Working with Children Check", issuer: "Victorian Government · Jul 2024" },
      { label: "Mental Health First Aid — Tertiary Students", issuer: "MHFA International · Nov 2019" },
      { label: "Inbound Marketing", issuer: "HubSpot Academy · Dec 2023" },
    ],
  },
];

function DomainCard({ domain, index }) {
  const [ref, inView] = useInView();
  const [open, setOpen] = useState(index < 2); // first two open by default

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Clickable header row */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between pt-8 pb-4 text-left group relative overflow-hidden"
        style={{ borderTop: `3px solid ${domain.color}` }}
      >
        {/* Wisr editorial: ghost index number */}
        <span
          className="absolute right-6 top-1/2 -translate-y-1/2 text-[4.5rem] font-bold leading-none select-none pointer-events-none tabular-nums"
          style={{ color: domain.color, opacity: 0.08 }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: domain.color }}
            aria-hidden="true"
          />
          <h3 className="text-base font-semibold">{domain.label}</h3>
        </div>
        <span
          className="text-[#B0B0B0] text-sm flex-shrink-0 transition-transform duration-200 group-hover:text-black z-10"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {/* Collapsible body */}
      <div
        className="overflow-hidden"
        style={{
          maxHeight: open ? "500px" : "0px",
          opacity: open ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <div className="pb-8">
          {/* Animated fill bar */}
          <div className="h-px w-full bg-[#E0E0E0] mb-4 overflow-hidden">
            <div
              className="h-full"
              style={{
                backgroundColor: domain.color,
                width: open ? "100%" : "0%",
                transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
          <p className="text-sm text-[#3D3D3D] leading-relaxed mb-4 font-light">
            {domain.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {domain.skills.map((s, si) => (
              <span
                key={s}
                className="border border-[#E0E0E0] px-3 py-1 text-xs tracking-wide text-[#7A7A7A] rounded-full
                           cursor-default transition-all duration-200 animate-fade-up opacity-0"
                style={{
                  animationDelay: open ? `${si * 30}ms` : "0ms",
                  animationFillMode: "forwards",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = domain.color;
                  e.currentTarget.style.color = domain.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.color = "";
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [ref, inView] = useInView();
  const [certRef, certInView] = useInView();

  return (
    <section id="skills" className="py-24" aria-label="Skills and expertise">
      {/* Header */}
      <div
        ref={ref}
        className={`mb-4 transition-all duration-600 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">
          04 — Expertise
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">
          Generalist. Specialist.
        </h2>
        {/* Wisr-style wavy accent */}
        <svg width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" className="mb-5">
          <path d="M0,5 C15,1 30,9 45,5 C60,1 75,9 90,5 C105,1 120,9 120,5"
                stroke="#E0E0E0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
        <p className="text-base font-light text-[#3D3D3D] max-w-2xl leading-relaxed">
          I have found that the most interesting problems sit at the edges of
          disciplines. My work has taken me from flow cytometry pipelines at WEHI
          to ministerial dashboards at CBS to mobile health apps at UniMelb —
          each domain adding a new lens to how I approach data, systems, and
          people. The thread connecting it all is a belief that rigorous thinking
          and continuous improvement compound over time.
        </p>
      </div>

      {/* ── Marquee tape ── infinite scrolling skill strip ── */}
      <div
        className="relative mt-10 mb-2 overflow-hidden border-y border-[#E0E0E0] py-4 select-none"
        aria-hidden="true"
      >
        {/* Fade masks on edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10"
          style={{ background: "linear-gradient(to right, #F5F5F5 40%, transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10"
          style={{ background: "linear-gradient(to left, #F5F5F5 40%, transparent)" }} />

        <div
          className="flex animate-marquee"
          style={{ width: "max-content", gap: "2.5rem" }}
        >
          {/* Two full copies for seamless loop */}
          {[0, 1].map((copy) =>
            DOMAINS.flatMap((d) =>
              d.skills.map((skill) => (
                <span
                  key={`${copy}-${d.label}-${skill}`}
                  className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#7A7A7A] whitespace-nowrap flex-shrink-0"
                >
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  {skill}
                </span>
              ))
            )
          )}
        </div>
      </div>

      {/* Domain grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {DOMAINS.map((d, i) => (
          <DomainCard key={d.label} domain={d} index={i} />
        ))}
      </div>      {/* Certifications */}
      <div
        ref={certRef}
        className={`mt-16 transition-all duration-600 ${
          certInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-6">
          Certifications & Assessment
        </p>

        {/* Two-column grouped layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {CERT_GROUPS.map((g) => (
            <div key={g.group} className="border-t border-[#E0E0E0] py-5">
              <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] mb-3">{g.group}</p>
              <ul className="space-y-2.5">
                {g.items.map((c) => (
                  <li key={c.label} className="flex items-start justify-between gap-4 group">
                    <span className="text-sm text-[#1A1A1A] leading-snug">{c.label}</span>
                    <span className="text-xs text-[#B0B0B0] whitespace-nowrap flex-shrink-0 mt-0.5">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div
        className={`mt-16 transition-all duration-600 ${
          certInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-6">
          Languages
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { lang: "English", level: "Full Professional", detail: "IELTS General Training · Band 8" },
            { lang: "Mandarin Chinese", level: "Native / Bilingual", detail: null },
          ].map((l) => (
            <div
              key={l.lang}
              className="border border-[#E0E0E0] px-5 py-3 cursor-default
                         hover:border-black transition-colors duration-200"
            >
              <p className="text-sm font-medium">{l.lang}</p>
              <p className="text-xs text-[#7A7A7A] mt-0.5">{l.level}</p>
              {l.detail && (
                <p className="text-xs text-[#7A7A7A] mt-0.5">{l.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
