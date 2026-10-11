"use client";

import { useState } from "react";

export default function GrammarLayers({ copy, locale }) {
  const [layers, setLayers] = useState({
    data: true,
    aesthetics: false,
    geom: false,
    stat: false,
    scale: false,
    coords: false,
    theme: false,
  });

  const layerNames = ["data", "aesthetics", "geom", "stat", "scale", "coords", "theme"];

  const toggleLayer = (layer) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const allEnabled = Object.values(layers).every((v) => v);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Enable layers:</label>
        <div className="space-y-1">
          {layerNames.map((layer) => (
            <label key={layer} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={layers[layer]} onChange={() => toggleLayer(layer)} />
              {layer.charAt(0).toUpperCase() + layer.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div className="border rounded p-4 min-h-32 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          {allEnabled ? (
            <div className="text-sm font-semibold">Complete ggplot chart</div>
          ) : (
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {Object.values(layers).filter((v) => v).length} / {layerNames.length} layers enabled
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <button
          onClick={() => setLayers(Object.fromEntries(layerNames.map((l) => [l, true])))}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
        >
          All on
        </button>
        <button
          onClick={() => setLayers(Object.fromEntries(layerNames.map((l) => [l, false])))}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
        >
          All off
        </button>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        {Object.values(layers).filter((v) => v).length} of 7 layers active
      </div>
    </div>
  );
}
