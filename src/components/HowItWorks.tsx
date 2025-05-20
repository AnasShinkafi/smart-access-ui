import { FaUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa";

export default function HowItWorks() {
    const steps = [
      {
        step: "1",
        title: "Create an Account",
        desc: "Sign up easily with your email address or phone number.",
        icon: <FaUser />
      },
      {
        step: "2",
        title: "Fund Your Wallet",
        desc: "Add money securely using your preferred payment method.",
        icon: <IoSettingsOutline/>
      },
      {
        step: "3",
        title: "Start Transacting",
        desc: "Buy data, airtime, pay bills, and enjoy seamless services.",
        icon: <FaMoneyCheck /> 
      },
    ];
  
    return (
      <section className="py-20 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-28 h-24 mx-auto mb-4 rounded-3xl bg-teal-100 text-teal-600 flex items-center justify-center text-7xl font-bold">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  