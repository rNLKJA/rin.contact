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

export default function ThresholdSlider({ copy, locale }) {
  const [threshold, setThreshold] = useState(0.5);
  const [seed, setSeed] = useState(42);

  const rng = useMemo(() => mulberry32(seed), [seed]);

  // Generate synthetic score distributions
  const generateScores = () => {
    const r = mulberry32(seed);
    const pos = Array.from({ length: 100 }, () => {
      const u1 = r();
      const u2 = r();
      return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.15 + 0.7;
    });
    const neg = Array.from({ length: 100 }, () => {
      const u1 = r();
      const u2 = r();
      return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.15 + 0.3;
    });
    return { pos, neg };
  };

  const { pos, neg } = useMemo(generateScores, [seed]);

  const tp = pos.filter((s) => s >= threshold).length;
  const fp = neg.filter((s) => s >= threshold).length;
  const tn = neg.filter((s) => s < threshold).length;
  const fn = pos.filter((s) => s < threshold).length;

  const precision = tp / (tp + fp) || 0;
  const recall = tp / (tp + fn) || 0;
  const f1 = (2 * precision * recall) / (precision + recall) || 0;

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {copy.threshold}: {threshold.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          {copy.tp}: {tp}
        </div>
        <div>
          {copy.fp}: {fp}
        </div>
        <div>
          {copy.tn}: {tn}
        </div>
        <div>
          {copy.fn}: {fn}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          {copy.precision}: {precision.toFixed(2)}
        </div>
        <div>
          {copy.recall}: {recall.toFixed(2)}
        </div>
        <div>
          {copy.f1}: {f1.toFixed(2)}
        </div>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        {copy.summary
          .replace("{t}", threshold.toFixed(2))
          .replace("{p}", precision.toFixed(2))
          .replace("{r}", recall.toFixed(2))
          .replace("{f}", f1.toFixed(2))}
      </div>
    </div>
  );
}
