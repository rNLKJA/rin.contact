import Head from "next/head";
import Link from "next/link";

const ITEMS = [
  { href: "/fun/coffee",   label: "coffee",   note: "you know why" },
  { href: "/fun/roast",    label: "roast",    note: "honest feedback" },
  { href: "/fun/spin",     label: "spin",     note: "what is Rin doing?" },
  { href: "/fun/secret",   label: "secret",   note: "morse code reveal" },
  { href: "/fun/matrix",   label: "matrix",   note: "∑ ∇ λ σ and friends" },
  { href: "/fun/haiku",    label: "haiku",    note: "5–7–5 data science absurdism" },
  { href: "/fun/art",      label: "art",      note: "Fibonacci phyllotaxis" },
  { href: "/fun/loading",  label: "loading",  note: "patience" },
  { href: "/fun/void",     label: "void",     note: "go deeper" },
  { href: "/fun/rickroll", label: "rickroll", note: "you knew this was coming" },
  { href: "/fun/inception", label: "inception", note: "turtles all the way down" },
  { href: "/fun/sudo",     label: "sudo",     note: "elevated access" },
  { href: "/fun/error",    label: "error",    note: "something went wrong" },
  { href: "/fun/pronouns", label: "pronouns", note: "he/him, like variables" },
  { href: "/fun/timezone", label: "timezone", note: "UTC+9:30, we refuse to round" },
  { href: "/fun/name",     label: "name",     note: "黄孙创宇 · Rin" },
  { href: "/fun/float404", label: "float404", note: "404.404 precision error" },
  { href: "/fun/glitch",   label: "glitch",   note: "sometimes it glitches" },
  { href: "/fun/correlation", label: "correlation", note: "correlation ≠ causation" },
  { href: "/fun/outlier",  label: "outlier",  note: "you are one" },
  { href: "/fun/normalise", label: "normalise", note: "normalise expectations" },
  { href: "/fun/debug",    label: "debug",    note: "rin.brain line 42" },
  { href: "/fun/tarot",    label: "tarot",    note: "data science tarot" },
  { href: "/fun/dice",     label: "dice",     note: "roll d20" },
  { href: "/fun/blank",    label: "blank",    note: "sometimes nothing is best" },
  { href: "/fun/eta",      label: "eta",      note: "ETA: ∞" },
  { href: "/fun/silence",  label: "silence",  note: "no analytics, no tracking" },
  { href: "/fun/rejections", label: "rejections", note: "every no is training data" },
  { href: "/fun/mood",     label: "mood",     note: "how is Rin today?" },
  { href: "/fun/typing",   label: "typing",   note: "typing speed test" },
  { href: "/ds",           label: "ds",       note: "Rin as data science" },
];

export default function FunIndexPage() {
  return (
    <>
      <Head>
        <title>Fun — rin.contact</title>
        <meta name="description" content="Easter eggs and hidden routes. Coffee, matrix rain, haiku, and more." />
        <link rel="canonical" href="https://rin.contact/fun" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">/fun</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Easter eggs & hidden routes.
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-14">
            Things I hid because the internet should have a little surprise now and then.
            No spoilers — click through and find out.
          </p>

          <div className="space-y-0 divide-y divide-[#E0E0E0]">
            {ITEMS.map(({ href, label, note }) => (
              <Link
                key={href}
                href={href}
                className="block py-4 flex items-baseline justify-between gap-6 group"
              >
                <span className="font-mono text-sm text-[#1A1A1A] group-hover:text-[#FF3C3C] transition-colors">
                  {href.startsWith("/fun") ? `/fun/${label}` : href}
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
