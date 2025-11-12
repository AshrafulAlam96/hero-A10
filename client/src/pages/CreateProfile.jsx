// src/pages/CreateProfile.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CreateProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    university: "",
    level: "",
    location: "",
    description: "",
    profileImage: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
        profileImage: user.photoURL || "",
      }));
    }
  }, [user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Please log in first");

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      toast.success("Profile saved successfully!");
    } catch (err) {
      toast.error(err.message || "Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-amber-50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-center text-white">
          <h1 className="text-3xl font-bold">
            {formData._id ? "Edit Your Profile" : "Create Your Study Profile"}
          </h1>
          <p className="mt-1 text-sm opacity-90">
            Build your profile to connect with your perfect study partners 🎓
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* LEFT */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 shadow-sm transition"
                placeholder="e.g., Ashraful Alam"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email (readonly)
              </label>
              <input
                type="email"
                readOnly
                name="email"
                value={formData.email}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="e.g., Data Science"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                University
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="e.g., University of Dhaka"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Education Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="">Select level</option>
                <option value="HSC">HSC</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="e.g., Dhaka, Bangladesh"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="https://randomuser.me/api/portraits/men/32.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-blue-300 bg-blue-50 focus:ring-2 focus:ring-blue-500 shadow-sm h-24"
                placeholder="Write a short bio or study interests..."
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="col-span-1 md:col-span-2 mt-6 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-1/2 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
