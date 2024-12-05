import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import { logo } from "./../assets/imges/icons-logo/index";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GrSend } from "react-icons/gr";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get the current route

  const isRootRoute = location.pathname === "/" || location.pathname === ""; // Check if on root route

  // Detect scroll position to toggle background
  useEffect(() => {
    if (isRootRoute) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 110);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setIsScrolled(false); // Ensure background is not transparent on other routes
    }
  }, [isRootRoute]);

  return (
    <div
      className={`w-full sticky top-0 z-50 transition-all duration-700 delay-300 ${
        isScrolled ? "bg-white shadow-md" : isRootRoute ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="w-full flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <Link to={'/'} className="text-2xl cursor-pointer font-bold text-blue-600 flex items-center">
            <img src={logo} alt="ZestRover logo" className="w-60 h-16" />
          </Link>
          <nav
            className={`hidden md:flex ml-10 space-x-4 ${
              isScrolled || !isRootRoute ? "text-gray-700" : "text-white"
            }`}
          >
            <Link to={"/"} className="relative group font-medium">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link to={'/about'} className="relative group font-medium">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link to={'/service'} className="relative group font-medium">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link to={'/offers'} className="relative group font-medium">
              Offers
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link to={'/blogs'} className="relative group font-medium">
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link to={'/career'} className="relative group font-medium">
              Career
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link to={"/contact"} className="relative text-blue-600 group font-medium">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to={'/enquiry'} className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap text-center min-w-[150px] hover:bg-white hover:text-blue-500 transition-all duration-500 hover:delay-100 focus:outline-none flex flex-row justify-center items-center space-x-2">
            <span>Enquiry Now</span> <GrSend size={24} />
          </Link>
          <Link to={'/login'} className="border bg-white border-blue-600 text-blue-600 px-4 py-2 rounded whitespace-nowrap text-center min-w-[150px] hover:bg-blue-500 hover:text-white transition-all duration-500 hover:delay-100 focus:outline-none">
            Sign In / Register
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`focus:outline-none ${
              isScrolled || !isRootRoute ? "text-gray-700" : "text-white"
            }`}
          >
            {isOpen ? <IoMdClose color="#000" size={28} /> : <IoReorderThreeOutline size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Navbar */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 pb-4 space-y-2 text-gray-700">
          <Link to={"/"} className="block hover:text-blue-600">
            Home
          </Link>
          <Link to={'/about'} className="block hover:text-blue-600">
            About Us
          </Link>
          <a href="#" className="block hover:text-blue-600">
            Services
          </a>
          <Link to={'/offers'} className="block hover:text-blue-600">
            Offers
          </Link>
          <a href="#" className="block hover:text-blue-600">
            Blogs
          </a>
          <Link to={'/career'} className="block hover:text-blue-600">
            Career
          </Link>
          <Link to={"/contact"} className="block text-blue-600">
            Contact
          </Link>
          <Link to={'/enquiry'} className="w-full flex flex-row justify-center items-center gap-3 bg-blue-600 text-white px-4 py-2 rounded mt-2 mb-3">
            <span>Enquiry Now</span> <GrSend size={24} />
          </Link>
          <Link to={'/login'} className="w-full border bg-white border-blue-600 text-blue-600 px-4 py-2 rounded mt-2">
            Sign In / Register
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
