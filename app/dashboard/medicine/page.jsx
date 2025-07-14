"use client";

import React, { useEffect, useState } from "react";
import { Search, PackageSearch, Frown } from "lucide-react";
import SearchMedicine from "@/components/publicComponents/SearchPackComponents/SearchMedicine";
import { EllipsisSpinner } from "@/components/fields/EllipsisSpinner";

export default function MedicinesPage() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce input
  useEffect(() => {
    if (inputValue.trim().length < 2) {
      setQuery("");
      setResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      setQuery(inputValue.trim());
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  // Fetch data when query changes
  useEffect(() => {
    if (query.length < 2) return;

    const controller = new AbortController();
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/medicine/search?query=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setResults(data?.medicines ?? []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search error:", error);
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
    return () => controller.abort();
  }, [query]);

  return (
    <section className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Sticky Header Search Bar */}
      <header className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur border-b border-neutral-800 shadow-sm">
        <div className="max-w-4xl mx-auto sm:px-6 md:px-8 py-2">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-neutral-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search medicines or generics..."
              className="
                w-full pl-10 pr-4 py-2 rounded-xl
                bg-neutral-900 border border-neutral-700
                placeholder:text-neutral-500
                text-sm sm:text-base
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                transition shadow-sm hover:border-blue-400/40
              "
              aria-label="Search medicines"
              autoFocus
            />
          </div>
        </div>
      </header>

      {/* Results Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <EllipsisSpinner size={44} color="#3b82f6" />
            <span className="mt-3 text-blue-400 text-base font-medium">
              Searching...
            </span>
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map((medicine) => (
              <SearchMedicine key={medicine.id} med={medicine} />
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-neutral-500">
            <Frown className="w-12 h-12 text-blue-500 opacity-70 mb-3" />
            <span className="text-base font-medium">No medicines found</span>
            <span className="text-xs mt-1 text-neutral-400">
              Try a different name or spelling.
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-neutral-600">
            <PackageSearch className="w-12 h-12 opacity-50 mb-3" />
            <span className="text-sm text-neutral-400">
              Start typing to search for medicines.
            </span>
          </div>
        )}
      </main>
    </section>
  );
}
