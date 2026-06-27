"use server";

import { apiClient } from "../services/apiClient";

// Get Admin Stats
export async function getAdminStats() {
  const res = await apiClient("admin/stats", {
    method: "GET",
  });

  return res?.data || {};
}

// Get User Stats
export async function getUserStats(userId) {
  const res = await apiClient(`/users/${userId}/stats`, {
    method: "GET",
  });

  return res?.data || {};
}
