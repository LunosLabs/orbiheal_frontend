
import supabase from "@/utils/supabase/client";

// @ Login user
export const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }


  return data;
};

// @ Logout user
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
  return true;
};

// @ Sign Up User
export const signUpUser = async ({ email, password, display_name }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name,
      },
    },
  });

  if (error) {
    throw new Error(error.message || "Signup failed. Please try again.");
  }

  const userId = data?.user?.id;

  if (!userId) {
    throw new Error("User ID not returned after signup.");
  }
  return data;
};
