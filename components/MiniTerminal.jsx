/**
 * MiniTerminal — floating interactive terminal widget
 *
 * Open:  press  `  (backtick)  or click the >_ button
 * Close: press  Esc  or click the ✕
 * Navigate history: ↑ / ↓ arrows
 * Clear:  Ctrl+L  or  clear
 * Exit:   exit | q
 */
import React, {
  useState, useEffect, useRef, useCallback,
} from "react";
import { useI18n } from "@/contexts/I18nContext";

// ── Colour helpers ────────────────────────────────────────────────────────────
const CLS = {
  normal:  "text-[#B0B0B0]",
  white:   "text-white font-medium",
  red:     "text-[#FF3C3C]",
  dim:     "text-[#585858]",
  green:   "text-[#4ADE80]",
  error:   "text-[#FF6B6B]",
};

function Line({ c = "normal", t }) {
  return (
    <div className={`font-mono text-xs leading-relaxed whitespace-pre ${CLS[c] ?? CLS.normal}`}>
      {t === "" ? "\u00A0" : t}
    </div>
  );
}

// ── Command registry ─────────────────────────────────────────────────────────
const L = (c, t) => ({ c, t });
const N = (t) => L("normal", t);
const W = (t) => L("white", t);
const R = (t) => L("red", t);
const D = (t) => L("dim", t);
const G = (t) => L("green", t);
const E = (t) => L("error", t);
const BR = () => L("normal", "");

const BANNER = [
  D("┌─────────────────────────────────────────────────┐"),
  D("│   rin.contact  ·  interactive terminal  v5.10  │"),
  D("└─────────────────────────────────────────────────┘"),
  D('Type "help" for available commands.'),
  BR(),
];

const HELP = [
  R("▸  COMMANDS"),
  BR(),
  D("  whoami         personal profile & bio"),
  D("  ls             list site sections"),
  D("  skills         skill domains overview"),
  D("  projects       17+ selected projects"),
  D("  contact        how to reach me"),
  D("  curl           ascii art profile"),
  D("  neofetch       system info panel"),
  D("  history        command history"),
  D("  clear          clear the terminal"),
  D("  exit / q       close terminal"),
  BR(),
  D("  Easter eggs hidden throughout. Explore freely."),
  BR(),
];

const WHOAMI = [
  W("Rin Huang  ·  黄孙创宇  ·  Sunchuangyu Huang"),
  D("Senior Data Analyst  ·  Adelaide & Melbourne, AU  ·  he/him"),
  BR(),
  N("From climate risk models at CSIRO to ministerial dashboards for the"),
  N("SA Government, from genomics pipelines at WEHI to a mental health"),
  N("app at UniMelb — I work where data, strategy, and engineering meet."),
  N("Generalist by nature, specialist by discipline."),
  BR(),
  D("  web     https://rin.contact"),
  D("  github  https://github.com/rNLKJA"),
  D("  email   huang@rin.contact"),
  BR(),
];

const LS = [
  R("▸  SECTIONS"),
  BR(),
  W("  #hero        Profile & introduction"),
  W("  #timeline    Career history  (2022 → 2026)"),
  W("  #projects    17+ selected projects"),
  W("  #skills      7 expertise domains  ·  23+ certifications"),
  W("  #faq         Frequently asked questions"),
  W("  #contact     Get in touch"),
  BR(),
  D('  Tip: type "cd #timeline" to navigate there.'),
  BR(),
];

const SKILLS = [
  R("▸  SKILL DOMAINS"),
  BR(),
  W("  01  Strategic Thinking & Leadership"),
  D("      First-principles · Risk frameworks · Intelligence design"),
  W("  02  Continuous Improvement"),
  D("      Adaptability · Critical thinking · Learnability"),
  W("  03  Data Science & Intelligence"),
  D("      Python · R · SQL · Power BI · GIS · Stat Modelling"),
  W("  04  Web Development"),
  D("      Next.js · React · Node.js · AWS · Tailwind CSS"),
  W("  05  Mobile Development"),
  D("      Expo · React Native · iOS · Android · CI/CD"),
  W("  06  Research Engineering"),
  D("      Cloud HPC · Bioinformatics · celseq2 · Open source"),
  W("  07  Cloud & Infrastructure"),
  D("      AWS · Azure · Docker · Infrastructure cost optimisation"),
  BR(),
];

