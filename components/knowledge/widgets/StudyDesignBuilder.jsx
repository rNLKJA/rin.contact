"use client";

import { useState, useMemo } from "react";

export default function StudyDesignBuilder() {
  const [exposure, setExposure] = useState(100);
  const [disease, setDisease] = useState(80);

  const data = useMemo(() => {
    const tp = Math.min(exposure, disease);
    const fp = exposure - tp;
    const fn = disease - tp;
    const tn = 100 - tp - fp - fn;

    const or = (tp * tn) / (fp * fn) || 0;
    const rr = tp / (tp + fn) / (fp / (fp + tn)) || 0;

    return { tp, fp, fn, tn, or: or.toFixed(2), rr: rr.toFixed(2) };
  }, [exposure, disease]);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Exposed: {exposure}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={exposure}
          onChange={(e) => setExposure(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">With disease: {disease}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={disease}
          onChange={(e) => setDisease(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="border rounded p-2">
          <div className="font-mono text-gray-600 dark:text-gray-400">TP</div>
          <div className="font-semibold">{data.tp}</div>
        </div>
        <div className="border rounded p-2">
          <div className="font-mono text-gray-600 dark:text-gray-400">FP</div>
          <div className="font-semibold">{data.fp}</div>
        </div>
        <div className="border rounded p-2">
          <div className="font-mono text-gray-600 dark:text-gray-400">FN</div>
          <div className="font-semibold">{data.fn}</div>
        </div>
        <div className="border rounded p-2">
          <div className="font-mono text-gray-600 dark:text-gray-400">TN</div>
          <div className="font-semibold">{data.tn}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Odds ratio</div>
          <div className="text-lg font-semibold">{data.or}</div>
        </div>
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Risk ratio</div>
          <div className="text-lg font-semibold">{data.rr}</div>
        </div>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        OR = {data.or}, RR = {data.rr}
      </div>
    </div>
  );
}
