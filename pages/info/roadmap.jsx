import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

const Section = ({ label, items }) => (
  <div className="mb-12">
    <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-5 font-mono">{label}</p>
    <ul className="space-y-0 divide-y divide-[#F5F5F5] dark:divide-[#1E1E1E]">
      {items.map(({ title, status, note, joke }) => (
        <li key={title} className="py-4 flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">{title}</p>
            {(note || joke) && (
              <p className="text-xs text-[#7A7A7A] mt-0.5 leading-relaxed">{note || joke}</p>
            )}
          </div>
          <span
            className={`text-[10px] font-mono tracking-widest uppercase flex-shrink-0 px-2 py-0.5 ${
              status === "done"   ? "border border-[#22C55E] text-[#22C55E]" :
              status === "wip"   ? "border border-[#FF3C3C] text-[#FF3C3C]" :
              status === "planned" ? "border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#7A7A7A]" :
              "border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#6E6E6E] dark:text-[#9A9A9A]"
            }`}
          >
            {status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const DONE = [
  { title: "Custom 404 with Snake game", status: "done", note: "Play while you wait. Leaderboard persists." },
  { title: "CLI-style interactive resume", status: "done", note: "Type commands. Explore career data." },
  { title: "Matrix rain with data science symbols", status: "done", note: "∑ ∇ λ σ — you know the vibe." },
  { title: "Copy email → confetti burst", status: "done", note: "Select huang@rin.contact, Ctrl+C. Enjoy." },
  { title: "Adelaide live weather in status badge", status: "done", note: "wttr.in. No API key. Free." },
  { title: "30+ hidden routes and easter eggs", status: "done", joke: "At this point we've lost count." },
  { title: "Nothing OS + Wisr design system", status: "done", note: "Stark. Minimal. Monochromatic." },
  { title: "SEO for 6+ name variants", status: "done", note: "Sunchuangyu, 黄孙创宇, HUANGSUNCHUANGYU, etc." },
  { title: "Blog / writing section", status: "done", note: "Live with reading time and Read-next. Eight posts and counting." },
  { title: "RSS feed", status: "done", note: "/blog/feed.xml — subscribe in any reader." },
  { title: "i18n — Mandarin version", status: "done", note: "Full zh-Hans site. 黄孙创宇 has his page." },
  { title: "PWA / offline support", status: "done", note: "Service worker, web manifest, installable." },
  { title: "Dark mode", status: "done", note: "Nothing OS is dark by nature; the toggle makes it a choice." },
];

const WIP = [
  { title: "More easter eggs", status: "wip", joke: "The list never ends." },
  { title: "Accessibility audit", status: "wip", note: "WCAG 2.1 AA. Continuous improvement." },
  { title: "Performance tuning", status: "wip", note: "LCP < 1.5s. Dynamic imports. Font optimisation." },
];

const PLANNED = [
  { title: "More project case studies", status: "planned", note: "Signal has one. The rest deserve the same depth." },
  { title: "Newsletter automation", status: "planned", note: "The signup exists; the sending pipeline is next." },
  { title: "API versioning", status: "planned", joke: "v1 is forever. v2 when we break everything." },
];

const BACKLOG = [
  { title: "Replace weather with astrology", status: "backlog", joke: "Sagittarius: your model will overfit today." },
  { title: "Blockchain integration", status: "backlog", joke: "No." },
  { title: "NFT of the 404 page", status: "backlog", joke: "Absolutely not." },
  { title: "AI chatbot that only says 'hire Rin'", status: "backlog", joke: "Tempting. Too on-the-nose." },
  { title: "Infinite scroll", status: "backlog", joke: "We have pagination. We have subpages. We're good." },
];

export default function RoadmapPage() {
  return (
    <>
      <Head>
        <title>Roadmap — Rin Huang · rin.contact</title>
        <meta name="description" content="Past and future features for rin.contact — shipped, in progress, and absurd." />
        <link rel="canonical" href="https://rin.contact/info/roadmap" />
      
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og?title=Roadmap&subtitle=What%20is%20coming%20next%20for%20rin&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Roadmap" />
        <meta name="twitter:description" content="What is coming next for rin." />
        <meta name="twitter:image" content="https://rin.contact/api/og?title=Roadmap&subtitle=What%20is%20coming%20next%20for%20rin&section=info" />
      </Head>

      <SeoHead
        title="Roadmap — Rin Huang · rin.contact"
        description="Past and future features for rin.contact — shipped, in progress, and absurd."
        path="/info/roadmap"
        ogImage={{ title: "Roadmap", subtitle: "Past and future features for rin.contact — shipped, in progress...", section: "info" }}
      />

      <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28">

        <div className="mb-14">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/roadmap</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Where we&apos;ve been. Where we&apos;re going.
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            A mix of shipped features, work in progress, and items that may or may not be jokes.
            Last updated June 2026.
          </p>
        </div>

        <Section label="Shipped" items={DONE} />
        <Section label="In progress" items={WIP} />
        <Section label="Planned" items={PLANNED} />
        <Section label="Backlog (questionable)" items={BACKLOG} />

        <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex justify-between items-center">
          <p className="text-[11px] text-[#6E6E6E] dark:text-[#9A9A9A] font-mono">
            Roadmaps are living documents. This one is also a bit silly.
          </p>
          <Link
            href="/"
            className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black
                       border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors"
          >
            ← Home
          </Link>
        </div>

      </div>
    </>
  );
}
