"use server";

import { apiClient } from "../services/apiClient";

// Get Recipes
export async function getAllUsers() {
  const result = await apiClient(`/users`, {
    method: "GET",
  });

  return result?.data || [];
}
