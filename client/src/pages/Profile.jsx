import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    await updateUserProfile({ displayName: name, photoURL: photo });
    toast.success("Profile updated successfully!");
  } catch {
    toast.error("Failed to update profile.");
  } finally {
    setLoading(false);
  }
};

  if (!user)
    return <p className="text-center mt-10 text-gray-500">Please log in first.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-4">My Profile</h1>
      <div className="flex flex-col items-center mb-4">
        <img
          src={photo || "https://via.placeholder.com/100"}
          alt="avatar"
          className="w-24 h-24 rounded-full mb-3 object-cover"
        />
        <p className="font-semibold">{user.email}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Photo URL</label>
          <input
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
