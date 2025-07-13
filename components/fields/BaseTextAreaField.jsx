"use client";

import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

function BaseTextAreaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  height = "h-32",
}) {
  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`pr-10 ${height} ${
            error ? "border border-red-500 focus-visible:ring-red-500" : ""
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default BaseTextAreaField;
