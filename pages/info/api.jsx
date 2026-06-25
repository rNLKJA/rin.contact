import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import { useI18n } from "@/contexts/I18nContext";
import Link from "next/link";

// path / method / example are code — identical in every language. Descriptions
// are localised via infoApi.descriptions (index-aligned).
const ENDPOINTS = [
  { path: "/api/ping", method: "GET", example: "curl https://rin.contact/api/ping" },
  { path: "/api/curl", method: "GET", example: "curl rin.contact" },
  { path: "/api/rin.json", method: "GET", example: "curl https://rin.contact/api/rin.json" },
  { path: "/api/now", method: "GET", example: "curl https://rin.contact/api/now" },
  { path: "/api/fortune", method: "GET", example: "curl https://rin.contact/api/fortune" },
  { path: "/api/roast", method: "GET", example: "curl https://rin.contact/api/roast" },
  { path: "/api/stack", method: "GET", example: "curl https://rin.contact/api/stack" },
  { path: "/api/ping-indexnow", method: "POST", example: "curl -X POST https://rin.contact/api/ping-indexnow" },
];

export default function ApiPage() {
  const { t, locale = "en-AU" } = useI18n();
  const descriptions = t("infoApi.descriptions");

  return (
    <>
      <Head>
        <title>{t("infoApi.metaTitle")}</title>
        <meta name="description" content={t("infoApi.metaDescription")} />
        <link rel="canonical" href="https://rin.contact/info/api" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://rin.contact/api/og/?title=API&subtitle=Public%20API%20endpoints%20for%20rin&section=info" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="API" />
        <meta name="twitter:description" content="Public API endpoints for rin." />
        <meta name="twitter:image" content="https://rin.contact/api/og/?title=API&subtitle=Public%20API%20endpoints%20for%20rin&section=info" />
      </Head>

      <SeoHead
        title={t("infoApi.metaTitle")}
        description={t("infoApi.metaDescription")}
        path="/info/api"
        ogImage={{ title: "API", subtitle: t("infoApi.ogSubtitle"), section: "info" }}
        locale={locale}
      />

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A] font-mono mb-4">/info/api</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{t("infoApi.heading")}</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            {t("infoApi.intro")}
          </p>

          <div className="space-y-8">
            {ENDPOINTS.map(({ path, method, example }, i) => (
              <div
                key={path}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 rounded-none bg-white dark:bg-[#1A1A1A]"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <code className="text-xs font-mono px-2 py-0.5 border border-black text-black">
                    {method}
                  </code>
                  <code className="text-sm font-mono text-[#1A1A1A] dark:text-white">{path}</code>
                </div>
                <p className="text-sm text-[#3D3D3D] dark:text-[#6E6E6E] dark:text-[#9A9A9A] mb-4">{descriptions[i]}</p>
                <pre className="text-[11px] font-mono text-[#7A7A7A] bg-[#F5F5F5] dark:bg-[#141414] p-3 overflow-x-auto border border-[#E0E0E0] dark:border-[#3D3D3D]">
                  {example}
                </pre>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-[#F0F0F0] dark:border-[#1E1E1E] flex flex-wrap gap-4 mt-10">
            <Link href="/info" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">← /info</Link>
            <Link href="/" className="text-[11px] font-mono tracking-widest uppercase text-[#7A7A7A] hover:text-black dark:hover:text-white border-b border-[#E0E0E0] dark:border-[#3D3D3D] hover:border-black dark:hover:border-white transition-colors">{t("nav.home")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
