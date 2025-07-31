"use client";


import DataForm from "../../../../components/forms/DataForm";
import { useParams } from "next/navigation";

export default function BuyDataPage() {
  const { userId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Buy Data</h2>
        <DataForm userId={userId as string} />
      </div>
    </div>
  );
}
