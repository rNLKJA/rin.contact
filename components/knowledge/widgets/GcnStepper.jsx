"use client";

import { useState } from "react";

export default function GcnStepper({ copy, locale }) {
  const [step, setStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState(0);

  const nodes = 7;
  const layers = ["Input", "After aggregation", "After activation"];

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Step: {step} / {layers.length - 1}
        </label>
        <input
          type="range"
          min="0"
          max={layers.length - 1}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: nodes }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSelectedNode(i)}
            className={`w-10 h-10 rounded-full font-mono text-xs font-semibold transition ${
              selectedNode === i ? "bg-[#FF3C3C] text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      <div className="border rounded p-4 text-center">
        <div className="font-mono text-xs text-gray-600 dark:text-gray-400">{layers[step]}</div>
        <div className="text-lg font-semibold mt-2">Node {selectedNode}</div>
      </div>

      <div className="space-y-2 text-xs">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className="w-full px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
        >
          ← Previous step
        </button>
        <button
          onClick={() => setStep(Math.min(layers.length - 1, step + 1))}
          className="w-full px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
        >
          Next step →
        </button>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        Step {step}: {layers[step]}
      </div>
    </div>
  );
}
