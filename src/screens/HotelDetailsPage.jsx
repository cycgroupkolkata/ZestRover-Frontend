import React, { useEffect, useRef, useState } from "react";
import { MdLocationCity } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";

import { MdOutlineLocalAirport } from "react-icons/md";
import { PiSwimmingPool } from "react-icons/pi";
import { FaSpa } from "react-icons/fa";
import { IoWifiSharp } from "react-icons/io5";
import { SiAnydesk } from "react-icons/si";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Facilities from "../components/Hotels/Facilities";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { hotelService } from "../services/HotelService";
import { FaCannabis } from "react-icons/fa";
import HotelDetailsShimmer from "../components/Shimmers/HotelDetailsShimmer";

const HotelDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, searchData, signatureData, hotelRate } = location.state || {};
  const [roomData, setRoomData] = useState({});
  const [moreRoomDetails, setMoreRoomDetail] = useState({});


  const [isLoading, setIsLoading] = useState(true);

  const restProcess = async () => {
    setIsLoading(true);
    try {
      const moreRoomData = await hotelService.moreRoomContent({
        searchId: searchData.searchId,
        HotelId: hotel.id,
        jwt: signatureData.Token,
      });

      const moreRoom = await hotelService.moreRooms({
        searchId: searchData.searchId,
        hotelId: moreRoomData.hotel.id,
        jwt: signatureData.Token,
      });


      setRoomData(moreRoomData);
      setMoreRoomDetail(moreRoom);
      console.log("moreRoom data",moreRoomData)
      console.log("moreRoom",moreRoom)

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    restProcess();
  }, []);

  //References
  const roomsRef = useRef(null);


  const countDays=(startDate,endDate)=>{
    const start=new Date(startDate);
    const end=new Date(endDate);

    const difference=end-start;

    const day=difference/(1000*3600*24)
    return day;
  }

  return isLoading ? (
    <HotelDetailsShimmer />
  ) : (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{roomData.hotel?.name}</h1>
            <div className="flex items-center justify-center md:justify-start text-sm text-gray-500">
              <span>
                {roomData.hotel?.contact?.address?.line1},
                {roomData.hotel?.contact?.address?.city}
              </span>
              <span className="mx-2">•</span>
              <a
                target="_blank"
                className="text-blue-500"
                href={`https://www.google.com/maps?q=${roomData.hotel?.geoCode.lat},${roomData.hotel?.geoCode.long}`}
              >
                Show on map
              </a>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:mt-0">
            <div className="text-xl font-bold text-blue-600">
              Starting from ₹{hotelRate?.rate?.baseRate}
            </div>
            <button
              onClick={() => {
                roomsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="focus:outline-none bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Select Room
            </button>
          </div>
        </div>

        {/* Images Section Start */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <img
              src={roomData.hotel?.heroImage}
              alt="View of The Montcalm At Brewery London City"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              roomData.hotel?.images[1]?.url,
              roomData.hotel?.images[2]?.url,
              roomData.hotel?.images[3]?.url,
              roomData.hotel?.images[4]?.url,
            ].map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Hotel image ${idx + 1}`}
                className="w-full h-full object-cover rounded"
              />
            ))}
            <button
              onClick={() => {
                navigate("/image-galary", {
                  state: {
                    images: roomData.hotel?.images,
                  },
                });
              }}
              className="focus:outline-none col-span-2 bg-gray-200 text-gray-700 py-2 rounded"
            >
              See all Photos
            </button>
          </div>
        </div>
        {/* Images Section End */}

        {/* Popular Facilities */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Most Popular Facilities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {roomData.hotel?.facilityGroups.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <FaCannabis size={20} className="mr-2 text-blue-500" />
                <span className="text-sm text-gray-800">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Highlights */}
        {/* <div className="mt-6">
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
        </div> */}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Nearby Attractions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {roomData.hotel?.nearByAttractions.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Attraction marker icon */}
                <FaSpa size={30} className="text-blue-600 mb-2" />
                <span className="font-semibold text-sm text-gray-800 mb-1">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500">
                  {item.distance} {item.unit} away
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Overview */}
        {/* <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Overview</h2>
          <p className="text-gray-700 text-sm">
            Whether you're a tourist or traveling on business, The Montcalm At
            Brewery London City is a great choice for accommodation when
            visiting London. From here, guests can enjoy easy access to all that
            the lively city has to offer. With its convenient location, the
            hotel offers easy access to the city's must-see destinations.{" "}
            <span className="text-blue-700 cursor-pointer">show more</span>
          </p>
        </div> */}

        {/* Reservation Card */}
        <div className="mt-6 p-4 bg-white rounded shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="text-center md:text-left">
              <div className="text-xl font-bold text-blue-600">
                INR₹{hotelRate?.rate.ratePerNight}
              </div>
              <div className="text-sm text-gray-500">per night</div>
            </div>
            <button
              onClick={() => {
                roomsRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2 md:mt-0"
            >
              Reserve
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <div className="mb-2">
              <span className="font-bold">Check-in:</span>{" "}
              {roomData.hotel?.checkinInfo.beginTime}
              {roomData.hotel?.checkinInfo.instructions.map((item, index) => {
                return (
                  <div
                    key={index + 1}
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: item,
                    }}
                  ></div>
                );
              })}
              <div
                className="prose"
                dangerouslySetInnerHTML={{
                  __html: roomData.hotel?.checkinInfo.instructions[0],
                }}
              ></div>
            </div>
            <div className="mb-2">
              <span className="font-bold">Check-out:</span>{" "}
              {roomData.hotel?.checkoutInfo.time}
            </div>
            <div className="mb-2">
              <span className="font-bold">Property type:</span>{" "}
              {roomData.hotel?.type}
            </div>
            <div className="mb-2">
              <span className="font-bold">Number of rooms:</span> 235
            </div>
          </div>
          <button
            onClick={() => {
              roomsRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          >
            Check availability
          </button>
        </div>
      </div>

      {/* Hotel Description Start */}
      <Descriptions descriptions={roomData?.hotel?.descriptions} />
      {/* Hotel Description End */}

      {moreRoomDetails?.status === "failure" ? (
        <div ref={roomsRef} className="text-center py-8">
          <p className="text-xl font-semibold text-gray-600">
            {moreRoomDetails?.message}
          </p>
        </div>
      ) : (
        <div ref={roomsRef} className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Standard Twin Room</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-2 md:p-4 border">Room Type</th>
                  <th className="p-2 md:p-4 border">Benefits</th>
                  <th className="p-2 md:p-4 border">Sleeps</th>
                  <th className="p-2 md:p-4 border">Price for {countDays(moreRoomDetails?.stayPeriod?.start,moreRoomDetails?.stayPeriod?.end)} nights</th>
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
                        className="w-16 h-16 md:w-24 md:h-24 object-cover mx-auto"
                      />
                    </td>
                    <td className="p-2 md:p-4 border">
                      <p className="font-semibold">Your price includes:</p>
                      <ul className="list-none text-sm">
                        <li className="text-green-600">
                          <i className="fas fa-check"></i> Pay at the hotel
                        </li>
                        <li className="text-green-600">
                          <i className="fas fa-check"></i> Pay nothing until
                          March 30, 2022
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
                      <p className="font-semibold">
                        INR₹{hotelRate?.rate?.ratePerNight}
                      </p>
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
      )}

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Facilities of this Hotel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roomData.hotel?.facilityGroups.map((facilityGroup, index) => {
            // Filter facilities that match the group's groupId
            const groupFacilities = roomData.hotel?.facilities.filter(
              (facility) => facility.groupId === facilityGroup.groupId
            );

            return (
              <div key={index}>
                <h2 className="text-lg font-semibold mb-2">
                  {facilityGroup.name}
                </h2>
                <ul className="list-none pl-0">
                  {groupFacilities.map((facility, idx) => (
                    <li key={idx} className="mb-1 flex flex-row items-center">
                      <BiCheck color="green" size={20} className="mr-2" />
                      {facility.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Facilities of this Hotel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {hotel.facilities.map((facility, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold mb-2">{facility.name}</h2>
              <ul className="list-none pl-0">
                <li className="mb-1 flex flex-row">
                  <BiCheck color="green" size={20} />
                  {facility.name}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div> */}

      {/* <Facilities /> */}

      {/*Policies Start */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Hotel Policies</h1>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <div className="flex items-center mb-4">
            <CiCircleInfo color="blue" size={30} className="mr-3" />
            <h2 className="text-lg font-semibold">Know Before You Go</h2>
          </div>
          <p className="text-gray-700">
            {roomData.policies?.map((policy, index) => (
              <span key={index}>{policy.text}</span>
            ))}
          </p>
          <div className="mt-4">
            <a
              href={`tel:${roomData.hotel?.contact.phones[0]}`} // phone number link
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Call Hotel: {roomData.hotel?.contact.phones[0]}
            </a>
          </div>
        </div>
      </div>
      {/*Policies End */}
    </div>
  );
};

export default HotelDetailsPage;

const facilities = [
  {
    category: "Bathroom",
    icon: "fas fa-bath",
    items: [
      "Towels",
      "Bath or shower",
      "Private bathroom",
      "Toilet",
      "Free toiletries",
      "Hairdryer",
      "Bath",
    ],
  },
  {
    category: "Bedroom",
    icon: "fas fa-bed",
    items: ["Linen", "Wardrobe or closet"],
  },
  {
    category: "Reception services",
    icon: "fas fa-concierge-bell",
    items: [
      "Invoice provided",
      "Private check-in/check-out",
      "Luggage storage",
      "24-hour front desk",
    ],
  },
  {
    category: "Media & Technology",
    icon: "fas fa-tv",
    items: ["Flat-screen TV", "Satellite channels", "Radio", "Telephone", "TV"],
  },
  {
    category: "Food & Drink",
    icon: "fas fa-utensils",
    items: [
      "Kid meals",
      "Special diet menus (on request)",
      "Breakfast in the room",
      "Bar",
      "Restaurant",
      "Tea/Coffee maker",
    ],
  },
  {
    category: "Cleaning services",
    icon: "fas fa-broom",
    items: ["Daily housekeeping", "Dry cleaning", "Laundry"],
  },
  {
    category: "Safety & security",
    icon: "fas fa-shield-alt",
    items: [
      "Fire extinguishers",
      "CCTV in common areas",
      "Smoke alarms",
      "24-hour security",
    ],
  },
  {
    category: "General",
    icon: "fas fa-cogs",
    items: [
      "Hypoallergenic",
      "Non-smoking throughout",
      "Wake-up service",
      "Heating",
      "Packed lunches",
      "Carpeted",
      "Lift",
      "Fan",
      "Family rooms",
      "Facilities for disabled guests",
      "Ironing facilities",
      "Non-smoking rooms",
      "Iron",
      "Room service",
    ],
  },
];

const Descriptions = ({ descriptions = [] }) => {
  const formatTitle = (type) =>
    type.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Hotel Descriptions
      </h1>
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200 space-y-6">
        {descriptions.length > 0 &&
          descriptions.map((item, index) => (
            <div key={index}>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {formatTitle(item.type)}
              </h2>
              {/* Check if content contains HTML */}
              {item.text.includes("<") && item.text.includes(">") ? (
                <div
                  className="prose text-gray-700 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              ) : (
                <p className="text-gray-700 text-base leading-relaxed">
                  {item.text}
                </p>
              )}
              {index !== descriptions.length - 1 && (
                <hr className="my-4 border-gray-300" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
