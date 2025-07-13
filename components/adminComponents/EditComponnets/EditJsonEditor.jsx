"use client";

import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <Skeleton className="h-full w-full rounded-md" />,
});

export const EditJsonEditor = React.memo(function EditJsonEditor({
  code,
  onCodeChange,
  error,
  setError,
}) {
  const handleChange = useCallback(
    (value) => {
      const newValue = value ?? "";
      onCodeChange(newValue);
      try {
        if (newValue.trim()) {
          JSON.parse(newValue);
          setError("");
        } else {
          setError("JSON cannot be empty");
        }
      } catch {
        setError("Invalid JSON format");
      }
    },
    [onCodeChange, setError]
  );

  return (
    <div
      className={`
        relative w-full flex-1
        rounded-xl border-2
        ${error ? "border-red-600" : "border-gray-700 hover:border-primary focus-within:border-primary"}
        transition-colors duration-200
        shadow-sm
        overflow-hidden
      `}
      role="textbox"
      aria-label="JSON code editor"
      tabIndex={0}
      style={{ height: "100%", transition: "border 0.2s, box-shadow 0.2s" }}
    >
      <MonacoEditor
        defaultLanguage="json"
        value={code}
        theme="vs-dark"
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          lineNumbers: "off",
          folding: false,
          renderLineHighlight: "none",
          renderIndentGuides: false,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          padding: { top: 16, bottom: 16 },
          fontSize: 14,
          lineHeight: 22,
          fontFamily: "Fira Code, monospace",
          bracketPairColorization: { enabled: true },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
          cursorSmoothCaretAnimation: "on",
          mouseWheelZoom: true,
          formatOnPaste: true,
          formatOnType: true,
          overviewRulerBorder: false,
        }}
      />
    </div>
  );
});