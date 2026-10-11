"use client";

import { useState } from "react";

export default function AlphaBetaStepper() {
  const [step, setStep] = useState(0);
  const [showOrdering, setShowOrdering] = useState(false);

  const maxSteps = 5;

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Step: {step} / {maxSteps}
        </label>
        <input
          type="range"
          min="0"
          max={maxSteps}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="border rounded p-4 min-h-32 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm font-semibold">Game tree at step {step}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Pruned branches hidden
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showOrdering}
          onChange={(e) => setShowOrdering(e.target.checked)}
        />
        Best move ordering enabled
      </label>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
        >
          ← Previous
        </button>
        <button
          onClick={() => setStep(Math.min(maxSteps, step + 1))}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
        >
          Next →
        </button>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        Step {step}, {showOrdering ? "with" : "without"} move ordering.
      </div>
    </div>
  );
}
