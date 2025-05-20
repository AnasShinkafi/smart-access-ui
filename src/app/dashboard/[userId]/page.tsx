import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: { userId: string };
};

export default function UserDashboardPage({ params }: Props) {
  const { userId } = params;

  if (!userId) return notFound();

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <br /><br /><br />
        <h1 className="text-2xl sm:text-3xl text-black font-bold mb-2">
          Welcome 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Access all your smart services from here.
        </p>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href={`/dashboard/${userId}/buy-airtime`}
            className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-blue-600">Buy Airtime</h2>
            <p className="text-gray-500 text-sm mt-1">
              Recharge any network instantly
            </p>
          </Link>

          <Link
            href={`/dashboard/${userId}/buy-data`}
            className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-green-600">Buy Data</h2>
            <p className="text-gray-500 text-sm mt-1">
              Get affordable data plans
            </p>
          </Link>

          <Link
            href={`/dashboard/${userId}/transactions`}
            className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-purple-600">
              Transaction History
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              View and manage your purchases
            </p>
          </Link>

          <Link
            href={`/dashboard/${userId}/profile`}
            className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-orange-600">Profile/Settings</h2>
            <p className="text-gray-500 text-sm mt-1">
              Edit your account information
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
