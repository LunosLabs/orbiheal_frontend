"use client";

import React, { useCallback } from "react";
import MonacoEditor from "@monaco-editor/react";

export const JsonEditor = React.memo(function AddJsonEditor({
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
        JSON.parse(newValue || "{}");
        setError("");
      } catch {
        setError("Invalid JSON format");
      }
    },
    [onCodeChange, setError]
  );

  return (
    <div
      className={`relative flex-1 rounded-lg border-2 overflow-hidden shadow-sm transition-colors duration-200 ${
        error
          ? "border-red-600"
          : "border-gray-700 hover:border-primary focus-within:border-primary"
      }`}
      role="textbox"
      aria-label="JSON code editor"
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
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          padding: { top: 12, bottom: 12 },
          fontSize: 16,
          lineHeight: 24,
          fontFamily: "'Fira Code', monospace",
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
          cursorSmoothCaretAnimation: "on",
          formatOnPaste: true,
          formatOnType: true,
          overviewRulerBorder: false,
        }}
      />
    </div>
  );
});
