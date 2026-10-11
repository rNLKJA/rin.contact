"use client";

import { useState, useMemo } from "react";

export default function AmdahlGustafson({ copy }) {
  const [cores, setCores] = useState(16);
  const [serialFraction, setSerialFraction] = useState(0.1);

  const amdahlSpeedup = useMemo(() => {
    if (cores <= 0) return 1;
    return 1 / (serialFraction + (1 - serialFraction) / cores);
  }, [cores, serialFraction]);

  const gustafsonSpeedup = useMemo(() => {
    if (cores <= 0) return 1;
    return cores - serialFraction * (cores - 1);
  }, [cores, serialFraction]);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {copy.cores || "Cores"}: {cores}
        </label>
        <input
          type="range"
          min="1"
          max="256"
          step="1"
          value={cores}
          onChange={(e) => setCores(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          {copy.serialFraction || "Serial fraction"}: {(serialFraction * 100).toFixed(1)}%
        </label>
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={serialFraction}
          onChange={(e) => setSerialFraction(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Amdahl</div>
          <div className="text-lg font-semibold">{amdahlSpeedup.toFixed(2)}x</div>
        </div>
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Gustafson</div>
          <div className="text-lg font-semibold">{gustafsonSpeedup.toFixed(2)}x</div>
        </div>
      </div>

      <div className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
        <div>
          Amdahl: 1 / ({serialFraction.toFixed(3)} + {((1 - serialFraction) / cores).toFixed(4)})
        </div>
        <div>
          Gustafson: {cores} - {(serialFraction * (cores - 1)).toFixed(3)}
        </div>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        {copy.summary
          ? copy.summary
              .replace("{amdahl}", amdahlSpeedup.toFixed(2))
              .replace("{gustafson}", gustafsonSpeedup.toFixed(2))
              .replace("{cores}", cores)
          : `At ${cores} cores with ${(serialFraction * 100).toFixed(0)}% serial code, Amdahl gives ${amdahlSpeedup.toFixed(1)}x and Gustafson gives ${gustafsonSpeedup.toFixed(1)}x.`}
      </div>
    </div>
  );
}
