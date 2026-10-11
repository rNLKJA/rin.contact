"use client";

import { useState } from "react";

export default function CapPartition({ copy, locale }) {
  const [partitioned, setPartitioned] = useState(false);
  const [choice, setChoice] = useState("cp");

  const nodes = ["A", "B", "C"];

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={partitioned}
            onChange={(e) => setPartitioned(e.target.checked)}
          />
          Network partitioned
        </label>
      </div>

      {partitioned && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Choose:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setChoice("cp")}
              className={`px-3 py-1 text-xs rounded ${choice === "cp" ? "bg-[#FF3C3C] text-white" : "bg-gray-200 dark:bg-gray-700"}`}
            >
              Consistency
            </button>
            <button
              onClick={() => setChoice("ap")}
              className={`px-3 py-1 text-xs rounded ${choice === "ap" ? "bg-[#FF3C3C] text-white" : "bg-gray-200 dark:bg-gray-700"}`}
            >
              Availability
            </button>
          </div>
        </div>
      )}

      <div className="border rounded p-4 min-h-32 bg-gray-50 dark:bg-gray-900">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {nodes.map((node, i) => (
            <div
              key={node}
              className={`border rounded p-2 ${partitioned && i >= 1 ? "opacity-50" : ""}`}
            >
              <div className="font-semibold">{node}</div>
              <div className="text-[10px] text-gray-600 dark:text-gray-400 mt-1">
                {partitioned && choice === "cp" && i >= 1 ? "Refused" : "OK"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          onClick={() => setPartitioned(!partitioned)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
        >
          {partitioned ? "Heal" : "Cut"} link
        </button>
        <button
          onClick={() => setChoice(choice === "cp" ? "ap" : "cp")}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
          disabled={!partitioned}
        >
          Toggle
        </button>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        {partitioned ? `Partition active: ${choice.toUpperCase()} mode` : "Cluster healthy"}
      </div>
    </div>
  );
}
