import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";

const ENDPOINTS = [
  {
    path: "/api/ping",
    method: "GET",
    description: "Heartbeat endpoint. Returns pong and site status. Terminal clients get a richer plain-text response.",
    example: "curl https://rin.contact/api/ping",
  },
  {
    path: "/api/curl",
    method: "GET",
    description: "ANSI terminal profile when invoked via curl (middleware rewrite). Career timeline, skill bars, and live status.",
    example: "curl rin.contact",
  },
  {
    path: "/api/rin.json",
    method: "GET",
    description: "Structured profile JSON — name, location, skills, experience. For integrations and recruiters.",
    example: "curl https://rin.contact/api/rin.json",
  },
  {
    path: "/api/now",
    method: "GET",
    description: "Current status — what I'm building, learning, reading, and not doing. Inspired by nownownow.com.",
    example: "curl https://rin.contact/api/now",
  },
  {
    path: "/api/fortune",
    method: "GET",
    description: "Random wisdom quote — data science, engineering, and life. JSON with text and author.",
    example: "curl https://rin.contact/api/fortune",
  },
  {
    path: "/api/roast",
    method: "GET",
    description: "Data science roasts — light-hearted feedback on common ML/DS sins. Random each request.",
    example: "curl https://rin.contact/api/roast",
  },
  {
    path: "/api/stack",
    method: "GET",
    description: "Site stack info — framework, styling, typography, deployment, and easter egg hints.",
    example: "curl https://rin.contact/api/stack",
  },
  {
    path: "/api/ping-indexnow",
    method: "POST",
    description: "Notifies IndexNow (Bing, Yandex) that the site has updated. For deployment pipelines.",
    example: "curl -X POST https://rin.contact/api/ping-indexnow",
  },
];

export default function ApiPage() {
  return (
    <>
      <Head>
        <title>API — rin.contact</title>
        <meta name="description" content="Available API endpoints for rin.contact — ping, profile, now, fortune, roast, stack." />
        <link rel="canonical" href="https://rin.contact/info/api" />
      </Head>

      <SeoHead
        title="API — rin.contact"
        description="Available API endpoints for rin.contact — ping, profile, now, fortune, roast, stack."
        path="/info/api"
        ogImage={{ title: "API", subtitle: "Available API endpoints for rin.contact — ping, profile, now...", section: "info" }}
      />

      <div className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-20 md:py-28 flex-1">
          <p className="text-[10px] tracking-widest uppercase text-[#B0B0B0] font-mono mb-4">/info/api</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">API</h1>
          <p className="text-sm text-[#7A7A7A] mb-14">
            Public endpoints for integrations, monitoring, and fun.
            All responses are JSON unless noted. No authentication required.
          </p>

          <div className="space-y-8">
            {ENDPOINTS.map(({ path, method, description, example }) => (
              <div
                key={path}
                className="border border-[#E0E0E0] dark:border-[#3D3D3D] p-6 rounded-none bg-white"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <code className="text-xs font-mono px-2 py-0.5 border border-black text-black">
                    {method}
                  </code>
                  <code className="text-sm font-mono text-[#1A1A1A] dark:text-white">{path}</code>
                </div>
                <p className="text-sm text-[#3D3D3D] dark:text-[#AAAAAA] mb-4">{description}</p>
                <pre className="text-[11px] font-mono text-[#7A7A7A] bg-[#F5F5F5] dark:bg-[#141414] p-3 overflow-x-auto border border-[#E0E0E0] dark:border-[#3D3D3D]">
                  {example}
                </pre>
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
