'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, Hospital, Stethoscope, CalendarDays } from 'lucide-react';

export default function Prescription({ id, status, doctor, hospital, summary, startDate, endDate }) {
  return (
    <Link
      href={`/consumer/prescription/${id}`}
      aria-label={`View prescription from Dr. ${doctor}`}
      className={`
        group block rounded-lg border border-neutral-800
        px-4 py-4
        shadow-sm transition
        duration-200 ease-in-out
        focus:outline-none focus:ring-2
        ${
          status === 'active'
            ? 'bg-blue-900/40 hover:bg-blue-900/60 focus:ring-blue-700'
            : 'bg-neutral-900/80 hover:bg-neutral-900 focus:ring-green-700'
        }
        hover:shadow-md focus:shadow-md cursor-pointer
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* LEFT SIDE: Doctor & Hospital */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <span className="text-sm sm:text-base font-semibold text-white truncate">
              {doctor}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Hospital className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
            <span className="text-xs sm:text-sm text-neutral-300 truncate">
              {hospital}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 line-clamp-2">
            {summary}
          </p>
        </div>

        {/* RIGHT SIDE: Status & Dates */}
        <div className="flex flex-col items-end sm:items-center sm:flex-row sm:gap-4 min-w-fit">
          <span
            className={`
              inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full
              ${
                status === 'active'
                  ? 'bg-blue-800/60 text-blue-200'
                  : 'bg-green-800/50 text-green-200'
              }
              transition
            `}
          >
            {status === 'active' ? (
              <>
                <Clock className="w-5 h-5" /> Active
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" /> Completed
              </>
            )}
          </span>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300 mt-1 sm:mt-0">
            <CalendarDays className="w-5 h-5 text-blue-300" />
            <span className="font-medium text-blue-200">{startDate}</span>
            <span className="text-neutral-400">–</span>
            <span className="font-medium text-blue-200">{endDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
