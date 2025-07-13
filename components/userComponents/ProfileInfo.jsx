// components/userComponents/ProfileInfo.tsx

"use client";

import { useEffect, useState } from "react";
import useAuthStore from "@/app/store/userAuthStore";

export default function ProfileInfo() {
  const { displayName, email } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  // Detect hydration (so we don't show blank initially)
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="p-4">
        <p className="text-neutral-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <section
      className="
        w-full max-w-lg
        flex flex-col gap-4 py-4
        mx-auto
        lg:mx-0 lg:ml-16
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            w-12 h-12
            rounded-full
            bg-blue-900/40
            flex items-center justify-center
            text-blue-300 text-lg font-semibold
            shadow-sm
          "
        >
          {displayName ? displayName.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-semibold text-blue-100">
            {displayName || "User"}
          </span>
          <span className="text-neutral-400 text-sm">{email || "No email"}</span>
        </div>
      </div>
    </section>
  );
}
