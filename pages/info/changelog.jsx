import Head from "next/head";
import Link from "next/link";
import pkg from "../../package.json";

const CHANGES = [
  { version: "5.19.0", date: "2026-03", changes: "Creative pages: pronouns, timezone, name, float404, glitch, correlation, outlier, normalise, debug, tarot, dice, blank, eta, silence, rejections, mood, typing. Info: site-map, manifest, changelog, thank-you, references" },
  { version: "5.18.9", date: "2026-03", changes: "20 data science profile pages (/ds)" },
  { version: "5.18.8", date: "2026-03", changes: "Dynamic colophon version, sudo hint to /fun" },
  { version: "5.18.7", date: "2026-03", changes: "Index pages for fun/, info/, tools/" },
  { version: "5.18.6", date: "2026-03", changes: "Pages organised into fun/, info/, tools/ subfolders" },
];

export default function ChangelogPage() {
  return (
    <>
      <Head>
        <title>Changelog — rin.contact</title>
        <meta name="description" content="Site changelog." />
        <link rel="canonical" href="https://rin.contact/info/changelog" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] font-mono mb-4">/info/changelog</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Changelog</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            What changed. Version {pkg.version} and counting.
          </p>

          <div className="space-y-6">
            {CHANGES.map(({ version, date, changes }) => (
              <div key={version} className="border-b border-[#F0F0F0] pb-6 last:border-0">
                <p className="font-mono text-sm text-[#1A1A1A] mb-1">v{version} · {date}</p>
                <p className="text-sm text-[#7A7A7A]">{changes}</p>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] flex flex-wrap gap-4 mt-10">
            <Link href="/info" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">← /info</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
