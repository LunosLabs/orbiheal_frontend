import React from "react";
import { IndianRupee } from "lucide-react";

export default function PriceInfo({ medicine }) {
  const { min_price, max_price } = medicine || {};

  let priceContent;
  if (min_price != null && max_price != null) {
    priceContent =
      min_price === max_price ? (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-200 font-medium text-[15px] shadow-sm border border-emerald-700"
          aria-label={`Price: ₹${min_price}`}
        >
          <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
          {min_price}
        </span>
      ) : (
        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-200 font-medium text-[15px] shadow-sm border border-emerald-700"
          aria-label={`Price: ₹${min_price} to ₹${max_price}`}
        >
          <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
          {min_price} - {max_price}
        </span>
      );
  } else {
    priceContent = (
      <span className="inline-block px-2 py-0.5 rounded-full bg-neutral-900/80 text-neutral-400 font-normal text-[15px] border border-neutral-700">
        N/A
      </span>
    );
  }

  return (
    <div className="flex items-center gap-3 my-4">
      <span className="font-semibold tracking-wide text-blue-300">
        Price
      </span>
      {priceContent}
    </div>
  );
}
