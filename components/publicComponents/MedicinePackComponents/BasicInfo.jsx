import Link from "next/link";

export default function BasicInfo({ medicine, form, manufacturer }) {
  if (!medicine) return null;

  const { strength, regulatory_status } = medicine || {};

  const getStatusBadge = (status) => {
    const base = "uppercase font-bold px-2 py-0.5 rounded text-xs ring-1";
    switch (status) {
      case "otc":
        return `${base} text-emerald-300 ring-emerald-400`;
      case "prescription":
        return `${base} text-yellow-300 ring-yellow-300`;
      case "fda_approved":
        return `${base} text-blue-300 ring-blue-300`;
      case "ema_approved":
        return `${base} text-indigo-300 ring-indigo-300`;
      case "under_review":
        return `${base} text-orange-300 ring-orange-300`;
      case "not_approved":
        return `${base} text-red-300 ring-red-300`;
      case "other":
      default:
        return `${base} text-gray-300 ring-neutral-700`;
    }
  };

  return (
    <section className="space-y-1 text-[15px]">
      {/* Strength */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-blue-300 min-w-[120px]">Strength:</span>
        <span className="text-white">
          {strength || <span className="text-neutral-400">Unknown</span>}
        </span>
      </div>

      {/* Form */}
      <div className="flex items-center gap-4 capitalize">
        <span className="font-semibold text-blue-300 min-w-[120px]">Form:</span>
        <span className="text-white">
          {form?.name || <span className="text-neutral-400">Unknown</span>}
        </span>
      </div>

      {/* Manufacturer Name as Plain Text */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-blue-300 min-w-[120px]">Manufacturer:</span>
        <span className="text-white font-medium">
          {manufacturer?.name || <span className="text-neutral-400">Unknown</span>}
        </span>
      </div>

      {/* Regulatory Status */}
      <div className="flex items-center gap-4">
        <span className="font-semibold text-blue-300 min-w-[120px]">
          Regulatory Status:
        </span>
        <span className={getStatusBadge(regulatory_status)}>
          {regulatory_status || "Unknown"}
        </span>
      </div>
    </section>
  );
}
