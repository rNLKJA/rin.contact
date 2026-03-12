/**
 * /resume — Interactive CLI resume
 * A fake shell that responds to typed commands with real career data.
 */
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";

// ── Command output library ────────────────────────────────────────────────────

const WELCOME = [
  "",
  "  ╭──────────────────────────────────────────────────╮",
  "  │  rin.contact/resume  ·  interactive CV           │",
  "  │  type  help  to see available commands           │",
  "  ╰──────────────────────────────────────────────────╯",
  "",
  '  Logged in as: guest@rin.contact',
  '  Session: ' + new Date().toLocaleDateString("en-AU", { timeZone: "Australia/Adelaide" }),
  "",
];

const HELP_TEXT = [
  "",
  "  COMMANDS",
  "  ─────────────────────────────────────────────────",
  "  whoami              identity summary",
  "  ls                  list available files",
  "  cat experience.json career history (JSON)",
  "  cat education.txt   academic qualifications",
  "  cat skills.txt      technical skill domains",
  "  cat projects.txt    shipped projects",
  "  cat certs.txt       professional certifications",
  "  ping rin.contact    heartbeat check",
  "  open /hire-me       hiring pitch & contact",
  "  open /card          digital business card",
  "  open /career        career timeline & metro map",
  "  open /lab           data playground",
  "  clear               clear the terminal",
  "  exit                return home",
  "  ─────────────────────────────────────────────────",
  "",
];

const WHOAMI_TEXT = [
  "",
  "  Sunchuangyu Huang  (Rin · 黄孙创宇)",
  "",
  "  Role      ASO7 Senior Data Analyst @ South Australia Police",
  "  Also      Co-founder & Dev Lead @ Mapiva",
  "  Location  Adelaide, SA, Australia  ·  UTC+9:30",
  "  Languages Mandarin (native)  ·  English (professional)",
  "  Web       https://rin.contact",
  "  Email     huang@rin.contact",
  "",
  "  uid=26  gid=data-science  groups=gov,research,engineering,startup",
  "",
];

const LS_TEXT = [
  "",
  "  total 6",
  "  -rw-r--r--  experience.json    7 roles  since 2022",
  "  -rw-r--r--  education.txt      2 degrees  University of Melbourne",
  "  -rw-r--r--  skills.txt         7+ technical domains",
  "  -rw-r--r--  projects.txt       17 shipped to production",
  "  -rw-r--r--  certs.txt          23 professional certifications",
  "  drwxr-xr-x  contact/           → rin.contact/#contact",
  "",
];

const EXPERIENCE_TEXT = [
  "",
  "  [",
  '    { "role": "ASO7 Senior Data Analyst",',
  '      "org": "South Australia Police · PESB",',
  '      "period": "Mar 2026 – present",',
  '      "status": "LIVE ●",',
  '      "highlight": "First-principles intelligence · Parliamentary reporting" },',
  "",
  '    { "role": "Co-founder & Dev Lead",',
  '      "org": "Mapiva",',
  '      "period": "Aug 2025 – present",',
  '      "status": "BUILDING ●",',
  '      "highlight": "Social connection app · MVP Jan 2027" },',
  "",
  '    { "role": "ASO4 Intelligence & Coordination Officer",',
  '      "org": "CBS · Attorney-General\'s Dept SA",',
  '      "period": "Jan 2025 – Mar 2026",',
  '      "highlight": "Built analytics capability from zero · GIS dashboards" },',
  "",
  '    { "role": "Research Assistant",',
  '      "org": "University of Melbourne · Psychiatry",',
  '      "period": "Aug 2024 – Feb 2026",',
  '      "highlight": "MoodQ mobile app · GDPR-compliant · $500/mo infra savings" },',
  "",
  '    { "role": "Software Engineer Intern",',
  '      "org": "WEHI – Walter & Eliza Hall Institute",',
  '      "period": "Feb – Jul 2024",',
  '      "highlight": "Bioinformatics · celseq2 open-source · cloud HPC" },',
  "",
  '    { "role": "Data Science Consultant",',
  '      "org": "CSIRO – Australia\'s National Science Agency",',
  '      "period": "Feb – Nov 2023",',
  '      "highlight": "Climate risk · ENSO time-series · food security" },',
  "",
  '    { "role": "Data Analyst & Agile Lead",',
  '      "org": "CSL – global biotech",',
  '      "period": "Feb – Jun 2022",',
  '      "highlight": "HPLC automation · T-SNE / DBSCAN / UMAP" }',
  "  ]",
  "",
];

