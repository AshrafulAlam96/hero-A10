import React, { useState } from "react";
import { createPartner } from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CreateProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    university: "",
    subject: "",
    level: "",
    location: "",
    description: "",
    profileImage: user?.photoURL || "",
  });

  const [saving, setSaving] = useState(false);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Please login first!");

    const payload = {
      ...formData,
      email: user.email,
      createdAt: new Date(),
    };

    try {
      setSaving(true);
      await createPartner(payload);
      toast.success("✅ Profile saved successfully!");
      setFormData({
        name: user?.displayName || "",
        university: "",
        subject: "",
        level: "",
        location: "",
        description: "",
        profileImage: user?.photoURL || "",
      });
    } catch (err) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-base-200 shadow-xl rounded-2xl mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        ✏️ Create or Edit Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 🔹 Profile Image Section */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src={
              formData.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile Preview"
            className="w-28 h-28 rounded-full border-4 border-blue-400 object-cover shadow-md"
          />
          <input
            type="url"
            name="profileImage"
            placeholder="Paste image URL (https://example.com/photo.jpg)"
            value={formData.profileImage}
            onChange={handleChange}
            className="input input-bordered w-full sm:w-1/2 text-center"
          />
          <p className="text-sm text-gray-500">
            Use a direct image link (200x200px or larger)
          </p>
        </div>

        {/* 🔹 Basic Info Inputs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="university"
            placeholder="University / College"
            value={formData.university}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject / Major"
            value={formData.subject}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="level"
            placeholder="Level (e.g. Undergraduate)"
            value={formData.level}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g. Dhaka)"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* 🔹 Description */}
        <textarea
          name="description"
          placeholder="Write a short bio about your study interests, goals, or skills..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="textarea textarea-bordered w-full"
        ></textarea>

        {/* 🔹 Save Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={saving}
            className={`btn btn-primary px-10 ${
              saving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
