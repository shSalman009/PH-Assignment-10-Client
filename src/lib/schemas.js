import * as z from "zod";

// 1. REGISTRATION FORM VALIDATION SCHEMA
export const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  photoUrl: z
    .string()
    .trim()
    .min(1, "Photo URL is required")
    .url("Invalid URL format"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])/,
      "Password must include both uppercase and lowercase letters",
    ),
});

// 2. LOGIN FORM VALIDATION SCHEMA
export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});
