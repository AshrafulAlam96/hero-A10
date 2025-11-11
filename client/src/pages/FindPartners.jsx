import React, { useEffect, useState } from "react";
import { fetchPartners, sendRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

export default function FindPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadPartners() {
      setLoading(true);
      try {
        const data = await fetchPartners();
        setPartners(data);
      } catch (err) {
        console.error("Error fetching partners:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPartners();
  }, []);

  const handleRequest = async (partnerId) => {
  try {
    await sendRequest({
      partnerId,
      requestedBy: user?.email || "test@example.com",
      message: "Let's study together!",
    });
    toast.success("Request sent successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to send request.");
  }
};

  if (loading) return <p className="text-center mt-10">Loading partners...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Find Study Partners</h1>
      {partners.length === 0 ? (
        <p className="text-center text-gray-500">No partners found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {partners.map((p) => (
            <div
              key={p._id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.subject}</p>
              <p className="text-sm text-gray-400">{p.email}</p>
              <button
                onClick={() => handleRequest(p._id)}
                className="btn btn-primary mt-3"
              >
                Send Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
