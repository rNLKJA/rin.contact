import React from "react";
import { useInView } from "@/hooks/useInView";

const DOMAINS = [
  {
    label: "Strategic Thinking & Leadership",
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
    description:
      "Statistical modelling, time series analysis, regression, clustering, GIS mapping, Power BI dashboards, and regulatory intelligence built for government and research contexts.",
    skills: [
      "Python", "R", "SQL", "Power BI", "Time Series", "Regression",
      "Clustering", "GIS / ArcGIS", "Multivariate Statistics", "Tableau",
    ],
  },
  {
    label: "Web Development",
    description:
      "Full-stack web applications from frontend to backend, with a strong leaning toward minimal, performant React and Next.js architectures.",
    skills: [
      "Next.js", "React", "Node.js", "REST API", "Tailwind CSS",
      "MongoDB", "AWS", "Netlify", "Git", "UI/UX Design",
    ],
  },
  {
    label: "Mobile Development",
    description:
      "Cross-platform mobile applications built with Expo and React Native, with production-grade infrastructure on AWS and CI/CD pipelines.",
    skills: [
      "Expo", "React Native", "AWS RDS", "AWS LightSail",
      "CI/CD", "GDPR compliance", "iOS", "Android",
    ],
  },
  {
    label: "Research Engineering",
    description:
      "Cloud and HPC-based bioinformatics pipelines, test infrastructure for reproducibility, and open-source contributions in genomics and medical research.",
    skills: [
      "Cloud HPC", "Bioinformatics pipelines", "celseq2",
      "Flow cytometry automation", "Reproducibility frameworks",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    description:
      "Cloud infrastructure management across AWS and Azure, with practical experience deploying scalable, cost-optimised services for research and community applications.",
    skills: [
      "AWS (RDS, LightSail, EC2)", "Azure Web Services",
      "CI/CD", "Docker", "Infrastructure cost optimisation",
    ],
  },
];

const CERTS = [
  { label: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft" },
  { label: "VETASSESS — Statistician (ANZSCO 224113)", issuer: "Australian Skills Assessment" },
  { label: "Credentialed Community Language — Mandarin", issuer: "NAATI" },
  { label: "Working with Children Check", issuer: "Victorian Government" },
  { label: "Google Business Intelligence", issuer: "Google · Coursera" },
  { label: "Google Data Analytics", issuer: "Google · Coursera" },
  { label: "Google IT Automation with Python", issuer: "Google · Coursera" },
  { label: "Google Project Management", issuer: "Google · Coursera" },
  { label: "Google UI/UX Design", issuer: "Google · Coursera" },
  { label: "Agile Project Management", issuer: "Atlassian" },
];

function DomainCard({ domain, index }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`border-t border-[#E0E0E0] pt-8 pb-8 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <h3 className="text-base font-semibold mb-2">{domain.label}</h3>
      <p className="text-sm text-[#3D3D3D] leading-relaxed mb-4 font-light">
        {domain.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {domain.skills.map((s) => (
          <span
            key={s}
            className="border border-[#E0E0E0] px-2.5 py-1 text-xs tracking-wide text-[#7A7A7A]
                       cursor-default hover:border-black hover:text-black transition-colors duration-200"
          >
            {s}
          </span>
        ))}
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
        <p className="text-xs tracking-widest uppercase text-[#7A7A7A] mb-3">
          04 — Expertise
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Generalist. Specialist.
        </h2>
        <p className="text-base font-light text-[#3D3D3D] max-w-2xl leading-relaxed">
          I have found that the most interesting problems sit at the edges of
          disciplines. My work has taken me from flow cytometry pipelines at WEHI
          to ministerial dashboards at CBS to mobile health apps at UniMelb —
          each domain adding a new lens to how I approach data, systems, and
          people. The thread connecting it all is a belief that rigorous thinking
          and continuous improvement compound over time.
        </p>
      </div>

      {/* Domain grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {DOMAINS.map((d, i) => (
          <DomainCard key={d.label} domain={d} index={i} />
        ))}
      </div>

      {/* Certifications */}
      <div
        ref={certRef}
        className={`mt-16 transition-all duration-600 ${
          certInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#7A7A7A] mb-6">
          Certifications & Assessment
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CERTS.map((c) => (
            <div
              key={c.label}
              className="border border-[#E0E0E0] p-5 bg-white cursor-default
                         hover:border-black transition-colors duration-200"
            >
              <p className="text-sm font-medium mb-1">{c.label}</p>
              <p className="text-xs text-[#7A7A7A]">{c.issuer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-12 flex flex-wrap gap-3">
        {[
          {
            lang: "English",
            level: "Full Professional",
            detail: "IELTS General Training · Band 8",
          },
          {
            lang: "Mandarin Chinese",
            level: "Native / Bilingual",
            detail: null,
          },
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
    </section>
  );
}
