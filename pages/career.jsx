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
        <meta property="og:description" content="Four years across Government, Research, and Engineering. Seven roles. One startup. ASO7 @ SAPOL, WEHI, CSIRO, Mapiva." />
        <meta property="og:url" content="https://rin.contact/career" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Career%20Journey&subtitle=7%20roles%20across%20Government%2C%20Research%20%26%20Engineering&section=career" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Career — Sunchuangyu (Rin) Huang" />
        <meta name="twitter:description" content="ASO7 @ SAPOL · WEHI · CSIRO · Mapiva. Interactive career metro map." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Career%20Journey&subtitle=7%20roles%20across%20Government%2C%20Research%20%26%20Engineering&section=career" />
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
