"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format, isAfter, isBefore, parseISO } from "date-fns";

interface WalletFunding {
  amount: string;
  method: string;
  timestamp: string;
}

interface WalletFundingHistoryProps {
  userId: string;
}

export default function WalletFundingHistory({ userId }: WalletFundingHistoryProps) {
  const [fundings, setFundings] = useState<WalletFunding[]>([]);
  const [filtered, setFiltered] = useState<WalletFunding[]>([]);
  const [methodFilter, setMethodFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`walletFunding_${userId}`) || "[]");
    setFundings(stored);
    setFiltered(stored);
  }, [userId]);

  const totalBalance = filtered.reduce((acc, entry) => acc + Number(entry.amount), 0);

  const filterData = () => {
    const result = fundings.filter((entry) => {
      const entryDate = parseISO(entry.timestamp);
      const start = startDate ? parseISO(startDate) : null;
      const end = endDate ? parseISO(endDate) : null;

      return (
        (!methodFilter || entry.method === methodFilter) &&
        (!start || isAfter(entryDate, start) || entryDate.toDateString() === start.toDateString()) &&
        (!end || isBefore(entryDate, end) || entryDate.toDateString() === end.toDateString())
      );
    });

    setFiltered(result);
  };

  const exportToCSV = () => {
    const rows = [
      ["Amount (₦)", "Method", "Date", "Status"],
      ...filtered.map((t) => [
        `₦${t.amount}`,
        t.method,
        new Date(t.timestamp).toLocaleString(),
        "Successful",
      ]),
    ];

    const csvContent = rows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wallet_funding_${userId}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Wallet Funding History", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Amount (₦)", "Method", "Date", "Status"]],
      body: filtered.map((t) => [
        `₦${t.amount}`,
        t.method,
        new Date(t.timestamp).toLocaleString(),
        "Successful",
      ]),
    });
    doc.save(`wallet_funding_${userId}.pdf`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-3 py-2 text-black"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-3 py-2 text-black"
        />
        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="border rounded px-3 py-2 text-black"
        >
          <option value="">All Methods</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
        <button
          onClick={filterData}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Apply Filters
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-700">
          Wallet Balance: ₦{totalBalance.toLocaleString()}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
          >
            Export CSV
          </button>
          <button
            onClick={exportToPDF}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2">Amount (₦)</th>
              <th className="p-2">Method</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">₦{Number(entry.amount).toLocaleString()}</td>
                <td className="p-2">{entry.method}</td>
                <td className="p-2">
                  {new Date(entry.timestamp).toLocaleString()}
                </td>
                <td className="p-2">
                  <span className="text-green-600 font-semibold">Successful</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
