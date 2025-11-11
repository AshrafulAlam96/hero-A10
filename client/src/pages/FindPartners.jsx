import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  // 🔹 Fetch all partners from your MongoDB server
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/partners");
        const data = await res.json();
        setPartners(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Failed to load partners");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  // 🔹 Send connection request
  const handleConnect = async (partner) => {
    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterEmail: user?.email,
          partnerEmail: partner.email,
          status: "pending",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(`Connection request sent to ${partner.name}`);
    } catch {
      toast.error("Failed to send request");
    }
  };

  const filteredPartners = partners.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.subject === filter;
    return matchSearch && matchFilter;
  });

  if (loading) return <p className="text-center mt-10">Loading partners...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Find Study Partners</h1>

      {/* 🔍 Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="all">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* 🧑‍🎓 Partner Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredPartners.length === 0 ? (
          <p className="text-center text-gray-500">No partners found.</p>
        ) : (
          filteredPartners.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="font-semibold text-lg">{p.name}</h2>
                <p className="text-gray-600">{p.subject}</p>
                <p className="text-sm text-gray-500">{p.email}</p>
              </div>
              <button
                onClick={() => handleConnect(p)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Connect
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FindPartners;
