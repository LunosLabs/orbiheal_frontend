"use client";

import React, { useState, useCallback } from "react";
import AddEntityActions from "./AddEntityActions";
import { AddJsonEditor } from "./AddJsonEditor";
import { schemas } from "@/lib/entityConfig";
import { ZodError } from "zod";
import { postEntityData } from "@/lib/services/adminServices/entitySevice";
import { autoFillMedicine } from "@/lib/services/adminServices/medicineService";

export default React.memo(function AddEntityEditor({ entityType, initialData, keyOrder }) {
  const [code, setCode] = useState(() => JSON.stringify(initialData, null, 2));
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
        const data = JSON.parse(code);
        schema.parse(data);
        await postEntityData(entityType, data);
        showMessage(setSuccess, `Successfully added ${entityType}`);
      } catch (err) {
        if (err instanceof ZodError) {
          showMessage(setError, err.errors[0]?.message || "Validation error");
        } else {
          showMessage(setError, err?.message || "Failed to save entity.");
        }
      } finally {
        setLoading(false);
      }
    },
    [entityType, code, schema, showMessage]
  );


  
const handleAutofill = useCallback(async () => {
  try {
    const existing = JSON.parse(code);
    const result = await autoFillMedicine(existing);

    setCode(JSON.stringify(result?.response, null, 2));
    showMessage(setSuccess, "Fields autofilled successfully.");
  } catch (error) {
    showMessage(setError, "Invalid JSON. Please fix it before autofilling.");
  }
}, [code, showMessage]);


  let isChanged = false;
  try {
    const parsedCode = JSON.parse(code || "{}");
    isChanged = JSON.stringify(parsedCode) !== JSON.stringify(initialData);
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
        <AddJsonEditor
          code={code}
          onCodeChange={setCode}
          error={error}
          setError={setError}
          keyOrder={keyOrder}
        />
        <div className="pb-2 px-2 rounded-b-lg py-4">
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
});