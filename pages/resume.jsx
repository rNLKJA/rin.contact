/**
 * /resume — Interactive CLI resume
 * A fake shell that responds to typed commands with real career data.
 */
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

// ── Command output library ────────────────────────────────────────────────────

const WELCOME = [
  "",
  "  ╭──────────────────────────────────────────────────╮",
  "  │  rin.contact/resume  ·  interactive CV           │",
  "  │  type  help  to see available commands           │",
  "  ╰──────────────────────────────────────────────────╯",
  "",
  "  Logged in as: guest@rin.contact",
  "  Session: " + new Date().toLocaleDateString("en-AU", { timeZone: "Australia/Adelaide" }),
  "",
  "  Prefer a document?  Type  open /cv  for a printable CV.",
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
  "  type                typing speed test",
  "  open /cv            document CV (save as PDF)",
  "  open /hire-me       hiring pitch & contact",
  "  open /tools/card    digital business card",
  "  open /career        career timeline & metro map",
  "  open /lab           data playground",
  "  clear               clear the terminal",
  "  exit                return home",
  "  ─────────────────────────────────────────────────",
  "",
];

// Sentences for the typing challenge
const TYPE_SENTENCES = [
  "All models are wrong, but some are useful.",
  "Generalist by nature, specialist by discipline.",
  "The best dataset is a well-framed question.",
  "Ship it. Iterate. Improve. Repeat.",
  "Data without context is just noise.",
  "Strategic thinking is knowing which questions to ask.",
  "Compound interest applies to skills, not just money.",
  "Good code is code your future self can read.",
];

function pickSentence() {
  return TYPE_SENTENCES[Math.floor(Math.random() * TYPE_SENTENCES.length)];
}

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
  "  -rw-r--r--  projects.txt       21 shipped to production",
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
  "  PROJECTS.TXT  (21 shipped to production)",
  "  ─────────────────────────────────────────────────",
  "",
  "  ● Mapiva            social connection app · React Native · Aug 2025",
  "  ● MoodQ             mood-tracking research app · UniMelb Psychiatry",
  "  ● CBS Dashboard     GIS + analytics · Power BI · AGD SA",
  "  ● celseq2 (contrib) bioinformatics pipeline · open-source · WEHI",
  "  ● ENSO risk model   climate & food-security · CSIRO",
  "  ● HPLC automation   bioprocess data pipeline · CSL",
  "  ● rin.contact       this site · Next.js · Vercel",
  "  · · ·  + 14 more  →  rin.contact/projects",
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
  help: () => HELP_TEXT,
  "?": () => HELP_TEXT,
  whoami: () => WHOAMI_TEXT,
  ls: () => LS_TEXT,
  "ls -la": () => LS_TEXT,
  "cat experience.json": () => EXPERIENCE_TEXT,
  "cat education.txt": () => EDUCATION_TEXT,
  "cat skills.txt": () => SKILLS_TEXT,
  "cat projects.txt": () => PROJECTS_TEXT,
  "cat certs.txt": () => CERTS_TEXT,
  "ping rin.contact": () => PING_TEXT,
};

