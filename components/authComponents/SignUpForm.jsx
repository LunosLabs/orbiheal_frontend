"use client";

import React from "react";
import { Button } from "../ui/button";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/lib/services/authService";
import BaseInputField from "../fields/BaseInputField";
import PasswordInputField from "../fields/PasswordInputField";
import Link from "next/link";
import { signupSchema } from "@/lib/validation/auth";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    display_name: "",
    email: "",
    password: "",
  });
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
      signupSchema.parse(formData);
      await signUpUser(formData);
      router.push("/dashboard");
    } catch (err) {
      if (err.name === "ZodError") {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors(fieldErrors);
      } else {
        setErrors({
          general: err.message || "Signup failed. Please try again.",
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
          id="display_name"
          label="Name"
          value={formData.display_name}
          onChange={(val) => handleChange("display_name", val)}
          error={errors.display_name}
          placeholder="Enter your Name"
        />

        <BaseInputField
          id="email"
          label="Email"
          value={formData.email}
          onChange={(val) => handleChange("email", val)}
          error={errors.email}
          placeholder="Enter your email address"
          type="email"
        />

        <PasswordInputField
          id="password"
          label="Password"
          value={formData.password}
          onChange={(val) => handleChange("password", val)}
          error={errors.password}
          placeholder="Create strong password"
          type="password"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Craeting Account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </>
  );
};

