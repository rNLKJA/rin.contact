import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";

const PROJECTS = [
  {
    id: "moodq",
    title: "MoodQ",
    subtitle: "Mental Health Mobile Application",
    org: "University of Melbourne — Psychiatry",
    period: "Aug 2024 – Feb 2026",
    tag: "Mobile Dev",
    domain: "Research",
    status: "Handed to production team",
    stack: ["Expo", "React Native", "AWS RDS", "LightSail", "Node.js", "CI/CD"],
    summary:
      "A clinician-facing and patient-facing mental health mobile app developed for the University of Melbourne's Psychiatry research group. Migrated from Uniapp to Expo React Native, reducing costs by ~$500/month and delivering a GDPR-compliant production application.",
    impact: "~$500/month cost saved · Production deployed · Cross-platform iOS + Android",
  },
  {
    id: "climate",
    title: "ENSO Climate Risk",
    subtitle: "Food Security & Conflict Forecasting",
    org: "CSIRO × University of Melbourne",
    period: "Feb 2023 – Nov 2023",
    tag: "Data Science",
    domain: "Climate Research",
    status: "Research published",
    stack: ["Python", "AR time series", "Rolling window", "Statistical modelling"],
    summary:
      "Built AutoRegressive time series models with rolling window forecasting to quantify how El Niño-Southern Oscillation patterns amplify commodity price volatility and food security-induced conflict risk.",
    impact: "Climate → conflict risk insights · 10-month CSIRO research engagement",
  },
  {
    id: "cbs",
    title: "CBS Intelligence",
    subtitle: "Regulatory Analytics from the Ground Up",
    org: "Attorney-General's Department SA",
    period: "Jan 2025 – Mar 2026",
    tag: "Analytics",
    domain: "Government",
    status: "In production",
    stack: ["Power BI", "Python", "GIS/ArcGIS", "Time series", "Regression"],
    summary:
      "Built the first intelligence analytics capability within the CBS Prevention Team — integrating ABS, SA Health, ACCC, and DataSA data into unified dashboards and GIS maps used by the Minister's Office.",
    impact: "Minister's Office reporting · First cross-agency MOUs · SOPs institutionalised",
  },
  {
    id: "wehi",
    title: "Flow Cytometry",
    subtitle: "Genomics Research Infrastructure",
    org: "WEHI",
    period: "Feb 2024 – Jul 2024",
    tag: "Bioinformatics",
    domain: "Open Source",
    status: "Open source contributor",
    stack: ["Python", "Cloud HPC", "celseq2", "Git"],
    summary:
      "Automated flow cytometry data analysis using cloud and HPC, developed test infrastructure for improved reproducibility, and contributed to the open-source celseq2 workflow toolkit.",
    impact: "Reduced manual processing · celseq2 open-source contribution",
  },
  {
    id: "mapiva",
    title: "Mapiva",
    subtitle: "Social Connection Mobile App",
    org: "Mapiva (Co-founded)",
    period: "Aug 2025 – Present",
    tag: "Mobile Dev",
    domain: "Startup",
    status: "MVP Jan 2027",
    stack: ["React Native", "Expo", "Product design"],
    summary:
      "Co-founded a mobile app to help people discover and connect with others. Full product ownership from architecture through implementation as Dev Lead.",
    impact: "Co-founder · Full product ownership · MVP ETA Jan 2027",
    current: true,
  },
  {
    id: "hplc",
    title: "HPLC Pipeline",
    subtitle: "Medical Research Automation",
    org: "CSL (CSL Behring)",
    period: "Feb 2022 – Jun 2022",
    tag: "Data Science",
    domain: "Biotech",
    status: "Delivered",
    stack: ["Python", "Scikit-learn", "T-SNE", "DBSCAN", "UMAP"],
    summary:
      "Built a Python automation script to streamline HPLC experiment result processing, and applied unsupervised clustering methods to uncover hidden patterns in complex medical research datasets.",
    impact: "Reduced HPLC processing time · Improved data quality confidence",
  },
  {
    id: "portfolio",
    title: "rin.contact",
    subtitle: "Personal Portfolio — v5",
    org: "Personal Project",
    period: "2020 – Present",
    tag: "Web Dev",
    domain: "Personal",
    status: "v5 in development",
    stack: ["Next.js", "React", "Tailwind CSS", "Netlify"],
    summary:
      "Five major iterations of a personal website — currently rebuilt in v5 with a Nothing OS-inspired minimal design language. A living record of technical and professional development since 2020.",
    impact: "5 major versions · rin.contact · Open source",
    link: "https://github.com/rNLKJA",
    current: true,
  },
];

const DOMAINS = ["All", "Research", "Government", "Startup", "Biotech", "Climate Research", "Open Source", "Personal"];

