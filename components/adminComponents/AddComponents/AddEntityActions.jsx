"use client";

import { Button } from "@/components/ui/button";
import { EllipsisSpinner } from "@/components/fields/EllipsisSpinner";
import { SparklesIcon } from "lucide-react";

export default function AddEntityActions({
  loading,
  hasChanges,
  handleSave,
  handleAutofill,
}) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button
        onClick={handleAutofill}
        type="button"
        className="flex items-center gap-2 rounded-lg border border-primary bg-transparent px-4 text-sm font-medium text-primary hover:bg-primary/20"
        disabled={loading}
      >
        <SparklesIcon className="h-5 w-5" />
        Autofill
      </Button>
      <Button
        onClick={handleSave}
        disabled={loading || !hasChanges}
        className="h-10 rounded-lg bg-primary px-5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50"
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
  );
}
