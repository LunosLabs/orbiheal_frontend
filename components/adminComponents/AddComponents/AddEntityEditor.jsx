"use client";

import React, { useState, useCallback } from "react";
import AddEntityActions from "./AddEntityActions";
import {
  postEntityData,
  autoFillEntityService,
} from "@/lib/services/adminServices/entitySevice";
import { schemas } from "@/lib/entityConfig";
import { JsonEditor } from "../JsonEditor";

export default function AddEntityEditor({ entityType }) {
  if (!entityType) {
    throw new Error("AddEntityEditor: entityType prop is required");
  }

  const schema = schemas[entityType];
  if (!schema) {
    throw new Error(`AddEntityEditor: Unknown schema for "${entityType}"`);
  }

  const [code, setCode] = useState(JSON.stringify(schema.defaults, null, 2));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = useCallback((setter, msg) => {
    setter(msg);
    setTimeout(() => setter(""), 4000);
  }, []);

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;

      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const parsedData = JSON.parse(code);
        await postEntityData(entityType, parsedData);
        showMessage(setSuccess, `Successfully added ${entityType}.`);
        setCode(JSON.stringify(schema.defaults, null, 2));
      } catch (err) {
        console.error(err);
        showMessage(
          setError,
          err instanceof SyntaxError
            ? "Invalid JSON syntax. Please fix the errors."
            : err?.message || "Failed to save entity."
        );
      } finally {
        setLoading(false);
      }
    },
    [entityType, code, schema.defaults, showMessage, loading]
  );

  const handleAutofill = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const parsed = JSON.parse(code);
      const result = await autoFillEntityService(entityType, parsed);
      setCode(JSON.stringify(result, null, 2));
      showMessage(setSuccess, "Fields autofilled successfully.");
    } catch (err) {
      console.error(err);
      const message =
        err instanceof SyntaxError
          ? "Invalid JSON. Please fix before autofilling."
          : err?.message || "Autofill failed. Try again.";
      showMessage(setError, message);
    } finally {
      setLoading(false);
    }
  }, [code, showMessage, loading, entityType]);

  const isChanged = (() => {
    try {
      return (
        JSON.stringify(JSON.parse(code)) !== JSON.stringify(schema.defaults)
      );
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
          <AddEntityActions
            loading={loading}
            hasChanges={isChanged}
            handleSave={handleSave}
            handleAutofill={handleAutofill}
          />
        </div>
      </div>
    </div>
  );
}
