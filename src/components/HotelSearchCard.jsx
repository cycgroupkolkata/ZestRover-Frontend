import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";

import { IoSearchSharp } from "react-icons/io5";
import Travellers from "./Travellers";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import HotelTravellers from "./HotelTravellers";
import Datepicker from "react-tailwindcss-datepicker";

const HotelSearchCard = () => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [room, setRoom] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const [date, setDate] = useState({
    startDate: new Date(Date.now()),
    endDate: null,
  });


  useEffect(()=>{
    console.log(date)
  },[date])

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-1 border border-slate-400 w-full md:space-x-4 border rounded-lg shadow-lg bg-white">
        {/* Location */}
        <div className="flex flex-col w-full md:w-auto md:flex-1 pb-4 md:pb-0 border-b md:border-none text-left">
          <label className="text-sm font-semibold text-gray-800">
            Location
          </label>
          <input
            type="text"
            placeholder="Where are you going?"
            className="text-sm text-gray-500 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Divider for larger screens */}
        <div className="hidden md:block border-l border-gray-300 h-10"></div>

        {/* Check-in / Check-out */}
        <div className="flex flex-col w-full md:w-auto md:flex-1 pb-4 md:pb-0 border-b md:border-none text-left">
          <label className="text-sm font-semibold text-gray-800">
            Check-in - Check-out
          </label>
          {/* <input
            type="date"
            placeholder="November 05 ~ December 14"
            className="text-sm text-gray-500 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          /> */}
          <Datepicker
            value={date}
            placeholder={`${date.startDate.toDateString()}}`}
            onChange={(newValue) => setDate(newValue)}
          />
        </div>

        {/* Divider for larger screens */}
        <div className="hidden md:block border-l border-gray-300 h-10"></div>

        {/* Guests */}
        <div className="flex flex-col w-full md:w-auto md:flex-1 pb-4 md:pb-0 border-b md:border-none text-left">
          <label className="text-sm font-semibold text-gray-800">Guests</label>
          {/* <input
            type="text"
            placeholder="November 05 ~ December 14"
            className="text-sm text-gray-500 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {isFocused && <HotelTravellers />} */}
          <Menu
            as="div"
            className="relative inline-block text-left focus:outline-none"
          >
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:outline-none hover:bg-gray-50">
                {adults} Adult - {children} Child - {room} Room
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {/* <div className="py-1"> */}
              {/* <MenuItem> */}
              <HotelTravellers
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                rooms={room}
                setRooms={setRoom}
              />
              {/* </MenuItem> */}
              {/* </div> */}
            </MenuItems>
          </Menu>
        </div>

        {/* Divider for larger screens */}
        <div className="hidden md:block border-l border-gray-300 h-10"></div>
        <br />

        {/* Search Button */}
      </div>
      <div className="flex w-full md:w-full md:flex-1 pb-4 md:pb-0 text-left my-2">
        <button className="bg-blue-600 space-x-2 focus:outline-none transition-all hover:delay-100 duration-300 hover:bg-blue-900 text-white px-6 py-2 rounded-lg flex items-center justify-center w-full">
          <IoSearchSharp />
          <span>Search</span>
        </button>
      </div>
    </>
  );
};

export default HotelSearchCard;
