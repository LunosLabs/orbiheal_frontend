"use client";

import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function BaseFileUploadField({
  id,
  label,
  multiple = false,
  accept = "image/*",
  files = [],
  setFiles,
  error,
}) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
    setFiles(newFiles);
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>

      <input
        type="file"
        id={id}
        accept={accept}
        multiple={multiple}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Button type="button" variant="outline" onClick={triggerFileInput}>
        {multiple ? "Upload Files" : "Upload File"}
      </Button>

      {files.length > 0 && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, idx) => {
            const isImage = file.type.startsWith("image/");
            const previewURL = URL.createObjectURL(file);

            return (
              <div
                key={idx}
                className="relative border rounded-lg overflow-hidden shadow"
              >
                {isImage ? (
                  <img
                    src={previewURL}
                    alt={`preview-${idx}`}
                    className="object-cover w-full h-32"
                  />
                ) : (
                  <div className="p-4 text-sm truncate">{file.name}</div>
                )}
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                >
                  <X size={16} className="text-red-600" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
