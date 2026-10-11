"use client";

import { useState } from "react";

export default function VmVsContainer({ copy, locale }) {
  const [view, setView] = useState("vm");

  const vmStack = ["Application", "Guest OS", "Hypervisor", "Host OS", "Hardware"];
  const containerStack = [
    "Application",
    "Shared Kernel",
    "Container Runtime",
    "Host OS",
    "Hardware",
  ];

  const stack = view === "vm" ? vmStack : containerStack;

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setView("vm")}
          className={`px-3 py-1 text-xs rounded ${view === "vm" ? "bg-[#FF3C3C] text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          VMs
        </button>
        <button
          onClick={() => setView("container")}
          className={`px-3 py-1 text-xs rounded ${view === "container" ? "bg-[#FF3C3C] text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          Containers
        </button>
      </div>

      <div className="border rounded p-4 space-y-2">
        {stack.map((layer, i) => (
          <div
            key={i}
            className={`border rounded p-3 text-center text-sm font-semibold ${
              i % 2 === 0
                ? "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            {layer}
          </div>
        ))}
      </div>

      <div className="text-xs space-y-2 text-gray-700 dark:text-gray-300">
        {view === "vm" ? (
          <>
            <div>
              <strong>VMs:</strong> Each guest has its own OS. Higher isolation, bigger overhead.
            </div>
          </>
        ) : (
          <>
            <div>
              <strong>Containers:</strong> Share host kernel. Lighter weight, faster startup.
            </div>
          </>
        )}
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        {view === "vm" ? "Virtual Machine architecture" : "Container architecture"}
      </div>
    </div>
  );
}
