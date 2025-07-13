export const scanPrescriptionService = async (imageFile) => {
  if (!imageFile) {
    throw new Error("No image file provided");
  }

  const formData = new FormData();
  formData.append("image", imageFile); 

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/prescription/scan`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || response.statusText || "Unknown server error");
    error.statusCode = response.status;
    throw error;
  }

  const data = await response.json();
  return data.data;
};
