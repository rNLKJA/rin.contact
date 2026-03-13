export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader("X-Powered-By", "Next.js · rin.contact");
  res.setHeader("X-Rate-Limit", "unlimited — especially for recruiters");
  res.setHeader("X-Easter-Egg", "curl rin.contact for the full terminal experience");
  res.setHeader("X-Build", "hand-crafted with questionable amounts of coffee");

  res.status(200).json({
    meta: {
      api_version: "v1",
      schema: "ProfileSchema/2026",
      generated_at: new Date().toISOString(),
      source: "https://rin.contact",
      note: "A living document. Pull requests welcome (metaphorically).",
    },
    profile: {
      id: "rin-huang",
      name: "Rin Huang",
      legal_name: "Sunchuangyu Huang",
      zh: "黄孙创宇",
      pronouns: "he/him",
      location: { city: "Adelaide", state: "SA", country: "Australia", timezone: "ACST (UTC+9:30)" },
      status: "open_to_opportunities",
      current_role: "ASO7 Senior Data Analyst · South Australia Police",
      tagline: "Generalist by nature. Specialist by discipline.",
      fun_fact: "I debug production on dark-mode at midnight and call it strategic thinking.",
    },
    skills: {
      languages:  ["Python", "R", "SQL", "TypeScript", "Bash"],
      frameworks: ["Next.js", "React", "FastAPI", "PyTorch", "scikit-learn"],
      data:       ["dbt", "Spark", "Tableau", "BigQuery", "Pandas"],
      cloud:      ["AWS", "GCP", "Vercel", "Docker"],
      domains:    [
        "Data Science",
        "Strategic Analytics",
        "Government Technology",
        "Research Engineering",
        "Full-Stack Development",
        "UI/UX Design",
      ],
      soft: ["Strategic Thinking", "Continuous Improvement", "Cross-discipline Communication"],
      max_level: "still_loading",
    },
    education: [
      {
        degree: "Master of Data Science",
        institution: "University of Melbourne",
        year: 2023,
        note: "Graduated with distinction",
      },
      {
        degree: "Bachelor of Science (Data Science)",
        institution: "University of Melbourne",
        year: 2022,
      },
    ],
    experience: [
      { role: "ASO7 Senior Data Analyst",               org: "SA Police",                  period: "2025–present" },
      { role: "Research Software Engineer",              org: "WEHI",                       period: "2024–2025"   },
      { role: "Data Science Consultant",                 org: "CSIRO & CSL",                period: "2023–2024"   },
      { role: "Intelligence & Coordination Officer",     org: "Attorney-General's Dept",    period: "2024–2025"   },
      { role: "Full-Stack Engineer",                     org: "University of Melbourne",    period: "2021–2023"   },
      { role: "Co-Founder & Dev Lead",                   org: "Mapiva",                     period: "2022–2023"   },
    ],
    stats: {
      roles:              6,
      projects_shipped:   17,
      certifications:     23,
      degrees:            2,
      coffees_consumed:   "undefined (stack overflow)",
    },
    links: {
      web:      "https://rin.contact",
      resume:   "https://rin.contact/resume",
      linkedin: "https://www.linkedin.com/in/sunchuangyuhuang/",
      github:   "https://github.com/rNLKJA",
      card:     "https://rin.contact/tools/card",
      hire:     "https://rin.contact/hire-me",
    },
    easter_eggs: {
      terminal:   "curl rin.contact",
      cli_resume: "https://rin.contact/resume",
      konami:     "↑↑↓↓←→←→BA — try it on the homepage",
      matrix:     "https://rin.contact/fun/matrix",
      source:     "check the HTML comments",
    },
  });
}
