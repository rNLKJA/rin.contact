import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import ReferencesPanel from "@/components/sections/ReferencesPanel";

const CAREER = [
  {
    year: "2026",
    org: "South Australia Police",
    orgDesc: "SA's state police force — evidence-based policing and integrity governance.",
    role: "ASO7 Senior Data Analyst",
    team: "Professional & Ethical Standards Branch",
    period: "Mar 2026 – Present",
    location: "Adelaide, SA",
    logo: "/images/sapol-logo.svg",
    tag: "Government · Analytics",
    noBorder: true,
    summary:
      "Anchored in first-principles thinking and strategic planning, I develop analytical models and statistical frameworks that translate SAPOL's complex policing data into authoritative, decision-ready intelligence for the Ethical and Professional Standards Branch.",
    bullets: [
      "Applying first-principles thinking to break complex data challenges to their core, then rebuilding structured analytical roadmaps from the ground up.",
      "Providing expert strategic advisory to senior leadership on data and reporting proposals, driving evidence-based recommendations.",
      "Establishing core data as the single source of truth for management information, strategic planning, and parliamentary reporting.",
      "Governing end-to-end analytics solutions across IAPro and connected systems with a continuous improvement mindset.",
      "Collaborating with EPSB leadership, the Intelligence and Probity Unit, enterprise architects, and cross-organisational working groups.",
    ],
    tools: ["IAPro", "Python", "Statistical modelling", "Power BI", "GIS", "Data Visualisation", "Microsoft SQL Server", "Power Query"],
    current: true,
  },
  {
    year: "2025",
    org: "Consumer and Business Services (CBS), Attorney-General's Department SA",
    orgDesc: "SA government agency protecting consumers across tobacco, building work, and product safety.",
    role: "ASO4 Intelligence & Coordination Officer",
    team: "Prevention Team — Compliance & Enforcement",
    period: "Jan 2025 – Mar 2026",
    location: "Adelaide, SA",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQEbZveHn7HVCQ/company-logo_200_200/company-logo_200_200/0/1630651674988/attorney_generals_logo?e=2147483647&v=beta&t=V5cMKtM1QRUW0fqwpysEvD4iHxPO5FmaPoXIJpNQs5c",
    tag: "Government · Intelligence",
    summary:
      "Using strategic thinking to design risk-based intelligence frameworks and compliance schedules — then applying statistical analysis to make those frameworks data-driven. Built Consumer and Business Services' analytics capability from scratch, turning fragmented multi-source data into dashboards and GIS maps used by Senior Management and the Minister's Office.",
    bullets: [
      "Designed risk-based intelligence frameworks and operational schedules for tobacco, building work, and product safety compliance — guided by strategic thinking rather than routine cycles.",
      "Developed repeatable SOPs and data validation frameworks so institutional intelligence is no longer trapped in spreadsheets or any individual's memory.",
      "Established data-sharing MOUs with SAPOL, ITEC, and federal agencies — the first of their kind within the team.",
      "Applied regression analysis, time series decomposition, and multivariate pattern detection to inspections data, identifying non-compliance trends earlier.",
      "Built Power BI dashboards and GIS visualisations used directly by Senior Management and the Minister's Office.",
      "Supported investigations through metadata inspection and network mapping to strengthen evidentiary confidence.",
    ],
    tools: ["Power BI", "Python", "GIS", "Time series", "Regression", "Microsoft SQL Server", "Scheduling", "Power Query"],
  },
  {
    year: "2025",
    org: "University of Melbourne — Psychiatry",
    orgDesc: "World-class research university, Psychiatry dept pioneering digital mental health tools.",
    role: "RA.1 Research Assistant — MoodQ",
    team: "Psychiatry Department",
    period: "Aug 2024 – Feb 2026",
    location: "Parkville, VIC",
    logo: "https://yt3.googleusercontent.com/wD1YaCDSytQDbDcSAkR21j8IQTl9lyC6LDr3p5ZC2yGX-RzU1ayGmn6swOS_LLzMKpvyA--UJQY=s176-c-k-c0x00ffffff-no-rj-mo",
    tag: "Research · Mobile Dev",
    summary:
      "Led full-stack development of MoodQ, a mental health mobile app — migrating from Uniapp to Expo React Native, building the clinician dashboard, and managing the AWS infrastructure across 18 months before a successful handover to a professional team.",
    bullets: [
      "Migrated application from Uniapp to Expo React Native, improving performance across iOS and Android.",
      "Built clinician frontend dashboard for structured patient data management.",
      "Reduced hosting costs by ~$500/month through deliberate AWS RDS + LightSail choices.",
      "Maintained GDPR-compliant data protection and configured CI/CD pipelines.",
      "Successfully transitioned the production-ready application to a professional development team.",
    ],
    tools: ["Expo", "React Native", "AWS", "Node.js", "CI/CD", "PostgreSQL", "SQLite", "Django"],
  },
  {
    year: "2024",
    org: "WEHI",
    orgDesc: "One of the world's leading biomedical research institutes — genomics, immunology, and disease research.",
    role: "Software Engineer Intern (Data Science)",
    team: "Bioinformatics",
    period: "Feb 2024 – Jul 2024",
    location: "Parkville, VIC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRIgIQHaq6ZhUDwJUqfFa5xZJ9Tn5f6YLBA&s",
    tag: "Bioinformatics · Open Source",
    summary:
      "Automated flow cytometry analysis pipelines using cloud and HPC, developed test infrastructure to improve research reproducibility, and contributed to the open-source celseq2 workflow toolkit.",
    bullets: [
      "Automated flow cytometry data analysis using cloud and HPC, reducing manual processing overhead.",
      "Developed test infrastructure that improved reproducibility of genomics research outcomes.",
      "Contributed to the open-source celseq2 toolkit, extending benefit to the broader scRNA-seq community.",
    ],
    tools: ["Python", "Cloud HPC", "celseq2", "Git", "GitHub Actions", "Shiny R"],
  },
  {
    year: "2023",
    org: "CSIRO",
    orgDesc: "Australia's national science agency — research at the frontier of climate, agriculture, and technology.",
    role: "Data Science Industrial Consultant",
    team: "Climate & Earth Systems",
    period: "Feb 2023 – Nov 2023",
    location: "Melbourne, VIC",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/CSIRO_Logo.svg/120px-CSIRO_Logo.svg.png?_=20210607115415",
    tag: "Climate Science · ML",
    summary:
      "Collaborated with Dr. Vassili Kitsios on climate-economic research, developing AR time series models to quantify how ENSO patterns could amplify commodity price volatility and food security-induced conflict risk.",
    bullets: [
      "Developed AutoRegressive time series models with rolling window forecasting for ENSO-commodity analysis.",
      "Delivered insights connecting climate change patterns to global food security risk.",
      "Bridged communication between University of Melbourne faculty and CSIRO research leadership.",
    ],
    tools: ["Python", "AR time series", "Rolling window", "Statistical modelling", "Jupyter Notebook", "Research Software Engineering"],
  },
  {
    year: "2022",
    org: "CSL (CSL Behring)",
    orgDesc: "Global biotech leader headquartered in Melbourne — life-saving plasma-derived therapies.",
    role: "Data Analyst · Agile Leader",
    team: "Research & Development",
    period: "Feb 2022 – Jun 2022",
    location: "Melbourne, VIC",
    logo: "https://s3-symbol-logo.tradingview.com/csl--600.png",
    tag: "Biotech · Agile",
    summary:
      "Applied Python automation and unsupervised clustering (T-SNE, DBSCAN, UMAP) to HPLC laboratory data, reducing processing time and improving confidence in medical research data quality.",
    bullets: [
      "Reduced HPLC result processing time through a purpose-built Python automation script.",
      "Applied T-SNE, DBSCAN, and UMAP to identify hidden patterns in complex medical datasets.",
      "Led Agile ceremonies, supporting the team's delivery rhythm across the project lifecycle.",
    ],
    tools: ["Python", "Scikit-learn", "T-SNE", "DBSCAN", "UMAP", "Jupyter Notebook", "Research Software Engineering"],
  },
];

