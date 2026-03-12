import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), { loading: () => <div className="min-h-[480px]" /> });
const FAQSection    = dynamic(() => import("@/components/sections/FAQSection"),    { loading: () => <div className="min-h-[320px]" /> });

function PageHeader() {
  return (
    <div className="py-20 border-b border-[#F0F0F0]">
      <Link href="/" className="inline-block text-[10px] tracking-widest uppercase text-[#AAAAAA] hover:text-black transition-colors mb-6">
        ← Back
      </Link>
      <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">◈ — About</p>
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">Skills.</h1>
      <p className="text-base font-light text-[#3D3D3D] max-w-xl leading-relaxed">
        Seven technical domains. Twenty-three professional credentials.
        And a set of questions people actually ask, answered honestly.
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About — Rin Huang · rin.contact</title>
        <meta name="description" content="Rin Huang's skills, technical domains, 23 professional certifications, and FAQ. Data science, cloud, geospatial, full-stack, strategic intelligence." />
        <link rel="canonical" href="https://rin.contact/about" />
        <meta property="og:title" content="About — Sunchuangyu (Rin) Huang" />
        <meta property="og:url" content="https://rin.contact/about" />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHeader />
      </div>

      <div className="bg-[#F5F5F5] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <SkillsSection />
        </div>
      </div>

      <div className="bg-white relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <FAQSection />
        </div>
      </div>
    </>
  );
}
