import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function RoastPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoast = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/roast");
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError("Failed to load roast. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoast();
  }, [fetchRoast]);

  return (
    <>
      <Head>
        <title>Roast — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 font-mono">
        <div className="max-w-lg w-full">

          <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-6">
            Honest feedback engine
          </p>

          {loading ? (
            <p className="text-sm text-[#555]">Loading roast...</p>
          ) : error ? (
            <p className="text-sm text-[#FF3C3C] mb-6">{error}</p>
          ) : data ? (
            <>
              <div className="border-l-2 border-[#FF3C3C] pl-4 mb-6">
                <p className="text-[10px] text-[#7A7A7A] uppercase tracking-widest mb-2">
                  Sin detected
                </p>
                <p className="text-white text-sm font-mono mb-4">
                  {data.sin}
                </p>
                <p className="text-[#AAAAAA] text-sm leading-relaxed">
                  {data.roast}
                </p>
              </div>
              <p className="text-[10px] text-[#555] mb-8">
                Severity: {data.severity}
              </p>
            </>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchRoast}
              disabled={loading}
              className="border border-[#FF3C3C] text-[#FF3C3C] px-6 py-2.5 text-xs tracking-widest uppercase
                         hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get another roast"}
            </button>
            <Link
              href="/api/fortune"
              target="_blank"
              rel="noreferrer"
              className="border border-[#3D3D3D] text-[#7A7A7A] px-6 py-2.5 text-xs tracking-widest uppercase
                         hover:border-[#555] hover:text-white transition-colors duration-200"
            >
              Recovery →
            </Link>
            <Link
              href="/"
              className="border border-[#2A2A2A] text-[#555] px-6 py-2.5 text-xs tracking-widest uppercase
                         hover:border-[#555] hover:text-white transition-colors duration-200"
            >
              ← Home
            </Link>
          </div>

          <p className="text-[9px] text-[#333] mt-10">
            Run again for a fresh humbling. No data scientists were harmed.
          </p>
        </div>
      </div>
    </>
  );
}
