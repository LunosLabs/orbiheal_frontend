import { z } from "zod";

export const signupSchema = z.object({
  display_name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(50, { message: "Full name must be under 50 characters." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});



export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
