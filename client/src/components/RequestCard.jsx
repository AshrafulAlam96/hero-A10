import React from "react";
import { FaTrash } from 'react-icons/fa';           // Delete
import { FaCheck } from 'react-icons/fa';           // Accept
import { MdCancel } from 'react-icons/md';          // Reject

const RequestCard = ({ request, onUpdate, onDelete }) => {
  return (
    <div className="bg-amber-100 rounded-xl shadow-2xl p-4 flex justify-between items-center">
      <div>
        <h3 className="text-amber-950 font-semibold">{request.partnerName}</h3>
        <p
  className={`text-sm font-medium ${
    request.status === 'accepted'
      ? 'text-green-600'
      : request.status === 'rejected'
      ? 'text-red-500'
      : 'text-yellow-500'
  }`}
>
  Status: {request.status}
</p>
      </div>
      <div className="flex gap-2">
        {request.status === "pending" && (
          <>
            <button
              onClick={() => onUpdate(request._id, "accepted")}
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              <FaCheck />
            </button>
            <button
              onClick={() => onUpdate(request._id, "rejected")}
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              <MdCancel />
            </button>
          </>
        )}
        <button
          onClick={() => onDelete(request._id)}
          className="hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium text-sm text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 text-gray-700 px-3 py-1 rounded-lg">
         <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
