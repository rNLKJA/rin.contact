import Head from "next/head";
import { useRouter } from "next/router";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

const ITEMS = [
  { href: "/fun/coffee", label: "coffee", note: "you know why" },
  { href: "/fun/roast", label: "roast", note: "honest feedback" },
  { href: "/fun/spin", label: "spin", note: "what is Rin doing?" },
  { href: "/fun/secret", label: "secret", note: "morse code reveal" },
  { href: "/fun/matrix", label: "matrix", note: "∑ ∇ λ σ and friends" },
  { href: "/fun/haiku", label: "haiku", note: "5–7–5 data science absurdism" },
  { href: "/fun/art", label: "art", note: "Fibonacci phyllotaxis" },
  { href: "/fun/loading", label: "loading", note: "patience" },
  { href: "/fun/void", label: "void", note: "go deeper" },
  { href: "/fun/rickroll", label: "rickroll", note: "you knew this was coming" },
  { href: "/fun/inception", label: "inception", note: "turtles all the way down" },
  { href: "/fun/sudo", label: "sudo", note: "elevated access" },
  { href: "/fun/error", label: "error", note: "something went wrong" },
  { href: "/fun/pronouns", label: "pronouns", note: "he/him, like variables" },
  { href: "/fun/timezone", label: "timezone", note: "UTC+9:30, we refuse to round" },
  { href: "/fun/name", label: "name", note: "黄孙创宇 · Rin" },
  { href: "/fun/float404", label: "float404", note: "404.404 precision error" },
  { href: "/fun/glitch", label: "glitch", note: "sometimes it glitches" },
  {
    href: "/fun/correlation",
    label: "correlation",
    note: "spurious correlations, generate another",
  },
  { href: "/fun/pvalue", label: "pvalue", note: "p-value oracle, always p < 0.05" },
  { href: "/fun/overfit-sim", label: "overfit-sim", note: "training 100%, test ~52%" },
  { href: "/fun/breakup", label: "breakup", note: "too many missing values" },
  { href: "/fun/forest", label: "forest", note: "decision tree → linear regression" },
  { href: "/fun/ci", label: "ci", note: "confidence interval generator" },
  { href: "/fun/residuals", label: "residuals", note: "observed − predicted" },
  { href: "/fun/reject", label: "reject", note: "H₀: this page is boring" },
  { href: "/fun/vault", label: "vault", note: "achievement tracker" },
  { href: "/fun/csv", label: "csv", note: "Data-And-More(9_001).csv" },
  { href: "/fun/late", label: "late", note: "time-based wisdom" },
  { href: "/fun/outlier", label: "outlier", note: "you are one" },
  { href: "/fun/normalise", label: "normalise", note: "normalise expectations" },
  { href: "/fun/debug", label: "debug", note: "rin.brain line 42" },
  { href: "/fun/tarot", label: "tarot", note: "data science tarot" },
  { href: "/fun/dice", label: "dice", note: "roll d20" },
  { href: "/fun/blank", label: "blank", note: "sometimes nothing is best" },
  { href: "/fun/eta", label: "eta", note: "ETA: ∞" },
  { href: "/fun/silence", label: "silence", note: "no analytics, no tracking" },
  { href: "/fun/rejections", label: "rejections", note: "every no is training data" },
  { href: "/fun/mood", label: "mood", note: "how is Rin today?" },
  { href: "/fun/typing", label: "typing", note: "typing speed test" },
  { href: "/ds", label: "ds", note: "Rin as data science" },
];

export default function FunIndexPage() {
  const { t, locale = "en-AU" } = useI18n();
  const isZh = locale === "zh-Hans";
  return (
    <>
      <Head>
        <title>Fun — rin.contact</title>
        <meta
          name="description"
          content="Easter eggs and hidden routes. Coffee, matrix rain, haiku, and more."
        />
        <link rel="canonical" href="https://rin.contact/fun" />

        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://rin.contact/api/og/?title=Fun&subtitle=40%2B%20easter%20eggs%2C%20games%2C%20and%20interactive%20experiences%20on%20rin&section=fun"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fun" />
        <meta
          name="twitter:description"
          content="40+ easter eggs, games, and interactive experiences on rin."
        />
        <meta
          name="twitter:image"
          content="https://rin.contact/api/og/?title=Fun&subtitle=40%2B%20easter%20eggs%2C%20games%2C%20and%20interactive%20experiences%20on%20rin&section=fun"
        />
      </Head>

      <SeoHead
        title="Fun — rin.contact"
        description="Easter eggs and hidden routes. Coffee, matrix rain, haiku, and more."
        path="/fun"
        ogImage={{
          title: "Fun & Easter Eggs",
          subtitle: "Hidden routes, data haikus, and more",
          section: "fun",
        }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] font-mono mb-4">
            /fun
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            {t("fun.heading")}
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed mb-14">{t("fun.description")}</p>

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
              ← {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
