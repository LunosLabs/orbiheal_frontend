import React from 'react';
import { Stethoscope, Hospital } from 'lucide-react';

export default function DoctorSection({ doctor, hospital, summary }) {
  return (
    <>
      <section className="space-y-2">
        <h2 className="flex items-center gap-3 text-lg font-semibold text-white">
          <Stethoscope className="w-6 h-6 text-blue-400" />
          Prescribed By
        </h2>
        <p className="text-base font-medium text-blue-300">{doctor}</p>
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <Hospital className="w-5 h-5 text-teal-300" />
          {hospital}
        </div>
        <p className="text-sm text-neutral-300">{summary}</p>
      </section>

    </>
  );
}
