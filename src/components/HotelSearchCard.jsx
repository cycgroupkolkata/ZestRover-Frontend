import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";

import { IoSearchSharp } from "react-icons/io5";
import Travellers from "./Travellers";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import HotelTravellers from "./HotelTravellers";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Listbox } from "@headlessui/react";
import FlightSearchCard from "./FlightSearchCard";
import { flightSearchService } from "../services/FlightSearchService";

import {AutoComplete} from 'primereact/autocomplete'
import { toast } from "react-toastify";
import { data } from "autoprefixer";

const HotelSearchCard = ({
  loc = null,
  adl = 1,
  child = 0,
  rm = 1,
  dates = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
}) => {
  const navigate = useNavigate();
  const [adults, setAdults] = useState(adl);
  const [children, setChildren] = useState(child);
  const [room, setRoom] = useState(rm);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const [date, setDate] = useState(dates);
  const [location, setLocation] = useState(loc);
  const [selectedLocation, setSelectedLocation] = useState(loc);
  const [suggestion, setSuggestion] = useState([]);

  // const handleInputChange = (e) => {
  //   setLocation(e.target.value);
  // };

  const handleSearch = () => {
    if(selectedLocation===null){
      toast.warning("Select a location/hotel")
      return;
    }
    if(adults===0 || room===0){
      toast.warning("Fill guest details")
      return;
    }
    navigate(
      `/hotel-search?adults=${adults}&child=${children}&rooms=${room}`,
      {
        state: {
          date: date,
          selLocation: selectedLocation
        },
      }
    );
  };

  
  // useEffect(() => {
  //   if (location.length > 2) {
  //     const fetchSuggestions = async () => {
  //       try {
  //         const response = await fetch(
  //           `https://travelportalapi.benzyinfotech.com/api/content/autosuggest?term=${location}`
  //         );
  //         const data = await response.json();
  //         if (data.status === "success") {
  //           const sugLocation = await data.locations;
  //           setSuggestion(sugLocation);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching suggestion:", error);
  //       }
  //     };

  //     fetchSuggestions();
  //   } else {
  //     setSuggestion([]);
  //   }
  // }, []);

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" }; // Only show abbreviated month and day
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleQueryChage=(e)=>{
    const query=e.query;
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://travelportalapi.benzyinfotech.com/api/content/autosuggest?term=${query}`
        );
        const data = await response.json();
        if (data.status === "success") {
          const sugLocation = await data.locations;
          setSuggestion(sugLocation);
        }
      } catch (error) {
        console.error("Error fetching suggestion:", error);
      }
    };

    fetchSuggestions();
  }

  const handleSelection=(obj)=>{
    setSelectedLocation(obj)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-1 border border-slate-400 w-full md:space-x-4 border rounded-lg shadow-lg bg-white">
        {/* Location */}
        <div className="flex flex-col w-full md:w-auto md:flex-1 pb-4 md:pb-0 border-b md:border-none text-left">
          <label className="text-sm font-semibold text-gray-800">
            Location
          </label>
          {/* <input
            value={location}
            onChange={handleInputChange}
            type="text"
            placeholder="Where are you going?"
            className="text-sm text-gray-500 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          /> */}

          <AutoComplete
          value={selectedLocation}
            completeMethod={handleQueryChage}
            suggestions={suggestion}
            field="name"
            placeholder="Where are you going?"
            onChange={(e)=>handleSelection(e.value)}
            className="border"
          />

          </div>

        {/* Locatio Demo Start */}
        {/* <div className="flex flex-col w-full md:w-auto md:flex-1 pb-4 md:pb-0 border-b md:border-none text-left">
          <label className="text-sm font-semibold text-gray-800">
            Location
          </label>
          <Listbox value={selectedLocation} onChange={setSelectedLocation}>
            {({ open }) => (
              <>
                <input
                  value={location}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Where are you going?"
                  className="text-sm text-gray-500 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {suggestion.length > 0 && (
                  <Listbox.Options className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-auto z-10">
                    {suggestion.map((sug, index) => (
                      <Listbox.Option key={index} value={sug} as="div">
                        {({ active }) => (
                          <div
                            className={`p-2 text-sm ${
                              active
                                ? "bg-blue-500 text-white"
                                : "text-gray-700"
                            }`}
                          >
                            {sug.name}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </>
            )}
          </Listbox>
        </div> */}
        {/* Location Demo END */}

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
            placeholder={`${formatDate(date.startDate)}}~${formatDate(
              date.endDate
            )}`}
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
        <button
          onClick={handleSearch}
          className="bg-blue-600 space-x-2 focus:outline-none transition-all hover:delay-100 duration-300 hover:bg-blue-900 text-white px-6 py-2 rounded-lg flex items-center justify-center w-full"
        >
          <IoSearchSharp />
          <span>Search</span>
        </button>
      </div>
    </>
  );
};

export default HotelSearchCard;

