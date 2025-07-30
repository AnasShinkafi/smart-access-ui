import "../../globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "SmartAccess",
  description: "Buy data, airtime, pay bills and more",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f4f8fb] text-gray-800">
        <Header />
        <Toaster position="top-center" />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
