// page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import AddEntityEditor from "@/components/adminComponents/AddComponents/AddEntityEditor";
import { schemas } from "@/lib/entityConfig";

export const revalidate = 300;

export default async function AdminEntityAddPage({ params }) {
  const entityType = (await params)?.entityType ?? "";

  if (!entityType || typeof entityType !== "string") notFound();
  const entityConfig = schemas[entityType];
  if (!entityConfig) notFound();

  return (
    <main className="min-h-screen p-2 sm:p-4 md:p-6">
      <header className="mx-auto max-w-4xl flex justify-between items-center py-3">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Add <span className="text-primary">{entityType}</span>
        </h1>
        <Link
          href="/dashboard"
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
        <AddEntityEditor
          entityType={entityType}
          initialData={entityConfig.defaults}
          keyOrder={entityConfig.keyOrder}
        />
      </section>
    </main>
  );
}
