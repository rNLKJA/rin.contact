/**
 * /resume/terminal: the interactive CLI resume.
 * A fake shell that answers typed commands with the same career data as /resume.
 */
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import {
  welcomeLines,
  HELP_TEXT,
  PROJECTS_TEXT,
  PING_TEXT,
  whoamiLines,
  lsLines,
  experienceLines,
  educationLines,
  skillsLines,
  certsLines,
  languagesLines,
} from "@/components/resume/terminalContent";

// ── Command output library ────────────────────────────────────────────────────
// Career output is generated from lib/career-data.js (see terminalContent.js), so
// the terminal can never disagree with /resume, /cv or /career.
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

const COMMANDS = {
  help: () => HELP_TEXT,
  "?": () => HELP_TEXT,
  whoami: whoamiLines,
  ls: lsLines,
  "ls -la": lsLines,
  "cat experience.json": experienceLines,
  "cat education.txt": educationLines,
  "cat skills.txt": skillsLines,
  "cat projects.txt": () => PROJECTS_TEXT,
  "cat certs.txt": certsLines,
  "cat languages.txt": languagesLines,
  "ping rin.contact": () => PING_TEXT,
};

const INTERNAL_ROUTES = [
  "/resume",
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
export default function ResumeTerminalPage() {
  const router = useRouter();
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  // Date is set after mount so the static HTML and the first client render match.
  const [lines, setLines] = useState(() => welcomeLines(""));
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

  // Stamp the session date and focus the input on mount
  useEffect(() => {
    const date = new Date().toLocaleDateString("en-AU", { timeZone: "Australia/Adelaide" });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the date must be stamped after hydration, or the static HTML and first client render disagree
    setLines((prev) => (prev.length === welcomeLines("").length ? welcomeLines(date) : prev));
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
        setTimeout(() => router.push("/"), 150);
        return;
      }

      // open <path>
      if (cmd.startsWith("open ")) {
        const target = cmd.slice(5).trim();
        if (INTERNAL_ROUTES.includes(target)) {
          push(["", `  Opening ${target}...`, ""]);
          setTimeout(() => router.push(target), 150);
          return;
        }
        if (target.startsWith("http")) {
          push(["", `  Opening ${target} in a new tab...`, ""]);
          setTimeout(() => window.open(target, "_blank", "noreferrer"), 150);
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
        path="/resume/terminal"
        noindex
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
            guest@rin.contact · zsh · /resume/terminal
          </span>
          {/* Always-visible way back to the readable resume, so a recruiter who
              lands here and does not know to type `open /resume` still has a
              one-click path to the document. */}
          <div className="ml-auto flex items-center gap-3 flex-shrink-0 pl-3">
            <Link
              href="/resume"
              className="text-[10px] font-mono tracking-wide text-[#B0B0B0] hover:text-white border border-[#2A2A2A] hover:border-[#FF3C3C] rounded px-2 py-0.5 transition-colors"
            >
              {t("nav.resume")} <span aria-hidden="true">↗</span>
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
