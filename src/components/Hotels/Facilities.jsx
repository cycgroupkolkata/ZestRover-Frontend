import React from "react";
import { MdOutlineBathroom } from "react-icons/md";
import { MdOutlineBedroomChild } from "react-icons/md";
import { GiCookingPot } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { SiCcleaner } from "react-icons/si";
import { GiSecurityGate } from "react-icons/gi";
import { CiSettings } from "react-icons/ci";
import { BiCheck } from "react-icons/bi";


const facilities = [
  {
    category: "Bathroom",
    items: [
      "Towels",
      "Bath or shower",
      "Private bathroom",
      "Toilet",
      "Free toiletries",
      "Hairdryer",
      "Bath",
    ],
    icon: <MdOutlineBathroom />,
  },
  {
    category: "Bedroom",
    items: ["Linen", "Wardrobe or closet"],
    icon: <MdOutlineBedroomChild />,
  },
  {
    category: "Reception services",
    items: [
      "Invoice provided",
      "Private check-in/check-out",
      "Luggage storage",
      "24-hour front desk",
    ],
    icon: <GiCookingPot />,
  },
  {
    category: "Media & Technology",
    items: ["Flat-screen TV", "Satellite channels", "Radio", "Telephone", "TV"],
    icon: <FaComputer />,
  },
  {
    category: "Food & Drink",
    items: [
      "Kid meals",
      "Special diet menus (on request)",
      "Breakfast in the room",
      "Bar",
      "Restaurant",
      "Tea/Coffee maker",
    ],
    icon: <IoFastFood />,
  },
  {
    category: "Cleaning services",
    items: ["Daily housekeeping", "Dry cleaning", "Laundry"],
    icon: <SiCcleaner />,
  },
  {
    category: "Safety & security",
    items: [
      "Fire extinguishers",
      "CCTV in common areas",
      "Smoke alarms",
      "24-hour security",
    ],
    icon: <GiSecurityGate />,
  },
  {
    category: "General",
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
    icon: <CiSettings />,
  },
];

function Facilities() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Facilities of this Hotel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {facilities.map((facility, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-2">
              {facility.icon}
              {facility.category}
            </h2>
            <ul className="list-none pl-0">
              {facility.items.map((item, idx) => (
                <li key={idx} className="mb-1 flex flex-row">
                  <BiCheck color="green" size={20}/>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Facilities;
