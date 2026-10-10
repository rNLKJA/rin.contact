import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"));
import { useRouter } from "next/router";
import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { CERTS, ROLES, getMetrics } from "@/lib/career-data";
import { useI18n } from "@/contexts/I18nContext";

// ── Lazy-loaded components ────────────────────────────────────────────────────
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
  const [truePositive, setTruePositive] = useState(0.85);

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
      <div className="w-16 h-16 flex-shrink-0 bg-[#FF3C3C] flex items-center justify-center text-white text-3xl">
        🐱
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#1A1A1A] dark:text-white mb-1">
          {isZh ? "像素猫导览" : "Pixel Cat Tour"}
        </h3>
        <p className="text-xs text-[#595959] dark:text-[#AAAAAA]">
          {isZh ? "点击开始互动导览" : "Click to start the guided tour"}
        </p>
      </div>
    </BentoTile>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Home() {
  const { locale = "en-AU", t } = useI18n();
  const isZh = locale === "zh-Hans";
  const [bootComplete, setBootComplete] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [konamiConfetti, setKonamiConfetti] = useState(null);

  // Decisions I've informed — grounded in career-data.js and existing concept demos
  const decisions = isZh
    ? [
        {
          question: "如何为 1,500 多个持牌场所排期合规检查？",
          evidence: "整合立法要求、资源约束、战略优先级和政治因素，设计基于风险的排期框架。",
          recommendation: "向高级管理团队提交框架方案，平衡各方优先级。",
          outcome: "CBS 采纳框架，形成 TEP 法检查排期。",
          href: "/projects/regulatory-analytics-map",
        },
        {
          question: "SAPOL 投诉行政流程可以在哪里改进？",
          evidence: "通过团队访谈和操作笔记，端到端审查从受理到结案的流程。",
          recommendation: "向处领导提交审查结论和改进建议。",
          outcome: "处领导收到建议，用于工作流优化参考。",
          href: "/projects/professional-standards-reporting",
        },
        {
          question: "ENSO 如何放大大宗商品价格波动？",
          evidence: "构建带滚动窗口预测的自回归时间序列模型，量化 ENSO 对对数收益率波动的影响。",
          recommendation: "向 CSIRO 研究团队报告统计显著性及置信区间，诚实说明模型局限。",
          outcome: "研究团队将发现纳入气候-经济风险文献。",
          href: "/strategic",
        },
        {
          question: "AI 辅助的政府数据产品需要什么治理机制？",
          evidence: "从 DTA v2.0 和 EU AI Act 推导合规要求，设计篡改证明审计日志。",
          recommendation: "构建概念原型 Signal，演示请求路径上的治理层。",
          outcome: "概念原型公开，供 AI 治理讨论参考。",
          href: "/projects/signal",
        },
      ]
    : [
        {
          question: "How should we schedule compliance inspections across 1,500+ licensed sites?",
          evidence:
            "Integrated legislative requirements, resourcing constraints, strategic priorities, and political factors into a risk-based scheduling framework.",
          recommendation:
            "Presented framework to Senior Management Team, balancing competing priorities.",
          outcome: "CBS adopted the framework for TEP Act inspection scheduling.",
          href: "/projects/regulatory-analytics-map",
        },
        {
          question: "Where can SAPOL's complaint administration workflow be improved?",
          evidence:
            "End-to-end review of the workflow from receipt to closure, built from team interviews and procedure notes.",
          recommendation: "Delivered findings and recommendations to branch leadership.",
          outcome: "Branch leadership received recommendations for workflow optimization.",
          href: "/projects/professional-standards-reporting",
        },
        {
          question: "How does ENSO amplify commodity price volatility?",
          evidence:
            "Built autoregressive time-series models with rolling-window forecasting to quantify ENSO's amplification of log-return volatility.",
          recommendation:
            "Reported statistical significance and confidence intervals to CSIRO research team, honestly stating model limitations.",
          outcome: "Research team incorporated findings into climate-economic risk literature.",
          href: "/strategic",
        },
        {
          question: "What governance do AI-assisted government data products need?",
          evidence:
            "Derived compliance requirements from DTA v2.0 and EU AI Act, designed tamper-evident audit log.",
          recommendation:
            "Built concept prototype Signal to demonstrate governance layer on the request path.",
          outcome: "Concept prototype published for AI governance discussion.",
          href: "/projects/signal",
        },
      ];

  // Data-driven proof tiles
  const projectCount = 40; // From career and projects
  const revivedLabs = 12; // From /lab page
  const skillsCount = 45; // Sum of all items in SKILL_GROUPS from career-data.js
  const latestBlogPost = {
    title: isZh ? "Gmail 标签器 AI Agent" : "Gmail Labeler AI Agent",
    href: "/blog/gmail-labeler-ai-agent",
  };
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
                {projectCount}+
              </p>
            </BentoTile>

            <BentoTile>
              <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-2">
                {isZh ? "复活的实验室" : "Revived Labs"}
              </p>
              <p className="text-3xl font-bold tabular-nums text-[#1A1A1A] dark:text-white">
                {revivedLabs}
              </p>
            </BentoTile>

            <BentoTile>
              <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-2">
                {isZh ? "证据过的技能" : "Evidenced Skills"}
              </p>
              <p className="text-3xl font-bold tabular-nums text-[#1A1A1A] dark:text-white">
                {skillsCount}+
              </p>
            </BentoTile>

            <BentoTile interactive href={latestBlogPost.href}>
              <p className="text-[10px] text-[#9A9A9A] uppercase tracking-wide mb-2">
                {isZh ? "最新博文" : "Latest Post"}
              </p>
              <p className="text-sm font-medium text-[#1A1A1A] dark:text-white line-clamp-2">
                {latestBlogPost.title}
              </p>
            </BentoTile>
          </div>

          {/* ═══ INTERACTIVE TRY IT + PIXEL CAT ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
            <div className="md:col-span-2">
              <ScenarioSlider locale={locale} />
            </div>
            <div className="flex flex-col gap-4">
              <PixelCatTile
                onClick={() =>
                  alert(isZh ? "像素猫导览功能即将推出！" : "Pixel cat tour coming soon!")
                }
                locale={locale}
              />
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
