import React, { useEffect, useState } from "react";
import { fetchPartners, sendRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import PartnerModal from "../components/PartnerModal";
import PartnerCard from "../components/PartnerCard";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);

  const { user } = useAuth();

  // Load Partners
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const response = await fetchPartners();

        const partnerList = Array.isArray(response)
          ? response
          : response?.data || [];

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

  // Search + Sort
  useEffect(() => {
    let results = [...partners];

    const term = searchTerm.trim().toLowerCase();

    // Search
    if (term) {
      results = results.filter(
        (partner) =>
          partner?.name?.toLowerCase().includes(term) ||
          partner?.subject?.toLowerCase().includes(term)
      );
    }

    // Experience Level Sorting (Assignment Requirement)
    if (sortOption === "experience") {
      const levelOrder = {
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
        Expert: 4,
      };

      results.sort(
        (a, b) =>
          (levelOrder[a?.level || a?.experienceLevel] || 0) -
          (levelOrder[b?.level || b?.experienceLevel] || 0)
      );
    }

    setFiltered(results);
  }, [searchTerm, sortOption, partners]);

  // Send Request
  const handleSendRequest = async (partnerId) => {
    if (!user?.email) {
      return toast.error("Please login first!");
    }

    try {
      setSending(partnerId);

      await sendRequest({
        partnerId,
        requestedBy: user.email,
        message: "Hey! Let's study together 😊",
      });

      toast.success("Request sent successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to send request");
    } finally {
      setSending(null);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        🎓 Find Study Partners
      </h1>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or subject..."
          className="input input-bordered w-full md:w-2/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-1/3"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>

          <option value="experience">
            Experience Level
          </option>
        </select>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">
          No partners found.
        </p>
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

      {/* Modal */}
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