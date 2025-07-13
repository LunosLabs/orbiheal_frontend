"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function UploadButton({
  onClick,
  onFileChange,
  fileInputRef,
  errorMsg,
}) {
  return (
    <div className="w-full max-w-xs space-y-1">
      <div className="flex flex-col items-center justify-center rounded-lg py-2">
        <Button
          onClick={onClick}
          className="w-full text-sm font-medium"
          variant="default"
          size="sm"
          aria-label="Upload Prescription Image"
        >
          Upload Prescription Image
        </Button>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          className="hidden"
          onChange={onFileChange}
          aria-label="Choose prescription image"
        />
        <p className="text-center text-neutral-500 text-xs mt-2">
          Accepted: <span className="font-medium">JPG, PNG</span>
        </p>
        {errorMsg && (
          <p className="text-xs text-red-500 mt-1 text-center">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
