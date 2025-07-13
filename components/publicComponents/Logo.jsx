"use client";

import React from "react";

export const Logo = ({ size = "sm", className = "" }) => {
  const sizeClasses = {
    xs: "text-lg sm:text-xl",
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
    xl: "text-4xl sm:text-5xl",
  };

  return (
    <span
      className={`
        inline-block font-extrabold tracking-tight text-transparent 
        bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600
        animate-logo-glow ${sizeClasses[size]} ${className}
        drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]
      `}
    >
      OrbiHeal
    </span>
  );
};

export default Logo;