const UNIMELB_LOGO = "https://yt3.googleusercontent.com/wD1YaCDSytQDbDcSAkR21j8IQTl9lyC6LDr3p5ZC2yGX-RzU1ayGmn6swOS_LLzMKpvyA--UJQY=s176-c-k-c0x00ffffff-no-rj-mo";
const TRINITY_LOGO = "https://media.licdn.com/dms/image/v2/C560BAQHbsXv7y0802A/company-logo_200_200/company-logo_200_200/0/1630627937392/trinityunimelb_logo?e=2147483647&v=beta&t=L-l1ISC0casA8uKqb1QYyFZWMyfe9n8A_tuT_MyOG_c";
const PRACTERA_LOGO = "/images/practera-logo.jpg";

const VOLUNTEER = [
  {
    year: "2025",
    org: "University of Melbourne",
    orgDesc: "One of Australia's leading research universities — STEM industry outreach and student mentorship.",
    role: "2025 STEM Industry Mentoring Program — Mentor",
    period: "Jul 2025 – Dec 2025",
    location: "Melbourne, VIC",
    logo: UNIMELB_LOGO,
    tag: "Science & Technology",
    summary:
      "Mentoring undergraduate and postgraduate STEM students through the University of Melbourne's 2025 Industry Mentoring Program — sharing industry experience across data science, analytics, and software engineering to help students bridge the gap between academia and professional practice.",
    bullets: [
      "Providing career guidance and industry context to students pursuing STEM pathways.",
      "Sharing practical experience in data analytics, government intelligence, and research software engineering.",
      "Supporting students in building professional confidence and navigating early-career decisions.",
    ],
  },
  {
    year: "2024",
    org: "University of Melbourne",
    orgDesc: "World-class research university — Data Science postgraduate programme.",
    role: "2024 Data Science Peer-to-Peer Mentor",
    period: "Aug 2024 – Sep 2024",
    location: "Parkville, VIC",
    logo: UNIMELB_LOGO,
    tag: "Education",
    summary:
      "Served as a peer mentor in the Data Science Peer-to-Peer Mentoring Program, supporting new Master of Data Science students during their transition to university life and earning a verified People Leadership credential through Melbourne Plus.",
    bullets: [
      "Guided and supported incoming Master of Data Science students in their transition to university life.",
      "Organised and participated in training sessions, welcome morning teas, independent meet-ups, and wrap-up events.",
      "Fostered a sense of community among students, helping them connect and share experiences.",
      "Earned a verified digital credential in People Leadership through Melbourne Plus.",
    ],
  },
  {
    year: "2024",
    org: "University of Melbourne",
    orgDesc: "Faculty of Engineering and Information Technology — annual flagship student project exhibition.",
    role: "2024 FEIT Endeavour Exhibition — Volunteer Staff",
    period: "Oct 2024",
    location: "Parkville, VIC",
    logo: UNIMELB_LOGO,
    tag: "Education",
    summary:
      "Volunteered as event staff for the FEIT Endeavour Exhibition — welcoming guests, managing registrations, guiding visitors through the exhibition, and supporting project students and the Endeavour Events Team.",
    bullets: [
      "Welcomed and registered guests, providing name tags and guiding them with interactive maps.",
      "Supported project students and helped maintain an inviting, informative exhibition space.",
      "Promoted the People's Choice Awards and encouraged visitor participation in voting.",
      "Conducted guest counts and encouraged QR code access to exhibition information.",
    ],
  },
  {
    year: "2024",
    org: "Practera",
    orgDesc: "Experiential learning platform connecting students with real-world industry projects.",
    role: "ANU CBE Analytics Plus Program — Mentor",
    period: "Jul 2024",
    location: "Remote",
    logo: PRACTERA_LOGO,
    noBorder: true,
    tag: "Education",
    summary:
      "Mentored talented ANU students through a 3-week virtual data analytics challenge for BrandHook — sharing industry insights, keeping the team on track, and earning a completer badge with excellent student feedback.",
    bullets: [
      "Mentored ANU CBE students across a 3-week virtual data analytics engagement for BrandHook.",
      "Shared industry insights on data science methodology and communication, keeping the team focused and on track.",
      "Supported the team in preparing a final presentation that received strong client feedback.",
      "Earned a completer badge and received excellent feedback from students on mentoring style and support.",
    ],
  },
  {
    year: "2017",
    org: "Elite Talks Inc.",
    orgDesc: "Events company co-organising cultural and professional summits.",
    role: "Event Executive & Staff",
    period: "Nov 2017",
    location: "China",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQFZULyFlO9ftA/company-logo_100_100/company-logo_100_100/0/1689137982258/elite_talks_inc_logo?e=1774483200&v=beta&t=h5J2RxhdXmovEdv4_0MF1kVezmBuiHiymojdlSq6yDI",
    tag: "Arts & Culture",
    summary:
      "Volunteered as event executor at a summit jointly organised by Fanmo and Elite Talks — guiding visitors to enter the venue and ensuring order and security throughout the event.",
    bullets: [
      "Guided visitors to enter the venue and ensured order and security throughout the event.",
      "Participated in the summit jointly organised by Fanmo and Elite Talks as part of the volunteer event team.",
    ],
  },
];

