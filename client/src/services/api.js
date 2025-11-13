// src/services/api.js
const API_BASE = "https://studymate-hero-a10.vercel.app/api"; // ✅ backend base URL

// ---------- PARTNERS ----------
export async function fetchPartners() {
  const res = await fetch(`${API_BASE}/partners`);
  if (!res.ok) throw new Error("Failed to fetch partners");

  const data = await res.json();
  // ✅ Handle if API returns { data: [...] } or just [...]
  return Array.isArray(data) ? data : data.data || [];
}

export async function createPartner(data) {
  const res = await fetch(`${API_BASE}/partners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create partner");
  return res.json();
}

// ---------- CONNECTION REQUESTS ----------
export async function fetchRequests(userEmail) {
  const res = await fetch(`${API_BASE}/requests?email=${encodeURIComponent(userEmail)}`);
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
}

export async function sendRequest(requestData) {
  const res = await fetch(`${API_BASE}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send request");
  }

  return res.json();
}

export async function updateRequestStatus(id, status) {
  const res = await fetch(`${API_BASE}/requests/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update request");
  return res.json();
}

export async function deleteRequest(id) {
  const res = await fetch(`${API_BASE}/requests/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete request");
  return res.json();
}
