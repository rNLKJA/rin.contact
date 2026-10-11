"use client";

import { useState } from "react";

export default function FillingMethods() {
  const [method, setMethod] = useState("ffill");

  const methods = ["none", "ffill", "bfill", "linear", "mean"];

  const data = [5, null, null, 8, 10, null, 12];

  const fill = (method) => {
    const result = [...data];
    if (method === "none") return result;
    if (method === "ffill") {
      let last = result[0];
      for (let i = 1; i < result.length; i++) {
        if (result[i] === null) result[i] = last;
        else last = result[i];
      }
    }
    if (method === "bfill") {
      let next = result[result.length - 1];
      for (let i = result.length - 2; i >= 0; i--) {
        if (result[i] === null) result[i] = next;
        else next = result[i];
      }
    }
    return result;
  };

  const filled = fill(method);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Method:</label>
        <div className="grid grid-cols-3 gap-2">
          {methods.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`px-2 py-1 text-xs rounded ${
                method === m ? "bg-[#FF3C3C] text-white" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-2">Original</div>
          <div className="text-xs space-y-1 font-mono">
            {data.map((v, i) => (
              <div key={i}>{v === null ? "∅" : v}</div>
            ))}
          </div>
        </div>
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-2">{method}</div>
          <div className="text-xs space-y-1 font-mono">
            {filled.map((v, i) => (
              <div key={i} className={data[i] === null && v !== null ? "text-[#FF3C3C]" : ""}>
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        Method: {method}
      </div>
    </div>
  );
}
