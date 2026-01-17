const API_URL = "http://localhost:8000";
/**
 * Api fetch is just a fancy fetch function that communicates
 * with the correct endpoint.
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}
