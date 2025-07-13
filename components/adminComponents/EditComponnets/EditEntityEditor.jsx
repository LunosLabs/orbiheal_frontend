"use client";

import React, { useState, useCallback } from "react";
import EditEntityActions from "./EditEntityActions";
import { EditJsonEditor } from "./EditJsonEditor";
import { schemas } from "@/lib/entityConfig";
import { ZodError } from "zod";
import { getChangedFields } from "./GetChangedFields";

export default React.memo(function EditEntityEditor({ entityType, id, entityData }) { 
  const [code, setCode] = useState(() => JSON.stringify(entityData, null, 2));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const schema = schemas[entityType]?.schema;

  if (!schema) {
    return (
      <div className="text-red-400 text-center p-4">
        Invalid entity type: {entityType}
      </div>
    );
  }

  const showMessage = useCallback((setter, msg) => {
    setter(msg);
    setTimeout(() => setter(""), 4000);
  }, []);

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const currentData = JSON.parse(code);

        // Validate if you want (optional)
        // schema.parse(currentData);

        const changes = getChangedFields(currentData, entityData);

        if (Object.keys(changes).length > 0) {

          showMessage(setSuccess, `Successfully updated ${entityType}`);
        } else {

        }
      } catch (err) {
        if (err instanceof ZodError) {
          showMessage(setError, err.errors[0]?.message || "Validation error");
        } else {
          showMessage(setError, err?.message || "Failed to update entity.");
        }
      } finally {
        setLoading(false);
      }
    },
    [entityType, id, code, schema, showMessage, entityData]
  );

  let isChanged = false;
  try {
    const parsedCode = JSON.parse(code);
    const changes = getChangedFields(parsedCode, entityData);
    isChanged = Object.keys(changes).length > 0;
  } catch {
    isChanged = false;
  }

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto sm:p-6 rounded-lg shadow-xl">
      {(error || success) && (
        <div className="flex justify-center my-3 space-x-2">
          {error && (
            <p className="text-red-500 text-sm bg-red-900/70 border border-red-600 rounded px-4 py-2 shadow-lg transition-all duration-300 font-semibold tracking-wide backdrop-blur-sm">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-sm bg-green-900/70 border border-green-600 rounded px-4 py-2 shadow-lg transition-all duration-300 font-semibold tracking-wide backdrop-blur-sm">
              {success}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col w-full h-[75vh] rounded-lg shadow-lg overflow-hidden">
        <EditJsonEditor
          code={code}
          onCodeChange={setCode}
          error={error}
          setError={setError}
        />
        <div className="pb-2 px-2 rounded-b-lg py-4">
          <EditEntityActions
            loading={loading}
            hasChanges={isChanged}
            handleSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
});
