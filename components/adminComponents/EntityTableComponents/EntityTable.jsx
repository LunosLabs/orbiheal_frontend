import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EntityTable({ columns = [], data = [] }) {
  return (
    <div className="rounded-xl border border-neutral-700 overflow-x-auto bg-neutral-900 shadow-lg">
      <Table className="text-white text-sm table-auto w-full">
        <TableHeader className="bg-neutral-800/50">
          <TableRow className="border-b border-neutral-700">
            {columns.map((col) => (
              <TableHead
                key={col.accessor}
                className="text-neutral-300 font-semibold py-3 sm:px-4 px-2 whitespace-nowrap"
                style={{ width: col.width || "auto" }}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-neutral-500 py-8"
              >
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, rowIndex) => (
              <TableRow
                key={item.id || rowIndex}
                className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.accessor}
                    className="py-3 sm:px-4 px-2 whitespace-nowrap max-w-[240px] overflow-hidden text-ellipsis"
                  >
                    {col.render
                      ? col.render(item, rowIndex)
                      : safeRenderCell(item[col.accessor])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function safeRenderCell(value) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "[object]";
    }
  }
  return String(value);
}
