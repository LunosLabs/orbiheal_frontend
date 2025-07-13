'use client';

import React from 'react';
import Link from 'next/link';
import { Pencil } from 'lucide-react';

export default function HeaderSection({ editHref = "edit" }) {
  return (
    <header className="border-b border-neutral-800 pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
        <div className="space-y-1 max-w-prose">
          <h1 className="text-2xl sm:text-3xl font-semibold text-blue-100 tracking-tight">
            Your Prescription Overview
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Doctor-approved guidance to help you follow your treatment plan with confidence.
          </p>
        </div>

        <Link
          href={editHref}
          className="self-start sm:self-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-normal text-blue-300 hover:text-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-600 transition border border-blue-800/40 bg-neutral-900/40 hover:bg-blue-800/20"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </Link>
      </div>
    </header>
  );
}