export default function ProjectsSection() {
  const [ref, inView] = useInView();
  const [activeFilter, setActiveFilter] = useState("All");
  const [openId, setOpenId] = useState(null);

  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.domain === activeFilter);

  const activeProject = filtered.find((p) => p.id === openId) ?? null;

  const handleSelect = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-24" aria-label="Projects">
      {/* Section header */}
      <div
        ref={ref}
        className={`mb-12 transition-all duration-600 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">03 — Work</p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Selected Projects
        </h2>
        <p className="text-base font-light text-[#3D3D3D] max-w-xl leading-relaxed">
          Projects spanning government intelligence, climate science, biomedical
          research, mobile apps, and web development — each one a chance to build
          something that genuinely mattered.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mt-8" role="group" aria-label="Filter projects">
          {DOMAINS.map((d) => (
            <button
              key={d}
              onClick={() => {
                setActiveFilter(d);
                setOpenId(null);
              }}
              className={`border px-4 py-1.5 text-xs tracking-widest uppercase transition-colors duration-200 ${
                activeFilter === d
                  ? "border-[#FF3C3C] bg-[#FF3C3C] text-white"
                  : "border-[#E0E0E0] text-[#7A7A7A] hover:border-[#FF3C3C] hover:text-[#FF3C3C]"
              }`}
              aria-pressed={activeFilter === d}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* ── Desktop: folder tabs ── */}
      <div className="hidden md:block w-full">
        <div className="flex items-stretch overflow-x-auto gap-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="tablist" aria-label="Project folders">
          {filtered.map((project, i) => {
            const isActive = openId === project.id;
            return (
              <button
                key={project.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`folder-panel-${project.id}`}
                onClick={() => handleSelect(project.id)}
                className={`
                  group relative flex-shrink-0 flex flex-col justify-center
                  px-4 py-3 min-w-[110px] max-w-[160px] text-left
                  border-t border-l border-r transition-colors duration-200
                  ${isActive
                    ? "bg-[#FF3C3C] text-white border-[#FF3C3C]"
                    : "bg-white text-[#3D3D3D] border-[#E0E0E0] hover:border-[#FF3C3C] hover:text-[#FF3C3C]"
                  }
                `}
                style={{ borderRadius: "4px 4px 0 0" }}
              >
                <span className={`text-[10px] tabular-nums mb-1 ${isActive ? "text-white opacity-60" : "text-[#B0B0B0]"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs font-medium leading-tight truncate">
                    {project.title}
                  </span>
                  {project.current && (
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isActive ? "bg-white opacity-50" : "bg-[#FF3C3C]"
                      }`}
                      aria-label="Active project"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Folder content panel */}
        <div
          className={`border transition-all duration-400 overflow-hidden ${
            activeProject ? "border-[#FF3C3C]" : "border-[#E0E0E0]"
          }`}
          style={{
            maxHeight: activeProject ? "600px" : "52px",
            transition: "max-height 0.4s ease, border-color 0.2s ease",
          }}
        >
          {/* Empty state hint */}
          {!activeProject && (
            <div className="px-6 py-4 flex items-center gap-3 text-xs text-[#B0B0B0] tracking-wide select-none">
              <span>↑</span>
              <span>Select a folder to view project details</span>
            </div>
          )}

          {/* Active project content */}
          {activeProject && (
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
              {/* Left: details */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight mb-1">
                    {activeProject.title}
                    {activeProject.current && (
                      <span className="ml-3 border border-[#FF3C3C] px-2 py-0.5 text-[10px] tracking-widest uppercase text-[#FF3C3C] align-middle">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#7A7A7A] tracking-wide">{activeProject.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-[#7A7A7A]">
                  <span>{activeProject.org}</span>
                  <span>·</span>
                  <span>{activeProject.period}</span>
                </div>
                <p className="text-sm text-[#3D3D3D] leading-relaxed">
                  {activeProject.summary}
                </p>
                <p className="text-xs text-[#3D3D3D] border-l-2 border-[#FF3C3C] pl-3 leading-relaxed">
                  {activeProject.impact}
                </p>
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs tracking-widest uppercase
                               text-[#7A7A7A] hover:text-black transition-colors duration-200"
                    aria-label={`View ${activeProject.title} on GitHub`}
                  >
                    View on GitHub ↗
                  </a>
                )}
              </div>

              {/* Right: stack + status */}
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] mb-2">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.stack.map((t) => (
                      <span
                        key={t}
                        className="border border-[#E0E0E0] px-2 py-0.5 text-xs text-[#7A7A7A]
                                   cursor-default hover:border-[#FF3C3C] hover:text-[#FF3C3C] transition-colors duration-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] mb-1">Status</p>
                  <p className="text-xs text-[#3D3D3D]">{activeProject.status}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] mb-1">Domain</p>
                  <p className="text-xs text-[#3D3D3D]">{activeProject.domain}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile: classic vertical accordion ── */}
      <div className="md:hidden border-t border-[#E0E0E0]">
        {filtered.map((project, i) => {
          const isOpen = openId === project.id;
          return (
            <div key={project.id} className="border-b border-[#E0E0E0]">
              <button
                onClick={() => handleSelect(project.id)}
                className="w-full flex items-center gap-4 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-xs text-[#B0B0B0] tabular-nums w-5 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="text-sm font-medium block truncate">{project.title}</span>
                  <span className="text-xs text-[#7A7A7A]">{project.tag}</span>
                </span>
                {project.current && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0" />
                )}
                <span className={`text-[#7A7A7A] transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <div
                className="overflow-hidden"
                style={{
                  maxHeight: isOpen ? "800px" : "0px",
                  opacity: isOpen ? 1 : 0,
                  transition: "max-height 0.4s ease, opacity 0.25s ease",
                }}
              >
                <div className="pb-6 pl-9 space-y-4">
                  <p className="text-xs text-[#7A7A7A]">{project.org} · {project.period}</p>
                  <p className="text-sm text-[#3D3D3D] leading-relaxed">{project.summary}</p>
                  <p className="text-xs text-[#3D3D3D] border-l-2 border-black pl-3 leading-relaxed">
                    {project.impact}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((t) => (
                      <span key={t} className="border border-[#E0E0E0] px-2 py-0.5 text-xs text-[#7A7A7A]
                                               hover:border-black hover:text-black transition-colors duration-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs tracking-widest uppercase
                                 text-[#7A7A7A] hover:text-black transition-colors duration-200"
                    >
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
