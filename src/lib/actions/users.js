"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "../services/apiClient";

export const toggleUserStatus = async (userId, status) => {
  const result = await apiClient(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({
      status,
    }),
  });

  if (result.success) {
    revalidatePath("/dashboard/admin/users");
  }

  return result;
};
