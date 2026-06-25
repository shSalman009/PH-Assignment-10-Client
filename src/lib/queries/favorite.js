"use server";

import { apiClient } from "../services/apiClient";

// Get Recipes
export async function getFavoriteRecipe(recipeId) {
  if (!recipeId) {
    return { success: false, error: "Recipe ID required." };
  }

  return await apiClient(`/favorites/${recipeId}`, {
    method: "GET",
  });
}
