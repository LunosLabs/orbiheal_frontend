export const fetchUserProfileService = async (userId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || response.statusText || "Unknown server error");
    error.statusCode = response.status;
    throw error;
  }

  const data = await response.json();
  if (!data.data) {
    const error = new Error(data.message || "No user data returned");
    error.statusCode = 404;
    throw error;
  }


  
  return data.data;
};