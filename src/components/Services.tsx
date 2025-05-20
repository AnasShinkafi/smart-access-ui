import { IoIosTv } from "react-icons/io";
import { IoBulb } from "react-icons/io5";
import { TbDeviceMobileFilled } from "react-icons/tb";
import { TbDeviceMobileDollar } from "react-icons/tb";

export default function Services() {
    const services = [
      { title: "Buy Data", desc: "Purchase data bundle, pay as you go.", icon: <TbDeviceMobileFilled /> },
      { title: "Buy Airtime", desc: "Top up any network easily.", icon: <TbDeviceMobileDollar /> },
      { title: "TV Subscription", desc: "Renew your TV service instantly.", icon: <IoIosTv /> },
      { title: "Electricity", desc: "Pay electricity bills or buy tokens.", icon: <IoBulb /> },
    ];
  
    return (
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-16 mb-20">
        {services.map((service, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-md text-center">
            <div className="text-teal-600 justify-center flex text-9xl">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-black">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.desc}</p>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700">
              {service.title === "TV Subscription"
                ? "Subscribe"
                : service.title === "Electricity"
                ? "Pay"
                : "Buy Now"}
            </button>
          </div>
        ))}
      </section>
    );
  }
  