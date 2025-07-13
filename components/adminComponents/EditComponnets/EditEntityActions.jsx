"use client";

import { Button } from "@/components/ui/button";
import { EllipsisSpinner } from "@/components/fields/EllipsisSpinner";

export default function EditEntityActions({
  loading,
  hasChanges,
  changedFields = [],
  handleSave,
}) {
  return (
    <div className="w-full flex flex-col gap-2 text-sm">
      {hasChanges && changedFields.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
          <p className="truncate text-gray-400">
            Fields to be updated:{" "}
            <span className="text-gray-200 font-medium">
              {changedFields.join(", ")}
            </span>
          </p>
        </div>
      )}
      <div className="flex justify-end gap-3">
        <Button
          onClick={handleSave}
          disabled={loading || !hasChanges}
          className="h-9 px-5 text-sm bg-primary font-semibold rounded-md shadow-md hover:scale-105 transition-transform duration-150 flex items-center justify-center gap-2"
          aria-busy={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <EllipsisSpinner size={16} color="#fff" />
              Saving...
            </span>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}