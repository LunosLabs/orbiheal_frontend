import React from "react";

export default function AgeSuitabilityTags({ ageGroups }) {
  if (!ageGroups || ageGroups.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap text-[15px]">
      <h2 className="font-semibold tracking-wide text-[17px] sm:text-[18px] text-blue-300 mb-1">
        Age Suitability
      </h2>
      <div className="flex flex-wrap gap-2">
        {ageGroups.map((group) => (
          <span
            key={group}
            className="
              rounded-full
              border border-blue-800
              bg-blue-950/40
              text-blue-200
              text-[14px]
              font-medium
              px-3
              py-0.5
              transition-colors
              hover:bg-blue-900/70
              hover:text-white
            "
          >
            {group}
          </span>
        ))}
      </div>
    </div>
  );
}
