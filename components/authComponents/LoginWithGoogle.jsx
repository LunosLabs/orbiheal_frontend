"use client";

import supabase from "@/utils/supabase/client";
import { Button } from "../ui/button";
import Image from "next/image";

export const LoginWithGoogle = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google Login Error:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outline"
      className="w-full flex items-center justify-center gap-3 mt-2 bg-white/5 backdrop-blur-sm border-white/10"
    >
      <Image
        src="/google_icon.svg"
        alt="Google Logo"
        width={22}
        height={22}
        className="object-contain"
      />
      <span className="font-medium text-sm">Continue with Google</span>
    </Button>
  );
};
