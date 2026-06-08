import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

const PRINCIPLES = [
  "Every decision is intentional. If it doesn't earn its place, it doesn't ship.",
  "Empty space is part of the design. Density ≠ quality.",
  "Mobile-first, always. 375px is the source of truth.",
  "No gradients, no drop-shadows. Flat monochrome.",
  "Accessibility is not optional. AA contrast, focus rings, descriptive alt text.",
  "Ship it, then improve it. Version numbers and counting.",
];

export default function ManifestPage() {
  return (
    <>
      <Head>
        <title>Manifest — rin.contact</title>
        <meta name="description" content="What I believe about data, work, and building things." />
        <link rel="canonical" href="https://rin.contact/info/manifest" />
      
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Manifest&subtitle=The%20principles%2C%20values%2C%20and%20philosophy%20behind%20rin&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manifest" />
        <meta name="twitter:description" content="The principles, values, and philosophy behind rin." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Manifest&subtitle=The%20principles%2C%20values%2C%20and%20philosophy%20behind%20rin&section=info" />
      </Head>

      <SeoHead
        title="Manifest — rin.contact"
        description="What I believe about data, work, and building things."
        path="/info/manifest"
        ogImage={{ title: "Manifest", subtitle: "What I believe about data, work, and building things.", section: "info" }}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/info/manifest</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Manifest</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            What I believe about data, work, and building things.
          </p>

          <div className="space-y-6">
            {PRINCIPLES.map((p, i) => (
              <p key={i} className="text-sm text-[#1A1A1A] dark:text-white leading-relaxed border-l-2 border-[#E0E0E0] dark:border-[#3D3D3D] pl-4">
                {p}
              </p>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/info" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /info</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
