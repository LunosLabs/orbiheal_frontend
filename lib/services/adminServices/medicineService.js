export async function fetchMedicineById(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/medicine/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch medicine: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || typeof data !== "object") {
      throw new Error("Medicine not found");
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error; 
  }
}



export const addNewMedicine = async (medicineData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/medicine/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicineData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add medicine: ${errorText}`);
    }

    const result = await response.json();
    
    return result;
  } catch (error) {
    console.error("Add Medicine Error:", error.message);
    throw error;
  }
};




export const getAllMedicines = async (page = 1) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/medicine/get?page=${page}&limit=${process.env.NEXT_PUBLIC_PAGE_LIMIT}`
  );


if (!response.ok) throw new Error("Failed to fetch Medicines");
  const result = await response.json();

  return result
}



export const autoFillMedicine = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/orbi-ai/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch medicine: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Failed to create Medicine");
    }

    return data;
  } catch (error) {
    throw error; 
  }
}


