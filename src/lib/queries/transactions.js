"use server";

import { apiClient } from "../services/apiClient";

// Get Recipes
export async function getTransaction(recipeId) {
  if (!recipeId) {
    return { success: false, error: "Recipe ID required." };
  }

  return await apiClient(`/transactions/${recipeId}`, {
    method: "GET",
  });
}
