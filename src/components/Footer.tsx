export default function Footer() {
    return (
      <footer className="bg-[#f0f4f8] py-10 px-6 md:px-16 text-center mt-12">
        <p className="text-gray-700">
          &copy; {new Date().getFullYear()} SmartAccess. All rights reserved.
        </p>
      </footer>
    );
  }
  