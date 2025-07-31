"use client";

import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { format } from "date-fns";

type AirtimeTransaction = {
  network: string;
  phone: string;
  amount: string;
  timestamp: string;
};

  type AirtimeHistoryTableProps = {
  userId: string;
};

export  function AirtimeHistoryTable({ userId }: AirtimeHistoryTableProps) {
  const [transactions, setTransactions] = useState<AirtimeTransaction[]>([]);
  const [filtered, setFiltered] = useState<AirtimeTransaction[]>([]);
  const [filters, setFilters] = useState({
    network: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem(`airtimeTransactions_${userId}`);
    if (storedData) {
      const data: AirtimeTransaction[] = JSON.parse(storedData);
      setTransactions(data);
      setFiltered(data);
    }
  }, [userId]);

  const applyFilters = () => {
    const { network, from, to } = filters;
    const fromDate = from ? new Date(from).getTime() : null;
    const toDate = to ? new Date(to).getTime() : null;

    const result = transactions.filter((tx) => {
      const txDate = new Date(tx.timestamp).getTime();
      const matchesNetwork = network ? tx.network === network : true;
      const matchesFrom = fromDate ? txDate >= fromDate : true;
      const matchesTo = toDate ? txDate <= toDate : true;
      return matchesNetwork && matchesFrom && matchesTo;
    });

    setFiltered(result);
  };

  const exportCSV = () => {
    const ws = utils.json_to_sheet(filtered);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "AirtimeHistory");
    const buf = write(wb, { bookType: "csv", type: "array" });
    const blob = new Blob([buf], { type: "text/csv" });
    saveAs(blob, "airtime_history.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Network", "Phone", "Amount", "Date/Time"]],
      body: filtered.map((tx) => [
        tx.network,
        tx.phone,
        tx.amount,
        format(new Date(tx.timestamp), "yyyy-MM-dd HH:mm"),
      ]),
    });
    doc.save("airtime_history.pdf");
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-2xl p-6 mt-8">
      <h2 className="text-lg font-bold mb-4 text-black">Airtime Transaction History</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={filters.network}
          onChange={(e) => setFilters({ ...filters, network: e.target.value })}
        >
          <option value="">All Networks</option>
          <option value="MTN">MTN</option>
          <option value="Airtel">Airtel</option>
          <option value="Glo">Glo</option>
          <option value="9mobile">9mobile</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
        />
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded"
          onClick={exportCSV}
        >
          Export CSV
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={exportPDF}
        >
          Export PDF
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No airtime transactions found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Network</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Amount (₦)</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Date/Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((tx, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{tx.network}</td>
                <td className="px-4 py-2">{tx.phone}</td>
                <td className="px-4 py-2">{tx.amount}</td>
                <td className="px-4 py-2">{new Date(tx.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
