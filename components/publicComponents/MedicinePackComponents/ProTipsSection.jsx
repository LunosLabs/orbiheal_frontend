import React from "react";
import { Lightbulb } from "lucide-react";

export default function ProTipsSection({ title, content }) {
  if (!content?.length) return null;

  return (
    <section
      className="my-6 px-5 py-4 rounded-lg bg-blue-950/40 border border-blue-800"
      aria-label={title || "Pro Tips"}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex items-center justify-center">
          <Lightbulb
            className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.7)]"
            aria-hidden="true"
          />
        </span>
        <h2 className="text-lg font-bold text-blue-200">
          {title}
        </h2>
      </div>

      {/* Tips List */}
      <ul className="space-y-2 text-[16px] text-neutral-100">
        {content.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2"
          >
            <span className="inline-block w-2 h-2 mt-2 rounded-full bg-yellow-300 shadow-[0_0_6px_2px_rgba(253,224,71,0.5)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
