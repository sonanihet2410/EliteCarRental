// src/lib/api.js
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function apiFetch(path, { method = "GET", body, headers = {}, auth = false } = {}) {
  const token = localStorage.getItem("token");
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);
  let data = null;
  try { data = await res.json(); } catch (e) { /* non-json response */ }

  if (!res.ok) {
    const msg = data?.message || data?.error || res.statusText || "Request failed";
    const err = new Error(msg);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}
