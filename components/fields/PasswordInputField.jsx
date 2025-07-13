"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInputField({ id, label, value, onChange, error, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`pr-10 ${error ? "border border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
