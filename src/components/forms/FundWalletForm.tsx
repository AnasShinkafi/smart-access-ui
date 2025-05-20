"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface FundWalletFormProps {
  userId: string;
}

type WalletFunding = {
  amount: string;
  method: string;
  timestamp: string;
};

export default function FundWalletForm({ userId }: FundWalletFormProps) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) < 100) {
      toast.error("Minimum funding amount is ₦100");
      return;
    }

    if (!method) {
      toast.error("Select a payment method");
      return;
    }

    setLoading(true);

    const newEntry: WalletFunding = {
      amount,
      method,
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      const prevData =
        JSON.parse(localStorage.getItem(`walletFunding_${userId}`) || "[]") || [];
      localStorage.setItem(
        `walletFunding_${userId}`,
        JSON.stringify([...prevData, newEntry])
      );

      toast.success("Wallet funded successfully!");
      setAmount("");
      setMethod("");
      setLoading(false);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-6"
    >
      {/* Amount */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Amount (₦)
        </label>
        <input
          type="number"
          min={100}
          placeholder="₦1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-4 py-2 rounded-md text-black"
        />
      </div>

      {/* Payment Method */}
      <div>
        <label className="block font-medium mb-1 text-gray-700">
          Payment Method
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border px-4 py-2 rounded-md text-black"
        >
          <option value="">-- Select Payment Method --</option>
          <option value="Paystack">Paystack</option>
          <option value="Flutterwave">Flutterwave</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-teal-700"
        }`}
      >
        {loading ? "Processing..." : "Fund Wallet"}
      </button>
    </form>
  );
}
