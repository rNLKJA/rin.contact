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
        <div className="max-w-2xl mx-auto px-6 py-20">

          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-6">
            {t("hireMe.sectionLabel")}
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            {t("hireMe.heading")}
          </h1>
          <p className="text-[#686868] text-sm mb-12 leading-relaxed">
            {t("hireMe.subheading")}
          </p>

          {/* What I bring */}
          <div className="mb-12">
            <p className="text-[10px] tracking-widest uppercase text-[#555] mb-5">{t("hireMe.whatIBring")}</p>
            <div className="space-y-4">
              {(Array.isArray(strengths) ? strengths : []).map((s) => (
                <div key={s.label} className="border-l border-[#2A2A2A] pl-4">
                  <p className="text-sm text-white">{s.label}</p>
                  <p className="text-xs text-[#686868] mt-0.5 leading-relaxed">{s.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open to */}
          <div className="mb-12">
            <p className="text-[10px] tracking-widest uppercase text-[#555] mb-5">{t("hireMe.openTo")}</p>
            <div className="grid grid-cols-2 gap-3">
              {(Array.isArray(openToList) ? openToList : []).map((item) => (
                <div key={item} className="border border-[#1E1E1E] px-3 py-2 text-xs text-[#888]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="border-t border-[#1E1E1E] pt-8 mb-12 grid grid-cols-3 gap-6 text-center">
            {(Array.isArray(stats) ? stats : []).map((s) => (
              <div key={s.l}>
                <p className="text-xl font-semibold text-[#FF3C3C]">{s.v}</p>
                <p className="text-[10px] text-[#555] tracking-widest uppercase mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <a
              href="mailto:huang@rin.contact?subject=Let's%20talk"
              className="block border border-[#FF3C3C] text-[#FF3C3C] px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200 text-center"
            >
              {t("hireMe.ctaEmail")}
            </a>
            {/* Schedule a call — Calendly */}
            {process.env.NEXT_PUBLIC_CALENDLY_URL && (
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="block border border-[#22C55E] text-[#22C55E] px-6 py-3 text-xs tracking-widest uppercase hover:bg-[#22C55E] hover:text-white transition-colors duration-200 text-center"
              >
                {t("hireMe.ctaSchedule")}
              </a>
            )}
            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 block border border-[#2A2A2A] text-[#555] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-[#555] hover:text-white transition-colors duration-200 text-center"
              >
                {t("hireMe.ctaFullProfile")}
              </Link>
              <Link
                href="/tools/card"
                className="flex-1 block border border-[#2A2A2A] text-[#555] px-6 py-2.5 text-xs tracking-widest uppercase hover:border-[#555] hover:text-white transition-colors duration-200 text-center"
              >
                {t("hireMe.ctaBusinessCard")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
