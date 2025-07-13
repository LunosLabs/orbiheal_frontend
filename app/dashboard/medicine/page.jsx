"use client";

import React, { useEffect, useState } from "react";
import { Search, PackageSearch, Frown } from "lucide-react";
import SearchMedicine from "@/components/publicComponents/SearchPackComponents/SearchMedicine";
import { EllipsisSpinner } from "@/components/fields/EllipsisSpinner";

export default function MedicinesPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce logic
  useEffect(() => {
    if (search.trim().length < 2) {
      setDebouncedSearch("");
      setData([]);
      return;
    }
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch logic
  useEffect(() => {
    if (debouncedSearch.length < 2) return;
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_API_URL
          }/medicine/search?query=${encodeURIComponent(debouncedSearch)}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          setData([]);
          return;
        }
        const result = await res.json();
        setData(result.medicines || []);
      } catch (error) {
        if (error.name !== "AbortError") setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [debouncedSearch]);

  return (
    <section className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Header with Modern Search Bar */}
      <div className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur border-b border-neutral-800 shadow-sm">
        <div className="max-w-4xl mx-auto sm:px-6 md:px-8 py-2">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-neutral-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search medicines or generics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
          w-full pl-10 pr-4 py-2 rounded-xl
          bg-neutral-900 border border-neutral-700
          placeholder:text-neutral-500
          text-sm sm:text-base
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          transition
          shadow-sm hover:border-blue-400/40
        "
              aria-label="Search medicines"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 w-full max-w-7xl mx-auto py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <EllipsisSpinner size={44} color="#3b82f6" />
            <span className="mt-3 text-blue-400 text-base font-medium">
              Searching...
            </span>
          </div>
        ) : data.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.map((med) => (
              <SearchMedicine key={med.id} med={med} />
            ))}
          </div>
        ) : debouncedSearch.length >= 2 ? (
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
      </div>
    </section>
  );
}
