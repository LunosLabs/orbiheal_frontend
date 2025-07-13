"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function UploadedImagePreview({
  imageSrc,
  onClear,
  onSubmit,
  setErrorMsg,
  errorMsg,
}) {
  return (
    <div className="w-full max-w-xs flex flex-col items-center">
      <Card className="bg-neutral-900 p-2 shadow-lg rounded-xl border border-neutral-800 w-full">
        <CardContent className="flex items-center justify-center p-0">
          <div className="w-full h-64 flex items-center justify-center rounded-md overflow-hidden bg-neutral-800">
            <img
              src={imageSrc}
              alt="Uploaded prescription"
              className="object-contain w-full h-full"
              style={{
                background: "#18181b",
                borderRadius: "0.5rem",
                maxHeight: "16rem",
                maxWidth: "100%",
              }}
              onError={() => {
                setErrorMsg("Image could not be loaded. Please try another file.");
                onClear();
              }}
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-2 mt-3 w-full">
        <Button onClick={onClear} className="flex-1 text-xs py-1" variant="outline" size="sm">
          Clear
        </Button>
        <Button onClick={onSubmit} className="flex-1 text-xs py-1" variant="default" size="sm">
          Submit
        </Button>
      </div>
      <p className="text-xs text-neutral-400 mt-3 text-center w-full">
        <CheckCircle className="inline mr-1 text-green-400" size={14} />
        Tip: Ensure the prescription is well-lit, in focus, and all corners are visible.
      </p>
      {errorMsg && (
        <p className="text-xs text-red-500 mt-1 text-center w-full">{errorMsg}</p>
      )}
    </div>
  );
}
