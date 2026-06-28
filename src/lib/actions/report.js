"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "../services/apiClient";

// Add Reports
export const addReportAction = async (payload) => {
  const result = await apiClient(`/reports`, {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      status: "pending",
    }),
  });

  return result;
};

// Delete Reports
export const dismissReportAction = async (reportId) => {
  const result = await apiClient(`/reports/${reportId}`, {
    method: "DELETE",
  });

  if (result.success) {
    revalidatePath("/dashboard/admin/reports");
  }

  return result;
};
