import Head from "next/head";
import Link from "next/link";

const Section = ({ label, children }) => (
  <div className="mb-10">
    <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-5 font-mono">{label}</p>
    <div className="space-y-0 divide-y divide-[#F5F5F5]">
      {children}
    </div>
  </div>
);

const Row = ({ name, value, href, note }) => (
  <div className="py-3.5 flex items-start justify-between gap-6">
    <span className="text-xs text-[#7A7A7A] font-mono w-32 flex-shrink-0">{name}</span>
    <div className="flex-1 text-right">
      {href ? (
        <a href={href} target="_blank" rel="noreferrer"
           className="text-xs text-[#1A1A1A] hover:text-[#FF3C3C] border-b border-[#E0E0E0] hover:border-[#FF3C3C] transition-colors">
          {value}
        </a>
      ) : (
        <span className="text-xs text-[#1A1A1A]">{value}</span>
      )}
      {note && <p className="text-[11px] text-[#AAAAAA] mt-0.5">{note}</p>}
    </div>
  </div>
);

export default function ColophonPage() {
  return (
    <>
      <Head>
        <title>Colophon — rin.contact</title>
        <meta name="description" content="How rin.contact is built — tools, fonts, libraries, and design decisions." />
        <link rel="canonical" href="https://rin.contact/colophon" />
      </Head>

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] font-mono mb-4">/colophon</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            How this site is made.
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            Every decision behind rin.contact — framework, fonts, deployment, design philosophy,
            and the easter eggs. A colophon is a printer&apos;s note. This is mine.
          </p>
        </div>

        {/* Framework */}
        <Section label="Framework & Runtime">
          <Row name="framework"   value="Next.js 14"           href="https://nextjs.org"            note="Pages Router — SSG + SSR + CSR mix" />
          <Row name="runtime"     value="Node.js"              href="https://nodejs.org"            note="via Vercel serverless functions" />
          <Row name="language"    value="TypeScript / JSX"     href="https://typescriptlang.org"    note="strict mode where it matters" />
          <Row name="pkg manager" value="npm"                                                       note="nothing fancy" />
        </Section>

        {/* Styling */}
        <Section label="Styling">
          <Row name="utility css" value="Tailwind CSS"         href="https://tailwindcss.com"       note="v3 — mobile-first, purged in production" />
          <Row name="philosophy"  value="Nothing OS aesthetic"                                      note="stark, minimal, monochromatic — flat, no shadows" />
          <Row name="palette"     value="#FFFFFF · #000000 · #FF3C3C"                               note="white · black · dot red — used sparingly" />
          <Row name="radius"      value="none or rounded-full"                                      note="never anything in between" />
          <Row name="animations"  value="CSS keyframes"                                             note="150–300ms ease-in-out — no bounce, no spring" />
        </Section>

        {/* Typography */}
        <Section label="Typography">
          <Row name="display"     value="Bitcount Prop Double" href="https://fonts.google.com/specimen/Bitcount+Prop+Double" note="weight 300–600 · headlines only" />
          <Row name="body"        value="DM Sans"              href="https://fonts.google.com/specimen/DM+Sans"              note="weight 300–500 · reading comfort" />
          <Row name="accent"      value="Playfair Display"     href="https://fonts.google.com/specimen/Playfair+Display"     note="editorial moments only" />
          <Row name="mono"        value="Courier New"                                               note="system fallback · terminals & labels" />
          <Row name="loader"      value="next/font"                                                 note="zero layout shift, self-hosted" />
        </Section>

        {/* Deployment */}
        <Section label="Deployment & Infrastructure">
          <Row name="host"        value="Vercel"               href="https://vercel.com"            note="edge network · preview deploys on every push" />
          <Row name="domain"      value="rin.contact"                                               note="registered via Namecheap" />
          <Row name="cdn"         value="Vercel Edge Network"                                       note="global, automatic" />
          <Row name="ci/cd"       value="GitHub + Vercel CLI"                                       note="git push → build → alias" />
          <Row name="analytics"   value="none"                                                      note="privacy first — no tracking pixels" />
        </Section>

        {/* Services */}
        <Section label="Third-party Services">
          <Row name="email"       value="EmailJS"              href="https://emailjs.com"           note="contact form → inbox, no backend required" />
          <Row name="qr codes"    value="api.qrserver.com"     href="https://api.qrserver.com"      note="on-the-fly QR generation for /card" />
          <Row name="fonts"       value="Google Fonts"         href="https://fonts.google.com"      note="loaded via next/font — not tracked" />
        </Section>

        {/* Performance */}
        <Section label="Performance Decisions">
          <Row name="images"      value="next/image"                                                note="lazy loading, WebP conversion, responsive sizes" />
          <Row name="code split"  value="dynamic imports"                                           note="below-fold sections load only when needed" />
          <Row name="lcp target"  value="< 1.5s on 4G"                                             note="hero renders without any blocking resources" />
          <Row name="focus"       value="no layout shift"                                           note="font display:swap + explicit image dimensions" />
        </Section>

        {/* Easter eggs */}
        <Section label="Hidden Routes & Easter Eggs">
          <Row name="/resume"     value="interactive CLI"      href="/resume"       note="type commands, explore career data" />
          <Row name="/matrix"     value="data science rain"    href="/matrix"       note="∑ ∇ λ σ and friends" />
          <Row name="/art"        value="generative spiral"    href="/art"          note="Fibonacci phyllotaxis" />
          <Row name="/haiku"      value="haiku collection"     href="/haiku"        note="5–7–5 data science absurdism" />
          <Row name="/coffee"     value="you know why"         href="/coffee"       note="" />
          <Row name="/secret"     value="morse code reveal"    href="/secret"       note="" />
          <Row name="/card"       value="draggable card"       href="/card"         note="try throwing it" />
          <Row name="↑↑↓↓←→←→BA" value="Konami code"                               note="try it on the homepage" />
          <Row name="DevTools"    value="console easter egg"                        note="open your browser console" />
          <Row name="curl"        value="terminal view"                             note="curl rin.contact" />
          <Row name="/api/rin.json" value="profile API"        href="/api/rin.json" note="" />
          <Row name="/api/fortune"  value="random wisdom"      href="/api/fortune"  note="" />
          <Row name="/api/roast"    value="honest feedback"    href="/api/roast"    note="" />
          <Row name="/api/now"      value="current status"     href="/api/now"      note="" />
          <Row name="/api/stack"    value="this site's stack"  href="/api/stack"    note="" />
        </Section>

        {/* Philosophy */}
        <Section label="Design Philosophy">
          <Row name="principle 1" value="Every decision is intentional"            note="if it doesn't earn its place, it doesn't ship" />
          <Row name="principle 2" value="Empty space is part of the design"        note="density ≠ quality" />
          <Row name="principle 3" value="Mobile-first, always"                     note="375px is the source of truth" />
          <Row name="principle 4" value="No gradients, no drop-shadows"            note="flat monochrome — the Nothing way" />
          <Row name="principle 5" value="Accessibility is not optional"            note="AA contrast, focus rings, descriptive alt text" />
          <Row name="principle 6" value="Ship it, then improve it"                 note="v5.16.0 and counting" />
        </Section>

        {/* Footer */}
        <div className="pt-10 border-t border-[#F0F0F0] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-[11px] text-[#AAAAAA] font-mono">
            Designed & built by Rin Huang · v5.16.0
          </p>
          <div className="flex gap-4">
            <Link href="/"
              className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">
              ← Home
            </Link>
            <a href="/api/stack" target="_blank" rel="noreferrer"
               className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors">
              JSON →
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
