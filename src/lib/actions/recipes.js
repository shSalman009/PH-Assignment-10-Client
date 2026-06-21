"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "../services/apiClient";

// Server Action to create a new recipe
export async function createRecipeAction(recipePayload) {
  const result = await apiClient("/recipes", {
    method: "POST",
    body: JSON.stringify(recipePayload),
  });

  return result;
}
// Server Action to delete recipe
export async function deleteRecipeAction(recipeId) {
  const result = await apiClient(`/recipes/${recipeId}`, {
    method: "DELETE",
  });

  if (result.success) {
    revalidatePath("/dashboard/my-recipes");
  }
  return result;
}

// Server Action to update an existing recipe
export async function updateRecipeAction(recipeId, updatePayload) {
  const result = await apiClient(`/recipes/${recipeId}`, {
    method: "PATCH",
    body: JSON.stringify(updatePayload),
  });
  return result;
}
