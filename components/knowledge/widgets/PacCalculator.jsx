"use client";

import { useState, useMemo } from "react";

export default function PacCalculator() {
  const [epsilon, setEpsilon] = useState(0.1);
  const [delta, setDelta] = useState(0.05);
  const [hypothesisCount, setHypothesisCount] = useState(100);

  const sampleSize = useMemo(() => {
    if (epsilon <= 0 || delta <= 0) return 0;
    return Math.ceil(Math.log((2 * hypothesisCount) / delta) / (2 * epsilon * epsilon));
  }, [epsilon, delta, hypothesisCount]);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">ε (error margin): {epsilon.toFixed(3)}</label>
        <input
          type="range"
          min="0.01"
          max="0.5"
          step="0.01"
          value={epsilon}
          onChange={(e) => setEpsilon(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">δ (failure probability): {delta.toFixed(3)}</label>
        <input
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={delta}
          onChange={(e) => setDelta(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          |H| (hypothesis class size): {hypothesisCount}
        </label>
        <input
          type="range"
          min="2"
          max="10000"
          step="1"
          value={hypothesisCount}
          onChange={(e) => setHypothesisCount(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="border rounded p-4">
        <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Sample size needed</div>
        <div className="text-2xl font-semibold">{sampleSize.toLocaleString()}</div>
      </div>

      <div className="text-xs space-y-1 font-mono text-gray-700 dark:text-gray-300">
        <div>m ≥ ln(2|H|/δ) / (2ε²)</div>
        <div className="text-gray-600 dark:text-gray-400">
          m ≥ ln({((2 * hypothesisCount) / delta).toFixed(1)}) /{" "}
          {(2 * epsilon * epsilon).toFixed(4)}
        </div>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        Need {sampleSize.toLocaleString()} samples to ensure error ≤ {epsilon.toFixed(3)} with{" "}
        {(delta * 100).toFixed(1)}% failure probability.
      </div>
    </div>
  );
}
