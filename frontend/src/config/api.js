const DEFAULT_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://parent-d4q3.onrender.com";

export const API_BASE_URL = DEFAULT_BASE.replace(/\/+$/, "");

export const apiFetch = (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
};
