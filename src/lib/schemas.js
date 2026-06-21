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

// 3. RECIPE SUBMISSION FORM VALIDATION SCHEMA
export const recipeFormSchema = z.object({
  name: z.string().min(3, "Recipe title must be at least 3 characters long"),
  category: z.string().min(1, "Please select a valid category class"),
  cuisineType: z.string().min(2, "Cuisine type is required"),
  difficulty: z.string().min(1, "Please select a difficulty level"),
  prepTime: z.coerce
    .number()
    .positive("Preparation time must be a positive number")
    .min(1, "Minimum prep time is 1 minute"),
  ingredients: z
    .array(
      z.object({
        value: z.string().min(1, "Ingredient line cannot be empty"),
      }),
    )
    .min(1, "Provide at least one ingredient"),
  instructions: z
    .array(
      z.object({
        value: z.string().min(1, "Instruction step cannot be empty"),
      }),
    )
    .min(1, "Provide at least one preparation step"),
});