const EDUCATION_TEXT = [
  "",
  "  EDUCATION.TXT",
  "  ─────────────────────────────────────────────────",
  "",
  "  Master of Data Science",
  "  University of Melbourne  ·  2023 – 2024",
  "  Specialisation: machine learning, statistical modelling, NLP",
  "",
  "  Bachelor of Science",
  "  University of Melbourne  ·  2019 – 2022",
  "  Major: Data Science  ·  Minor: Computing & Software Systems",
  "",
  "  STEM Peer Mentor  ·  UniMelb  ·  2022 – 2024",
  "  Trinity College Foundation Studies  ·  2018 – 2019",
  "",
];

const SKILLS_TEXT = [
  "",
  "  SKILLS.TXT",
  "  ─────────────────────────────────────────────────",
  "",
  "  Languages    Python · R · SQL · TypeScript · Bash",
  "  Data         pandas · scikit-learn · PyTorch · Spark · dbt",
  "  Viz          Power BI · Tableau · D3.js · Plotly · Seaborn",
  "  Cloud        AWS · Azure · GCP · Vercel",
  "  Geo          ArcGIS · QGIS · PostGIS · Mapbox · Folium",
  "  Mobile       React Native · Expo · Firebase",
  "  Web          Next.js · React · FastAPI · Node.js",
  "  Methods      Time-series · NLP · Computer Vision · Stats",
  "  Agile        Scrum · JIRA · Confluence · Notion",
  "  Gov          IAPro · Power Platform · ESRI Suite",
  "",
];

const PROJECTS_TEXT = [
  "",
  "  PROJECTS.TXT  (17 shipped to production)",
  "  ─────────────────────────────────────────────────",
  "",
  "  ● Mapiva            social connection app · React Native · Aug 2025",
  "  ● MoodQ             mood-tracking research app · UniMelb Psychiatry",
  "  ● CBS Dashboard     GIS + analytics · Power BI · AGD SA",
  "  ● celseq2 (contrib) bioinformatics pipeline · open-source · WEHI",
  "  ● ENSO risk model   climate & food-security · CSIRO",
  "  ● HPLC automation   bioprocess data pipeline · CSL",
  "  ● rin.contact       this site · Next.js · Vercel",
  "  · · ·  + 10 more  →  rin.contact/projects",
  "",
];

const CERTS_TEXT = [
  "",
  "  CERTS.TXT  (23 certifications)",
  "  ─────────────────────────────────────────────────",
  "  AWS Cloud Practitioner  ·  Azure Fundamentals",
  "  Google Analytics  ·  Google Data Analytics",
  "  Meta Front-End Dev  ·  Meta Back-End Dev",
  "  IBM Data Science  ·  IBM AI Engineering",
  "  Scrum Master (PSM I)  ·  CAPM (PMI)",
  "  NAATI CPCB1 (Mandarin ↔ English)",
  "  IELTS 7.0  ·  + 10 more",
  "",
];

const PING_TEXT = [
  "",
  "  PING rin.contact",
  "",
  "  64 bytes from rin.contact: seq=0 time=<1ms",
  "  64 bytes from rin.contact: seq=1 time=<1ms",
  "  64 bytes from rin.contact: seq=2 time=<1ms",
  "",
  "  --- rin.contact ping statistics ---",
  "  3 packets transmitted · 3 received · 0% packet loss",
  "  Status: OPERATIONAL ● all systems nominal",
  "",
];

const COMMANDS = {
  help:     () => HELP_TEXT,
  "?":      () => HELP_TEXT,
  whoami:   () => WHOAMI_TEXT,
  ls:       () => LS_TEXT,
  "ls -la": () => LS_TEXT,
  "cat experience.json": () => EXPERIENCE_TEXT,
  "cat education.txt":   () => EDUCATION_TEXT,
  "cat skills.txt":      () => SKILLS_TEXT,
  "cat projects.txt":    () => PROJECTS_TEXT,
  "cat certs.txt":       () => CERTS_TEXT,
  "ping rin.contact":    () => PING_TEXT,
};

