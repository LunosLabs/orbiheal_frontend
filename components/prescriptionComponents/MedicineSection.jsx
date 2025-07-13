import React from 'react';
import { Pill, AlertTriangle } from 'lucide-react';

export default function MedicinesSection({ medicines }) {
  return (
    <>
      <section className="space-y-4">
        <h2 className="flex items-center gap-3 text-lg font-semibold text-white">
          <Pill className="w-6 h-6 text-teal-400" />
          Medicines & Instructions
        </h2>
        {medicines.map((med, idx) => (
          <div key={idx} className="space-y-2 border-l-2 border-teal-800 pl-4">
            <p className="text-base font-medium text-blue-300">{med.name}</p>
            <p className="text-sm text-neutral-300">
              <span className="font-medium text-neutral-200">Purpose:</span> {med.purpose}
            </p>
            <p className="text-sm text-neutral-300">
              <span className="font-medium text-neutral-200">Timing:</span> {med.timing}
            </p>
            {med.sideEffects?.trim() ? (
              <div className="flex items-start gap-2 mt-2 p-3 rounded-md border border-amber-500/30 bg-amber-900/20 text-amber-300 text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Possible Side Effects:</span> {med.sideEffects}
                </span>
              </div>
            ) : (
              <p className="text-xs text-green-400 italic">
                No significant side effects reported. Safe as prescribed.
              </p>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
