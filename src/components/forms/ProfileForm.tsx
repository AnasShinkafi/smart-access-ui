"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfileForm({ userId }: { userId: string }) {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "08031234567",
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile") || "{}");
    if (user?.userId === userId) {
      setFormData(user);
    }
  }, [userId]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (!formData.phone.match(/^0[789][01]\d{8}$/))
      newErrors.phone = "Valid Nigerian number required";
    if (formData.currentPassword.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors.");
      return;
    }
    setLoading(true);

    // Simulate profile update
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully!");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          name="email"
          value={formData.email}
          disabled
          className="w-full px-4 py-2 bg-gray-100 border rounded-md text-gray-600"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
