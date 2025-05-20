"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Disco = {
  id: string;
  name: string;
};

type FormData = {
  disco: string;
  meterNumber: string;
  meterType: string;
  amount: string;
};

export default function ElectricityBillPaymentForm() {
  const [formData, setFormData] = useState<FormData>({
    disco: "",
    meterNumber: "",
    meterType: "",
    amount: "",
  });

  const [discos, setDiscos] = useState<Disco[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch dynamic DisCos list (simulated with mock data)
    setDiscos([
      { id: "ikeja", name: "Ikeja Electric" },
      { id: "eko", name: "Eko Electric" },
      { id: "ibadan", name: "Ibadan Electric" },
      { id: "kaduna", name: "Kaduna Electric" },
    ]);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.disco) newErrors.disco = "DisCo is required";
    if (!formData.meterType) newErrors.meterType = "Meter type is required";
    if (!formData.meterNumber.match(/^[0-9]{6,15}$/))
      newErrors.meterNumber = "Enter a valid meter number";
    if (!formData.amount || Number(formData.amount) < 100)
      newErrors.amount = "Minimum amount is ₦100";
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
    toast.success("Electricity payment initiated!");
    console.log("Electricity Bill Data:", formData);

    // Simulate backend request (replace with API call)
    setTimeout(() => {
      toast.success("Electricity bill payment successful!");
      setLoading(false);
      setFormData({
        disco: "",
        meterNumber: "",
        meterType: "",
        amount: "",
      });
      // Optionally store payment history in localStorage
      const history =
        JSON.parse(localStorage.getItem("electricityPayments") || "[]") || [];
      const newPayment = {
        ...formData,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(
        "electricityPayments",
        JSON.stringify([...history, newPayment])
      );
    }, 1500); // Simulate network delay
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md space-y-6"
    >
      {/* DisCo */}
      <div>
        <label className="block font-medium mb-1 text-black">DisCo</label>
        <select
          name="disco"
          value={formData.disco}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="">-- Select DisCo --</option>
          {discos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        {errors.disco && <p className="text-red-500 text-sm">{errors.disco}</p>}
      </div>

      {/* Meter Type */}
      <div>
        <label className="block font-medium mb-1 text-black">Meter Type</label>
        <select
          name="meterType"
          value={formData.meterType}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="">-- Choose Type --</option>
          <option value="prepaid">Prepaid</option>
          <option value="postpaid">Postpaid</option>
        </select>
        {errors.meterType && <p className="text-red-500 text-sm">{errors.meterType}</p>}
      </div>

      {/* Meter Number */}
      <div>
        <label className="block font-medium mb-1 text-black">Meter Number</label>
        <input
          type="text"
          name="meterNumber"
          value={formData.meterNumber}
          onChange={handleChange}
          placeholder="e.g. 1234567890"
          className="w-full border px-4 py-2 rounded-md text-black"
        />
        {errors.meterNumber && (
          <p className="text-red-500 text-sm">{errors.meterNumber}</p>
        )}
      </div>

      {/* Amount */}
      <div>
        <label className="block font-medium mb-1 text-black">Amount (₦)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="₦1000"
          className="w-full border px-4 py-2 rounded-md text-black"
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
      </div>

      {/* Submit */}
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
