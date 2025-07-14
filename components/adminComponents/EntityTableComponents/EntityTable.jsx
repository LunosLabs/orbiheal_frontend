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
    <div className="rounded-xl border border-neutral-800 overflow-x-auto shadow-md bg-neutral-900">
      <Table className="w-full table-auto text-sm text-gray-200">
        <TableHeader className="bg-neutral-950">
          <TableRow className="border-b border-neutral-800">
            {columns.map((col) => (
              <TableHead
                key={col.accessor}
                className="py-3 px-3 sm:px-5 text-blue-400 font-semibold text-xs sm:text-sm uppercase whitespace-nowrap"
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
                className="text-center text-neutral-500 py-10"
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
                    className="py-3 px-3 sm:px-5 whitespace-nowrap max-w-[280px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
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
