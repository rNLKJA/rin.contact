import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";

const PROJECTS = [
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
    id: "sa-address",
    title: "SA Address Generator",
    subtitle: "Socio-Economic & Remoteness-Based Address Tool",
    org: "Consumer and Business Services SA",
    period: "Aug 2025",
    tag: "Data Engineering",
    domain: "Government",
    status: "Delivered",
    stack: ["Python", "Mapbox API", "SEIFA", "ABS Remoteness"],
    summary:
      "Built an internal tool to generate validated real South Australian addresses based on socio-economic status (SEIFA indices) and remoteness classifications — filling a gap no public API could address. All outputs verified via Mapbox API.",
    impact: "Validated address generation · SEIFA + remoteness filtering · Internal QA tool",
    link: "https://github.com/rNLKJA/SA-Mock-Address-Generator",
  },
  {
    id: "us-political",
    title: "US Political Data",
    subtitle: "Presidential Debate & Campaign Document Scraper",
    org: "Personal Research",
    period: "Aug 2025",
    tag: "Data Engineering",
    domain: "Research",
    status: "Open source",
    stack: ["Python", "Web scraping", "Multi-threading", "CSV pipeline"],
    summary:
      "Scraped the UC Santa Barbara American Presidency Project to collect ~180 presidential debate transcripts and ~25,000 campaign documents, with multi-threaded processing, rate limiting, and full metadata extraction.",
    impact: "~25,000 documents collected · Decades of US political communication data",
    link: "https://github.com/rNLKJA/Political-Data-Collection-System",
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
    id: "sapol",
    title: "SAPOL Intelligence",
    subtitle: "Crime Analytics & Operational Dashboards",
    org: "South Australia Police",
    period: "Jul 2024 – Dec 2024",
    tag: "Analytics",
    domain: "Government",
    status: "In production",
    stack: ["Power BI", "Python", "SQL", "ArcGIS", "Time series"],
    summary:
      "Contributed to operational intelligence and crime analytics as an Intelligence and Coordination Officer. Built dashboards and analytical products supporting frontline policing, resource allocation, and command-level decision-making across South Australia.",
    impact: "Operational decision support · Crime pattern analytics · Cross-unit coordination",
  },
  {
    id: "wehi-flow",
    title: "Flow Cytometry Pipeline",
    subtitle: "Genomics & HPC Research Automation",
    org: "WEHI",
    period: "Feb 2024 – Jul 2024",
    tag: "Data Science",
    domain: "Biotech",
    status: "Open source contributor",
    stack: ["Python", "Cloud HPC", "celseq2", "Git"],
    summary:
      "Automated flow cytometry data analysis using cloud and HPC, developed test infrastructure for improved reproducibility, and contributed to the open-source celseq2 workflow toolkit.",
    impact: "Reduced manual processing · celseq2 open-source contribution",
  },
  {
    id: "factcheck",
    title: "Climate Fact-Checker",
    subtitle: "Automated Fact-Checking for Climate Claims",
    org: "University of Melbourne",
    period: "Apr 2024 – May 2024",
    tag: "NLP / ML",
    domain: "Climate Research",
    status: "Completed",
    stack: ["Python", "TF-IDF", "Transformers", "NLP"],
    summary:
      "Designed a two-stage automated fact-checking system for climate change claims — TF-IDF evidence retrieval followed by Transformer-based classification (SUPPORTS / REFUTES / NOT ENOUGH INFO / DISPUTED), outperforming LSTM baselines.",
    impact: "Transformer model outperformed LSTM · Scalable misinformation detection pipeline",
    link: "https://github.com/rNLKJA",
  },
  {
    id: "hex",
    title: "HEX",
    subtitle: "Digital Content Library Builder",
    org: "HEX",
    period: "Nov 2023 – Jun 2024",
    tag: "EdTech",
    domain: "Startup",
    stack: ["Content Design", "EdTech", "Market Research", "LLMs"],
    summary:
      "Built and refined interactive digital educational content aimed at bridging the gap between education and professional success. Conducted market research on leveraging advanced technologies to improve course engagement and learner outcomes for students across Australia and beyond.",
    impact: "80+ students supported · Improved course engagement through technology-driven content innovation",
  },
  {
    id: "selfdriving-db",
    title: "Self-Driving Databases",
    subtitle: "Workload-Driven Optimisation & Index Selection",
    org: "University of Melbourne",
    period: "Jun 2023 – Jul 2023",
    tag: "Research",
    domain: "AI / ML",
    status: "Completed",
    stack: ["Database systems", "ML optimisation", "Query planning"],
    summary:
      "Research project exploring AI/ML techniques for autonomous database management — covering workload-driven optimisation and automatic index selection to reduce DBA overhead and improve query performance.",
    impact: "Literature review · Autonomous DB optimisation frameworks",
  },
  {
    id: "social-cloud",
    title: "Social Media Analytics",
    subtitle: "Australia on the Cloud",
    org: "University of Melbourne",
    period: "Apr 2023 – Jun 2023",
    tag: "Cloud / Analytics",
    domain: "Cloud / HPC",
    status: "Completed",
    stack: ["Python", "Twitter API", "Mastodon API", "CouchDB", "AWS", "SUDO"],
    summary:
      "Harvested and analysed Twitter and Mastodon data alongside ABS SUDO spatial data to produce a Social Sense Dashboard illuminating Australian sentiment, social trends, and regional behavioural patterns.",
    impact: "Cross-platform social analytics · Spatial + social data fusion",
    link: "https://github.com/rNLKJA/Australia-Social-Media-Analytics-on-the-Cloud",
  },
  {
    id: "twitter-hpc",
    title: "Twitter HPC Analysis",
    subtitle: "Big Data on SPARTAN",
    org: "University of Melbourne",
    period: "Mar 2023 – Apr 2023",
    tag: "HPC / Big Data",
    domain: "Cloud / HPC",
    status: "Completed",
    stack: ["Python", "MPI", "SPARTAN HPC", "Parallel computing"],
    summary:
      "Processed a large-scale Twitter dataset on the University of Melbourne's SPARTAN HPC cluster using MPI and Python, identifying tweet distribution across Australian cities and top contributors.",
    impact: "HPC parallel processing · City-level tweet distribution insights",
    link: "https://github.com/rNLKJA/Twitter-Data-Analysis-with-HPC",
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
    id: "cachex",
    title: "Cachex AI",
    subtitle: "Game-Playing AI Agent",
    org: "University of Melbourne",
    period: "Apr 2022 – Jun 2022",
    tag: "AI / Algorithms",
    domain: "AI / ML",
    status: "Completed",
    stack: ["Python", "A* pathfinding", "Heuristic search", "Game theory"],
    summary:
      "Implemented AI agents for Cachex — a two-player connection game — covering heuristic A* search for the exploration phase and a competitive game agent using strategic anticipation and sabotage logic.",
    impact: "A* pathfinding · Competitive AI agent · Game theory application",
    link: "https://github.com/rNLKJA/Cachex-AI",
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
    id: "pcrm",
    title: "PCRM",
    subtitle: "Personal Customer Relationship Management",
    org: "University of Melbourne",
    period: "Aug 2021 – Nov 2021",
    tag: "Full Stack",
    domain: "Research",
    status: "Completed",
    stack: ["Node.js", "React.js", "Express.js", "MongoDB", "HTML/CSS"],
    summary:
      "Collaborative full-stack CRM system built as the COMP30022 IT Project — managing customer interactions and data with a responsive React frontend, Express REST API, and MongoDB backend.",
    impact: "Full-stack delivery · Team project · Production-grade architecture",
    link: "https://github.com/rNLKJA/Personal-Customer-Relation-Management-PCRM",
  },
  {
    id: "nyc-taxi",
    title: "NYC Taxi Analysis",
    subtitle: "Quantitative Analysis with Spark",
    org: "University of Melbourne",
    period: "Jul 2021 – Aug 2021",
    tag: "Data Science",
    domain: "Research",
    status: "Completed",
    stack: ["Python", "Apache Spark", "Machine Learning", "Clustering"],
    summary:
      "Analysed 2014–2017 New York City Yellow Taxi data using Apache Spark for big data processing, applying linear modelling to predict trip costs and clustering to identify traffic hotspots.",
    impact: "Big data Spark pipeline · Traffic hotspot clustering · Trip cost modelling",
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
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    summary:
      "Five major iterations of a personal website — currently rebuilt in v5 with a Nothing OS-inspired minimal design language. A living record of technical and professional development since 2020.",
    impact: "5 major versions · rin.contact · Open source",
    link: "https://github.com/rNLKJA",
    current: true,
  },
];

