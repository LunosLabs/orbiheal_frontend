import Link from "next/link";
import { notFound } from "next/navigation";
import EntityTable from "@/components/adminComponents/EntityTableComponents/EntityTable";
import { fetchEntityService } from "@/lib/services/adminServices/entitySevice";

export const revalidate = 300;

const entityApiKeys = {
  medicine: "medicine",
  manufacturer: "manufacturers",
  forms: "forms",
  generics: "generics",
  users: "users",
};

// Dynamically generate table columns
function inferColumns(data, entityType, page, pageSize = 10) {
  if (!data?.length) return [];

  const keys = Object.keys(data[0]).filter((key) => key !== "id");

  const columns = keys.map((key) => ({
    accessor: key,
    label: key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    render: (item) => {
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
        return item[key] ? (
          <a
            href={item[key]}
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
  }));

  return [
    {
      accessor: "__serial",
      label: "S.No.",
      render: (_, index) => (page - 1) * pageSize + index + 1,
    },
    ...columns,
  ];
}

export default async function EntityPage({ params, searchParams }) {
  const entityType = (await params)?.entityType ?? "";
  const pageParam = (await params)?.page ?? ""
  const page = parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam ?? "1", 10) || 1;

  const apiKey = entityApiKeys[entityType];
  if (!apiKey) notFound();

  let fetchedData = [];
  let pagination = { page, totalPages: 1, limit: 10 };
  let errorMessage = "";

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
    errorMessage = error?.message ?? "Unknown error.";
  }

  const columns = inferColumns(fetchedData, entityType, pagination.page, pagination.limit);

  return (
    <main className="min-h-screen w-full px-4 py-8 text-gray-100">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 capitalize text-blue-400 tracking-tight text-center">
        {entityType} List
      </h1>

      {errorMessage ? (
        <p className="text-center text-red-400 py-10">{errorMessage}</p>
      ) : fetchedData.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No {entityType} data available.
        </p>
      ) : (
        <>
          <EntityTable columns={columns} data={fetchedData} />

          <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
            {pagination.page > 1 && (
              <Link
                href={`/admin/${entityType}/view?page=${pagination.page - 1}`}
                className="px-4 py-2 border border-blue-600 rounded-lg text-blue-400 hover:bg-blue-800/30 transition"
              >
                Previous
              </Link>
            )}

            <span className="text-sm text-gray-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            {pagination.page < pagination.totalPages && (
              <Link
                href={`/admin/${entityType}/view?page=${pagination.page + 1}`}
                className="px-4 py-2 border border-blue-600 rounded-lg text-blue-400 hover:bg-blue-800/30 transition"
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
