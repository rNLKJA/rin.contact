import Link from "next/link";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

export default function HireMePage() {
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  const strengths = t("hireMe.strengths");
  const openToList = t("hireMe.openToList");
  const stats = t("hireMe.stats");

  return (
    <>
      <SeoHead
        title={isZh ? "招聘意向 — Rin Huang · rin.contact" : "Hire Rin — rin.contact"}
        description={isZh ? "想招聘黄孙创宇（Rin Huang）？高级数据分析师 · 数据科学 · 政府情报 · 阿德莱德" : "Looking to hire Sunchuangyu (Rin) Huang? Senior Data Analyst · Data Scientist · Government Intelligence · Adelaide, SA"}
        path="/hire-me"
        ogImage={{ title: isZh ? "招聘 Rin Huang" : "Hire Rin Huang", subtitle: isZh ? "高级数据分析师 | 开放机会中" : "Senior Data Analyst | Open to opportunities", section: "hire-me" }}
        locale={locale}
      />

      <div className="min-h-screen bg-black text-white font-mono">
        <div className="max-w-2xl mx-auto px-5 md:px-6 py-16 md:py-20">

          {/* ── Terminal window ──────────────────────────────────────────── */}
          <div className="border border-[#262626] rounded-xl overflow-hidden bg-[#0A0A0A] shadow-2xl">

            {/* Title bar */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#1E1E1E] bg-[#0E0E0E]">
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3C3C]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E2E2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E2E2E]" />
              </span>
              <span className="ml-1 text-[11px] text-[#9A9A9A] tracking-wide truncate">
                visitor@rin.contact: ~/hire-rin
              </span>
              {/* Live availability — green status, echoing the hero status pill */}
              <span className="ml-auto flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-[#4ADE80]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] md:animate-blink" aria-hidden="true" />
                {t("hireMe.availability")}
              </span>
            </div>

            {/* Body */}
            <div className="px-5 md:px-7 py-7 md:py-9">

              {/* Command prompt that "runs" the dossier */}
              <p className="text-[13px] mb-7 text-[#C8C8C8]">
                <span className="text-[#FF3C3C]" aria-hidden="true">$ </span>
                ./hire-rin <span className="text-[#9A9A9A]">--honest</span>
                <span className="md:animate-blink ml-1 inline-block w-[0.5em] -mb-0.5 align-baseline" aria-hidden="true">▋</span>
              </p>

              <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-4">
                {t("hireMe.sectionLabel")}
              </p>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2.5 text-white">
                {t("hireMe.heading")}
              </h1>
              <p className="text-[#B0B0B0] text-sm mb-11 leading-relaxed">
                {t("hireMe.subheading")}
              </p>

              {/* What I bring */}
              <div className="mb-11">
                <p className="text-[11px] tracking-widest uppercase text-[#8A8A8A] mb-5">
                  <span className="text-[#FF3C3C]" aria-hidden="true"># </span>{t("hireMe.whatIBring")}
                </p>
                <div className="space-y-4">
                  {(Array.isArray(strengths) ? strengths : []).map((s) => (
                    <div key={s.label} className="border-l-2 border-[#FF3C3C]/40 hover:border-[#FF3C3C] pl-4 transition-colors duration-200">
                      <p className="text-sm text-white">{s.label}</p>
                      <p className="text-xs text-[#9A9A9A] mt-1 leading-relaxed">{s.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open to */}
              <div className="mb-11">
                <p className="text-[11px] tracking-widest uppercase text-[#8A8A8A] mb-5">
                  <span className="text-[#FF3C3C]" aria-hidden="true"># </span>{t("hireMe.openTo")}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {(Array.isArray(openToList) ? openToList : []).map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 border border-[#222222] hover:border-[#3D3D3D] px-3 py-2.5 text-xs text-[#C0C0C0] transition-colors duration-200"
                    >
                      <span className="text-[#FF3C3C] flex-shrink-0" aria-hidden="true">▸</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-[#1E1E1E] pt-8 mb-11 grid grid-cols-3 gap-6 text-center">
                {(Array.isArray(stats) ? stats : []).map((s) => (
                  <div key={s.l}>
                    <p className="text-2xl font-semibold text-[#FF3C3C] tabular-nums">{s.v}</p>
                    <p className="text-[10px] text-[#9A9A9A] tracking-widest uppercase mt-1.5">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <p className="text-[11px] tracking-widest uppercase text-[#8A8A8A] mb-4">
                <span className="text-[#FF3C3C]" aria-hidden="true">$ </span>connect
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:huang@rin.contact?subject=Let's%20talk"
                  className="block border border-[#FF3C3C] bg-[#FF3C3C] text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-transparent hover:text-[#FF3C3C] transition-colors duration-200 text-center"
                >
                  {t("hireMe.ctaEmail")}
                </a>
                {/* Schedule a call — Calendly */}
                {process.env.NEXT_PUBLIC_CALENDLY_URL && (
                  <a
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-[#22C55E] text-[#4ADE80] px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#22C55E] hover:text-black transition-colors duration-200 text-center"
                  >
                    {t("hireMe.ctaSchedule")}
                  </a>
                )}
                <div className="flex gap-3">
                  <Link
                    href="/"
                    className="flex-1 block border border-[#2A2A2A] text-[#9A9A9A] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-[#9A9A9A] hover:text-white transition-colors duration-200 text-center"
                  >
                    {t("hireMe.ctaFullProfile")}
                  </Link>
                  <Link
                    href="/tools/card"
                    className="flex-1 block border border-[#2A2A2A] text-[#9A9A9A] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-[#9A9A9A] hover:text-white transition-colors duration-200 text-center"
                  >
                    {t("hireMe.ctaBusinessCard")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
