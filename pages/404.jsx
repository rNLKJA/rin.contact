import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";

// Canvas + browser APIs — must never run on the server
const SnakeGame = dynamic(() => import("@/components/ui/SnakeGame"), {
  ssr: false,
  loading: () => (
    <div
      className="mt-8 border border-[#1E1E1E] bg-[#0C0C0C] flex items-center justify-center font-mono text-[10px] text-[#2A2A2A]"
      style={{ width: 320, height: 224 }}
    >
      loading game...
    </div>
  ),
});

const SUGGESTION_KEYS = [
  { href: "/", key: "nav.home" },
  { href: "/career", key: "nav.career" },
  { href: "/projects", key: "nav.projects" },
  { href: "/lab", key: "nav.lab" },
  { href: "/knowledge", key: "nav.knowledge" },
  { href: "/blog", key: "nav.blog" },
  { href: "/strategic", key: "nav.strategic" },
  { href: "/about", key: "nav.about" },
  { href: "/resume", key: "nav.resume" },
  { href: "/hire-me", key: "nav.hireMe" },
  { href: "/tools/card", key: "nav.businessCard" },
];

export default function Custom404() {
  const { t } = useI18n();
  const { asPath } = useRouter();
  // asPath differs between server ("/404/") and client (the real missing URL).
  // Only render it after mount so server and client initial HTML always match.
  const [path, setPath] = useState(null);
  useEffect(() => {
    setPath(asPath.split("?")[0]);
  }, [asPath]);

  return (
    <>
      <Head>
        <title>404 · rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SeoHead
        title="404 — Rin Huang · rin.contact"
        description="Page not found"
        path="/404"
        noindex
        ogImage={false}
      />

      <div className="max-w-[720px] mx-auto px-6 py-16 md:py-24 font-mono">
        {/* Error header */}
        <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-4">
          {t("notFound.title")}
        </p>

        {/* Traceback card */}
        <div className="bg-[#0C0C0C] border border-[#1E1E1E] p-5 mb-6 text-xs leading-loose">
          <p className="text-[#555]">{t("notFound.traceback")}</p>
          <p className="text-[#555] ml-4">
            {t("notFound.file")} <span className="text-[#888]">&quot;rin.contact&quot;</span>,
            {t("notFound.line")} 1, {t("notFound.in")}{" "}
            <span className="text-[#888]">{t("notFound.navigate")}</span>
          </p>
          <p className="text-[#444] mt-2">
            <span className="text-[#686868]">{t("notFound.keyError")}</span>
            <span className="text-[#FF6B6B]">&apos;{path ?? "…"}&apos;</span>
            <span className="text-[#444]"> {t("notFound.doesNotExist")}</span>
          </p>
          <p className="text-[#555] mt-3">
            <span className="text-[#888]">{t("notFound.suggestion")}</span>
            {t("notFound.tryRoutes")}
          </p>
        </div>

        {/* Suggestions */}
        <p className="text-[10px] tracking-widest uppercase text-[#AAAAAA] mb-3">
          {t("notFound.availableRoutes")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {SUGGESTION_KEYS.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="border border-[#E0E0E0] dark:border-[#3D3D3D] px-3 py-2 text-xs text-[#595959] dark:text-[#AAAAAA]
                         hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors duration-150"
            >
              → {t(key)}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Link
            href="/"
            className="inline-block border border-black px-6 py-2.5 text-xs tracking-widest uppercase
                       hover:bg-black hover:text-white transition-colors duration-200"
          >
            {t("notFound.home")}
          </Link>
          <a
            href={`mailto:huang@rin.contact?subject=${encodeURIComponent(
              `404 at ${path ?? "unknown"} — but it's not a bug, the page just doesn't exist`
            )}&body=${encodeURIComponent(
              `I tried to visit: ${path ?? "(unknown path)"}\n\n(No action needed — just letting you know. Or maybe I'm confused. Either way.)`
            )}`}
            className="inline-block border border-[#3D3D3D] px-6 py-2.5 text-xs tracking-widest uppercase
                       text-[#555] hover:border-[#555] hover:text-[#888] transition-colors duration-200"
          >
            {t("notFound.reportBug")}
          </a>
        </div>

        {/* Snake game — client-only, no SSR */}
        <SnakeGame />
      </div>
    </>
  );
}
