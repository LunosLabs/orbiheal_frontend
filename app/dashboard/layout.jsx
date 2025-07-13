import React from "react";

export default function MedicinesLayout({ children }) {
  return (
    <div className="flex flex-1 overflow-x-hidden overflow-y-auto ">
      <main className="flex-1 h-full overflow-y-auto px-4 sm:px-6 md:px-8 pb-8">
        {children}
      </main>
    </div>
  );
}
