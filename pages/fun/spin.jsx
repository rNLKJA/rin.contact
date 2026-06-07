import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useCallback } from "react";

const ACTIVITIES = [
  "Writing SQL",
  "In a meeting",
  "Coffee break",
  "Debugging production",
  "Reading a paper",
  "Building a dashboard",
  "Reviewing a PR",
  "Optimising a query",
  "Answering emails",
  "Thinking about data",
  "Probably coding",
  "Staring at a chart",
];

export default function SpinPage() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const idx = Math.floor(Math.random() * ACTIVITIES.length);
    const segmentAngle = 360 / ACTIVITIES.length;
    const extraRotations = 5 + Math.random() * 3;
    const targetAngle = 360 * extraRotations + (360 - idx * segmentAngle - segmentAngle / 2);
    setRotation((r) => r + targetAngle);
    setTimeout(() => {
      setResult(ACTIVITIES[idx]);
      setSpinning(false);
    }, 3200);
  }, [spinning]);

  return (
    <>
      <Head>
        <title>Spin — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SeoHead
        title="Spin — rin.contact"
        description=""
        path="/fun/spin"
        ogImage={{ title: "Spin", subtitle: "", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 font-mono">
        <p className="text-[10px] tracking-widest uppercase text-[#FF3C3C] mb-6">
          What is Rin doing right now?
        </p>

        <div className="relative mb-10">
          <div
            className="w-48 h-48 rounded-full border-2 border-[#3D3D3D]
                       transition-transform duration-[3200ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(${ACTIVITIES.map(
                (_, i) => `#${i % 2 ? "1A1A1A" : "2A2A2A"} ${(i * 360) / ACTIVITIES.length}deg #${i % 2 ? "2A2A2A" : "1A1A1A"} ${((i + 1) * 360) / ACTIVITIES.length}deg`
              ).join(", ")})`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-black border-2 border-[#FF3C3C] flex items-center justify-center">
              <span className="text-[7px] text-[#555]">RIN</span>
            </div>
          </div>
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0
                       border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent
                       border-b-[10px] border-b-[#FF3C3C]"
          />
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="border border-[#FF3C3C] text-[#FF3C3C] px-8 py-3 text-xs tracking-widest uppercase
                     hover:bg-[#FF3C3C] hover:text-white transition-colors duration-200 disabled:opacity-50"
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>

        {result && (
          <p
            className="mt-8 text-lg text-white font-medium"
            style={{ animation: "fade-in 0.5s ease-out both" }}
          >
            {result}
          </p>
        )}

        <Link
          href="/"
          className="mt-12 text-[10px] tracking-widest uppercase text-[#555] hover:text-white transition-colors"
        >
          ← Home
        </Link>
      </div>
    </>
  );
}
