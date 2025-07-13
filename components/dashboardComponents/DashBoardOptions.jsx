import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ScanBarcode } from "lucide-react";

const DashBoardOptions = () => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-sm">
      {/* Search Medicine */}
      <Link href="/dashboard/medicine" className="group">
        <Card className="bg-gradient-to-br from-blue-800/60 to-indigo-700/30 rounded-xl shadow-sm hover:shadow-md transition hover:scale-[1.03]">
          <CardContent className="flex flex-col justify-between items-center h-28 p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700/30 group-hover:bg-blue-600/50 transition-colors mb-2">
              <Search className="h-5 w-5 text-blue-200 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="text-center">
              <span className="block text-sm font-semibold text-white">Search</span>
              <span className="block text-xs text-blue-100 leading-tight">
                Find medicines
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Scan Prescription */}
      <Link href="/dashboard/scan" className="group">
        <Card className="bg-gradient-to-br from-emerald-800/60 to-green-700/30 rounded-xl shadow-sm hover:shadow-md transition hover:scale-[1.03]">
          <CardContent className="flex flex-col justify-between items-center h-28 p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-700/30 group-hover:bg-emerald-600/50 transition-colors mb-2">
              <ScanBarcode className="h-5 w-5 text-emerald-200 group-hover:text-emerald-300 transition-colors" />
            </div>
            <div className="text-center">
              <span className="block text-sm font-semibold text-white">Scan</span>
              <span className="block text-xs text-emerald-100 leading-tight">
                Scan prescription
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default DashBoardOptions;