const INTERNAL_ROUTES = ["/hire-me", "/card", "/career", "/projects", "/lab", "/about", "/secret"];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ResumePage() {
  const router = useRouter();
  const [lines, setLines] = useState(WELCOME);
  const [input, setInput]  = useState("");
  const [cmdHist, setCmdHist] = useState([]);
  const histIdxRef = useRef(-1);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto-scroll to bottom whenever lines change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Focus input on mount and click anywhere in terminal
  useEffect(() => { inputRef.current?.focus(); }, []);

  const push = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const run = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;

      // Add to command history
      setCmdHist((h) => [raw, ...h].slice(0, 50));
      histIdxRef.current = -1;

      // Echo the command
      push([`  rin@portfolio:~$ ${raw}`]);

      if (cmd === "clear") {
        setLines(["", "  cleared.", ""]);
        return;
      }

      if (cmd === "exit") {
        push(["", "  Goodbye. Redirecting to home...", ""]);
        setTimeout(() => router.push("/"), 1000);
        return;
      }

      // open <path>
      if (cmd.startsWith("open ")) {
        const target = cmd.slice(5).trim();
        if (INTERNAL_ROUTES.includes(target)) {
          push(["", `  Opening ${target}...`, ""]);
          setTimeout(() => router.push(target), 600);
          return;
        }
        if (target.startsWith("http")) {
          push(["", `  Opening ${target} in a new tab...`, ""]);
          setTimeout(() => window.open(target, "_blank", "noreferrer"), 400);
          return;
        }
        push(["", `  route not found: ${target}`, `  try: ${INTERNAL_ROUTES.join("  ")}`, ""]);
        return;
      }

      if (COMMANDS[cmd]) {
        push(COMMANDS[cmd]());
        return;
      }

      push([
        "",
        `  command not found: ${raw}`,
        "  type  help  to see available commands",
        "",
      ]);
    },
    [push, router]
  );

  const onKey = useCallback(
    (e) => {
      if (e.key === "Enter") {
        run(input);
        setInput("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(histIdxRef.current + 1, cmdHist.length - 1);
        histIdxRef.current = next;
        setInput(cmdHist[next] ?? "");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(histIdxRef.current - 1, -1);
        histIdxRef.current = next;
        setInput(next === -1 ? "" : cmdHist[next] ?? "");
      }
    },
    [input, run, cmdHist]
  );

  return (
    <>
      <Head>
        <title>Resume CLI — Rin Huang · rin.contact</title>
        <meta name="description" content="Interactive CLI resume for Rin Huang. Type commands to explore career, skills, projects, and education." />
        <link rel="canonical" href="https://rin.contact/resume" />
      </Head>

      {/* Terminal container */}
      <div
        className="min-h-[calc(100vh-64px)] bg-[#0C0C0C] flex flex-col"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#181818] flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3C3C] opacity-60" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#222]" aria-hidden="true" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#222]" aria-hidden="true" />
          <span className="ml-3 text-[10px] font-mono text-[#3A3A3A]">
            guest@rin.contact — zsh — /resume
          </span>
          <Link
            href="/"
            className="ml-auto text-[10px] font-mono text-[#444] hover:text-[#888] transition-colors"
          >
            ← home
          </Link>
        </div>

        {/* Output area */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-[#CCCCCC] leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">{line}</div>
          ))}

          {/* Input row */}
          <div className="flex items-center mt-1">
            <span className="text-[#FF3C3C] mr-2 flex-shrink-0">rin@portfolio:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className="flex-1 bg-transparent outline-none text-[#CCCCCC] caret-[#FF3C3C] font-mono text-xs"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Hint bar */}
        <div className="flex-shrink-0 border-t border-[#141414] px-4 py-2 text-[9px] font-mono text-[#2E2E2E] flex gap-6">
          <span>↑↓ history</span>
          <span>Enter run</span>
          <span>help — list commands</span>
          <span>exit — go home</span>
        </div>
      </div>
    </>
  );
}
