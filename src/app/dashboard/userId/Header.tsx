'use client';
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const links = [
    { title: "Home", url: "/" },
    { title: "Dashboard", url: `/dashboard/${storedUser.id}` },
    { title: "Buy Data", url: `/dashboard/${storedUser.id}/buy-data` },
    { title: "Buy Airtime", url: `/dashboard/${storedUser.id}/buy-airtime` },
    { title: "TV Subscription", url: `/dashboard/${storedUser.id}/tv-subscription` },
    { title: "Electricity", url: `/dashboard/${storedUser.id}/electricity` },
    { title: "Exam Pin", url: `/dashboard/${storedUser.id}/exam-pin` },
    { title: "Profile", url: `/dashboard/${storedUser.id}/profile` },
    { title: "Transactions", url: `/dashboard/${storedUser.id}/transactions` },
    { title: "Fund Wallet", url: `/dashboard/${storedUser.id}/fund-wallet` },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-700">SmartAccess</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {links.map((link, i) => (
            <Link key={i} href={link.url} className="text-black hover:text-teal-700">
              {link.title}
            </Link>
          ))}
          <Link href="/">
            <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700">
              Log Out
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} color="black" /> : <Menu size={28} color="black" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-4">
            {links.map((link, i) => (
              <Link key={i} href={link.url} className="text-black hover:text-teal-700">
                {link.title}
              </Link>
            ))}
            <Link href="/">
              <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 w-full text-left">
                Log Out
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
