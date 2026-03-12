import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { loading: () => <div className="min-h-[480px]" /> });

function PageHeader() {
  return (
    <div className="py-20 border-b border-[#F0F0F0]">
      <Link href="/" className="inline-block text-[10px] tracking-widest uppercase text-[#AAAAAA] hover:text-black transition-colors mb-6">
        ← Back
      </Link>
      <p className="text-xs tracking-widest uppercase text-[#FF3C3C] mb-3">◈ — Projects</p>
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">Work.</h1>
      <p className="text-base font-light text-[#3D3D3D] max-w-xl leading-relaxed">
        Seventeen projects shipped to production.
        Data engineering, cloud infrastructure, mobile apps, and open-source contributions.
      </p>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects — Rin Huang · rin.contact</title>
        <meta name="description" content="Rin Huang's shipped projects — data engineering, Python automation, React Native mobile apps, Next.js web apps, cloud infrastructure, and open-source work." />
        <link rel="canonical" href="https://rin.contact/projects" />
        <meta property="og:title" content="Projects — Sunchuangyu (Rin) Huang" />
        <meta property="og:url" content="https://rin.contact/projects" />
      </Head>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <PageHeader />
      </div>

      <div className="bg-white relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12">
          <ProjectsSection />
        </div>
      </div>
    </>
  );
}