const PROJECTS = [
  R("▸  SELECTED PROJECTS  (17 total)"),
  BR(),
  W("  ● Mapiva               Mobile · Social connection app"),
  D("               Co-founded · Dev Lead · MVP Jan 2027"),
  W("  ● CBS Intelligence     Analytics · Ministerial dashboards · Gov"),
  W("  ● MoodQ                Mobile · Mental health · UniMelb Psychiatry"),
  W("  ● SAPOL Intelligence   Analytics · Crime analytics · Gov"),
  D("  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─"),
  N("  ○ SA Address Generator    Data Eng · Internal Gov tool"),
  N("  ○ US Political Data        Scraper · ~25,000 documents"),
  N("  ○ Flow Cytometry Pipeline  HPC · Bioinformatics · WEHI"),
  N("  ○ Climate Fact-Checker     NLP · Transformers · BERT"),
  N("  ○ ENSO Climate Risk        Time series · CSIRO × UniMelb"),
  N("  ○ Cachex AI                A* · Minimax · Game theory"),
  D("  ○ ...and 7 more at #projects"),
  BR(),
];

const CONTACT = [
  R("▸  CONTACT"),
  BR(),
  W("  web     https://rin.contact"),
  W("  github  https://github.com/rNLKJA"),
  W("  linked  https://linkedin.com/in/sunchuangyuhuang"),
  W("  email   huang@rin.contact"),
  BR(),
  D("  Always open to interesting problems. Get in touch."),
  BR(),
];

const CURL_OUTPUT = [
  D("· · · · · · · · · · · · · · · · · · · · · · · · · · · · ·"),
  BR(),
  W("  Rin Huang  ·  黄孙创宇  ·  Sunchuangyu Huang"),
  D("  Senior Data Analyst  ·  Adelaide & Melbourne, AU"),
  BR(),
  D('  "I work where data, strategy, and engineering meet.'),
  D('   Generalist by nature, specialist by discipline."'),
  BR(),
  R("  ▸  CAREER TIMELINE"),
  BR(),
  W("  2026  ─●─  Senior Data Analyst         South Australia Police"),
  D("         │   ASO7  ·  Adelaide, SA  ·  2026 → present"),
  D("         │"),
  N("  2025  ─○─  Intelligence Officer         AG's Dept SA"),
  N("  2024  ─○─  Research Assistant           University of Melbourne"),
  N("         ─○─  Software Engineer Intern    WEHI"),
  N("  2023  ─○─  Data Science Consultant      CSIRO"),
  N("  2022  ─○─  Data Analyst · Agile Lead    CSL Behring"),
  BR(),
  R("  ▸  SKILLS"),
  BR(),
  N("  Python         ████████████████████░░  expert"),
  N("  SQL            ████████████████████░░  expert"),
  N("  Strategic      ████████████████████░░  expert"),
  N("  R              █████████████████░░░░░  advanced"),
  N("  Power BI       █████████████████░░░░░  advanced"),
  BR(),
  D("· · · · · · · · · · · · · · · · · · · · · · · · · · · · ·"),
  D("  $ curl rin.contact"),
  BR(),
];

