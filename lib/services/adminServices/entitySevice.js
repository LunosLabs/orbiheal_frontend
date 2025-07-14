export const postEntityData = async (entityType, formData) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${entityType}/add`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data?.error || data?.message || "Server error");
      error.statusCode = response.status;
      error.details = data?.details ?? null;
      throw error;
    }

    if (!data || typeof data !== "object") {
      throw new Error("Invalid response from server");
    }

    return data;

  } catch (error) {
    if (error.details) {
      throw error;
    }
    const networkError = new Error(`Failed to save entity: ${error.message}`);
    networkError.statusCode = 500;
    networkError.details = null;
    throw networkError;
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
    
    if (!response.ok) {
      const errorMsg = data?.error || data?.message || response.statusText;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch ${entityType} data`);
  }
};


export const autoFillEntityService = async (entityType, payload) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/orbi/add/${entityType}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMsg = result?.error || result?.message || response.statusText;
      throw new Error(errorMsg);
    }

    return result;
  } catch (error) {
    throw new Error(
      `Failed to fetch autofill data for "${entityType}": ${error.message}`
    );
  }
};
