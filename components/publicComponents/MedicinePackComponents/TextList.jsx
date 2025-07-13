import React from "react";

export default function TextList({ title, content, highlight }) {
  if (!content.length) return null;

  return (
    <section
      className={`rounded-lg ${
        highlight
          ? "px-5 py-4 bg-red-900/10 border border-red-700"
          : ""
      }`}
    >
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
          {title}
        </h2>
      </div>
      <ul className="space-y-2 text-[16px] leading-relaxed text-neutral-100 max-w-prose font-normal list-disc list-inside pl-5">
        {content.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
