import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchRequests, fetchPartners } from "../services/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user?.email) return;
      try {
        setLoading(true);
        const reqData = await fetchRequests(user.email);
        const partnerData = await fetchPartners();
        setRequests(Array.isArray(reqData) ? reqData : []);
        setPartners(Array.isArray(partnerData) ? partnerData : []);
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;

  // 🧠 Stats
  const totalRequests = requests.length;
  const acceptedRequests = requests.filter((r) => r.status === "accepted").length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📊 My Dashboard
      </h1>

      {/* USER INFO */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-4 border-blue-200 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <a
          href="/create-profile"
          className="btn btn-outline btn-primary mt-4 sm:mt-0"
        >
          Edit Profile
        </a>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-6 rounded-2xl text-center shadow-sm border border-blue-300">
          <h3 className="text-2xl font-bold text-blue-700">{totalRequests}</h3>
          <p className="text-gray-700">Total Requests Sent</p>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl text-center shadow-sm border border-green-300">
          <h3 className="text-2xl font-bold text-green-700">{acceptedRequests}</h3>
          <p className="text-gray-700">Accepted Requests</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-2xl text-center shadow-sm border border-yellow-300">
          <h3 className="text-2xl font-bold text-yellow-700">{pendingRequests}</h3>
          <p className="text-gray-700">Pending Requests</p>
        </div>
      </div>

      {/* ALL PARTNERS (OPTIONAL) */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          👥 Available Study Partners ({partners.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.slice(0, 6).map((p) => (
            <div
              key={p._id}
              className="p-4 bg-blue-50 rounded-xl border hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.profileImage || "https://via.placeholder.com/60"}
                  alt={p.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-200 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.subject}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
