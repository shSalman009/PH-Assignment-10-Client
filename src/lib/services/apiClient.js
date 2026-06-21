"use server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiClient(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle empty responses
    if (response.status === 204) {
      return { success: true, data: null };
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `API Error: Status code ${response.status}`,
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`[apiClient Error] Failed at ${url}:`, error);
    return {
      success: false,
      error: "Network connectivity issue or backend server is offline.",
    };
  }
}
