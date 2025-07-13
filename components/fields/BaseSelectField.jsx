"use client";

import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export default function BaseSelectField({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error,
}) {
  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={(val) => onChange(val)}>
        <SelectTrigger
          id={id}
          className={
            error ? "border border-red-500 focus-visible:ring-red-500 w-full" : "w-full"
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-500 text-xs mt-1" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
