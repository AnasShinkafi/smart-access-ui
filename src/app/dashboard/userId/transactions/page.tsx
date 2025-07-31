import TransactionTable from "../../../../components/tables/TransactionTable";

export default function TransactionsPage() {
  return (
    <main className="px-6 md:px-16 py-12 max-w-5xl mx-auto">
        <br /><br /><br />
      <h1 className="text-3xl font-bold mb-6 text-center">Transaction History</h1>
      <TransactionTable />
    </main>
  );
}
