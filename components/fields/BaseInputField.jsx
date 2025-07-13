"use client";

import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function BaseInputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  suggestions = [],
}) {
  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          list={suggestions.length > 0 ? `${id}-suggestions` : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`pr-10 ${error ? "border border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        {suggestions.length > 0 && (
          <datalist id={`${id}-suggestions`}>
            {suggestions.map((option, idx) => (
              <option key={idx} value={option} />
            ))}
          </datalist>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}