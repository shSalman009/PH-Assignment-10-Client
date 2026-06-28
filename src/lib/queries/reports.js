"use server";

import { apiClient } from "../services/apiClient";

// Get Recipes
export async function getAllReports() {
  const result = await apiClient(`/reports`, {
    method: "GET",
  });
  return result?.data || [];
}
