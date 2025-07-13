import Link from "next/link";

const adminLinks = [
  { href: "/admin/medicine/view", label: "View Medicines" },
  { href: "/admin/manufacturer/view", label: "View Manufacturers" },
  { href: "/admin/forms/view", label: "View Forms" },
  { href: "/admin/generics/view", label: "View Generics" },
];

export default function AdminPage() {
  return (
    <main className="flex flex-col items-center min-h-screen  text-gray-100 px-2 py-4">
      <h1 className="text-3xl font-semibold mb-8 text-gray-50 tracking-tight">
        Admin Dashboard
      </h1>
      <div className="grid gap-4 w-full max-w-md">
        {adminLinks.map((link) => (
          <AdminLink key={link.href} href={link.href} label={link.label} />
        ))}
      </div>
    </main>
  );
}

function AdminLink({ href, label }) {
  return (
    <Link
      href={href}
      className="block w-full rounded-md bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700 hover:border-blue-500 transition-all duration-200 ease-in-out shadow-sm px-4 py-2 text-sm font-medium text-gray-200 hover:text-blue-300"
    >
      {label}
    </Link>
  );
}