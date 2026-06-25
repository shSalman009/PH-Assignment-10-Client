"use server";

import { apiClient } from "../services/apiClient";

export const toggleFavoriteAction = async (recipeId) => {
  const result = await apiClient(`/favorites/toggle`, {
    method: "PATCH",
    body: JSON.stringify({ recipeId }),
  });

  return result;
};
