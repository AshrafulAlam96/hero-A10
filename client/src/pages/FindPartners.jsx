import React, { useEffect, useState } from "react";
import { fetchPartners, sendRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import PartnerModal from "../components/PartnerModal";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const { user } = useAuth();

  // 🧩 Load all partners
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchPartners();
        const partnerList = Array.isArray(data) ? data : [];
        setPartners(partnerList);
        setFiltered(partnerList);
      } catch (err) {
        toast.error(err.message || "Failed to load partners");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 🔍 Search & sort filters
  useEffect(() => {
    let results = partners;

    // Search by name or subject
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.subject?.toLowerCase().includes(term)
      );
    }

    // Sort options
    if (sortOption === "name") {
      results = [...results].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "subject") {
      results = [...results].sort((a, b) => a.subject.localeCompare(b.subject));
    } else if (sortOption === "location") {
      results = [...results].sort((a, b) => a.location.localeCompare(b.location));
    }

    setFiltered(results);
  }, [searchTerm, sortOption, partners]);

  // 🧩 Send request
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
      toast.error(err.message || "Failed to send request");
    } finally {
      setSending(null);
    }
  };

  // 🧩 Loading UI
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner text-blue-600 w-12 h-12"></div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2 text-center">
        🎓 Find Study Partners
      </h1>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or subject..."
          className="input input-bordered w-full sm:w-1/2 focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full sm:w-1/4 focus:ring-2 focus:ring-blue-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="subject">Subject</option>
          <option value="location">Location</option>
        </select>
      </div>

      {/* Partner Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No partners found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((partner) => (
            <div
              key={partner._id}
              className="flex flex-col justify-between p-5 bg-blue-100 shadow-md rounded-2xl border border-gray-400 hover:shadow-lg transition-all"
            >
              {/* Profile Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={
                    partner.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={partner.name}
                  className="w-20 h-20 rounded-full border-4 border-blue-300 object-cover shadow-md"
                />
              </div>

              {/* Partner Info */}
              <div className="text-center space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">{partner.name}</h2>
                <p className="text-sm text-gray-600">{partner.university}</p>
                <p className="text-gray-700">
                  <strong>Subject:</strong> {partner.subject}
                </p>
                <p className="text-gray-600">
                  <strong>Level:</strong> {partner.level}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {partner.location}
                </p>

                {partner.description && (
                  <p className="text-sm text-gray-500 italic line-clamp-2">
                    {partner.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col items-center space-y-2">
                <button
                  onClick={() => setSelectedPartner(partner)}
                  className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-200 text-gray-700 font-medium"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleSendRequest(partner._id)}
                  disabled={sending === partner._id}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    sending === partner._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {sending === partner._id ? "Sending..." : "Send Request"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Partner Modal */}
      {selectedPartner && (
        <PartnerModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
          onSendRequest={handleSendRequest}
          sending={sending}
        />
      )}
    </div>
  );
};

export default FindPartners;
