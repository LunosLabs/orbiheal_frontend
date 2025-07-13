import { AlertTriangle } from "lucide-react";

export default function UnderDevelopmentPage() {
  return (
    <div className="w-full max-w-lg mx-auto my-2">
      <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm p-4">
        <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
        <div className="text-sm text-yellow-800">
          <p className="font-semibold">Page Under Development</p>
          <p className="text-yellow-700">
            This section is currently in active development and testing. Full functionality will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
}
