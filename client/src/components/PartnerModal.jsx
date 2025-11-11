// src/components/PartnerModal.jsx
import React from "react";

const PartnerModal = ({ partner, onClose, onSendRequest, sending }) => {
  if (!partner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center p-6 border-b">
          <img
            src={partner.profileImage || "https://via.placeholder.com/150"}
            alt={partner.name}
            className="w-28 h-28 rounded-full border-4 border-blue-300 object-cover shadow-md"
          />
          <h2 className="text-2xl font-bold mt-3">{partner.name}</h2>
          <p className="text-sm text-gray-500">{partner.university}</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-2 text-gray-700">
          <p><strong>Subject:</strong> {partner.subject}</p>
          <p><strong>Level:</strong> {partner.level}</p>
          <p><strong>Location:</strong> {partner.location}</p>
          {partner.description && (
            <p className="italic text-gray-500">{partner.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t flex justify-center">
          <button
            onClick={() => onSendRequest(partner._id)}
            disabled={sending === partner._id}
            className={`px-5 py-2 rounded-md text-white font-medium ${
              sending === partner._id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {sending === partner._id ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerModal;
