"use client";

import { useState, useMemo } from "react";

export default function GlmFitness() {
  const [probability, setProbability] = useState(0.5);

  const data = useMemo(() => {
    const observed = [8, 12, 15, 18, 20];
    const fitted = observed.map(() => Math.round(20 * probability));

    let pearson = 0;
    let deviance = 0;

    observed.forEach((o, i) => {
      const e = fitted[i];
      if (e > 0) {
        pearson += Math.pow(o - e, 2) / e;
        if (o > 0) deviance += 2 * o * Math.log(o / e);
        if (20 - o > 0) deviance += 2 * (20 - o) * Math.log((20 - o) / (20 - e));
      }
    });

    const dof = observed.length - 1;

    return { pearson: pearson.toFixed(2), deviance: deviance.toFixed(2), dof };
  }, [probability]);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Fitted probability: {probability.toFixed(2)}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={probability}
          onChange={(e) => setProbability(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Pearson X²</div>
          <div className="text-lg font-semibold">{data.pearson}</div>
        </div>
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Deviance</div>
          <div className="text-lg font-semibold">{data.deviance}</div>
        </div>
      </div>

      <div className="border rounded p-3 text-xs">
        <div className="font-mono text-gray-600 dark:text-gray-400">df = {data.dof}</div>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        At probability {probability.toFixed(2)}: Pearson X² = {data.pearson}, Deviance ={" "}
        {data.deviance}
      </div>
    </div>
  );
}