const DOMAINS = [
  "All",
  "Government",
  "Climate Research",
  "Biotech",
  "Startup",
  "Research",
  "AI / ML",
  "Cloud / HPC",
  "Open Source",
  "Personal",
];

function ProjectDetail({ project }) {
  return (
    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
      <div className="md:col-span-2 space-y-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-1">
            {project.title}
            {project.current && (
              <span className="ml-3 border border-[#FF3C3C] px-2 py-0.5 text-[10px] tracking-widest uppercase text-[#FF3C3C] align-middle">
                Active
              </span>
            )}
          </h3>
          <p className="text-xs text-[#7A7A7A] tracking-wide">{project.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-[#7A7A7A]">
          <span>{project.org}</span>
          <span>·</span>
          <span>{project.period}</span>
        </div>
        <p className="text-sm text-[#3D3D3D] leading-relaxed">{project.summary}</p>
        <p className="text-xs text-[#3D3D3D] border-l-2 border-[#FF3C3C] pl-3 leading-relaxed">
          {project.impact}
        </p>
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
      <div className="space-y-5">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] mb-2">Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
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
          <p className="text-xs text-[#3D3D3D]">{project.status}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] mb-1">Domain</p>
          <p className="text-xs text-[#3D3D3D]">{project.domain}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [ref, inView] = useInView();
  const [activeFilter, setActiveFilter] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  const isAllView = activeFilter === "All";

  const filtered = isAllView
    ? PROJECTS.filter(
        (p) =>
          search === "" ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
          p.tag.toLowerCase().includes(search.toLowerCase()) ||
          p.domain.toLowerCase().includes(search.toLowerCase())
      )
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
              onClick={() => { setActiveFilter(d); setOpenId(null); setSearch(""); }}
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

      {/* ── ALL view: searchable list ── */}
      {isAllView && (
        <div className="w-full">
          {/* Search */}
          <div className="mb-4 flex items-center border border-[#E0E0E0] focus-within:border-[#FF3C3C] focus-within:outline-none transition-colors duration-200">
            <span className="pl-4 text-[#B0B0B0] text-sm select-none">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenId(null); }}
              placeholder="Search projects..."
              className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none placeholder:text-[#B0B0B0]"
              aria-label="Search projects"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="pr-4 text-[#B0B0B0] hover:text-black transition-colors duration-200 text-xs"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* List */}
          <div className="border-t border-[#E0E0E0]">
            {filtered.length === 0 && (
              <p className="py-8 text-sm text-[#B0B0B0] text-center">No projects match &ldquo;{search}&rdquo;</p>
            )}
            {filtered.map((project, i) => {
              const isOpen = openId === project.id;
              return (
                <div key={project.id} className="border-b border-[#E0E0E0]">
                  <button
                    onClick={() => handleSelect(project.id)}
                    className="w-full flex items-center gap-4 py-3.5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[10px] text-[#B0B0B0] tabular-nums w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 items-center">
                      <span className="text-sm font-medium flex items-center gap-2">
                        {project.title}
                        {project.current && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0" />}
                      </span>
                      <span className="text-xs text-[#7A7A7A] truncate hidden md:block">{project.subtitle}</span>
                      <span className="hidden md:flex items-center gap-3 justify-end">
                        <span className="text-[10px] tracking-widest uppercase border border-[#E0E0E0] px-2 py-0.5 text-[#B0B0B0]">
                          {project.tag}
                        </span>
                        <span className="text-xs text-[#B0B0B0]">{project.period}</span>
                      </span>
                    </span>
                    <span className={`text-[#B0B0B0] transition-transform duration-200 flex-shrink-0 text-sm ${isOpen ? "rotate-45 text-[#FF3C3C]" : "group-hover:text-[#FF3C3C]"}`}>
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "600px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 0.4s ease, opacity 0.25s ease",
                    }}
                  >
                    <div className="border-t border-[#F0F0F0]">
                      <ProjectDetail project={project} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-[#B0B0B0]">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</p>
        </div>
      )}

      {/* ── Domain-filtered: folder tabs (desktop) ── */}
      {!isAllView && (
        <>
          <div className="hidden md:block w-full">
            <div className="flex items-stretch overflow-x-auto gap-0 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="tablist">
              {filtered.map((project, i) => {
                const isActive = openId === project.id;
                return (
                  <button
                    key={project.id}
                    role="tab"
                    aria-selected={isActive}
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
                      <span className="text-xs font-medium leading-tight truncate">{project.title}</span>
                      {project.current && (
                        <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "bg-white opacity-50" : "bg-[#FF3C3C]"}`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div
              className={`border transition-all duration-400 overflow-hidden ${activeProject ? "border-[#FF3C3C]" : "border-[#E0E0E0]"}`}
              style={{ maxHeight: activeProject ? "600px" : "52px", transition: "max-height 0.4s ease, border-color 0.2s ease" }}
            >
              {!activeProject && (
                <div className="px-6 py-4 flex items-center gap-3 text-xs text-[#B0B0B0] tracking-wide select-none">
                  <span>↑</span>
                  <span>Select a folder to view project details</span>
                </div>
              )}
              {activeProject && <ProjectDetail project={activeProject} />}
            </div>
          </div>

          {/* Mobile accordion */}
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
                    {project.current && <span className="w-1.5 h-1.5 rounded-full bg-[#FF3C3C] flex-shrink-0" />}
                    <span className={`text-[#7A7A7A] transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{ maxHeight: isOpen ? "800px" : "0px", opacity: isOpen ? 1 : 0, transition: "max-height 0.4s ease, opacity 0.25s ease" }}
                  >
                    <div className="pb-6 pl-9 space-y-4">
                      <p className="text-xs text-[#7A7A7A]">{project.org} · {project.period}</p>
                      <p className="text-sm text-[#3D3D3D] leading-relaxed">{project.summary}</p>
                      <p className="text-xs text-[#3D3D3D] border-l-2 border-black pl-3 leading-relaxed">{project.impact}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((t) => (
                          <span key={t} className="border border-[#E0E0E0] px-2 py-0.5 text-xs text-[#7A7A7A] hover:border-black hover:text-black transition-colors duration-200">{t}</span>
                        ))}
                      </div>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer"
                           className="inline-flex items-center gap-1 text-xs tracking-widest uppercase text-[#7A7A7A] hover:text-black transition-colors duration-200">
                          View on GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
