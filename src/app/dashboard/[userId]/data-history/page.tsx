"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type DataTransaction = {
  network: string;
  phone: string;
  plan: string;
  amount: string;
  timestamp: string;
};

export default function DataHistoryTable() {
  const [transactions, setTransactions] = useState<DataTransaction[]>([]);
  const [filtered, setFiltered] = useState<DataTransaction[]>([]);
  const [networkFilter, setNetworkFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("dataTransactions") || "[]");
    setTransactions(stored);
    setFiltered(stored);
  }, []);

  useEffect(() => {
    const filteredData = transactions.filter((item) => {
      const itemDate = new Date(item.timestamp).toISOString().slice(0, 10);
      return (
        (!networkFilter || item.network === networkFilter) &&
        (!dateFrom || itemDate >= dateFrom) &&
        (!dateTo || itemDate <= dateTo)
      );
    });
    setFiltered(filteredData);
  }, [networkFilter, dateFrom, dateTo, transactions]);

  const exportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data_history.csv";
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Network", "Phone", "Plan", "Amount", "Timestamp"]],
      body: filtered.map((tx) => [
        tx.network,
        tx.phone,
        tx.plan,
        `₦${tx.amount}`,
        format(new Date(tx.timestamp), "yyyy-MM-dd HH:mm"),
      ]),
    });
    doc.save("data_history.pdf");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-black">Data Purchase History</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={networkFilter}
          onChange={(e) => setNetworkFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="">All Networks</option>
          <option value="MTN">MTN</option>
          <option value="Airtel">Airtel</option>
          <option value="Glo">Glo</option>
          <option value="9mobile">9mobile</option>
        </select>

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />

        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border px-4 py-2 rounded-md"
        />

        <button
          onClick={exportCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Export CSV
        </button>

        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left text-black">
            <tr>
              <th className="border px-4 py-2">Network</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Plan</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filtered.map((tx, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{tx.network}</td>
                  <td className="border px-4 py-2">{tx.phone}</td>
                  <td className="border px-4 py-2">{tx.plan}</td>
                  <td className="border px-4 py-2">₦{tx.amount}</td>
                  <td className="border px-4 py-2">
                    {format(new Date(tx.timestamp), "yyyy-MM-dd HH:mm")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
