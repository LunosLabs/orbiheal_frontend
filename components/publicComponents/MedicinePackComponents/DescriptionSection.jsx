import React from "react";

export default function DescriptionSection({ title, content }) {
  if (!content) return null;

  return (
    <section className="space-y-1">
      <h2 className="font-semibold tracking-wide text-[17px] sm:text-[18px] text-blue-300">
        {title}
      </h2>
      <p className="text-[15px]  text-neutral-200 leading-[1.7] font-normal max-w-2xl">
        {content}
      </p>
    </section>
  );
}
