"use client";

import React, { useState, useRef, useCallback } from "react";
import UploadButton from "./UploadButton";
import UploadedImagePreview from "./UploadImagePreview";
import { scanPrescriptionService } from "@/lib/services/dashboardService.js/scanPrescriptionService";

export default function UploadPrescriptionClient() {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef(null);




  const handleFileUpload = useCallback((event) => {
    setErrorMsg("");
    const file = event.target.files?.[0];
    if (!file) {
      setErrorMsg("No file selected.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Only image files (JPG, PNG) are accepted.");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target?.result);
    reader.readAsDataURL(file);
  }, []);




  const triggerFileInput = useCallback(() => {
    setErrorMsg("");
    fileInputRef.current?.click();
  }, []);

  const clearImage = useCallback(() => {
    setImageSrc(null);
    setImageFile(null);
    setErrorMsg("");
  }, []);



const sendToServer = useCallback(async () => {
  if (!imageFile) {
    setErrorMsg("No image to send.");
    return;
  }

  try {
    const response = await scanPrescriptionService(imageFile);
  } catch (err) {
    console.error(err);
    setErrorMsg(err.message);
  }
}, [imageFile]);



  return (
    <div className="flex flex-col items-center w-full max-w-md">
      {!imageSrc && (
        <UploadButton
          onClick={triggerFileInput}
          onFileChange={handleFileUpload}
          fileInputRef={fileInputRef}
          errorMsg={errorMsg}
        />
      )}

      {imageSrc && (
        <UploadedImagePreview
          imageSrc={imageSrc}
          onClear={clearImage}
          onSubmit={sendToServer}
          setErrorMsg={setErrorMsg}
          errorMsg={errorMsg}
        />
      )}
    </div>
  );
}
