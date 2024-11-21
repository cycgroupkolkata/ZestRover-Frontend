import React from "react";
import {
  FaFacebookSquare,
  FaTwitter,
  FaLinkedin,
  FaChevronRight,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-2">Contact Us</h3>
            <div className="flex items-center cursor-pointer space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex justify-center items-center">
                {" "}
                <MdOutlinePhoneInTalk size={24} className="text-teal-600" />
              </div>
              <a href="tel:+91 9147366913" className="text-teal-600 text-lg">
                03335302326
              </a>
            </div>
            <div className="flex items-center cursor-pointer space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex justify-center items-center">
                {" "}
                <MdOutlineEmail size={24} className="text-teal-600" />
              </div>
              <a
                href="mailto:bookings@zestroverholidays.com"
                className="text-teal-600 text-sm"
              >
                connect@zestroverholidays.com
                <br />
                bookings@zestroverholidays.com
              </a>
            </div>
            <div className="flex items-center cursor-pointer space-x-2">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex justify-center items-center">
                {" "}
                <CiLocationOn size={24} className="text-teal-600" />
              </div>
              <a
                href="mailto:bookings@zestroverholidays.com"
                className="text-teal-600 text-sm"
              >
                32/1, New Alipore,
                <br />
                Sahapur Colony, Kolkata,
                <br /> West Bengal 700053
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Company</h3>
            <ul className="space-y-2">
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> About Us
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Careers
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Blog
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Press
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Gift Cards
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Support</h3>
            <ul className="space-y-2">
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Contact
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Legal Notice
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Privacy Policy
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Terms and
                Conditions
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Sitemap
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Other Services</h3>
            <ul className="space-y-2">
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Car hire
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Activity Finder
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Tour List
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Flight finder
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Cruise Ticket
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Holiday Rental
              </li>
              <li className="text-base cursor-pointer">
                <FaChevronRight className="inline-block mr-2" /> Travel Agents
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Our Office</h3>
            <div className="mb-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14742.690225532639!2d88.32554256340327!3d22.516465417005822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271b1f73ef9cf%3A0x689357fc438ba712!2sCYC%20Events!5e0!3m2!1sen!2sin!4v1732103179052!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Our Office Location"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-600">
          <p>
            © 2024 by CYC Group All rights reserved.{" "}
            <span className="mx-2">|</span> Privacy{" "}
            <span className="mx-2">|</span> Terms{" "}
            <span className="mx-2">|</span> Site Map
          </p>
          <div className="mt-2 flex flex-row justify-center space-x-5">
            <span className="mr-4">
              <FaFacebookSquare
                className="hover:text-blue-500 cursor-pointer"
                size={30}
              />
            </span>
            <span className="mr-4">
              <FaTwitter
                className="hover:text-blue-500 cursor-pointer"
                size={30}
              />
            </span>
            <span className="mr-4">
              <RiInstagramFill
                className="hover:text-blue-500 cursor-pointer"
                size={30}
              />
            </span>
            <span className="mr-4">
              <FaLinkedin
                className="hover:text-blue-500 cursor-pointer"
                size={30}
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
