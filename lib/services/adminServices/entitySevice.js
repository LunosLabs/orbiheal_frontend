import { da } from "date-fns/locale";

export const postEntityData = async (entityType, formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${entityType}/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error || data?.message || response.statusText;
      throw new Error(errorMsg);
    }

    if (!data || typeof data !== "object") {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to update medicine: ${error.message}`);
  }
};



export const fetchEntityByIdService = async (entityType, id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${entityType}/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error || data?.message || response.statusText;
      throw new Error(errorMsg);
    }

    if (!data || typeof data !== "object") {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch ${entityType} with ID ${id}: ${error.message}`
    );
  }
};




//pagination
export const fetchEntityService = async (entityType, page = 1) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/${entityType}/get?page=${page}&limit=12`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error || data?.message || response.statusText;
      throw new Error(errorMsg);
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch ${entityType} data`);
  }
};
