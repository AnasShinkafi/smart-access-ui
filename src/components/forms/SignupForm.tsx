"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    const userId = formData.email.replace(/[@.]/g, "_"); // Simple mock userId

    const user = {
      ...formData,
      userId,
    };

    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Signup successful!");
    router.push("/signin");

    // Simulate saving to backend/local storage
    // setTimeout(() => {
    //   localStorage.setItem("user", JSON.stringify(formData));
    //   toast.success("Account created!");
    //   router.push("/signin");
    // }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-20"
    >
      <h2 className="text-xl font-semibold mb-4 text-center text-teal-600">Create Account</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md text-black"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md text-black"
      />

<input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  value={formData.phone}
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
    className="w-full px-4 py-2 border rounded-md pr-10 text-black"
  />
  <span
    className="absolute right-3 top-2.5 cursor-pointer text-black"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
  </span>
</div>


<div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 border rounded-md pr-10 text-black"
  />
  <span
    className="absolute right-3 top-2.5 cursor-pointer text-black"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
  </span>
</div>


      <button
        type="submit"
        disabled={loading}
        className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}
