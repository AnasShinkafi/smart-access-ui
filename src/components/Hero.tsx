import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#f4f8fb] py-16 px-4 sm:px-6 lg:px-8 my-10">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-black leading-tight mb-4">
            Instant Virtual <br className="hidden md:block" /> Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 lg:mb-8">
            Purchase data, airtime, pay bills, and more online.
          </p>
          <Link href={'/signup'}>
            <button className="bg-teal-600 text-white px-6 py-3 rounded-xl text-base sm:text-lg hover:bg-teal-700 transition duration-300">
            Get Started
          </button>
          </Link>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <Image
            src="/images/hero-image1.png"
            alt="Hero"
            width={600}
            height={450}
            className="w-full max-w-[500px] h-auto object-contain rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
