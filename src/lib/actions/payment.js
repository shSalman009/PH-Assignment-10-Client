"use server";

import { apiClient } from "../services/apiClient";

export async function addTransactionAction(payload) {
  const result = await apiClient("/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result;
}
