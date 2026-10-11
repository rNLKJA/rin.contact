"use client";

import { useState } from "react";

export default function RestGraphql({ copy, locale }) {
  const [selectedFields, setSelectedFields] = useState(["id", "name", "postCount"]);

  const fields = ["id", "name", "email", "bio", "postCount", "followersCount", "createdAt"];

  const toggleField = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Select fields:</label>
        <div className="space-y-1">
          {fields.map((field) => (
            <label key={field} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={() => toggleField(field)}
              />
              {field}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-2">
            REST (waterfall)
          </div>
          <div className="text-xs space-y-1 font-mono">
            <div>GET /api/users/1</div>
            <div className="text-gray-600 dark:text-gray-400">
              → {Math.ceil(Math.random() * 50)} ms
            </div>
            {selectedFields.includes("postCount") && (
              <>
                <div>GET /api/users/1/posts</div>
                <div className="text-gray-600 dark:text-gray-400">
                  → {Math.ceil(Math.random() * 100)} ms
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border rounded p-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-2">
            GraphQL (single)
          </div>
          <div className="text-xs font-mono">
            <div>POST /graphql</div>
            <div className="text-gray-600 dark:text-gray-400">
              → {Math.ceil(Math.random() * 50)} ms
            </div>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        {selectedFields.length} fields selected
      </div>
    </div>
  );
}
