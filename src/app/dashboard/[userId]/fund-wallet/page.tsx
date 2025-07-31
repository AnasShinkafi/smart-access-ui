import FundWalletForm from "../../../../components/forms/FundWalletForm";
import WalletFundingHistory from "../../../../components/WalletFundingHistory";

interface FundWalletPageProps {
  params: {
    userId: string;
  };
}

export default function FundWalletPage({  }: FundWalletPageProps) {
  const params: {userId} = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Fund Wallet</h2>
      <FundWalletForm userId={params.userId} />
      <WalletFundingHistory userId={params.userId} />

    </div>
  );
}
