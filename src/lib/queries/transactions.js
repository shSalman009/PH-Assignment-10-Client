"use server";

import { apiClient } from "../services/apiClient";

// Get Transaction
export async function getTransaction(recipeId) {
  if (!recipeId) {
    return { success: false, error: "Recipe ID required." };
  }

  return await apiClient(`/transactions/${recipeId}`, {
    method: "GET",
  });
}

// Get all the transactions
export async function getAllTransactions() {
  const result = await apiClient(`/transactions`, {
    method: "GET",
  });

  return result?.data || [];
}
