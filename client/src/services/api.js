// src/services/api.js
const API_BASE = "http://localhost:5000/api";

export async function fetchRequests(email) {
  const res = await fetch(`${API_BASE}/requests?email=${email}`);
  return res.json();
}

export async function updateRequestStatus(id, status) {
  const res = await fetch(`${API_BASE}/requests/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
}

export async function deleteRequest(id) {
  const res = await fetch(`${API_BASE}/requests/${id}`, { method: "DELETE" });
  return res.json();
}
