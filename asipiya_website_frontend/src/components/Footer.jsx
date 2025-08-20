import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import { FaFacebook, FaWhatsapp, FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate(); // ✅ Hook to navigate

  return (
    <footer className="w-full bg-gradient-to-r from-black via-[#551A8B] to-black pt-12 pb-0 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left: Logo & Description */}
        <div className="flex flex-col gap-4 min-w-[220px]">
          <img src="/src/assets/logoWhite.png" alt="Asipiya Logo" className="w-40 h-[60px] mb-2" />
          <p className="text-sm text-gray-200 max-w-xs">
            Asipiya empowers teams to transform raw data into clear, compelling visuals — making insights easier to share, understand, and act on.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="https://web.facebook.com/AsipiyaSoftSolutions?mibextid=ZbWKwL&_rdc=1&_rdr" target="_blank" rel="noopener" className="group bg-[#551A8B] rounded-full p-2 hover:bg-white transition">
              <FaFacebook className="text-white transition-colors duration-200 group-hover:text-[#551A8B] text-xl" />
            </a>
            <a href="https://wa.me/94741870003" target="_blank" rel="noopener" className="group bg-[#551A8B] rounded-full p-2 hover:bg-white transition">
              <FaWhatsapp className="text-white transition-colors duration-200 group-hover:text-[#551A8B] text-xl" />
            </a>
            <a href="https://www.instagram.com/asipiyasoftsolutions/" target="_blank" rel="noopener" className="group bg-[#551A8B] rounded-full p-2 hover:bg-white transition">
              <FaInstagram className="text-white transition-colors duration-200 group-hover:text-[#551A8B] text-xl" />
            </a>
            <a href="https://www.linkedin.com/company/asipiya/" target="_blank" rel="noopener" className="group bg-[#551A8B] rounded-full p-2 hover:bg-white transition">
              <FaLinkedinIn className="text-white transition-colors duration-200 group-hover:text-[#551A8B] text-xl" />
            </a>
          </div>
        </div>

        {/* Right: Navigation Columns */}
        <div className="flex flex-1 justify-end gap-16">
          {/* ...navigation sections here (unchanged)... */}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-gray-700 my-6" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 pb-6">
          <span>© {new Date().getFullYear()} Asipiya. All rights reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="/privacy-policy" className="hover:text-purple-300">Privacy Policy</a>
            <a href="/security-policy" className="hover:text-purple-300">Security Policy</a>
            <a href="/terms-of-service" className="hover:text-purple-300">Terms Of Service</a>
            <a href="/legal-policy" className="hover:text-purple-300">Legal Policy</a>
            {/* <a href="#cookies" className="hover:text-purple-300">Cookies Settings</a> */}
            <a href="/admin/signin" className="hover:text-purple-300">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
