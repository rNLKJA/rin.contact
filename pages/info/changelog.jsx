import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import pkg from "../../package.json";

const CHANGES = [
  { version: "5.22.1", date: "2026-06", changes: "Blog: 6 posts with Mermaid diagrams, RSS feed at /blog/feed.xml, newsletter signup component. Service worker: self-destructing on activate for cache hygiene." },
  { version: "5.22.0", date: "2026-06", changes: "Blog infrastructure: markdown pipeline (gray-matter + remark), PostCard, blog listing + individual post pages." },
  { version: "5.21.0", date: "2026-05", changes: "Dark mode on 50+ pages (IntelligenceSection, DatasetCard, ContactSection, all section landing pages, strategic.jsx)." },
  { version: "5.20.0", date: "2026-05", changes: "Performance: dead CSS removal, BootOverlay reduction (800ms), CustomCursor optimisation (6→3 dots), Web Vitals reporting. Marketing: certifications grid on /about, og:image + Twitter cards on 15 remaining indexable pages, LinkedIn + X share buttons on project details." },
  { version: "5.19.0", date: "2026-03", changes: "Creative pages: pronouns, timezone, name, float404, glitch, correlation, outlier, normalise, debug, tarot, dice, blank, eta, silence, rejections, mood, typing. Info: site-map, manifest, changelog, thank-you, references" },
  { version: "5.18.9", date: "2026-03", changes: "20 data science profile pages (/ds)" },
  { version: "5.18.8", date: "2026-03", changes: "Dynamic colophon version, sudo hint to /fun" },
  { version: "5.18.7", date: "2026-03", changes: "Index pages for fun/, info/, tools/" },
  { version: "5.18.6", date: "2026-03", changes: "Pages organised into fun/, info/, tools/ subfolders" },
];

export default function ChangelogPage() {
  return (
    <>
      <SeoHead
        title="Changelog — rin.contact"
        description="Version history and release notes for rin.contact"
        path="/info/changelog"
        ogImage={{ title: "Changelog", subtitle: "Version history and release notes for rin.contact", section: "info" }}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/changelog</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Changelog</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            What changed. Version {pkg.version} and counting.
          </p>

          <div className="space-y-6">
            {CHANGES.map(({ version, date, changes }) => (
              <div key={version} className="border-b border-[#F0F0F0] dark:border-[#1E1E1E] pb-6 last:border-0">
                <p className="font-mono text-sm text-[#1A1A1A] dark:text-white mb-1">v{version} · {date}</p>
                <p className="text-sm text-[#7A7A7A]">{changes}</p>
              </div>
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
