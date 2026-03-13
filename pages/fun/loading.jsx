import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import FibonacciFlower from "@/components/ui/FibonacciFlower";

const MESSAGES = [
  "Initialising neural pathways...",
  "Fetching coffee.json...",
  "Training on your curiosity...",
  "Compiling career data...",
  "Optimising hyperparameters...",
  "Waiting for GPU allocation...",
  "Cross-validating existence...",
  "Rendering personality matrix...",
  "Deploying to production brain...",
  "Almost there (probably)...",
  "Convergence: imminent...",
  "Loss is decreasing. Trust the process.",
  "Still loading. Some things take time.",
  "Model checkpoint saved at epoch 26.",
  "This is intentional. Patience is a virtue.",
  "The best features take time to engineer.",
  "ETA: undefined",
];

export default function LoadingPage() {
  const [elapsed, setElapsed]   = useState(0);
  const [msgIdx, setMsgIdx]     = useState(0);
  const [dots, setDots]         = useState(".");

  useEffect(() => {
    const tick = setInterval(() => setElapsed((s) => s + 1), 1000);
    const msgT = setInterval(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), 3200);
    const dotT = setInterval(() => setDots((d) => d.length >= 3 ? "." : d + "."), 500);
    return () => { clearInterval(tick); clearInterval(msgT); clearInterval(dotT); };
  }, []);

  const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const s = String(elapsed % 60).padStart(2, "0");

  const pct = Math.min(elapsed * 0.18, 99.97).toFixed(2);

  return (
    <>
      <Head>
        <title>Loading{dots} — rin.contact</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 font-mono">
        <div className="max-w-sm w-full text-center">

          {/* Fibonacci flower */}
          <div className="mb-10 flex justify-center text-black">
            <FibonacciFlower size={100} animate />
          </div>

          {/* Status message */}
          <p className="text-xs text-[#7A7A7A] mb-6 h-4 transition-opacity duration-500">
            {MESSAGES[msgIdx]}
          </p>

          {/* Progress bar */}
          <div className="w-full border border-[#E0E0E0] h-px relative mb-2">
            <div
              className="absolute left-0 top-0 h-full bg-[#FF3C3C] transition-all duration-1000"
              style={{ width: `${pct}%` }}
              aria-hidden="true"
            />
          </div>

          <div className="flex justify-between text-[10px] text-[#CCCCCC] mb-10">
            <span>{pct}%</span>
            <span>{h}:{m}:{s}</span>
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-[#AAAAAA] leading-relaxed mb-6">
            Some things take time.<br />
            The model is still training.
          </p>

          <Link
            href="/"
            className="text-[10px] tracking-widest uppercase text-[#CCCCCC] hover:text-black border-b border-[#E0E0E0] hover:border-black transition-colors"
          >
            abort mission
          </Link>
        </div>
      </div>

    </>
  );
}
