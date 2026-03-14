import Head from "next/head";
import Link from "next/link";

const SECTIONS = [
  { heading: "Main", links: [
    { href: "/", label: "Home" },
    { href: "/career", label: "Career" },
    { href: "/projects", label: "Projects" },
    { href: "/lab", label: "Lab" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/hire-me", label: "Hire Me" },
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
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
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
                      <Link href={href} className="text-sm text-[#1A1A1A] hover:text-[#FF3C3C] border-b border-[#E0E0E0] hover:border-[#FF3C3C] transition-colors">
                        {href}
                      </Link>
                      <span className="text-[#AAAAAA] text-xs ml-2">— {label}</span>
                    </li>
                  ))}
                </ul>
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
