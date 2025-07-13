"use client";

import Link from "next/link";
import { IndianRupee } from "lucide-react";

export default function SearchMedicine({ med }) {
  if (!med) return null;

  const formatPrice = () => {
    if (med.min_price == null) return "—";
    if (med.max_price == null || med.min_price === med.max_price)
      return `${med.min_price}`;
    return `${med.min_price} – ${med.max_price}`;
  };

  return (
    <Link
      href={`/dashboard/medicine/${med.id}`}
      className="
        group relative overflow-hidden
        rounded-xl border border-neutral-800
        bg-neutral-900 hover:border-blue-500
        hover:bg-neutral-900/85 hover:shadow-lg hover:shadow-blue-500/10
        transition-all duration-200
        p-4 flex flex-col justify-between
        min-h-[120px] max-h-[120px] w-full
        cursor-pointer active:scale-[0.97]
      "
    >
      {/* Badge */}
      {med.regulatory_status && (
        <span
          className="
            absolute top-2 right-2
            text-[10px] px-2 py-0.5 rounded-full
            border border-yellow-400 text-yellow-200
            font-medium uppercase tracking-wide
            bg-yellow-900/30 backdrop-blur-sm
            z-10
          "
        >
          {med.regulatory_status}
        </span>
      )}

      {/* Content */}
      <div className="flex-1 w-full flex justify-between gap-2">
        {/* Text Info */}
        <div className="flex flex-col min-w-0 space-y-0.5">
          <h2 className="text-[15px] font-semibold text-blue-300 group-hover:text-blue-400 truncate">
            {med.brand_name || "—"}
          </h2>
          <p className="text-sm text-neutral-300 truncate">
            {med.generic_name || "—"}
          </p>
          <p className="text-xs text-neutral-400 truncate">
            {med.form_name ? `${med.form_name}, ` : ""}
            {med.strength || ""}
          </p>
          <p className="text-[11px] text-neutral-500 italic truncate">
            {med.manufacturer_name || "—"}
          </p>
        </div>

        {/* Price aligned vertically */}
        <div className="flex flex-col justify-end items-end min-w-[70px]">
          <div className="inline-flex items-center gap-1 rounded bg-green-900/20 px-2 py-0.5">
            <IndianRupee className="w-3.5 h-3.5 text-green-400" />
            <span className="text-sm font-semibold text-green-400">
              {formatPrice()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
