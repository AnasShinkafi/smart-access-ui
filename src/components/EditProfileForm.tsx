"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ProfileFormData = {
  fullName: string;
  email: string;
  phone: string;
  photo?: string;
};

interface EditProfileFormProps {
  userId: string;
}

export default function EditProfileForm({ userId }: EditProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    email: "",
    phone: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`userProfile_${userId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      if (parsed.photo) {
        setPreview(parsed.photo);
      }
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString() || "";
        setFormData((prev) => ({ ...prev, photo: base64 }));
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem(`userProfile_${userId}`, JSON.stringify(formData));
      toast.success("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Profile Picture Preview */}
      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Profile preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
          required
        />
      </div>

      {/* Photo */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">Profile Photo</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-700"
        }`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
