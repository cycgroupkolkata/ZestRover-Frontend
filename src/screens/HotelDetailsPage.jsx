import React from "react";
import { MdLocationCity } from "react-icons/md";
import { MdOutlineLocalAirport } from "react-icons/md";
import { PiSwimmingPool } from "react-icons/pi";
import { FaSpa } from "react-icons/fa";
import { IoWifiSharp } from "react-icons/io5";
import { SiAnydesk } from "react-icons/si";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Facilities from "../components/Hotels/Facilities";

const HotelDetailsPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">
              The Montcalm At Brewery London City
            </h1>
            <div className="flex items-center justify-center md:justify-start text-sm text-gray-500">
              <span>78-80 London St, London</span>
              <span className="mx-2">•</span>
              <a className="text-blue-500" href="#">
                Show on map
              </a>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <div className="text-xl font-bold text-blue-600">₹10990</div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
              Select Room
            </button>
          </div>
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <img
              src="https://storage.googleapis.com/a1aa/image/ZWXxLeerqLrFp0p0rwacy41NyUw6kMySc6LmcatNbI4z801TA.jpg"
              alt="View of The Montcalm At Brewery London City"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              "https://storage.googleapis.com/a1aa/image/aUUEwvlNC7JBAJDMk7U4rtSe6fsAjhOQtba2A8nY8fnj5prnA.jpg",
              "https://storage.googleapis.com/a1aa/image/E6diqTe9ICUBGSiGkohIh64YLsYRKppNLHuf1aTDFfkv5prnA.jpg",
              "https://storage.googleapis.com/a1aa/image/4OzN1q7fChRRIS6Ok263FTEceebpBCZLtxnKr9GgSnpr5prnA.jpg",
              "https://storage.googleapis.com/a1aa/image/oUdzROZIivKwDREEJC6EWcJ4KwVe0B4xh6MkOD0QA2LZe01TA.jpg",
            ].map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Hotel image ${idx + 1}`}
                className="w-full h-full object-cover rounded"
              />
            ))}
            <button className="col-span-2 bg-gray-200 text-gray-700 py-2 rounded">
              See all Photos
            </button>
          </div>
        </div>

        {/* Property Highlights */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Property highlights</h2>
          <div className="flex flex-wrap space-x-8 text-sm text-gray-600">
            {[
              {
                icon: <MdLocationCity size={34} />,
                text: "In London City Centre",
              },
              {
                icon: <MdOutlineLocalAirport size={34} />,
                text: "Airport transfer",
              },
              { icon: <SiAnydesk size={34} />, text: "Front desk [24-hour]" },
              { icon: <FaSpa size={34} />, text: "Sauna" },
              {
                icon: <IoWifiSharp size={34} />,
                text: "Free Wi-Fi in all rooms!",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center flex-col mb-2">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Overview</h2>
          <p className="text-gray-700 text-sm">
            Whether you're a tourist or traveling on business, The Montcalm At
            Brewery London City is a great choice for accommodation when
            visiting London. From here, guests can enjoy easy access to all that
            the lively city has to offer. With its convenient location, the
            hotel offers easy access to the city's must-see destinations.{" "}
            <span className="text-blue-700 cursor-pointer">show more</span>
          </p>
        </div>

        {/* Popular Facilities */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Most Popular Facilities</h2>
          <div className="flex flex-wrap space-x-8 text-sm text-gray-600">
            {[
              { icon: <PiSwimmingPool size={24} />, text: "Swimming Pool" },
              { icon: <IoWifiSharp size={24} />, text: "Free WiFi" },
              { icon: "dumbbell", text: "Fitness Center" },
              { icon: "utensils", text: "Restaurant" },
              { icon: "cocktail", text: "Bar" },
              { icon: "parking", text: "Parking" },
              { icon: "spa", text: "Spa" },
              { icon: "concierge-bell", text: "Room Service" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center mb-2 bg-white p-2 rounded-lg cursor-pointer"
              >
                {/* {item.icon.startWith("<") && item.icon} */}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reservation Card */}
        <div className="mt-6 p-4 bg-white rounded shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-blue-600">US$99</div>
              <div className="text-sm text-gray-500">per night</div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0">
              Reserve
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <div className="mb-2">
              <span className="font-bold">Check-in:</span> From 2:00 PM
            </div>
            <div className="mb-2">
              <span className="font-bold">Check-out:</span> Until 12:00 PM
            </div>
            <div className="mb-2">
              <span className="font-bold">Property type:</span> Hotel
            </div>
            <div className="mb-2">
              <span className="font-bold">Number of rooms:</span> 235
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded mt-4">
            Check availability
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Standard Twin Room</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-2 md:p-4 border">Room Type</th>
                <th className="p-2 md:p-4 border">Benefits</th>
                <th className="p-2 md:p-4 border">Sleeps</th>
                <th className="p-2 md:p-4 border">Price for 5 nights</th>
                <th className="p-2 md:p-4 border">Select Rooms</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(3)].map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 md:p-4 border">
                    <img
                      src="https://placehold.co/100x100"
                      alt="Room image"
                      className="w-16 h-16 md:w-24 md:h-24 object-cover"
                    />
                  </td>
                  <td className="p-2 md:p-4 border">
                    <p className="font-semibold">Your price includes:</p>
                    <ul className="list-none">
                      <li className="text-green-600">
                        <i className="fas fa-check"></i> Pay at the hotel
                      </li>
                      <li className="text-green-600">
                        <i className="fas fa-check"></i> Pay nothing until March
                        30, 2022
                      </li>
                      <li className="text-green-600">
                        <i className="fas fa-check"></i> Free cancellation
                        before April 1, 2022
                      </li>
                    </ul>
                  </td>
                  <td className="p-2 md:p-4 border text-center">
                    <i className="fas fa-male"></i>{" "}
                    <i className="fas fa-male"></i>
                  </td>
                  <td className="p-2 md:p-4 border text-center">
                    <p className="font-semibold">US$99</p>
                    <p className="text-sm text-gray-600">
                      Includes taxes and charges
                    </p>
                  </td>
                  <td className="p-2 md:p-4 border text-center">
                    <select className="border rounded p-2">
                      <option>1 (US$ 3,120)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


              <Facilities/>



    </div>
  );
};

export default HotelDetailsPage;

const facilities = [
  {
    category: 'Bathroom',
    icon: 'fas fa-bath',
    items: [
      'Towels',
      'Bath or shower',
      'Private bathroom',
      'Toilet',
      'Free toiletries',
      'Hairdryer',
      'Bath',
    ],
  },
  {
    category: 'Bedroom',
    icon: 'fas fa-bed',
    items: ['Linen', 'Wardrobe or closet'],
  },
  {
    category: 'Reception services',
    icon: 'fas fa-concierge-bell',
    items: [
      'Invoice provided',
      'Private check-in/check-out',
      'Luggage storage',
      '24-hour front desk',
    ],
  },
  {
    category: 'Media & Technology',
    icon: 'fas fa-tv',
    items: ['Flat-screen TV', 'Satellite channels', 'Radio', 'Telephone', 'TV'],
  },
  {
    category: 'Food & Drink',
    icon: 'fas fa-utensils',
    items: [
      'Kid meals',
      'Special diet menus (on request)',
      'Breakfast in the room',
      'Bar',
      'Restaurant',
      'Tea/Coffee maker',
    ],
  },
  {
    category: 'Cleaning services',
    icon: 'fas fa-broom',
    items: ['Daily housekeeping', 'Dry cleaning', 'Laundry'],
  },
  {
    category: 'Safety & security',
    icon: 'fas fa-shield-alt',
    items: [
      'Fire extinguishers',
      'CCTV in common areas',
      'Smoke alarms',
      '24-hour security',
    ],
  },
  {
    category: 'General',
    icon: 'fas fa-cogs',
    items: [
      'Hypoallergenic',
      'Non-smoking throughout',
      'Wake-up service',
      'Heating',
      'Packed lunches',
      'Carpeted',
      'Lift',
      'Fan',
      'Family rooms',
      'Facilities for disabled guests',
      'Ironing facilities',
      'Non-smoking rooms',
      'Iron',
      'Room service',
    ],
  },
];