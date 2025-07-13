// app/admin/[entityType]/view/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import EntityTable from "@/components/adminComponents/EntityTableComponents/EntityTable";
import { fetchEntityService } from "@/lib/services/adminServices/entitySevice";

export const revalidate = 300;

const entityApiKeys = {
  medicine: "medicines",
  manufacturer: "manufacturers",
  forms: "forms",
  generics: "generics",
  users: "users",
};

// Dynamically build columns from data
function inferColumns(data, entityType, page, pageSize = 10) {
  if (!data || data.length === 0) return [];

  const keys = Object.keys(data[0]);

  // Dynamically map columns except id (used only for link)
  const columns = keys
    .filter((key) => key !== "id")
    .map((key) => {
      return {
        accessor: key,
        label: key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        render: (item) => {
          // Always link using item.id, even if this column isn't "name"
          if (key === "name" || key === "brand_name") {
            return item.id ? (
              <Link
                href={`/admin/${entityType}/${item.id}`}
                className="text-blue-400 hover:underline"
              >
                {item[key] ?? "-"}
              </Link>
            ) : (
              item[key] ?? "-"
            );
          }

          if (key === "website_url") {
            return item.website_url ? (
              <a
                href={item.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Website
              </a>
            ) : (
              "-"
            );
          }

          return item[key] ?? "-";
        },
      };
    });

  // Add Serial Number column at start
  return [
    {
      accessor: "__serial",
      label: "S.No.",
      render: (_, index) => (page - 1) * pageSize + index + 1,
    },
    ...columns,
  ];
}



export default async function EntityPage({
  params,
  searchParams,
}) {
  // Await both params and searchParams
  const entityType = (await params)?.entityType ?? "";
  const pageParam = (await searchParams)?.page;
  const page = parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam ?? "1", 10) || 1;

  const apiKey = entityApiKeys[entityType];

  if (!apiKey) {
    notFound();
  }

  let fetchedData = [];
  let pagination = {
    page,
    totalPages: 1,
    limit: 10,
  };
  let errorMessage;

  try {
    const result = await fetchEntityService(entityType, page);

  
    if (!result || !result[apiKey]) {
      throw new Error(`No ${entityType} data found.`);
    }

    fetchedData = result[apiKey];
    pagination = {
      page: result.page,
      totalPages: result.totalPages,
      limit: result.limit || 10,
    };
  } catch (error) {
    errorMessage = error.message ?? "Unknown error.";
  }


  // Build columns
  const columns = inferColumns(fetchedData, entityType, page, pagination.limit);

  return (
    <main className="min-h-screen bg-[#0f0f11] text-gray-100 px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 capitalize text-gray-50 tracking-tight">
        {entityType} List
      </h1>

      {errorMessage && (
        <div className="text-center text-red-400 py-10">
          Error: {errorMessage}
        </div>
      )}

      {!errorMessage && fetchedData?.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          No {entityType} data available.
        </div>
      )}

      {!errorMessage && fetchedData?.length > 0 && (
        <>
          <EntityTable columns={columns} data={fetchedData} />

          <div className="flex justify-center items-center gap-4 mt-6">
            {pagination.page > 1 && (
              <Link
                href={`/admin/${entityType}/view?page=${pagination.page - 1}`}
                className="px-3 py-2 border border-blue-700 rounded hover:bg-blue-800/50 transition"
              >
                Previous
              </Link>
            )}
            <span className="text-gray-400 text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            {pagination.page < pagination.totalPages && (
              <Link
                href={`/admin/${entityType}/view?page=${pagination.page + 1}`}
                className="px-3 py-2 border border-blue-700 rounded hover:bg-blue-800/50 transition"
              >
                Next
              </Link>
            )}
          </div>
        </>
      )}
    </main>
  );
}
