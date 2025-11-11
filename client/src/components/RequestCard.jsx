import React from "react";

const RequestCard = ({ request, onUpdate, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{request.partnerName}</h3>
        <p className="text-sm text-gray-600">{request.subject}</p>
        <p className="text-sm text-gray-500">Status: {request.status}</p>
      </div>
      <div className="flex gap-2">
        {request.status === "pending" && (
          <>
            <button
              onClick={() => onUpdate(request._id, "accepted")}
              className="bg-green-500 text-white px-3 py-1 rounded-lg"
            >
              Accept
            </button>
            <button
              onClick={() => onUpdate(request._id, "rejected")}
              className="bg-red-500 text-white px-3 py-1 rounded-lg"
            >
              Reject
            </button>
          </>
        )}
        <button
          onClick={() => onDelete(request._id)}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
