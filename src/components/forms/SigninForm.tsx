"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function SigninForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    setTimeout(() => {
      setLoading(false);

      if (
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        toast.success("Login successful!");
        document.cookie = "auth=true; path=/"; // simple session
        router.push("/dashboard"); // redirect to dashboard
      } else {
        toast.error("Invalid credentials");
      }
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-4 text-center text-teal-600">Sign In</h2>

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md text-black"
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md text-black pr-10"
        />
        <span
          className="absolute right-3 top-2.5 cursor-pointer text-black"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
