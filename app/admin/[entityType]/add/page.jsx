import { notFound } from "next/navigation";
import AddEntityEditor from "@/components/adminComponents/AddComponnets/AddEntityEditor";
import { schemas } from "@/lib/entityConfig";
import Link from "next/link";

export const revalidate = 300; 

export default async function AdminEntityAddPage({ params }) {
  const { entityType = "" } = (await params) ?? {};

  // Validate entityType
  if (!entityType || typeof entityType !== "string") {
    notFound();
  }

  // Check if entityConfig exists
  const entityConfig = schemas[entityType];
  if (!entityConfig) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col gap-y-4 p-4 sm:p-6">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between py-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Add <span className="text-primary">{entityType}</span>
        </h1>
        <Link
          href="/dashboard"
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
      <section className="mx-auto w-full max-w-4xl">
        <AddEntityEditor
          entityType={entityType}
          initialData={{ ...entityConfig.defaults }}
          keyOrder={entityConfig.keyOrder}
        />
      </section>
    </main>
  );
}