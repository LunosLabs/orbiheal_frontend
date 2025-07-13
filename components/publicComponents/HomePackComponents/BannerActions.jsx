// BannerActions.js
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BannerActions() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full mt-2">
      <Button
        asChild
        size="lg"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition-all py-3 text-base tracking-wide"
      >
        <Link href="/auth/signup" aria-label="Sign up for OrbiHeal">
          Get Started
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="flex-1 border-zinc-700 text-zinc-300 hover:text-blue-400 hover:border-blue-400 bg-transparent rounded-full py-3 text-base tracking-wide"
      >
        <Link href="/auth/login" aria-label="Already have an account? Log in">
          Log in
        </Link>
      </Button>
    </div>
  );
}
