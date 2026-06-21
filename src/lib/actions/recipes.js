"use server";

import { apiClient } from "../services/apiClient";

export async function createRecipeAction(recipePayload) {
  const result = await apiClient("/recipes", {
    method: "POST",
    body: JSON.stringify(recipePayload),
  });

  return result;
}