const NEOFETCH = [
  BR(),
  R("  ██████╗ ██╗███╗   ██╗"),
  R("  ██╔══██╗██║████╗  ██║"),
  R("  ██████╔╝██║██╔██╗ ██║"),
  N("  ██╔══██╗██║██║╚██╗██║"),
  D("  ██║  ██║██║██║ ╚████║"),
  D("  ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝"),
  BR(),
  W("  rin@contact"),
  D("  ─────────────────────────────────"),
  D("  OS         rin.contact v5.10.1"),
  D("  Host       Vercel Edge Network"),
  D("  Kernel     Next.js 16.2.7"),
  D("  Shell      React 19 + Tailwind"),
  D("  WM         Nothing OS Design System"),
  D("  Role       Senior Data Analyst"),
  D("  Org        South Australia Police"),
  D("  Location   Adelaide, SA, Australia"),
  D("  Uptime     2020 → present  (6+ years)"),
  D("  CPU        Generalist × Specialist"),
  D("  Memory     23+ certs · 2 degrees · 17 projects"),
  BR(),
  L("red",   "  ████"),
  BR(),
];

// Easter eggs
const EASTER_EGGS = {
  "sudo rm -rf /": [
    E("Permission denied."),
    D("(Nice try.)"),
    BR(),
  ],
  "cat .hidden": [
    D("Decrypting .hidden..."),
    BR(),
    W('  "The best interface is the one that disappears."'),
    D("  — probably Rin"),
    BR(),
  ],
  "git log --oneline": [
    G("75e5560  feat(curl): add strategic thinking & cont. learning"),
    G("a3d1f82  feat(terminal): redesign curl page for creativity"),
    N("9c4e1a7  feat(seo): strengthen entity primacy schema graph"),
    N("1f2e3b4  feat: add Baidu/Bing optimisation & IndexNow"),
    D("...and many more at github.com/rNLKJA"),
    BR(),
  ],
  "ls -la": [
    D("total 48"),
    W("drwxr-xr-x  rin  contact  pages/"),
    W("drwxr-xr-x  rin  contact  components/"),
    N("-rw-r--r--  rin  contact  package.json  (v5.10.1)"),
    D("-rw-r--r--  rin  contact  .env          [classified]"),
    R("-rw-------  rin  contact  .hidden       (try: cat .hidden)"),
    BR(),
  ],
  "pwd":    [D("/home/rin/contact"), BR()],
  "uname -a": [D("RinOS rin.contact v5.10.1 Next.js #1 SMP Vercel x86_64"), BR()],
  "ping rin.contact": [
    D("PING rin.contact — 56 data bytes"),
    G("64 bytes from rin.contact: icmp_seq=0 time=0.042 ms"),
    G("64 bytes from rin.contact: icmp_seq=1 time=0.039 ms"),
    D("2 packets transmitted, 2 received, 0% packet loss"),
    BR(),
  ],
  "vim": [
    E("VIM — there's no escape from here either."),
    D("(Press :q! if you dare — it won't work.)"),
    BR(),
  ],
  "emacs": [
    D("\"Emacs is a great operating system, lacking only a decent editor.\""),
    D("— A fellow Vim user, probably"),
    BR(),
  ],
  "python": [
    G("Python 3.12.0 (main, Oct 2023)"),
    D("[Clang 15.0.0] on darwin"),
    G(">>> print('Hello from rin.contact')"),
    W("Hello from rin.contact"),
    D(">>> # Use Ctrl+D to exit"),
    BR(),
  ],
  "fortune": [
    BR(),
    W('  "Messy data is a sign of interesting reality."'),
    BR(),
    D("  — Data Analyst Proverbs, vol. III"),
    BR(),
  ],
  "42": [
    W("The answer to life, the universe, and everything."),
    D("(You already knew that.)"),
    BR(),
  ],
  "date": [],  // dynamic, handled separately
};

