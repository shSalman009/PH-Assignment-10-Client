"use server";

import { apiClient } from "../services/apiClient";

// Get Recipes
export async function getRecipes(filters = {}) {
  const { search = "", category = "" } = filters;

  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search);
  if (category && category !== "All") queryParams.append("category", category);

  return await apiClient(`/recipes?${queryParams.toString()}`, {
    method: "GET",
  });
}

// Get Featured Recipes
export async function getFeaturedRecipes() {
  return await apiClient(`/recipes/featured`, {
    method: "GET",
  });
}

// Get Recipe for a user by user id
export async function getUserRecipes(userId) {
  if (!userId) {
    return { success: false, error: "Authentication identity required." };
  }

  return await apiClient(`/recipes/user/${userId}`, {
    method: "GET",
  });
}

// Get Recipe by id
export async function getRecipeById(recipeId) {
  if (!recipeId) {
    return { success: false, error: "Recipe ID is required." };
  }
  return await apiClient(`/recipes/${recipeId}`, {
    method: "GET",
  });
}

// Get Purchased Recipes
export async function getPurchasedRecipes() {
  return await apiClient(`/recipes/purchased`, {
    method: "GET",
  });
}
