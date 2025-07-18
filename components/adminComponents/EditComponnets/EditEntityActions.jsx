"use client";

import { Button } from "@/components/ui/button";
import { EllipsisSpinner } from "@/components/fields/EllipsisSpinner";

export default function EditEntityActions({
  loading,
  hasChanges,
  handleSave,
}) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Button
        onClick={handleSave}
        disabled={loading || !hasChanges}
        className="h-10 rounded-lg bg-primary px-5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <EllipsisSpinner size={16} color="#fff" />
            Saving...
          </span>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );
}
