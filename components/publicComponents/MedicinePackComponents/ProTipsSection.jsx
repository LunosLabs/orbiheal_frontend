import React from "react";
import { Lightbulb } from "lucide-react";

export default function ProTipsSection({ data }) {
  if (!data || !data.content) return null;
  const { category_description, content } = data;

  return (
    <section
      className="my-6 p-5 rounded-xl bg-blue-950/40 border border-blue-800 shadow-lg"
      aria-label={category_description || "Pro Tips"}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center">
          <Lightbulb
            className="w-6 h-6 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.7)]"
            aria-hidden="true"
          />
        </span>
        <h2 className="text-[18px] sm:text-[19px] font-bold text-blue-200 tracking-wide">
          {category_description}
        </h2>
      </div>

      {/* Tips Content */}
      <div className="text-[16px] sm:text-[17px] leading-relaxed text-neutral-100 max-w-prose">
        {content}
      </div>
    </section>
  );
}
