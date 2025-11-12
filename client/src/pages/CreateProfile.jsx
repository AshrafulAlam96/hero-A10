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

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // save profile to DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Please login first!");

    try {
      setSaving(true);
      await createPartner({
        ...formData,
        email: user.email,
        createdAt: new Date(),
      });
      toast.success("Profile saved successfully!");
      setFormData({
        name: "",
        university: "",
        subject: "",
        level: "",
        location: "",
        description: "",
        profileImage: "",
      });
    } catch (err) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        ✏️ Create / Edit Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profile Image Preview */}
        <div className="flex flex-col items-center">
          <img
            src={
              formData.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile Preview"
            className="w-28 h-28 rounded-full border-4 border-blue-200 object-cover shadow-md mb-3"
          />
          <input
            type="url"
            name="profileImage"
            placeholder="Paste image URL (e.g. https://example.com/photo.jpg)"
            value={formData.profileImage}
            onChange={handleChange}
            className="input input-bordered w-full max-w-md text-center"
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter a direct image URL (recommended 200x200 or larger)
          </p>
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="university"
            placeholder="University / College"
            value={formData.university}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="subject"
            placeholder="Subject / Major"
            value={formData.subject}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            name="level"
            placeholder="Level (e.g. Undergraduate)"
            value={formData.level}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <textarea
          name="description"
          placeholder="Describe your study interests..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="textarea textarea-bordered w-full"
        ></textarea>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={saving}
            className={`btn btn-primary px-8 ${
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
