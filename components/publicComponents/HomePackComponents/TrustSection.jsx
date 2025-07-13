import Link from "next/link";

export default function TrustSection() {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 mt-14 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        Your Health, Our Promise
      </h2>
      <p className="text-base sm:text-lg text-zinc-300 mb-6">
        OrbiHeal is committed to providing <span className="text-blue-400 font-semibold">authentic</span> and <span className="text-blue-400 font-semibold">secure</span> medicine information.  
        We use advanced encryption and work only with verified partners.  
        Your privacy and safety are always protected—no compromises.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
        <div className="flex flex-col items-center">
          <span className="text-blue-400 text-lg font-bold">100%</span>
          <span className="text-xs text-zinc-400">Data Encryption</span>
        </div>
        <div className="h-6 w-px bg-zinc-800 hidden sm:block" />
        <div className="flex flex-col items-center">
          <span className="text-blue-400 text-lg font-bold">Verified</span>
          <span className="text-xs text-zinc-400">Source Partners</span>
        </div>
        <div className="h-6 w-px bg-zinc-800 hidden sm:block" />
        <div className="flex flex-col items-center">
          <span className="text-blue-400 text-lg font-bold">Private</span>
          <span className="text-xs text-zinc-400">No Data Sold</span>
        </div>
      </div>
      <p className="text-xs text-zinc-500">
        Learn more about our commitment to your safety on our{" "}
        <Link
          href="/about"
          className="text-blue-400 underline underline-offset-4 hover:text-white transition"
        >
          About page
        </Link>
        .
      </p>
    </section>
  );
}
