import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RequestCard from "../components/RequestCard";
import { useAuth } from "../context/AuthContext";
import {
  fetchRequests,
  updateRequestStatus,
  deleteRequest,
} from "../services/api";

const MyConnections = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // ✅ Track active request
  
  const { user } = useAuth();
  const userEmail = user?.email;


  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchRequests(userEmail);
        setRequests(Array.isArray(data) ? data : []); // ✅ always array
      } catch {
        toast.error("Failed to load requests");
        setRequests([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      setActionLoading(id);
      await updateRequestStatus(id, status);
      toast.success(`Request ${status}`);
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch {
      toast.error("Error updating request");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoading(id);
      await deleteRequest(id);
      toast.success("Request deleted");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch {
      toast.error("Error deleting request");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading requests...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        My Connections (Requests)
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">
          No connection requests yet.
        </p>
      ) : (
        requests.map((req) => (
          <div
            key={req._id}
            className={`transition-opacity ${
              actionLoading === req._id ? "opacity-60" : "opacity-100"
            }`}
          >
            <RequestCard
              request={req}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MyConnections;
