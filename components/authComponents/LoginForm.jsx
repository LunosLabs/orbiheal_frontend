"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/services/authService";
import { loginSchema } from "@/lib/validation/auth";
import BaseInputField from "../fields/BaseInputField";
import PasswordInputField from "../fields/PasswordInputField";

export const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef(null);

  // Clear errors after 3s
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setErrors({}), 2000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [errors]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      loginSchema.parse(formData);
      await loginUser(formData);
      router.push("/dashboard");
    } catch (err) {
      if (err.name === "ZodError") {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors(fieldErrors);
      } else {
        setErrors({
          general: err.message || "Login failed. Please try again.",
        });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errors.general && (
        <p className="text-red-500 text-sm text-center bg-red-900/30 rounded-md px-4 py-2">
          {errors.general}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <BaseInputField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          error={errors.email}
          placeholder="Enter your email address"
        />

        <PasswordInputField
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleChange("password", value)}
          error={errors.password}
          placeholder="Enter your password"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Logging in...
            </span>
          ) : (
            "Log in"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
};
