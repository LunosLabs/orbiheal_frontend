import { notFound } from "next/navigation";
import Link from "next/link";
import EditEntityEditor from "@/components/adminComponents/EditComponnets/EditEntityEditor";
import { schemas } from "@/lib/entityConfig";
import { fetchEntityByIdService } from "@/lib/services/adminServices/entitySevice";

export const revalidate = 300;

export default async function AdminEntityEditPage({ params }) {
  const id = (await params)?.id ?? "";
  const entityType = (await params)?.entityType ?? ""

  if (!entityType || !id || typeof id !== "string" || !/^[a-z0-9-]+$/.test(id)) {
    notFound();
  }

  const entityConfig = schemas[entityType];
  if (!entityConfig) notFound();

  const entityData = await fetchEntityByIdService(entityType, id);

  return (
    <main className="min-h-screen p-2 sm:p-4 md:p-6">
      <header className="mx-auto max-w-4xl flex justify-between items-center py-3">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Edit <span className="text-primary">{entityType}</span>
        </h1>
        <Link
          href={`/admin/${entityType}/view`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Back
        </Link>
      </header>
      <section className="mx-auto w-full max-w-6xl">
        <EditEntityEditor
          id={id}
          entityType={entityType}
          entityData={entityData}
        />
      </section>
    </main>
  );
}
