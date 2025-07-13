"use client";

import { Button } from "@/components/ui/button";
import { EllipsisSpinner } from "@/components/fields/EllipsisSpinner";
import { SparklesIcon } from "lucide-react";

export default function AddEntityActions({ loading, hasChanges, handleSave, handleAutofill }) {
  return (
    <div className="w-full flex flex-col gap-2 text-sm">
      <div className="flex justify-end gap-3">
        <Button
          onClick={handleAutofill}
          type="button"
          className="h-9 px-4 text-sm border border-primary text-primary bg-transparent hover:bg-primary/25 transition flex items-center gap-2 rounded-md font-medium"
        >
          <SparklesIcon className="w-5 h-5" />
          Autofill
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading || !hasChanges}
          className="h-9 px-5 text-sm bg-primary font-semibold rounded-md shadow-md hover:scale-105 transition-transform duration-150 flex items-center justify-center gap-2"
          aria-busy={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <EllipsisSpinner size={16} color="#fff" />
              Creating...
            </span>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
}