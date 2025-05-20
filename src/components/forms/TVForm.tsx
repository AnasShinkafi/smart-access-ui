"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Provider = {
  id: string;
  name: string;
};

type Bouquet = {
  id: string;
  providerId: string;
  name: string;
  price: number;
};

type FormData = {
  provider: string;
  smartCard: string;
  bouquet: string;
};

export default function TVSubscriptionForm() {
  const [formData, setFormData] = useState<FormData>({
    provider: "",
    smartCard: "",
    bouquet: "",
  });

  const [providers, setProviders] = useState<Provider[]>([]);
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch providers and bouquets dynamically or use static mock data
    setProviders([
      { id: "dstv", name: "DSTV" },
      { id: "gotv", name: "GOTV" },
      { id: "startimes", name: "Startimes" },
    ]);

    setBouquets([
      { id: "1", providerId: "dstv", name: "DSTV Padi", price: 2150 },
      { id: "2", providerId: "dstv", name: "DSTV Yanga", price: 2950 },
      { id: "3", providerId: "gotv", name: "GOtv Jolli", price: 2760 },
      { id: "4", providerId: "startimes", name: "Startimes Basic", price: 1700 },
    ]);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.provider) newErrors.provider = "TV provider is required";
    if (!formData.smartCard.match(/^[0-9]{8,12}$/))
      newErrors.smartCard = "Enter a valid Smart Card number";
    if (!formData.bouquet) newErrors.bouquet = "Select a bouquet";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the form errors.");
      return;
    }

    setLoading(true);
    toast.success("TV subscription initiated!");
    console.log("TV Subscription data:", formData);

    setTimeout(() => {
      // Save to localStorage
      const prevData =
        JSON.parse(localStorage.getItem("tvSubscriptions") || "[]") || [];
      const newData = [
        ...prevData,
        { ...formData, timestamp: new Date().toISOString() },
      ];
      localStorage.setItem("tvSubscriptions", JSON.stringify(newData));

      toast.success("TV Subscription saved!");
      setFormData({
        provider: "",
        smartCard: "",
        bouquet: "",
      });
      setLoading(false);
    }, 1500); // simulate delay
    // Simulate submission to the backend here
  };

  const filteredBouquets = bouquets.filter(
    (b) => b.providerId === formData.provider
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md space-y-6"
    >
      {/* Provider */}
      <div>
        <label className="block font-medium mb-1 text-black">TV Provider</label>
        <select
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="">-- Select Provider --</option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {errors.provider && <p className="text-red-500 text-sm">{errors.provider}</p>}
      </div>

      {/* Smart Card */}
      <div>
        <label className="block font-medium mb-1 text-black">Smart Card Number</label>
        <input
          type="text"
          name="smartCard"
          value={formData.smartCard}
          onChange={handleChange}
          placeholder="e.g. 1234567890"
          className="w-full border px-4 py-2 rounded-md text-black"
        />
        {errors.smartCard && <p className="text-red-500 text-sm">{errors.smartCard}</p>}
      </div>

      {/* Bouquet */}
      <div>
        <label className="block font-medium mb-1 text-black">Select Bouquet</label>
        <select
          name="bouquet"
          value={formData.bouquet}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="">-- Choose Plan --</option>
          {filteredBouquets.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name} - ₦{b.price}
            </option>
          ))}
        </select>
        {errors.bouquet && <p className="text-red-500 text-sm">{errors.bouquet}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-700"
        }`}
      >
        {loading ? "Processing..." : "Proceed to Pay"}
      </button>
    </form>
  );
}
