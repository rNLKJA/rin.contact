import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

const SkillsSection           = dynamic(() => import("@/components/sections/SkillsSection"),           { loading: () => <div className="min-h-[480px]" /> });
const CertificationsSection  = dynamic(() => import("@/components/sections/CertificationsSection"), { loading: () => <div className="min-h-[320px]" /> });
const FAQSection              = dynamic(() => import("@/components/sections/FAQSection"),              { loading: () => <div className="min-h-[320px]" /> });
const TestimonialsSection     = dynamic(() => import("@/components/sections/TestimonialsSection"),    { loading: () => <div className="min-h-[200px]" /> });

function PageHeader() {
  const { t } = useI18n();
  return (
    <div className="py-20 border-b border-[#F0F0F0] dark:border-[#1E1E1E]">
      <Link href="/" className="inline-block text-[10px] tracking-widest uppercase text-[#AAAAAA] hover:text-black dark:hover:text-white transition-colors mb-6">
        ← {t("about.back")}
      </Link>
      <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">{t("about.sectionLabel")}</p>
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">{t("about.heading")}</h1>
      <p className="text-base font-light text-[#3D3D3D] dark:text-[#AAAAAA] max-w-xl leading-relaxed">
        {t("about.description")}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const { locale = "en-AU" } = useRouter();
  const isZh = locale === "zh-Hans";

  return (
    <>
      <SeoHead
        title={isZh ? "关于我 — Rin Huang · rin.contact" : "About — Rin Huang · rin.contact"}
        description={isZh ? "Rin Huang（黄孙创宇）的技能专长、七个技术领域、23项专业认证和常见问题解答。" : "Rin Huang's skills, technical domains, 23 professional certifications, and FAQ."}
        path="/about"
        ogImage={{ title: isZh ? "关于 Rin Huang" : "About Rin Huang", subtitle: isZh ? "技能 · 认证 · 问答" : "Skills, certifications & FAQ", section: "about" }}
        locale={locale}
      />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHeader />
      </div>

      <div className="bg-[#F5F5F5] dark:bg-[#141414] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SkillsSection />
        </div>
      </div>

      <div className="bg-white dark:bg-[#0A0A0A] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <CertificationsSection />
        </div>
      </div>

      <div className="bg-[#F5F5F5] dark:bg-[#141414] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <FAQSection />
        </div>
      </div>

      <div className="bg-[#F5F5F5] dark:bg-[#141414] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <TestimonialsSection />
        </div>
      </div>
    </>
  );
}
