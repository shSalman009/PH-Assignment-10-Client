"use server";

import { revalidatePath, revalidateTag } from "next/cache";
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

// Recipe Like Toggling
export async function toggleRecipeLikeAction(recipeId, isCurrentlyLiked) {
  const actionType = isCurrentlyLiked ? "unlike" : "like";

  const result = await apiClient(`/recipes/${recipeId}/like`, {
    method: "PATCH",
    body: JSON.stringify({ action: actionType }),
  });

  revalidateTag(`recipe-like-${recipeId}`);
  return result;
}
