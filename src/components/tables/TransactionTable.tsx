"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function exportToCSV(data: Transaction[]) {
    const headers = ["Date", "Type", "Amount", "Details", "Status"];
    const rows = data.map((txn) => [
      txn.date,
      txn.type,
      `₦${txn.amount}`,
      txn.details,
      txn.status,
    ]);
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function exportToPDF(data: Transaction[]) {
    const doc = new jsPDF();
    doc.text("Transaction History", 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["Date", "Type", "Amount", "Details", "Status"]],
      body: data.map((txn) => [
        txn.date,
        txn.type,
        `₦${txn.amount}`,
        txn.details,
        txn.status,
      ]),
    });
    doc.save("transactions.pdf");
  }

type Transaction = {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: "success" | "pending" | "failed";
  details: string;
};

const allTransactions: Transaction[] = [
  {
    id: "TXN001",
    type: "airtime",
    amount: 500,
    date: "2025-04-20",
    status: "success",
    details: "MTN - 0803xxxxxxx",
  },
  {
    id: "TXN002",
    type: "data",
    amount: 1200,
    date: "2025-04-19",
    status: "pending",
    details: "9mobile - 0817xxxxxxx",
  },
  {
    id: "TXN003",
    type: "tv",
    amount: 2150,
    date: "2025-04-18",
    status: "failed",
    details: "DSTV - SmartCard: 1234567890",
  },
  {
    id: "TXN004",
    type: "electricity",
    amount: 3000,
    date: "2025-04-17",
    status: "success",
    details: "Ikeja Electric - Meter: 12345678",
  },
  {
    id: "TXN005",
    type: "airtime",
    amount: 1000,
    date: "2025-04-16",
    status: "success",
    details: "Glo - 0805xxxxxxx",
  },
  {
    id: "TXN006",
    type: "data",
    amount: 1500,
    date: "2025-04-15",
    status: "success",
    details: "Airtel - 0802xxxxxxx",
  },
  {
    id: "TXN007",
    type: "tv",
    amount: 2800,
    date: "2025-04-14",
    status: "pending",
    details: "GOtv - Decoder: 9876543210",
  },
];

const statusStyles = {
  success: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
};

const ITEMS_PER_PAGE = 5;

export default function TransactionTable() {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData =
    filter === "all"
      ? allTransactions
      : allTransactions.filter((t) => t.type === filter);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <label className="font-medium">Filter:</label>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1); // Reset page on filter change
            }}
            className="border px-3 py-1 rounded-md"
          >
            <option className="text-black" value="all">All</option>
            <option className="text-black" value="airtime">Airtime</option>
            <option className="text-black" value="data">Data</option>
            <option className="text-black" value="tv">TV</option>
            <option className="text-black" value="electricity">Electricity</option>
          </select>
        </div>

        <div className="text-sm text-gray-600 text-white">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      <div className="flex justify-end items-center gap-3">
  <button
    onClick={() => exportToCSV(filteredData)}
    className="px-4 py-2 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600"
  >
    Export CSV
  </button>
  <button
    onClick={() => exportToPDF(filteredData)}
    className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
  >
    Export PDF
  </button>
</div>


      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr className="text-black">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Details</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((txn) => (
              <tr key={txn.id} className="border-t">
                <td className="px-4 py-2">{txn.date}</td>
                <td className="px-4 py-2 capitalize">{txn.type}</td>
                <td className="px-4 py-2">₦{txn.amount}</td>
                <td className="px-4 py-2">{txn.details}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[txn.status]}`}
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center gap-4 mt-2">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-teal-600 text-white rounded-md"
        >
          Previous
        </button>
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white rounded-md text-teal-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
