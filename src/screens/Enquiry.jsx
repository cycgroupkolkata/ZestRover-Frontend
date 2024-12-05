import React, { useState } from "react";
import { FaBlenderPhone } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";

const Enquiry = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !subject ||
      !message
    ) {
      setError("Please fill all fields");
      return;
    }

    // Handle form submission here (e.g., send data to an API)
    console.log({ firstName, lastName, email, phoneNumber, subject, message });
    setError(""); // Clear error if submission is successful
  };

  return (
    <div className="bg-purple-500/10">
      <div className="flex flex-col items-center justify-center min-h-screen py-10">
        <h1 className="text-4xl font-bold text-blue-600/80">Enquiry</h1>
        <p className="text-gray-500 mt-2">
          Have any questions or concerns? Reach out to us!
        </p>
        <div className="bg-white shadow-lg rounded-lg mt-10 p-8 w-full max-w-4xl flex flex-col md:flex-row">
          <div className="bg-blue-600/80 text-white p-8 rounded-lg md:w-1/3">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="mt-2">Say something to start a live chat!</p>
            <div className="mt-4">
              <div className="flex items-center mt-4">
                <FaBlenderPhone color="#fff" size={20} className="mr-2" />
                <a href="tel:03335302326" className="hover:underline">
                  03335302326
                </a>
              </div>
              <div className="flex items-center mt-4">
                <FaPhoneAlt color="#fff" size={20} className="mr-2" />
                <a href="tel:09147366913" className="hover:underline">
                  09147366913
                </a>
              </div>
              <div className="flex items-center mt-4">
                <MdEmail color="#fff" size={20} className="mr-2" />
                <a
                  href="mailto:connect@zestroverholidays.com"
                  className="hover:underline"
                >
                  connect@zestroverholidays.com
                </a>
              </div>
              <div className="flex items-center mt-4">
                <MdEmail color="#fff" size={20} className="mr-2" />
                <a
                  href="mailto:bookings@zestroverholidays.com"
                  className="hover:underline"
                >
                  bookings@zestroverholidays.com
                </a>
              </div>
              <div className="flex items-center mt-4">
                <IoLocation size={20} color="#fff" className="mr-2" />
                <span>
                  32/1, New Alipore, Sahapur Colony, Kolkata, West Bengal 700053
                </span>
              </div>
            </div>
            <div className="flex mt-6 space-x-4">
              <i className="fab fa-twitter text-yellow-500 cursor-pointer"></i>
              <i className="fab fa-instagram text-white cursor-pointer"></i>
              <i className="fab fa-snapchat-ghost text-yellow-500 cursor-pointer"></i>
            </div>
          </div>
          <div className="p-8 md:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Show error message if any field is missing */}
              {error && <div className="text-red-500 mb-4">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Select Subject?</label>
                <div className="flex items-center mt-2 space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="subject"
                      value="Booking Inquiry"
                      checked={subject === "Booking Inquiry"}
                      onChange={(e) => setSubject(e.target.value)}
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2">Booking Inquiry</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="subject"
                      value="Flight Cancellation"
                      checked={subject === "Flight Cancellation"}
                      onChange={(e) => setSubject(e.target.value)}
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2">Flight Cancellation</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="subject"
                      value="Flight Rescheduling"
                      checked={subject === "Flight Rescheduling"}
                      onChange={(e) => setSubject(e.target.value)}
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2">Flight Rescheduling</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="subject"
                      value="Baggage Inquiry"
                      checked={subject === "Baggage Inquiry"}
                      onChange={(e) => setSubject(e.target.value)}
                      className="form-radio text-yellow-500"
                    />
                    <span className="ml-2">Baggage Inquiry</span>
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Message</label>
                <textarea
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  rows="4"
                  placeholder="Write your message.."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-6 bg-blue-600/80 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
