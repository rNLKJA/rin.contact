import Head from "next/head";
import Link from "next/link";

const ITEMS = [
  { href: "/info/now",          label: "now",          note: "what I'm doing right now" },
  { href: "/info/uses",         label: "uses",         note: "tools, apps, setup" },
  { href: "/info/roadmap",      label: "roadmap",      note: "where this site is headed" },
  { href: "/info/accessibility", label: "accessibility", note: "how this site is accessible" },
  { href: "/info/colophon",     label: "colophon",      note: "how this site is built" },
  { href: "/info/api",          label: "api",          note: "available API endpoints" },
  { href: "/info/site-map",     label: "site-map",     note: "human-readable sitemap" },
  { href: "/info/manifest",     label: "manifest",     note: "what I believe" },
  { href: "/info/changelog",    label: "changelog",    note: "what changed" },
  { href: "/info/thank-you",    label: "thank-you",    note: "thanks for reaching out" },
  { href: "/info/references",   label: "references",   note: "people who might say nice things" },
];

export default function InfoIndexPage() {
  return (
    <>
      <Head>
        <title>Info — rin.contact</title>
        <meta name="description" content="Site info — now, uses, roadmap, accessibility, colophon." />
        <link rel="canonical" href="https://rin.contact/info" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] font-mono mb-4">/info</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Site info & meta.
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-14">
            What I'm up to, what I use, where this site is going,
            and how it's built. The boring-but-useful stuff.
          </p>

          <div className="space-y-0 divide-y divide-[#E0E0E0]">
            {ITEMS.map(({ href, label, note }) => (
              <Link
                key={href}
                href={href}
                className="block py-4 flex items-baseline justify-between gap-6 group"
              >
                <span className="font-mono text-sm text-[#1A1A1A] group-hover:text-black group-hover:border-black transition-colors">
                  /info/{label}
                </span>
                <span className="text-[11px] text-[#AAAAAA] flex-shrink-0">{note}</span>
              </Link>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0]">
            <Link
              href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
            >
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