const INTERNAL_ROUTES = [
  "/cv",
  "/hire-me",
  "/tools/card",
  "/career",
  "/projects",
  "/lab",
  "/about",
  "/fun/secret",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ResumePage() {
  const router = useRouter();
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  const [lines, setLines] = useState(WELCOME);
  const [input, setInput] = useState("");
  const [cmdHist, setCmdHist] = useState([]);
  const histIdxRef = useRef(-1);
  const outputRef = useRef(null); // scroll container, not the page
  const inputRef = useRef(null);

  // Typing challenge state
  const [typingMode, setTypingMode] = useState(false);
  const typingSentenceRef = useRef("");
  const typingStartRef = useRef(null);

  // Scroll the output div itself — never touches the outer page scroll position
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Focus input on mount and click anywhere in terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

      if (cmd === "type") {
        const sentence = pickSentence();
        typingSentenceRef.current = sentence;
        typingStartRef.current = null;
        setTypingMode(true);
        push([
          "",
          "  ── TYPING SPEED TEST ─────────────────────────────",
          "",
          `  ${sentence}`,
          "",
          "  Type the line above exactly, then press Enter.",
          "  Timer starts with your first keystroke.",
          "  (Esc to cancel)",
          "",
        ]);
        return;
      }

      if (COMMANDS[cmd]) {
        push(COMMANDS[cmd]());
        return;
      }

      push(["", `  command not found: ${raw}`, "  type  help  to see available commands", ""]);
    },
    [push, router]
  );

  const onKey = useCallback(
    (e) => {
      // ── Typing challenge mode ────────────────────────────────────────────
      if (typingMode) {
        if (e.key === "Escape") {
          e.preventDefault();
          setTypingMode(false);
          setInput("");
          push(["", "  Typing test cancelled.", ""]);
          return;
        }
        if (e.key === "Enter") {
          e.preventDefault();
          const elapsed = typingStartRef.current
            ? (Date.now() - typingStartRef.current) / 1000 / 60
            : 1;
          const target = typingSentenceRef.current;
          const wordCount = target.trim().split(/\s+/).length;
          const wpm = Math.round(wordCount / elapsed);

          // Accuracy — char-by-char comparison
          let correct = 0;
          const typed = input;
          for (let i = 0; i < Math.max(typed.length, target.length); i++) {
            if (typed[i] === target[i]) correct++;
          }
          const accuracy = target.length > 0 ? Math.round((correct / target.length) * 100) : 0;

          let grade =
            accuracy >= 98 && wpm >= 60
              ? "S — flawless"
              : accuracy >= 95 && wpm >= 45
                ? "A — excellent"
                : accuracy >= 90 && wpm >= 30
                  ? "B — solid"
                  : accuracy >= 80
                    ? "C — keep practising"
                    : "D — slow down, accuracy first";

          push([
            "",
            "  ── RESULTS ───────────────────────────────────────",
            `  Speed     ${wpm} WPM`,
            `  Accuracy  ${accuracy}%`,
            `  Grade     ${grade}`,
            "",
            `  Your input: ${typed}`,
            `  Expected:   ${target}`,
            "",
            `  ${accuracy === 100 ? "Perfect. Rin would approve." : "Try  type  again to improve."}`,
            "",
          ]);
          setTypingMode(false);
          setInput("");
          return;
        }
        // Start timer on first character input
        if (!typingStartRef.current && e.key.length === 1) {
          typingStartRef.current = Date.now();
        }
        return;
      }

      // ── Normal command mode ──────────────────────────────────────────────
      if (e.key === "Enter") {
        e.preventDefault();
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
        setInput(next === -1 ? "" : (cmdHist[next] ?? ""));
      }
    },
    [input, run, cmdHist, typingMode, push]
  );

  return (
    <>
      <SeoHead
        title={
          isZh ? "命令行简历 — Rin Huang · rin.contact" : "Resume CLI — Rin Huang · rin.contact"
        }
        description={
          isZh
            ? "Rin Huang（黄孙创宇）的交互式命令行简历。输入命令探索职业经历、技能、项目和学历。"
            : "Interactive CLI resume for Rin Huang. Type commands to explore career, skills, projects, and education."
        }
        path="/resume"
        ogImage={{
          title: isZh ? "交互式简历" : "Interactive Resume",
          subtitle: isZh ? "输入命令探索职业与项目" : "Type commands to explore career & projects",
          section: "resume",
        }}
        locale={locale}
      />

      {/* Visually-hidden page heading. The terminal UI has no visible heading by
          design, but the page still needs an h1 for screen-reader navigation and
          SEO — without it this page had no headings at all. */}
      <h1 className="sr-only">
        {isZh
          ? "交互式命令行简历 — 黄孙创宇 (Rin Huang)"
          : "Interactive CLI Resume — Sunchuangyu (Rin) Huang"}
      </h1>

      {/* Locale context header */}
      {isZh && (
        <div className="bg-[#0C0C0C] border-b border-[#181818] px-6 py-3">
          <p className="text-[10px] font-mono text-[#555] tracking-widest uppercase">
            {t("resume.contextHeader")}
          </p>
        </div>
      )}

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
          <span className="ml-3 text-[10px] font-mono text-[#3A3A3A] truncate min-w-0">
            guest@rin.contact — zsh — /resume
          </span>
          {/* Always-visible escape to the clean, printable CV — a recruiter who
              lands on the terminal and does not know to type `open /cv` still has
              a one-click path to the actual document. */}
          <div className="ml-auto flex items-center gap-3 flex-shrink-0 pl-3">
            <Link
              href="/cv"
              className="text-[10px] font-mono tracking-wide text-[#B0B0B0] hover:text-white border border-[#2A2A2A] hover:border-[#FF3C3C] rounded px-2 py-0.5 transition-colors"
            >
              {t("nav.cv")} <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/"
              className="text-[10px] font-mono text-[#444] hover:text-[#888] transition-colors"
            >
              ← home
            </Link>
          </div>
        </div>

        {/* Output area — ref used for direct scrollTop, never scrollIntoView */}
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-xs text-[#CCCCCC] leading-relaxed"
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line}
            </div>
          ))}

          {/* Input row */}
          <div className="flex items-center mt-1">
            <span className="text-[#FF3C3C] mr-2 flex-shrink-0">
              {typingMode ? "type >" : "rin@portfolio:~$"}
            </span>
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
              aria-label={typingMode ? "Typing challenge input" : "Terminal input"}
            />
          </div>
        </div>

        {/* Hint bar */}
        <div className="flex-shrink-0 border-t border-[#141414] px-4 py-2 text-[9px] font-mono text-[#2E2E2E] flex gap-6">
          {typingMode ? (
            <>
              <span className="text-[#FF3C3C]">typing mode</span>
              <span>Enter submit</span>
              <span>Esc cancel</span>
            </>
          ) : (
            <>
              {isZh ? (
                <>
                  <span>↑↓ {t("resume.hintBar")}</span>
                </>
              ) : (
                <>
                  <span>↑↓ history</span>
                  <span>Enter run</span>
                  <span>help — list commands</span>
                  <span>exit — go home</span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
