// src/components/PartnerCard.jsx
import React from "react";

const PartnerCard = ({ partner, onView, onSend, sending }) => {
  return (
    <div
      key={partner._id}
      className="flex flex-col justify-between p-5 bg-amber-50 shadow-md rounded-2xl border border-gray-400 hover:shadow-lg transition-all"
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={
            partner.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt={partner.name}
          className="w-20 h-20 rounded-full border-4 border-blue-300 object-cover shadow-md"/>
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
          onClick={() => onView(partner)}
          className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-200 text-gray-700 font-medium"
        >
          View Details
        </button>

        <button
          onClick={() => onSend(partner._id)}
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
  );
};

export default PartnerCard;
