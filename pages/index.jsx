import React, { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import PixelCat from "@/components/guide/PixelCat";
import { PROJECTS } from "@/lib/projects-data";
import { COURSEWORK } from "@/lib/coursework-data";
import { getAllPosts } from "@/lib/posts";
import { buildSkillsAtlas } from "@/lib/skills-atlas";
import { restartGuide } from "@/hooks/useGuideProgress";
import { useI18n } from "@/contexts/I18nContext";
import en from "@/locales/en-AU.json";
import zh from "@/locales/zh-Hans.json";

// ── Lazy-loaded components ────────────────────────────────────────────────────
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
const MiniTerminal = dynamic(() => import("@/components/MiniTerminal"), { ssr: false });
const ConfettiBurst = dynamic(() => import("@/components/ui/ConfettiBurst"), { ssr: false });
const HeroDotCanvas = dynamic(() => import("@/components/ui/HeroDotCanvas"), { ssr: false });

// ── Boot sequence typewriter ───────────────────────────────────────────────────
function BootSequence({ onComplete, locale = "en-AU" }) {
  const isZh = locale === "zh-Hans";
  const [line, setLine] = useState(0);

  const lines = isZh
    ? ["初始化系统...", "加载用户配置...", "建立连接...", "准备就绪"]
    : ["Initializing system...", "Loading user profile...", "Establishing connection...", "Ready"];

  useEffect(() => {
    if (line >= lines.length) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLine((l) => l + 1), 400);
    return () => clearTimeout(t);
  }, [line, lines.length, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="font-mono text-[#00FF00] text-sm space-y-1">
        {lines.slice(0, line + 1).map((l, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[#00FF00]">{">"}</span>
            <span>{l}</span>
            {i === line && <span className="animate-pulse">_</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Bento grid tile base ───────────────────────────────────────────────────────
function BentoTile({ className = "", children, interactive = false, onClick, href }) {
  const base = `bg-white dark:bg-[#0C0C0C] border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 transition-colors duration-200`;
  const hover = interactive
    ? "hover:border-[#FF3C3C] hover:shadow-[0_0_0_1px_#FF3C3C] cursor-pointer"
    : "";

  if (href) {
    return (
      <Link href={href} className={`${base} ${hover} ${className} block`}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={`${base} ${hover} ${className} w-full text-left`}>
        {children}
      </button>
    );
  }

  return <div className={`${base} ${className}`}>{children}</div>;
}

// ── Decision tile (Question → Evidence → Recommendation → What changed) ───────
function DecisionTile({ decision, locale = "en-AU" }) {
  const isZh = locale === "zh-Hans";
  return (
    <BentoTile interactive href={decision.href} className="flex flex-col justify-between">
      <div>
        <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-3">
          {isZh ? "决策案例" : "Decision"}
        </p>
        <h3 className="text-base font-semibold tracking-tight mb-2 text-[#1A1A1A] dark:text-white">
          {decision.question}
        </h3>
        <div className="space-y-2 text-xs text-[#595959] dark:text-[#AAAAAA]">
          <p>
            <strong className="text-[#1A1A1A] dark:text-white">
              {isZh ? "证据：" : "Evidence:"}
            </strong>{" "}
            {decision.evidence}
          </p>
          <p>
            <strong className="text-[#1A1A1A] dark:text-white">
              {isZh ? "建议：" : "Recommendation:"}
            </strong>{" "}
            {decision.recommendation}
          </p>
          <p>
            <strong className="text-[#FF3C3C]">{isZh ? "结果：" : "What changed:"}</strong>{" "}
            {decision.outcome}
          </p>
        </div>
      </div>
      <div className="mt-4 text-[10px] text-[#9A9A9A] flex items-center gap-1">
        <span>{isZh ? "查看详情" : "View details"}</span>
        <span aria-hidden="true">→</span>
      </div>
    </BentoTile>
  );
}

// ── Interactive scenario slider (sensitivity analysis demo) ────────────────────
function ScenarioSlider({ locale = "en-AU" }) {
  const isZh = locale === "zh-Hans";
  const [threshold, setThreshold] = useState(0.7);
  const truePositive = 0.85;

  // Synthetic model: precision = TP / (TP + FP), where FP depends on threshold
  const falsePositive = Math.max(0.05, (1 - threshold) * 0.3);
  const precision = (truePositive / (truePositive + falsePositive)).toFixed(2);
  const recall = (threshold * truePositive).toFixed(2);

  return (
    <BentoTile className="flex flex-col">
      <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-3">
        {isZh ? "互动演示" : "Interactive Demo"}
      </p>
      <h3 className="text-base font-semibold tracking-tight mb-3 text-[#1A1A1A] dark:text-white">
        {isZh ? "分类阈值的权衡" : "Classification Threshold Trade-Off"}
      </h3>
      <p className="text-xs text-[#595959] dark:text-[#AAAAAA] mb-4">
        {isZh
          ? "调整阈值，观察精确率与召回率的变化。这是合成数据演示。"
          : "Adjust the threshold and watch precision vs recall change. Synthetic data for demo purposes."}
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="threshold-slider"
            className="text-xs text-[#1A1A1A] dark:text-white block mb-2"
          >
            {isZh ? "分类阈值：" : "Threshold: "}
            {threshold.toFixed(2)}
          </label>
          <input
            id="threshold-slider"
            type="range"
            min="0.3"
            max="0.95"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-[#FF3C3C]"
            aria-label={isZh ? "分类阈值" : "Classification threshold"}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-3 rounded">
            <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-1">
              {isZh ? "精确率" : "Precision"}
            </p>
            <p className="text-2xl font-bold tabular-nums text-[#1A1A1A] dark:text-white">
              {precision}
            </p>
          </div>
          <div className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-3 rounded">
            <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-1">
              {isZh ? "召回率" : "Recall"}
            </p>
            <p className="text-2xl font-bold tabular-nums text-[#1A1A1A] dark:text-white">
              {recall}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#9A9A9A] mt-2">
          {isZh
            ? "策略分析师根据业务背景选择合适的阈值：高精确率用于监管执法，高召回率用于风险筛查。"
            : "A strategy analyst picks the threshold based on context: high precision for enforcement, high recall for risk screening."}
        </p>
      </div>
    </BentoTile>
  );
}

// ── Pixel cat guide tile ───────────────────────────────────────────────────────
function PixelCatTile({ onClick, locale = "en-AU" }) {
  const isZh = locale === "zh-Hans";
  return (
    <BentoTile interactive onClick={onClick} className="flex items-center gap-4">
      <div className="w-16 h-16 flex-shrink-0 border border-[#E0E0E0] dark:border-[#3D3D3D] flex items-center justify-center">
        <PixelCat frame="idle" className="w-12 h-12" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#1A1A1A] dark:text-white mb-1">
          {isZh ? "跟着小猫逛一圈" : "Take the guided tour"}
        </h3>
        <p className="text-xs text-[#595959] dark:text-[#AAAAAA]">
          {isZh ? "Pawsibly 带你看完整个网站" : "Pawsibly walks you round the site"}
        </p>
      </div>
    </BentoTile>
  );
}

// ── Konami easter egg (kept from the previous home page) ──────────────────────
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function GlitchOverlay({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <div
        className="absolute left-0 w-full h-1 bg-[#FF3C3C] opacity-60"
        style={{ animation: "glitch-scan 0.6s linear infinite", top: 0 }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="border border-[#FF3C3C] bg-black/90 px-8 py-5 text-center animate-glitch-shake">
          <p className="font-mono text-[#FF3C3C] text-xs tracking-widest uppercase mb-1">
            ↑↑↓↓←→←→BA · UNLOCKED
          </p>
          <p className="font-mono text-white text-sm font-bold tracking-wider">
            You found the easter egg.
          </p>
          <p className="font-mono text-[#585858] text-xs mt-1">
            Achievement: 30 extra years of curiosity.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Home({ stats }) {
  const { locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  const [bootComplete, setBootComplete] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [konamiConfetti, setKonamiConfetti] = useState(null);
  const [glitchOn, setGlitchOn] = useState(false);
  const konamiRef = useRef([]);

  // Backtick toggles the terminal; the Konami code unlocks the easter egg
  const handleKeyDown = useCallback((e) => {
    const next = [...konamiRef.current, e.key].slice(-KONAMI.length);
    konamiRef.current = next;
    if (next.join(",") === KONAMI.join(",")) {
      konamiRef.current = [];
      setGlitchOn(true);
      setKonamiConfetti(Date.now());
      return;
    }
    if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setTermOpen((o) => !o);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Decisions I've informed — grounded in career-data.js and existing concept demos
  const decisions = isZh
    ? [
        {
          question: "1,500 多个持牌场所的合规检查该怎么排期？",
          evidence: "把立法要求、资源限制、战略重点和政治因素整合进一个基于风险的排期框架。",
          recommendation: "向高级管理团队提交框架，在相互冲突的优先级之间取得平衡。",
          outcome: "1,500 多个持牌场所的检查按这个框架排期，并配有季度合规与执法报告。",
          href: "/projects/regulatory-analytics-map",
        },
        {
          question: "SAPOL 的投诉行政流程哪里可以改进？",
          evidence: "从受理到结案，基于团队访谈和团队自己的操作笔记，对整个流程做端到端审查。",
          recommendation: "把审查结论和改进建议提交给处领导。",
          outcome: "结论和建议已交给处领导决定下一步。",
          href: "/projects/professional-standards-reporting",
        },
        {
          question: "厄尔尼诺（ENSO）会在多大程度上放大大宗商品价格波动？",
          evidence:
            "作为 CSIRO 聘请的五人数据顾问团队一员，构建带滚动窗口预测的自回归时间序列模型，衡量 ENSO 对对数收益率波动的放大作用。",
          recommendation: "向 CSIRO 研究人员汇报结果，并担任墨尔本大学与 CSIRO 之间的联络人。",
          outcome:
            "成果用于 CSIRO 关于气候风险与粮食安全的研究。2026 年用公开数据重建后复检，没有发现预测上的提升。",
          href: "/projects/coursework#enso-commodity-prices",
        },
        {
          question: "AI 辅助的政府数据产品需要怎样的治理？",
          evidence:
            "梳理 DTA AI 政策和欧盟 AI 法案对这类产品的要求，为每个请求设计防篡改、哈希链式的审计日志。",
          recommendation: "构建 Signal 参考实现，把治理检查放在请求路径上。",
          outcome: "已上线，覆盖南澳和纽约的犯罪统计，128 项测试全部通过。",
          href: "/projects/signal",
        },
      ]
    : [
        {
          question: "How should we schedule compliance inspections across 1,500+ licensed sites?",
          evidence:
            "Brought legislative requirements, resourcing limits, strategic priorities and political factors into one risk-based scheduling framework.",
          recommendation:
            "Presented the framework to the Senior Management Team, balancing priorities that pulled in different directions.",
          outcome:
            "Inspections for 1,500+ licensed sites were scheduled on the framework, backed by a quarterly compliance and enforcement report.",
          href: "/projects/regulatory-analytics-map",
        },
        {
          question: "Where can SAPOL's complaint administration workflow be improved?",
          evidence:
            "An end-to-end review of the workflow from receipt to file closure, built from team interviews and the team's own procedure notes.",
          recommendation: "Took the findings and recommendations to branch leadership.",
          outcome: "The findings and recommendations are with branch leadership to act on.",
          href: "/projects/professional-standards-reporting",
        },
        {
          question: "How much does El Niño (ENSO) amplify commodity price volatility?",
          evidence:
            "As one of a five-person team engaged by CSIRO as data consultants, I built autoregressive time-series models with rolling-window forecasting to measure ENSO's effect on log-return volatility.",
          recommendation:
            "Reported the results to CSIRO researchers and acted as the point of contact between the University and CSIRO.",
          outcome:
            "The work fed CSIRO research on climate risk and food security. A 2026 rebuild on public data re-tested the idea and found no forecasting gain.",
          href: "/projects/coursework#enso-commodity-prices",
        },
        {
          question: "What governance do AI-assisted government data products need?",
          evidence:
            "Mapped what the DTA AI policy and the EU AI Act expect of these products, and designed a tamper-evident, hash-chained audit log for every request.",
          recommendation:
            "Built Signal, a working reference implementation that puts governance checks on the request path.",
          outcome: "Live on SA and NYC crime statistics, with all 128 tests passing.",
          href: "/projects/signal",
        },
      ];

  // Proof tiles, computed at build time from the site's own data (see getStaticProps)
  const latestPost = stats?.latestPost;
  const currentRole = isZh ? "ASO7 高级数据分析师" : "ASO7 Senior Data Analyst";

  if (!bootComplete) {
    return <BootSequence onComplete={() => setBootComplete(true)} locale={locale} />;
  }

  return (
    <>
      <SeoHead
        title={
          isZh ? "Rin Huang (黄孙创宇) — 个人主页" : "Rin Huang (黄孙创宇) — Official Portfolio"
        }
        description={
          isZh
            ? "Rin Huang（黄孙创宇）的官方网站。南澳大利亚警察局高级数据分析师，Mapiva 联合创始人兼开发负责人。"
            : "Official website of Rin Huang, ASO7 Senior Data Analyst at South Australia Police and Co-Founder & Dev Lead at Mapiva."
        }
        path="/"
        ogType="profile"
        locale={locale}
      />

      <Head>
        <title>
          {isZh ? "Rin Huang (黄孙创宇) — 个人主页" : "Rin Huang (黄孙创宇) — Official Portfolio"}
        </title>
      </Head>

      {glitchOn && <GlitchOverlay onDone={() => setGlitchOn(false)} />}
      {konamiConfetti && <ConfettiBurst trigger={konamiConfetti} size="big" />}

      {/* Terminal toggle button */}
      <button
        onClick={() => setTermOpen((o) => !o)}
        aria-label={
          termOpen ? (isZh ? "关闭终端" : "Close terminal") : isZh ? "打开终端" : "Open terminal"
        }
        className="fixed bottom-6 right-6 z-40 w-11 h-11 border border-[#3D3D3D] bg-[#0C0C0C]
                   flex items-center justify-center text-[#FF3C3C] font-mono text-sm
                   hover:border-[#FF3C3C] transition-colors duration-200"
      >
        {termOpen ? "✕" : ">_"}
      </button>

      {termOpen && (
        <div className="fixed bottom-20 right-6 z-40 shadow-2xl">
          <MiniTerminal onClose={() => setTermOpen(false)} />
        </div>
      )}

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
        {/* Dot-matrix background */}
        <div
          className="dot-matrix fixed top-0 right-0 w-72 h-72 opacity-[0.03] pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-20 relative z-10">
          {/* ═══ HERO TILE ═══ */}
          <BentoTile className="mb-6 md:mb-8">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="font-mono text-[#FF3C3C] text-xs mb-4">
                  <span className="inline-block animate-pulse mr-2">●</span>
                  {isZh ? "系统初始化完成" : "SYSTEM INITIALIZED"}
                </div>

                <h1
                  className="font-mono text-3xl md:text-4xl font-bold tracking-tight mb-3 text-[#1A1A1A] dark:text-white"
                  style={{ fontFamily: "var(--font-bitcount), monospace" }}
                >
                  Rin Huang
                  <span className="text-[#9A9A9A] ml-2 text-lg">黄孙创宇</span>
                </h1>

                {/* DRAFT hero line from deliverable 1 — Option A */}
                <p className="text-lg md:text-xl text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed mb-1">
                  {isZh
                    ? "我界定问题，权衡证据，并交付改变了决策的建议。"
                    : "I frame the questions, weigh the evidence, and deliver recommendations that changed decisions."}
                </p>
                <p className="text-xs text-[#FF3C3C] uppercase tracking-wide font-mono">
                  [{isZh ? "策略定位草稿 — 待 Rin 批准" : "STRATEGY DRAFT — PENDING RIN'S APPROVAL"}
                  ]
                </p>
              </div>

              <div className="hidden md:block w-32 h-32 relative">
                <HeroDotCanvas />
              </div>
            </div>
          </BentoTile>

          {/* ═══ DECISIONS I'VE INFORMED ═══ */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-xs tracking-widest uppercase text-[#9A9A9A] mb-4 font-mono">
              {isZh ? "我支撑过的决策" : "Decisions I've Informed"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {decisions.map((d, i) => (
                <DecisionTile key={i} decision={d} locale={locale} />
              ))}
            </div>
          </div>

          {/* ═══ PROOF TILES (DATA-DRIVEN) ═══ */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
            <BentoTile>
              <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-2">
                {isZh ? "项目" : "Projects"}
              </p>
              <p className="text-3xl font-bold tabular-nums text-[#1A1A1A] dark:text-white">
                {stats.projects}
              </p>
            </BentoTile>

            <BentoTile interactive href="/projects/coursework">
              <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-2">
                {isZh ? "复活的课程项目" : "Coursework revived"}
              </p>
              <p className="text-3xl font-bold tabular-nums text-[#1A1A1A] dark:text-white">
                {stats.labs}
              </p>
            </BentoTile>

            <BentoTile interactive href="/skills">
              <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-2">
                {isZh ? "有据可查的技能" : "Evidenced skills"}
              </p>
              <p className="text-3xl font-bold tabular-nums text-[#1A1A1A] dark:text-white">
                {stats.skills}
              </p>
            </BentoTile>

            <BentoTile interactive href={latestPost ? `/blog/${latestPost.slug}` : "/blog"}>
              <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-2">
                {isZh ? "最新博文" : "Latest Post"}
              </p>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-white line-clamp-2">
                {latestPost ? latestPost.title : isZh ? "博客" : "Blog"}
              </p>
            </BentoTile>
          </div>

          {/* ═══ INTERACTIVE TRY IT + PIXEL CAT ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
            <div className="md:col-span-2">
              <ScenarioSlider locale={locale} />
            </div>
            <div className="flex flex-col gap-4">
              <PixelCatTile onClick={() => restartGuide()} locale={locale} />
              <BentoTile>
                <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-2">
                  {isZh ? "当前职位" : "Current Role"}
                </p>
                <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">{currentRole}</p>
                <p className="text-xs text-[#9A9A9A] mt-1">SAPOL</p>
              </BentoTile>
            </div>
          </div>

          {/* ═══ TESTIMONIALS (the site's real, named endorsements) ═══ */}
          <div className="mb-6 md:mb-8">
            <TestimonialsSection />
          </div>

          {/* ═══ CLEAR CALLS TO ACTION ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BentoTile interactive href="/resume" className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-1">
                  {isZh ? "查看简历" : "View Resume"}
                </h3>
                <p className="text-xs text-[#595959] dark:text-[#AAAAAA]">
                  {isZh ? "完整职业经历与技能" : "Full career history and skills"}
                </p>
              </div>
              <span className="text-[#FF3C3C] text-2xl" aria-hidden="true">
                →
              </span>
            </BentoTile>

            <BentoTile
              interactive
              href="mailto:huang@rin.contact"
              className="flex items-center justify-between bg-[#FF3C3C] border-[#FF3C3C] text-white"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">{isZh ? "联系我" : "Get in Touch"}</h3>
                <p className="text-xs opacity-90">huang@rin.contact</p>
              </div>
              <span className="text-2xl" aria-hidden="true">
                ✉
              </span>
            </BentoTile>
          </div>
        </div>
      </div>
    </>
  );
}

// Proof-tile numbers come from the same data the rest of the site uses, so they
// can't drift: the Projects list, the coursework entries, the skills atlas and
// the newest blog post.
export async function getStaticProps({ locale = "en-AU" }) {
  const posts = (await getAllPosts()).map(({ slug, title, date, tags }) => ({
    slug,
    title,
    date: date ?? null,
    tags: tags ?? [],
  }));
  const dict = locale === "zh-Hans" ? zh : en;
  const atlas = buildSkillsAtlas(locale, { dict, posts });
  const latest = posts[0];
  return {
    props: {
      stats: {
        projects: PROJECTS.length,
        labs: COURSEWORK.length,
        skills: atlas.stats.skills,
        latestPost: latest ? { slug: latest.slug, title: latest.title } : null,
      },
    },
  };
}
