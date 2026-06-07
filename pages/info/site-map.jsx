import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

const SECTIONS = [
  { heading: "Main", links: [
    { href: "/", label: "Home" },
    { href: "/strategic", label: "Strategic Data Science" },
    { href: "/career", label: "Career" },
    { href: "/projects", label: "Projects" },
    { href: "/lab", label: "Lab" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/hire-me", label: "Hire Me" },
  ]},
  { heading: "Blog", links: [
    { href: "/blog", label: "Blog" },
  ]},
  { heading: "Tools", links: [
    { href: "/tools", label: "Tools" },
    { href: "/tools/card", label: "Business Card" },
  ]},
  { heading: "Info", links: [
    { href: "/info", label: "Info" },
    { href: "/info/api", label: "API" },
    { href: "/info/now", label: "Now" },
    { href: "/info/uses", label: "Uses" },
    { href: "/info/roadmap", label: "Roadmap" },
    { href: "/info/accessibility", label: "Accessibility" },
    { href: "/info/colophon", label: "Colophon" },
    { href: "/info/site-map", label: "Site Map" },
    { href: "/info/manifest", label: "Manifest" },
    { href: "/info/changelog", label: "Changelog" },
    { href: "/info/thank-you", label: "Thank You" },
    { href: "/info/references", label: "References" },
  ]},
  { heading: "Fun", links: [
    { href: "/fun", label: "Fun" },
    { href: "/fun/coffee", label: "Coffee" },
    { href: "/fun/roast", label: "Roast" },
    { href: "/fun/secret", label: "Secret" },
    { href: "/fun/vault", label: "Vault" },
    { href: "/fun/matrix", label: "Matrix" },
    { href: "/fun/correlation", label: "Correlation" },
    { href: "/fun/pvalue", label: "P-Value Oracle" },
    { href: "/fun/forest", label: "Forest" },
    { href: "/fun/pronouns", label: "Pronouns" },
    { href: "/fun/timezone", label: "Timezone" },
    { href: "/fun/name", label: "Name" },
    { href: "/fun/tarot", label: "Tarot" },
    { href: "/fun/dice", label: "Dice" },
    { href: "/fun/typing", label: "Typing" },
    { href: "/fun/mood", label: "Mood" },
  ]},
  { heading: "Data Science", links: [
    { href: "/ds", label: "DS" },
    { href: "/ds/model-card", label: "Model Card" },
    { href: "/ds/feature-importance", label: "Feature Importance" },
  ]},
];

export default function SiteMapPage() {
  return (
    <>
      <Head>
        <title>Site Map — rin.contact</title>
        <meta name="description" content="Human-readable site map." />
        <link rel="canonical" href="https://rin.contact/info/site-map" />
      
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Site%20Map&subtitle=Complete%20directory%20of%20all%20pages%20on%20rin&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Site Map" />
        <meta name="twitter:description" content="Complete directory of all pages on rin." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Site%20Map&subtitle=Complete%20directory%20of%20all%20pages%20on%20rin&section=info" />
      </Head>

      <SeoHead
        title="Site Map — rin.contact"
        description="Human-readable site map."
        path="/info/site-map"
        ogImage={{ title: "Site Map", subtitle: "Human-readable site map.", section: "info" }}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] font-mono mb-4">/info/site-map</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Site Map</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            Every page. Human-readable. Not XML.
          </p>

          <div className="space-y-10">
            {SECTIONS.map(({ heading, links }) => (
              <div key={heading}>
                <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">{heading}</p>
                <ul className="space-y-2">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-[#1A1A1A] dark:text-white hover:text-[#FF3C3C] border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-[#FF3C3C] transition-colors">
                        {href}
                      </Link>
                      <span className="text-[#AAAAAA] text-xs ml-2">— {label}</span>
                    </li>
                  ))}
                </ul>
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
