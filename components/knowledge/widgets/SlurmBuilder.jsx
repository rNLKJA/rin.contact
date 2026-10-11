"use client";

import { useState } from "react";

export default function SlurmBuilder({ copy, locale }) {
  const [nodes, setNodes] = useState(1);
  const [tasksPerNode, setTasksPerNode] = useState(4);
  const [cpusPerTask, setCpusPerTask] = useState(2);
  const [wallTime, setWallTime] = useState(60);

  const totalCores = nodes * tasksPerNode * cpusPerTask;

  const slurmScript = `#!/bin/bash
#SBATCH --nodes=${nodes}
#SBATCH --ntasks-per-node=${tasksPerNode}
#SBATCH --cpus-per-task=${cpusPerTask}
#SBATCH --time=${wallTime}:00

module load python
python my_script.py`;

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nodes: {nodes}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={nodes}
          onChange={(e) => setNodes(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tasks per node: {tasksPerNode}</label>
        <input
          type="range"
          min="1"
          max="16"
          value={tasksPerNode}
          onChange={(e) => setTasksPerNode(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">CPUs per task: {cpusPerTask}</label>
        <input
          type="range"
          min="1"
          max="8"
          value={cpusPerTask}
          onChange={(e) => setCpusPerTask(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Wall time (min): {wallTime}</label>
        <input
          type="range"
          min="5"
          max="480"
          step="5"
          value={wallTime}
          onChange={(e) => setWallTime(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs font-mono overflow-x-auto">
        <pre>{slurmScript}</pre>
      </div>

      <div className="text-sm border rounded p-2">
        <div className="font-mono text-xs text-gray-600 dark:text-gray-400">Total cores</div>
        <div className="text-lg font-semibold">{totalCores}</div>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        {nodes} node{nodes !== 1 ? "s" : ""} × {tasksPerNode} tasks × {cpusPerTask} CPUs ={" "}
        {totalCores} cores for {wallTime} minutes
      </div>
    </div>
  );
}
