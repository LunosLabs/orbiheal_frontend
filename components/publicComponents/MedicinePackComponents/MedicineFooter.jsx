import React from "react";
import { formatDate } from "@/utils/formatDate";

const MedicineFooter = ({ last_reviewed }) => (
  <footer className="w-full text-center text-xs pt-6 px-4">
    <p className="font-semibold text-gray-700 tracking-wide">
      Sourced from certified medical databases
    </p>
    <p className="mt-1 text-gray-600">
      Verified & updated:{" "}
      <time dateTime={last_reviewed} className="text-gray-800 font-medium">
        {formatDate(last_reviewed)}
      </time>
    </p>
    <p className="mt-3 text-gray-500">
      © {new Date().getFullYear()}{" "}
      <span className="font-semibold text-gray-700">MediTrust</span>
    </p>
  </footer>
);

export default MedicineFooter;
