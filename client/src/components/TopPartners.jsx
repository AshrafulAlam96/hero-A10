import React, { useEffect, useState } from "react";
import { fetchPartners, sendRequest } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function TopPartners() {
  const [topPartners, setTopPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);
  const { user } = useAuth();

  // 🧩 Fetch only top 4 partners
  useEffect(() => {
    async function loadTop() {
      try {
        setLoading(true);
        const data = await fetchPartners();
        // Pick top 4 based on partnerCount (popularity)
        const sorted = Array.isArray(data)
          ? [...data].sort((a, b) => (b.partnerCount || 0) - (a.partnerCount || 0))
          : [];
        setTopPartners(sorted.slice(0, 4));
      } catch {
        toast.error("Failed to load top partners");
      } finally {
        setLoading(false);
      }
    }
    loadTop();
  }, []);

  // 📨 Send request handler
  const handleSendRequest = async (partnerId) => {
    if (!user?.email) return toast.error("Please login first!");
    try {
      setSending(partnerId);
      await sendRequest({
        partnerId,
        requestedBy: user.email,
        message: "Hey! Let's study together 😊",
      });
      toast.success("Request sent!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    } finally {
      setSending(null);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-4">Loading top partners...</p>;

  return (
    <section className="py-10 shadow-2xl">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6">🌟 Top Study Partners</h2>
        <p className="text-gray-300 mb-10">
          Meet some of the most active learners on StudyMate — ready to collaborate and grow!
        </p>

        {topPartners.length === 0 ? (
          <p className="text-gray-500">No top partners found yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {topPartners.map((partner) => (
              <div
                key={partner._id}
                className="p-6 bg-amber-50 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-200"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={partner.profileImage || "https://via.placeholder.com/150"}
                    alt={partner.name}
                    className="w-24 h-24 rounded-full border-4 border-blue-200 object-cover mb-3 shadow"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{partner.name}</h3>
                  <p className="text-sm text-gray-500">{partner.university}</p>
                  <p className="mt-1 text-blue-700 font-medium">{partner.subject}</p>
                  <p className="text-gray-600 text-sm">{partner.location}</p>

                  <button
                    onClick={() => handleSendRequest(partner._id)}
                    disabled={sending === partner._id}
                    className={`mt-4 px-4 py-2 rounded-md text-white font-medium w-full ${
                      sending === partner._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {sending === partner._id ? "Sending..." : "Connect"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
