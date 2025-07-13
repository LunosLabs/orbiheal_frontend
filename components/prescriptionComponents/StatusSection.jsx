import React from 'react';
import { Clock, CalendarDays } from 'lucide-react';

export default function StatusSection({ status, startDate, endDate }) {
  return (
    <>
      <section className="space-y-2">
        <h2 className="flex items-center gap-3 text-lg font-semibold text-white">
          <Clock className="w-6 h-6 text-blue-400" />
          Status & Schedule
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-300">
          <span
            className={`inline-block px-2 py-0.5 rounded-full font-medium ${
              status
                ? 'bg-green-800/50 text-green-200'
                : 'bg-blue-800/60 text-blue-200'
            }`}
          >
            {status ? 'Active' : 'Completed'}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="w-5 h-5 text-blue-300" />
            {startDate} – {endDate}
          </span>
        </div>
      </section>
    </>
  );
}