// ── Command resolver ──────────────────────────────────────────────────────────
function resolve(raw, inputHistory) {
  const cmd = raw.trim().toLowerCase();
  const first = cmd.split(" ")[0];

  if (cmd === "date") return [D(new Date().toString()), BR()];
  if (EASTER_EGGS[cmd]) return EASTER_EGGS[cmd];

  switch (first) {
    case "help": return HELP;
    case "whoami": return WHOAMI;
    case "ls": return cmd === "ls" ? LS : (EASTER_EGGS[cmd] ?? [E(`Unknown flag for ls.`), BR()]);
    case "skills": return SKILLS;
    case "projects": return PROJECTS;
    case "contact": return CONTACT;
    case "curl": return CURL_OUTPUT;
    case "neofetch": return NEOFETCH;
    case "history": return inputHistory.length === 0
      ? [D("No history yet."), BR()]
      : [
          R("▸  HISTORY"),
          BR(),
          ...inputHistory.map((h, i) => D(`  ${String(i + 1).padStart(3, " ")}  ${h}`)),
          BR(),
        ];
    case "cd": {
      const target = raw.trim().split(" ")[1];
      if (!target) return [E("Usage: cd #section"), BR()];
      return [
        G(`Navigating to ${target}…`),
        BR(),
        L("__navigate__", target),
      ];
    }
    case "clear": return [L("__clear__", "")];
    case "exit":
    case "q":   return [L("__exit__", "")];
    default:
      return [
        E(`Command not found: ${raw.trim()}`),
        D("  Type \"help\" for available commands."),
        BR(),
      ];
  }
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function MiniTerminal({ onClose }) {
  const { t } = useI18n();
  const [lines, setLines]         = useState(BANNER);
  const [input, setInput]         = useState("");
  const [histIdx, setHistIdx]     = useState(-1);
  const [inputHist, setInputHist] = useState([]);

  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const scrollRef  = useRef(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Focus input whenever terminal is mounted
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = useCallback(() => {
    const raw = input.trim();
    if (!raw) return;

    const newHist = [raw, ...inputHist].slice(0, 50);
    setInputHist(newHist);
    setHistIdx(-1);
    setInput("");

    const cmdLine = L("dim", `$ ${raw}`);
    const output  = resolve(raw, newHist);

    // Handle special meta-lines
    if (output.some((l) => l.c === "__clear__")) { setLines([]); return; }
    if (output.some((l) => l.c === "__exit__"))  { onClose?.(); return; }
    if (output.some((l) => l.c === "__navigate__")) {
      const target = output.find((l) => l.c === "__navigate__")?.t;
      if (target) {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
      setLines((prev) => [...prev, cmdLine, G(`Navigated to ${target}`), BR()]);
      return;
    }

    setLines((prev) => [...prev, cmdLine, ...output]);
  }, [input, inputHist, onClose]);

  const onKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, inputHist.length - 1);
      setHistIdx(next);
      if (inputHist[next] !== undefined) setInput(inputHist[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : inputHist[next]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "Escape") {
      onClose?.();
    }
  }, [submit, histIdx, inputHist, onClose]);

  return (
    <div
      className="flex flex-col border border-[#3D3D3D] bg-[#0C0C0C] shadow-2xl
                  w-[min(600px,calc(100vw-2rem))] h-[420px] rounded-none select-none
                  transition-all duration-150"
      onClick={() => inputRef.current?.focus()}
      role="dialog"
      aria-label={t("miniTerminal.ariaLabel")}
      aria-modal="true"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2A2A2A] bg-[#111111] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Traffic lights */}
          <span className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 cursor-pointer" onClick={onClose} title={t("miniTerminal.closeTitle")} aria-label={t("miniTerminal.closeLabel")} />
          <span className="w-3 h-3 rounded-full bg-[#2A2A2A]" />
          <span className="w-3 h-3 rounded-full bg-[#2A2A2A]" />
        </div>
        <span className="font-mono text-xs text-[#585858] tracking-wider">rin@contact  —  bash</span>
        <span className="w-[60px]" />
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2A2A2A]"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#2A2A2A transparent" }}
      >
        {lines.map((line, i) => (
          <Line key={i} c={line.c} t={line.t} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-[#1E1E1E] flex-shrink-0">
        <span className="font-mono text-xs text-[#FF3C3C] flex-shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent font-mono text-xs text-[#D4D4D4] outline-none caret-[#FF3C3C] placeholder:text-[#3D3D3D]"
          placeholder={t("miniTerminal.inputPlaceholder")}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label={t("miniTerminal.inputLabel")}
        />
      </div>
    </div>
  );
}
