import React from "react";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export default function MedicineHeader({ medicine, generic }) {
  const { brand_name, updated_at, is_verified } = medicine;

  return (
    <header className="py-3 mb-3">
      <div className="flex flex-col items-center gap-2">
        {/* Brand & Generic Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-100 tracking-tight">
          {brand_name || "Unknown Brand"}
          <span className="text-blue-400 font-semibold text-lg sm:text-xl ml-2">
            ({generic?.name || "Unknown Generic"})
          </span>
        </h1>

        {/* Status Badge */}
        {is_verified ? (
          <div className="inline-flex items-center gap-1 px-3 py-1 text-[13px] font-bold text-emerald-300 uppercase ring-1 ring-emerald-400/60 bg-emerald-900/40 rounded-full shadow-md drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] hover:text-emerald-200 transition">
            <ShieldCheck className="w-4 h-4 text-emerald-300 drop-shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
            Verified by Experts
          </div>
        ) : (
          <div className="inline-flex items-center gap-1 px-3 py-1 text-[13px] font-bold text-rose-300 uppercase ring-1 ring-rose-400/60 bg-rose-900/40 rounded-full shadow-md drop-shadow-[0_0_8px_rgba(251,113,133,0.4)] hover:text-rose-200 transition">
            <AlertTriangle className="w-4 h-4 text-rose-300 drop-shadow-[0_0_6px_rgba(251,113,133,0.7)]" />
            Data Pending Expert Review
          </div>
        )}

        {/* Last Reviewed */}
        <p className="text-[11px] text-neutral-400 font-medium mt-1">
          Last reviewed:{" "}
          <span className="font-semibold text-blue-300">
            {formatDate(updated_at || new Date().toISOString())}
          </span>
        </p>
      </div>
    </header>
  );
}
