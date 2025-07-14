"use client";

import React, { useState, useCallback } from "react";
import EditEntityActions from "./EditEntityActions";
import { getChangedFields } from "./GetChangedFields";
import { schemas } from "@/lib/entityConfig";
import { JsonEditor } from "../JsonEditor";

export default function EditEntityEditor({ entityType, id, entityData }) {
  if (!entityType) {
    throw new Error("EditEntityEditor: entityType prop is required");
  }

  const schema = schemas[entityType];
  if (!schema) {
    throw new Error(`EditEntityEditor: Unknown schema for "${entityType}"`);
  }

  const [code, setCode] = useState(JSON.stringify(entityData, null, 2));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = useCallback((setter, msg) => {
    setter(msg);
    setTimeout(() => setter(""), 4000);
  }, []);

  const handleSave = useCallback(async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const parsedData = JSON.parse(code);
      const changes = getChangedFields(parsedData, entityData);

      if (Object.keys(changes).length === 0) {
        showMessage(setError, "No changes to save.");
        return;
      }

      // TODO: Actually send 'changes' to your backend here
      console.log("Updating fields:", changes);

      showMessage(setSuccess, `Successfully updated ${entityType}.`);
    } catch (err) {
      showMessage(
        setError,
        err instanceof SyntaxError
          ? "Invalid JSON syntax. Please fix the errors."
          : err?.message || "Failed to update entity."
      );
    } finally {
      setLoading(false);
    }
  }, [entityType, code, entityData, showMessage, loading]);

  const isChanged = (() => {
    try {
      return JSON.stringify(JSON.parse(code)) !== JSON.stringify(entityData);
    } catch {
      return false;
    }
  })();

  return (
    <div className="mx-auto w-full max-w-5xl flex flex-col gap-4 rounded-lg shadow-xl">
      {(error || success) && (
        <div className="flex flex-wrap justify-center gap-2">
          {error && (
            <p className="rounded-lg border border-red-600 bg-red-900/50 px-4 py-2 text-sm font-semibold text-red-400 shadow-md">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-lg border border-green-600 bg-green-900/50 px-4 py-2 text-sm font-semibold text-green-400 shadow-md">
              {success}
            </p>
          )}
        </div>
      )}

      <div className="flex h-[80vh] sm:h-[85vh] flex-col overflow-hidden rounded-lg shadow-inner">
        <JsonEditor
          code={code}
          onCodeChange={setCode}
          error={error}
          setError={setError}
        />

        <div className="flex justify-end p-4">
          <EditEntityActions
            loading={loading}
            hasChanges={isChanged}
            handleSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
