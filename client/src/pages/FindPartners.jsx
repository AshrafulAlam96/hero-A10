import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchPartners, sendRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function FindPartners() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const { user } = useAuth();

  // 🧠 Fetch partners from backend
  useEffect(() => {
    async function loadPartners() {
      setLoading(true);
      try {
        const data = await fetchPartners();
        setPartners(data);
        setFilteredPartners(data);
      } catch (err) {
        console.error("Error fetching partners:", err);
        toast.error("Failed to load partners");
      } finally {
        setLoading(false);
      }
    }
    loadPartners();
  }, []);

  // 🔍 Search + filter logic
  useEffect(() => {
    let filtered = partners;

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.subject?.toLowerCase().includes(term)
      );
    }

    if (filterSubject) {
      filtered = filtered.filter(
        (p) => p.subject?.toLowerCase() === filterSubject.toLowerCase()
      );
    }

    setFilteredPartners(filtered);
  }, [search, filterSubject, partners]);

  // 🤝 Send request
  const handleRequest = async (partnerId) => {
    try {
      await sendRequest({
        partnerId,
        requestedBy: user?.email || "guest@example.com",
        message: "Let's study together!",
      });
      toast.success("Request sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send request");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading partners...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Find Study Partners
      </h1>

      {/* 🔎 Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          className="select select-bordered w-full md:w-1/3"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* 📋 Partners List */}
      {filteredPartners.length === 0 ? (
        <p className="text-center text-gray-500">
          No partners match your search or filter.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredPartners.map((p) => (
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