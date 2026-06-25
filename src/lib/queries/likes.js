"use server";

import { apiClient } from "../services/apiClient";

// Get Recipes
export async function getLike(recipeId) {
  if (!recipeId) {
    return { success: false, error: "Recipe ID required." };
  }

  return await apiClient(`/likes/${recipeId}`, {
    method: "GET",
    next: {
      tags: [`recipe-like-${recipeId}`],
    },
  });
}
