import { notFound } from "next/navigation";
import Link from "next/link";
import EditEntityEditor from "@/components/adminComponents/EditComponnets/EditEntityEditor";
import { schemas } from "@/lib/entityConfig";
import { fetchEntityByIdService } from "@/lib/services/adminServices/entitySevice";

export const revalidate = 300; // Revalidate every 5 minutes

async function fetchEntityById(entityType, id) {
  try {
    const result = await fetchEntityByIdService(entityType, id);    
    if (!result) throw new Error("No data found");
    return result;
  } catch (error) {
    return null;
  }
}

export default async function AdminEntityEditPage({ params }) {
  const { entityType = "", id = "" } = (await params) ?? {};

  // Validate entityType and id
  if (
    !entityType ||
    !id ||
    typeof id !== "string" ||
    !/^[a-z0-9-]+$/.test(id)
  ) {
    notFound();
  }

  // Fetch entity data and config
  const entityData = await fetchEntityById(entityType, id);
  
  const entityConfig = schemas[entityType];

  // Check if data and config exist
  if (!entityData || !entityConfig) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between py-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Edit <span className="text-primary">{entityType}</span>
        </h1>
        <Link
          href={`/admin/${entityType}/view`}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary transition hover:underline"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          Back
        </Link>
      </header>
      <section className="mx-auto w-full max-w-3xl">
        <EditEntityEditor
          id={id}
          entityType={entityType}
          entityData={entityData}
        />
      </section>
    </main>
  );
}