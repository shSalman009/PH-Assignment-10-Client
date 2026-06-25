"use server";

import { apiClient } from "../services/apiClient";

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
