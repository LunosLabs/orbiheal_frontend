import React from 'react';
import { Info } from 'lucide-react';

export default function AdviceSection({ advice }) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-3 text-lg font-semibold text-white">
        <Info className="w-6 h-6 text-blue-400" />
        Care Tips
      </h2>
      <ul className="list-disc list-inside text-sm text-neutral-300 space-y-1">
        {advice.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
      <p className="text-xs text-neutral-500 mt-1">
        These recommendations help you use your medications safely and effectively.
      </p>
    </section>
  );
}
