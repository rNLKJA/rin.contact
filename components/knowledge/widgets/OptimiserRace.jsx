"use client";

import { useState } from "react";

export default function OptimiserRace({ copy, locale }) {
  const [learningRate, setLearningRate] = useState(0.1);
  const [batchSize, setBatchSize] = useState(32);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Learning rate: {learningRate.toFixed(3)}</label>
        <input
          type="range"
          min="0.001"
          max="1"
          step="0.001"
          value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Batch size: {batchSize}</label>
        <input
          type="range"
          min="1"
          max="256"
          step="1"
          value={batchSize}
          onChange={(e) => setBatchSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded min-h-32 flex items-center justify-center">
        <div className="text-center text-gray-600 dark:text-gray-400">
          Optimiser paths on loss surface
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80">
          Full batch GD
        </button>
        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80">
          Mini-batch
        </button>
        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80">
          SGD
        </button>
        <button className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80">
          Momentum
        </button>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        Learning rate {learningRate.toFixed(3)}, batch size {batchSize}
      </div>
    </div>
  );
}
