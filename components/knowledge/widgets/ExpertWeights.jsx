"use client";

import { useState, useMemo } from "react";

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ExpertWeights({ copy, locale }) {
  const [eta, setEta] = useState(0.1);
  const [round, setRound] = useState(10);
  const [seed, setSeed] = useState(42);

  const data = useMemo(() => {
    const r = mulberry32(seed);
    const experts = [0.7, 0.5, 0.4, 0.8];
    let weights = [1, 1, 1, 1];
    let totalRegret = 0;

    for (let t = 1; t <= round; t++) {
      const sum = weights.reduce((a, b) => a + b, 0);
      const probs = weights.map((w) => w / sum);

      const actual = experts.map((p) => (r() < p ? 1 : 0));
      const losses = actual.map((a) => 1 - a);

      weights = weights.map((w, i) => w * Math.exp(-eta * losses[i]));

      const bestLoss = Math.min(...losses);
      totalRegret += Math.min(...losses);
    }

    return { totalRegret };
  }, [eta, round, seed]);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Learning rate (η): {eta.toFixed(2)}</label>
        <input
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={eta}
          onChange={(e) => setEta(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Round: {round}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={round}
          onChange={(e) => setRound(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-4 gap-2 text-xs">
        {["A", "B", "C", "D"].map((name) => (
          <div key={name} className="border rounded p-2">
            <div className="font-mono text-gray-600 dark:text-gray-400">Expert {name}</div>
            <div className="text-sm font-semibold">–</div>
          </div>
        ))}
      </div>

      <div className="border rounded p-3 text-sm">
        <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Cumulative regret</div>
        <div className="text-lg font-semibold">{data.totalRegret}</div>
      </div>

      <button
        onClick={() => setSeed(seed + 1)}
        className="w-full px-3 py-2 text-sm bg-accent-ink text-white rounded hover:opacity-90"
      >
        New experts
      </button>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        Multiplicative weights after {round} rounds with η = {eta.toFixed(2)}.
      </div>
    </div>
  );
}
