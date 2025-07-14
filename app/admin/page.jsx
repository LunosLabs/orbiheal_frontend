import Link from "next/link";

const adminLinks = [
  { href: "/admin/medicine/view", label: "View Medicines" },
  { href: "/admin/manufacturer/view", label: "View Manufacturers" },
  { href: "/admin/forms/view", label: "View Forms" },
  { href: "/admin/generics/view", label: "View Generics" },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center  text-gray-100">
      <div className="w-full max-w-3xl">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-primary mb-6">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {adminLinks.map((link) => (
            <AdminCardLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </div>
    </main>
  );
}

function AdminCardLink({ href, label }) {
  return (
    <Link
      href={href}
      className="
        group block rounded-lg border border-gray-700 bg-black 
        hover:border-blue-500 hover:bg-gray-900 transition-all duration-200
        shadow-sm
      "
    >
      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-base sm:text-lg font-medium text-gray-100 group-hover:text-blue-400 transition-colors">
          {label}
        </h2>
        <span className="text-xs text-gray-500 group-hover:text-blue-400 transition-colors">
          Go to page →
        </span>
      </div>
    </Link>
  );
}