const EDUCATION = [
  {
    year: "2023–2024",
    org: "University of Melbourne",
    orgDesc: "One of Australia's leading research universities, consistently ranked among the world's top 50.",
    role: "Master of Data Science",
    period: "Feb 2023 – Jul 2024",
    location: "Parkville, VIC",
    logo: UNIMELB_LOGO,
    tag: "Postgraduate · AQF Level 9",
    summary:
      "A rigorous programme spanning statistical learning, cloud computing, Bayesian methods, and applied data science, culminating in a year-long capstone research project with CSIRO.",
    noBorder: true,
    bullets: [
      "Statistics: Statistical Machine Learning · Statistical Modelling for Data Science · Bayesian Statistical Learning · Multivariate Statistics for Data Science · Computational Statistics & Data Science",
      "Computing: Advanced Database Systems · Cluster and Cloud Computing · Natural Language Processing",
      "Capstone: Data Science Project Pt 1 & 2 (MAST90106/07), conducted in partnership with CSIRO",
      "Industry: Science & Technology Internship at CSIRO · Communicating Science at Work",
    ],
  },
  {
    year: "2019–2022",
    org: "University of Melbourne",
    orgDesc: "The same world-class institution — undergraduate programme built strong mathematical and computational foundations.",
    role: "Bachelor of Science — Data Science",
    period: "Jun 2019 – Jul 2022",
    location: "Parkville, VIC",
    logo: UNIMELB_LOGO,
    tag: "Undergraduate · AQF Level 7",
    summary:
      "Three years building mathematical, statistical, and computational foundations across data science, machine learning, algorithms, and software engineering.",
    noBorder: true,
    bullets: [
      "Computing: Foundations of Computing · Foundations of Algorithms · Algorithms & Data Structures · Elements of Data Processing · Database Systems · Web Information Technologies · Artificial Intelligence",
      "Data Science & ML: Machine Learning · Applied Data Science · Modern Applied Statistics",
      "Mathematics & Statistics: Calculus 2 · Linear Algebra · Probability · Statistics · Discrete Maths & Operations Research · Linear Statistical Models · Techniques in Operations Research",
      "Capstone: IT Project — COMP30022, collaborative software engineering",
      "Breadth: Positive Leadership & Careers · Business Negotiations · Principles of Finance · Principles of Marketing",
    ],
  },
  {
    year: "2018–2019",
    org: "Trinity College, University of Melbourne",
    orgDesc: "Residential college affiliated with the University of Melbourne, providing foundation studies for international students.",
    role: "Foundation Studies Programme",
    period: "Mar 2018 – May 2019",
    location: "Parkville, VIC",
    logo: TRINITY_LOGO,
    tag: "Foundation",
    summary:
      "Completed a university pathway foundation programme, building academic English and discipline breadth in preparation for the Bachelor of Science at the University of Melbourne.",
    noBorder: true,
    bullets: [
      "Subjects: Mathematics 1 & 2 · Economics · Psychology · Drama · Literature · History · English for Academic Purposes",
    ],
  },
  {
    year: "2014–2017",
    org: "Anshun No. 2 Senior High School",
    orgDesc: "安顺市第二高级中学 — senior high school in Anshun, Guizhou, China.",
    role: "Senior High School Certificate (Gaokao)",
    period: "Sep 2014 – Jul 2017",
    location: "Anshun, Guizhou, China",
    logo: "/images/anshun-highschool-logo.jpg",
    tag: "Secondary",
    summary:
      "Completed the Chinese Senior High School curriculum and sat the National College Entrance Examination (Gaokao), which led to selection for overseas university pathway study.",
    bullets: [
      "Subjects: Mathematics · Physics · Chemistry · Biology · Chinese Literature · English",
    ],
  },
];

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative pl-8 pb-12 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Timeline dot — centred on the 1px track line */}
      <div
        className={`absolute left-0 md:-left-5 top-1.5 w-2 h-2 rounded-full border ${
          item.current
            ? "bg-[#FF3C3C] border-[#FF3C3C]"
            : "bg-white border-[#3D3D3D]"
        }`}
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex items-start gap-4">
        {item.logo && (
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={`relative w-9 h-9 overflow-hidden flex items-center justify-center bg-white ${
                (item.noBorder || (item.org && item.org.includes("CSIRO"))) ? "" : "border border-[#E0E0E0]"
              }`}
              style={{ borderRadius: "22%" }}
            >
              <Image
                src={item.logo}
                alt={`${item.org} logo`}
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <span className="text-xs tracking-widest uppercase text-[#7A7A7A]">
              {item.period}
            </span>
            {item.tag && (
              <span className="border border-[#E0E0E0] px-2 py-0.5 text-xs tracking-wider uppercase text-[#7A7A7A]">
                {item.tag}
              </span>
            )}
            {item.current && (
              <span className="border border-[#FF3C3C] px-2 py-0.5 text-xs tracking-wider uppercase text-[#FF3C3C]">
                Current
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold leading-tight">{item.role}</h3>
          <p className="text-sm text-[#3D3D3D] mb-1">{item.org}</p>
          {item.orgDesc && (
            <p className="text-xs text-[#7A7A7A] mb-3 italic">{item.orgDesc}</p>
          )}

          <p className="text-sm text-[#3D3D3D] leading-relaxed mb-3">
            {item.summary}
          </p>

          {/* Expandable detail */}
          {item.bullets && (
            <>
              <button
                onClick={() => setExpanded((e) => !e)}
                className="text-xs tracking-widest uppercase text-[#7A7A7A] hover:text-black
                           transition-colors duration-200 flex items-center gap-1 mb-3"
                aria-expanded={expanded}
              >
                {expanded ? "— Less" : "+ Details"}
              </button>

              {expanded && (
                <div className="animate-fade-in">
                  <ul className="space-y-1.5 mb-3">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[#3D3D3D]">
                        <span className="text-[#FF3C3C] flex-shrink-0 mt-0.5" aria-hidden="true">·</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {item.tools && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((t) => (
                        <span
                          key={t}
                          className="border border-[#E0E0E0] px-2 py-0.5 text-xs text-[#7A7A7A]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  const [ref, inView] = useInView();
  const [tab, setTab] = useState("career");
  const timelineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [refOpen, setRefOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => setTab(e.detail.tab);
    window.addEventListener("timeline-tab", handler);
    return () => window.removeEventListener("timeline-tab", handler);
  }, []);

  // Animate the timeline line drawing down as user scrolls through it
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // How far the bottom of the viewport has travelled through the timeline
      const progress = Math.min(
        Math.max((windowH - rect.top) / (rect.height + windowH * 0.3), 0),
        1
      );
      setLineHeight(progress * 100);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [tab]); // re-run when tab changes so line resets

  const items = tab === "career" ? CAREER : tab === "education" ? EDUCATION : VOLUNTEER;

  return (
    <section id="timeline" className="py-24 relative" aria-label="Career timeline">
      {/* Section header */}
      <div
        ref={ref}
        className={`mb-16 transition-all duration-600 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">
          02 — Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Career Path
        </h2>
        <p className="text-base font-light text-[#3D3D3D] max-w-xl leading-relaxed">
          A path built on curiosity across government intelligence, biomedical
          research, climate science, and software engineering — always looking
          for where data can make a genuine difference.
        </p>

        {/* Tab switcher */}
        <div className="flex gap-0 mt-8 border border-[#E0E0E0] w-fit">
          {["career", "education", "volunteer"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 text-xs tracking-widest uppercase transition-colors duration-200 ${
                tab === t
                  ? "bg-[#FF3C3C] text-white border-[#FF3C3C]"
                  : "bg-white text-[#7A7A7A] hover:text-[#FF3C3C]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative" ref={timelineRef}>
        {/* Static track — offset right on desktop to make room for year labels */}
        <div className="timeline-line md:left-16" aria-hidden="true" />
        {/* Animated fill */}
        <div
          aria-hidden="true"
          className="absolute left-0 md:left-16 top-0 w-px bg-[#FF3C3C] pointer-events-none"
          style={{
            height: `${lineHeight}%`,
            transition: "height 0.1s linear",
          }}
        />
        <div className="md:pl-20 pl-0">
          {items.map((item, i) => {
            const prevItem = items[i - 1];
            const showYearLabel = i === 0 || item.year !== prevItem?.year;
            return (
              <div key={`${tab}-${i}`} className="relative">
                {/* Year label on the left rail — desktop only */}
                {showYearLabel && (
                  <div
                    className="hidden md:block absolute -left-20 top-2 w-14 text-right"
                    aria-hidden="true"
                  >
                    <span className="text-[10px] tracking-widest uppercase text-[#CC0000] font-medium">
                      {item.year}
                    </span>
                  </div>
                )}
                <TimelineItem item={item} index={i} isEdu={tab === "education"} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Easter egg: barely-visible trigger — only discoverable if you look ── */}
      <button
        onClick={() => setRefOpen(true)}
        aria-label="View professional references"
        title="Professional References"
        className="absolute bottom-3 right-4 text-[#6B6B6B] hover:text-[#3D3D3D]
                   transition-colors duration-300 text-[10px] tracking-[0.3em] select-none
                   pointer-events-auto"
      >
        · · ·
      </button>

      {/* References modal */}
      {refOpen && <ReferencesPanel onClose={() => setRefOpen(false)} />}
    </section>
  );
}
