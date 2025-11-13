import React, { useEffect, useState } from "react";
import { fetchPartners, sendRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import PartnerModal from "../components/PartnerModal";
import PartnerCard from "../components/PartnerCard"; // ✅ new import

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const { user } = useAuth();

  // Load data
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

  // Search & sort
  useEffect(() => {
    let results = partners;
    const term = searchTerm.trim().toLowerCase();

    if (term) {
      results = results.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.subject?.toLowerCase().includes(term)
      );
    }

    if (sortOption) {
      results = [...results].sort((a, b) =>
        a[sortOption].localeCompare(b[sortOption])
      );
    }

    setFiltered(results);
  }, [searchTerm, sortOption, partners]);

  // Send request
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

  // Loading
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
            <PartnerCard
              key={partner._id}
              partner={partner}
              onView={setSelectedPartner}
              onSend={handleSendRequest}
              sending={sending}
            />
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
