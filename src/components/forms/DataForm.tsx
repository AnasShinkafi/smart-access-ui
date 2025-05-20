"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type DataFormProps = {
  userId: string;
};

type Plan = {
  id: string;
  name: string;
  price: number;
};

type FormData = {
  network: string;
  phone: string;
  plan: string;
  amount: string;
};

export default function DataForm({ userId }: DataFormProps) {
  const [formData, setFormData] = useState<FormData>({
    network: "",
    phone: "",
    plan: "",
    amount: "",
  });

  const [plans, setPlans] = useState<Plan[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching plans from backend
    const fetchPlans = async () => {
      const res = await new Promise<Plan[]>((resolve) =>
        setTimeout(() => {
          resolve([
            { id: "1", name: "500MB", price: 100 },
            { id: "2", name: "1GB", price: 200 },
            { id: "3", name: "2GB", price: 500 },
            { id: "4", name: "5GB", price: 1000 },
          ]);
        }, 800)
      );
      setPlans(res);
    };

    fetchPlans();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.network) newErrors.network = "Network is required";
    if (!formData.phone.match(/^0[789][01]\d{8}$/))
      newErrors.phone = "Enter a valid phone number";
    if (!formData.plan) newErrors.plan = "Select a data plan";
    if (!formData.amount || Number(formData.amount) < 50)
      newErrors.amount = "Enter a valid amount";
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
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true)

    setTimeout(() => {
      // Save to localStorage per user
      const prevData =
        JSON.parse(localStorage.getItem(`dataTransactions_${userId}`) || "[]") || [];
      const newData = [...prevData, formData];
      localStorage.setItem(`dataTransactions_${userId}`, JSON.stringify(newData));

      toast.success("Data purchase saved!");
      setFormData({ network: "", plan: "", phone: "", amount: "" });
      setLoading(false);
    }, 1500);
    // Here you can integrate your backend call
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

      {/* Plan */}
      <div>
        <label className="block font-medium mb-1 text-black">Data Plan</label>
        <select
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="">-- Select Plan --</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.name}>
              {plan.name} - ₦{plan.price}
            </option>
          ))}
        </select>
        {errors.plan && <p className="text-red-500 text-sm">{errors.plan}</p>}
      </div>

      {/* Amount */}
      <div>
        <label className="block font-medium mb-1 text-black">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="₦0.00"
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
