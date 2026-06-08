import Head from "next/head";
import SeoHead from "@/components/seo/SeoHead";
import Link from "next/link";
import { useState, useEffect } from "react";

const HAIKUS = [
  {
    lines: ["clean data at last", "NaN values disappear", "model still broken"],
    note:  "on data quality"
  },
  {
    lines: ["accuracy: one", "test set seen during training", "nature finds a way"],
    note:  "on data leakage"
  },
  {
    lines: ["stack overflow post", "accepted answer from 2014", "dependencies cry"],
    note:  "on legacy code"
  },
  {
    lines: ["p-value: 0.04", "journal submission accepted", "replicate: it won't"],
    note:  "on p-hacking"
  },
  {
    lines: ["deploy on Friday", "what could possibly go wrong", "Slack at 11pm"],
    note:  "a cautionary tale"
  },
  {
    lines: ["random state: 42", "every data scientist", "same seed, same soul"],
    note:  "on convention"
  },
  {
    lines: ["the model converged", "loss curve descends like rain", "stakeholder: but why?"],
    note:  "on explainability"
  },
  {
    lines: ["git commit -m fix", "git commit -m fix 2", "git push --force"],
    note:  "on version control"
  },
  {
    lines: ["feature importance", "column_287 wins", "nobody knows why"],
    note:  "on black boxes"
  },
  {
    lines: ["correlation found", "causation assumed at once", "investor impressed"],
    note:  "on fallacies"
  },
  {
    lines: ["95% sure", "confidence interval speaks", "uncertainty wins"],
    note:  "on statistics"
  },
  {
    lines: ["requirements.txt", "ninety-four dependencies", "for a hello world"],
    note:  "on bloat"
  },
  {
    lines: ["production system", "no tests, no documentation", "prayers and duct tape"],
    note:  "on technical debt"
  },
  {
    lines: ["model in staging", "model in production", "which one is real?"],
    note:  "on model drift"
  },
  {
    lines: ["the data is clean", "said no data scientist", "ever, not once"],
    note:  "on the work"
  },
];

function useTypeLines(lines, speed = 35) {
  const [displayed, setDisplayed] = useState(["", "", ""]);

  useEffect(() => {
    setDisplayed(["", "", ""]);
    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (lineIdx >= lines.length) return;
      const current = lines[lineIdx];
      if (charIdx < current.length) {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIdx] = current.slice(0, charIdx + 1);
          return next;
        });
        charIdx++;
        setTimeout(tick, speed);
      } else {
        lineIdx++;
        charIdx = 0;
        if (lineIdx < lines.length) setTimeout(tick, speed + 80);
      }
    }

    const t = setTimeout(tick, 200);
    return () => { cancelled = true; clearTimeout(t); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|")]);

  return displayed;
}

export default function HaikuPage() {
  const [idx, setIdx]       = useState(() => Math.floor(Math.random() * HAIKUS.length));
  const [animKey, setAnimKey] = useState(0);
  const haiku   = HAIKUS[idx];
  const lines   = useTypeLines(haiku.lines);

  function next() {
    setIdx((i) => {
      let n;
      do { n = Math.floor(Math.random() * HAIKUS.length); } while (n === i);
      return n;
    });
    setAnimKey((k) => k + 1);
  }

  const syllables = [5, 7, 5];

  return (
    <>
      <Head>
        <title>haiku — rin.contact</title>
        <meta name="description" content="Data science haikus by Rin Huang. Absurd, accurate, 5-7-5." />
        <link rel="canonical" href="https://rin.contact/fun/haiku" />
        <meta name="robots" content="noindex" />
      </Head>

      <SeoHead
        title="haiku — rin.contact"
        description="Data science haikus by Rin Huang. Absurd, accurate, 5-7-5."
        path="/fun/haiku"
        ogImage={{ title: "haiku", subtitle: "Data science haikus by Rin Huang. Absurd, accurate, 5-7-5.", section: "fun" }}
        noindex={true}
      />

      <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center px-6 py-16">

        {/* Label */}
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FF3C3C] mb-12">
          data science haiku
        </p>

        {/* Haiku card */}
        <div
          className="w-full max-w-sm mb-10"
          key={animKey}
        >
          {haiku.lines.map((_, i) => (
            <div key={i} className="flex items-baseline gap-4 mb-3">
              <span className="font-mono text-[10px] text-[#2A2A2A] w-4 text-right flex-shrink-0">
                {syllables[i]}
              </span>
              <p
                className="font-mono text-xl md:text-2xl text-white leading-snug tracking-wide"
                aria-label={haiku.lines[i]}
              >
                {lines[i]}
                {lines[i].length < haiku.lines[i].length && (
                  <span className="animate-blink ml-0.5 text-[#FF3C3C]">_</span>
                )}
              </p>
            </div>
          ))}

          <p className="font-mono text-[10px] text-[#3A3A3A] mt-6 tracking-widest uppercase">
            — {haiku.note}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={next}
            className="font-mono text-[11px] tracking-widest uppercase border border-[#3D3D3D] text-[#7A7A7A]
                       px-6 py-2.5 hover:border-white hover:text-white transition-colors duration-200"
          >
            next haiku →
          </button>
          <span className="font-mono text-[10px] text-[#2A2A2A]">
            {idx + 1} / {HAIKUS.length}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-14 flex gap-6">
          <Link href="/"
            className="font-mono text-[10px] tracking-widest uppercase text-[#2A2A2A] hover:text-[#7A7A7A] transition-colors">
            ← home
          </Link>
          <Link href="/resume"
            className="font-mono text-[10px] tracking-widest uppercase text-[#2A2A2A] hover:text-[#7A7A7A] transition-colors">
            /resume
          </Link>
          <Link href="/fun/matrix"
            className="font-mono text-[10px] tracking-widest uppercase text-[#2A2A2A] hover:text-[#7A7A7A] transition-colors">
            /fun/matrix
          </Link>
        </div>

      </div>
    </>
  );
}
