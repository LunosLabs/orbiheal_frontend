import React from "react";

export default function TextList({ data , highlight}) {
  if (!data || !data.content) return null;
  const { category_description, content } = data;

  return (
    <section
      className={`rounded-lg ${
        highlight
          ? "px-5 py-4 bg-red-900/10 border border-red-700"
          : ""
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-2">
        {highlight && (
          <span
            className="inline-block w-1 h-5 rounded bg-red-500"
            aria-hidden="true"
          />
        )}
        <h2
          className={`font-semibold tracking-wide ${
            highlight
              ? "text-[17px] sm:text-[18px] text-red-300"
              : "text-[17px] sm:text-[18px] text-blue-300"
          }`}
        >
          {category_description}
        </h2>
      </div>

      {/* Description Content */}
      <div className="text-[16px] leading-relaxed text-neutral-100 max-w-prose space-y-2">
        <div className="text-neutral-100">
          {content}
        </div>
      </div>
    </section>
  );
}
