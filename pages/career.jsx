import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";

const TimelineSection   = dynamic(() => import("@/components/sections/TimelineSection"),   { loading: () => <div className="min-h-[480px]" /> });
const MetroMapSection   = dynamic(() => import("@/components/sections/MetroMapSection"),   { loading: () => <div className="min-h-[360px]" /> });

function PageHeader() {
  return (
    <div className="py-20 border-b border-[#F0F0F0]">
      <Link href="/" className="inline-block text-[10px] tracking-widest uppercase text-[#AAAAAA] hover:text-black transition-colors mb-6">
        ← Back
      </Link>
      <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">◈ — Career</p>
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">Journey.</h1>
      <p className="text-base font-light text-[#3D3D3D] max-w-xl leading-relaxed">
        Four years across Government, Research, and Engineering.
        Seven roles. One co-founded startup. Timeline and metro map below.
      </p>
    </div>
  );
}

export default function CareerPage() {
  return (
    <>
      <Head>
        <title>Career — Rin Huang · rin.contact</title>
        <meta name="description" content="Rin Huang's full career timeline — ASO7 at SAPOL, research at WEHI & CSIRO, co-founder of Mapiva. Interactive career metro map across Government, Research, and Engineering." />
        <link rel="canonical" href="https://rin.contact/career" />
        <meta property="og:title" content="Career — Sunchuangyu (Rin) Huang" />
        <meta property="og:url" content="https://rin.contact/career" />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHeader />
      </div>

      {/* Timeline */}
      <div className="bg-[#F5F5F5] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <TimelineSection />
        </div>
      </div>

      {/* Metro Map */}
      <div className="bg-white relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <MetroMapSection />
        </div>
      </div>
    </>
  );
}
