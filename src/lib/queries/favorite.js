"use server";

import { apiClient } from "../services/apiClient";

// Get all favorites
export async function getUserFavorites() {
  return await apiClient(`/favorites`, {
    method: "GET",
  });
}

// Get a single favorite
export async function getFavoriteRecipe(recipeId) {
  if (!recipeId) {
    return { success: false, error: "Recipe ID required." };
  }

  return await apiClient(`/favorites/${recipeId}`, {
    method: "GET",
  });
}
