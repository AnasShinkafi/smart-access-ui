"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type AirtimeFormData = {
  network: string;
  phone: string;
  amount: string;
  timestamp?: string;
};

type AirtimeFormProps = {
  userId: string;
};

export default function AirtimeForm({ userId }: AirtimeFormProps) {
  const [formData, setFormData] = useState<AirtimeFormData>({
    network: "",
    phone: "",
    amount: "",
  });    

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.network) newErrors.network = "Network is required";
    if (!formData.phone.match(/^0[789][01]\d{8}$/))
      newErrors.phone = "Enter a valid Nigerian phone number";
    if (!formData.amount || Number(formData.amount) < 50)
      newErrors.amount = "Minimum amount is ₦50";
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
    toast.loading("Processing airtime purchase...");

    setTimeout(() => {
      const transactionKey = `airtimeTransactions_${userId}`;
      const prevData: AirtimeFormData[] = JSON.parse(
        localStorage.getItem(transactionKey) || "[]"
      );

      const newData = [
        ...prevData,
        {
          ...formData,
          timestamp: new Date().toISOString(),
        },
      ];

      localStorage.setItem(transactionKey, JSON.stringify(newData));

      toast.dismiss();
      toast.success("Airtime purchase recorded successfully!");

      setFormData({ network: "", phone: "", amount: "" });
      setLoading(false);
    }, 1500); // simulate delay
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md space-y-6"
    >
      {/* Network */}
      <div>
        <label className="block font-medium mb-1 text-black">Select Network</label>
        <select
          name="network"
          value={formData.network}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="">-- Choose Network --</option>
          <option value="MTN">MTN</option>
          <option value="Airtel">Airtel</option>
          <option value="Glo">Glo</option>
          <option value="9mobile">9mobile</option>
        </select>
        {errors.network && <p className="text-red-500 text-sm">{errors.network}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block font-medium mb-1 text-black">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 08012345678"
          className="w-full border px-4 py-2 rounded-md text-black"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Amount */}
      <div>
        <label className="block font-medium mb-1 text-black">Amount (₦)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="₦100"
          className="w-full border px-4 py-2 rounded-md text-black"
        />
        {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-700"
        }`}
      >
        {loading ? "Processing..." : "Proceed to Pay"}
      </button>
    </form>
  );
}
